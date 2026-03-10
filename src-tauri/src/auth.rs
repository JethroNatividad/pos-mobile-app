use std::sync::Mutex;
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2, Params,
};
use serde::Serialize;

// -- Session State --

#[derive(Default, Serialize, Clone)]
pub struct UserSession {
    pub user_id: Option<i64>,
    pub user_name: Option<String>,
    pub user_role: Option<String>,
}

pub struct SessionState(pub Mutex<UserSession>);

// -- Argon2 Helpers --

fn get_fast_argon_params() -> Params {
    Params::new(
        15360, // Memory: 15 MiB (for speed)
        2,     // Iterations: 2 passes (for speed)
        1,     // Parallelism: 1 thread
        None,  // Default output length
    )
    .unwrap()
}

// -- Commands --

#[tauri::command]
pub fn hash_pin(pin: String) -> Result<String, String> {
    let salt = SaltString::generate(&mut OsRng);
    let params = get_fast_argon_params();
    let argon2 = Argon2::new(argon2::Algorithm::Argon2id, argon2::Version::V0x13, params);

    let password_hash = argon2
        .hash_password(pin.as_bytes(), &salt)
        .map_err(|e| e.to_string())?
        .to_string();

    Ok(password_hash)
}

#[tauri::command]
pub fn verify_pin(pin: String, pin_hash: String) -> Result<bool, String> {
    let parsed_hash = PasswordHash::new(&pin_hash).map_err(|e| e.to_string())?;
    let params = get_fast_argon_params();
    let argon2 = Argon2::new(argon2::Algorithm::Argon2id, argon2::Version::V0x13, params);
    Ok(argon2
        .verify_password(pin.as_bytes(), &parsed_hash)
        .is_ok())
}

#[tauri::command]
pub fn login(
    state: tauri::State<'_, SessionState>,
    user_id: i64,
    user_name: String,
    user_role: String,
) {
    let mut session = state.0.lock().unwrap();
    session.user_id = Some(user_id);
    session.user_name = Some(user_name);
    session.user_role = Some(user_role);
}

#[tauri::command]
pub fn get_session(state: tauri::State<'_, SessionState>) -> UserSession {
    state.0.lock().unwrap().clone()
}

#[tauri::command]
pub fn logout(state: tauri::State<'_, SessionState>) {
    let mut session = state.0.lock().unwrap();
    *session = UserSession::default();
}
