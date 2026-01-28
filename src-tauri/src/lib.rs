mod migrations;

use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon2, Params,
};

fn get_fast_argon_params() -> Params {
    Params::new(
        15360, // Memory: 15 MiB (for speed)
        2,     // Iterations: 2 passes (for speed)
        1,     // Parallelism: 1 thread
        None   // Default output length
    ).unwrap()
}

#[tauri::command]
fn hash_pin(pin: String) -> Result<String, String> {
    let salt = SaltString::generate(&mut OsRng);
    let params = get_fast_argon_params();
    let argon2 = Argon2::new(argon2::Algorithm::Argon2id, argon2::Version::V0x13, params);

    let password_hash = argon2.hash_password(pin.as_bytes(), &salt)
        .map_err(|e| e.to_string())?
        .to_string();

    Ok(password_hash)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let auth_migrations = migrations::get_auth_migrations();
    let pos_migrations = migrations::get_pos_migrations();

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:auth.db", auth_migrations)
                .add_migrations("sqlite:pos.db", pos_migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![hash_pin])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
