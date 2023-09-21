import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ResetButton from "./components/ResetButton";
import { tasks as Backup } from "../db-backup.json";

const serverPort = import.meta.env.VITE_SERVER_PORT;
console.log("Server port: ", serverPort);
console.log("Base URL: ", import.meta.env.BASE_URL);

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  console.log(`${import.meta.env.VITE_BASE_URL}:${serverPort}/tasks`);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      console.log(tasksFromServer);
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //Fetch tasks
  const fetchTasks = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}:${serverPort}/tasks`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = response.json();
    console.log(data);
    return data;
  };

  //Fetch a singular task
  const fetchTask = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}:${serverPort}/tasks/${id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = response.json();
    return data;
  };

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`${import.meta.env.VITE_BASE_URL}:${serverPort}/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  //Delete all tasks
  const deleteAllTasks = async () => {
    const data = await fetchTasks();
    for (let i = 1; i <= data.length; i++) {
      await deleteTask(data[i - 1]._id);
    }
  };

  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    await fetch(`${import.meta.env.VITE_BASE_URL}:${serverPort}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  //Add task
  const addTask = async (task) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}:${serverPort}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    const data = await res.json();
    if (!data.acknowledged) {
      throw new Error("Failed to create task");
    }
    const newTask = {
      ...task,
      _id: data.insertedId,
    };
    setTasks([...tasks, newTask]);
  };

  //copy backup
  const copyBackup = async () => {
    for (let i = 0; i <= Backup.length - 1; i++) {
      console.log(i);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}:${serverPort}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(Backup[i]),
        }
      );
      const data = await res.json();
      setTasks([...tasks, data]);
    }
  };

  const resetTasks = async () => {
    await deleteAllTasks();
    await copyBackup();
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        <h3 className="task">No tasks to show</h3>
      )}
      <ResetButton onClick={resetTasks} />
      <Footer />
    </div>
  );
}

export default App;
