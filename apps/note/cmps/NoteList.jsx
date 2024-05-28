import { NotePreview } from './NotePreview.jsx'
import { Buttons } from './Buttons.jsx'

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemove }) {

    if (notes && notes.length) return (<section className="notes"/*style={{ opacity: isLoading ? 0.5 : 1 }}*/ >
        <ul className="list">
            {notes.map(note =>
                <li key={note.id} >
                    <Link to={`/note/edit/${note.id}`}>
                        <article className="note">
                            {(note.info.url) && <img src={note.info.url} />}
                            <NotePreview note={note} />
                            <Buttons note={note} onRemove={onRemove} />

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
