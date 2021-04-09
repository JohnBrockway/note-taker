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

function operateRelatedItems(node) {
    if (findAncestorWithClassName(node, "noteListElement").getElementsByClassName("relatedItems")[0].classList.contains("show")) {
        closeRelatedItems(node);
    } else {
        openRelatedItems(node);
    }
}

function openRelatedItems(node) {
    findAncestorWithClassName(node, "noteListElement").getElementsByClassName("relatedItems")[0].classList.add("show");
    findAncestorWithClassName(node, "noteListElement").getElementsByClassName("noteBullet")[0].innerText = "▾";
}

function closeRelatedItems(node) {
    findAncestorWithClassName(node, "noteListElement").getElementsByClassName("relatedItems")[0].classList.remove("show");
    findAncestorWithClassName(node, "noteListElement").getElementsByClassName("noteBullet")[0].innerText = "▸";
}