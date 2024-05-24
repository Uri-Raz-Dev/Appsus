import { EmailPreview } from "./EmailPreview.jsx";
export function EmailList({ mails, folder }) {
    const mailInfo = mails.map(mail => mail)

    return <ul className="mail-list flex">

        {mails.map(mail => (
            mail.folder === 'inbox' && folder === 'inbox' && <EmailPreview key={mail.id} mail={mail} /> ||
            mail.folder === 'sent' && folder === 'sent' && <EmailPreview key={mail.id} mail={mail} /> ||
            mail.isStarred && folder === 'starred' && <EmailPreview key={mail.id} mail={mail} />


        ))}
    </ul>
}
