function stringSort(stringA, stringB) {
    if (stringA < stringB) {
        return -1;
    } else if (stringA > stringB) {
        return 1;
    } else {
        return 0;
    }
}

function stringifyMap(map) {
    return JSON.stringify(Array.from(map.entries()));
}

function destringifyMap(stringifiedMap) {
    return new Map(JSON.parse(stringifiedMap));
}

function getItemsFromLocalStorageFlat() {
    const locallySavedItemsIterator = destringifyMap(window.sessionStorage.getItem("allItems")).values();
    const allItemsFlatMap = new Map();
    for (const listOfItemsInCategory of locallySavedItemsIterator) {
        listOfItemsInCategory.map((item) => allItemsFlatMap.set(item.ID, item));
    }
    return allItemsFlatMap;
}

function getItemsFromMapByIds(itemMap, listOfIds) {
    let relatedItems = [];
    listOfIds.map((itemId) => {
        if (itemId && itemMap.has(parseInt(itemId))) {
            relatedItems.push(itemMap.get(parseInt(itemId)));
        }
    });
    return relatedItems;
}