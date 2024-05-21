

export function EmailPreview({ mail }) {
    const { subject, body, from, sentAt, to, isRead, removedAt } = mail
    return <li>
        <p>{from}</p>
        <p>{subject}</p>
        <p> {body.slice(0, body.length / 5)}</p>
        <p>{sentAt}</p>
    </li>

}