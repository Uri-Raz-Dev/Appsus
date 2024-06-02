import { NotePreview } from './NotePreview.jsx'
import { NoteButtons, Pin } from './Buttons.jsx'

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemove, showSectionTitle }) {
    console.log('notes', notes)
    if (notes && notes.length) return (<section className="notes"/*style={{ opacity: isLoading ? 0.5 : 1 }}*/ >
        {showSectionTitle}
        <ul className="list">
            {notes.map(note =>
                <li key={note.id} >
                    <Link to={(note.type === 'NoteTodos') ? `/note/todo-edit/${note.id}` : `/note/note-edit/${note.id}`}>
                        <article className="note">
                            <Pin note={note} />
                            {(note.info.url) && <img src={note.info.url} />}
                            <NotePreview note={note} />
                            <NoteButtons note={note} onRemove={onRemove} />

                            {/* <button onClick={() => onRemove(note.id)}>x</button> */}
                            {/* <Link to={`/note/${note.id}`}><button>Details</button></Link> */}
                        </article>
                    </Link>
                </li>)
            }
        </ul>
    </section>
    )
    else return (<section className="notes"/*style={{ opacity: isLoading ? 0.5 : 1 }}*/ >
        <div className="empty-notes">Notes you add appear here</div>
    </section>)
}
