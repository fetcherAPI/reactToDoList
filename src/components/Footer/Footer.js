import "./footer.css";
import PropTypes from "prop-types";

export function Footer({ tasksList, filter, onFilterChange, onDelete }) {
  const btns = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  let activeTasksCount = tasksList.filter(
    (task) => task.isCompleted === false
  ).length;

  const buttons = btns.map(({ name, label }) => {
    const isActive = filter === name;
    const className = isActive ? "selected" : "";
    return (
      <li key={name}>
        <button className={className} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return (
    <footer className='footer'>
      <span className='todo-count'>{activeTasksCount} items left</span>
      <ul className='filters'>{buttons}</ul>
      <button className='clear-completed' onClick={onDelete}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  tasksList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      isEdit: PropTypes.bool.isRequired,
      dateCreated: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  filter: "all",
};
