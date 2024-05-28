import { Icons } from "./Icons.jsx"

export function NotePreview({ note }) {
    const { type } = note

    return (type === 'NoteTodos') ? <CheckBoxPreview note={note} />
        : <section className="content">
            {(note.info.title) && <h3>{note.info.title}</h3>}
            <p >{(note.info.txt || note.info.title) ? note.info.txt : 'Empty note'}</p>
        </section>
}

export function CheckBoxPreview({ note }) {
    if (note.info.todos.length || note.info.title) {
        return <section className="content todos">
            {(note.info.title) && <h3>{note.info.title}</h3>}
            {note.info.todos.length > 0 &&
                // <p>helloit it</p>
                <ul>
                    {
                        note.info.todos.map(todo =>
                            <li key={todo.txt} className={(todo.doneAt === null) ? 'checkbox' : 'box-checked'}>
                                <Icons type={(todo.doneAt === null) ? 'checkBox' : 'boxChecked'} />
                                {todo.txt}
                            </li>
                        )
                    }
                </ul>
            }
        </section>

    } else return (<section className="content">
        <p >Empty note</p>
    </section>
    )
}