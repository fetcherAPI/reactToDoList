import { NewTaskForm } from "../NewTaskForm/NewTaskForm";
import { TaskList } from "../TaskList/TaskList";
import { Footer } from "../Footer/Footer";
import { Counter } from "../Counter";
import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      fillter: "all",
    };
    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  createNewTask(taskName) {
    return {
      name: taskName,
      id: new Date().getTime(),
      status: "",
      isCompleted: false,
      isEdit: false,
    };
  }

  deleteTask(id) {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id);
      const newTasksList = [
        ...tasks.slice(0, index),
        ...tasks.slice(index + 1),
      ];

      return {
        tasks: newTasksList,
      };
    });
  }

  addTask(taskName) {
    this.setState(({ tasks }) => {
      const newTask = this.createNewTask(taskName);
      let newTaskList = [...tasks, newTask];
      return {
        tasks: newTaskList,
      };
    });
  }

  changeStatus(arr, id, property) {
    const index = arr.findIndex((task) => task.id === id);
    const newTask = {
      ...arr[index],
      [property]: !arr[index][property],
    };

    return [...arr.slice(0, index), newTask, ...arr.slice(index + 1)];
  }

  onDone = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.changeStatus(tasks, id, "isCompleted"),
      };
    });
  };

  fillterTasks(tasks, fillter) {
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

  onEdit = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.changeStatus(tasks, id, "isEdit"),
      };
    });
  };

  render() {
    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <NewTaskForm onAdd={this.addTask} />
          </header>
          <section className='main'>
            <TaskList
              onAdd={this.addTask}
              tasksList={this.state.tasks}
              onDelete={this.deleteTask}
              onDone={this.onDone}
              onEdit={this.onEdit}
            />
            <Footer tasksList={this.state.tasks} />
          </section>
        </section>
        <Counter />
      </div>
    );
  }
}
