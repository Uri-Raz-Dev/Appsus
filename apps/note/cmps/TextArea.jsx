const { useState, useEffect, useRef } = React
import { noteService } from '../services/note.service.js'

export function TextArea({ note, onChange, lineBreakCount }) {
    // const [lineBreaks, setlineBreaks] = useState(1)
    // const lineBreaks = useRef((note.id) ? noteService.get(note.id).txtLineCount : 1)
    // if (lineBreakCount > 1) {
    //     console.log('lineBreakCount', lineBreakCount)
    //     // lineBreaks.current = lineBreaks.current + 1
    //     setlineBreaks(lineBreaks + 1)
    //     noteService.save(note)
    // }

    // useEffect(() => {
    //     console.log('note', note)
    //     console.log('rerendering', (note.info) ? noteService.get(note.id).then(item => item.info.txtLineCount) : 1)
    // }, [])

    return <label >
        <textarea
            name='txt'
            id="txt"
            cols='46'
            // rows='4'
            rows={/*(note.info) ?*/ note.info.txtLineCount /* : 1*/ + ''}
            wrap="hard"
            placeholder="Note"
            value={(note.info) ? note.info.txt : note.txt}
            onChange={onChange}
        />
    </label>
}