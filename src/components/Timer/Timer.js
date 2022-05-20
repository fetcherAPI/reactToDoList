import { Component } from "react";
import PropTypes from "prop-types";
import "./Timer.css";

export class TimerOwn extends Component {
  static defaultProps = {
    onAdd: () => {},
  };
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      time: this.props.totalTime,
      isRunning: false,
    };
    this.onClickPlay = this.onClickPlay.bind(this);
    this.onClickPause = this.onClickPause.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.isRunning && this.state.time > 0) {
        this.setState({
          time: this.state.time - 1,
        });
      }
    }, 1000);
  }

  onClickPlay() {
    this.setState({
      isRunning: true,
    });
  }

  onClickPause() {
    this.setState({
      isRunning: false,
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { time } = this.state;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      <div className='description--timer'>
        <button onClick={this.onClickPlay} className='icon-play'></button>
        <button onClick={this.onClickPause} className='icon-pause'></button>
        <p>{`${minutes}:${seconds}`}</p>
      </div>
    );
  }
}
