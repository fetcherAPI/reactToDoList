import { Component } from "react";
import "./footer.css";

export class Footer extends Component {
  render() {
    let { tasksList } = this.props;

    let activeTasksCount = tasksList.filter(
      (task) => task.isCompleted === false
    ).length;

    return (
      <footer className='footer'>
        <span className='todo-count'>{activeTasksCount} items left</span>
        <ul className='filters'>
          <li>
            <button className='selected'>All</button>
          </li>

          <li>
            <button>Active</button>
          </li>
          <li>
            <button>Completed</button>
          </li>
        </ul>
        <button className='clear-completed' onClick={this.sort}>
          Clear completed
        </button>
      </footer>
    );
  }
}
