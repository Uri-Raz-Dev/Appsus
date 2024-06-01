import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { Icons } from "./Icons.jsx"

const { useState, useEffect } = React

export function NotePreview({ note }) {
    const { type } = note

    return (type === 'NoteTodos') ? <CheckBoxPreview note={note} />
        : <section className="content">
            {(note.info.title) && <h3>{note.info.title}</h3>}
            <p >{(note.info.txt || note.info.title || note.info.url) ? note.info.txt : 'Empty note'}</p>
        </section>
}

export function CheckBoxPreview({ note }) {
    console.log('note from checkboxpreview', note)
    const [newNote, setNewNote] = useState({})

    useEffect(() => { if (newNote.info) noteService.save(newNote) }, [newNote])
    useEffect(() => { setNewNote(note) }, [])

    function toggleDone(todo) {
        setNewNote(prev => {
            let nextToDos = [...prev.info.todos]
            nextToDos[newNote.info.todos.indexOf(todo)] = { ...todo, doneAt: (todo.doneAt === null) ? 1 : null }
            let newInfo = { ...prev.info, todos: nextToDos }
            return { ...prev, info: newInfo }
        })

        // noteService.save()
    }

    if (note.info.todos.length || note.info.title) {
        return <section className="content todos">
            {(note.info.title) && <h3>{note.info.title}</h3>}
            {note.info.todos.length > 0 &&
                // <p>helloit it</p>
                <ul>
                    {
                        (newNote.info) && newNote.info.todos.map(todo =>
                            <li key={utilService.makeId()} className={(todo.doneAt === null) ? 'checkbox' : 'box-checked'}>
                                <Icons todo={todo} toggleDone={toggleDone}/*onClick={ev => {
                                    ev.preventDefault()
                                    toggleDone(todo, ev)
                                }}*/ type={(todo.doneAt === null) ? 'checkBox' : 'boxChecked'} />
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