import { NewTaskForm } from "../NewTaskForm/NewTaskForm";
import { TaskList } from "../TaskList/TaskList";
import { Footer } from "../Footer/Footer";
import { Counter } from "../Counter";
import { Component } from "react";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks: [
        {
          id: 1,
          name: "Read a book",
          status: "",
          isCompleted: false,
          isEddit: false,
        },
        {
          id: 2,
          name: "learn React",
          status: "",
          isCompleted: false,
          isEddit: false,
        },
        {
          id: 3,
          name: "get up early",
          status: "",
          isCompleted: false,
          isEddit: false,
        },
      ],
    };

    this.maxId = 5;
    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onChangeStatusToDone = this.onChangeStatusToDone.bind(this);
    this.onChangeStatusToEddit = this.onChangeStatusToEddit.bind(this);
  }

  createNewTask(taskName) {
    return {
      id: ++this.maxId,
      name: taskName,
      status: "",
      isCompleted: false,
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
      const newTask = {
        id: ++this.maxId,
        name: taskName,
        status: "",
        isCompleted: false,
      };

      let newTaskList = [...tasks, newTask];

      return {
        tasks: newTaskList,
      };
    });
  }

  onChangeStatusToDone = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id);
      const newTask = {
        ...tasks[index],
        isCompleted: !tasks[index].isCompleted,
      };
      const newTasksList = [
        ...tasks.slice(0, index),
        newTask,
        ...tasks.slice(index + 1),
      ];
      return {
        tasks: newTasksList,
      };
    });
  };

  onChangeStatusToEddit = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id);
      const newTask = {
        ...tasks[index],
        isEddit: !tasks[index].isEddit,
      };
      const newTasksList = [
        ...tasks.slice(0, index),
        newTask,
        ...tasks.slice(index + 1),
      ];
      return {
        tasks: newTasksList,
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
              tasksList={this.state.tasks}
              onDelete={this.deleteTask}
              onChangeStatusToDone={this.onChangeStatusToDone}
              onChangeStatusToEddit={this.onChangeStatusToEddit}
            />
            <Footer tasksList={this.state.tasks} />
          </section>
        </section>
        <Counter />
      </div>
    );
  }
}
