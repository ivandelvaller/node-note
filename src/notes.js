const fs = require('fs')
const chalk = require('chalk')

//FUNCTIONS TO ADD, REMOVE, LIST THE NOTES.

//Adding a note.
const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNote = notes.find( note => note.title === title )

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        
        saveNotes(notes)
        console.log(chalk.bgGreen.black('Note saved.'))

    } else {
        console.log(chalk.bgRed.black('Note title taken.'))   
    }
}


//Removing a note.
const removeNote = function(title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter( note =>  note.title !== title )

    if (notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen.black('Note removed.'))
    } else {
        console.log(chalk.bgRed.black('No note found.'))
    }

    saveNotes(notesToKeep)
}


//Listing notes.
const listNotes = function () {
    counter = 0
    const notes = loadNotes()

    console.log(chalk.bgBlue.black('Your notes: '))
    notes.forEach(note => {
        counter += 1;
        console.log(chalk.blue(`${counter}.- ${note.title}`))
    })
    
}


const readNote = function (title) {
    const notes = loadNotes()
    const noteToRead = notes.find(note => note.title === title ) 

    if (noteToRead) {
        console.log(`
            ${chalk.inverse(noteToRead.title)}\n
            ${noteToRead.body}
        `)
    } else {
        console.log(chalk.bgRed.black('Note not found.'))
    }
}


//HANDLERS.
const saveNotes = function (notes) {
    try {
        const dataJSON = JSON.stringify(notes)
        fs.writeFileSync('notes.json', dataJSON)
    } catch (error) {
        console.log(error)
    }
}


const loadNotes = function () {
    try {
        const bufferData = fs.readFileSync('notes.json')
        const dataJSON = bufferData.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}


//EXPORTED METHODS.
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
