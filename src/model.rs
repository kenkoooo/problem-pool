use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TokenInfo {
    exp: u64,
}

#[derive(Debug, Clone)]
pub struct UserData {
    hashed_password: String,
    saved_data: String,
}
