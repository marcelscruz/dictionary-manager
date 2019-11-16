import React from 'react'
import PropTypes from 'prop-types'
import { Overlay } from './Editor.styles'
import validateDictionary from 'utils/validators'
import { emptyRow } from 'utils/defaultValues'

export function Editor({
  closeEditor,
  isEditorOpen,
  title,
  setTitle,
  table,
  setTable,
}) {
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

  const handleCloseEditor = () => {
    closeEditor()
  }

  return (
    <Overlay isEditorOpen={isEditorOpen}>
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

      <button onClick={handleCloseEditor}>Close</button>
    </Overlay>
  )
}

export default Editor

Editor.propTypes = {
  closeEditor: PropTypes.func.isRequired,
  isEditorOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  table: PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
  setTable: PropTypes.func.isRequired,
}
