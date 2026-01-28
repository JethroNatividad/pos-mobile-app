use tauri_plugin_sql::{Migration, MigrationKind};
// https://v2.tauri.app/plugin/sql/#migrations

pub fn get_auth_migrations() -> Vec<tauri_plugin_sql::Migration> {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_users_table",
            sql: "CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                role TEXT CHECK( role IN ('admin', 'cashier') ) NOT NULL,
                pin_hash TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );",
            kind: MigrationKind::Up,
        },
    ];
    return migrations;

}

pub fn get_pos_migrations() -> Vec<tauri_plugin_sql::Migration> {
    let migrations = vec![];
    return migrations;

}