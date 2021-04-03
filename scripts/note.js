function setNoteHeight(node) {
    node.style.height = "";
    const newHeight = node.scrollHeight + 3;
    node.style.height = newHeight + 'px';
}

function setAllNoteHeights() {
    const notes = document.getElementById("notesList").getElementsByTagName("textarea");
    for(let i = 0 ; i < notes.length ; i++) {
        setNoteHeight(notes[i]);
    }
}

function appendEmptyNote() {
    const notesListElement = document.getElementById("notesList").appendChild(createNoteElementWithText(""));
}