import { noteService } from "../services/note.service.js"


import { NoteList } from "../cmps/NoteList.jsx"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        // setSearchParams(filterBy)
        // setNotes(prevNotes => {
        //     console.log('notesFromService', notesFromService)
        //     notesFromService
        // })
        noteService.query(/*filterBy*/)
            .then(setNotes)
    }, [/*filterBy*/])

    return <main className="note-index">
        {/* <CreateNote /> */}
        {/* <div className="create">Take a note</div> */}
        note app
        <NoteList notes={notes} />
    </main>
}
