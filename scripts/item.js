function openAddNewItemDialog(event, categoryId) {
    event.stopPropagation();

    document.getElementById("fullPageNewItemCover").classList.add("show");
    document.getElementById("newItemInputContainer").getElementsByTagName("input")[0].focus();
    document.getElementById("cover").classList.add("show");
    window.sessionStorage.setItem("currentCategory", categoryId);
}

function submitNewItem() {
    const inputNode = document.getElementById("newItemInputContainer").getElementsByTagName("input")[0];
    if (inputNode.value == "") {
        return;
    }
    const newItem = {
        Name: inputNode.value,
        Alias: -1,
        Category: window.sessionStorage.getItem("currentCategory"),
    };
    window.electron.addItem(newItem);
    closeAddNewItemDialog();
}

function closeAddNewItemDialog() {
    document.getElementById("newItemInputContainer").getElementsByTagName("input")[0].value = "";
    document.getElementById("cover").classList.remove("show");
    document.getElementById("fullPageNewItemCover").classList.remove("show");
    window.sessionStorage.removeItem("currentCategory");
}

function loadItem(itemID) {
    window.electron.getItemByID(itemID);
    window.electron.getNotesForItem(itemID);
}

function insertCreatedItem(item) {
    window.electron.getCategoriesForWorld(1);
}