function findAncestorWithClassName(node, className) {
    while(node) {
        if (node.classList.contains(className)) {
            return node;
        }
        node = node.parentNode;
    }
    return null;
}