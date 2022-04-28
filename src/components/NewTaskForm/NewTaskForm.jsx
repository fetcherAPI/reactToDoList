import "./newTaskForm.css";

export let NewTaskForm = () => {
  return (
    <input
      className='new-todo'
      placeholder='What needs to be done?'
      autofocus
    />
  );
};
