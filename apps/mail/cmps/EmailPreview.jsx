import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { EmailIcons } from "./EmailIcons.jsx"
const { useState, useEffect, useRef } = React
export function EmailPreview({ mail }) {
    const { subject, body, from, sentAt, to, isRead, removedAt, isStarred, id } = mail
    const [isReadState, setIsReadState] = useState(isRead)
    const [isStarredState, setIsStarredState] = useState(isStarred)

    function toggleRead() {
        const newIsRead = !isReadState

        setIsReadState(newIsRead)
        updateReadStatusInStorage(id, newIsRead)
    }
    function toggleStar(ev) {
        ev.stopPropagation()
        const newIsStarred = !isStarredState

        setIsStarredState(newIsStarred)
        updateStarredStatusInStorage(id, newIsStarred)
    }

    function updateReadStatusInStorage(mailId, isReadStatus) {
        mailService.get(mailId).then(email => {
            email.isRead = isReadStatus
            return mailService.save(email)
        }).catch(err => {
            console.error('Failed to update read status:', err)
        })
    }
    function updateStarredStatusInStorage(mailId, isStarredStatus) {
        mailService.get(mailId).then(email => {
            email.isStarred = isStarredStatus
            return mailService.save(email)
        }).catch(err => {
            console.error('Failed to update star status:', err)
        })
    }

    return <li onClick={toggleRead} className={isReadState ? "read" : "unread"}>
        <span onClick={toggleStar}>{isStarredState ? EmailIcons('starFav') : EmailIcons('starred')}</span>
        <p className="mail-from">{from}</p>
        <p className="mail-body">{subject} - {body.slice(0, body.length / 5)}</p>

        <p className="mail-date">{utilService.getFormattedTimestamp(sentAt)}</p>
    </li>

}