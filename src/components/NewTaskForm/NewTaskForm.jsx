import "./newTaskForm.css";
// write a function wich can take a value of input
// and return a new object with the value of input
// and the value of id
// and the value of isCompleted and isEdit
// and the value of isEdit set to false

export let NewTaskForm = ({ onAdd }) => {
  return (
    <div>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        autoFocus
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onAdd(e.target.value);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
};
