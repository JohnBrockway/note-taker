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

function openRelatedItems(node) {
    findAncestorWithClassName(node, "noteListElement").getElementsByClassName("relatedItems")[0].classList.add("show");
}

function closeRelatedItems(node) {
    findAncestorWithClassName(node, "noteListElement").getElementsByClassName("relatedItems")[0].classList.remove("show");
}