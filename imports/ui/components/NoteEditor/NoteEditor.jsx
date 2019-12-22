import React, {useState, useEffect} from 'react'
import {Meteor} from 'meteor/meteor'
import Editor from './Editor.jsx'
import Header from './Header.jsx'
import ShareForm from './ShareForm.jsx'

const NoteEditor = ({note, ...props}) => {
  const [content, setContent] = useState()

  useEffect(() => {
    if (note && note.content) setContent(JSON.parse(note.content))
  }, [note])

  if (!note) return null
  return (
    <>
      <Header noteId={note._id} value={note.title} />
      <ShareForm
        noteId={note._id}
        collaborators={note.collaborators}
        author={note.author}
      />
      <Editor
        value={content}
        onChange={d =>
          Meteor.call('notes.edit', note._id, JSON.stringify(d)) ||
          setContent(d) ||
          console.log(JSON.stringify(d))
        }
        {...props}
      />
    </>
  )
}

export default NoteEditor
