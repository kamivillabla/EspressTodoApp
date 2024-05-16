import { useState } from 'react';

const Todo = ({ todo, removeTodo, updateTodo, toggleCompletion }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleUpdate = () => {
    updateTodo(todo.id, editTitle, todo.done);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type='text'
            className='form-control'
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <span
            className={todo.done ? 'text-decoration-line-through' : undefined}
          >
            {todo.title}
          </span>
        )}
      </td>
      <td>
        <button
          className={
            todo.done ? 'btn btn-success btn-sm' : 'btn btn-warning btn-sm'
          }
          onClick={() => toggleCompletion(todo.id)}
        >
          {todo.done ? 'Completado' : 'Pendiente'}
        </button>
      </td>
      <td>
        {isEditing ? (
          <button
            className='btn btn-success btn-sm me-1'
            onClick={handleUpdate}
          >
            Save
          </button>
        ) : (
          <button
            className='btn btn-warning btn-sm me-1'
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        )}
        <button
          className='btn btn-danger btn-sm'
          onClick={() => removeTodo(todo.id)}
        >
          Borrar
        </button>
      </td>
    </tr>
  );
};

export default Todo;
