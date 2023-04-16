const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => <p>{props.text} {props.num}</p>

const Content = (props) => {
  const {parts} = props
  return (
    <div>
      <Part text={parts[0].name} num={parts[0].exercises} />
      <Part text={parts[1].name} num={parts[1].exercises} />
      <Part text={parts[2].name} num={parts[2].exercises} />
    </div>
  )
}

const Total = (props) => (
  <p>
    Number of exercises {
      props.parts.reduce((acc, part) => part.exercises + acc, 0)
    }
  </p>
)

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
