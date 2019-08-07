use super::{LambdaInput, LambdaOutput, EXPIRE_DURATION_SECONDS, STATUS_CODE_OK};

use crate::api::TokenInfo;
use crate::db::SimpleDynamoDBClient;
use crate::jwt::generate_token;
use chrono::Utc;
use lambda_runtime::error::HandlerError;
use lambda_runtime::{Context, Handler};
use rusoto_dynamodb::DynamoDbClient;
use serde::Deserialize;
use std::collections::HashMap;

pub enum AuthType {
    Register,
    Login,
}

pub struct AuthHandler {
    client: SimpleDynamoDBClient<DynamoDbClient>,
    secret_key: String,
    auth_type: AuthType,
}

impl AuthHandler {
    pub fn new(salt: &str, hash_count: usize, secret_key: &str, auth_type: AuthType) -> Self {
        Self {
            client: SimpleDynamoDBClient::new(hash_count, salt),
            secret_key: secret_key.to_string(),
            auth_type,
        }
    }

    fn register(&self, body: AuthBody) -> Result<LambdaOutput, HandlerError> {
        if self.client.is_registered(&body.user_id) {
            Ok(LambdaOutput::bad_request("This ID is already registered."))
        } else {
            self.client.register(&body.user_id, &body.password)?;
            let expire_time_second = Utc::now().timestamp() + EXPIRE_DURATION_SECONDS;
            let token_info = TokenInfo {
                expire_time_second,
                user_id: body.user_id,
            };
            let token = generate_token(&self.secret_key, &token_info)?;
            Ok(LambdaOutput {
                is_base64_encoded: false,
                status_code: STATUS_CODE_OK,
                body: token,
                headers: HashMap::new(),
            })
        }
    }

    fn login(&self, body: AuthBody) -> Result<LambdaOutput, HandlerError> {
        if !self.client.is_registered(&body.user_id) {
            Ok(LambdaOutput::bad_request("This ID is not registered."))
        } else if !self.client.is_valid_login(&body.user_id, &body.password) {
            Ok(LambdaOutput::bad_request("Invalid password."))
        } else {
            let expire_time_second = Utc::now().timestamp() + EXPIRE_DURATION_SECONDS;
            let token_info = TokenInfo {
                expire_time_second,
                user_id: body.user_id,
            };
            let token = generate_token(&self.secret_key, &token_info)?;
            Ok(LambdaOutput {
                is_base64_encoded: false,
                status_code: STATUS_CODE_OK,
                body: token,
                headers: HashMap::new(),
            })
        }
    }
}

impl Handler<LambdaInput, LambdaOutput, HandlerError> for AuthHandler {
    fn run(&mut self, event: LambdaInput, _: Context) -> Result<LambdaOutput, HandlerError> {
        let body = serde_json::from_str::<AuthBody>(&event.body)?;
        match self.auth_type {
            AuthType::Register => self.register(body),
            AuthType::Login => self.login(body),
        }
    }
}

#[derive(Deserialize, Debug, Clone)]
struct AuthBody {
    user_id: String,
    password: String,
}
