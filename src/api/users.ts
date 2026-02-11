import { invoke } from "@tauri-apps/api/core";

import { loadAuthDb } from "../database";

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

export const hasAdmin = async (): Promise<boolean> => {
  const db = await loadAuthDb();
  const result = await db.select<User[]>(
    "SELECT * FROM users WHERE role = $1",
    ["admin"],
  );
  return result.length > 0;
};

export const createUser = async (
  name: string,
  role: "admin" | "cashier",
  pin: string,
): Promise<User> => {
  //  if role admin exists, throw error
  const db = await loadAuthDb();

  const hasExistingAdmin = await hasAdmin();

  if (role === "admin" && hasExistingAdmin) {
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
