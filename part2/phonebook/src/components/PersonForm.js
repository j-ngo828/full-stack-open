const PersonForm = ({
  newName,
  handleNameInputChange,
  newNumber,
  handleNumberInputChange,
  handleAddContact,
}) =>
  <form>
    <div>
      name: <input value={newName} onChange={handleNameInputChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberInputChange} />
    </div>
    <div>
      <button type="submit" onClick={handleAddContact}>add</button>
    </div>
  </form>

export default PersonForm
