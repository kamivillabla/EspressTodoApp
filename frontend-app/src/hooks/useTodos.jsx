// hooks/useTodos.js
import { useState, useCallback } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const fetchAPI = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error HTTP! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener datos: ', error);
      alert('Algo salió mal');
      return null;
    }
  };

  const getTodos = useCallback(async () => {
    const todos = await fetchAPI('http://localhost:5000/todos');
    if (todos) setTodos(todos);
  }, []);

  const addTodo = useCallback(async (title) => {
    const todo = await fetchAPI('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (todo) setTodos((prev) => [...prev, todo]);
  }, []);

  const removeTodo = useCallback(async (id) => {
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } else {
      alert('Algo salió mal al intentar eliminar el todo');
    }
  }, []);
  const updateTodo = useCallback(
    async (id, title, done) => {
      const updatedTodo = { title, done };
      const updated = await fetchAPI(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      if (updated) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updated : todo))
        );
      } else {
        alert('Algo salió mal al actualizar el todo');
      }
    },
    [todos]
  );
  const toggleCompletion = useCallback(
    async (id) => {
      const todoToUpdate = todos.find((t) => t.id === id);
      const updatedTodo = { ...todoToUpdate, done: !todoToUpdate.done };
      const updated = await fetchAPI(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      if (updated) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updated : todo))
        );
      } else {
        alert('Algo salió mal al cambiar el estado de completado');
      }
    },
    [todos]
  );

  return {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
    toggleCompletion,
    getTodos,
  };
};

export default useTodos;
