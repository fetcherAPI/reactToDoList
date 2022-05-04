import Task from "../Task/Task";
import "./tasklist.css";

export let TaskList = ({
  tasksList,
  onDelete,
  onAdd,
  onChangeStatusToDone,
  onChangeStatusToEdit,
}) => {
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
          onChangeStatusToDone={() => onChangeStatusToDone(task.id)}
          onChangeStatusToEdit={() => onChangeStatusToEdit(task.id)}
        />
      ))}
    </ul>
  );
};
