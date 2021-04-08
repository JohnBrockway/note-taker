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
    let itemsForStorage = new Map(JSON.parse(window.sessionStorage.getItem("allItems")));
    
    // Set is a collection that enforces uniqueness, so any duplicates will be collapsed
    const activeCategoryIds = new Set(items.map((item) => item.Category));
    for (let categoryId of activeCategoryIds) {
        const relevantItems = items.filter((item) => item.Category == categoryId);
        relevantItems.sort((itemA, itemB) => stringSort(itemA.Name, itemB.Name));

        itemsForStorage.set(categoryId, relevantItems);
        populateSidebarCategoryWithItems(relevantItems, categoryId);
    }
    window.sessionStorage.setItem("allItems", JSON.stringify(Array.from(itemsForStorage.entries())));
    uncover();
}

function populateSingleItem(itemId) {
    cover();
    window.electron.getItemByID(itemId);
}

function handleGetItemResponse(item) {
    setItemTitle(item);
    populateNotes(item.ID);
}

function populateNotes(itemId) {
    cover();
    window.electron.getNotesForItem(itemId);
}

function handleGetNotesResponse(notes) {
    populateNotesList(notes);
    uncover();
}