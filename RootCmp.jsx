const { Route, Routes, Navigate } = ReactRouterDOM

const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { EmailIndex } from "./apps/mail/views/EmailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { NoteEdit } from "./apps/note/views/NoteEdit.jsx"
import { EmailCompose } from "./apps/mail/cmps/EmailCompose.jsx"
import { EmailDetails } from "./apps/mail/views/EmailDetails.jsx"

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
                <Route path="/mail">
                    {Object.keys(mailFolders).map((folder) => (
                        <Route key={folder} path={folder} element={<EmailIndex folder={mailFolders[folder]} />}>
                            <Route path="compose" element={<EmailCompose />} />
                        </Route>
                    ))}
                </Route>

                <Route path="/mail/:folder/:mailId" element={<EmailDetails />} />


                <Route path="/note" element={<NoteIndex />} >
                    {/* <Route path="/note/edit/" element={<NoteEdit />} /> */}
                    <Route path="/note/edit/:noteId" element={<NoteEdit />} />
                </Route>
            </Routes>
        </section>
    </Router>
}

// function MailRoutes() {
//     return (
//         <Routes>
//             <Route path="inbox/*" element={<MailFolderRoutes folder={mailFolders.inbox} />} />
//             <Route path="sent/*" element={<MailFolderRoutes folder={mailFolders.sent} />} />
//             <Route path="starred/*" element={<MailFolderRoutes folder={mailFolders.starred} />} />
//             <Route path="draft/*" element={<MailFolderRoutes folder={mailFolders.draft} />} />
//             <Route path="trash/*" element={<MailFolderRoutes folder={mailFolders.trash} />} />
//         </Routes>
//     );
// }

// function MailFolderRoutes({ folder }) {
//     return (
//         <>
//             <EmailIndex folder={folder} />
//             <Outlet />
//         </>
//     )
// }

// function ComposeMailRoute() {
//     return (
//         <Routes>
//             <Route path="compose" element={<E />} />
//         </Routes>
//     )
// }