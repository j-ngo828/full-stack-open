const Header = (props) => <h1>{props.title}</h1>

const Part = (props) => <p>{props.text} {props.num}</p>

const Content = (props) => {
  const {data} = props
  return (
    <div>
      <Part text={data[0].text} num={data[0].num} />
      <Part text={data[1].text} num={data[1].num} />
      <Part text={data[2].text} num={data[2].num} />
    </div>
  )
}

const Total = (props) => <p>Number of exercises {props.count}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  const data = [
    {
      text: part1,
      num: exercises1,
    },
    {
      text: part2,
      num: exercises2,
    },
    {
      text: part3,
      num: exercises3,
    }
  ]

  return (
    <div>
      <Header title={course} />
      <Content data={data} />
      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
