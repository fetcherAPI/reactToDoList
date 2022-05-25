import "./Task.css";
import { formatDistanceToNow } from "date-fns";
import { Component } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { TimerOwn } from "../Timer/Timer";

export function Task({
  taskName,
  id,
  onDelete,
  onDone,
  isCompleted,
  dateCreated,
  editTaskName,
  totalTime,
}) {
  const [newTaskName, setNewTaskName] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // const editTask = (e) => {
  //   // setState({
  //   //   taskName: e.target.value,
  //   // });
  //   setNewTaskName(e.target.value);
  // };

  const editToggle = () => {
    // setState((state) => ({ isEdit: !state.isEdit }));
    setIsEdit(!isEdit);
  };

  const onChangeTaskName = (e) => {
    // setState(() => ({ newTaskName: e.target.value }));
    setNewTaskName(e.target.value);
  };

  const setNewLabel = (e, editTaskName, newTaskName) => {
    e.preventDefault();
    editTaskName(id, newTaskName);
    editToggle();
  };

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
          <TimerOwn
            dateCreated={dateCreated}
            totalTime={totalTime}
            isCompleted={isCompleted}
          />
          <Timer dateCreated={dateCreated} />
        </label>
        <button className='icon icon-edit' onClick={editToggle}></button>
        <button className='icon icon-destroy' onClick={onDelete}></button>
      </div>
      {isEdit ? (
        <>
          <form onSubmit={(e) => setNewLabel(e, editTaskName, newTaskName)}>
            <input
              type='text'
              className='edit'
              defaultValue={taskName}
              onChange={onChangeTaskName}
              onClick={onChangeTaskName}
              autoFocus
            />
          </form>
        </>
      ) : null}
    </li>
  );
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

Task.propTypes = {
  taskName: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  dateCreated: PropTypes.instanceOf(Date),
  onDelete: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func.isRequired,
};

Task.defaultProps = {
  isCompleted: false,
  dateCreated: new Date(),
};

export default Task;
