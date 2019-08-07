use rusoto_core::Region;
use rusoto_dynamodb::{
    AttributeValue, AttributeValueUpdate, DynamoDb, DynamoDbClient, GetItemInput, UpdateItemInput,
};
use std::collections::HashMap;

pub struct SimpleDynamoDBClient<C> {
    client: C,
    table_name: String,
    key_field: String,
}

impl SimpleDynamoDBClient<DynamoDbClient> {
    pub fn new(table_name: &str, key_field: &str) -> Self {
        Self {
            client: DynamoDbClient::new(Region::ApNortheast1),
            table_name: table_name.to_string(),
            key_field: key_field.to_string(),
        }
    }
    fn create_dynamo_key(&self, key: &str) -> HashMap<String, AttributeValue> {
        let mut map = HashMap::new();
        map.insert(
            self.key_field.to_string(),
            AttributeValue {
                s: Some(key.to_string()),
                ..Default::default()
            },
        );
        map
    }
}

const DYNAMO_PASSWORD_FIELD: &str = "password";

pub trait KeyValueStore {
    fn put(&self, key: &str, value: (&str, &str)) -> Result<(), String>;
    fn get(&self, key: &str, field: &str) -> Option<String>;
}

impl KeyValueStore for SimpleDynamoDBClient<DynamoDbClient> {
    fn put(&self, key: &str, value: (&str, &str)) -> Result<(), String> {
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
            table_name: self.table_name.clone(),
            ..Default::default()
        };
        self.client
            .update_item(item)
            .sync()
            .map(|ok| ())
            .map_err(|err| format!("{:?}", err))
    }

    fn get(&self, key: &str, field: &str) -> Option<String> {
        self.client
            .get_item(GetItemInput {
                table_name: self.table_name.clone(),
                key: self.create_dynamo_key(key),
                attributes_to_get: Some(vec![field.to_string()]),
                ..Default::default()
            })
            .sync()
            .ok()
            .and_then(|item| item.item)
            .and_then(|mut map| map.into_iter().next())
            .and_then(|(_, attr)| attr.s)
    }
}
