

export function EmailPreview({ mail }) {
    const { subject, body, from, sentAt, to, isRead, removedAt } = mail
    return <li>
        <p>{from}</p>
        <p>{body.slice(body.length / 5)}</p>
        <p>{subject}</p>
        <p>{sentAt}</p>
    </li>

}