
const { Link } = ReactRouterDOM
import { EmailIcons } from "./EmailIcons.jsx"
import { EmailCompose } from "./EmailCompose.jsx"

export function EmailFolderList({ folder, unreadInboxCount, closeCompose,
    onSendMail, openCompose, isComposeOpen, isCollapse, toggleCollapse
}) {
    console.log(isCollapse);
    return (
        <nav className={isCollapse ? "email-folder-list flex collapse" : "email-folder-list flex"}>
            <span className="hambar" onClick={() => toggleCollapse()}>☰</span>
            <Link onClick={openCompose} className="compose-wrapper flex" to="compose">
                <span className="compose-icon">{EmailIcons('compose')}</span>
                {!isCollapse && <div className="compose folderName">Compose</div>}
            </Link>
            <Link replace to={''}>{isComposeOpen && <EmailCompose closeCompose={closeCompose} onSendMail={onSendMail} />}</Link>

            <ul className="links-wrapper">
                <li className={`${folder === 'inbox' ? 'active' : ''}`}>
                    <Link to="/mail/inbox" className={`folder-icon`}>{EmailIcons('inbox')}</Link>
                    {!isCollapse && <Link className="folderName" to="/mail/inbox">Inbox</Link>}
                    {!isCollapse && <span className="folderName">{unreadInboxCount}</span>}
                </li>

                <li className={`${folder === 'starred' ? 'active' : ''}`}>
                    <Link to="/mail/starred" className={`folder-icon`}>{EmailIcons('starred')}</Link>
                    {!isCollapse && <Link className="folderName" to="/mail/starred">Starred</Link>}
                </li>

                <li className={`${folder === 'sent' ? 'active' : ''}`}>
                    <Link to="/mail/sent" className={`folder-icon`}>{EmailIcons('sent')}</Link>
                    {!isCollapse && <Link className="folderName" to="/mail/sent">Sent</Link>}
                </li>

                <li className={`${folder === 'draft' ? 'active' : ''}`}>
                    <Link to="/mail/draft" className={`folder-icon`}>{EmailIcons('draft')}</Link>
                    {!isCollapse && <Link className="folderName" to="/mail/draft">Draft</Link>}
                </li>

                <li className={`${folder === 'trash' ? 'active' : ''}`}>
                    <Link to="/mail/trash" className={`folder-icon`}>{EmailIcons('trash')}</Link>
                    {!isCollapse && <Link className="folderName" to="/mail/trash">Trash</Link>}
                </li>
            </ul>
        </nav>
    )
}