import { NotePreview } from './NotePreview.jsx'
import { NoteButtons, Pin } from './Buttons.jsx'

const { useState } = React

export function Note({ note, onRemove }) {
    const [newNote, setNewNote] = useState(note)

    return (
        <article className="note" style={{ backgroundColor: (newNote.style) ? newNote.style.backgroundColor : 'white' }}>

            <Pin note={newNote} />

            {(newNote.info.url) &&
                <img src={newNote.info.url} />}

            <NotePreview note={newNote} id={newNote.id} setNewNote={setNewNote} />

            <NoteButtons note={newNote} onRemove={onRemove} setNewNote={setNewNote} />

        </article>
    )
}