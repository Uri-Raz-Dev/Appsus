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

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}


function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}


function getDefaultFilter(filterBy = { title: '', price: 0, date: 0, authors: '' }) {
    return {
        title: filterBy.title, price: filterBy.price,
        date: filterBy.date, authors: filterBy.authors
    }
}

function getEmptyNote() {
    return {
        createdAt: '',
        type: 'NoteTxt',
        isPinned: false,
        info: { txt: '', title: '' }
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
                txt: 'Fullstack Me Baby!',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }]
            }
        },
        {
            id: 'n102',
            type: 'NoteImg',
            isPinned: false,
            info: { url: 'https://source.unsplash.com/random', title: 'Bobi and Me', txt: 'Fullstack Me Baby!' },
            style: { backgroundColor: '#00d' }
        },
        {
            id: 'n101',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: { backgroundColor: '#00d' },
            info: { txt: 'Fullstack Me Baby!', title: 'Bobi and Me' }
        },
    ]
    console.log('notes', notes)
    utilService.saveToStorage(NOTE_KEY, notes)
    return notes
}
