import React, { useState, useEffect } from 'react'
import uuid from 'uuid/v4'
import Normalize from 'react-normalize'
import {
  Editor,
  Overview,
  Prompt,
  Sidebar,
  LeftPanel,
  RightPanel,
} from 'components'
import { DICTIONARIES } from 'utils/constants'
import GlobalStyle from 'utils/globalStyle'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isPromptOpen, setIsPromptOpen] = useState(false)
  const [dictionaries, setDictionaries] = useState([])
  const [selectedDictionary, setSelectedDictionary] = useState({})
  const [promptSettings, setPromptSettings] = useState({})

  useEffect(() => {
    loadDictionaries()
  }, [])

  const loadDictionaries = () => {
    setIsLoading(true)
    const savedDictionaries = JSON.parse(localStorage.getItem(DICTIONARIES))

    savedDictionaries && setDictionaries(savedDictionaries)
    setIsLoading(false)
  }

  const handleSaveDictionary = ({ metadata, title, table }) => {
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

    isPromptOpen && handleClosePrompt()
    isEditorOpen && handleCloseEditor(true)
  }

  const handleDeleteDictionary = ({ metadata }) => {
    const id = metadata.id

    const savedDictionaries = JSON.parse(localStorage.getItem(DICTIONARIES))

    const updatedDictionaries =
      savedDictionaries.filter(dictionary => dictionary.metadata.id !== id) ||
      []

    localStorage.setItem(DICTIONARIES, JSON.stringify(updatedDictionaries))

    isPromptOpen && handleClosePrompt()
    isEditorOpen && handleCloseEditor(true)
  }

  const handleEditDictionary = index => {
    const selectedDictionary = dictionaries[index]

    setSelectedDictionary(selectedDictionary)
    handleOpenEditor()
  }

  const handleOpenEditor = () => {
    setIsEditorOpen(true)
  }

  const handleCloseEditor = hasChanges => {
    setSelectedDictionary({})
    hasChanges && loadDictionaries()
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
            <Sidebar openEditor={handleOpenEditor} />
          </LeftPanel>
          <RightPanel>
            <Overview
              dictionaries={dictionaries}
              editDictionary={handleEditDictionary}
            />
            <Editor
              selectedDictionary={selectedDictionary}
              saveDictionary={handleSaveDictionary}
              closeEditor={handleCloseEditor}
              openPrompt={handleOpenPrompt}
              isEditorOpen={isEditorOpen}
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
