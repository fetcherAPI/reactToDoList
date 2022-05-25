import { useState } from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import { TaskList } from "../TaskList/TaskList";
import { Footer } from "../Footer/Footer";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  function createNewTask(taskName, totalTime) {
    return {
      name: taskName,
      id: new Date().getTime(),
      status: "",
      dateCreated: new Date(),
      isCompleted: false,
      isEdit: false,
      totalTime,
    };
  }

  function deleteTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    setTasks(() => [...tasks.slice(0, index), ...tasks.slice(index + 1)]);
  }

  function addTask(taskName, totalTime) {
    setTasks(() => [...tasks, createNewTask(taskName, totalTime)]);
  }

  function changeStatus(arr, id, property) {
    const index = arr.findIndex((task) => task.id === id);
    const newTask = {
      ...arr[index],
      [property]: !arr[index][property],
    };

    return [...arr.slice(0, index), newTask, ...arr.slice(index + 1)];
  }

  function onDone(id) {
    setTasks(() => changeStatus(tasks, id, "isCompleted"));
  }

  function filterTasks(tasks, fillter) {
    switch (fillter) {
      case "all":
        return tasks;
      case "active":
        return tasks.filter((task) => !task.isCompleted);
      case "completed":
        return tasks.filter((task) => task.isCompleted);
      default:
        return tasks;
    }
  }

  function onFilterChange(filter) {
    setFilter(() => filter);
  }

  function deleteCompleted() {
    setTasks(() => {
      const newTasksList = tasks.filter((item) => !item.isCompleted);
      return newTasksList;
    });
  }

  function editTaskName(id, name) {
    const index = tasks.findIndex((task) => task.id === id);
    const newItem = { ...tasks[index], name };
    setTasks(() => [
      ...tasks.slice(0, index),
      newItem,
      ...tasks.slice(index + 1),
    ]);
  }

  const visibleTasks = filterTasks(tasks, filter);

  return (
    <div>
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <NewTaskForm onAdd={addTask} />
        </header>
        <section className='main'>
          <TaskList
            onAdd={addTask}
            tasksList={visibleTasks}
            onDelete={deleteTask}
            onDone={onDone}
            editTaskName={editTaskName}
          />
          <Footer
            tasksList={tasks}
            filter={filter}
            onFilterChange={onFilterChange}
            onDelete={deleteCompleted}
          />
        </section>
      </section>
    </div>
  );
}
