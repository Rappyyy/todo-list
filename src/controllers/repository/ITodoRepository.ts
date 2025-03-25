import { ITodo } from "../dto";
import { ITodoRequest } from "../types";

export interface IUserRepository {
    create(user : ITodoRequest) : Promise<ITodo>
    getTodos() : Promise <ITodo[]>
    getTodoById(userId: string) : Promise <ITodo | undefined>
    updateTodo(id: string, user: ITodoRequest): Promise<ITodo>
    delete(id: string): Promise<ITodo>
}