import React, { useState } from 'react'
import { createPortal } from 'react-dom'

function Modal() {
  const emptyRow = {
    domain: '',
    range: '',
  }

  const [rows, setRows] = useState([emptyRow])

  const handleAddRow = () => {
    setRows([...rows, emptyRow])
  }

  const handleRemoveRow = index => {
    const updatedRows = [...rows]
    updatedRows.splice(index, 1)

    // Always keep at least one empty row
    updatedRows.length === 0 ? setRows([emptyRow]) : setRows(updatedRows)
  }

  const handleInputChange = (index, e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    const updatedRows = [...rows]
    updatedRows[index] = {
      ...updatedRows[index],
      [fieldName]: fieldValue,
    }

    setRows(updatedRows)
  }

  // Validates row contents
  const handleRowBlur = index => {
    console.log('index ->', index)
    console.log('rows ->', rows)
  }

  return createPortal(
    <div>
      <h1>foo</h1>
      {rows.map((row, index) => (
        <div key={index} onBlur={handleRowBlur.bind(null, index)}>
          <input
            type="text"
            name="domain"
            value={rows[index].domain}
            onChange={handleInputChange.bind(null, index)}
          />
          <input
            type="text"
            name="range"
            value={rows[index].range}
            onChange={handleInputChange.bind(null, index)}
          />
          <button onClick={handleRemoveRow.bind(null, index)}>
            Remove row
          </button>
        </div>
      ))}
      <button onClick={handleAddRow}>Add row</button>
    </div>,
    document.body,
  )
}

export default Modal
