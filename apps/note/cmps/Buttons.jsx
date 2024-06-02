import { eventBusService } from "../../../services/event-bus.service.js"

import { Icons } from "./Icons.jsx"

const { useNavigate } = ReactRouter

export function NoteButtons({ note, onRemove }) {
    const navigate = useNavigate()

    return (
        <section className="note-buttons">

            <button onClick={(ev) => {
                ev.preventDefault()
                onRemove(note.id)
            }}>
                <Icons type='trash' />
            </button>

            {(note.info.txt || note.info.title) && note.type === 'NoteTxt' &&

                <button onClick={(ev) => {
                    ev.preventDefault()
                    navigate(`/mail/inbox/compose/`)
                }}>
                    <Icons type='mail' />
                </button>
            }

        </section>
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
                eventBusService.emit('savePin', { ...note, isPinned: !note.isPinned })
            }}>
                <Icons type={(note.isPinned) ? 'pinChecked' : 'pin'} />
            </button>
        </section>
    )
}