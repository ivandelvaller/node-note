const notes = require('./notes');
const yargs = require('yargs');

yargs.version('1.1.0');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'List the notes',
    builder: {
        describe: 'List of notes',
        demandOption: true,
        type: 'string'
    },
    handler: (argv) => {
        notes.listNotes(argv.title);
    }
});

yargs.command({
    command: 'read',
    describe: 'Reading the note.',
    builder: {
        describe: 'Read a specific note',
        demandOption: true,
        type: 'string'
    },
    handler: (argv) => {
        notes.readNote(argv.title);
    }
});

yargs.parse();