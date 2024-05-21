// import { storageService } from "../../../services/async-storage.service.js"
// import { utilService } from "../../../services/util.service.js"
import { EmailList } from "../cmps/EmailList.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect, useRef } = React

const inbox = <box-icon type='solid' name='inbox'></box-icon>
const starred = <box-icon name='star' ></box-icon>
const starFav = <box-icon name='star' type='solid' color='#f4b400' ></box-icon>
const sent = <box-icon name='send'></box-icon>
const drafts = <box-icon name='file-blank'></box-icon>
const trash = <box-icon name='trash' ></box-icon>
const compose = <box-icon name='pencil' ></box-icon>
const arrow = <box-icon name='chevron-up' ></box-icon>


const emailNav = [inbox, starred, sent, drafts, trash]

export function EmailIndex() {

    const [mails, setMails] = useState([])

    useEffect(() => {
        mailService.query()
            .then(mails => setMails(mails))
    }, [])





    return <section className="email-layout grid">
        <EmailList mails={mails} />

    </section>
}
// console.log(mailService.email)