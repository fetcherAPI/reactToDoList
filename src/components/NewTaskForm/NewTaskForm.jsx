import { Component } from 'react';
import './newTaskForm.css';
import PropTypes from 'prop-types';

export class NewTaskForm extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onAdd: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      taskName: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAdd(this.state.taskName);
    this.setState({
      taskName: '',
    });
  }

  render() {
    return (
      <form className="new-task-form" onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.handleChange}
          value={this.state.taskName}
        />
      </form>
    );
  }
}
