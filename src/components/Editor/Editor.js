import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClone,
  faCodeBranch,
  faSyncAlt,
  faLink,
} from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  Title,
  Form,
  TitleInputContainer,
  Label,
  TitleInput,
  Heading,
  Row,
  ValueInput,
  Arrow,
  DeleteRowButton,
  ErrorsContainer,
  ErrorIcon,
  CloseButton,
  X,
  AddRowButton,
  ErrorsLegendContainer,
  ErrorLegend,
  ErrorText,
} from './Editor.styles'
import validateDictionary from 'utils/validators'
import { emptyRow } from 'utils/defaultValues'
import { colours } from 'utils/theme'
import { errors } from 'utils/constants'

const { DUPLICATE, FORK, CYCLE, CHAIN } = errors

export function Editor({
  closeEditor,
  isEditorOpen,
  isEditing,
  title,
  setTitle,
  table,
  setTable,
}) {
  const [shouldMoveTitleLabelUp, setShouldMoveTitleLabelUp] = useState(false)

  useEffect(() => {
    title && setShouldMoveTitleLabelUp(true)
  }, [title])

  const handleTitleChange = e => {
    e.preventDefault()

    const title = e.target.value

    setTitle(title)
  }

  const handleInputChange = (index, e) => {
    e.preventDefault()

    const fieldName = e.target.name
    const fieldValue = e.target.value

    const updatedRow = {
      ...table[index],
      [fieldName]: fieldValue,
    }

    // Remove previous row and add updated one
    const updatedTable = [...table]
    updatedTable.splice(index, 1, updatedRow)

    setTable(validate(updatedTable))
  }

  const handleAddRow = () => {
    setTable([...table, emptyRow()])
  }

  const handleRemoveRow = index => {
    const updatedTable = [...table]
    updatedTable.splice(index, 1)

    updatedTable.length === 0
      ? setTable([emptyRow()]) // Always keep at least one empty row
      : setTable(validate(updatedTable)) // Validate without the just deleted row
  }

  const handleError = (errors, table, index) => {
    const updatedRow = {
      ...table[index],
      errors,
    }

    // Remove previous row and add updated one
    const updatedTable = [...table]
    updatedTable.splice(index, 1, updatedRow)

    return updatedTable
  }

  // Validates row contents
  const validate = table => {
    let updatedTable = [...table]

    // Run validation for each row
    table.forEach((row, index) => {
      // Errors is either an object or undefined
      const errors = validateDictionary(row, table, index)

      // Pass newly created table array (updatedTable) that will be
      // updated with errors object to later be set into state
      updatedTable = handleError(errors, updatedTable, index)
    })

    return updatedTable
  }

  const handleCloseEditor = () => {
    setShouldMoveTitleLabelUp(false)

    closeEditor()
  }

  const handleFormSubmit = e => {
    e.preventDefault()
  }

  const handleTitleInputFocus = e => {
    const eventType = e.type
    if (eventType === 'focus') {
      setShouldMoveTitleLabelUp(true)
    } else if (eventType === 'blur' && !title) {
      setShouldMoveTitleLabelUp(false)
    }
  }

  const mapErrorToMetadata = error => {
    switch (error) {
      case DUPLICATE:
        return {
          icon: faClone,
          colour: colours.errors[0],
          legend:
            'Duplicate - Two rows or more mapping the same combination of domain and range',
        }
      case FORK:
        return {
          icon: faCodeBranch,
          colour: colours.errors[1],
          legend:
            'Fork - Two rows or more with the same domain mapping to different ranges',
        }
      case CYCLE:
        return {
          icon: faSyncAlt,
          colour: colours.errors[2],
          legend:
            'Cycle - Domain A mapping to range B and domain B mapping to range A',
        }
      case CHAIN:
        return {
          icon: faLink,
          colour: colours.errors[3],
          legend: 'Chain - A range value also being used as a domain',
        }
      default:
        break
    }
  }

  return (
    <Container isEditorOpen={isEditorOpen}>
      <CloseButton onClick={handleCloseEditor}>
        <X fontSize={35}>&#xd7;</X>
      </CloseButton>

      <Title>
        {isEditing ? `Edit dictionary ${title && title}` : 'Add new dictionary'}
      </Title>
      <Form onSubmit={handleFormSubmit}>
        <TitleInputContainer>
          <Label
            htmlFor="title"
            shouldMoveTitleLabelUp={shouldMoveTitleLabelUp}
            titleInput
          >
            Title
          </Label>
          <TitleInput
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            onFocus={handleTitleInputFocus}
            onBlur={handleTitleInputFocus}
          />
        </TitleInputContainer>
        <Heading>Domain &#x2192; Range</Heading>
        {table.map(({ domain, range, id, errors }, index) => (
          <Row key={id}>
            <Label htmlFor="domain" hidden>
              Domain
            </Label>
            <ValueInput
              type="text"
              name="domain"
              value={domain}
              onChange={handleInputChange.bind(null, index)}
            />

            <Arrow> &#x2192; </Arrow>

            <Label htmlFor="range" hidden>
              Range
            </Label>
            <ValueInput
              type="text"
              name="range"
              value={range}
              onChange={handleInputChange.bind(null, index)}
            />
            <DeleteRowButton onClick={handleRemoveRow.bind(null, index)}>
              <X fontSize={15}>&#xd7;</X>
            </DeleteRowButton>
            <ErrorsContainer>
              {errors &&
                Object.entries(errors).map(
                  ([name, isTrue]) =>
                    isTrue && (
                      <ErrorIcon key={name}>
                        <FontAwesomeIcon
                          icon={mapErrorToMetadata(name).icon}
                          color={mapErrorToMetadata(name).colour}
                        />
                      </ErrorIcon>
                    ),
                )}
            </ErrorsContainer>
          </Row>
        ))}
        <AddRowButton onClick={handleAddRow}>&#x2b;</AddRowButton>
      </Form>

      <ErrorsLegendContainer>
        <Heading>Errors explanation</Heading>
        {Object.values(errors).map(name => (
          <ErrorLegend key={name}>
            <FontAwesomeIcon
              icon={mapErrorToMetadata(name).icon}
              color={mapErrorToMetadata(name).colour}
            />
            <ErrorText>{mapErrorToMetadata(name).legend}</ErrorText>
          </ErrorLegend>
        ))}
      </ErrorsLegendContainer>
    </Container>
  )
}

export default Editor

Editor.propTypes = {
  closeEditor: PropTypes.func.isRequired,
  isEditorOpen: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  table: PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
  setTable: PropTypes.func.isRequired,
}
