const Header = (props) => <h1>{props.title}</h1>

const Part = (props) => <p>{props.text} {props.num}</p>

const Content = (props) => {
  const {data} = props
  console.log(data);
  return (
    <div>
      <Part text={data[0].name} num={data[0].exercises} />
      <Part text={data[1].name} num={data[1].exercises} />
      <Part text={data[2].name} num={data[2].exercises} />
    </div>
  )
}

const Total = (props) => <p>Number of exercises {props.count}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  const data = [
    part1,
    part2,
    part3,
  ]

  return (
    <div>
      <Header title={course} />
      <Content data={data} />
      <Total count={data.reduce((acc, part) => part.exercises + acc, 0)} />
    </div>
  )
}

export default App
