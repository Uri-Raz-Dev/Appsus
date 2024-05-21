// mail service

import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"


const MAIL_KEY = 'mailDB'
_createMails()


export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
}


export const email = {
    id: utilService.makeId,
    subject: utilService.makeLorem(4).charAt(0).toUpperCase().slice(1),
    body: utilService.makeLorem(5).charAt(0).toUpperCase().slice(1),
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}


window.ms = mailService
function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')

                mails = mails.filter(mail => regExp.test(mail.title))

            }

            if (filterBy.price) {
                mails = mails.filter((mail) => {
                    const { listPrice: { amount } } = mail
                    const mailPrice = parseFloat(amount)
                    return mailPrice <= filterBy.price
                })

            }
            if (filterBy.date) {
                mails = mails.filter((mail) => {
                    const { publishedDate } = mail
                    const mailDate = parseFloat(publishedDate)
                    return mailDate <= filterBy.date
                })

            }

            if (filterBy.authors) {
                const regExp = new RegExp(filterBy.authors, 'i')

                mails = mails.filter(mail => regExp.test(mail.authors))
            }
            return mails
        })
}




function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail = _setNextPrevMailId(mail)
            return mail
        })
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}


function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}


function getDefaultFilter(filterBy = { title: '', price: 0, date: 0, authors: '' }) {
    return {
        title: filterBy.title, price: filterBy.price,
        date: filterBy.date, authors: filterBy.authors
    }
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        returnmail
    })
}

function _createMails() {
    let mailList = utilService.loadFromStorage(MAIL_KEY)

    if (!mailList || mailList.length === 0) {
        mailList = []
        for (let i = 0; i < 10; i++) {
            const subject = utilService.makeLorem(4)
            const body = utilService.makeLorem(30)
            const year = utilService.getRandomIntInclusive(2020, 2024)
            const month = utilService.getRandomIntInclusive(1, 12)
            const day = utilService.getRandomIntInclusive(1, 30)
            const date = new Date(`${year}-${utilService.padNum(month)}-${utilService.padNum(day)}`)

            const email = {
                id: utilService.makeId(),
                subject: subject.charAt(0).toUpperCase() + subject.slice(1),
                body: body.charAt(0).toUpperCase() + body.slice(1),
                isRead: false,
                sentAt: utilService.getFormattedDate(date, 'en-US'),
                removedAt: null,
                from: `${utilService.makeName(4).toLowerCase()}@${utilService.makeName(5).toLowerCase()}.com`,
                to: 'user@appsus.com'
            }
            mailList.push(email)
            utilService.saveToStorage(MAIL_KEY, mailList)
        }
        console.log('mails', mailList)
    }
}