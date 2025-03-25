import express from 'express';
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoController';

import { validatorTodo } from '../controllers/middleware/ToDoValidator';

const todoRoutes = express.Router();

todoRoutes.get('/getall', getTodos);
todoRoutes.get('/get/:id', getTodoById);
todoRoutes.post('/create', validatorTodo, createTodo);
todoRoutes.put('/update/:id',  updateTodo);
todoRoutes.delete('/delete/:id',  deleteTodo);

export default todoRoutes;
