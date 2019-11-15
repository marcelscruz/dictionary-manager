import React from 'react'
import {
  Grid,
  Card,
  DictionaryTitle,
  DictionaryContainer,
} from './Overview.styles'

export function Overview({ dictionaries, editDictionary }) {
  const gridBreakpoints = {
    default: 4,
    1800: 3,
    700: 2,
    500: 1,
  }

  const gridItems = dictionaries.map(({ metadata, title, table }, index) => (
    <Card key={metadata.id} onClick={editDictionary.bind(null, index)}>
      <DictionaryTitle>{title || 'Untitled'}</DictionaryTitle>
      {table.map(({ domain, range }) => (
        <DictionaryContainer key={domain + metadata.id}>
          <span>{domain}</span>
          <span> -> </span>
          <span>{range}</span>
        </DictionaryContainer>
      ))}
    </Card>
  ))

  return <Grid breakpointCols={gridBreakpoints}>{gridItems}</Grid>
}

export default Overview
