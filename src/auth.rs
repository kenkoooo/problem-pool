use sha2::{Digest, Sha256};

fn hash_password_once<D: Digest>(password: &[u8], salt: &str) -> Vec<u8> {
    let mut hasher = D::new();
    hasher.input(password);
    hasher.input(b"$");
    hasher.input(salt.as_bytes());
    Vec::from(hasher.result().as_slice())
}

pub fn hash_password<D: Digest>(password: &[u8], salt: &str, count: usize) -> Vec<u8> {
    let mut buffer = Vec::from(password);
    for _ in 0..count {
        buffer = hash_password_once::<D>(&buffer, salt);
    }
    buffer
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hash_password_once() {
        let password = "password";
        let hashed = hash_password_once::<Sha256>(password.as_bytes(), "salt");
        assert_ne!(password.as_bytes(), hashed.as_slice());
    }

    #[test]
    fn test_hash_password() {
        let password = "password";
        let hashed = hash_password::<Sha256>(password.as_bytes(), "salt", 3);
        assert_ne!(password.as_bytes(), hashed.as_slice());
    }
}
