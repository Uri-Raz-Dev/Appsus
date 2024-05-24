const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { noteService } from '../services/note.service.js'
import { eventBusService } from "../../../services/event-bus.service.js"
import { showErrorMsg } from '../../../services/event-bus.service.js'

import { TextArea } from "../cmps/TextArea.jsx";

export function NoteEdit() {

    const [note, setNote] = useState(
        { txt: '', title: '', txtLineBreaks: 1 }
    )
    const [countLineBreakEv, setcountLineBreakEv] = useState(1)
    const [textArea, setTextArea] = useState(1)


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
                setTextArea(note.txtLineBreaks)

            })
    }, [])

    // useEffect(() => {
    //     console.log('setting text area', note.txtLineBreaks);
    //     setTextArea(note.txtLineBreaks)
    // }, [note])



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
            setcountLineBreakEv(prev => prev + 1)
            setNote(prevNote => {
                console.log('prop', prop)
                console.log('name', name)
                console.log('prevNote', prevNote)
                let newInfo = { ...prevNote.info, txtLineBreaks: prevNote.info.txtLineBreaks + 1 }
                return { ...prevNote, info: newInfo }
            })
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
            let newInfo = { ...prevNote.info, [prop]: value }
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
                    lineBreakCount={countLineBreakEv} />
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