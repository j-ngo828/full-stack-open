const Person = ({name, number}) => <p>{name} {number}</p>

const Persons = ({persons, nameSearchQuery}) => persons
  .filter((person) =>
    person.name.toLocaleLowerCase().includes(
      nameSearchQuery.toLocaleLowerCase()
    )
  )
  .map((person) =>
    <Person key={person.id} name={person.name} number={person.number} />
  )

export default Persons
