import { NotePreview } from './NotePreview.jsx'
import { NoteButtons, Pin } from './Buttons.jsx'

const { useState } = React

export function Note({ note, onRemove }) {
    const [color, setColor] = useState((note.style) ? note.style.backgroundColor : 'white')

    return (
        <article className="note" style={{ backgroundColor: color }}>

            <Pin note={note} />

            {(note.info.url) &&
                <img src={note.info.url} />}

            <NotePreview note={note} id={note.id} />

            <NoteButtons note={note} onRemove={onRemove} setColor={setColor} />

        </article>
    )
}