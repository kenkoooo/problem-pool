use lambda_runtime::start;
use problem_pool::api::login::LoginHandler;
use std::env;
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let hash_count = env::var("HASH_COUNT")?.parse::<usize>()?;
    let salt = env::var("SALT")?;
    let secret_key = env::var("SECRET_KEY")?;

    start(LoginHandler::new(&salt, hash_count, &secret_key), None);
    Ok(())
}
