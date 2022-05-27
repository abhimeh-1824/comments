import React, { useState } from 'react'

const CommetnForm = ({handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel
}) => {
  const [text,setText] = useState("")
  const isTextAreaDisabled = text.length===0;
  const onSubmit = (e) =>{
    e.preventDefault()
    handleSubmit(text)
    setText("")
  }
  return (
    <form onSubmit={onSubmit}>
      <textarea className='comment-form-textarea' value={text} onChange={(e)=>setText(e.target.value)} />
      <button className='comment-form-button' disabled={isTextAreaDisabled} >{submitLabel}</button>
      {
        hasCancelButton && (

          <button className="comment-rorm-cancel-button" type='button' onClick={handleCancel}> Cancel</button>
        )
      }
    </form>
  )
}

export default CommetnForm

