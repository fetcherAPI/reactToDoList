import Task from "../Task/Task";
import "./tasklist.css";

export let TaskList = ({ tasksList, onDelete, onAdd, onDone, onEdit }) => {
  return (
    <ul className='todo-list'>
      {tasksList.map((task) => (
        <Task
          key={task.id}
          taskName={task.name}
          isCompleted={task.isCompleted}
          isEdit={task.isEdit}
          onAdd={onAdd}
          onDelete={() => onDelete(task.id)}
          onDone={() => onDone(task.id)}
          onEdit={() => onEdit(task.id)}
        />
      ))}
    </ul>
  );
};
