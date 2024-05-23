import { noteService } from "../services/note.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

import { NoteList } from "../cmps/NoteList.jsx"

const { Outlet } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [edit, setEdit] = useState(false)
    const [note, setNote] = useState({ id: '' })

    eventBusService.on('save', note => {
        // setNotes(prevNotes => [...prevNotes, note])

        // setEdit(() => {
        //     console.log('change edit to', edit);
        //     return true
        // })
        console.log('note', note)
        setNote(note)
    })

    useEffect(() => {
        // setSearchParams(filterBy)
        // setNotes(prevNotes => {
        //     console.log('notesFromService', notesFromService)
        //     notesFromService
        // })
        console.log('edit', edit)
        noteService.query(/*filterBy*/)
            .then(setNotes)
    }, [/*filterBy*/])

    // useEffect(() => {
    //     // setSearchParams(filterBy)
    //     // setNotes(prevNotes => {
    //     //     console.log('notesFromService', notesFromService)
    //     //     notesFromService
    //     // })
    //     console.log('edit', edit)
    //     noteService.query(/*filterBy*/)
    //         .then(setNotes(prevNotes => [...prevNotes]))
    // }, [/*filterBy*/, edit])

    useEffect(() => {
        // setSearchParams(filterBy)
        // setNotes(prevNotes => {
        //     console.log('notesFromService', notesFromService)
        //     notesFromService
        // })
        // console.log('edit', edit)
        noteService.query(/*filterBy*/)
            .then(setNotes(prevNotes => {
                console.log('note.id', note.id)
                let newNotes = []
                if (note.id) {
                    prevNotes.forEach(element => {
                        if (element.id === note.id)
                            newNotes.push(note)
                        else newNotes.push(element)
                    })
                }

                //  = (note.id) ? prevNotes : [...prevNotes]
                console.log(newNotes);
                return newNotes
            }))
    }, [/*filterBy*/ note])

    function removeNote(noteId) {
        // setIsLoading(true)
        noteService.remove(noteId)
            .then(() => {
                // utilService.animateCSS('fadeAway')
                //     .then(() => setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId)))
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMsg(`Note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('There was a problem')
            })
        // .finally(() => setIsLoading(false))
    }

    function onEdit(isSave) {
        if (isSave) setNotes(prevNotes => ([...prevNotes, note]))
    }

    return <main className="note-index">
        {/* <CreateNote /> */}
        {/* <div className="create">Take a note</div> */}
        note app
        <Outlet />
        <NoteList notes={notes} onRemove={removeNote} onEdit={onEdit} />
    </main>
}
