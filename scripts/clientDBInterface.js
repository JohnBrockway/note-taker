window.electron.getItemsForCategoryResponse((event, data) => setUpItemsList(JSON.parse(data)));
window.electron.getCategoriesForWorldResponse((event, data) => setUpCategories(JSON.parse(data)));
window.electron.getNotesForItemResponse((event, data) => populateItem(JSON.parse(data)));

window.electron.getCategoriesForWorld(1);

function setUpCategories(categories) {
    categories.sort((categoryA, categoryB) => stringSort(categoryA.Name, categoryB.Name));

    const categoryListElement = document.getElementById("categoryList");
    categoryListElement.innerHTML = null;
    for (let i = 0 ; i < categories.length ; i++) {
        categoryListElement.appendChild(createCategoryElement(categories[i]));
        window.electron.getItemsForCategory(categories[i].ID);
    }
}

function setUpItemsList(items) {
    items = items.filter(item => item.Alias == -1);
    items.sort((itemA, itemB) => stringSort(itemA.Name, itemB.Name));
    
    let itemsListElement;
    const maybeCorrectItemsList = 
        Array.from(document.getElementsByClassName("itemList"))
            .filter((item => item.getAttribute("categoryID") == items[0].Category));
    if (maybeCorrectItemsList.length == 1) {
        itemsListElement = maybeCorrectItemsList[0];
        itemsListElement.innerHTML = null;
    }
    for (let i = 0 ; i < items.length ; i++) {
        itemsListElement.appendChild(createItemElement(items[i]));
    }

    loadItem(items[0].Name, items[0].ID);
}

function loadItem(itemName, itemID) {
    document.getElementById("itemTitle").innerText = itemName;
    window.electron.getNotesForItem(itemID);
}

function populateItem(notes) {
    const notesListElement = document.getElementById("notesList");
    notesListElement.innerHTML = null;
    for (let i = 0 ; i < notes.length ; i++) {
        notesListElement.appendChild(createNoteElement(notes[i]));
    }
}

function stringSort(stringA, stringB) {
    if (stringA < stringB) {
        return -1;
    } else if (stringA > stringB) {
        return 1;
    } else {
        return 0;
    }
}