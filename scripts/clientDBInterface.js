window.electron.getItemsForWorldResponse(
    function(event, data) {
        const items = JSON.parse(data);
        setUpItemsList(items);
        setUpSessionsList(items);
    });
window.electron.getItemsForWorld(1);

window.electron.getNotesForItemResponse((event, data) => populateItem(JSON.parse(data)));

function setUpItemsList(items) {
    items = items.filter(item => item.Alias == -1 && !item.IsSession);
    items.sort(function(itemA, itemB) {
        if (itemA.Name < itemB.Name) {
            return -1;
        } else if (itemB.Name > itemA.Name) {
            return 1;
        } else {
            return 0;
        }
    });
    
    const onclickResultTemplate = "loadItem(\"{0}\", {1})";
    const itemsListElement = document.getElementById("itemsList");
    for (let i = 0 ; i < items.length ; i++) {
        const listItemElement = document.createElement("li");
        let onclickText = onclickResultTemplate.replace("{0}", items[i].Name);
        onclickText = onclickText.replace("{1}", items[i].ID);
        listItemElement.setAttribute("onclick", onclickText);  
        listItemElement.innerText = items[i].Name;
        itemsListElement.appendChild(listItemElement);
    }

    loadItem(items[0].Name, items[0].ID);
}

function setUpSessionsList(sessions) {
    sessions = sessions.filter(session => session.IsSession);
    sessions.sort((sessionA, sessionB) => sessionA.SessionOrder - sessionB.sessionOrder);

    const onclickResultTemplate = "loadItem(\"{0}\", {1})";
    const sessionsListElement = document.getElementById("sessionsList");
    for (let i = 0 ; i < sessions.length ; i++) {
        const listItemElement = document.createElement("li");
        let onclickText = onclickResultTemplate.replace("{0}", sessions[i].Name);
        onclickText = onclickText.replace("{1}", sessions[i].ID);
        listItemElement.setAttribute("onclick", onclickText); 
        listItemElement.innerText = sessions[i].Name;
        sessionsListElement.appendChild(listItemElement);
    }
}

function loadItem(itemName, itemID) {
    const notesList = document.getElementById("notesList");
    let child = notesList.firstElementChild;
    while (child != null) {
        notesList.removeChild(child);
        child = notesList.firstElementChild;
    }
    document.getElementById("itemTitle").innerText = itemName;
    window.electron.getNotesForItem(itemID);
}

function populateItem(notes) {
    const notesListElement = document.getElementById("notesList");
    for (let i = 0 ; i < notes.length ; i++) {
        const listItemElement = document.createElement("li");
        listItemElement.innerText = notes[i].Text;
        notesListElement.appendChild(listItemElement);
    }
}