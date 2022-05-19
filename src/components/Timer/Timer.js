import { Component } from "react";
import "./Timer.css";

export class TimerOwn extends Component {
  constructor(props) {
    console.log("props", props);
    const { isCompleted } = props;
    console.log("isCompleted", isCompleted);
    super(props);
    this.state = {
      time: 0,
      isRunning: false,
    };
    this.onClickPlay = this.onClickPlay.bind(this);
    this.onClickPause = this.onClickPause.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.isRunning) {
        this.setState({
          time: this.state.time + 1,
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
    const { isCompleted } = this.props;
    console.log("isCompleted", isCompleted);
    return (
      <div className='description--timer'>
        <button onClick={this.onClickPlay} className='icon-play'></button>
        <button onClick={this.onClickPause} className='icon-pause'></button>
        <p>{this.state.time}</p>
      </div>
    );
  }
}
