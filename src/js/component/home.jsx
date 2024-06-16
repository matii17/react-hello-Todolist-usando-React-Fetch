/*import React, { useState, useEffect } from 'react';
import '../../styles/index.css'; // Estilos CSS

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const username = 'matiassebastian';
  const apiUrl = `https://playground.4geeks.com/todo/users/${username}`;

  // Función para crear un nuevo usuario
  const createUser = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username })  // Formato correcto de la solicitud
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Detalles del error de la API:', errorDetails);
        throw new Error(`Error creando el usuario: ${response.status} ${response.statusText}`);
      }

      console.log(`Usuario ${username} creado exitosamente`);
    } catch (error) {
      console.error('Error creando el usuario:', error);
      setError('Error creando el usuario: ' + error.message);
    }
  };

  // Obtener tareas de la API cuando el componente se monta
  useEffect(() => {
    const initializeUserAndFetchTasks = async () => {
      await createUser();  // Crear usuario si no existe
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta');
          }
          return response.json();
        })
        .then(data => {
          if (data && data.todos) {
            setTasks(data.todos);  // Ajuste aquí para usar data.todos
          } else {
            setTasks([]);
          }
        })
        .catch(error => {
          console.error('Error obteniendo las tareas:', error);
          setError('Error obteniendo las tareas: ' + error.message);
        });
    };
    
    initializeUserAndFetchTasks();
  }, []);

  // Función para actualizar las tareas en el servidor
  const updateTasksOnServer = async (updatedTasks) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        body: JSON.stringify({ todos: updatedTasks }),  // Ajuste aquí para usar el formato correcto
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue correcta');
      }
      const data = await response.json();
      console.log('Tareas actualizadas exitosamente:', data);
    } catch (error) {
      console.error('Error actualizando las tareas:', error);
      setError('Error actualizando las tareas: ' + error.message);
    }
  };

  // Función para manejar la adición de una nueva tarea
  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, { label: newTask, done: false }];
    setTasks(updatedTasks);
    updateTasksOnServer(updatedTasks);
  };

  // Función para manejar la eliminación de una tarea
  const handleDeleteTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    updateTasksOnServer(updatedTasks);
  };

  // Función para manejar la limpieza de todas las tareas
  const handleClearTasks = () => {
    setTasks([]);
    updateTasksOnServer([]);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>Lista de Tareas</h1>
      <ul>
        {Array.isArray(tasks) && tasks.map((task, index) => (
          <li key={index}>
            {task.label}
            <button onClick={() => handleDeleteTask(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nueva tarea"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim() !== '') {
            handleAddTask(e.target.value.trim());
            e.target.value = '';
          }
        }}
      />
      <button onClick={handleClearTasks}>Limpiar Tareas</button>
    </div>
  );
};

export default Home;*/

import React, { useState, useEffect } from 'react';
import '../../styles/index.css'; // Estilos CSS

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const username = 'matiassebastian';
  const apiUrl = `https://playground.4geeks.com/todo/users/${username}`;

  // Función para crear un nuevo usuario
  const createUser = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }) // Formato correcto de la solicitud
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Detalles del error de la API:', errorDetails);
        throw new Error(`Error creando el usuario: ${response.status} ${response.statusText}`);
      }

      console.log(`Usuario ${username} creado exitosamente`);
    } catch (error) {
      console.error('Error creando el usuario:', error);
      setError('Error creando el usuario: ' + error.message);
    }
  };

  // Función para obtener las tareas desde la API
  const fetchTasksFromAPI = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue correcta');
      }
      const data = await response.json();
      if (data && data.todos) {
        setTasks(data.todos);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Error obteniendo las tareas:', error);
      setError('Error obteniendo las tareas: ' + error.message);
    }
  };

  // Obtener tareas de la API cuando el componente se monta
  useEffect(() => {
    const initializeUserAndFetchTasks = async () => {
      await createUser(); // Crear usuario si no existe
      await fetchTasksFromAPI();
    };

    initializeUserAndFetchTasks();
  }, []);

  // Función para actualizar las tareas en el servidor
  const updateTasksOnServer = async (updatedTasks) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        body: JSON.stringify({ todos: updatedTasks }), // Ajuste aquí para usar el formato correcto
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue correcta');
      }
      const data = await response.json();
      console.log('Tareas actualizadas exitosamente:', data);
    } catch (error) {
      console.error('Error actualizando las tareas:', error);
      setError('Error actualizando las tareas: ' + error.message);
    }
  };

  // Función para manejar la adición de una nueva tarea
  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, { label: newTask, done: false }];
    setTasks(updatedTasks);
    updateTasksOnServer(updatedTasks);
  };

  // Función para manejar la eliminación de una tarea
  const handleDeleteTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    updateTasksOnServer(updatedTasks);
  };

  // Función para manejar la limpieza de todas las tareas
  const handleClearTasks = () => {
    setTasks([]);
    updateTasksOnServer([]);
  };

  // Función para manejar la carga de tareas desde la API
  const handleLoadTasks = () => {
    fetchTasksFromAPI();
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>Lista de Tareas</h1>
      <ul>
        {Array.isArray(tasks) &&
          tasks.map((task, index) => (
            <li key={index}>
              {task.label}
              <button onClick={() => handleDeleteTask(index)}>Eliminar</button>
            </li>
          ))}
      </ul>
      <input
        type="text"
        placeholder="Nueva tarea"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim() !== '') {
            handleAddTask(e.target.value.trim());
            e.target.value = '';
          }
        }}
      />
      <button onClick={handleLoadTasks}>Cargar Tareas</button>
      <button onClick={handleClearTasks}>Limpiar Tareas</button>
    </div>
  );
};

export default Home;
