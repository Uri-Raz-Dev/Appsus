import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"

export function ColorsMenu({ note, setIsColors, setNewNote }) {
    const colors = [
        '#FFFFFF',
        '#FAAFA8',
        '#F39F76',
        '#FFF8B8',
        '#E2F6D3',
        '#B4DDD3',
        '#D4E4ED',
        '#AECCDC',
        '#D3BFDB',
        '#F6E2DD',
        '#E9E3D4',
        '#EFEFF1',
    ]

    function onSetColor(ev, color) {
        ev.preventDefault()

        setIsColors(false)

        const newStyle = { backgroundColor: color }
        const newNote = { ...note, style: newStyle }

        setNewNote(newNote)

        eventBusService.emit('save', newNote)

        noteService.save(newNote)
    }

    return (
        <section className="color-input" onClick={(ev) => ev.preventDefault()}
        >
            <div className="items-container">
                {colors.map(color => (
                    <div
                        key={color}
                        // className={`item ${backgroundColor === color ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={(ev) => onSetColor(ev, color)}
                    >
                    </div>
                ))}
            </div>
        </section >
    )
}