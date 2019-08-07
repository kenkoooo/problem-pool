use lambda_runtime::{error::HandlerError, lambda, start, Context};
use rusoto_core::Region;

use std::collections::HashMap;
use std::error::Error;

use problem_pool::api::register::RegisterHandler;
use problem_pool::db::{KeyValueStore, SimpleDynamoDBClient};

fn main() -> Result<(), Box<dyn Error>> {
    let salt = "salt";
    let secret_key = "secret key";
    let hash_count = 7;

    start(RegisterHandler::new(salt, hash_count, secret_key), None);
    Ok(())
}
