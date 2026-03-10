mod auth;
mod inventory;
mod migrations;

use std::sync::Mutex;

// -- App Entry --

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let auth_migrations = migrations::get_auth_migrations();
    let pos_migrations = migrations::get_pos_migrations();

    tauri::Builder::default()
        .manage(auth::SessionState(Mutex::new(auth::UserSession::default())))
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:auth.db", auth_migrations)
                .add_migrations("sqlite:pos.db", pos_migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            auth::hash_pin,
            auth::verify_pin,
            auth::login,
            auth::get_session,
            auth::logout,
            inventory::get_inventory
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

