import "./Task.css";
import { formatDistance, subDays } from "date-fns";
import { Component } from "react";

export class Task extends Component {
  render() {
    let {
      taskName,
      onDelete,
      onChangeStatusToDone,
      onChangeStatusToEddit,
      isCompleted,
      isEddit,
    } = this.props;

    let className = "";

    isCompleted ? (className += "completed") : (className += "");
    isEddit ? (className += "editing") : (className += "");

    return (
      <li className={className}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            onClick={onChangeStatusToDone}
          />
          <label>
            <span className='description'>{taskName}</span>
            <span className='created'>
              {formatDistance(subDays(new Date(), 1), new Date(), {
                addSuffix: true,
              })}
            </span>
          </label>
          <button
            className='icon icon-edit'
            onClick={onChangeStatusToEddit}
          ></button>
          <button className='icon icon-destroy' onClick={onDelete}></button>
        </div>
        {isEddit ? <input type='text' className='edit' /> : null}
      </li>
    );
  }
}

export default Task;
