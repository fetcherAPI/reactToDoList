import "./Task.css";
import { formatDistanceToNow } from "date-fns";
import { Component } from "react";
import PropTypes from "prop-types";

export class Task extends Component {
  static propTypes = {
    taskName: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool,
    isEdit: PropTypes.bool,
    dateCreated: PropTypes.instanceOf(Date),
    onDelete: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isCompleted: false,
    isEdit: false,
    dateCreated: new Date(),
  };

  state = {
    taskName: "",
  };

  editTask = (e) => {
    this.setState({
      taskName: e.target.value,
    });
  };

  render() {
    let {
      taskName,
      onDelete,
      onDone,
      onEdit,
      onAdd,
      isCompleted,
      isEdit,
      dateCreated,
    } = this.props;

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
            <Timer dateCreated={dateCreated} />
          </label>

          <button className='icon icon-edit' onClick={onEdit}></button>
          <button className='icon icon-destroy' onClick={onDelete}></button>
        </div>
        {isEdit ? (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onAdd(this.state.taskName);
              }}
            >
              <input
                type='text'
                className='edit'
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    this.editTask(e);
                  }
                }}
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
