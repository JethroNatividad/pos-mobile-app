import Database from "@tauri-apps/plugin-sql";

let authDb: Database | null = null;
let posDb: Database | null = null;

export const loadAuthDb = async () => {
  if (!authDb) {
    authDb = await Database.load("sqlite:auth.db");
  }
  return authDb;
};

export const loadPosDb = async () => {
  if (!posDb) {
    posDb = await Database.load("sqlite:pos.db");
  }
  return posDb;
};
