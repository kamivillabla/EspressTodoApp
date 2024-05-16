import express from 'express';
import { writeFile, readFile } from 'node:fs/promises';
import { nanoid } from 'nanoid';
import cors from 'cors';
import dotenv from 'dotenv';
import { todoModel } from './models/todo.model.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());
app.use(cors());

// Caché en memoria para los todos
let todosCache = null;

// Función para obtener los todos desde el archivo o la caché
const getTodos = async () => {
  if (todosCache) return todosCache;
  const fsResponse = await readFile('todos.json', 'utf-8');
  todosCache = JSON.parse(fsResponse);
  return todosCache;
};

// Función para guardar los todos en el archivo y actualizar la caché
const saveTodos = async (todos) => {
  todosCache = todos;
  await writeFile('todos.json', JSON.stringify(todos, null, 2));
};

app.get('/todos', async (req, res) => {
  try {
    const todos = await todoModel.findAll();
    return res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await todoModel.findById(id);
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/todos', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const newTodo = {
    title,
    done: false,
  };
  try {
    const todo = await todoModel.create(newTodo);
    return res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const { title, done } = req.body;
  try {
    const todo = await todoModel.update(id, title, done);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    return res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await todoModel.remove(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    return res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log('listening');
});
