use base64;
use base64::{decode_config, encode_config, URL_SAFE_NO_PAD};
use hmac::{Hmac, Mac};
use serde::Serialize;
use serde_json;
use sha2::Sha256;

const HEADER: &str = r#"{"alg":"HS256","type":"JWT"}"#;

pub fn generate_token<S>(key: &str, payload: &S) -> Option<String>
where
    S: Serialize,
{
    let payload = serde_json::to_string(&payload).ok()?;
    let body = encode_config(HEADER, URL_SAFE_NO_PAD)
        + "."
        + encode_config(&payload, URL_SAFE_NO_PAD).as_str();

    let mut mac = Hmac::<Sha256>::new_varkey(key.as_bytes()).ok()?;
    mac.input(body.as_bytes());
    let code_bytes = mac.result().code();

    let signature = encode_config(&code_bytes, URL_SAFE_NO_PAD);
    let token = body + "." + signature.as_str();
    Some(token)
}

pub fn is_verified(token: &str, key: &str) -> bool {
    let mut iter = token.split('.');
    let header = iter.next();
    let payload = iter.next();
    let signature = iter
        .next()
        .and_then(|signature| decode_config(signature, URL_SAFE_NO_PAD).ok());

    let mac = Hmac::<Sha256>::new_varkey(key.as_bytes());
    match (header, payload, signature, mac) {
        (Some(header), Some(payload), Some(signature), Ok(mut mac)) => {
            let input = header.to_string() + "." + payload;
            mac.input(input.as_bytes());
            mac.verify(&signature).is_ok()
        }
        _ => false,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[derive(Serialize)]
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
    }

    #[test]
    fn test_verify() {
        let request = RequestBody {
            user_id: "kenkoooo".to_string(),
        };
        let key = "my secret key";
        let token = generate_token(key, &request).unwrap();
        assert!(is_verified(&token, key));
        assert!(!is_verified(&token, "invalid key"));
    }
}
