import "./Task.css";
import { formatDistanceToNow } from "date-fns";
import { Component } from "react";
import PropTypes from "prop-types";
import { TimerOwn } from "../Timer/Timer";

export class Task extends Component {
  static propTypes = {
    taskName: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool,
    dateCreated: PropTypes.instanceOf(Date),
    onDelete: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    onAdd: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isCompleted: false,
    dateCreated: new Date(),
  };

  state = {
    newTaskName: "",
    isEdit: false,
  };

  editTask = (e) => {
    this.setState({
      taskName: e.target.value,
    });
  };

  editToggle = () => {
    this.setState((state) => ({ isEdit: !state.isEdit }));
  };

  onChangeTaskName = (e) => {
    this.setState(() => ({ newTaskName: e.target.value }));
  };

  setNewLabel = (e, editTaskName, newTaskName) => {
    e.preventDefault();
    editTaskName(newTaskName);
    this.editToggle();
  };
  render() {
    let {
      taskName,
      onDelete,
      onDone,
      isCompleted,
      dateCreated,
      editTaskName,
      totalTime,
    } = this.props;
    console.log(totalTime);
    const { isEdit, newTaskName } = this.state;

    let className = "";
    if (isCompleted) {
      className += "completed";
    }
    if (isEdit) {
      className += " editing";
    }

    return (
      <li className={className}>
        <div className='view'>
          <input className='toggle' type='checkbox' onClick={onDone} />
          <label>
            <span className='description'>{taskName}</span>
            <TimerOwn dateCreated={dateCreated} totalTime={totalTime} />
            <Timer dateCreated={dateCreated} />
          </label>
          <button className='icon icon-edit' onClick={this.editToggle}></button>
          <button className='icon icon-destroy' onClick={onDelete}></button>
        </div>
        {isEdit ? (
          <>
            <form
              onSubmit={(e) => this.setNewLabel(e, editTaskName, newTaskName)}
            >
              <input
                type='text'
                className='edit'
                defaultValue={taskName}
                onChange={this.onChangeTaskName}
                onClick={this.onChangeTaskName}
                autoFocus
              />
            </form>
          </>
        ) : null}
      </li>
    );
  }
}

class Timer extends Component {
  state = {
    time: 0,
  };

  componentDidMount() {
    this.setState({
      time: formatDistanceToNow(this.props.dateCreated),
    });
    this.interval = setInterval(() => {
      this.setState({
        time: formatDistanceToNow(this.props.dateCreated),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let { dateCreated } = this.props;
    return (
      <span className='created'>
        created {formatDistanceToNow(dateCreated, { addSuffix: true })}
      </span>
    );
  }
}

export default Task;
