import React, {useState, useEffect} from 'react'
import {Meteor} from 'meteor/meteor'
import {withNote} from '../../hocs'
import Editor from './Editor.jsx'
import DeleteNoteBtn from './DeleteNoteBtn'

// TODO: refresh content from db

const NoteEditor = ({note, ...props}) => {
  const [content, setContent] = useState([
    {
      type: 'paragraph',
      children: [{text: ''}],
    },
  ])

  useEffect(() => {
    if (note && note.content) setContent(JSON.parse(note.content))
  }, [note])

  if (!note) return null
  return (
    <>
      <DeleteNoteBtn
        onClick={() => Meteor.call('notes.remove', note._id)}
      />
      <Editor
        value={content}
        onChange={d =>
          Meteor.call('notes.edit', note._id, JSON.stringify(d)) ||
          setContent(d)
        }
        {...props}
      />
    </>
  )
}

export default withNote(NoteEditor)
