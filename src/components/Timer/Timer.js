import { Component } from "react";
import "./Timer.css";

export class TimerOwn extends Component {
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
      if (this.state.isRunning) {
        this.setState({
          time: this.state.time - 1,
        });
      }
    }, 1000);
  }

  onClickPlay = () => {
    this.setState({
      isRunning: true,
    });
  };

  onClickPause = () => {
    this.setState({
      isRunning: false,
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { totalTime } = this.props;
    return (
      <div className='description--timer'>
        <button onClick={this.onClickPlay} className='icon-play'></button>
        <button onClick={this.onClickPause} className='icon-pause'></button>
        <p>{this.state.time}</p>
      </div>
    );
  }
}
