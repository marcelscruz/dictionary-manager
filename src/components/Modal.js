import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import uuid from 'uuid/v4'
import validateDictionary from 'utils/validators'
import { DICTIONARIES } from 'utils/constants'

function Modal({ selectedDictionary, closeModal }) {
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
    // TODO: store values
  }, [])

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
    const id = metadata.id || uuid()
    const timestamp = metadata.timestamp || new Date()

    const updatedDictionary = {
      metadata: {
        id,
        timestamp,
      },
      title,
      table,
    }

    let updatedDictionaries = []

    const savedDictionaries = JSON.parse(localStorage.getItem(DICTIONARIES))

    if (savedDictionaries) {
      // Check if current dictionary already exists within the saved ones,
      // and if it does, replace it with the updated one,
      // otherwise just append updated one to existing array
      const currentDictionaryIndex = savedDictionaries.findIndex(
        dictionary => dictionary.metadata.id === id,
      )

      updatedDictionaries =
        currentDictionaryIndex >= 0
          ? savedDictionaries.splice(
              currentDictionaryIndex,
              1,
              updatedDictionary,
            )
          : [...savedDictionaries, updatedDictionary]
    } else {
      updatedDictionaries = [updatedDictionary]
    }

    localStorage.setItem(DICTIONARIES, JSON.stringify(updatedDictionaries))

    // TODO: close modal
  }

  // Only accessible if editing existing dictionary
  const handleDeleteDictionary = () => {
    const id = metadata.id

    const savedDictionaries = JSON.parse(localStorage.getItem(DICTIONARIES))

    const updatedDictionaries =
      savedDictionaries.filter(dictionary => dictionary.metadata.id !== id) ||
      []

    localStorage.setItem(DICTIONARIES, JSON.stringify(updatedDictionaries))

    // TODO: close modal
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
          {errors &&
            Object.entries(errors).map(
              ([name, isTrue]) => isTrue && <span key={name}>{name}</span>,
            )}
        </div>
      ))}
      <button onClick={handleAddRow}>Add row</button>
      <button
        onClick={handleSaveDictionary}
        disabled={hasErrors || hasEmptyField}
      >
        Save
      </button>
      <button onClick={handleDeleteDictionary}>Delete</button>
      <button onClick={handleCloseModal}>Close</button>
    </div>,
    document.body,
  )
}

export default Modal
