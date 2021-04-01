function operateCategory(node) {
    const iconNode = findAncestorWithClassName(node, "categoryListElement").getElementsByClassName("categoryIcon")[0];
    const itemListNode = findAncestorWithClassName(node, "categoryListElement").getElementsByClassName("itemList")[0];
    if (itemListNode.classList.contains("open")) {
        itemListNode.classList.remove("open");
        itemListNode.classList.add("closed");
        iconNode.innerText = "⋯";
    } else {
        itemListNode.classList.add("open");
        itemListNode.classList.remove("closed");
        iconNode.innerText = "▾";
    }
}

function highlightCategory(node) {
    findAncestorWithClassName(node, "categoryRow").classList.add("highlight");
}

function unhighlightCategory(node) {
    findAncestorWithClassName(node, "categoryRow").classList.remove("highlight");
}

function addNewItem(event) {
    event.stopPropagation();
    const node = event.target;
    document.getElementById("cover").classList.add("show");
    const inputFormElement = findAncestorWithClassName(node, "categoryListElement").getElementsByClassName("newItemInput")[0];
    inputFormElement.classList.add("visible");
}

function submitNewItem(node, categoryID) {
    const inputNode = findAncestorWithClassName(node, "newItemInput").getElementsByTagName("input")[0];
    const newItem = {
        Name: inputNode.value,
        Alias: -1,
        Category: categoryID,
    };
    window.electron.addItem(newItem);
    inputNode.value = "";
    document.getElementById("cover").classList.remove("show");
}

function closeNewItem(node) {
    findAncestorWithClassName(node, "newItemInput").getElementsByTagName("input")[0].value = "";
    findAncestorWithClassName(node, "newItemInput").classList.remove("visible");
    document.getElementById("cover").classList.remove("show");
}