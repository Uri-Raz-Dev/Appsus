import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

export function NewNote({ notes, makeNewNotes }) {
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    // const [newNotes, setNewNotes] = useState(notes)

    // useEffect((newNotes) => {
    //     console.log('newNotes', newNotes)
    //     // makeNewNotes(newNotes)
    // }, [newNotes])

    // useEffect(() => {
    //     console.log('newNotes', newNotes)
    //     // makeNewNotes(newNotes)
    //     setNewNotes(notes)
    // }, [])


    // useEffect(() => {
    //     // console.log('newNotes', newNotes)
    //     // makeNewNotes(newNotes)
    //     makeNewNotes(newNote)
    // }, [newNote])

    function onSave(ev) {
        ev.preventDefault()
        // eventBusService.emit('save', note)
        noteService.save(newNote)
            .then(makeNewNotes)
            // .then(note => {
            //     console.log('note', note)
            //     setNewNote(note)
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
        <section className="note-edit">
            {/* <h1>{params.noteId ? 'Edit note' : 'Add note'}</h1> */}

            <form onSubmit={onSave}>
                <label htmlFor="title"></label>
                <input
                    onChange={handleChange} value={newNote.info.title}
                    id="title" name="title"
                    type="text" placeholder="title" />

                <label htmlFor="txt"></label>
                <textarea
                    name='txt'
                    id="txt"
                    cols='46'
                    rows='10'
                    wrap="hard"
                    placeholder="Text"
                    value={newNote.info.title}
                    onChange={handleChange}
                ></textarea>
                {/* 
                <label htmlFor="txt">Speed</label>
                <input
                    onChange={handleChange} value={(note.info) ? note.info.txt : note.txt}
                    id="txt" name="txt"
                    type="text" placeholder="txt" /> */}

                <button>Save</button>
            </form>
        </section>
    )
}

// export function NoteEdit() {

//     const [note, setNote] = useState(
//         { txt: '', title: '' }
//     )

//     const params = useParams()
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (!params.noteId) {
//             console.log('No node id')
//             return
//         }
//         noteService.get(params.noteId)
//             .then(note => {
//                 console.log('note', note)
//                 setNote(note)
//             })
//     }, [])

//     function onSave(ev) {
//         ev.preventDefault()
//         eventBusService.emit('save', note)
//         noteService.save(note)
//             .then(() => navigate('/note'))
//             .catch(() => {
//                 showErrorMsg('Couldnt save')
//                 navigate('/note')
//             })
//     }

//     function handleChange({ target }) {
//         const { type, name: prop } = target
//         let { value } = target

//         switch (type) {
//             case 'range':
//             case 'number':
//                 value = +value
//                 break;

//             case 'checkbox':
//                 value = target.checked
//                 break;
//         }
//         setNote(prevNote => {
//             console.log('prop', prop)
//             console.log('name', name)
//             const newInfo = { ...prevNote.info, [prop]: value }
//             return { ...prevNote, info: newInfo }
//         })
//     }

//     // * DEMO
//     // function addNoteReview(review) {
//     //     setNote(prevNote => ({
//     //         ...prevNote,
//     //         reviews: [...prevNote.reviews, review]
//     //     }))
//     // }

//     return (
//         <section className="note-edit">
//             <h1>{params.noteId ? 'Edit note' : 'Add note'}</h1>

//             <form onSubmit={onSave}>
//                 <label htmlFor="title"></label>
//                 <input
//                     onChange={handleChange} value={(note.info) ? note.info.title : note.title}
//                     id="title" name="title"
//                     type="text" placeholder="title" />

//                 <label htmlFor="txt"></label>
//                 <textarea
//                     name='txt'
//                     id="txt"
//                     cols='46'
//                     rows='10'
//                     wrap="hard"
//                     placeholder="Text"
//                     value={(note.info) ? note.info.txt : note.txt}
//                     onChange={handleChange}
//                 ></textarea>
//                 {/*
//                 <label htmlFor="txt">Speed</label>
//                 <input
//                     onChange={handleChange} value={(note.info) ? note.info.txt : note.txt}
//                     id="txt" name="txt"
//                     type="text" placeholder="txt" /> */}

//                 <button>Save</button>
//             </form>
//         </section>
//     )
// }