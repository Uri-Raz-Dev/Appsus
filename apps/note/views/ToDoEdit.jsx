const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { noteService } from '../services/note.service.js'
import { eventBusService } from "../../../services/event-bus.service.js"
import { showErrorMsg } from '../../../services/event-bus.service.js'

import { TextArea } from "../cmps/TextArea.jsx";
import { utilService } from '../../../services/util.service.js'

export function ToDoEdit() {
    const [note, setNote] = useState(
        { info: { todos: [], txtLineCount: 1 } }
    )
    const [newToDo, setNewToDo] = useState({ txt: '' })
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

    // useEffect(() => {
    //     if (note.info.todos.length)
    //         setNewToDo((noteService.getEmptyTodo(note.info.todos[0].id)))
    // }, [note])

    useEffect(() => {
        console.log('note', note)
        setNote(prev => {
            let nextToDos = [...prev.info.todos]
            nextToDos[lineNum] = newToDo
            let newInfo = { ...prev.info, todos: nextToDos }
            return { ...prev, info: newInfo }
        })

        if (newToDo.txt.length === 1 && lineNum === note.info.todos.length - 1) {
            // setNote(prev => {
            //     // let prevToDos = [...prev.info.todos, newToDo]
            //     let prevToDos = [...prev.info.todos]
            //     prevToDos[lineNum] = newToDo
            //     // prevToDos.push(noteService.getEmptyTodo())
            //     return {
            //         info: { todos: [...prevToDos], url: '', txt: '', title: '', txtLineCount: 1, titleLineCount: 1 },
            //     }
            // }
            // )
            // setIsFirstInput(false)
            setNote(prev => {
                let nextToDos = [...prev.info.todos]
                nextToDos.push(noteService.getEmptyTodo())
                let newInfo = { ...prev.info, todos: nextToDos }
                return { ...prev, info: newInfo }
            })
        }
    }, [newToDo])

    function onSave(ev) {
        ev.preventDefault()
        // setNotes(prevNotes => {
        //     console.log('note.id', note.id)
        //     let newNotes = []
        //     prevNotes.forEach(element => {
        //         if (element.id === note.id)
        //             newNotes.push(note)
        //         else newNotes.push(element)
        //     })
        //     console.log(newNotes)
        //     return newNotes
        // })

        // if (!note.info.todos[note.info.todos.length - 1].txt) {
        //     note.info.todos.splice(note.info.todos.length - 1, 1)
        // }
        // const noteForSave = note.info.todos.filter(todo => todo.txt)
        const toDosForSave = note.info.todos.filter(todo => todo.txt !== '')
        let newInfo = { ...note.info, todos: toDosForSave }
        const noteForSave = { ...note, info: newInfo }



        noteService.save(noteForSave)
            .then(() => {
                console.log('note from storage', note)
                eventBusService.emit('saveToDoEdit', noteForSave)
            })
            .catch(() => {
                // if (note.id) {
                //     console.log('note.id', note.id)
                //     setNote(prevNote => {
                //         let newInfo = { ...prevNote.info, txt: 'EMPTY NOTE' }
                //         return { ...prevNote, info: newInfo }
                //     })
                // } else 
                showErrorMsg('Couldnt save')
            })
            .finally(() => navigate('/note'))
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        // setIsFirstInput(true)

        // if (isFirstInput) {
        //     setNote({
        //         info: { todos: [noteService.getEmptyTodo(), newToDo,], url: '', txt: '', title: '', txtLineCount: 1, titleLineCount: 1 },
        //     })
        //     setIsFirstInput(false)
        // }

        setNewToDo(
            prevNewToDo => {
                console.log('{ ...prevNewToDo, txt: value }', { ...prevNewToDo, txt: value })
                return { ...prevNewToDo, txt: value }
            })

        // setNewNote(
        //     prevNewNote => {
        //         console.log('prop', prop)
        //         console.log('value', value)
        //         // const newToDoTxt = prevNewNote.info.todos(0).txt + value
        //         const newInfo = { ...prevNewNote.info, todos: [{ txt: value, doneAt: null }] }
        //         // console.log('newInfo', newInfo)
        //         // console.log('variable', variable)
        //         console.log('{ ...prevNewNote, info: newInfo }', { ...prevNewNote, info: newInfo })
        //         return { ...prevNewNote, info: newInfo }
        //     })
    }

    function handleChange2({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setNote(prevNote => {
            let newInfo = { ...prevNote.info, [prop]: value }
            return { ...prevNote, info: newInfo }
        })
    }
    // const filteredToDos=note.info.todos.filter(todo=>todo.doneAt!==null)
    return (
        <section className={`note-edit `}>
            <form onSubmit={onSave}>
                <ul>
                    {

                        note.info.todos.filter(todo => todo.doneAt === null).map(todo => {
                            return < li key={todo.id || utilService.makeId()}>
                                <label >
                                    <input type="text" id={note.info.todos.indexOf(todo)}
                                        // onClick={() => note.info.todos.find(item => item.id === todo.id)}
                                        onClick={(ev) => {
                                            // console.log('todo.id', todo.id)
                                            // console.log('note.info.todos.indexOf(todo)', note.info.todos.indexOf(todo))
                                            // ev.preventDefault()
                                            console.log('ev', ev)
                                            setLineNum(note.info.todos.indexOf(todo))
                                            setNewToDo(todo)
                                            // if (newToDo)
                                            // setNewToDo(noteService.getEmptyTodo(todo.id))
                                        }
                                        }
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