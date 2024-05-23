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
    getDefaultEmailFilter,
    getDefaultFolderFilter
}



const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}


window.ms = mailService
function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => _filterList(filterBy, mails))
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


function getDefaultEmailFilter(filterBy = { txt: '', isRead: 0, date: 0, title: 0 }) {
    return {
        txt: filterBy.txt,
        isRead: filterBy.isRead,
        date: filterBy.sortByDate,
        title: filterBy.sortByTitle
    }
}

function getDefaultFolderFilter(filterBy = { isStarred: false, status: 'inbox', lables: [] }) {
    return {
        isStarred: filterBy.isStarred,
        status: filterBy.status,
        labels: filterBy.lables,
    }
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

function _filterList(filterBy, mails) {

    // EmailFilter

    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')

        mails = mails.filter(mail => {
            return regExp.test(mail.subject) ||
                regExp.test(mail.body) ||
                regExp.test(mail.from)
        })

    }

    if (filterBy.isRead === true) {

        mails = mails.filter(mail => mail.isRead === true);
    } else if (filterBy.isRead === false) {
        mails = mails.filter(mail => mail.isRead === false);
    }


    if (filterBy.sortByTitle) {
        if (filterBy.sortByTitle === 1) {
            return mails = mails.sort((mail1, mail2) => mail1.subject.localeCompare(mail2.subject))
        } else if (filterBy.sortByTitle === -1) {
            return mails = mails.sort((mail1, mail2) => mail2.subject.localeCompare(mail1.subject))
        } else {
            return mails
        }
    }


    if (filterBy.sortByDate) {
        mails = mails.sort((mail1, mail2) => {
            const date1 = new Date(mail1.sentAt);
            const date2 = new Date(mail2.sentAt);

            if (filterBy.sortByDate === 1) {
                return date2 - date1
            } else if (filterBy.sortByDate === -1) {
                return date1 - date2
            } else {
                return 0
            }
        })
    }

    // Folder List

    if (filterBy.isStarred) {
        mails = mails.filter((mail) => {
            mail.isStarred === true
        })

    }
    return mails
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
            // const date = new Date(`${year}-${utilService.padNum(month)}-${utilService.padNum(day)}`)
            const startDate = new Date('2020-01-01').getTime();
            const endDate = new Date('2024-12-31').getTime();
            const randomTimestamp = utilService.getRandomTimestamp(startDate, endDate);


            const email = {
                id: utilService.makeId(),
                subject: subject.charAt(0).toUpperCase() + subject.slice(1),
                body: body.charAt(0).toUpperCase() + body.slice(1),
                isRead: false,
                sentAt: randomTimestamp,
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