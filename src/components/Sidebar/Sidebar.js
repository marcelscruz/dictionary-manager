import React from 'react'
import PropTypes from 'prop-types'
import { Title, ButtonsContainer, Button } from './Sidebar.styles'
import { DELETE } from 'utils/constants'

export function Sidebar({
  openEditor,
  validateToSave,
  openPrompt,
  isEditorOpen,
  isEditing,
  hasErrors,
}) {
  const handleDeleteDictionary = () => {
    openPrompt({
      text: 'Are you sure you want to delete this dictionary?',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Go back',
      action: DELETE,
    })
  }

  return (
    <>
      <Title>Dictionary Manager</Title>

      <ButtonsContainer>
        <Button onClick={openEditor} isEditorOpen={isEditorOpen} nav>
          &nbsp; Add dictionary
        </Button>
        <Button
          onClick={validateToSave}
          disabled={hasErrors}
          isEditorOpen={isEditorOpen}
          nav
          deleteOrSave
        >
          &nbsp; Save
        </Button>
        {isEditing && (
          <>
            <br />
            <br />
            <Button
              onClick={handleDeleteDictionary}
              isEditorOpen={isEditorOpen}
              nav
              deleteOrSave
            >
              &nbsp; Delete
            </Button>
          </>
        )}
      </ButtonsContainer>
    </>
  )
}

export default Sidebar

Sidebar.propTypes = {
  openEditor: PropTypes.func.isRequired,
  validateToSave: PropTypes.func.isRequired,
  openPrompt: PropTypes.func.isRequired,
  isEditorOpen: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  hasErrors: PropTypes.bool.isRequired,
}
