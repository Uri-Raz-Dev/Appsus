import { noteService } from "../services/note.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

import { NoteList } from "../cmps/NoteList.jsx"
import { AddNote } from "../cmps/AddNote.jsx"
import { AddToDo } from "../cmps/AddToDo.jsx"

const { Outlet } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [pinned, setPinned] = useState([])
    const [other, setOther] = useState([])
    const [toDo, setToDo] = useState(false)

    const unSubToToDo = eventBusService.on('todo', () => {
        setToDo(!toDo)
    })

    useEffect(() => {
        const unSubToSavePin = eventBusService.on('savePin', note => {
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
        return unSubToSavePin
    }, [/*filterBy*/])

    useEffect(() => {
        return unSubToToDo
    }, [])

    useEffect(() => {
        setPinned(() => {
            return [...noteService.getPinnedNotes(notes)]
        })
        setOther(() => {
            console.log('There was a change in notes', notes)
            return [...noteService.getOtherNotes(notes)]
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
    const isOther = other.length > 0

    return <main className="note-index">
        {/* <CreateNote /> */}
        {/* <div className="create">Take a note</div> */}
        <Outlet />

        {!toDo && <AddNote notes={notes} makeNewNotes={addNotes} />}
        {toDo && <AddToDo notes={notes} makeNewNotes={addNotes} />}
        {isPinned && < NoteList notes={pinned} onRemove={removeNote} showSectionTitle={isPinned && isOther && <p>Pinned</p>} />}

        {isOther && < NoteList notes={other} onRemove={removeNote}
            showSectionTitle={isPinned && isOther && <p>Others</p>} />}

        {!isPinned && !isOther && <section className="notes"/*style={{ opacity: isLoading ? 0.5 : 1 }}*/ >
            <div className="empty-notes">Notes you add appear here</div>
        </section>}
    </main>
}
