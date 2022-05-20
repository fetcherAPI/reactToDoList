import { Component } from "react";
import "./newTaskForm.css";
import PropTypes from "prop-types";

export class NewTaskForm extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onAdd: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      taskMin: "",
      taskSec: "",
      taskName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(prop, value) {
    this.setState({
      [prop]: value,
    });
  }

  handleSubmit(event) {
    let { taskMin, taskSec, taskName } = this.state;
    const totalTime = taskMin * 60 + taskSec;
    event.preventDefault();
    this.props.onAdd(taskName, totalTime);
    this.setState({
      taskName: "",
      taskMin: "",
      taskSec: "",
    });
  }

  render() {
    return (
      <form className='new-task-form' onSubmit={this.handleSubmit}>
        <input
          className='new-todo'
          placeholder='What needs to be done?'
          autoFocus
          onChange={(e) => {
            this.handleChange("taskName", e.target.value);
          }}
          value={this.state.taskName}
        />
        <input
          className='new-todo-form__timer'
          placeholder='Min'
          autoFocus
          onChange={(e) => {
            this.handleChange("taskMin", +e.target.value);
          }}
          value={this.state.taskMin}
        />
        <input
          className='new-todo-form__timer'
          placeholder='Sec'
          autoFocus
          onChange={(e) => {
            this.handleChange("taskSec", +e.target.value);
          }}
          value={this.state.taskSec}
        />
        <button
          className='new-todo-form__button'
          type='submit'
          onClick={this.handleSubmit}
        ></button>
      </form>
    );
  }
}
