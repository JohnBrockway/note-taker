function refreshSidebar() {
    cover();
    refreshCategories();
}

function refreshCategories() {
    cover();
    window.electron.getCategoriesForWorld(1);
}

function handleGetCategoriesResponse(categories) {
    categories.sort((categoryA, categoryB) => stringSort(categoryA.Name, categoryB.Name));
    populateSidebarWithCategories(categories);
    refreshItems(categories.map((category) => category.ID));
}

function refreshItems(categoryIds) {
    cover();
    window.electron.getItemsForCategories(categoryIds);
}

function handleGetItemsResponse(items) {
    let itemsForStorage = destringifyMap(window.sessionStorage.getItem("allItems"));

    // Set is a collection that enforces uniqueness, so any duplicates will be collapsed
    const activeCategoryIds = new Set(items.map((item) => item.Category));
    for (const categoryId of activeCategoryIds) {
        const relevantItems = items.filter((item) => item.Category == categoryId);
        relevantItems.sort((itemA, itemB) => stringSort(itemA.Name, itemB.Name));

        itemsForStorage.set(categoryId, relevantItems);
        populateSidebarCategoryWithItems(relevantItems, categoryId);
    }
    window.sessionStorage.setItem("allItems", stringifyMap(itemsForStorage));
    uncover();
}

function refreshSingleItem(itemId) {
    cover();
    window.electron.getItemByID(itemId);
}

function handleGetItemResponse(item) {
    window.localStorage.setItem("lastUsedItem", item.ID);
    setItemTitle(item.Name);
    refreshNotes(item.ID);
}

function refreshNotes(itemId) {
    cover();
    window.electron.getNotesForItem(itemId);
}

function handleGetNotesResponse(notes) {
    populateNotesList(notes);
    uncover();
}