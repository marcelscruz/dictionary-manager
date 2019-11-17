import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import {
  Container,
  Overlay,
  DialogBox,
  Text,
  ButtonsContainer,
  Button,
} from './Prompt.styles'
import { SAVE, DELETE } from 'utils/constants'
import { colours } from 'utils/theme'

export function Prompt({
  settings,
  saveDictionary,
  deleteDictionary,
  closePrompt,
}) {
  const { text, confirmButtonText, cancelButtonText, action } = settings

  const handleConfirm = () => {
    if (action === SAVE) {
      saveDictionary()
    } else if (action === DELETE) {
      deleteDictionary()
    }

    closePrompt()
  }

  const handleCancel = () => {
    closePrompt()
  }

  const handleEsc = useCallback(
    e => {
      if (e.keyCode === 27) {
        e.preventDefault()
        closePrompt()
        window.removeEventListener('keydown', handleEsc)
      }
    },
    [closePrompt],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleEsc)
  }, [handleEsc])

  return createPortal(
    <Container onKeyPress={handleEsc}>
      <Overlay onClick={handleCancel} onKeyPress={handleEsc} />
      <DialogBox>
        <Text>{text}</Text>
        <ButtonsContainer>
          <Button
            colour={action === SAVE ? colours.green : colours.red}
            onClick={handleConfirm}
          >
            {confirmButtonText}
          </Button>
          <Button colour={'grey'} onClick={handleCancel}>
            {cancelButtonText}
          </Button>
        </ButtonsContainer>
      </DialogBox>
    </Container>,
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
