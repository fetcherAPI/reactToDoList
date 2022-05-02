import Task from "../Task/Task";
import "./tasklist.css";

export let TaskList = ({ tasksList, onDelete, onChangeStatusToDone }) => {
  let elements = tasksList.map((item) => {
    let { id, name, status, isCompleted, isEddit } = item;
    return (
      <Task
        key={id}
        status={status}
        taskName={name}
        tasksList={tasksList}
        isCompleted={isCompleted}
        isEddit={isEddit}
        onDelete={() => onDelete(id)}
        onChangeStatusToDone={() => onChangeStatusToDone(id)}
      />
    );
  });
  let activeTasks = tasksList.filter((task) => task.isCompleted === true);
  console.log("", activeTasks);
  return <ul className='todo-list'>{elements}</ul>;
};
