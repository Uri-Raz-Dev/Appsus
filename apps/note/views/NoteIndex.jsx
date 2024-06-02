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
                let newNotes = []
                prevNotes.forEach(element => {
                    if (element.id === note.id)
                        newNotes.push(note)
                    else newNotes.push(element)
                })
                return newNotes
            })
        })

        noteService.query()
            .then(setNotes)
        return unSubToSavePin
    }, [])

    useEffect(() => {
        return unSubToToDo
    }, [])

    useEffect(() => {
        setPinned(() => {
            return [...noteService.getPinnedNotes(notes)]
        })
        setOther(() => {
            return [...noteService.getOtherNotes(notes)]
        })
    }, [notes])

    function removeNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            })
            .catch(err => {
                showErrorMsg('There was a problem')
            })
    }

    function addNotes(note) {
        setNotes(notes => [note, ...notes])
    }

    const isPinned = pinned.length > 0
    const isOther = other.length > 0

    return <main className="note-index">
        <Outlet />

        {(toDo) ?
            <AddToDo notes={notes} makeNewNotes={addNotes} />
            :
            <AddNote notes={notes} makeNewNotes={addNotes} />
        }

        {isPinned &&
            < NoteList notes={pinned} onRemove={removeNote}
                showSectionTitle={isPinned && isOther && <p>Pinned</p>} />
        }

        {isOther &&
            < NoteList notes={other} onRemove={removeNote}
                showSectionTitle={isPinned && isOther && <p>Others</p>} />
        }

        {!isPinned && !isOther &&
            <section className="notes" >
                <div className="empty-notes">Notes you add appear here</div>
            </section>
        }
    </main>
}
