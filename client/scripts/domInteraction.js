function populateSidebarWithCategories(categories) {
    const categoryListElement = document.getElementById("categoryList");
    categoryListElement.innerHTML = null;
    for (const category of categories) {
        categoryListElement.appendChild(createCategoryElement(category));
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
    for (const item of items) {
        itemsListElement.appendChild(createItemElement(item));
    }
}

function setItemTitle(item) {
    document.getElementById("itemTitle").innerText = item.Name;
}

function populateNotesList(notes) {
    const notesListElement = document.getElementById("notesList");
    const allItemsMap = getItemsFromLocalStorageFlat();
    notesListElement.innerHTML = null;
    for (const note of notes) {
        let relatedItems = [];
        let relatedItemIds = note.RelatedItems.split('/');
        relatedItemIds.map((itemId) => {
            if (itemId && allItemsMap.has(parseInt(itemId))) {
                relatedItems.push(allItemsMap.get(parseInt(itemId)));
            }
        });
        notesListElement.appendChild(createNoteElement(note, relatedItems));
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