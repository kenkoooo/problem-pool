use super::{
    LambdaInput, LambdaOutput, EXPIRE_DURATION_SECONDS, STATUS_CODE_BAD_REQUEST,
    STATUS_CODE_INTERNAL_ERROR, STATUS_CODE_OK,
};

use crate::api::data_store::DataStore;
use crate::api::TokenInfo;
use crate::auth::hash_password;
use crate::db::{KeyValueStore, SimpleDynamoDBClient};
use crate::jwt::generate_token;
use chrono::Utc;
use lambda_runtime::error::HandlerError;
use lambda_runtime::{Context, Handler};
use rusoto_dynamodb::DynamoDbClient;
use serde::Deserialize;
use serde_json::Value;
use sha2::Sha256;
use std::collections::HashMap;
use std::time::Instant;

#[derive(Deserialize, Debug, Clone)]
struct RegisterBody {
    user_id: String,
    password: String,
}

pub struct RegisterHandler {
    data_store: DataStore<SimpleDynamoDBClient<DynamoDbClient>>,
    secret_key: String,
}

impl RegisterHandler {
    pub fn new(salt: &str, hash_count: usize, secret_key: &str) -> Self {
        Self {
            data_store: DataStore::new(salt, hash_count),
            secret_key: secret_key.to_string(),
        }
    }
}

impl Handler<LambdaInput, LambdaOutput, HandlerError> for RegisterHandler {
    fn run(&mut self, event: LambdaInput, ctx: Context) -> Result<LambdaOutput, HandlerError> {
        let body = serde_json::from_str::<RegisterBody>(&event.body)?;
        if self.data_store.is_registered(&body.user_id) {
            Ok(LambdaOutput {
                is_base64_encoded: false,
                status_code: STATUS_CODE_BAD_REQUEST,
                body: "This ID is already registered.".to_string(),
                headers: HashMap::new(),
            })
        } else {
            self.data_store
                .register(&body.user_id, &body.password)
                .map(|_| {
                    let expire_time_second = Utc::now().timestamp() + EXPIRE_DURATION_SECONDS;
                    let token_info = TokenInfo {
                        expire_time_second,
                        user_id: body.user_id,
                    };
                    generate_token(&self.secret_key, &token_info)
                        .map(|token| LambdaOutput {
                            is_base64_encoded: false,
                            status_code: STATUS_CODE_OK,
                            body: token,
                            headers: HashMap::new(),
                        })
                        .unwrap_or_else(|| LambdaOutput {
                            is_base64_encoded: false,
                            status_code: STATUS_CODE_INTERNAL_ERROR,
                            body: "Failed to generate token.".to_string(),
                            headers: HashMap::new(),
                        })
                })
                .or_else(|err| {
                    eprintln!("{}", err);
                    Ok(LambdaOutput {
                        is_base64_encoded: false,
                        status_code: STATUS_CODE_INTERNAL_ERROR,
                        body: "Internal error.".to_string(),
                        headers: HashMap::new(),
                    })
                })
        }
    }
}
