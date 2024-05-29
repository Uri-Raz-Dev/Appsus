
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
const { NavLink, Link } = ReactRouterDOM
import { EmailIcons } from "./EmailIcons.jsx";


export function EmailFolderList({ folder, unreadInboxCount, closeCompose, onSendMail, openCompose, isComposeOpen }) {
    return (
        <nav className="email-folder-list flex">
            <Link onClick={openCompose} className="compose-wrapper flex" to="compose">
                <span className="compose-icon">{EmailIcons('compose')}</span>
                <div className="compose">Compose</div>
            </Link>
            <Link replace to={''}>{isComposeOpen && <EmailCompose closeCompose={closeCompose} onSendMail={onSendMail} />}</Link>
            <ul className="links-wrapper">
                <li className={`${folder === 'inbox' ? 'active' : ''}`}>  <span className={`folder-icon`}>{EmailIcons('inbox')}</span><Link to="/mail/inbox">Inbox</Link><span>{unreadInboxCount}</span></li>

                <li className={`${folder === 'starred' ? 'active' : ''}`}> <span className={`folder-icon`}>{EmailIcons('starred')}</span><Link to="/mail/starred">Starred</Link></li>

                <li className={`${folder === 'sent' ? 'active' : ''}`}><span className={`folder-icon`}>{EmailIcons('sent')}</span><Link to="/mail/sent">Sent</Link></li>

                <li className={`${folder === 'draft' ? 'active' : ''}`}><span className={`folder-icon`}>{EmailIcons('draft')}</span> <Link to="/mail/draft">Draft</Link></li>

                <li className={`${folder === 'trash' ? 'active' : ''}`}><span className={`folder-icon`}>{EmailIcons('trash')}</span><Link to="/mail/trash">Trash</Link></li>
            </ul>
        </nav>
    );
}
