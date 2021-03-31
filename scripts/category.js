function operateCategory(node) {
    const itemListNode = node.parentNode.getElementsByClassName("itemList")[0];
    if (itemListNode.classList.contains("open")) {
        itemListNode.classList.remove("open");
        itemListNode.classList.add("closed");
        //"⋯"
        //"˅∨"
    } else {
        itemListNode.classList.add("open");
        itemListNode.classList.remove("closed");
    }
}