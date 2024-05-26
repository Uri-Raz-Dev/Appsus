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

function getDefaultFolderFilter(filterBy = { isStarred: 0, status: 'inbox', labels: [] }) {
    return {
        isStarred: filterBy.isStarred,
        status: filterBy.status,
        labels: filterBy.labels,
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

        mails = mails.filter(mail => mail.isRead === true)
    } else if (filterBy.isRead === false) {
        mails = mails.filter(mail => mail.isRead === false)
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

    // Folder List Filter

    if (filterBy.isStarred === true) {

        mails = mails.filter(mail => mail.isStarred === true)
    } else if (filterBy.isStarred === false) {
        mails = mails.filter(mail => mail.isStarred === false)
    }

    if (filterBy.status) {
        switch (filterBy.status) {
            case 'inbox':
                mails = mails.filter(mail => mail.folder === 'inbox')
                break
            case 'sent':
                mails = mails.filter(mail => mail.folder === 'sent')
                break
            case 'trash':
                mails = mails.filter(mail => mail.folder === 'trash')
                break
            case 'draft':
                mails = mails.filter(mail => mail.folder === 'draft')
                break

            default:
                break
        }
    }

    return mails
}

function _createMails() {
    let mailList = utilService.loadFromStorage(MAIL_KEY)

    if (!mailList || mailList.length === 0) {
        mailList = []
        for (let i = 0; i < 30; i++) {
            const subject = utilService.makeLorem(4)
            const body = utilService.makeLorem(30)
            const startDate = new Date('2020-01-01').getTime()
            const endDate = new Date('2024-12-31').getTime()
            const randomTimestamp = utilService.getRandomTimestamp(startDate, endDate)
            const mailTo = Math.random() >= 0.5 ? `${utilService.makeName(4).toLowerCase()}@${utilService.makeName(5).toLowerCase()}.com` : 'user@appsus.com'
            const mailFrom = Math.random() >= 0.5 ? `${utilService.makeName(4).toLowerCase()}@${utilService.makeName(5).toLowerCase()}.com` : 'user@appsus.com'
            const isDraft = false
            const removedAt = null
            const isStarred = false
            const email = {
                id: utilService.makeId(),
                subject: subject.charAt(0).toUpperCase() + subject.slice(1),
                body: body.charAt(0).toUpperCase() + body.slice(1),
                isStarred: isStarred,
                isRead: false,
                sentAt: randomTimestamp,
                removedAt: removedAt,
                isDraft: isDraft,
                from: mailFrom,
                to: mailTo,
                folder: setFolder(mailFrom, randomTimestamp, removedAt, isDraft, isStarred)
            };

            mailList.push(email)
        }
        utilService.saveToStorage(MAIL_KEY, mailList)
        console.log('mails', mailList)
    }

    function setFolder(from, sentAt, removedAt, isDraft, isStarred) {
        if (from !== 'user@appsus.com' && !removedAt && !isDraft) {
            return 'inbox'
        } else if (from === 'user@appsus.com' && !removedAt && !isDraft) {
            return 'sent'
        } else if (!sentAt && removedAt && !isDraft) {
            return 'trash'
        } else if (isDraft) {
            return 'draft'
        } else if (isStarred) {
            return 'starred'
        }
    }
}
