import { noteService } from '../services/note.service.js'
import { eventBusService } from "../../../services/event-bus.service.js"

import { TextArea } from "./TextArea.jsx"
import { AddButtons } from "./Buttons.jsx"

const { useState, useEffect } = React

export function AddNote({ makeNewNotes }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isButton, setIsButton] = useState('')
    const [clickCount, setclickCount] = useState(0)
    const [newNote, setNewNote] = useState(noteService.getEmptyNote(isButton))

    useEffect(() => {
        setNewNote(prevNote => {
            let newInfo = {
                ...prevNote.info,
                txtLineCount:
                    (prevNote.info.txt.match(/\n/g) || []).length + 1
            }
            return { ...prevNote, info: newInfo }
        })
    }, [newNote.info.txt])

    useEffect(() => {
        if (clickCount === 1) eventBusService.emit('focus', true)
    }, [clickCount])

    function onSave(ev) {
        ev.preventDefault()

        noteService.save(newNote)
            .then(makeNewNotes)
            .then(() =>
                setNewNote(noteService.getEmptyNote()))
            .catch(() => {
                console.log('error');
            })
            .finally(() => {
                setclickCount(0)
                setIsOpen(false)
            })
    }

    function handleChange({ target }) {
        const { name: prop } = target
        let { value } = target

        setNewNote(
            prevNewNote => {
                const newInfo = { ...prevNewNote.info, [prop]: value }
                return {
                    ...prevNewNote,
                    info: newInfo,
                    type: (prop === 'url') ? 'NoteImg' : 'NoteTxt'
                }
            })
    }

    return (
        <section className={`note-add `}
            onClick={() => {
                setclickCount(prev => prev + 1)
                setIsOpen(true)

            }} >

            <form onSubmit={onSave}>

                <AddButtons isOpen={isOpen} setIsButton={setIsButton}
                    note={newNote} setNewNote={setNewNote} />

                {isOpen && !isButton &&
                    <label >
                        <input
                            onChange={handleChange}
                            value={newNote.info.title}
                            id="title" name="title"
                            type="text" placeholder="Title" />
                    </label>
                }

                <label htmlFor="txt"></label>
                <TextArea
                    note={newNote}
                    onChange={handleChange}
                    placeHolder={(isButton === 'image') ?
                        'Enter image URL' : 'Take a note...'}
                    isButton={isButton}
                />

                {isOpen &&
                    <button className="close"
                        onClick={() => {
                            setIsButton('')
                        }}>
                        Close
                    </button>}

            </form>
        </section>
    )
}