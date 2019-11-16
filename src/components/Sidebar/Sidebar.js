import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'components'
import { Title } from './Sidebar.styles'

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

      {isEditorOpen ? (
        <>
          <Button onClick={validateToSave} disabled={hasErrors} nav>
            &nbsp; Save
          </Button>
          {isEditing && (
            <>
              <br />
              <br />
              <Button onClick={deleteDictionary} nav>
                &nbsp; Delete
              </Button>
            </>
          )}
        </>
      ) : (
        <Button onClick={openEditor} nav>
          &nbsp; Add dictionary
        </Button>
      )}
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
