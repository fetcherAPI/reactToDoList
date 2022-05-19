import { NewTaskForm } from "../NewTaskForm/NewTaskForm";
import { TaskList } from "../TaskList/TaskList";
import { Footer } from "../Footer/Footer";
import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      filter: "all",
    };
    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onDone = this.onDone.bind(this);
  }

  createNewTask(taskName) {
    return {
      name: taskName,
      id: new Date().getTime(),
      status: "",
      dateCreated: new Date(),
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

  filterTasks(tasks, fillter) {
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

  onFilterChange = (filter) => {
    this.setState({
      filter,
    });
  };

  deleteCompleted = () => {
    this.setState(({ tasks }) => {
      const newTasksList = tasks.filter((item) => !item.isCompleted);
      return {
        tasks: newTasksList,
      };
    });
  };

  editTaskName = (id, name) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id);
      const newItem = { ...tasks[index], name };
      return {
        tasks: [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)],
      };
    });
  };

  render() {
    const { tasks, filter } = this.state;
    const visibleTasks = this.filterTasks(tasks, filter);

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
              tasksList={visibleTasks}
              onDelete={this.deleteTask}
              onDone={this.onDone}
              editTaskName={this.editTaskName}
            />
            <Footer
              tasksList={this.state.tasks}
              filter={filter}
              onFilterChange={this.onFilterChange}
              onDelete={this.deleteCompleted}
            />
          </section>
        </section>
      </div>
    );
  }
}
