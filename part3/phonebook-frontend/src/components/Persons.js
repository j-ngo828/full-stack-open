const Person = ({name, number, handleClick}) => (
  <p>
    {name} {number} <button onClick={handleClick} type="button">delete</button>
  </p>
)

const Persons = ({persons, nameSearchQuery, handleDeleteContact}) =>
  persons
    .filter((person) =>
      person.name.toLocaleLowerCase().includes(
        nameSearchQuery.toLocaleLowerCase()
      )
    )
    .map((person) =>
      <Person
        key={person.id}
        name={person.name}
        number={person.number}
        handleClick={() => {
          if (!window.confirm(`Delete ${person.name}?`)) {
            return
          }
          handleDeleteContact(person.id)
        }}
      />
    )

export default Persons
