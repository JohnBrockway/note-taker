/*
 * <li>
 *   <div class="noteRow">
 *     <p class="noteBullet">▸</p>
 *     <p>{note.Text}</p>
 *   </div>
 * <li>
 */
function createNoteElement(note) {       
    const bulletElement = document.createElement("p");
    bulletElement.innerText = "▸";
    bulletElement.classList.add("noteBullet");
    
    const textElement = document.createElement("p"); 
    textElement.innerText = note.Text;
    
    const divElement = document.createElement("div");
    divElement.classList.add("noteRow"); 
    divElement.appendChild(bulletElement);
    divElement.appendChild(textElement);
    
    const listItemElement = document.createElement("li");
    listItemElement.appendChild(divElement);
    return listItemElement;
}

/*
 * <li>{item.Name}<li>
 */
function createItemElement(item) {
    const itemElement = document.createElement("li");
    itemElement.addEventListener("click", () => loadItem(item.ID));
    itemElement.innerText = item.Name;
    return itemElement;
}

/*
 * <li class="categoryListElement">
 *   <div class="categoryRow">
 *     <p class="categoryName">{category.Name}</p>
 *     <div class="newItemInput visible">
 *       <input type="text">
 *       <button>✓</button>
 *       <button>×</button>
 *     </div>
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
    newItemElement.addEventListener("click", (event) => openAddNewItemDialog(event));

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

    const newItemName = document.createElement("input");
    newItemName.setAttribute("type", "text");

    const newItemSubmit = document.createElement("button");
    newItemSubmit.innerText = "✓";
    newItemSubmit.addEventListener("click", (event) => submitNewItem(event.target, category.ID));

    const newItemCancel = document.createElement("button");
    newItemCancel.innerText = "×";
    newItemCancel.addEventListener("click", (event) => closeNewItem(event.target));

    const newItemDiv = document.createElement("div");
    newItemDiv.classList.add("newItemInput");
    newItemDiv.appendChild(newItemName);
    newItemDiv.appendChild(newItemSubmit);
    newItemDiv.appendChild(newItemCancel);

    const itemListElement = document.createElement("ul");
    itemListElement.classList.add("itemList");
    itemListElement.classList.add("open");
    itemListElement.setAttribute("categoryID", category.ID);

    const categoryElement = document.createElement("li");
    categoryElement.classList.add("categoryListElement");
    categoryElement.appendChild(divElement);
    categoryElement.appendChild(newItemDiv);
    categoryElement.appendChild(itemListElement);
    return categoryElement;
}