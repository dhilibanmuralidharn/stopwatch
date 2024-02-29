import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    isRunning: false,
    elapsedTime: 0,
    previousTime: 0,
  }

  componentDidMount() {
    this.intervalID = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  tick = () => {
    const {isRunning} = this.state
    if (isRunning) {
      const now = Date.now()
      this.setState(prevState => ({
        previousTime: now,
        elapsedTime: prevState.elapsedTime + (now - prevState.previousTime),
      }))
    }
  }

  handleStart = () => {
    this.setState({
      isRunning: true,
      previousTime: Date.now(),
    })
  }

  handleStop = () => {
    this.setState({
      isRunning: false,
    })
  }

  handleReset = () => {
    this.setState({
      elapsedTime: 0,
    })
  }

  formatTime = milliseconds => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (totalSeconds % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  render() {
    const {elapsedTime, isRunning} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Stopwatch</h1>
        <div className="stopwatch-container">
          <div className="timer-container">
            <img
              className="timer-icon"
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
            />
            <h1 className="timer-heading">Timer</h1>
          </div>
          <h1 className="time">{this.formatTime(elapsedTime)}</h1>
          <div className="button-container">
            <button
              type="button"
              className="start-btn"
              onClick={this.handleStart}
              disabled={isRunning}
            >
              Start
            </button>
            <button
              type="button"
              className="stop-btn"
              onClick={this.handleStop}
              disabled={!isRunning}
            >
              Stop
            </button>
            <button
              type="button"
              className="reset-btn"
              onClick={this.handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
