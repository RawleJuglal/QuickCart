export function clearInputField(element){
    element.value = ""
}

export function addItemToCart(element, item){
    let newEl = document.createElement('li');
    newEl.classList.add('list-item');
    newEl.id = item[0];
    newEl.textContent = item[1];
    newEl.addEventListener('click',(event)=>{
        console.log(event.target.id);
    })
    element.append(newEl)
}

export function clearShoppingListEl(element){
    element.innerHTML = ''
}