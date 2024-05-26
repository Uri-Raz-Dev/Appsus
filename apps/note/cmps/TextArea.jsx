import { eventBusService } from "../../../services/event-bus.service.js"
const { useRef, useEffect } = React

export function TextArea({ note, onChange, placeHolder }) {
    const inputRef = useRef(null)
    // useEffect(() => {
    eventBusService.on('focus', () => {
        if (inputRef.current) inputRef.current.focus()
    })
    // }, [])

    return <label >
        <textarea
            ref={inputRef}
            name='txt'
            id="txt"
            cols='46'
            rows={note.info.txtLineCount + ''}
            wrap="hard"
            placeholder={placeHolder || "Note"}
            value={note.info.txt}
            onChange={onChange}
        />
    </label>
}