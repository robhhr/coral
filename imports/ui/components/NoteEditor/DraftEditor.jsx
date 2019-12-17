import React from 'react'
import Editor from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const DraftEditor = ({value = '', onChange, ...props}) => (
  <Editor value={value} onChange={onChange} theme="snow" {...props} />
)

export default DraftEditor