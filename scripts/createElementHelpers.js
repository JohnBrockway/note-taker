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
 * <li onclick="loadItem("{item.Name}", {item.ID})">
 *   {item.Name}
 * <li>
 */
function createItemElement(item) {
    const onclickResultTemplate = "loadItem(\"{0}\", {1})";
    let onclickText = onclickResultTemplate.replace("{0}", item.Name);
    onclickText = onclickText.replace("{1}", item.ID);

    const itemElement = document.createElement("li");
    itemElement.setAttribute("onclick", onclickText);
    itemElement.innerText = item.Name;
    return itemElement;
}

/*
 * <li>
 *   <div class="categoryRow" onclick="operateCategory(this)">
 *     <p class="categoryName>{category.Name}</p>
 *     <p class="categoryIcon">▾</p>
 *   </div>
 *   <ul class="itemList open" categoryid="{category.ID}"></ul>
 * <li>
 */
function createCategoryElement(category) {
    const categoryNameElement = document.createElement("p");
    categoryNameElement.innerText = category.Name;
    categoryNameElement.classList.add("categoryName");

    const categoryIconElement = document.createElement("p");
    categoryIconElement.classList.add("categoryIcon");
    categoryIconElement.innerText = "▾";
    
    const divElement = document.createElement("div");
    divElement.classList.add("categoryRow");
    divElement.appendChild(categoryNameElement);
    divElement.appendChild(categoryIconElement);
    divElement.setAttribute("onclick", "operateCategory(this)");

    const itemListElement = document.createElement("ul");
    itemListElement.classList.add("itemList");
    itemListElement.classList.add("open");
    itemListElement.setAttribute("categoryID", category.ID);

    const categoryElement = document.createElement("li");
    categoryElement.appendChild(divElement);
    categoryElement.appendChild(itemListElement);
    return categoryElement;
}