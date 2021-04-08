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