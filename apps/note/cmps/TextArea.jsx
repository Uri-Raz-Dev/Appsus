const { useState, useEffect } = React

export function TextArea({ note, onChange, lineBreakCount }) {
    return <label >
        <textarea
            name='txt'
            id="txt"
            cols='46'
            rows={lineBreakCount + ''}
            wrap="hard"
            placeholder="Note"
            value={(note.info) ? note.info.txt : note.txt}
            onChange={onChange}
        />
    </label>
}