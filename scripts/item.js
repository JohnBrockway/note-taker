function openAddNewItemDialog(event, categoryId) {
    event.stopPropagation();

    document.getElementById("fullPageNewItemCover").classList.add("show");
    document.getElementById("newItemInputContainer").getElementsByTagName("input")[0].focus();
    cover();
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
    uncover();
    document.getElementById("fullPageNewItemCover").classList.remove("show");
    window.sessionStorage.removeItem("currentCategory");
}

function insertCreatedItem(item) {
    refreshItems([item.Category]);
}