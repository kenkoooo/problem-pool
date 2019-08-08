use crate::api::{refresh_token, LambdaInput, LambdaOutput, TokenInfo, STATUS_CODE_OK};
use crate::db::SimpleDynamoDBClient;
use crate::jwt::parse_token;
use chrono::Utc;
use lambda_runtime::error::HandlerError;
use lambda_runtime::{Context, Handler};
use rusoto_dynamodb::DynamoDbClient;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

pub struct SyncHandler {
    client: SimpleDynamoDBClient<DynamoDbClient>,
    secret_key: String,
}

impl SyncHandler {
    pub fn new(secret_key: &str) -> Self {
        Self {
            client: SimpleDynamoDBClient::for_sync(),
            secret_key: secret_key.to_string(),
        }
    }
}

#[derive(Deserialize)]
struct SyncBody {
    token: String,
    saved_data: Option<String>,
}

#[derive(Serialize)]
struct SyncResponse {
    token: String,
    loaded_data: Option<String>,
}

impl Handler<LambdaInput, LambdaOutput, HandlerError> for SyncHandler {
    fn run(&mut self, event: LambdaInput, _: Context) -> Result<LambdaOutput, HandlerError> {
        let body = serde_json::from_str::<SyncBody>(&event.body)?;
        let token_info = parse_token::<TokenInfo>(&self.secret_key, &body.token)?;
        if token_info.expire_time_second < Utc::now().timestamp() {
            Err(format_err!("Token expired"))?;
        }

        let user_id = token_info.user_id;
        let response = match body.saved_data {
            Some(saved_data) => {
                self.client.save_data(&user_id, &saved_data)?;
                SyncResponse {
                    token: refresh_token(&self.secret_key, &user_id)?,
                    loaded_data: None,
                }
            }
            None => SyncResponse {
                token: refresh_token(&self.secret_key, &user_id)?,
                loaded_data: Some(self.client.load_data(&user_id)?),
            },
        };
        let mut headers = HashMap::new();
        headers.insert("Access-Control-Allow-Origin".to_owned(), "*".to_owned());
        Ok(LambdaOutput {
            is_base64_encoded: false,
            status_code: STATUS_CODE_OK,
            body: serde_json::to_string(&response)?,
            headers,
        })
    }
}
