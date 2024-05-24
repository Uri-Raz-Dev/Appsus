const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { noteService } from '../services/note.service.js'
import { eventBusService } from "../../../services/event-bus.service.js"
// import { showErrorMsg } from '../services/event-bus.service.js'

import { TextArea } from "../cmps/TextArea.jsx";

export function NoteEdit() {
    // let lineBreakCount = 0
    const [lineBreakCount, setlineBreakCount] = useState(1)


    const [note, setNote] = useState(
        { txt: '', title: '' }
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
                console.log('note', note)
                setNote(note)
            })
    }, [])

    function onSave(ev) {
        ev.preventDefault()
        eventBusService.emit('save', note)
        noteService.save(note)
            .then(() => navigate('/note'))
            .catch(() => {
                showErrorMsg('Couldnt save')
                navigate('/note')
            })
    }

    function handleChange({ target }) {
        console.log('event', event)
        if (event.inputType === 'insertLineBreak') {
            setlineBreakCount(prevLineBreak => prevLineBreak + 1)
            console.log('lineBreakCount', lineBreakCount)
        }
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
            console.log('prop', prop)
            console.log('name', name)
            const newInfo = { ...prevNote.info, [prop]: value }
            return { ...prevNote, info: newInfo }
        })
    }

    return (
        <section className="note-edit">
            {/* <h1>{params.noteId ? 'Edit note' : 'Add note'}</h1> */}

            <form onSubmit={onSave}>
                <label htmlFor="title"></label>
                <input
                    onChange={handleChange} value={(note.info) ? note.info.title : note.title}
                    id="title" name="title"
                    type="text" placeholder="Title" />

                <label htmlFor="txt"></label>
                <TextArea note={note} onChange={handleChange}
                    lineBreakCount={lineBreakCount} />
                {/* <textarea
                    name='txt'
                    id="txt"
                    cols='46'
                    rows='1'
                    wrap="hard"
                    placeholder="Note"
                    value={(note.info) ? note.info.txt : note.txt}
                    onChange={handleChange}
                ></textarea> */}
                {/* 
                <label htmlFor="txt">Speed</label>
                <input
                    onChange={handleChange} value={(note.info) ? note.info.txt : note.txt}
                    id="txt" name="txt"
                    type="text" placeholder="txt" /> */}

                <button>Save</button>
            </form>
        </section>
    )
}