import Todo from './Todo';

export const Todos = ({ todos, removeTodo, updateTodo, toggleCompletion }) => {
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>Nota</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
              toggleCompletion={toggleCompletion}
            />
          ))
        ) : (
          <tr>
            <td colSpan='3' className='text-center'>
              No hay notas
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Todos;
