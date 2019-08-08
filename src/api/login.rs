use super::{LambdaInput, LambdaOutput, STATUS_CODE_OK};

use crate::api::refresh_token;
use crate::db::SimpleDynamoDBClient;
use lambda_runtime::error::HandlerError;
use lambda_runtime::{Context, Handler};
use rusoto_dynamodb::DynamoDbClient;
use serde::{Deserialize, Serialize};
use serde_json;
use std::collections::HashMap;

pub struct LoginHandler {
    client: SimpleDynamoDBClient<DynamoDbClient>,
    secret_key: String,
}

#[derive(Serialize)]
struct AuthOutput {
    token: String,
}

impl LoginHandler {
    pub fn new(salt: &str, hash_count: usize, secret_key: &str) -> Self {
        Self {
            client: SimpleDynamoDBClient::new(hash_count, salt),
            secret_key: secret_key.to_string(),
        }
    }

    fn register(&self, body: AuthBody) -> Result<LambdaOutput, HandlerError> {
        if self.client.is_registered(&body.user_id) {
            Ok(LambdaOutput::bad_request("This ID is already registered."))
        } else {
            self.client.register(&body.user_id, &body.password)?;
            let token = refresh_token(&self.secret_key, &body.user_id)?;
            Ok(LambdaOutput {
                is_base64_encoded: false,
                status_code: STATUS_CODE_OK,
                body: serde_json::to_string(&AuthOutput { token })?,
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
            let token = refresh_token(&self.secret_key, &body.user_id)?;
            Ok(LambdaOutput {
                is_base64_encoded: false,
                status_code: STATUS_CODE_OK,
                body: serde_json::to_string(&AuthOutput { token })?,
                headers: HashMap::new(),
            })
        }
    }
}

impl Handler<LambdaInput, LambdaOutput, HandlerError> for LoginHandler {
    fn run(&mut self, event: LambdaInput, _: Context) -> Result<LambdaOutput, HandlerError> {
        let body = serde_json::from_str::<AuthBody>(&event.body)?;
        if body.register {
            self.register(body)
        } else {
            self.login(body)
        }
    }
}

#[derive(Deserialize, Debug, Clone)]
struct AuthBody {
    user_id: String,
    password: String,
    register: bool,
}
