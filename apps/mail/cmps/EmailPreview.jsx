

import { EmailIcons } from "./EmailIcons.jsx"

export function EmailPreview({ mail }) {
    const { subject, body, from, sentAt, to, isRead, removedAt } = mail
    return <li>
        {EmailIcons('starred')}
        <p className="mail-from">{from}</p>
        <p className="mail-body">{subject} - {body.slice(0, body.length / 5)}</p>

        <p className="mail-date">{sentAt}</p>
    </li>

}