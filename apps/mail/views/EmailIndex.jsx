// import { storageService } from "../../../services/async-storage.service.js"
// import { utilService } from "../../../services/util.service.js"
const { Link } = ReactRouterDOM

import { EmailList } from "../cmps/EmailList.jsx"
import { EmailFolderList } from "../cmps/EmailFolderList.jsx"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { mailService } from "../services/mail.service.js"
import { EmailIcons } from "../cmps/EmailIcons.jsx"
import { EmailCompose } from "../cmps/EmailCompose.jsx"

const { useState, useEffect } = React



export function EmailIndex({ folder }) {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultEmailFilter())
    const [filterByFolders, setFilterByFolders] = useState(mailService.getDefaultFolderFilter())
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [unreadInboxCount, setUnreadInboxCount] = useState('')

    useEffect(() => {
        const combinedFilter = { ...filterBy, ...filterByFolders, status: folder }
        mailService.query(combinedFilter).then(mails => {
            setMails(mails)
            if (folder === 'sent' || folder === 'trash' || folder === 'draft') setUnreadInboxCount(prevCount => setUnreadInboxCount(prevCount))
            setUnreadInboxCount(mails.filter(mail => mail.folder === 'inbox' && !mail.isRead).length)
        })
    }, [filterBy, filterByFolders, folder, isComposeOpen])


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

    function toggleReadStatus(mailId) {
        if (folder === 'sent' || folder === 'trash' || folder === 'draft') setUnreadInboxCount('')
        setMails(prevMails => {
            const updatedMails = prevMails.map(mail => {
                if (mail.id === mailId) {
                    mail.isRead = !mail.isRead
                }
                return mail
            })
            if (folder === 'sent' || folder === 'trash' || folder === 'draft') {
                setUnreadInboxCount(prevCount => setUnreadInboxCount(prevCount))
            }
            updateUnreadInboxCount(updatedMails)
            return updatedMails
        })
    }

    function updateUnreadInboxCount(mails) {


        const unreadMessages = mails.filter(mail => mail.folder === 'inbox' && !mail.isRead).length;
        setUnreadInboxCount(unreadMessages);
    }

    console.log(unreadInboxCount)
    return <section className="email-layout grid">
        <EmailFilter filterBy={filterBy} onFilter={onSetFilterBy} />
        <EmailFolderList filterByFolders={filterByFolders} onFilterFolders={onSetFilterByFolders} folder={folder} unreadInboxCount={unreadInboxCount} closeCompose={closeCompose} onSendMail={onSendMail} openCompose={openCompose}
            isComposeOpen={isComposeOpen} />
        <EmailList mails={mails} folder={folder} removeMail={removeMail} toggleReadStatus={toggleReadStatus} />

    </section>
}

