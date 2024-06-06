import { eventBusService } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { Icons } from "./Icons.jsx"

const { useState, useEffect } = React

export function NotePreview({ note, id, setNewNote }) {
    const { type } = note
    const [noteForPreview, setNoteForPreview] = useState(note)
    const info = noteForPreview.info

    useEffect(() => {

        const unsubscribe = eventBusService.on('saveEdit', note => {
            if (note.id === id) {
                setNoteForPreview(note)
                setNewNote(note)
            }
        })

        return unsubscribe
    }, [])


    return (
        (type === 'NoteTodos') ?
            <CheckBoxPreview note={note} id={id} setNewNote={setNewNote} />
            :
            <section className="content">
                {(noteForPreview.info.title) &&
                    <h3>{info.title}</h3>
                }

                <p >{(info.txt || info.title || info.url) ?
                    info.txt : 'Empty note'}
                </p>
            </section>
    )
}

export function CheckBoxPreview({ note, id, setNewNote }) {
    const [toDoNote, setToDoNote] = useState(note)

    useEffect(() => {
        const unsubscribe = eventBusService.on('saveToDoEdit', note => {
            if (note && note.id === id) {
                setToDoNote(note)
            }
        })
        return unsubscribe
    }, [])


    useEffect(() => {
        if (toDoNote.info) {
            noteService.save(toDoNote)
            setNewNote(toDoNote)
        }
    }, [toDoNote])

    function toggleDone(todo) {

        setToDoNote(prev => {
            let nextToDos = [...prev.info.todos]
            nextToDos[toDoNote.info.todos.indexOf(todo)] =
                { ...todo, doneAt: (todo.doneAt === null) ? 1 : null }
            let newInfo = { ...prev.info, todos: nextToDos }
            return { ...prev, info: newInfo }
        })

    }

    if (note.info.todos.length) {

        return (
            <section className="content todos">

                {(note.info.title) && <h3>{note.info.title}</h3>}

                {note.info.todos.length > 0 &&
                    <ul>
                        {
                            (toDoNote.info) && toDoNote.info.todos.map(todo =>

                                <li key={utilService.makeId()}
                                    className={(todo.doneAt === null) ? 'checkbox' : 'box-checked'}>

                                    <Icons todo={todo}
                                        toggleDone={toggleDone}
                                        type={(todo.doneAt === null) ? 'checkBox' : 'boxChecked'} />

                                    {todo.txt}

                                </li>
                            )
                        }
                    </ul>
                }
            </section>
        )
    }
}