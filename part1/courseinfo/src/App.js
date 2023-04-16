const Header = (props) => <h1>{props.title}</h1>

const Content = (props) => <p>{props.text} {props.num}</p>

const Total = (props) => <p>Number of exercises {props.count}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content text={part1} num={exercises1} />
      <Content text={part2} num={exercises2} />
      <Content text={part3} num={exercises3} />
      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
