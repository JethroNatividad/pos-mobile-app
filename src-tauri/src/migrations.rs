// https://v2.tauri.app/plugin/sql/#migrations

pub fn get_migrations() -> Vec<tauri_plugin_sql::Migration> {
    let migrations = vec![
        tauri_plugin_sql::Migration {
            version: 1,
            description: "create_todos_table",
            sql: "CREATE TABLE todos (id INTEGER PRIMARY KEY, title TEXT, status TEXT);",
            kind: tauri_plugin_sql::MigrationKind::Up,
        }
    ];
    return migrations;

}

