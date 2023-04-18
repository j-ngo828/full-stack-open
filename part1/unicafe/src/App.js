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
const GOOD_WEIGHT = 1
const NEUTRAL_WEIGHT = 0
const BAD_WEIGHT = -1

const Header = ({title}) => <h1>{title}</h1>

const Button = ({handleClick, text}) =>
  <button type="button" onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const total = good + neutral + bad
  const average = (
    (good * GOOD_WEIGHT  + neutral * NEUTRAL_WEIGHT + bad * BAD_WEIGHT)
    / total
  )
  const positive = (good / total) * 100
  return (
    <div>
      <StatisticLine text={GOOD} value={good} />
      <StatisticLine text={NEUTRAL} value={neutral} />
      <StatisticLine text={BAD} value={bad} />
      <StatisticLine text={ALL} value={total} />
      <StatisticLine text={AVERAGE} value={average} />
      <StatisticLine text={POSITIVE} value={`${positive} %`} />
    </div>
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
      <div>
        <Header title={STATISTICS} />
      </div>
      {hasGivenFeedback
        ? <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            hasGivenFeedback={hasGivenFeedback}
          />
        : NO_FEEDBACK
      }
    </>
  )
}

export default App
