import { Note } from './Note.jsx'

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemove, title }) {

    if (notes && notes.length) return (

        <section className="notes">

            {title &&
                <p>
                    {title}
                </p>
            }

            <ul className="list">
                {notes.map(note =>
                    <li key={note.id} >

                        <Link to={(note.type === 'NoteTodos') ?
                            `/note/todo-edit/${note.id}` :
                            `/note/note-edit/${note.id}`}>
                            <Note note={note} onRemove={onRemove} />
                        </Link>
                    </li>)
                }
            </ul>
        </section>
    )
    else return (
        <section className="notes">
            <div className="empty-notes">Notes you add appear here</div>
        </section>
    )
}
