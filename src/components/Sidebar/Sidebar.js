import React from 'react'
import PropTypes from 'prop-types'
import { Title, ButtonsContainer, Button } from './Sidebar.styles'

export function Sidebar({
  openEditor,
  validateToSave,
  deleteDictionary,
  isEditorOpen,
  isEditing,
  hasErrors,
}) {
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
              onClick={deleteDictionary}
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
  deleteDictionary: PropTypes.func.isRequired,
  isEditorOpen: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  hasErrors: PropTypes.bool.isRequired,
}
