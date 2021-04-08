function setNoteHeight(node) {
    node.style.height = "";
    const newHeight = node.scrollHeight;
    node.style.height = newHeight + 'px';
}

function setAllNoteHeights() {
    const notes = document.getElementById("notesList").getElementsByTagName("textarea");
    for(let i = 0 ; i < notes.length ; i++) {
        setNoteHeight(notes[i]);
    }
}

function appendEmptyNote() {
    document.getElementById("notesList").appendChild(createNoteElement(null, []));
}