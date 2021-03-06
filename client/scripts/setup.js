function setUpDatabaseCallbacks() {
    window.electron.getItemsForCategoriesResponse((event, data) => handleGetItemsResponse(JSON.parse(data)));
    window.electron.getItemByIDResponse((event, data) => handleGetItemResponse(JSON.parse(data)));
    window.electron.getCategoriesForWorldResponse((event, data) => handleGetCategoriesResponse(JSON.parse(data)));
    window.electron.getNotesForItemResponse((event, data) => handleGetNotesResponse(JSON.parse(data)));

    window.electron.addNoteResponse((event, data) => handleAddNoteResponse(JSON.parse(data)));
    window.electron.addItemResponse((event, data) => handleAddItemResponse(JSON.parse(data)));
    window.electron.addCategoryResponse((event, data) => insertCreatedCategory(JSON.parse(data)));

    window.electron.updateNoteResponse((event, data) => handleUpdateNoteResponse(JSON.parse(data)));
}

function setUpEventListeners() {
    document.getElementById("newCategoryButton").addEventListener("click", (event) => openAddNewCategoryDialog());
    document.getElementById("submitNewCategory").addEventListener("click", (event) => submitNewCategory());
    document.getElementById("cancelNewCategory").addEventListener("click", (event) => closeAddNewCategoryDialog());
    document.getElementById("submitNewItem").addEventListener("click", (event) => submitNewItem());
    document.getElementById("cancelNewItem").addEventListener("click", (event) => closeAddNewItemDialog());
}

function startup() {
    setUpDatabaseCallbacks();
    setUpEventListeners();
    refreshSidebar();
    const lastUsedItem = window.localStorage.getItem("lastUsedItem");
    if (lastUsedItem) {
        refreshSingleItem(lastUsedItem);
    }
}