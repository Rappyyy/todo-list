import mySqlPool from "../../../config/db";
import { ITodo } from "../../dto";
import { ITodoRequest } from "../../types";
import { ITodoRepository } from "../ITodoRepository";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface TodoRow extends RowDataPacket {
  id: number;
  title: string;
}

export class TodoRepository implements ITodoRepository {
  async create(todo: ITodoRequest): Promise<ITodo> {
    const [result] = await mySqlPool.query<ResultSetHeader>(
      "INSERT INTO todos (title) VALUES (?)",
      [todo.title]
    );

    return {
      id: result.insertId.toString(),
      title: todo.title,
    };
  }

  async getTodos(offset = 0, limit = 10): Promise<ITodo[]> {
    const [rows] = await mySqlPool.query<TodoRow[]>(
      "SELECT * FROM todos LIMIT ? OFFSET ?",
      [limit, offset]
    );

    return rows.map((row) => ({
      id: row.id.toString(),
      title: row.title,
    }));
  }

  async getTodoById(todoId: string): Promise<ITodo | undefined> {
    const [rows] = await mySqlPool.query<TodoRow[]>(
      "SELECT * FROM todos WHERE id = ?",
      [todoId]
    );

    if (rows.length === 0) return undefined;

    return {
      id: rows[0].id.toString(),
      title: rows[0].title,
    };
  }

  async updateTodo(id: string, todo: ITodoRequest): Promise<ITodo> {
    await mySqlPool.query("UPDATE todos SET title = ? WHERE id = ?", [
      todo.title,
      id,
    ]);

    return {
      id,
      title: todo.title,
    };
  }

  async delete(id: string): Promise<ITodo> {
    const existing = await this.getTodoById(id);
    if (!existing) throw new Error("Todo not found");

    await mySqlPool.query("DELETE FROM todos WHERE id = ?", [id]);
    return existing;
  }
}
