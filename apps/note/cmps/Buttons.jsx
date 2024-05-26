import { Icons } from "./Icons.jsx";

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