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



const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}


window.ms = mailService
function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')

                mails = mails.filter(mail => {
                    return regExp.test(mail.subject) ||
                        regExp.test(mail.body) ||
                        regExp.test(mail.from)
                })

            }

            if (filterBy.isRead) {
                mails = mails.filter((mail) => {
                    mail.isRead === true
                })
                if (filterBy.isStared) {
                    mails = mails.filter((mail) => {
                        mail.isStared === true
                    })

                }



                if (filterBy.sortByDate) {
                    mails = mails.sort((mail1, mail2) => {
                        const date1 = new Date(mail1.sentAt)
                        const date2 = new Date(mail2.sentAt)
                        return filterBy.sortByDate === 'newest' ? date2 - date1 : date1 - date2;
                    })
                }
                if (filterBy.sortByTitle) {
                    mails = mails.sort((mail1, mail2) => mail1.subject.localeCompare(mail2.subject))
                }
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


function getDefaultFilter(filterBy = { txt: '', isRead: false, date: null, isStared: false, status: 'inbox', lables: [], title: '' }) {
    return {
        txt: filterBy.txt,
        isRead: filterBy.isRead,
        isStared: filterBy.isStared,
        status: filterBy.status,
        labels: filterBy.lables,
        date: filterBy.sortByDate,
        title: filterBy.sortByTitle
    }
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail // Corrected return statement
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