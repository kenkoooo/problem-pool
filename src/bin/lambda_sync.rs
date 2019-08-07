use lambda_runtime::start;
use problem_pool::api::sync::SyncHandler;
use std::env;
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let secret_key = env::var("SECRET_KEY")?;
    start(SyncHandler::new(&secret_key), None);
    Ok(())
}
