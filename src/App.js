import React, { useState, useEffect } from 'react'
import Modal from 'components/Modal'
import Prompt from 'components/Prompt'
import { DICTIONARIES } from 'utils/constants'
import uuid from 'uuid/v4'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const handleEditDictionary = index => {
    const selectedDictionary = dictionaries[index]

    setSelectedDictionary(selectedDictionary)
    handleOpenModal()
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = hasChanges => {
    setSelectedDictionary({})
    hasChanges && loadDictionaries()
    setIsModalOpen(false)
  }

  const handleOpenPrompt = (text, confirmButtonText, cancelButtonText) => {
    setPromptSettings({ text, confirmButtonText, cancelButtonText })
    setIsPromptOpen(true)
  }

  const handleClosePrompt = () => {
    setPromptSettings({})
    setIsPromptOpen(false)
  }

  const handleSaveDictionary = ({ metadata, title, table }) => {
    const id = metadata.id || uuid()
    const timestamp = metadata.timestamp || new Date()

    const updatedDictionary = {
      metadata: {
        id,
        timestamp,
      },
      title,
      table,
    }

    let updatedDictionaries = []

    const savedDictionaries = JSON.parse(localStorage.getItem(DICTIONARIES))

    if (savedDictionaries) {
      // Check if current dictionary already exists within the saved ones,
      // and if it does, replace it with the updated one,
      // otherwise just append updated one to existing array
      const currentDictionaryIndex = savedDictionaries.findIndex(
        dictionary => dictionary.metadata.id === id,
      )

      updatedDictionaries =
        currentDictionaryIndex >= 0
          ? savedDictionaries.splice(
              currentDictionaryIndex,
              1,
              updatedDictionary,
            )
          : [...savedDictionaries, updatedDictionary]
    } else {
      updatedDictionaries = [updatedDictionary]
    }

    localStorage.setItem(DICTIONARIES, JSON.stringify(updatedDictionaries))

    handleCloseModal(true)
  }

  const handleDeleteDictionary = ({ metadata }) => {
    const id = metadata.id

    const savedDictionaries = JSON.parse(localStorage.getItem(DICTIONARIES))

    const updatedDictionaries =
      savedDictionaries.filter(dictionary => dictionary.metadata.id !== id) ||
      []

    localStorage.setItem(DICTIONARIES, JSON.stringify(updatedDictionaries))

    handleCloseModal(true)
  }

  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h1>Dictionary manager</h1>
          <button onClick={handleOpenModal}>Add dictionary</button>
          {dictionaries.map(({ title, table }, index) => (
            <div
              key={title + index}
              onClick={handleEditDictionary.bind(null, index)}
            >
              <h2>{title || 'Untitled'}</h2>
              {table.map(({ domain, range }, index) => (
                <div key={domain + index}>
                  <span>{domain}</span>
                  <span> -> </span>
                  <span>{range}</span>
                </div>
              ))}
            </div>
          ))}
          {isModalOpen && (
            <Modal
              selectedDictionary={selectedDictionary}
              saveDictionary={handleSaveDictionary}
              deleteDictionary={handleDeleteDictionary}
              closeModal={handleCloseModal}
              openPrompt={handleOpenPrompt}
            />
          )}
          {isPromptOpen && <Prompt settings={promptSettings} />}
        </>
      )}
    </>
  )
}

export default App
