import { utilService } from "../../../services/util.service.js"
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function AddToDo({ makeNewNotes }) {
    const [isOpen, setIsOpen] = useState(true)
    const [isButton, setIsButton] = useState('')
    // const [clickCount, setclickCount] = useState(0)
    const [newNote, setNewNote] = useState(noteService.getEmptyTodoNote())
    const [newToDos, setNewToDos] = useState(noteService.getEmptyTodos())
    const [newToDo, setNewToDo] = useState(noteService.getEmptyTodo(newToDos.info.todos[0].id))
    const [isFirstInput, setIsFirstInput] = useState(true)
    const [lineNum, setLineNum] = useState(0)



    // useEffect(() => {
    //     setNewNote(prevNote => {
    //         let newInfo = { ...prevNote.info, txtLineCount: (prevNote.info.txt.match(/\n/g) || []).length + 1 }
    //         return { ...prevNote, info: newInfo }
    //     })
    // }, [newNote.info.txt])

    useEffect(() => {
        console.log('newToDos', newToDos)
        setNewToDos(prev => {
            let nextToDos = [...prev.info.todos]
            nextToDos[lineNum] = newToDo
            let newInfo = { ...prev.info, todos: nextToDos }
            return { ...prev, info: newInfo }
        })

        if (newToDo.txt.length === 1 && lineNum === newToDos.info.todos.length - 1) {
            // setNewToDos(prev => {
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
            setNewToDos(prev => {
                let nextToDos = [...prev.info.todos]
                nextToDos.push(noteService.getEmptyTodo())
                let newInfo = { ...prev.info, todos: nextToDos }
                return { ...prev, info: newInfo }
            })
        }
    }, [newToDo])


    // useEffect(() => {

    //     if (lineNum !== 0) {

    //         setNewToDos(prev => {
    //             let newArray = []
    //             prev.info.todos.forEach(element => {
    //                 if (element.id === newToDo.id)
    //                     newArray.push(newToDo)
    //                 else newArray.push(element)
    //             })
    //             // newArray.push(noteService.getEmptyTodo()
    //             setNewToDo(noteService.getEmptyTodo)
    //             return newArray
    //         })
    //     }

    // }, [lineNum])

    function onSave(ev) {
        ev.preventDefault()
        // eventBusService.emit('save', note)
        newToDos.info.todos.splice(newToDos.info.todos.length - 1, 1)
        noteService.save(newToDos)
            .then(makeNewNotes)
            .then(() =>
                setNewToDos(noteService.getEmptyTodos()))
            //     // setNewNotes(prevNotes => {
            //     //     console.log('prevNotes', [note, ...prevNotes])
            //     //     return [note, ...prevNotes]
            //     // })
            // })
            .catch(() => {
                console.log('error');
                // showErrorMsg('Couldnt save')
                // navigate('/note')
            })
            .finally(() => {
                // setclickCount(0)
                // setIsOpen(false)
            })
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        // setIsFirstInput(true)

        // if (isFirstInput) {
        //     setNewToDos({
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

    return (
        <section className="note-add">
            <form onSubmit={onSave}>
                <ul>
                    {
                        newToDos.info.todos.map(todo => {
                            return < li key={todo.id}>
                                <label >
                                    <input type="text"
                                        // onClick={() => newToDos.info.todos.find(item => item.id === todo.id)}
                                        onClick={() => {
                                            console.log('todo.id', todo.id)
                                            console.log('newToDos.info.todos.indexOf(todo)', newToDos.info.todos.indexOf(todo))

                                            setLineNum(newToDos.info.todos.indexOf(todo))
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

                {isOpen && <button className="close" onClick={() => {
                    setIsButton('')
                }}>Close</button>}
            </form>
        </section >
    )
}