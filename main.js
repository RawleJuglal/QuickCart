import './style.css'
import { clearInputField, addItemToCart, clearShoppingListEl } from './functions';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

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
  let shoppingListArray = Object.entries(snapshot.val());
  clearShoppingListEl(shoppingListEl)
  shoppingListArray.map(item => {
    addItemToCart(shoppingListEl, item)
  })
})

AddToCartBTN.addEventListener('click', ()=> {
  let inputValue = AddToCartInput.value;
  push(shoppingListInDB, inputValue);
  clearInputField(AddToCartInput);
  // addItemToCart(inputValue);
})