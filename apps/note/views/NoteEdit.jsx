const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { noteService } from '../services/note.service.js'
// import { showErrorMsg } from '../services/event-bus.service.js'

export function NoteEdit() {

    const [note, setNote] = useState('a' /*noteService.getEmptyNote()*/)

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
            })
    }, [])

    function onSave(ev) {
        ev.preventDefault()
        noteService.save(note)
            .then(() => navigate('/note'))
            .catch(() => {
                showErrorMsg('Couldnt save')
                navigate('/note')
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
        setNote(prevNote => ({ ...prevNote, [prop]: value }))
    }

    // * DEMO
    // function addNoteReview(review) {
    //     setNote(prevNote => ({
    //         ...prevNote,
    //         reviews: [...prevNote.reviews, review]
    //     }))
    // }

    return (
        <section className="note-edit">
            <h1>{params.noteId ? 'Edit note' : 'Add note'}</h1>

            <form onSubmit={onSave}>
                <label htmlFor="info.title">Vendor</label>
                <input
                    onChange={handleChange} value={note.info.title}
                    id="info.title" name="info.title"
                    type="text" placeholder="vendor" />

                <label htmlFor="info.txt">Speed</label>
                <input
                    onChange={handleChange} value={note.info.txt}
                    id="info.txt" name="info.txt"
                    type="text" placeholder="speed" />

                <button>Save</button>
            </form>
        </section>
    )
}