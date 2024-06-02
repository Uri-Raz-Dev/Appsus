import { eventBusService } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function AddToDo({ makeNewNotes }) {
    const [isOpen, setIsOpen] = useState(true)
    const [isButton, setIsButton] = useState('')

    const [newNote, setNewNote] = useState(noteService.getEmptyTodoNote())
    const [newToDos, setNewToDos] = useState(noteService.getEmptyTodos())
    const [newToDo, setNewToDo] = useState(noteService.getEmptyTodo(newToDos.info.todos[0].id))
    const [isFirstInput, setIsFirstInput] = useState(true)
    const [lineNum, setLineNum] = useState(0)
    // var lineNum = 0

    // useEffect(() => {
    //     console.log('newToDos', newToDos)
    //     // setNewToDos(prev => {
    //     //     let nextToDos = [...prev.info.todos]
    //     //     nextToDos[lineNum] = newToDo
    //     //     let newInfo = { ...prev.info, todos: nextToDos }
    //     //     console.log('{ ...prev, info: newInfo }', { ...prev, info: newInfo })
    //     //     return { ...prev, info: newInfo }
    //     // })
    //     console.log('lineNum from useeffect', lineNum)

    //     if (newToDos.info.todos[lineNum].txt.length === 1 && lineNum === newToDos.info.todos.length - 1) {
    //         console.log('hello')
    //         setNewToDos(prev => {
    //             let nextToDos = [...prev.info.todos]
    //             nextToDos.push(noteService.getEmptyTodo())
    //             let newInfo = { ...prev.info, todos: nextToDos }
    //             return { ...prev, info: newInfo }
    //         })
    //     }
    // }, [newToDos])

    useEffect(() => {
        console.log('lineNum from linenum', lineNum)
        console.log('newToDos.info.todos[lineNum].txt.length', newToDos.info.todos[lineNum].txt.length)
        console.log('newToDos.info.todos.length', newToDos.info.todos.length)
        console.log('newToDos.info.todos[lineNum].txt.length === 1', newToDos.info.todos[lineNum].txt.length === 1)
        console.log('lineNum === newToDos.info.todos.length - 1', lineNum === newToDos.info.todos.length - 1)
        console.log('typeof(lineNum)', typeof (lineNum))
        console.log('typeof(newToDos.info.todos.length - 1)', typeof (newToDos.info.todos.length - 1))
        if (newToDos.info.todos[lineNum].txt.length === 1 && +lineNum === newToDos.info.todos.length - 1) {
            console.log('condition true')
            setNewToDos(prev => {
                let nextToDos = [...prev.info.todos]
                nextToDos.push(noteService.getEmptyTodo())
                let newInfo = { ...prev.info, todos: nextToDos }
                return { ...prev, info: newInfo }
            })
        }
    }, [lineNum])

    function onSave(ev) {
        ev.preventDefault()

        eventBusService.emit('todo', false)
        const toDosForSave = newToDos.info.todos.filter(todo => todo.txt)
        let newInfo = { ...newToDos.info, todos: toDosForSave }
        const noteForSave = { ...newToDos, info: newInfo }

        console.log('newToDos from save', noteForSave)
        noteService.save(noteForSave)
            .then(makeNewNotes)
            .then(() =>
                setNewToDos(noteService.getEmptyTodos()))
            .catch((result) => {
                console.log(result);
            })
            .finally(() => {
            })
    }

    function handleChange({ target }) {
        let { value } = target
        setLineNum(target.id)
        console.log('lineNum from handle', lineNum)
        // setNewToDo(
        //     prevNewToDo => {
        //         console.log('{ ...prevNewToDo, txt: value }', { ...prevNewToDo, txt: value })
        //         return { ...prevNewToDo, txt: value }
        //     })

        setNewToDos(prev => {
            console.log('prev', prev)
            let nextToDos = [...prev.info.todos]
            nextToDos[target.id] = { ...newToDo, txt: value }
            let newInfo = { ...prev.info, todos: nextToDos }
            return { ...prev, info: newInfo }
        })
    }

    return (
        <section className={`note-add `}>
            <form onSubmit={onSave}>
                <ul>
                    {
                        newToDos.info.todos.map(todo => {
                            return < li key={newToDos.info.todos.indexOf(todo)}>
                                <label >
                                    <input
                                        type="text"
                                        id={newToDos.info.todos.indexOf(todo)}

                                        // onClick={() => {
                                        //     console.log('todo.id', todo.id)
                                        //     console.log('newToDos.info.todos.indexOf(todo)', newToDos.info.todos.indexOf(todo))

                                        //     setLineNum(newToDos.info.todos.indexOf(todo))
                                        //     setNewToDo(todo)
                                        // }
                                        // }
                                        value={todo.txt}
                                        onChange={handleChange}
                                        name="todo" placeholder="List Item"
                                    />
                                </label>
                            </li>
                        })
                    }
                </ul>

                {isOpen && <button className="close" onClick={() => {
                    setIsButton('')
                }}>Close</button>}
            </form>
        </section >
    )
}