const { Link, NavLink } = ReactRouterDOM
import { EmailIcons } from "../apps/mail/cmps/EmailIcons.jsx"
export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3 className="logo">Appsus</h3>
        </Link>
        <nav className="main-header">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail/inbox">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
