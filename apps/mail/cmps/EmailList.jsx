import { EmailPreview } from "./EmailPreview.jsx"
export function EmailList({ mails, folder }) {

    return <ul className="mail-list flex">

        {mails.map(mail => (
            mail.folder === 'inbox' && folder === 'inbox' &&
            <EmailPreview key={mail.id} mail={mail} folder={folder} /> ||
            mail.folder === 'sent' && folder === 'sent' && <EmailPreview key={mail.id} mail={mail} folder={folder} /> ||
            mail.isStarred && folder === 'starred' && <EmailPreview key={mail.id} mail={mail} folder={folder} /> ||
            mail.isDraft && folder === 'draft' && <EmailPreview key={mail.id} mail={mail} folder={folder} /> ||
            mail.removedAt && folder === 'trash' && <EmailPreview key={mail.id} mail={mail} folder={folder} />


        ))}
    </ul>
}
