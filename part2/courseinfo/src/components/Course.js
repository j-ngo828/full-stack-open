import Content from './Content'
import Header from './Header'
import Total from './Total'


const Course = ({course}) =>
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((acc, part) => acc + part.exercises, 0)} />
  </>

export default Course
