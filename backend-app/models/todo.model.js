import { pool } from '../database/connection.js';

const findAll = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    return rows;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};
const findById = async (id) => {
  const query = 'SELECT * FROM todos WHERE id = ?';
  try {
    const [rows] = await pool.query(query, [id]);

    return rows[0];
  } catch (error) {
    console.error('Error al buscar por ID:', error);
    return undefined;
  }
};

const create = async (todo) => {
  const query = 'INSERT INTO todos (title, done) VALUES (?, ?)';
  try {
    const result = await pool.query(query, [todo.title, todo.done]);

    if (result[0].insertId) {
      const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [
        result[0].insertId,
      ]);
      return rows[0];
    } else {
      throw new Error('Insert failed, no ID returned.');
    }
  } catch (error) {
    console.error('Error al crear un nuevo todo:', error);
    return null;
  }
};

const remove = async (id) => {
  try {
    const selectQuery = 'SELECT * FROM todos WHERE id = ?';
    const [selectedRows] = await pool.query(selectQuery, [id]);

    if (selectedRows.length > 0) {
      const deleteQuery = 'DELETE FROM todos WHERE id = ?';
      await pool.query(deleteQuery, [id]);
      return selectedRows[0];
    } else {
      throw new Error('No record found with the specified ID.');
    }
  } catch (error) {
    console.error('Error removing todo:', error);
    return null;
  }
};
const update = async (id, title, done) => {
  try {
    const updateQuery = 'UPDATE todos SET title = ?, done = ? WHERE id = ?';
    const result = await pool.query(updateQuery, [title, done, id]);

    if (result[0].affectedRows > 0) {
      const selectQuery = 'SELECT * FROM todos WHERE id = ?';
      const [rows] = await pool.query(selectQuery, [id]);
      return rows[0];
    } else {
      throw new Error(
        'No record found with the specified ID or no change was made.'
      );
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    return null;
  }
};

export const todoModel = {
  findAll,
  findById,
  create,
  remove,
  update,
};
