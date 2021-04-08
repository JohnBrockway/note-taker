function populateSidebarWithCategories(categories) {
    const categoryListElement = document.getElementById("categoryList");
    categoryListElement.innerHTML = null;
    for (let i = 0 ; i < categories.length ; i++) {
        categoryListElement.appendChild(createCategoryElement(categories[i]));
    }
}

function populateSidebarCategoryWithItems(items, categoryId) {    
    let itemsListElement;
    const maybeCorrectItemsList = 
        Array.from(document.getElementsByClassName("itemList"))
            .filter((item => item.getAttribute("categoryID") == categoryId));
    if (maybeCorrectItemsList.length == 1) {
        itemsListElement = maybeCorrectItemsList[0];
        itemsListElement.innerHTML = null;
    }
    for (let i = 0 ; i < items.length ; i++) {
        itemsListElement.appendChild(createItemElement(items[i]));
    }
}

function setItemTitle(item) {
    document.getElementById("itemTitle").innerText = item.Name;
}

function populateNotesList(notes) {
    const notesListElement = document.getElementById("notesList");
    notesListElement.innerHTML = null;
    for (let i = 0 ; i < notes.length ; i++) {
        notesListElement.appendChild(createNoteElement(notes[i]));
    }
    appendEmptyNote();
    setAllNoteHeights();
}

function cover() {
    document.getElementById("cover").classList.add("show");
}

function uncover() {
    document.getElementById("cover").classList.remove("show");
}