import { invoke } from "@tauri-apps/api/core";

import { loadAuthDb } from "../database";

export interface User {
  id: number;
  name: string;
  role: "admin" | "cashier";
  pin_hash: string;
  created_at: string;
}

export interface Session {
  user_id: number | null;
  user_name: string | null;
  user_role: string | null;
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

// -- Session & Login --

export const verifyPin = async (
  pin: string,
  pinHash: string,
): Promise<boolean> => {
  return await invoke<boolean>("verify_pin", { pin, pinHash });
};

export const loginSession = async (
  userId: number,
  userName: string,
  userRole: string,
): Promise<void> => {
  await invoke("login", { userId, userName, userRole });
};

export const getSession = async (): Promise<Session> => {
  return await invoke<Session>("get_session");
};

export const logout = async (): Promise<void> => {
  await invoke("logout");
};

export const loginWithPin = async (pin: string): Promise<User> => {
  const users = await getUsers();

  for (const user of users) {
    const isValid = await verifyPin(pin, user.pin_hash);
    if (isValid) {
      await loginSession(user.id, user.name, user.role);
      return user;
    }
  }

  throw new Error("Invalid PIN.");
};

