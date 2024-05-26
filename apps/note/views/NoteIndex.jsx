import { noteService } from "../services/note.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

import { NoteList } from "../cmps/NoteList.jsx"
import { NewNote } from "../cmps/NewNote.jsx"

const { Outlet } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    eventBusService.on('save', note => {
        setNotes(prevNotes => {
            console.log('note.id', note.id)
            let newNotes = []
            prevNotes.forEach(element => {
                if (element.id === note.id)
                    newNotes.push(note)
                else newNotes.push(element)
            })
            console.log(newNotes)
            return newNotes
        })
    })

    useEffect(() => {
        // setSearchParams(filterBy)
        // setNotes(prevNotes => {
        //     console.log('notesFromService', notesFromService)
        //     notesFromService
        // })
        noteService.query(/*filterBy*/)
            .then(setNotes)
    }, [/*filterBy*/])

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

    // function addNotes(notes) {
    //     console.log('notes', notes)
    //     setNotes(notes)
    // }

    function addNotes(note) {
        console.log('notes', notes)
        setNotes(notes => [note, ...notes])
    }

    return <main className="note-index">
        {/* <CreateNote /> */}
        {/* <div className="create">Take a note</div> */}
        <Outlet />
        <NewNote notes={notes} makeNewNotes={addNotes} />
        <NoteList notes={notes} onRemove={removeNote} />
    </main>
}
