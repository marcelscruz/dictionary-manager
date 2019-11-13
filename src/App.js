import React, { useState, useEffect } from 'react'
import Modal from 'components/Modal'
import { DICTIONARIES } from 'utils/constants'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dictionaries, setDictionaries] = useState([])
  const [selectedDictionary, setSelectedDictionary] = useState({})

  useEffect(() => {
    const savedDictionaries = JSON.parse(localStorage.getItem(DICTIONARIES))

    savedDictionaries && setDictionaries(savedDictionaries)
    setIsLoading(false)
  }, [])

  const handleEditDictionary = index => {
    const selectedDictionary = dictionaries[index]

    setSelectedDictionary(selectedDictionary)
    handleOpenModal()
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedDictionary({})
    setIsModalOpen(false)
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
              closeModal={handleCloseModal}
            />
          )}
        </>
      )}
    </>
  )
}

export default App
