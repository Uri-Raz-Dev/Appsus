import { noteService } from "../services/note.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

import { NoteList } from "../cmps/NoteList.jsx"
import { AddNote } from "../cmps/AddNote.jsx"

const { Outlet } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [pinned, setPinned] = useState([])
    const [nonPinned, setNonPinned] = useState([])

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
        console.log('currently pinned', pinned)

        noteService.query(/*filterBy*/)
            .then(setNotes)
        // .then(setPinned(notes => {
        //     console.log('notes', notes)
        //     return [...noteService.getPinnedNotes(notes)]
        // }))
        // .then((pinned) => console.log('currently pinned', pinned))
    }, [/*filterBy*/])

    useEffect(() => {
        setPinned(() => {
            return [...noteService.getPinnedNotes(notes)]
        })
        setNonPinned(() => {
            console.log('There was a change in notes', notes)
            return [...noteService.getNonPinnedNotes(notes)]
        })
    }, [notes])

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

    const isPinned = pinned.length > 0
    const isNonPinned = nonPinned.length > 0

    return <main className="note-index">
        {/* <CreateNote /> */}
        {/* <div className="create">Take a note</div> */}
        <Outlet />
        <AddNote notes={notes} makeNewNotes={addNotes} />
        {isPinned && < NoteList notes={pinned} onRemove={removeNote} showSectionTitle={isPinned && isNonPinned && <p>Pinned</p>} />}
        {isNonPinned && < NoteList notes={nonPinned} onRemove={removeNote}
            showSectionTitle={isPinned && isNonPinned && <p>Others</p>} />}
        {!isPinned && !isNonPinned && <section className="notes"/*style={{ opacity: isLoading ? 0.5 : 1 }}*/ >
            <div className="empty-notes">Notes you add appear here</div>
        </section>}
    </main>
}
