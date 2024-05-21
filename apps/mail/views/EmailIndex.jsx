// import { storageService } from "../../../services/async-storage.service.js"
// import { utilService } from "../../../services/util.service.js"
import { EmailList } from "../cmps/EmailList.jsx"
import { SideFilter } from "../cmps/SideFilter.jsx"
import { TopFilter } from "../cmps/TopFilter.jsx"
import { mailService } from "../services/mail.service.js"
const { useState, useEffect, useRef } = React



export function EmailIndex() {

    const [mails, setMails] = useState([])

    useEffect(() => {
        mailService.query()
            .then(mails => setMails(mails))
    }, [])





    return <section className="email-layout grid">
        <TopFilter />
        <SideFilter />
        <EmailList mails={mails} />

    </section>
}

