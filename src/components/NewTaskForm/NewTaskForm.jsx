import { useState } from "react";
import "./newTaskForm.css";
import PropTypes from "prop-types";

export default function NewTaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState("");
  const [taskMin, setTaskMin] = useState("");
  const [taskSec, setTaskSec] = useState("");

  function handleSubmit(event) {
    const totalTime = taskMin * 60 + taskSec;
    event.preventDefault();
    onAdd(taskName, totalTime);
    setTaskMin("");
    setTaskName("");
    setTaskSec("");
  }

  return (
    <form className='new-task-form' onSubmit={handleSubmit}>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        autoFocus
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
        value={taskName}
      />
      <input
        className='new-todo-form__timer'
        placeholder='Min'
        onChange={(e) => {
          setTaskMin(+e.target.value);
        }}
        value={taskMin}
      />
      <input
        className='new-todo-form__timer'
        placeholder='Sec'
        onChange={(e) => {
          setTaskSec(+e.target.value);
        }}
        value={taskSec}
      />
      <button
        className='new-todo-form__button'
        type='submit'
        onClick={handleSubmit}
      ></button>
    </form>
  );
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
};

NewTaskForm.defaultProps = {
  onAdd: () => {},
};
