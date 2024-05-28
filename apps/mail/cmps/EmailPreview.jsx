import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { EmailIcons } from "./EmailIcons.jsx"
const { useState, useEffect, useRef } = React
export function EmailPreview({ mail, folder, removeMail }) {
    const { subject, body, from, sentAt, to, isRead, removedAt, isStarred, id } = mail
    const [isReadState, setIsReadState] = useState(isRead)
    const [isStarredState, setIsStarredState] = useState(isStarred)
    const [remove, setRemove] = useState(removedAt)
    // const [mailFolder, setMailFolder] = useState(mail.folder)
    // useEffect(() => {
    //     mailService.get(id)
    //         .then((email) => {

    //         })
    // }, [])

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
    function removeMailByFilter(ev) {
        ev.stopPropagation()
        const currentTime = Date.now()

        mailService.get(id).then(email => {
            if (email.folder === 'trash') {
                return mailService.remove(id).then(() => {
                    removeMail(id)
                    setRemove(null)
                })
            } else {

                email.removedAt = currentTime
                email.folder = 'trash'
                email.isStarred = false
                return mailService.save(email).then(() => {
                    removeMail(id)
                    setRemove(currentTime)
                })
            }
        }).catch(err => {
            console.error('Failed to remove mail:', err)
        })
    }
    // onClick = { toggleRead } 
    return <li className={isReadState ? "read" : "unread"}>
        {folder !== 'trash' ? <span onClick={toggleStar}>{isStarredState ? EmailIcons('starFav') : EmailIcons('starred')}</span> : ''}
        {mail.folder === 'inbox' ? <p className="mail-from">{from}</p> : <p className="mail-from">To: {to}</p>}
        <p className="mail-body">{subject} - {body.slice(0, body.length / 5)}</p>

        <span onClick={removeMailByFilter}>{EmailIcons('trash')}</span>
        {folder !== 'trash' ? <p className="mail-date">{utilService.getFormattedTimestamp(sentAt)}</p> : <p className="mail-date">{utilService.getFormattedTimestamp(removedAt)}</p>}
    </li>

}