import React from 'react'

function Prompt({ text, confirmButtonText, cancelButtonText }) {
  return (
    <>
      <h3>{text}</h3>
      <button>{confirmButtonText}</button>
      <button>{cancelButtonText}</button>
    </>
  )
}

export default Prompt
