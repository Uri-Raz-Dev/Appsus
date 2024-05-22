import { EmailPreview } from "./EmailPreview.jsx";
export function EmailList({ mails }) {

    return <ul className="mail-list flex">
        {mails.map(mail => (
            <EmailPreview key={mail.id} mail={mail} />
        ))}
    </ul>
}
