use crate::auth::hash_password;
use failure::Error;
use rusoto_core::Region;
use rusoto_dynamodb::{
    AttributeValue, AttributeValueUpdate, DynamoDb, DynamoDbClient, GetItemInput, UpdateItemInput,
};
use sha2::Sha256;
use std::collections::HashMap;

const TABLE_NAME: &str = "problem-pool";
const PRIMARY_KEY: &str = "user_id";
const PASSWORD_ATTRIBUTE: &str = "password";
const DATA_ATTRIBUTE: &str = "saved_data";

pub(crate) struct SimpleDynamoDBClient<C> {
    client: C,
    hash_count: Option<usize>,
    salt: Option<String>,
}

impl SimpleDynamoDBClient<DynamoDbClient> {
    pub(crate) fn new(hash_count: usize, salt: &str) -> Self {
        Self {
            client: DynamoDbClient::new(Region::ApNortheast1),
            hash_count: Some(hash_count),
            salt: Some(salt.to_string()),
        }
    }
    pub(crate) fn for_sync() -> Self {
        Self {
            client: DynamoDbClient::new(Region::ApNortheast1),
            hash_count: None,
            salt: None,
        }
    }

    fn create_dynamo_key(&self, key: &str) -> HashMap<String, AttributeValue> {
        let mut map = HashMap::new();
        map.insert(
            PRIMARY_KEY.to_string(),
            AttributeValue {
                s: Some(key.to_string()),
                ..Default::default()
            },
        );
        map
    }

    fn put(&self, key: &str, value: (&str, &str)) -> Result<(), Error> {
        let key = self.create_dynamo_key(key);

        let (value_column, value) = value;
        let mut value_map = HashMap::new();
        value_map.insert(
            value_column.to_string(),
            AttributeValueUpdate {
                action: Some("PUT".to_string()),
                value: Some(AttributeValue {
                    s: Some(value.to_string()),
                    ..Default::default()
                }),
            },
        );

        let item = UpdateItemInput {
            key,
            attribute_updates: Some(value_map),
            table_name: TABLE_NAME.to_string(),
            ..Default::default()
        };
        self.client
            .update_item(item)
            .sync()
            .map(|_| ())
            .map_err(|e| format_err!("{}", e.to_string()))
    }

    fn get(&self, key: &str, field: &str) -> Result<String, Error> {
        self.client
            .get_item(GetItemInput {
                table_name: TABLE_NAME.to_string(),
                key: self.create_dynamo_key(key),
                attributes_to_get: Some(vec![field.to_string()]),
                ..Default::default()
            })
            .sync()
            .ok()
            .and_then(|item| item.item)
            .and_then(|map| map.into_iter().next())
            .and_then(|(_, attr)| attr.s)
            .ok_or_else(|| format_err!("Item not found"))
    }

    pub(crate) fn is_registered(&self, user_id: &str) -> bool {
        self.get(user_id, PASSWORD_ATTRIBUTE).is_ok()
    }

    pub(crate) fn register(&self, user_id: &str, raw_password: &str) -> Result<(), Error> {
        let salt = self
            .salt
            .as_ref()
            .ok_or_else(|| format_err!("Salt is not set."))?;
        let hash_count = self
            .hash_count
            .ok_or_else(|| format_err!("Hash-count is not set."))?;
        let hashed_password_binary =
            hash_password::<Sha256>(raw_password.as_bytes(), salt, hash_count);
        let hashed_password_string = hex::encode(hashed_password_binary);
        self.put(user_id, (PASSWORD_ATTRIBUTE, &hashed_password_string))
    }

    pub(crate) fn is_valid_login(&self, user_id: &str, raw_password: &str) -> bool {
        let salt = self.salt.as_ref();
        if salt.is_none() {
            return false;
        }
        let salt = salt.unwrap();

        let hash_count = self.hash_count;
        if hash_count.is_none() {
            return false;
        }
        let hash_count = hash_count.unwrap();

        match self.get(user_id, PASSWORD_ATTRIBUTE) {
            Ok(stored_password_hash) => {
                let hashed_password_binary =
                    hash_password::<Sha256>(raw_password.as_bytes(), salt, hash_count);
                let hashed_password_string = hex::encode(hashed_password_binary);
                hashed_password_string == stored_password_hash
            }
            _ => false,
        }
    }

    pub(crate) fn load_data(&self, user_id: &str) -> Result<String, Error> {
        self.get(user_id, DATA_ATTRIBUTE)
    }

    pub(crate) fn save_data(&self, user_id: &str, data: &str) -> Result<(), Error> {
        self.put(user_id, (DATA_ATTRIBUTE, data))
    }
}
