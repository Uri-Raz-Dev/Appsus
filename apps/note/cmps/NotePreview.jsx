import { eventBusService } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { Icons } from "./Icons.jsx"

const { useState, useEffect } = React

export function NotePreview({ note }) {
    const { type } = note
    const [noteForPreview, setNoteForPreview] = useState(note)
    const info = noteForPreview.info

    useEffect(() => {

        const unsubscribe = eventBusService.on('saveEdit', note => {
            setNoteForPreview(note)
        })

        return unsubscribe
    }, [])


    return (
        (type === 'NoteTodos') ?
            <CheckBoxPreview note={note} />
            :
            <section className="content">
                {(noteForPreview.info.title) &&
                    <h3>{info.title}</h3>
                }

                <p >{(info.txt || info.title || info.url) ?
                    info.txt : 'Empty note'
                }
                </p>
            </section>
    )
}

export function CheckBoxPreview({ note }) {
    const [newNote, setNewNote] = useState(note)
    const info = note.info
    const newInfo = newNote.info

    useEffect(() => {
        const unsubscribe = eventBusService.on('saveToDoEdit', note => {
            setNewNote(note)
        })
        return unsubscribe
    }, [])


    useEffect(() => { if (newInfo) noteService.save(newNote) }, [newNote])

    function toggleDone(todo) {

        setNewNote(prev => {
            let nextToDos = [...prev.info.todos]
            nextToDos[newInfo.todos.indexOf(todo)] =
                { ...todo, doneAt: (todo.doneAt === null) ? 1 : null }
            let newInfo = { ...prev.info, todos: nextToDos }
            return { ...prev, info: newInfo }
        })

    }

    if (note.info.todos.length) {
        return (
            <section className="content todos">
                {(info.title) && <h3>{info.title}</h3>}
                {info.todos.length > 0 &&
                    <ul>
                        {
                            (newInfo) && newInfo.todos.map(todo =>

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