import { NewTaskForm } from "../NewTaskForm/NewTaskForm";
import { TaskList } from "../TaskList/TaskList";
import { Footer } from "../Footer/Footer";
import { Counter } from "../Counter";
import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          id: 1,
          name: "Read a book",
          status: "",
          isCompleted: false,
          isEdit: false,
        },
        {
          id: 2,
          name: "learn React",
          status: "",
          isCompleted: false,
          isEdit: false,
        },
        {
          id: 3,
          name: "get up early",
          status: "",
          isCompleted: false,
          isEdit: false,
        },
      ],
    };
    this.a = this.createNewTask("new Task");
    this.maxId = 5;
    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onChangeStatusToDone = this.onChangeStatusToDone.bind(this);
    this.onChangeStatusToEdit = this.onChangeStatusToEdit.bind(this);
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
    console.log("this.a", this.a);
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
      console.log("newTask", newTask);
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

      return {
        tasks: [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)],
      };
    });
  };

  onChangeStatusToEdit = (id) => {
    console.log("this.state", this.state);
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id);
      const newTask = {
        ...tasks[index],
        isEdit: !tasks[index].isEdit,
      };

      return {
        tasks: [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)],
      };
    });
    console.log("this.state", this.state);
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
              onChangeStatusToDone={this.onChangeStatusToDone}
              onChangeStatusToEdit={this.onChangeStatusToEdit}
            />
            <Footer tasksList={this.state.tasks} />
          </section>
        </section>
        <Counter />
      </div>
    );
  }
}
