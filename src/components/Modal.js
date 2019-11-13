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

    // Always keep at least one empty row
    updatedTable.length === 0 ? setTable([emptyRow]) : setTable(updatedTable)

    // Validate again but now without the just deleted row

    // TODO: this function doesn't work if next line is uncommented
    // handleValidation()
  }

  const handleInputChange = (index, e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    const updatedTable = [...table]
    updatedTable[index] = {
      ...updatedTable[index],
      [fieldName]: fieldValue,
    }

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

  // Validates row contents
  const handleValidation = () => {
    let updatedTable = [...table]

    // Run validation for each row
    table.forEach((row, index) => {
      const errors = validateDictionary(row, table, index)

      if (errors) {
        // Pass newly created table array (updatedTable) that will be
        // updated with errors object to later be set into state
        updatedTable = handleError(errors, updatedTable, index)
      }
    })

    setTable(updatedTable)
  }

  return createPortal(
    <div>
      <h2>Add new dictionary</h2>
      {table.map(({ domain, range, errors }, index) => (
        <div key={index} onBlur={handleValidation.bind(null, index)}>
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
