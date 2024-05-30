// note service

import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"


const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyNote,
    getPinnedNotes,
    getNonPinnedNotes,
}

window.ns = noteService

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')

                notes = notes.filter(note => regExp.test(note.title))

            }

            if (filterBy.price) {
                notes = notes.filter((note) => {
                    const { listPrice: { amount } } = note
                    const notePrice = parseFloat(amount)
                    return notePrice <= filterBy.price
                })

            }
            if (filterBy.date) {
                notes = notes.filter((note) => {
                    const { publishedDate } = note
                    const noteDate = parseFloat(publishedDate)
                    return noteDate <= filterBy.date
                })

            }

            if (filterBy.authors) {
                const regExp = new RegExp(filterBy.authors, 'i')

                notes = notes.filter(note => regExp.test(note.authors))
            }
            return notes
        })
}




function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            // note = _setNextPrevNoteId(note)
            return note
        })
}

function getPinnedNotes(notes) {
    return notes.filter(note => note.isPinned)
}

function getNonPinnedNotes(notes) {
    return notes.filter(note => !note.isPinned)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}


function save(note) {
    if (!(note.info.txt || note.info.title || note.info.url) && !note.id) return Promise.reject()
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}


function getDefaultFilter(filterBy = { title: '', price: 0, date: 0, authors: '' }) {
    return {
        title: filterBy.title,
        price: filterBy.price,
        date: filterBy.date,
        authors: filterBy.authors
    }
}

function getEmptyNote(type = 'NoteTxt') {
    return {
        createdAt: '',
        type,
        isPinned: false,
        info: { url: '', txt: '', title: '', txtLineCount: 1, titleLineCount: 1 },
        style: '#fff'
    }
}

function _createNotes() {
    const notes = [
        {
            id: 'n103',
            type: 'NoteTodos',
            isPinned: false,
            info: {
                title: 'Get my stuff together',
                // txt: 'Fullstack Me Baby!',
                txtLineCount: 1,
                titleLineCount: 1,
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 },
                    // { txt: 'Driving license', doneAt: null },
                    // { txt: 'Driving license', doneAt: null },
                    // { txt: 'Driving license', doneAt: null },

                ]
            }
        },
        {
            id: 'n102',
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fanimalsadda.com%2Fwp-content%2Fuploads%2F2015%2F03%2FGrumpy-Cat-6.jpg&f=1&nofb=1&ipt=fdeff2dad4abd41a7125730ad0466cfe79e4e1c876f6eb793789141f7590ea8e&ipo=images', title: 'Bobi and Me', txt: 'Fullstack Me Baby!',
                txtLineCount: 1,
                titleLineCount: 1,
            },
            style: { backgroundColor: '#00d' }
        },
        {
            id: 'n101',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: { backgroundColor: '#00d' },
            info: {
                txt: 'Fullstack Me Baby!', title: 'Bobi and Me',
                txtLineCount: 1,
                titleLineCount: 1,
            }
        },
    ]
    console.log('notes', notes)
    utilService.saveToStorage(NOTE_KEY, notes)
    return notes
}
