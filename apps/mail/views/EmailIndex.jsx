// import { storageService } from "../../../services/async-storage.service.js"
// import { utilService } from "../../../services/util.service.js"
import { EmailList } from "../cmps/EmailList.jsx"
import { EmailFolderList } from "../cmps/EmailFolderList.jsx"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { mailService } from "../services/mail.service.js"
const { useState, useEffect, useRef } = React



export function EmailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())


    useEffect(() => {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
    }, [filterBy])


    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }


    return <section className="email-layout grid">
        < EmailFilter filterBy={filterBy} onFilter={onSetFilterBy}
        />
        <EmailFolderList />
        <EmailList mails={mails} />

    </section>
}

