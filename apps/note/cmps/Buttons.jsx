import { eventBusService } from "../../../services/event-bus.service.js"

import { Icons } from "./Icons.jsx"

export function Buttons({ note, onRemove }) {
    return <section className="note-buttons">
        <button onClick={(ev) => {
            ev.preventDefault()
            onRemove(note.id)
        }}>
            <Icons type='trash' />
        </button>
    </section>
}

export function AddButtons({ note, onClick, isOpen }) {
    return <section className="add-buttons" style={/*isOpen &&*/ { display: isOpen && "none" }}>
        <button onClick={(ev) => {
            ev.preventDefault()
            // onRemove(note.id)
        }}>
            <Icons type='image' />
        </button>
    </section>
}

export function Pin({ note }) {
    return <section className="pin" >
        <button onClick={(ev) => {
            ev.preventDefault()
            eventBusService.emit('save', { ...note, isPinned: !note.isPinned })
        }}>
            <Icons type={(note.isPinned) ? 'pinChecked' : 'pin'} />
        </button>
    </section>
}