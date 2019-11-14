import React from 'react'
import { createPortal } from 'react-dom'

function Prompt({ settings, saveDictionary, closePrompt }) {
  const {
    text,
    confirmButtonText,
    cancelButtonText,
    updatedDictionary,
  } = settings

  const handleSaveDictionary = () => {
    saveDictionary(updatedDictionary)
  }

  const handleClosePrompt = () => {
    closePrompt()
  }

  return createPortal(
    <div>
      <h3>{text}</h3>
      <button onClick={handleSaveDictionary}>{confirmButtonText}</button>
      <button onClick={handleClosePrompt}>{cancelButtonText}</button>
    </div>,
    document.body,
  )
}

export default Prompt
