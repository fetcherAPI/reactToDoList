import Task from "../Task/Task";
import "./tasklist.css";
import PropTypes from "prop-types";

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
          dateCreated={task.dateCreated}
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
      isEdit: PropTypes.bool.isRequired,
      dateCreated: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
