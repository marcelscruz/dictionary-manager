import React, { useState, useEffect } from 'react'
import Normalize from 'react-normalize'
import uuid from 'uuid/v4'
import {
  Editor,
  Overview,
  Prompt,
  Sidebar,
  LeftPanel,
  RightPanel,
} from 'components'
import { DICTIONARIES, SAVE } from 'utils/constants'
import GlobalStyle from 'utils/globalStyle'
import { emptyMetadata, emptyRow } from 'utils/defaultValues'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isPromptOpen, setIsPromptOpen] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [dictionaries, setDictionaries] = useState([])
  const [metadata, setMetadata] = useState(emptyMetadata)
  const [title, setTitle] = useState('')
  const [table, setTable] = useState([emptyRow()])
  const [promptSettings, setPromptSettings] = useState({})

  useEffect(() => {
    loadDictionaries()
  }, [])

  // Keep track if there are errors or empty fields in the dictionary
  useEffect(() => {
    const hasErrors = table.some(row => row.errors)
    setHasErrors(hasErrors)
  }, [table])

  const loadDictionaries = () => {
    setIsLoading(true)
    const savedDictionaries = JSON.parse(localStorage.getItem(DICTIONARIES))

    savedDictionaries && setDictionaries(savedDictionaries)
    setIsLoading(false)
  }

  const validateToSave = () => {
    const hasEmptyField = table.some(row => !row.domain || !row.range)

    // Alert if there are empty fields that will be discarded
    if (hasEmptyField) {
      handleOpenPrompt({
        text:
          'Rows with empty fields will be discarded. Are you sure you want to proceed?',
        confirmButtonText: 'Save',
        cancelButtonText: 'Go back',
        action: SAVE,
      })
    } else {
      handleSaveDictionary()
    }
  }

  const handleSaveDictionary = () => {
    const id = metadata.id || uuid()
    const timestamp = metadata.timestamp || new Date()

    // Filter out rows with empty fields
    const filteredTable = table.filter(row => row.domain && row.range)

    const updatedDictionary = {
      metadata: {
        id,
        timestamp,
      },
      title,
      table: filteredTable,
    }

    let updatedDictionaries = []

    const savedDictionaries = JSON.parse(localStorage.getItem(DICTIONARIES))

    if (savedDictionaries) {
      // Check if current dictionary already exists within the saved ones
      const currentDictionaryIndex = savedDictionaries.findIndex(
        dictionary => dictionary.metadata.id === id,
      )

      if (currentDictionaryIndex >= 0) {
        // Replace previous dictionary with updated one
        savedDictionaries.splice(currentDictionaryIndex, 1, updatedDictionary)
        updatedDictionaries = [...savedDictionaries]
      } else {
        // Append updated one to existing array
        updatedDictionaries = [...savedDictionaries, updatedDictionary]
      }
    } else {
      updatedDictionaries = [updatedDictionary]
    }

    localStorage.setItem(DICTIONARIES, JSON.stringify(updatedDictionaries))

    isEditorOpen && handleCloseEditor(true)
  }

  const handleDeleteDictionary = () => {
    const id = metadata.id

    const savedDictionaries = JSON.parse(localStorage.getItem(DICTIONARIES))

    const updatedDictionaries =
      savedDictionaries.filter(dictionary => dictionary.metadata.id !== id) ||
      []

    localStorage.setItem(DICTIONARIES, JSON.stringify(updatedDictionaries))

    isEditorOpen && handleCloseEditor(true)
  }

  const handleEditDictionary = index => {
    const { metadata, title, table } = dictionaries[index]

    metadata && setMetadata(metadata)
    title && setTitle(title)
    table && setTable(table)
    setIsEditing(true)
    handleOpenEditor()
  }

  const handleOpenEditor = () => {
    setIsEditorOpen(true)
  }

  const handleCloseEditor = hasChanges => {
    // Reset editor
    setMetadata(emptyMetadata)
    setTitle('')
    setTable([emptyRow()])

    hasChanges && loadDictionaries()
    isEditing && setIsEditing(false)
    setIsEditorOpen(false)
  }

  const handleOpenPrompt = settings => {
    setPromptSettings(settings)
    setIsPromptOpen(true)
  }

  const handleClosePrompt = () => {
    setPromptSettings({})
    setIsPromptOpen(false)
  }

  return (
    <>
      <Normalize />
      <GlobalStyle />
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <LeftPanel>
            <Sidebar
              openEditor={handleOpenEditor}
              validateToSave={validateToSave}
              openPrompt={handleOpenPrompt}
              isEditorOpen={isEditorOpen}
              isEditing={isEditing}
              hasErrors={hasErrors}
            />
          </LeftPanel>
          <RightPanel>
            <Overview
              dictionaries={dictionaries}
              editDictionary={handleEditDictionary}
            />
            <Editor
              closeEditor={handleCloseEditor}
              isEditorOpen={isEditorOpen}
              isEditing={isEditing}
              title={title}
              setTitle={setTitle}
              table={table}
              setTable={setTable}
            />
            {isPromptOpen && (
              <Prompt
                settings={promptSettings}
                saveDictionary={handleSaveDictionary}
                deleteDictionary={handleDeleteDictionary}
                closePrompt={handleClosePrompt}
              />
            )}
          </RightPanel>
        </>
      )}
    </>
  )
}

export default App
