import { useState } from 'react'

const GIVE_FEEDBACK = 'give feedback'
const STATISTICS = 'statistics'
const GOOD = 'good'
const NEUTRAL = 'neutral'
const BAD = 'bad'
const ALL = 'all'
const AVERAGE = 'average'
const POSITIVE = 'positive'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({handleClick, text}) =>
  <button type="button" onClick={handleClick}>{text}</button>

const DataDisplay = ({text, num}) => <p>{text} {num}</p>

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const total = good + neutral + bad
  const average = total / 3
  const positive = (good / total) * 100
  return (
    <>
      <Header title={STATISTICS} />
      <DataDisplay text={GOOD} num={good} />
      <DataDisplay text={NEUTRAL} num={neutral} />
      <DataDisplay text={BAD} num={bad} />
      <DataDisplay text={ALL} num={total} />
      <DataDisplay text={AVERAGE} num={average} />
      <DataDisplay text={POSITIVE} num={`${positive} %`} />
    </>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <Header title={GIVE_FEEDBACK} />
        <Button handleClick={() => setGood(good + 1)} text={GOOD} />
        <Button handleClick={() => setNeutral(neutral + 1)} text={NEUTRAL} />
        <Button handleClick={() => setBad(bad + 1)} text={BAD} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
