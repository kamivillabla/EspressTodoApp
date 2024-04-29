import express from 'express';
import { writeFile, readFile } from 'node:fs/promises';
import { nanoid } from 'nanoid';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

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
    const todos = await getTodos();
    res.json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve todos', error: error.toString() });
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todos = await getTodos();
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve todo', error: error.toString() });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo = {
      id: nanoid(),
      title,
      done: false,
    };

    let todos = await getTodos();
    todos.push(newTodo);
    await saveTodos(todos);
    res.status(201).json(newTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create todo', error: error.toString() });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, done } = req.body;

    let todos = await getTodos();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updatedTodo = {
      ...todos[index],
      ...(title !== undefined && { title }),
      ...(done !== undefined && { done }),
    };

    todos[index] = updatedTodo;
    await saveTodos(todos);
    res.json(updatedTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update todo', error: error.toString() });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;

    let todos = await getTodos();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'No existen notas' });
    }

    todos.splice(index, 1);
    await saveTodos(todos);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete todo', error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log('listening');
});
