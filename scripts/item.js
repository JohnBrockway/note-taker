function openAddNewItemDialog(event) {
    event.stopPropagation();
    const node = event.target;
    document.getElementById("cover").classList.add("show");
    const inputFormElement = findAncestorWithClassName(node, "categoryListElement").getElementsByClassName("newItemInput")[0];
    inputFormElement.classList.add("visible");
    inputFormElement.getElementsByTagName("input")[0].focus();
}

function submitNewItem(node, categoryID) {
    const inputNode = findAncestorWithClassName(node, "newItemInput").getElementsByTagName("input")[0];
    if (inputNode.value == "") {
        return;
    }
    const newItem = {
        Name: inputNode.value,
        Alias: -1,
        Category: categoryID,
    };
    window.electron.addItem(newItem);
    inputNode.value = "";
    findAncestorWithClassName(node, "newItemInput").classList.remove("visible");
    document.getElementById("cover").classList.remove("show");
}

function closeNewItem(node) {
    findAncestorWithClassName(node, "newItemInput").getElementsByTagName("input")[0].value = "";
    findAncestorWithClassName(node, "newItemInput").classList.remove("visible");
    document.getElementById("cover").classList.remove("show");
}

function loadItem(itemID) {
    window.electron.getItemByID(itemID);
    window.electron.getNotesForItem(itemID);
}