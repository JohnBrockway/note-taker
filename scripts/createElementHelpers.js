/*
 * <li>
 *   <div class="noteRow">
 *     <p class="noteBullet">▸</p>
 *     <p>{note.Text}</p>
 *   </div>
 * <li>
 */
function createNoteElement(note) {
    const listItemElement = document.createElement("li");
    const divElement = document.createElement("div");
    divElement.classList.add("noteRow");        
    const bulletElement = document.createElement("p");
    bulletElement.innerText = "▸";
    bulletElement.classList.add("noteBullet");
    const textElement = document.createElement("p"); 
    textElement.innerText = note.Text;
    divElement.appendChild(bulletElement);
    divElement.appendChild(textElement);
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
    const itemElement = document.createElement("li");
    let onclickText = onclickResultTemplate.replace("{0}", item.Name);
    onclickText = onclickText.replace("{1}", item.ID);
    itemElement.setAttribute("onclick", onclickText);
    itemElement.innerText = item.Name;
    return itemElement;
}

/*
 * <li>
 *   <p class="categoryName" onclick="operateCategory(this)">{category.Name}</p>
 *   <ul class="itemList open" categoryid="{category.ID}"></ul>
 * <li>
 */
function createCategoryElement(category) {
    const categoryElement = document.createElement("li");
    const categoryNameElement = document.createElement("p");
    categoryNameElement.innerText = category.Name;
    categoryNameElement.classList.add("categoryName");
    categoryNameElement.setAttribute("onclick", "operateCategory(this)");
    const itemListElement = document.createElement("ul");
    itemListElement.classList.add("itemList");
    itemListElement.classList.add("open");
    itemListElement.setAttribute("categoryID", category.ID);
    categoryElement.appendChild(categoryNameElement);
    categoryElement.appendChild(itemListElement);
    return categoryElement;
}