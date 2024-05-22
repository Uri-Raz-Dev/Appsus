import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {
    return (<section className="notes"/*style={{ opacity: isLoading ? 0.5 : 1 }}*/ >
        <ul className="list">
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} />
                    {/* <button onClick={() => onRemove(note.id)}>x</button> */}
                    {/* <Link to={`/note/${note.id}`}><button>Details</button></Link> */}
                    {/* <Link to={`/note/edit/${note.id}`}><button>Edit</button></Link> */}
                </li>)
            }
        </ul>
    </section>
    )
}
