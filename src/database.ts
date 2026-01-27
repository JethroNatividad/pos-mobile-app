import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

export const loadDb = async () => {
  if (!db) {
    db = await Database.load("sqlite:app.db");
  }
  return db;
};
