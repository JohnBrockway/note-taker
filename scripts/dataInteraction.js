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
    // Set is a collection that enforces uniqueness, so any duplicates will be collapsed
    const activeCategoryIds = new Set(items.map((item) => item.Category));
    for (let categoryId of activeCategoryIds) {
        const relevantItems = items.filter((item) => item.Category == categoryId);
        relevantItems.sort((itemA, itemB) => stringSort(itemA.Name, itemB.Name));
        populateSidebarCategoryWithItems(relevantItems, categoryId);
    }
    uncover();
}