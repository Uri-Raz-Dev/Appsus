
export function NotePreview({ note }) {
    // const {noteType} = note
    return (<section className="content">
        {(note.info.title) && <h3>{note.info.title}</h3>}
        <p >{(note.info.txt) ? note.info.txt : 'Empty note'}</p>
    </section>
    )
}