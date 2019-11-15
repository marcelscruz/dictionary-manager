import React from 'react'
import { Button } from 'components'
import { Title } from './Sidebar.styles'

export function Sidebar({ openEditor }) {
  return (
    <>
      <Title>Dictionary Manager</Title>
      <Button onClick={openEditor} nav>
        &nbsp; Add dictionary
      </Button>
    </>
  )
}

export default Sidebar
