import { eventBusService } from "../../../services/event-bus.service.js"
const { useRef, useEffect } = React

export function TextArea({ note, onChange, placeHolder, isButton }) {
    const inputRef = useRef(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('focus', () => {
            if (inputRef.current) inputRef.current.focus()
        })
        return unsubscribe
    }, [])

    return <label >
        <textarea
            ref={inputRef}
            name={(isButton === 'image') ? 'url' : 'txt'}
            id="txt"
            cols='46'
            rows={note.info.txtLineCount + ''}
            wrap="hard"
            placeholder={placeHolder || "Note"}
            value={(isButton === 'image') ? note.info.url : note.info.txt}
            onChange={onChange}
        />
    </label>
}