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
    document.getElementById("fullPageNewCategoryCover").classList.add("show");
    document.getElementById("newCategoryInputContainer").getElementsByTagName("input")[0].focus();
    document.getElementById("cover").classList.add("show");
}

function submitNewCategory() {
    const inputNode = document.getElementById("newCategoryInputContainer").getElementsByTagName("input")[0];
    if (inputNode.value == "") {
        return;
    }
    const newCategory = {
        Name: inputNode.value,
        World: 1,
    }
    window.electron.addCategory(newCategory);
    closeAddNewCategoryDialog();
}

function closeAddNewCategoryDialog() {
    document.getElementById("newCategoryInputContainer").getElementsByTagName("input")[0].value = "";
    document.getElementById("cover").classList.remove("show");
    document.getElementById("fullPageNewCategoryCover").classList.remove("show");
}

function insertCreatedCategory(category) {
    window.electron.getCategoriesForWorld(1);
}