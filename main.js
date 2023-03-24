import './style.css'
import { clearInputField, clearShoppingListEl } from './functions';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
  databaseURL: `https://realtime-database-a7c40-default-rtdb.firebaseio.com/`
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList")

const AddToCartBTN = document.getElementById('add-button');
const AddToCartInput = document.getElementById('grocery-input');
const shoppingListEl = document.getElementById('shopping-list');

onValue(shoppingListInDB, (snapshot)=>{
  if(snapshot.exists()){
    let shoppingListArray = Object.entries(snapshot.val());
    clearShoppingListEl(shoppingListEl)
    shoppingListArray.map(item => {
      addItemToCart(shoppingListEl, item)
    })
  } else {
    shoppingListEl.innerHTML = `<p>No Items here...yet</p>`
  }
  
})

function addItemToCart(element, item){
  let newEl = document.createElement('li');
  newEl.classList.add('list-item');
  let groceryItem = item[0];
  newEl.textContent = item[1];
  newEl.addEventListener('dblclick',(event)=>{
    let exactLocationOfItemInBD = ref(database, `shoppingList/${groceryItem}` )
  
      remove(exactLocationOfItemInBD);
  })
  element.append(newEl)
}

AddToCartBTN.addEventListener('click', ()=> {
  let inputValue = AddToCartInput.value;
  if(inputValue){
    push(shoppingListInDB, inputValue);
  } 
  clearInputField(AddToCartInput);
})