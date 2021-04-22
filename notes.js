const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...';
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes);
        console.log(chalk.black.bgGreen('New note added!'));
    } else {
        console.log(chalk.black.bgRed('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter(note => note.title !== title);

    if (notesToKeep.length < notes.length) {
        saveNotes(notesToKeep);
        console.log(chalk.black.bgGreen('Note removed'));
    } else {
        console.log(chalk.black.bgRed('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.green('Your notes:'));
    notes.forEach(note => console.log("\t" + note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (note) {
        console.log(chalk.black.bgGreen(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.black.bgRed('No note found!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}