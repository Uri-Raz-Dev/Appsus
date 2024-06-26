const { Link, NavLink, useLocation } = ReactRouterDOM
const { useState } = React
import { EmailIcons } from "../apps/mail/cmps/EmailIcons.jsx"

export function AppHeader() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const location = useLocation()
    const toggleDropdown = () => {
        setIsDropdownOpen(isMenuOpen => !isMenuOpen)
    }


    function dynamicLogo() {
        if (location.pathname === '/' || location.pathname === '/about') {
            return <h3>Appsus</h3>

        } else if (location.pathname.startsWith('/mail/')) {
            return <img className="gmail-logo" src="assets/css/imgs/gmail-logo.png" alt="gmail icon" />

        } else if (location.pathname.startsWith('/note')) {
            return <img className="keep-logo" src="assets/css/imgs/keep-logo.png" alt="keep icon" />

        }

    }


    return (
        <header className="app-header"
            style={{ backgroundColor: location.pathname === '/note' ? '#FFFFFF' : '#F6F8FC' }}>
            <Link to="/" className="logo">
                {dynamicLogo()}
            </Link>
            <nav className="main-header">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <div className="dropdown">
                    <span className="material-symbols-outlined" onClick={toggleDropdown}>
                        apps
                    </span>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <NavLink to="/mail/inbox" onClick={() => setIsDropdownOpen(false)}>
                                <img className="app-icon" src="assets/css/imgs/gmail.png" alt="gmail icon" />
                            </NavLink>
                            <NavLink to="/note" onClick={() => setIsDropdownOpen(false)}>
                                <img className="app-icon" src="assets/css/imgs/keep-icon.png" alt="gmail icon" /></NavLink>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}


