const { Route, Routes, Navigate } = ReactRouterDOM

const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { EmailIndex } from "./apps/mail/views/EmailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"

const mailFolders = {
    inbox: 'inbox',
    sent: 'sent',
    starred: 'starred',
}

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail/inbox" element={<EmailIndex folder={mailFolders.inbox} />} />
                <Route path="/mail/sent" element={<EmailIndex folder={mailFolders.sent} />} />
                <Route path="/mail/starred" element={<EmailIndex folder={mailFolders.starred} />} />
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
        </section>
    </Router>
}
