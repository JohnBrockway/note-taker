function startup() {
    setUpDatabaseCallbacks();
    setUpEventListeners();
    refreshSidebar();
    const lastUsedItem = window.localStorage.getItem("lastUsedItem");
    if (lastUsedItem) {
        refreshSingleItem(lastUsedItem);
    }
}