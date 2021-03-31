function operateCategory(node) {
    const iconNode = node.getElementsByClassName("categoryIcon")[0];
    const itemListNode = node.parentNode.getElementsByClassName("itemList")[0];
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