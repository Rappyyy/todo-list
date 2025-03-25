import { Request, Response } from 'express';
import { TodoRepository } from '../controllers/repository/implementation/todoRepository';
import { ITodoRequest } from '../controllers/types';

const todoRepo = new TodoRepository();

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const offset = Number(req.query.offset ?? 0);
    const limit = Number(req.query.limit ?? 10);

    const todos = await todoRepo.getTodos(offset, limit);
    res.status(200).json({ success: true, total: todos.length, offset, limit, data: todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching todos', error });
  }
};

export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await todoRepo.getTodoById(id);

    if (!todo) {
      res.status(404).json({ success: false, message: 'Todo not found' });
      return;
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching todo', error });
  }
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title }: ITodoRequest = req.body;

    if (!title) {
      res.status(400).json({ success: false, message: 'Title is required' });
      return;
    }

    const newTodo = await todoRepo.create({ title });
    res.status(201).json({ success: true, message: 'Todo created', data: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating todo', error });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title }: ITodoRequest = req.body;

    if (!title) {
      res.status(400).json({ success: false, message: 'Title is required' });
      return;
    }

    const updated = await todoRepo.updateTodo(id, { title });
    res.status(200).json({ success: true, message: 'Todo updated', data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating todo', error });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await todoRepo.delete(id);
    res.status(200).json({ success: true, message: 'Todo deleted', data: deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting todo', error });
  }
};
