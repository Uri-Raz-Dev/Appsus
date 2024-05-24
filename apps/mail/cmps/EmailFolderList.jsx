
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
const { NavLink, Link } = ReactRouterDOM



export function EmailFolderList() {
    return (
        <nav className="email-folder-list">
            <ul>
                <li><Link to="/mail/inbox">Inbox</Link></li>
                <li><Link to="/mail/starred">Starred</Link></li>
                <li><Link to="/mail/sent">Sent</Link></li>
                <li><Link to="/mail/draft">Draft</Link></li>
                <li><Link to="/mail/trash">Trash</Link></li>
            </ul>
        </nav>
    );
}
