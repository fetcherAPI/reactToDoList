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
        {
          id: 4,
          name: "get up early",
          status: "completed",
          isCompleted: true,
          isEddit: false,
        },
      ],
    };

    this.maxId = 5;
    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onChangeStatusToDone = this.onChangeStatusToDone.bind(this);
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

  addTask(value) {
    this.setState(({ tasks }) => {
      const newTask = {
        id: ++this.maxId,
        name: value,
        status: "",
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
      const newTask = { ...tasks[index], isCompleted: !tasks[index].like };
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

  changeStatusToEddit = () => {
    this.setState(({ isEddit }) => {
      return {
        isEddit: !isEddit,
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
            />
            <Footer tasksList={this.state.tasks} />
          </section>
        </section>
        <Counter />
        <div>{`${this.state.tasks[2].isCompleted}`}</div>
      </div>
    );
  }
}
