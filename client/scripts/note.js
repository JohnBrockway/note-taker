function setNoteHeight(node) {
    node.style.height = 'inherit';

	// Get the computed styles for the element
    const computedStyle = window.getComputedStyle(node);

	// Calculate the height
	const height = parseInt(computedStyle.getPropertyValue('border-top-width'))
                + parseInt(computedStyle.getPropertyValue('padding-top'))
	            + node.scrollHeight
	            + parseInt(computedStyle.getPropertyValue('padding-bottom'))
	            + parseInt(computedStyle.getPropertyValue('border-bottom-width'));

	node.style.height = height + 'px';
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

function openNoteForEditing(node) {
    findAncestorWithClassName(node, "noteListElement").getElementsByClassName("noteTextUneditable")[0].classList.remove("show");
    const textAreaElement = findAncestorWithClassName(node, "noteListElement").getElementsByClassName("noteTextEditable")[0];
    textAreaElement.classList.add("show");
    setNoteHeight(textAreaElement);
    textAreaElement.focus();
    // Set cursor to end of text
    textAreaElement.setSelectionRange(textAreaElement.value.length, textAreaElement.value.length);
}

function closeNoteForEditing(node) {
    findAncestorWithClassName(node, "noteListElement").getElementsByClassName("noteTextEditable")[0].classList.remove("show");
    findAncestorWithClassName(node, "noteListElement").getElementsByClassName("noteTextUneditable")[0].classList.add("show");
}