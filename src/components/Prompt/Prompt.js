import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { SAVE, DELETE } from 'utils/constants'
import { Overlay } from './Prompt.styles'

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
    <Overlay>
      <h3>{text}</h3>
      <button onClick={handleConfirm}>{confirmButtonText}</button>
      <button onClick={handleCancel}>{cancelButtonText}</button>
    </Overlay>,
    document.body,
  )
}

export default Prompt

Prompt.propTypes = {
  settings: PropTypes.object.isRequired,
  saveDictionary: PropTypes.func.isRequired,
  deleteDictionary: PropTypes.func.isRequired,
  closePrompt: PropTypes.func.isRequired,
}
