use serde::{Deserialize, Serialize};
use std::collections::HashMap;

pub mod login;
pub mod register;

const STATUS_CODE_OK: u32 = 200;
const STATUS_CODE_BAD_REQUEST: u32 = 400;

const EXPIRE_DURATION_SECONDS: i64 = 24 * 3600;

#[derive(Serialize, Debug, Clone)]
pub struct LambdaOutput {
    #[serde(rename = "isBase64Encoded")]
    is_base64_encoded: bool,
    #[serde(rename = "statusCode")]
    status_code: u32,
    body: String,
    headers: HashMap<String, String>,
}

impl LambdaOutput {
    fn bad_request(msg: &str) -> Self {
        LambdaOutput {
            is_base64_encoded: false,
            status_code: STATUS_CODE_BAD_REQUEST,
            body: msg.to_string(),
            headers: HashMap::new(),
        }
    }
}

#[derive(Deserialize, Debug, Clone)]
pub struct LambdaInput {
    body: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TokenInfo {
    expire_time_second: i64,
    user_id: String,
}
