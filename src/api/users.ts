import { invoke } from "@tauri-apps/api/core";

import { loadAuthDb } from "../database";

// sql: "CREATE TABLE IF NOT EXISTS users (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 name TEXT NOT NULL,
//                 role TEXT CHECK( role IN ('admin', 'cashier') ) NOT NULL,
//                 pin_hash TEXT NOT NULL,
//                 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//             );"

export interface User {
  id: number;
  name: string;
  role: "admin" | "cashier";
  pin_hash: string;
  created_at: string;
}

export const getUsers = async (): Promise<User[]> => {
  const db = await loadAuthDb();
  return await db.select<User[]>("SELECT * FROM users");
};

export const createUser = async (
  name: string,
  role: "admin" | "cashier",
  pin: string,
): Promise<User> => {
  //  if role admin exists, throw error
  const db = await loadAuthDb();

  const existingAdmins = await db.select<User[]>(
    "SELECT * FROM users WHERE role = $1",
    ["admin"],
  );

  if (role === "admin" && existingAdmins.length > 0) {
    throw new Error("An admin user already exists.");
  }

  const pin_hash = await invoke<string>("hash_pin", { pin });
  const result = await db.execute(
    "INSERT INTO users (name, role, pin_hash) VALUES ($1, $2, $3)",
    [name, role, pin_hash],
  );

  return {
    id: result.lastInsertId!,
    name,
    role,
    pin_hash,
    created_at: new Date().toISOString(),
  };
};
