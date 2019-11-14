import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import validateDictionary from 'utils/validators'
import { SAVE, DELETE } from 'utils/constants'

export function Editor({
  selectedDictionary,
  saveDictionary,
  closeEditor,
  openPrompt,
}) {
  const emptyRow = {
    domain: '',
    range: '',
    id: uuid(),
  }

  const [metadata, setMetadata] = useState({
    id: '',
    timestamp: '',
  })
  const [title, setTitle] = useState('')
  const [table, setTable] = useState([emptyRow])
  const [hasErrors, setHasErrors] = useState(false)
  const [hasEmptyField, setHasEmptyFields] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Store values passed as props if it's editing mode
  useEffect(() => {
    const isEditing =
      Object.entries(selectedDictionary).length !== 0 &&
      selectedDictionary.constructor === Object

    if (isEditing) {
      const { metadata, title, table } = selectedDictionary

      metadata && setMetadata(metadata)
      title && setTitle(title)
      table && setTable(table)
      setIsEditing(true)
    }
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
    // Alert if there are empty fields that will be discarded
    if (hasEmptyField) {
      openPrompt({
        text:
          'Rows with empty fields will be discarded. Are you sure you want to proceed?',
        confirmButtonText: 'Save',
        cancelButtonText: 'Go back',
        action: SAVE,
        data: { metadata, title, table },
      })
    } else {
      saveDictionary({ metadata, title, table })
    }
  }

  // Only accessible if editing existing dictionary
  const handleDeleteDictionary = () => {
    openPrompt({
      text: 'Are you sure?',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Go back',
      action: DELETE,
      data: { metadata },
    })
  }

  const handleCloseEditor = () => {
    closeEditor()
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
      {table.map(({ domain, range, id, errors }, index) => (
        <div key={id}>
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
      {isEditing && <button onClick={handleDeleteDictionary}>Delete</button>}

      <button onClick={handleCloseEditor}>Close</button>
    </div>,
    document.body,
  )
}

export default Editor

Editor.propTypes = {
  selectedDictionary: PropTypes.object.isRequired,
  saveDictionary: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  openPrompt: PropTypes.func.isRequired,
}
