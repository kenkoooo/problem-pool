use crate::auth::hash_password;
use crate::db::{KeyValueStore, SimpleDynamoDBClient};
use rusoto_dynamodb::DynamoDbClient;
use sha2::Sha256;

const TABLE_NAME: &str = "problem-pool";
const PRIMARY_KEY: &str = "user_id";
const PASSWORD_ATTRIBUTE: &str = "password";
const DATA_ATTRIBUTE: &str = "saved_data";

pub(crate) struct DataStore<K> {
    hash_count: usize,
    key_value_store: K,
    salt: String,
}

impl DataStore<SimpleDynamoDBClient<DynamoDbClient>> {
    pub(crate) fn new(salt: &str, hash_count: usize) -> Self {
        Self {
            hash_count,
            salt: salt.to_string(),
            key_value_store: SimpleDynamoDBClient::new(TABLE_NAME, PRIMARY_KEY),
        }
    }
}

impl<K> DataStore<K>
where
    K: KeyValueStore,
{
    pub(crate) fn is_registered(&self, user_id: &str) -> bool {
        self.key_value_store
            .get(user_id, PASSWORD_ATTRIBUTE)
            .is_some()
    }

    pub(crate) fn register(&self, user_id: &str, raw_password: &str) -> Result<(), String> {
        let hashed_password_binary =
            hash_password::<Sha256>(raw_password.as_bytes(), self.salt.as_str(), self.hash_count);
        let hashed_password_string = hex::encode(hashed_password_binary);
        self.key_value_store
            .put(user_id, (PASSWORD_ATTRIBUTE, &hashed_password_string))
    }

    pub(crate) fn is_valid_login(&self, user_id: &str, raw_password: &str) -> bool {
        match self.key_value_store.get(user_id, PASSWORD_ATTRIBUTE) {
            Some(stored_password_hash) => {
                let hashed_password_binary = hash_password::<Sha256>(
                    raw_password.as_bytes(),
                    self.salt.as_str(),
                    self.hash_count,
                );
                let hashed_password_string = hex::encode(hashed_password_binary);
                hashed_password_string == stored_password_hash
            }
            None => false,
        }
    }

    pub(crate) fn load_data(&self, user_id: &str) -> Option<String> {
        self.key_value_store.get(user_id, DATA_ATTRIBUTE)
    }

    pub(crate) fn save_data(&self, user_id: &str, data: &str) -> Result<(), String> {
        self.key_value_store.put(user_id, (DATA_ATTRIBUTE, data))
    }
}
