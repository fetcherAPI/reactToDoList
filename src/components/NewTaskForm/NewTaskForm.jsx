import "./newTaskForm.css";

export let NewTaskForm = ({ onAdd }) => {
  return (
    <div>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        autoFocus
        onKeyDown={() => onAdd("new task")}
      />
    </div>
  );
};
