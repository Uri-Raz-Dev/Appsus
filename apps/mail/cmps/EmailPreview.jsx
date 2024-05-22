

import { mailService } from "../services/mail.service.js"
import { EmailIcons } from "./EmailIcons.jsx"
const { useState, useEffect, useRef } = React
export function EmailPreview({ mail }) {
    const { subject, body, from, sentAt, to, isRead, removedAt, id } = mail
    const [isReadState, setIsReadState] = useState(isRead)

    function toggleRead() {
        const newIsRead = !isReadState

        setIsReadState(newIsRead)
        updateReadStatusInStorage(id, newIsRead)
    }

    function updateReadStatusInStorage(mailId, isReadStatus) {
        mailService.get(mailId).then(email => {
            email.isRead = isReadStatus
            return mailService.save(email)
        }).catch(err => {
            console.error('Failed to update read status:', err)
        })
    }

    return <li onClick={toggleRead} className={isReadState ? "read" : "unread"}>
        {EmailIcons('starred')}
        <p className="mail-from">{from}</p>
        <p className="mail-body">{subject} - {body.slice(0, body.length / 5)}</p>

        <p className="mail-date">{sentAt}</p>
    </li>

}