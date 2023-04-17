import { useState } from 'react'

const GIVE_FEEDBACK = 'give feedback'
const STATISTICS = 'statistics'
const GOOD = 'good'
const NEUTRAL = 'neutral'
const BAD = 'bad'
const ALL = 'all'
const AVERAGE = 'average'
const POSITIVE = 'positive'
const NO_FEEDBACK = 'No feedback given'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({handleClick, text}) =>
  <button type="button" onClick={handleClick}>{text}</button>

const DataDisplay = ({text, num}) => <p>{text} {num}</p>

const Statistics = (props) => {
  const {good, neutral, bad, hasGivenFeedback} = props
  const total = good + neutral + bad
  const average = total / 3
  const positive = (good / total) * 100
  const feedbackResult = hasGivenFeedback
    ? <>
        <DataDisplay text={GOOD} num={good} />
        <DataDisplay text={NEUTRAL} num={neutral} />
        <DataDisplay text={BAD} num={bad} />
        <DataDisplay text={ALL} num={total} />
        <DataDisplay text={AVERAGE} num={average} />
        <DataDisplay text={POSITIVE} num={`${positive} %`} />
      </>
    : NO_FEEDBACK
  return (
    <>
      <Header title={STATISTICS} />
      {feedbackResult}
    </>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [hasGivenFeedback, setHasGivenFeedback] = useState(false)

  const handleClick = (feedbackType) => {
    setHasGivenFeedback(true)
    switch (feedbackType) {
      case GOOD:
        setGood(good + 1)
        break
      case NEUTRAL:
        setNeutral(neutral + 1)
        break
      case BAD:
        setBad(bad + 1)
        break
      default:
        console.log('Undefined feedback type, did you click the right button?');
    }
  }

  return (
    <>
      <div>
        <Header title={GIVE_FEEDBACK} />
        <Button handleClick={() => handleClick(GOOD)} text={GOOD} />
        <Button handleClick={() => handleClick(NEUTRAL)} text={NEUTRAL} />
        <Button handleClick={() => handleClick(BAD)} text={BAD} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} hasGivenFeedback={hasGivenFeedback} />
    </>
  )
}

export default App
