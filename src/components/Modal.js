import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import validateDictionary from 'utils/validators'

function Modal({
  selectedDictionary,
  saveDictionary,
  deleteDictionary,
  closeModal,
  openPrompt,
}) {
  const emptyRow = {
    domain: '',
    range: '',
  }

  const [metadata, setMetadata] = useState({
    id: '',
    timestamp: '',
  })
  const [title, setTitle] = useState('')
  const [table, setTable] = useState([emptyRow])
  const [hasErrors, setHasErrors] = useState(false)
  const [hasEmptyField, setHasEmptyFields] = useState(false)

  // Store values passed as props if it's editing mode
  useEffect(() => {
    const { metadata, title, table } = selectedDictionary

    metadata && setMetadata(metadata)
    title && setTitle(title)
    table && setTable(table)
  }, [selectedDictionary])

  // Keep track if there are errors or empty fields in the dictionary
  useEffect(() => {
    let hasErrors = table.some(row => row.errors)
    let hasEmptyField = table.some(row => !row.domain || !row.range)
    setHasErrors(hasErrors)
    setHasEmptyFields(hasEmptyField)
  }, [table])

  const handleTitleChange = e => {
    const title = e.target.value

    setTitle(title)
  }

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

    setTable(validate(updatedTable))
    // setTable(updatedTable)
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

  const handleSaveDictionary = () => {
    // Check and alert if there are empty fields

    // if (hasEmptyField) {
    //   openPrompt({
    //     text:
    //       'Rows with empty fields will be discarded. Are you sure you want to proceed?',
    //     confirmButtonText: 'Confirm',
    //     cancelButtonText: 'Go back',
    //   })
    // }

    saveDictionary({ metadata, title, table })
  }

  // Only accessible if editing existing dictionary
  const handleDeleteDictionary = () => {
    deleteDictionary({ metadata })
  }

  const handleCloseModal = () => {
    closeModal()
  }

  return createPortal(
    <div>
      <h2>Add new dictionary</h2>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
      </form>
      {table.map(({ domain, range, errors }, index) => (
        <div key={domain + index}>
          <label htmlFor="domain">Domain</label>
          <input
            type="text"
            name="domain"
            value={domain}
            onChange={handleInputChange.bind(null, index)}
          />

          <label htmlFor="range">Range</label>
          <input
            type="text"
            name="range"
            value={range}
            onChange={handleInputChange.bind(null, index)}
          />

          <button onClick={handleRemoveRow.bind(null, index)}>
            Remove row
          </button>
          <div>
            {errors &&
              Object.entries(errors).map(
                ([name, isTrue]) => isTrue && <span key={name}>{name}</span>,
              )}
          </div>
        </div>
      ))}
      <button onClick={handleAddRow}>Add row</button>
      <button onClick={handleSaveDictionary} disabled={hasErrors}>
        Save
      </button>
      <button onClick={handleDeleteDictionary}>Delete</button>
      <button onClick={handleCloseModal}>Close</button>
    </div>,
    document.body,
  )
}

export default Modal
