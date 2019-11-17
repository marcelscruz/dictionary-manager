import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Grid,
  Card,
  DictionaryTitle,
  Row,
  PublishedDate,
  Value,
  Arrow,
  NoEntriesText,
  NoEntriesContainer,
} from './Overview.styles'

export function Overview({ dictionaries, editDictionary }) {
  const gridBreakpoints = {
    default: 4,
    1800: 3,
    700: 2,
    500: 1,
  }

  const gridItems = dictionaries.map(({ metadata, title, table }, index) => {
    const { timestamp } = metadata
    const publishedDate = moment(timestamp).format('DD/MM/YYYY')

    return (
      <Card key={metadata.id} onClick={editDictionary.bind(null, index)}>
        <DictionaryTitle>{title || 'Untitled'}</DictionaryTitle>
        <PublishedDate>{publishedDate}</PublishedDate>
        {table.map(({ domain, range }) => (
          <Row key={domain + metadata.id}>
            <Value>{domain}</Value>
            <Arrow> &#x2192; </Arrow>
            <Value>{range}</Value>
          </Row>
        ))}
      </Card>
    )
  })

  return (
    <>
      {dictionaries.length > 0 ? (
        <Grid breakpointCols={gridBreakpoints}>{gridItems}</Grid>
      ) : (
        <NoEntriesContainer>
          <NoEntriesText>
            No entries yet.
            <br /> Why don't you create your first dictionary?
          </NoEntriesText>
        </NoEntriesContainer>
      )}
    </>
  )
}

export default Overview

Overview.propTypes = {
  dictionaries: PropTypes.array.isRequired,
  editDictionary: PropTypes.func.isRequired,
}
