/*
 * <li class="noteListElement">
 *   <p class="noteBullet">▸</p>
 *   <div class="noteMainDiv">
 *     <textarea class="noteText" wrap="hard">{note.Text}</textarea>
 *     <div class="suggestedItems"></div>
 *     <div class="relatedItems"></div>
 *   </div>
 * <li>
 */
function createNoteElement(note, relatedItems) {
    const bulletElement = document.createElement("p");
    bulletElement.innerText = "▸";
    bulletElement.classList.add("noteBullet");
    
    const textElement = document.createElement("textarea");
    textElement.addEventListener("keydown", (event) => setNoteHeight(event.target));
    textElement.addEventListener("keyup", (event) => setNoteHeight(event.target));
    textElement.setAttribute("wrap", "hard");
    textElement.classList.add("noteText");
    textElement.innerText = note == null ? "" : note.Text;
    
    const suggestedItemsDiv = document.createElement("div");
    suggestedItemsDiv.classList.add("suggestedItems");
    
    const relatedItemsDiv = document.createElement("div");
    relatedItemsDiv.classList.add("relatedItems");

    for (const item of relatedItems) {
        const relatedItem = document.createElement("p");
        relatedItem.classList.add("relatedItem");
        relatedItem.innerText = item.Name;
        relatedItem.addEventListener("click", () => refreshSingleItem(item.ID));
        relatedItemsDiv.appendChild(relatedItem);
    }

    const noteMainDiv = document.createElement("div");
    noteMainDiv.classList.add("noteMainDiv");
    noteMainDiv.appendChild(textElement);
    noteMainDiv.appendChild(suggestedItemsDiv);
    noteMainDiv.appendChild(relatedItemsDiv);
    
    const listItemElement = document.createElement("li");
    listItemElement.appendChild(bulletElement);
    listItemElement.appendChild(noteMainDiv);
    listItemElement.classList.add("noteListElement");
    return listItemElement;
}

/*
 * <li>{item.Name}<li>
 */
function createItemElement(item) {
    const itemElement = document.createElement("li");
    itemElement.classList.add("item");
    itemElement.addEventListener("click", () => refreshSingleItem(item.ID));
    itemElement.innerText = item.Name;
    return itemElement;
}

/*
 * <li class="categoryListElement">
 *   <div class="categoryRow">
 *     <p class="categoryName">{category.Name}</p>
 *     <div class="iconDiv">
 *       <p class="newItem"">+</p>
 *       <p class="categoryIcon">▾</p>
 *     </div>
 *   </div>
 *   <ul class="itemList open" categoryid="{category.ID}"></ul>
 * <li>
 */
function createCategoryElement(category) {
    const categoryNameElement = document.createElement("p");
    categoryNameElement.innerText = category.Name;
    categoryNameElement.classList.add("categoryName");
    categoryNameElement.addEventListener("mouseover", (event) => highlightCategory(event.target));
    categoryNameElement.addEventListener("mouseout", (event) => unhighlightCategory(event.target));

    const newItemElement = document.createElement("p");
    newItemElement.classList.add("newItem");
    newItemElement.innerText = "+";
    newItemElement.addEventListener("click", (event) => openAddNewItemDialog(event, category.ID));

    const categoryIconElement = document.createElement("p");
    categoryIconElement.classList.add("categoryIcon");
    categoryIconElement.innerText = "▾";
    categoryIconElement.addEventListener("mouseover", (event) => highlightCategory(event.target));
    categoryIconElement.addEventListener("mouseout", (event) => unhighlightCategory(event.target));
    
    const iconDivElement = document.createElement("div");
    iconDivElement.classList.add("iconDiv");
    iconDivElement.appendChild(newItemElement);
    iconDivElement.appendChild(categoryIconElement);
    
    const divElement = document.createElement("div");
    divElement.classList.add("categoryRow");
    divElement.appendChild(categoryNameElement);
    divElement.appendChild(iconDivElement);
    divElement.addEventListener("click", (event) => operateCategory(event.target));

    const itemListElement = document.createElement("ul");
    itemListElement.classList.add("itemList");
    itemListElement.classList.add("open");
    itemListElement.setAttribute("categoryID", category.ID);

    const categoryElement = document.createElement("li");
    categoryElement.classList.add("categoryListElement");
    categoryElement.appendChild(divElement);
    categoryElement.appendChild(itemListElement);
    return categoryElement;
}