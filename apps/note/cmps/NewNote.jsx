import { noteService } from '../services/note.service.js'
import { eventBusService } from "../../../services/event-bus.service.js"

import { TextArea } from "./TextArea.jsx";

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

export function NewNote({ notes, makeNewNotes }) {
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const [isOpen, setisOpen] = useState(false)
    const [clickCount, setclickCount] = useState(0)

    // const [newNotes, setNewNotes] = useState(notes)

    useEffect(() => {
        setNewNote(prevNote => {
            let newInfo = { ...prevNote.info, txtLineCount: (prevNote.info.txt.match(/\n/g) || []).length + 1 }
            return { ...prevNote, info: newInfo }
        })
    }, [newNote.info.txt])

    // useEffect(() => {
    //     if (inputRef.current) {
    //         inputRef.current.focus()
    //     }
    // }, [])

    // useEffect((newNotes) => {
    //     console.log('newNotes', newNotes)
    //     // makeNewNotes(newNotes)
    // }, [newNotes])

    // useEffect(() => {
    //     console.log('newNotes', newNotes)
    //     // makeNewNotes(newNotes)
    //     setNewNotes(notes)
    // }, [])


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
                setisOpen(false)
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
                console.log('name', name)
                const newInfo = { ...prevNewNote.info, [prop]: value }
                return { ...prevNewNote, info: newInfo }
            })
    }

    return (
        <section className="note-add" onClick={() => {
            setclickCount(prev => prev + 1)
            setisOpen(true)
        }}>
            <form onSubmit={onSave}>
                {isOpen && <label >
                    <input
                        onChange={handleChange} value={newNote.info.title}
                        id="title" name="title"
                        type="text" placeholder="Title" />
                </label>}

                <label htmlFor="txt"></label>
                <TextArea note={newNote} onChange={handleChange} placeHolder={'Take a note...'}
                />
                {/* <textarea
                    name='txt'
                    id="txt"
                    cols='46'
                    rows='10'
                    wrap="hard"
                    placeholder="Text"
                    value={newNote.info.title}
                    onChange={handleChange}
                ></textarea> */}
                {/* 
                <label htmlFor="txt">Speed</label>
                <input
                    onChange={handleChange} value={(note.info) ? note.info.txt : note.txt}
                    id="txt" name="txt"
                    type="text" placeholder="txt" /> */}

                {isOpen && <button>Close</button>}
            </form>
        </section>
    )
}