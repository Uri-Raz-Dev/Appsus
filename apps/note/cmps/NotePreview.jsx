
export function NotePreview({ note }) {
    return (<section className="content">
        {(note.info.title) && <h3>{note.info.title}</h3>}
        <p >{(note.info.txt) ? note.info.txt : ''}</p>
    </section>
    )
}