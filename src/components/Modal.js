import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import validateDictionary from 'utils/validators'

function Modal() {
  const emptyRow = {
    domain: '',
    range: '',
  }

  const [table, setTable] = useState([emptyRow])

  const handleAddRow = () => {
    setTable([...table, emptyRow])
  }

  const handleRemoveRow = index => {
    const updatedTable = [...table]
    updatedTable.splice(index, 1)

    updatedTable.length === 0
      ? setTable([emptyRow]) // Always keep at least one empty row
      : setTable(validate(updatedTable)) // Validate without the just deleted row
  }

  const handleInputChange = (index, e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    const updatedRow = {
      ...table[index],
      [fieldName]: fieldValue,
    }

    // Remove previous row and add updated one
    const updatedTable = [...table]
    updatedTable.splice(index, 1, updatedRow)

    setTable(updatedTable)
  }

  const handleError = (errors, table, index) => {
    const updatedRow = {
      ...table[index],
      errors,
    }

    // Remove previous row and add updated one
    const updatedTable = [...table]
    updatedTable.splice(index, 1, updatedRow)

    return updatedTable
  }

  const handleBlur = () => {
    setTable(validate(table))
  }

  // Validates row contents
  const validate = table => {
    let updatedTable = [...table]

    // Run validation for each row
    table.forEach((row, index) => {
      // Errors is either an object or undefined
      const errors = validateDictionary(row, table, index)

      // Pass newly created table array (updatedTable) that will be
      // updated with errors object to later be set into state
      updatedTable = handleError(errors, updatedTable, index)
    })

    return updatedTable
  }

  return createPortal(
    <div>
      <h2>Add new dictionary</h2>
      {table.map(({ domain, range, errors }, index) => (
        <div key={index} onBlur={handleBlur}>
          <input
            type="text"
            name="domain"
            value={domain}
            onChange={handleInputChange.bind(null, index)}
          />
          <input
            type="text"
            name="range"
            value={range}
            onChange={handleInputChange.bind(null, index)}
          />
          <button onClick={handleRemoveRow.bind(null, index)}>
            Remove row
          </button>
          {errors &&
            Object.entries(errors).map(
              ([name, isTrue]) => isTrue && <span key={name}>{name}</span>,
            )}
        </div>
      ))}
      <button onClick={handleAddRow}>Add row</button>
    </div>,
    document.body,
  )
}

export default Modal
