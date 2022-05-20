import Task from "../Task/Task.js";
import "./tasklist.css";
import PropTypes from "prop-types";

export let TaskList = ({
  tasksList,
  onDelete,
  onAdd,
  onDone,
  editTaskName,
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
          onDone={() => onDone(task.id)}
          dateCreated={task.dateCreated}
          editTaskName={(value) => editTaskName(task.id, value)}
          totalTime={task.totalTime}
        />
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasksList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      dateCreated: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
};
