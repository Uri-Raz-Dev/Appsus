// import { storageService } from "../../../services/async-storage.service.js"
// import { utilService } from "../../../services/util.service.js"
const { Link, Outlet } = ReactRouterDOM

import { EmailList } from "../cmps/EmailList.jsx"
import { EmailFolderList } from "../cmps/EmailFolderList.jsx"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { mailService } from "../services/mail.service.js"
import { EmailIcons } from "../cmps/EmailIcons.jsx"
import { EmailCompose } from "../cmps/EmailCompose.jsx"
import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React



export function EmailIndex({ folder }) {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultEmailFilter())
    const [filterByFolders, setFilterByFolders] = useState(mailService.getDefaultFolderFilter())
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    useEffect(() => {
        const combinedFilter = { ...filterBy, ...filterByFolders, status: folder }
        mailService.query(combinedFilter).then(mails => setMails(mails))
    }, [filterBy, filterByFolders, folder, isComposeOpen])

    console.log(mails);
    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function onSetFilterByFolders(newFilter) {
        setFilterByFolders(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function removeMail(mailId) {
        setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
    }

    function onSendMail(mail) {
        setMails(prevMails => [mail, ...prevMails])
    }

    function openCompose() {
        setIsComposeOpen(true)
    }

    function closeCompose() {
        setIsComposeOpen(false)
    }

    return <section className="email-layout grid">
        < EmailFilter filterBy={filterBy} onFilter={onSetFilterBy} />
        <EmailFolderList filterByFolders={filterByFolders} onFilterFolders={onSetFilterByFolders} folder={folder} />
        {<EmailList mails={mails} folder={folder} removeMail={removeMail} />}
        <div className="compose-wrapper flex">
            <span className="compose-icon">{EmailIcons('compose')}</span>
            <Link replace to={`compose`}>
                <div onClick={openCompose} className="compose">Compose</div>
                {isComposeOpen && <EmailCompose onClose={closeCompose} onSendMail={onSendMail} />}
            </Link>
        </div>
        {/* <Outlet /> */}
    </section>
}

