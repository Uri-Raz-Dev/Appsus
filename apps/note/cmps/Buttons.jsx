import { eventBusService } from "../../../services/event-bus.service.js"

import { Icons } from "./Icons.jsx"
import { ColorsMenu } from "./ColorsMenu.jsx"

const { useNavigate } = ReactRouter
const { useState } = React

export function NoteButtons({ setNewNote, note, onRemove }) {
    const navigate = useNavigate()
    const [isColors, setIsColors] = useState(false)

    return (
        <section className="note-buttons">

            <button onClick={(ev) => {
                ev.preventDefault()
                onRemove(note.id)
            }}>
                <Icons type='trash' />
            </button>

            {/* {(note.info.txt || note.info.title) && note.type === 'NoteTxt' &&

                <button onClick={(ev) => {
                    ev.preventDefault()
                    navigate(`/mail/inbox/compose/`)
                }}>
                    <Icons type='mail' />
                </button>
            } */}

            <button onClick={(ev) => {
                ev.preventDefault()
                setIsColors(!isColors)
            }}>
                <Icons type='palette' />
            </button>
            {isColors && <ColorsMenu note={note} isColors={isColors} setIsColors={setIsColors} setNewNote={setNewNote} />
            }        </section>
    )
}

export function AddButtons({ setNewNote, isOpen, setIsButton }) {
    return (
        <section className="add-buttons" style={{ display: (isOpen) ? "none" : "flex" }}>

            <button onClick={() => {
                eventBusService.emit('todo', true)
            }}>
                <Icons type='boxChecked' />
            </button>

            <button onClick={(ev) => {
                ev.preventDefault()
                setIsButton('image')
                setNewNote(note => ({ ...note, type: 'NoteImg' }))
            }}>
                <Icons type='image' />
            </button>

        </section >
    )
}

export function Pin({ note }) {
    return (
        <section className="pin" >
            <button onClick={(ev) => {
                ev.preventDefault()
                eventBusService.emit('save', { ...note, isPinned: !note.isPinned })
            }}>
                <Icons type={(note.isPinned) ? 'pinChecked' : 'pin'} />
            </button>
        </section>
    )
}