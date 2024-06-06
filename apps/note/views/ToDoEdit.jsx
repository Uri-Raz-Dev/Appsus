const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { noteService } from '../services/note.service.js'
import { eventBusService } from "../../../services/event-bus.service.js"
import { showErrorMsg } from '../../../services/event-bus.service.js'

export function ToDoEdit() {
    const [note, setNote] = useState(
        { info: { todos: [{ txt: '' }], txtLineCount: 1 } }
    )
    const [lineNum, setLineNum] = useState(0)


    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.noteId) {
            console.log('No node id')
            return
        }
        noteService.get(params.noteId)
            .then(note => {
                console.log('to do note', note)
                setNote(note)
                setNote(prev => {
                    let nextToDos = [...prev.info.todos]
                    nextToDos.push(noteService.getEmptyTodo())
                    let newInfo = { ...prev.info, todos: nextToDos }
                    return { ...prev, info: newInfo }
                })
            })
    }, [])

    useEffect(() => {

        if (note.info.todos[lineNum].txt.length === 1 &&
            +lineNum === note.info.todos.length - 1) {

            setNote(prev => {
                let nextToDos = [...prev.info.todos]
                nextToDos.push(noteService.getEmptyTodo())
                let newInfo = { ...prev.info, todos: nextToDos }
                return { ...prev, info: newInfo }
            })
        }
    }, [lineNum])

    function onSave(ev) {
        ev.preventDefault()

        const toDosForSave = note.info.todos.filter(todo => todo.txt !== '')
        let newInfo = { ...note.info, todos: toDosForSave }
        const noteForSave = { ...note, info: newInfo }

        eventBusService.emit('saveToDoEdit', noteForSave)

        noteService.save(noteForSave)
            .then(() => {
                console.log('note from storage', note)
            })
            .catch(() => {
                showErrorMsg('Couldnt save')
            })
            .finally(() => navigate('/note'))
    }

    function handleChange({ target }) {
        let { value } = target
        setLineNum(target.id)

        setNote(prev => {
            let nextToDos = [...prev.info.todos]
            nextToDos[target.id].txt = value
            let newInfo = { ...prev.info, todos: nextToDos }
            return { ...prev, info: newInfo }
        })
    }

    return (
        <section className={`note-edit `}>
            <form onSubmit={onSave}>
                <ul>
                    {

                        note.info.todos.filter(todo => todo.doneAt === null).map(todo => {
                            return < li key={note.info.todos.indexOf(todo)}>
                                <label >
                                    <input type="text" id={note.info.todos.indexOf(todo)}
                                        value={todo.txt}
                                        onChange={handleChange}
                                        name="todo" placeholder="List Item"
                                    />
                                </label>
                            </li>

                        })
                    }
                </ul>
                {/* <label >
                <input
                    onChange={handleChange}
                    value={newNote.info.title}
                    id="title" name="title"
                    type="text" placeholder="Title" />
            </label>


            <label htmlFor="txt"></label>
            <TextArea note={newNote} onChange={handleChange} placeHolder={(isButton === 'image') ? 'Enter image URL' : 'Take a note...'} isButton={isButton}
            /> */}

                {<button className="close" onClick={() => {
                }}>Close</button>}
            </form>
        </section >

        // <section className="todo-edit">
        //     <form onSubmit={onSave}>
        //         <label htmlFor="title"></label>
        //         <input
        //             onChange={handleChange} value={(note.info.todos) ? note.info.title : note.title}
        //             id="title" name="title"
        //             type="text" placeholder="Title" />

        //         <label htmlFor="txt"></label>
        //         <TextArea note={note} onChange={handleChange} />
        //         <button>Close</button>
        //     </form>
        // </section>
    )
}