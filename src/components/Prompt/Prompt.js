import React from 'react'
import { createPortal } from 'react-dom'
import { SAVE, DELETE } from 'utils/constants'

export function Prompt({
  settings,
  saveDictionary,
  deleteDictionary,
  closePrompt,
}) {
  const { text, confirmButtonText, cancelButtonText, action, data } = settings

  const handleConfirm = () => {
    if (action === SAVE) {
      saveDictionary(data)
    } else if (action === DELETE) {
      deleteDictionary(data)
    }
  }

  const handleCancel = () => {
    closePrompt()
  }

  return createPortal(
    <div>
      <h3>{text}</h3>
      <button onClick={handleConfirm}>{confirmButtonText}</button>
      <button onClick={handleCancel}>{cancelButtonText}</button>
    </div>,
    document.body,
  )
}

export default Prompt
