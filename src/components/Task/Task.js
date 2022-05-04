import "./Task.css";
import { formatDistance, subDays } from "date-fns";
import { Component } from "react";

export class Task extends Component {
  render() {
    let { taskName, onDelete, onDone, onEdit, isCompleted, isEdit } =
      this.props;

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
            <span className='created'>
              {formatDistance(subDays(new Date(), 1), new Date(), {
                addSuffix: true,
              })}
            </span>
          </label>
          <button className='icon icon-edit' onClick={onEdit}></button>
          <button className='icon icon-destroy' onClick={onDelete}></button>
        </div>
        {isEdit ? (
          <input
            type='text'
            className='edit'
            onSubmit={() => {
              onEdit(taskName);
            }}
          />
        ) : null}
      </li>
    );
  }
}

export default Task;
