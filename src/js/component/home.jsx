

import React, { useState, useEffect } from 'react';

const USER_API_URL = 'https://playground.4geeks.com/todo/users/matias';
const TODOS_API_URL = 'https://playground.4geeks.com/todo/todos/matias';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch(USER_API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.todos)) {
          setTodos(data.todos);
        } else {
          console.error('Error: Expected array of todos, received:', data);
          setTodos([]);
        }
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setTodos([]);
      });
  };

  const createUser = () => {
    fetch(USER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(data => {
        console.log('User created:', data);
      })
      .catch(error => console.error('Error creating user:', error));
  };

  const addTodo = () => {
    const newTodo = { label: newTask, done: false };
    fetch(TODOS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then(response => response.json())
      .then(data => {
        setTodos([...todos, data]);
        setNewTask('');
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  const deleteTodo = (id) => {
    if (!id) {
      console.error('Error deleting todo: Invalid id');
      return;
    }

    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  /*const deleteUser = () => {
    fetch(USER_API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('User deleted successfully');
        // Después de eliminar el usuario, eliminar todas las tareas asociadas al usuario
        return fetch(TODOS_API_URL, {
          method: 'DELETE',
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Todos deleted successfully');
        setTodos([]); // Limpiar la lista de tareas en el estado local
        fetchTodos(); // Volver a cargar los datos después de eliminar
      })
      .catch(error => console.error('Error deleting user:', error));
  };*/
  const deleteUser = () => {
    fetch(USER_API_URL, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .then(() => {
        console.log('User deleted');
        window.location.reload(); // Recargar la página después de eliminar el usuario
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={createUser}>Create User</button>
      <button onClick={deleteUser}>Delete User</button>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTodo}>Add Task</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.label}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
