const { Route, Routes, Navigate } = ReactRouterDOM

const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { EmailIndex } from "./apps/mail/views/EmailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { NoteEdit } from "./apps/note/views/NoteEdit.jsx"

const mailFolders = {
    inbox: 'inbox',
    sent: 'sent',
    starred: 'starred',
    draft: 'draft',
    trash: 'trash'
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
                <Route path="/mail/draft" element={<EmailIndex folder={mailFolders.draft} />} />
                <Route path="/mail/trash" element={<EmailIndex folder={mailFolders.trash} />} />
                <Route path="/note" element={<NoteIndex />} >
                    {/* <Route path="/note/edit/" element={<NoteEdit />} /> */}
                    <Route path="/note/edit/:noteId" element={<NoteEdit />} />
                </Route>
            </Routes>
        </section>
    </Router>
}
