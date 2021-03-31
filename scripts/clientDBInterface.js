window.electron.getItemsForCategoryResponse(
    function(event, data) {
        setUpItemsList(JSON.parse(data));
    });
window.electron.getCategoriesForWorldResponse(
    function(event, data) {
        setUpCategories(JSON.parse(data));
    });
window.electron.getCategoriesForWorld(1);

window.electron.getNotesForItemResponse((event, data) => populateItem(JSON.parse(data)));

function setUpCategories(categories) {
    categories.sort(function(categoryA, categoryB) {
        if (categoryA.Name < categoryB.Name) {
            return -1;
        } else if (categoryA.Name > categoryB.Name) {
            return 1;
        } else {
            return 0;
        }
    });

    const onclickText = "operateCategory(this)";
    const categoryListElement = document.getElementById("categoryList");
    for (let i = 0 ; i < categories.length ; i++) {
        const categoryElement = document.createElement("li");
        const categoryNameElement = document.createElement("p");
        categoryNameElement.innerText = categories[i].Name;
        categoryNameElement.classList.add("categoryName");
        categoryNameElement.setAttribute("onclick", onclickText);
        const itemListElement = document.createElement("ul");
        itemListElement.classList.add("itemList");
        itemListElement.classList.add("open");
        itemListElement.setAttribute("categoryID", categories[i].ID);
        categoryElement.appendChild(categoryNameElement);
        categoryElement.appendChild(itemListElement);
        categoryListElement.appendChild(categoryElement);
        window.electron.getItemsForCategory(categories[i].ID);
    }
}

function setUpItemsList(items) {
    items = items.filter(item => item.Alias == -1);
    items.sort(function(itemA, itemB) {
        if (itemA.Name < itemB.Name) {
            return -1;
        } else if (itemA.Name > itemB.Name) {
            return 1;
        } else {
            return 0;
        }
    });
    
    const onclickResultTemplate = "loadItem(\"{0}\", {1})";
    const itemsListElement = Array.from(document.getElementsByClassName("itemList")).filter((item => item.getAttribute("categoryID") == items[0].Category))[0];
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

function loadItem(itemName, itemID) {
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = null;
    document.getElementById("itemTitle").innerText = itemName;
    window.electron.getNotesForItem(itemID);
}

function populateItem(notes) {
    const notesListElement = document.getElementById("notesList");
    for (let i = 0 ; i < notes.length ; i++) {
        const listItemElement = document.createElement("li");
        const divElement = document.createElement("div");
        divElement.classList.add("noteRow");        
        const bulletElement = document.createElement("p");
        bulletElement.innerText = "▸";
        bulletElement.classList.add("noteBullet");
        const textElement = document.createElement("p"); 
        textElement.innerText = notes[i].Text;
        divElement.appendChild(bulletElement);
        divElement.appendChild(textElement);
        listItemElement.appendChild(divElement);
        notesListElement.appendChild(listItemElement);
    }
}