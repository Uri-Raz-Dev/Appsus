export function NotePreview({ note }) {
    return (
        <article className="note-preview">
            {(note.info.title) && <h3>{note.info.title}</h3>}
            <p className="content">{(note.info.txt) ? note.info.txt : ''}</p>
        </article>
    )
}