use base64;
use base64::{decode_config, encode_config, URL_SAFE_NO_PAD};
use failure::Error;
use hmac::{Hmac, Mac};
use serde::{de::DeserializeOwned, Deserialize, Serialize};
use serde_json;
use sha2::Sha256;

const HEADER: &str = r#"{"alg":"HS256","type":"JWT"}"#;

pub fn generate_token<S>(key: &str, payload: &S) -> Result<String, Error>
where
    S: Serialize,
{
    let payload = serde_json::to_string(&payload)?;
    let body = encode_config(HEADER, URL_SAFE_NO_PAD)
        + "."
        + encode_config(&payload, URL_SAFE_NO_PAD).as_str();

    let mut mac =
        Hmac::<Sha256>::new_varkey(key.as_bytes()).map_err(|e| format_err!("{}", e.to_string()))?;
    mac.input(body.as_bytes());
    let code_bytes = mac.result().code();

    let signature = encode_config(&code_bytes, URL_SAFE_NO_PAD);
    let token = body + "." + signature.as_str();
    Ok(token)
}

pub struct Token<T> {
    payload: T,
}

impl<T> Token<T>
where
    T: DeserializeOwned,
{
    pub fn parse(token: &str, key: &str) -> Result<Token<T>, Error> {
        let mut iter = token.split('.');
        let header = iter.next().ok_or_else(|| format_err!("Invalid token."))?;
        let payload = iter.next().ok_or_else(|| format_err!("Invalid token."))?;
        let signature = iter.next().ok_or_else(|| format_err!("Invalid token."))?;
        let signature =
            decode_config(signature, URL_SAFE_NO_PAD).map_err(|err| format_err!("{}", err))?;
        let mut mac =
            Hmac::<Sha256>::new_varkey(key.as_bytes()).map_err(|err| format_err!("{}", err))?;
        let input = header.to_string() + "." + payload;
        mac.input(input.as_bytes());
        mac.verify(&signature)
            .map_err(|err| format_err!("{}", err))?;
        let payload =
            decode_config(payload, URL_SAFE_NO_PAD).map_err(|err| format_err!("{}", err))?;
        let payload = serde_json::from_str::<T>(String::from_utf8(payload)?.as_str())?;
        Ok(Token { payload })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[derive(Serialize, Deserialize)]
    struct RequestBody {
        user_id: String,
    }

    #[test]
    fn test_generate_token() {
        let request = RequestBody {
            user_id: "kenkoooo".to_string(),
        };
        let key = "my secret key";

        let token = generate_token(key, &request).unwrap();
        assert_eq!("eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJ1c2VyX2lkIjoia2Vua29vb28ifQ.DiwnSGxzPsG5l0G0EpOOjJDLgK9z9mnrKYbk9wkOJPc".to_string(), token);
        assert!(Token::<RequestBody>::parse(&token, &key).is_ok());

        let token = r#"eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJ1c2VyX2lkIjoia2Vua29vb28ifQ.DiwnSGxzPsG5l0G0EpOOjJDLgK9z9mnrKYbk9wkOJPd"#;
        assert!(Token::<RequestBody>::parse(&token, &key).is_err());
    }
}
