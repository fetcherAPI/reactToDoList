import "./Task.css";
import { formatDistance, subDays } from "date-fns";

function Task({ status, taskName }) {
  let isEddit = status === "editing";

  return (
    <li className={status}>
      <div className='view'>
        <input className='toggle' type='checkbox' />
        <label>
          <span className='description'>{taskName}</span>
          <span className='created'>
            {formatDistance(subDays(new Date(), 1), new Date(), {
              addSuffix: true,
            })}
          </span>
        </label>
        <button className='icon icon-edit'></button>
        <button className='icon icon-destroy'></button>
      </div>
      {isEddit ? <input type='text' className='edit' /> : null}
    </li>
  );
}

export default Task;
