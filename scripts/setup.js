window.electron.getItemsForCategoryResponse((event, data) => setUpItemsList(JSON.parse(data)));
window.electron.getCategoriesForWorldResponse((event, data) => setUpCategories(JSON.parse(data)));
window.electron.getNotesForItemResponse((event, data) => populateItem(JSON.parse(data)));

document.getElementById("newCategory").addEventListener("click", (event) => openAddNewCategoryDialog());
document.getElementById("submitNewCategory").addEventListener("click", (event) => submitNewCategory());
document.getElementById("cancelNewCategory").addEventListener("click", (event) => cancelNewCategory());
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