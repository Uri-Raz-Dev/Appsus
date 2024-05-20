
const { useState, useEffect, useRef } = React
const inbox = <box-icon type='solid' name='inbox'></box-icon>
const starred = <box-icon name='star' ></box-icon>
const sent = <box-icon name='send'></box-icon>
const drafts = <box-icon name='file-blank'></box-icon>
const trash = <box-icon name='trash' ></box-icon>
const emailNav = [inbox, starred, sent, drafts, trash]

export function EmailIndex() {

    return <div className="email">mail app
        {emailNav}
    </div>
}
