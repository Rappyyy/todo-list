// File: repository/ITodoRepository.ts
import { ITodo } from "../dto";
import { ITodoRequest } from "../types";

export interface ITodoRepository {
  create(todo: ITodoRequest): Promise<ITodo>;
  getTodos(offset?: number, limit?: number): Promise<ITodo[]>;
  getTodoById(todoId: string): Promise<ITodo | undefined>;
  updateTodo(id: string, todo: ITodoRequest): Promise<ITodo>;
  delete(id: string): Promise<ITodo>;
}
