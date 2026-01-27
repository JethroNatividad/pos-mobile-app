import { loadDb } from "../database";

export interface Todo {
  id: number;
  title: string;
  status: "PENDING" | "DONE";
}

export const getTodos = async (): Promise<Todo[]> => {
  const db = await loadDb();
  return await db.select<Todo[]>("SELECT * FROM todos");
};

export const createTodo = async (title: string): Promise<Todo> => {
  const db = await loadDb();
  // Insert and get the last inserted ID
  // Note: tauri-plugin-sql execute returns { lastInsertId: number, rowsAffected: number }
  const result = await db.execute(
    "INSERT INTO todos (title, status) VALUES ($1, $2)",
    [title, "PENDING"],
  );

  return {
    id: result.lastInsertId!,
    title,
    status: "PENDING",
  };
};

export const updateTodo = async (todo: Todo): Promise<void> => {
  const db = await loadDb();
  await db.execute("UPDATE todos SET title = $1, status = $2 WHERE id = $3", [
    todo.title,
    todo.status,
    todo.id,
  ]);
};

export const deleteTodo = async (id: number): Promise<void> => {
  const db = await loadDb();
  await db.execute("DELETE FROM todos WHERE id = $1", [id]);
};
