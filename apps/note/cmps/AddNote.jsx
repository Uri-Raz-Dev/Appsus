import { noteService } from '../services/note.service.js'
import { eventBusService } from "../../../services/event-bus.service.js"

import { TextArea } from "./TextArea.jsx"
import { AddButtons } from "./Buttons.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

export function AddNote({ notes, makeNewNotes }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isButton, setIsButton] = useState('')
    const [clickCount, setclickCount] = useState(0)
    const [newNote, setNewNote] = useState(noteService.getEmptyNote(isButton))

    useEffect(() => {
        setNewNote(prevNote => {
            let newInfo = { ...prevNote.info, txtLineCount: (prevNote.info.txt.match(/\n/g) || []).length + 1 }
            return { ...prevNote, info: newInfo }
        })
    }, [newNote.info.txt])

    useEffect(() => {
        if (clickCount === 1) eventBusService.emit('focus', true)
    }, [clickCount])

    function onSave(ev) {
        ev.preventDefault()
        // eventBusService.emit('save', note)
        noteService.save(newNote)
            .then(makeNewNotes)
            .then(() =>
                setNewNote(noteService.getEmptyNote()))
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
                setclickCount(0)
                setIsOpen(false)
            })
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
        setNewNote(
            prevNewNote => {
                console.log('prop', prop)
                console.log('value', value)
                const newInfo = { ...prevNewNote.info, [prop]: value }
                console.log('newInfo', newInfo)
                return { ...prevNewNote, info: newInfo }
            })
    }

    return (
        <section className="note-add" onClick={() => {
            setclickCount(prev => prev + 1)
            setIsOpen(true)
            // setIsButton(false)
        }}>
            <form onSubmit={onSave}>
                <AddButtons isOpen={isOpen} setIsButton={setIsButton} note={newNote} setNewNote={setNewNote}

                /*onClick={ev => {
                    ev.preventDefault()
                    setIsButton(true)
                }}*/ />

                {/* {isOpen && <label >
                    <input
                        onChange={handleChange} value={newNote.info.title}
                        id="image-url" name="image-url"
                        type="text" placeholder="Enter image URL" />
                </label>} */}

                {isOpen && !isButton && <label >
                    <input
                        onChange={handleChange} value={newNote.info.title}
                        id="title" name="title"
                        type="text" placeholder="Title" />
                </label>}

                <label htmlFor="txt"></label>
                <TextArea note={newNote} onChange={handleChange} placeHolder={(isButton === 'image') ? 'Enter image URL' : 'Take a note...'} isButton={isButton}
                />
                {isOpen && <button className="close" onClick={() => {
                    setIsButton('')
                }}>Close</button>}
            </form>
        </section>
    )
}