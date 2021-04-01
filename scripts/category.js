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

function openAddNewCategoryDialog() {
    document.getElementById("newCategoryInput").classList.add("visible");
    document.getElementById("newCategoryInput").getElementsByTagName("input")[0].focus();
    document.getElementById("cover").classList.add("show");
}

function submitNewCategory() {
    const inputNode = document.getElementById("newCategoryInput").getElementsByTagName("input")[0];
    if (inputNode.value == "") {
        return;
    }
    const newCategory = {
        Name: inputNode.value,
        World: 1,
    }
    window.electron.addCategory(newCategory);
    inputNode.value = "";
    document.getElementById("cover").classList.remove("show");
    document.getElementById("newCategoryInput").classList.remove("visible");
}

function cancelNewCategory() {
    document.getElementById("newCategoryInput").getElementsByTagName("input")[0].value = "";
    document.getElementById("cover").classList.remove("show");
    document.getElementById("newCategoryInput").classList.remove("visible");
}