import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function AddToDo({ makeNewNotes }) {
    const [newToDos, setNewToDos] = useState(noteService.getEmptyTodos())
    const [lineNum, setLineNum] = useState(0)

    useEffect(() => {

        if (newToDos.info.todos[lineNum].txt.length === 1 &&
            +lineNum === newToDos.info.todos.length - 1) {

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

        noteService.save(noteForSave)
            .then(makeNewNotes)
            .catch((result) => {
                console.log(result);
            })
            .finally(() =>
                setNewToDos(noteService.getEmptyTodos()))


    }

    function handleChange({ target }) {
        let { value } = target
        setLineNum(target.id)

        setNewToDos(prev => {
            let nextToDos = [...prev.info.todos]
            nextToDos[target.id].txt = value
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
                                        value={todo.txt}
                                        onChange={handleChange}
                                        name="todo" placeholder="List Item"
                                    />
                                </label>
                            </li>
                        })
                    }
                </ul>

                {<button className="close" >Close</button>}
            </form>
        </section >
    )
}