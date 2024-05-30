const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { noteService } from '../services/note.service.js'
import { eventBusService } from "../../../services/event-bus.service.js"
import { showErrorMsg } from '../../../services/event-bus.service.js'

import { TextArea } from "../cmps/TextArea.jsx";

export function ToDoEdit() {
    const [note, setNote] = useState(
        { info: { todos: [], txtLineCount: 1 } }
    )

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.noteId) {
            console.log('No node id')
            return
        }
        noteService.get(params.noteId)
            .then(note => {
                setNote(note)
            })
    }, [])

    // useEffect(() => {
    //     setNote(prevNote => {
    //         if (prevNote.info.txt) {
    //             let newInfo = { ...prevNote.info, txtLineCount: (prevNote.info.txt.match(/\n/g) || []).length + 1 }
    //             return { ...prevNote, info: newInfo }
    //         }
    //     })
    // }, [note.info.txt])

    function onSave(ev) {
        ev.preventDefault()
        eventBusService.emit('save', note)
        noteService.save(note)
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

    return (
        <section className="todo-edit">
            <form onSubmit={onSave}>
                <label htmlFor="title"></label>
                <input
                    onChange={handleChange} value={(note.info.todos) ? note.info.title : note.title}
                    id="title" name="title"
                    type="text" placeholder="Title" />

                <label htmlFor="txt"></label>
                <TextArea note={note} onChange={handleChange} />
                <button>Close</button>
            </form>
        </section>
    )
}