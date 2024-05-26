import { EmailPreview } from "./EmailPreview.jsx"
export function EmailList({ mails, folder, removeMail }) {

    return (
        <ul className="mail-list flex">
            {mails.map(mail => (
                (mail.folder === folder || (folder === 'starred' && mail.isStarred) || (folder === 'draft' && mail.isDraft) || (folder === 'trash' && mail.folder === 'trash')) &&
                <EmailPreview key={mail.id} mail={mail} folder={folder} removeMail={removeMail} />
            ))}
        </ul>
    )
}
