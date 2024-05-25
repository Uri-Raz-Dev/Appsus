export function TextArea({ note, onChange }) {
    return <label >
        <textarea
            name='txt'
            id="txt"
            cols='46'
            rows={note.info.txtLineCount + ''}
            wrap="hard"
            placeholder="Note"
            value={note.info.txt}
            onChange={onChange}
        />
    </label>
}