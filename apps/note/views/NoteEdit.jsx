const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { noteService } from '../services/note.service.js'
// import { showErrorMsg } from '../services/event-bus.service.js'

export function NoteEdit() {

    const [note, setNote] = useState(
        { txt: '', title: '' }
    )

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
        setNote(prevNote => {
            console.log('prop', prop)
            console.log('name', name)
            const newInfo = { ...prevNote.info, [prop]: value }
            return { ...prevNote, info: newInfo }
        })
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
                <label htmlFor="title">Vendor</label>
                <input
                    onChange={handleChange} value={(note.info) ? note.info.title : note.title}
                    id="title" name="title"
                    type="text" placeholder="title" />

                <label htmlFor="txt">Speed</label>
                <input
                    onChange={handleChange} value={(note.info) ? note.info.txt : note.txt}
                    id="txt" name="txt"
                    type="text" placeholder="txt" />

                <button>Save</button>
            </form>
        </section>
    )
}