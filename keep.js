


// Js

  //3 Dots

  //dont allow the options svg to disapear when click on li
  const liText = document.createElement('span');
  liText.className ='liTextSpan';
  liText.textContent = card.word;
  li.appendChild(liText);

   //options btn svg inside every li dynamically created
  
    const openModalBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    openModalBtn.setAttribute("viewBox", "0 0 640 640");

    const openModalBtnPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    openModalBtnPath.setAttribute('d', "M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z");
  
    openModalBtn.classList.add('open-modal');

    openModalBtn.appendChild(openModalBtnPath);
   
    li.appendChild(openModalBtn);

//modal  inside every options button -> inside every li dynamically created

  //modal
    const modal = document.createElement('div');
    modal.className = "modal";
    
    
  //appendmodal to body
    body.appendChild(modal);
   
  //rest of modal
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeModalBtn = document.createElement('span');
    closeModalBtn.className = 'close';
    closeModalBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    const modalAction = document.createElement('div');
    modalAction.className = 'modal-actions';

    const edit = document.createElement('div');
    edit.className = 'modal-action';
    edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i><span>Edit</span>';

    const del = document.createElement('div');
    del.className = 'modal-action';
    del.innerHTML = '<i class="fa-solid fa-trash"></i><span>Delete</span>';

    //append
    modalAction.append(edit, del);
    modalContent.append(closeModalBtn, modalAction);
    modal.appendChild(modalContent);
    


//open modal for each card
function openFor(button, card) {
  const r = button.getBoundingClientRect();
  modal.style.left = r.right + 13 + 'px';
  modal.style.top  = r.top + -10 + 'px';
  modal.dataset.cardId = card.id;    // remember which card
  modal.style.display = 'block';
}

function closeModal()
{ modal.style.display = 'none'; }

openModalBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  openFor(openModalBtn, card);
});

closeModalBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  closeModal()
})
// outside click to close
document.addEventListener('click', (e) => {
  if (!modal.contains(e.target)) closeModal();
});



//css

/*

==============
Options button
==============

*/


.open-modal {
fill: var(--primary-color); 
height: 30px;
cursor: pointer;
position: absolute;
right: 5px;
cursor: pointer;


}
.open-modal:hover {
fill: var(--clr-primary-5); 

}

/*
==============
Modal
==============

*/

.modal {
  position: fixed;
  display: none; 
  position: fixed; 
  z-index: 1; 
  left: 40rem;
  top: 0;
  width: 7rem; 
  height: 7rem; 
  overflow: auto; 
 
}

/* Modal Content/Box */
.modal-content {
  position: relative;          
  width: 7rem;
  height: 7rem;
  padding: 16px;               
  border: 2px solid var(--primary-color);
  border-radius: 10%;
  background: white;

  display: flex;               
}

/* The Close Button */
.close {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 20px;
  cursor: pointer;
  color: var(--primary-color);
}

.close:hover,
.close:focus {
  color: rgba(255, 0, 0, 0.5);
  text-decoration: none;
  cursor: pointer;
}

/* wrapper that holds EDIT/DELETE */
.modal-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;     
  align-items: flex-start;     
  gap: 10px;                   
  width: 100%;
}

/* style + font for the two rows */
.modal-action {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Excalifont", "Roboto", sans-serif;  /* <- change font here */
  font-size: 14px;
  color: var(--primary-color);
  cursor: pointer;
}

.modal-action:hover { color: var(--clr-primary-5); }























/* 
=========

js code

=========
*/









/*
=============

PAGE 1
&
GENERAL

============

*/

// Variables
const arrowRight = document.querySelector(".arrowRight");
const arrowLeft = document.querySelector(".arrowLeft");
const titleHome = document.querySelector("#titleHome");
const darkModeToggle = document.querySelector("#darkModeToggle");
const body = document.body;

const textArea = document.querySelector("textArea");
const wordTextArea = document.querySelector("#wordTextArea");
const definitionTextArea = document.querySelector("#definitionTextArea");
const learnBtn = document.querySelector("#learnBtn")

const cardsLibrary = document.querySelector("#cardsLibrary")

let currentPage = parseInt(localStorage.getItem("currentPage")) || 0;
let theme = parseInt(localStorage.getItem("theme",));

// Array
const pagesArray = [
"index.html",
"cards.html",
"random.html"
];

// Functions

function nextPage() {
let currentPage = parseInt(localStorage.getItem("currentPage")) || 0 ;
//transform this into a loop
if (currentPage < pagesArray.length && currentPage !== pagesArray.length -1 ) {
currentPage++;
localStorage.setItem("currentPage", currentPage)
window.location.href = pagesArray[currentPage];    
} 

}

function previousPage() { 
let currentPage = parseInt(localStorage.getItem("currentPage")) || 0;
if (currentPage >= 0  && currentPage !== 0) {
currentPage--;
localStorage.setItem("currentPage", currentPage); 
window.location.href = pagesArray[currentPage];    
}
if(currentPage > 0 || currentPage > pagesArray.length -1)
  {arrowLeft.disabled = true;
  arrowRight.disabled = true; }
}


// Event listeners
arrowRight.addEventListener ("click", nextPage);

arrowLeft.addEventListener ("click", previousPage);

titleHome.addEventListener ("click", function (){
localStorage.removeItem("currentPage");
});

//darkmode
darkModeToggle.addEventListener("click", function() {
body.classList.toggle("dark-mode");
if(body.classList.contains("dark-mode")){
localStorage.setItem("theme", JSON.stringify("darkmode"));
}
else {localStorage.setItem("theme", JSON.stringify("ligthmode"));}
})

// Local storage dark mode when refresh page
window.addEventListener("DOMContentLoaded",function keepThemeWhenRefresh(){

if (localStorage.getItem("theme") === JSON.stringify ("ligthmode")){
body.classList.remove("dark-mode")
}
})

/*
=======

PAGE 2

=======

*/

//Class
class Card {
constructor(word, definition) {
this.word = word;
this.definition = definition;
}
}

//focus area to text area
if (window.location.pathname.includes("index.html")){
document.addEventListener("DOMContentLoaded",function cursorFocusWhenRefresh(){
wordTextArea.focus();
})

document.addEventListener("click",function cursorFocusWhenClickAnywhere(){
wordTextArea.focus();
})

textArea.addEventListener("keydown", function jumpToNextTextArea(event){
if(event.key === "Enter"){
event.preventDefault();
textArea.nextElementSibling.focus();
}
})
}

//array
let cardsArray = JSON.parse(localStorage.getItem("cardsArray")) || [];



// Functions

function newCardCreation(){
let wordTextValue = wordTextArea.value;
let definitionTextValue = definitionTextArea.value;
if(wordTextValue != '' && definitionTextValue != ''){
  cardsArray.push(new Card(wordTextValue, definitionTextValue));
  console.log(cardsArray);
  saveToLocalStorage();
  }
}

// 1 long function
function turnArrayCardIntoLi() {
  const cardsArray = JSON.parse(localStorage.getItem("cardsArray")) || [];

  cardsArray.forEach(function(card) {
    const li = document.createElement("li");
    let showingWord = true; 

    li.textContent = card.word;
    
    //when li is clicked = switch between displaying word or definition - make this work when in cards.html
    if (window.location.pathname.includes("cards.html")) {
      li.addEventListener("click", () => {
        if (showingWord) {
          li.textContent = card.definition;
        } else {
          li.textContent = card.word;
        }
        showingWord = !showingWord; //kinda understand this
      });
    }

    cardsLibrary.appendChild(li);
  });
}

//call function turnArrayCardIntoLi to work when in cards.html
if (window.location.pathname.includes("cards.html")) {
turnArrayCardIntoLi();
}

//make learn button  work when in index.html
if (window.location.pathname.includes("index.html")){
learnBtn.addEventListener("click",newCardCreation)

//saves to local storage, shouldn't it be in general scope? but when remove it from there = bug??
function saveToLocalStorage() {
localStorage.setItem("cardsArray", JSON.stringify(cardsArray));

//clears both text areas when learn button is clicked
wordTextArea.value = '';
definitionTextArea.value = '';
}
}




   //open modal 
      openModalBtn.addEventListener("click", function openModal(event){
       event.stopPropagation();
       
      const modalPosition = modal.getBoundingClientRect();
      
      modal.style.left = modalPosition.right + 8 + 'px';
      modal.style.top = modalPosition.top + 'px';
      modal.dataset.cardId = card.id;  
      modal.style.display = 'block';

      console.log('Top:', modalPosition.top);
      console.log('Left:', modalPosition.left);
      console.log('Width:', modalPosition.width);
      console.log('Height:', modalPosition.height);
    })

    //close modal 
    closeModalBtn.addEventListener("click", function closeModal(event){
      event.stopPropagation();
      modal.style.display = 'none';
    })





 li.addEventListener("dblclick", editCard)

    function editCard(index){
  const inputElement = document.createElement("input"); //create an input field
  const existingText = cardsLibrary[index].word;
  liText.replaceWith(inputElement);
  inputElement.value = existingText;
  inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if(updatedText) {
            cardsLibrary[index].word = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });

  };











  for (let index = 0; index < array.length; index++) {
  const card = array[index]; // Assuming array is defined
  console.log(index, card.word, card.definition);
}








const storedCards = JSON.parse(localStorage.getItem("cardsArray")) || [];
 








inputElement.type = 'text';











console.log(Card.wordTextValue);
console.log(JSON.parse(localStorage.getItem('cardsArray'))[index])
console.log('index?', index, 'word?', cardsArray[index]?.word);
console.log('editing field:', li.dataset.showing);














const cardsArray2 = JSON.parse(cardsArray[index]);



function normalizeCards(arr) {
  return arr.map(c =>
    typeof c === "string"
      ? { word: c, definition: "" }
      : { word: c.word ?? "", definition: c.definition ?? "" }
  );
}

cardsArray = normalizeCards(cardsArray);
localStorage.setItem("cardsArray", JSON.stringify(cardsArray));










console.log(liText.firstChild)





















definitionTextArea.addEventListener("click",function cursorFocusDefinitonWhenDefinitionIsClicked(){
definitionTextArea.focus();

})

document.addEventListener("click",function cursorFocusWhenClickAnywhere(){
wordTextArea.focus();
})










// if (window.location.pathname.includes("index.html")){
// document.addEventListener("DOMContentLoaded",function cursorFocusWhenRefresh(){
// wordTextArea.focus();
// })

// try {
// document.addEventListener("click",function cursorFocusWhenClickAnywhere(event){
//   if(event.target === document){
// wordTextArea.focus()}
//   })
// }
//   catch {
//     function cursorFocusDefinitonWhenDefinitionIsClicked(event){
// if(event.target === definitionTextArea){
//   definitionTextArea.focus();
// }
//     }
//     finally {
//       wordTextArea.focus()

//     }

// textArea.addEventListener("keydown", function jumpToNextTextArea(event){
// if(event.key === "Enter"){
// event.preventDefault();
// textArea.nextElementSibling.focus();
// }
// })

//   }}





// let isEditing = true;
 liText.addEventListener("dblclick", editCard);

//FUNCTION edit card
 function editCard(){
  if (li.querySelector('.edit-input')) return;
  
  const inputElement = document.createElement('input');
  inputElement.className = 'edit-input';
  const existingText = liText.textContent

   inputElement.value = existingText;
    liText.replaceWith(inputElement);

    inputElement.focus();

      //function save edit
    function saveEdit(){
      
      const updatedText = inputElement.value.trim();
        const field = li.dataset.showing || 'word';
        let cardsArray = JSON.parse(localStorage.getItem('cardsArray')) || [];
        //debugging
        console.log(cardsArray[index]);
        console.log(cardsArray);

        cardsArray[index][field] = updatedText; 
          localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
        liText.textContent = cardsArray[index][field];
        if (inputElement.isConnected && inputElement.parentNode) {
        inputElement.replaceWith(liText);
        

        console.log('connected?', liText.isConnected, liText.textContent);
        }
        }  

//event listeners to quit edit mode

const eventTypes = ['blur', 'keydown'];

let saved = false;

function handle(e) {
  // If it's a keydown, only act on Enter
  if (e.type === 'keydown') {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    // Optionally move focus away so the input closes
    inputElement.blur(); // will trigger 'blur', but the guard below stops double-save
  }

  // Save exactly once (covers both Enter and blur)
  if (saved) return;
  saved = true;
  saveEdit();

  // Cleanup listeners for this input to avoid leaks
  eventTypes.forEach(t => inputElement.removeEventListener(t, handle));
}

// Attach the same handler to both events
eventTypes.forEach(t => inputElement.addEventListener(t, handle));


}



li.id = `card-${cardsArray++}`;






//delete button
let deleteCardBtn = document.querySelector(".deleteCardBtn")
deleteCardBtn.addEventListener('click', function deleteCard(event){
   const id = li.dataset.id = card.id;
  const i = cardsArray.findIndex(currentElement => currentElement.id === id)
  cardsArray.splice(i, 1);
  localStorage.setItem('cardsArray', JSON.stringify(cardsArray))
  event.target.closest('li');

});




//css input

input{
  border: none;
  outline: none;  
width: 85%;
height: auto;
min-height: 7rem;

white-space: normal;
display: block;                 /* no flex centering */
padding: 7px 7px;        /* top/right/bottom/left – add real breathing room */
box-sizing: border-box;         /* padding stays inside width */
line-height: 1.32;              /* prevent ascender/descender clipping */
overflow-y: auto;              
overflow-x: hidden;             
word-break: break-word; 
text-align: justify; 
text-justify: inter-word; 
}
.edit-input {
    
    padding: 1.25rem;
    font-size: 24px;
    font-family: "Excalifont";
    background-color: transparent;
    color: var(--primary-color);
    text-align: center;
    caret-color: var(--clr-primary-5) ;
position: absolute;
width: 80%;
top: 0px;
left: 50%;
transform: translateY(-50%);
transform: translateX(-50%);
cursor: text;
pointer-events: none;
}






/*
=============

PAGE 1
&
GENERAL

============

*/

// Variables
const arrowRight = document.querySelector(".arrowRight");
const arrowLeft = document.querySelector(".arrowLeft");
const titleHome = document.querySelector("#titleHome");
const darkModeToggle = document.querySelector("#darkModeToggle");
const body = document.body;

const textArea = document.querySelector("textArea");
const wordTextArea = document.querySelector("#wordTextArea");
const definitionTextArea = document.querySelector("#definitionTextArea");
const learnBtn = document.querySelector("#learnBtn")

const cardsLibrary = document.querySelector("#cardsLibrary")
// const openModalBtn = document.querySelector("#openModalBtn")


let currentPage = parseInt(localStorage.getItem("currentPage")) || 0;
let theme = parseInt(localStorage.getItem("theme",));

// Array
const pagesArray = [
"index.html",
"cards.html",
"random.html"
];

// Functions

function nextPage() {
let currentPage = parseInt(localStorage.getItem("currentPage")) || 0 ;
//transform this into a loop
if (currentPage < pagesArray.length && currentPage !== pagesArray.length -1 ) {
currentPage++;
localStorage.setItem("currentPage", currentPage)
window.location.href = pagesArray[currentPage];    
} 

}

function previousPage() { 
let currentPage = parseInt(localStorage.getItem("currentPage")) || 0;
if (currentPage >= 0  && currentPage !== 0) {
currentPage--;
localStorage.setItem("currentPage", currentPage); 
window.location.href = pagesArray[currentPage];    
}
if(currentPage > 0 || currentPage > pagesArray.length -1)
  {arrowLeft.disabled = true;
  arrowRight.disabled = true; }
}


// Event listeners
arrowRight.addEventListener ("click", nextPage);

arrowLeft.addEventListener ("click", previousPage);

titleHome.addEventListener ("click", function (){
localStorage.removeItem("currentPage");
});

//darkmode
darkModeToggle.addEventListener("click", function() {
body.classList.toggle("dark-mode");
if(body.classList.contains("dark-mode")){
localStorage.setItem("theme", JSON.stringify("darkmode"));
}
else {localStorage.setItem("theme", JSON.stringify("ligthmode"));}
})

// Local storage dark mode when refresh page
window.addEventListener("DOMContentLoaded",function keepThemeWhenRefresh(){

if (localStorage.getItem("theme") === JSON.stringify ("ligthmode")){
body.classList.remove("dark-mode")
}
})

/*
=======

PAGE 2

=======

*/

//Class
class Card {
constructor(word, definition) {
this.word = word;
this.definition = definition;
}
}

//focus area to text area
if (window.location.pathname.includes("index.html")){
document.addEventListener("DOMContentLoaded",function cursorFocusWhenRefresh(){
wordTextArea.focus();
})


textArea.addEventListener("keydown", function jumpToNextTextArea(event){
if(event.key === "Enter" || event.key === "click" ){
event.preventDefault();
definitionTextArea.focus();
}
})

document.addEventListener("click",function cursorFocusDefinitonWhenDefinitionIsClicked(event){
if(event.target === definitionTextArea){
  definitionTextArea.focus();
} else{wordTextArea.focus();}

})

}

//array
let cardsArray = JSON.parse(localStorage.getItem("cardsArray")) ?? [];
function normalizeCards(arr) {
  return arr.map(c =>
    typeof c === "string"
      ? { word: c, definition: "" }
      : { word: c.word ?? "", definition: c.definition ?? "" }
  );
}

// Run migration only if there are strings present
if (cardsArray.some(c => typeof c === "string")) {
  cardsArray = normalizeCards(cardsArray);
  localStorage.setItem("cardsArray", JSON.stringify(cardsArray));
}


// Functions

function newCardCreation(){
let wordTextValue = wordTextArea.value;
let definitionTextValue = definitionTextArea.value;
if(wordTextValue != '' && definitionTextValue != ''){
  cardsArray.push(new Card(wordTextValue, definitionTextValue));
  console.log(cardsArray);
  saveToLocalStorage();
  }
}

// 1 long function
function turnArrayCardIntoLi() {
 

  cardsArray.forEach(function(card, index) {
    const li = document.createElement("li");
     li.id = `card-${index}`;
    li.dataset.index = index;
    
    let showingWord = true; 
  //3 Dots
  const liText = document.createElement('span'); //dont allow the options svg to disapear when click on li
  liText.className ='liTextSpan';
  // liText.textContent[word].className = 'liWord';    here I want to add a separate class to word and definition so I can change font size for each individually
  // liText.firstChild.className = 'liWord';
  liText.textContent = card.word;
  liText.style.fontSize = "24px";
  li.appendChild(liText);
 

   //options btn svg inside every li dynamically created
  
    const openModalBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    openModalBtn.setAttribute("viewBox", "0 0 640 640");

    const openModalBtnPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    openModalBtnPath.setAttribute('d', "M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z");
  
    openModalBtn.classList.add('open-modal');

    openModalBtn.appendChild(openModalBtnPath);
   
    li.appendChild(openModalBtn);

//modal  inside every options button -> inside every li dynamically created

  //modal
    const modal = document.createElement('div');
    modal.className = "modal";
    
    
  //appendmodal to body
    body.appendChild(modal);
   
  //rest of modal
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeModalBtn = document.createElement('span');
    closeModalBtn.className = 'close';
    closeModalBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    const modalAction = document.createElement('div');
    modalAction.className = 'modal-actions';

    const edit = document.createElement('div');
    edit.className = 'modal-action';
    edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i><span id="editCardBtn">Edit</span>';
   

    const del = document.createElement('div');
    del.className = 'modal-action';
    del.innerHTML = '<i class="fa-solid fa-trash"></i><span class="deleteCardBtn">Delete</span>';
     
    //append
    modalAction.append(edit, del);
    modalContent.append(closeModalBtn, modalAction);
    modal.appendChild(modalContent);
    

//open modal for each card
function openModalForEachCard(button, card) {
  const r = button.getBoundingClientRect();
  modal.style.left = r.right + 13 + 'px';
  modal.style.top  = r.top + -10 + 'px';
  modal.dataset.cardId = card.id;    // remember which card
  modal.style.display = 'block';
}


function closeModal()
{ modal.style.display = 'none'; }

openModalBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  openModalForEachCard(openModalBtn, card);
});

closeModalBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  closeModal()
})
// outside click to close
document.addEventListener('click', (e) => {
  if (!modal.contains(e.target)) closeModal();
});


    //function toggleWordAndDefinition
    if (window.location.pathname.includes("cards.html")) {
      li.addEventListener("click", function toggleWordAndDefinition(){
        if (showingWord) {
          liText.textContent = card.definition;
          li.dataset.showing = 'definition';

        } else {
          liText.textContent = card.word;
          li.dataset.showing = 'word';

        }
        showingWord = !showingWord; //? kinda understand this
      });  
      
    }

    cardsLibrary.appendChild(li);
    
// let isEditing = true;
 liText.addEventListener("dblclick", editCard);

//FUNCTION edit card
 function editCard(){
  if (li.querySelector('.edit-input')) return;
  
  const inputElement = document.createElement('input');
  inputElement.className = 'edit-input';
  const existingText = liText.textContent

   inputElement.value = existingText;
    liText.replaceWith(inputElement);

    inputElement.focus();

      //function save edit
    function saveEdit() {
  const updatedText = inputElement.value.trim();
  const fieldAtStart = li.dataset.showing || 'word'; // lock the field

   console.log(cardsArray[index]);
        console.log(cardsArray);
  // 1) Update the live objects
  card[fieldAtStart] = updatedText;          // the object used by the <li>
  

  // 2) update the array using the stored index
    const i = Number(li.dataset.index);
    if (Number.isInteger(i) && cardsArray[i]) {
      cardsArray[i][fieldAtStart] = updatedText;
    }

    localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
    liText.textContent = updatedText;
    if (inputElement.isConnected) inputElement.replaceWith(liText);
  }

//event listeners to quit edit mode

const events = ['blur', 'keydown'];

let saved = false;

function handle(e){
  if (e.type === 'keydown' && e.key !== 'Enter') return;
  if (e.type === 'keydown') e.preventDefault(); // avoid submitting / toggling
  if (saved) return;                             // guard
  saved = true;
  saveEdit();
  events.forEach(t => inputElement.removeEventListener(t, handle));
}

events.forEach(t => inputElement.addEventListener(t, handle));


}



let deleteCardBtn = document.querySelector(".deleteCardBtn")
deleteCardBtn.addEventListener('click', function deleteCard(event){
  let deleteCardBtn = document.querySelector(".deleteCardBtn")
deleteCardBtn.addEventListener('click', function deleteCard(event){
   
  const i = cardsArray.findIndex(currentElement => currentElement.id === id)
  cardsArray.splice(i, 1);
  localStorage.setItem('cardsArray', JSON.stringify(cardsArray))
  

});
   const id = li.dataset.id = card.id;
  const i = cardsArray.findIndex(currentElement => currentElement.id === id)
  cardsArray.splice(i, 1);
  localStorage.setItem('cardsArray', JSON.stringify(cardsArray))
  event.target.closest('li');

});

  }); //ends this : cardsArray.forEach(function(card, index) {

  
 
}; // 1 long function ends here and it ends this: function turnArrayCardIntoLi() {






//call function turnArrayCardIntoLi to work when in cards.html
if (window.location.pathname.includes("cards.html")) {
turnArrayCardIntoLi();
}

//make learn button  work when in index.html
if (window.location.pathname.includes("index.html")){
learnBtn.addEventListener("click",newCardCreation)

//saves to local storage, shouldn't it be in general scope? but when remove it from there = bug??
function saveToLocalStorage() {
localStorage.setItem("cardsArray", JSON.stringify(cardsArray));

//clears both text areas when learn button is clicked
wordTextArea.value = '';
definitionTextArea.value = '';
}
}

/*☑️How to fix (conceptually—no full code):

When editing starts, capture the field you intended to edit (e.g., const fieldAtStart = li.dataset.showing || 'word') and use that constant inside saveEdit, not the live li.dataset.showing.

Also suppress the toggle while editing: either set a flag isEditing = true and early-return in the <li> click handler, or attach click on the input with event.stopPropagation() so the click never reaches the <li>.

If you do both, clicking again on the word during editing won’t flip the mode, and your blur handler will always save to the correct property.

*/





let deleteCardBtn = document.querySelector(".deleteCardBtn")
deleteCardBtn.addEventListener('click', function deleteCard(event){
  let deleteCardBtn = document.querySelector(".deleteCardBtn")
deleteCardBtn.addEventListener('click', function deleteCard(event){
   
  const i = cardsArray.findIndex(currentElement => currentElement.id === id)
  cardsArray.splice(i, 1);
  localStorage.setItem('cardsArray', JSON.stringify(cardsArray))
});

 const id = li.dataset.id = card.id;
  const i = cardsArray.findIndex(currentElement => currentElement.id === id)
  cardsArray.splice(i, 1);
  localStorage.setItem('cardsArray', JSON.stringify(cardsArray))
  event.target.closest('li');

});


let deleteCardBtn = document.querySelector(".deleteCardBtn")

deleteCardBtn.addEventListener('click', function deleteCard(event){
 event.stopPropagation();
 event.target.closest('li').remove();
 li.dataset.index;
  const i = cardsArray.findIndex(currentElement => currentElement.index === index)
  cardsArray.splice(i, 1);
  localStorage.setItem('cardsArray', JSON.stringify(cardsArray))
   li.remove() 

});


/*
==============
Modal
==============

*/

.modal {
  position: fixed;
  display: none; 
  position: fixed; 
  z-index: 1; 
  left: 40rem;
  top: 0;
  width: 7rem; 
  height: 7rem; 
  overflow: auto; 
 
}

/* Modal Content/Box */
.modal-content {
  position: relative;          
  width: 7rem;
  height: 7rem;
  padding: 16px;               
  border: 2px solid var(--primary-color);
  border-radius: 10%;
  background: white;

  display: flex;               
}

/* The Close Button */
.close {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 20px;
  cursor: pointer;
  color: var(--primary-color);
}

.close:hover,
.close:focus {
  color: rgba(255, 0, 0, 0.5);
  text-decoration: none;
  cursor: pointer;
}

/* wrapper that holds EDIT/DELETE */
.modal-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;     
  align-items: flex-start;     
  gap: 10px;                   
  width: 100%;
}

/* style + font for the two rows */
.modal-action {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Excalifont", "Roboto", sans-serif;  /* <- change font here */
  font-size: 14px;
  color: var(--primary-color);
  cursor: pointer;
}

.modal-action:hover { color: var(--clr-primary-5); }

/*












/*
=============

PAGE 1
&
GENERAL

============

*/

// Variables
const arrowRight = document.querySelector(".arrowRight");
const arrowLeft = document.querySelector(".arrowLeft");
const titleHome = document.querySelector("#titleHome");
const darkModeToggle = document.querySelector("#darkModeToggle");
const body = document.body;

const textArea = document.querySelector("textArea");
const wordTextArea = document.querySelector("#wordTextArea");
const definitionTextArea = document.querySelector("#definitionTextArea");
const learnBtn = document.querySelector("#learnBtn")

const cardsLibrary = document.querySelector("#cardsLibrary")
// const openModalBtn = document.querySelector("#openModalBtn")


let currentPage = parseInt(localStorage.getItem("currentPage")) || 0;
let theme = parseInt(localStorage.getItem("theme",));

// Array
const pagesArray = [
"index.html",
"cards.html",
"random.html"
];

// Functions

function nextPage() {
let currentPage = parseInt(localStorage.getItem("currentPage")) || 0 ;
//transform this into a loop
if (currentPage < pagesArray.length && currentPage !== pagesArray.length -1 ) {
currentPage++;
localStorage.setItem("currentPage", currentPage)
window.location.href = pagesArray[currentPage];    
} 

}

function previousPage() { 
let currentPage = parseInt(localStorage.getItem("currentPage")) || 0;
if (currentPage >= 0  && currentPage !== 0) {
currentPage--;
localStorage.setItem("currentPage", currentPage); 
window.location.href = pagesArray[currentPage];    
}
if(currentPage > 0 || currentPage > pagesArray.length -1)
  {arrowLeft.disabled = true;
  arrowRight.disabled = true; }
}


// Event listeners
arrowRight.addEventListener ("click", nextPage);

arrowLeft.addEventListener ("click", previousPage);

titleHome.addEventListener ("click", function (){
localStorage.removeItem("currentPage");
});

//darkmode
darkModeToggle.addEventListener("click", function() {
body.classList.toggle("dark-mode");
if(body.classList.contains("dark-mode")){
localStorage.setItem("theme", JSON.stringify("darkmode"));
}
else {localStorage.setItem("theme", JSON.stringify("ligthmode"));}
})

// Local storage dark mode when refresh page
window.addEventListener("DOMContentLoaded",function keepThemeWhenRefresh(){

if (localStorage.getItem("theme") === JSON.stringify ("ligthmode")){
body.classList.remove("dark-mode")
}
})

/*
=======

PAGE 2

=======

*/

//Class
class Card {
constructor(word, definition) {
this.word = word;
this.definition = definition;
}
}

//focus area to text area
if (window.location.pathname.includes("index.html")){
document.addEventListener("DOMContentLoaded",function cursorFocusWhenRefresh(){
wordTextArea.focus();
})


textArea.addEventListener("keydown", function jumpToNextTextArea(event){
if(event.key === "Enter" || event.key === "click" ){
event.preventDefault();
definitionTextArea.focus();
}
})

document.addEventListener("click",function cursorFocusDefinitonWhenDefinitionIsClicked(event){
if(event.target === definitionTextArea){
  definitionTextArea.focus();
} else{wordTextArea.focus();}

})

}

//array
let cardsArray = JSON.parse(localStorage.getItem("cardsArray")) ?? [];
function normalizeCards(arr) {
  return arr.map(c =>
    typeof c === "string"
      ? { word: c, definition: "" }
      : { word: c.word ?? "", definition: c.definition ?? "" }
  );
}

// Run migration only if there are strings present
if (cardsArray.some(c => typeof c === "string")) {
  cardsArray = normalizeCards(cardsArray);
  localStorage.setItem("cardsArray", JSON.stringify(cardsArray));
}


// Functions

function newCardCreation(){
let wordTextValue = wordTextArea.value;
let definitionTextValue = definitionTextArea.value;
if(wordTextValue != '' && definitionTextValue != ''){
  cardsArray.push(new Card(wordTextValue, definitionTextValue));
  console.log(cardsArray);
  saveToLocalStorage();
  }
}

// 1 long function
function turnArrayCardIntoLi() {
 

  cardsArray.forEach(function(card, index) {
    const li = document.createElement("li");
     li.id = `card-${index}`;
    li.dataset.index = index;
    
    let showingWord = true; 
  //3 Dots
  const liText = document.createElement('span'); //dont allow the options svg to disapear when click on li
  liText.className ='liTextSpan';
  // liText.textContent[word].className = 'liWord';    here I want to add a separate class to word and definition so I can change font size for each individually
  // liText.firstChild.className = 'liWord';
  liText.textContent = card.word;
  liText.style.fontSize = "24px";
  li.appendChild(liText);
 

   //options btn svg inside every li dynamically created
  
    const openModalBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    openModalBtn.setAttribute("viewBox", "0 0 640 640");

    const openModalBtnPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    openModalBtnPath.setAttribute('d', "M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z");
  
    openModalBtn.classList.add('open-modal');

    openModalBtn.appendChild(openModalBtnPath);
   
    li.appendChild(openModalBtn);

//modal  inside every options button -> inside every li dynamically created

  //modal
    const modal = document.createElement('div');
    modal.className = "modal";
    
    
  //appendmodal to body
    body.appendChild(modal);
   
  //rest of modal
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeModalBtn = document.createElement('span');
    closeModalBtn.className = 'close';
    closeModalBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    const modalAction = document.createElement('div');
    modalAction.className = 'modal-actions';

    const edit = document.createElement('div');
    edit.className = 'modal-action';
    edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i><span id="editCardBtn">Edit</span>';
   

    const del = document.createElement('div');
    del.className = 'modal-action';
    del.innerHTML = '<i class="fa-solid fa-trash"></i><span class="deleteCardBtn">Delete</span>';
     
    //append
    modalAction.append(edit, del);
    modalContent.append(closeModalBtn, modalAction);
    modal.appendChild(modalContent);
    

//open modal for each card
function openModalForEachCard(button, card) {
  const r = button.getBoundingClientRect();
  modal.style.left = r.right + 13 + 'px';
  modal.style.top  = r.top + -10 + 'px';
  modal.dataset.cardId = card.id;    // remember which card
  modal.style.display = 'block';
}


function closeModal()
{ modal.style.display = 'none'; }

openModalBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  openModalForEachCard(openModalBtn, card);
});

closeModalBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  closeModal()
})
// outside click to close
document.addEventListener('click', (e) => {
  if (!modal.contains(e.target)) closeModal();
});


    //function toggleWordAndDefinition
    if (window.location.pathname.includes("cards.html")) {
      li.addEventListener("click", function toggleWordAndDefinition(){
         if (li.classList.contains('editing')) return;
        if (showingWord) {
          liText.textContent = card.definition;
          li.dataset.showing = 'definition';

        } else {
          liText.textContent = card.word;
          li.dataset.showing = 'word';

        }
        showingWord = !showingWord; //? kinda understand this
      });  
      
    }

    cardsLibrary.appendChild(li);
    
// let isEditing = true;
 liText.addEventListener("dblclick", (e) => {
  e.stopPropagation();      // block the two prior clicks from reaching <li>
  editCard();
});

//FUNCTION edit card
 function editCard(){

  if (li.querySelector('.edit-input')) return;

  const inputElement = document.createElement('input');
  inputElement.className = 'edit-input';
   inputElement.value = liText.textContent;
  // const existingText = liText.textContent

  li.classList.add("editing");

  inputElement.addEventListener('mousedown', function(e){
    e.stopPropagation()});
  inputElement.addEventListener('click', function(e){
    e.stopPropagation()});
  inputElement.addEventListener('dblclick', function(e){
    e.stopPropagation()
  inputElement.select(); // Select all text on double click  !!! also add functionality so can dbl click and select 1 word only 
  });
  
  //  inputElement.value = existingText;
    liText.replaceWith(inputElement);
    inputElement.focus();

      //function save edit
    function saveEdit() {
  const updatedText = inputElement.value.trim();
  const fieldAtStart = li.dataset.showing || 'word'; // lock the field

   console.log(cardsArray[index]);
        console.log(cardsArray);
  // 1) Update the live objects
  card[fieldAtStart] = updatedText;          // the object used by the <li>
  

  // 2) update the array using the stored index
    const i = Number(li.dataset.index);
    if (Number.isInteger(i) && cardsArray[i]) {
      cardsArray[i][fieldAtStart] = updatedText;
    }

    localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
    liText.textContent = updatedText;
    if (inputElement.isConnected) inputElement.replaceWith(liText);

       li.classList.remove('editing');
  
  }

//event listeners to quit edit mode

const events = ['blur', 'keydown'];

let saved = false;

function handle(e){
  if (e.type === 'keydown' && e.key !== 'Enter') return;
  if (e.type === 'keydown') e.preventDefault(); // avoid submitting / toggling
  if (saved) return;                             // guard
  saved = true;
  saveEdit();
  events.forEach(t => inputElement.removeEventListener(t, handle));
}

events.forEach(t => inputElement.addEventListener(t, handle));


};



let deleteCardBtn = document.querySelector(".deleteCardBtn")
deleteCardBtn.addEventListener('click', function deleteCard(event){
  let deleteCardBtn = document.querySelector(".deleteCardBtn")
deleteCardBtn.addEventListener('click', function deleteCard(event){
   
  const i = cardsArray.findIndex(currentElement => currentElement.id === id)
  cardsArray.splice(i, 1);
  localStorage.setItem('cardsArray', JSON.stringify(cardsArray))
  

});
   const id = li.dataset.id = card.id;
  const i = cardsArray.findIndex(currentElement => currentElement.id === id)
  cardsArray.splice(i, 1);
  localStorage.setItem('cardsArray', JSON.stringify(cardsArray))
  event.target.closest('li');

});

  }); //ends this : cardsArray.forEach(function(card, index) {

  
 
}; // 1 long function ends here and it ends this: function turnArrayCardIntoLi() {






//call function turnArrayCardIntoLi to work when in cards.html
if (window.location.pathname.includes("cards.html")) {
turnArrayCardIntoLi();
}

//make learn button  work when in index.html
if (window.location.pathname.includes("index.html")){
learnBtn.addEventListener("click",newCardCreation)

//saves to local storage, shouldn't it be in general scope? but when remove it from there = bug??
function saveToLocalStorage() {
localStorage.setItem("cardsArray", JSON.stringify(cardsArray));

//clears both text areas when learn button is clicked
wordTextArea.value = '';
definitionTextArea.value = '';
}
}

/*☑️How to fix (conceptually—no full code):

When editing starts, capture the field you intended to edit (e.g., const fieldAtStart = li.dataset.showing || 'word') and use that constant inside saveEdit, not the live li.dataset.showing.

Also suppress the toggle while editing: either set a flag isEditing = true and early-return in the <li> click handler, or attach click on the input with event.stopPropagation() so the click never reaches the <li>.

If you do both, clicking again on the word during editing won’t flip the mode, and your blur handler will always save to the correct property.

okyeah
*/

//add capitalization to the word not the definition















//================================================================================================================






/* ============== GENERAL (both pages) ============== */

// DOM
const arrowRight = document.querySelector(".arrowRight");
const arrowLeft  = document.querySelector(".arrowLeft");
const titleHome  = document.querySelector("#titleHome");
const darkModeToggle = document.querySelector("#darkModeToggle");
const body = document.body;

// Page flags
const onIndex = window.location.pathname.includes("index.html");
const onCards = window.location.pathname.includes("cards.html");

// Simple pager
const pages = ["index.html", "cards.html", "random.html"];
function getCurrentPage() { return Number(localStorage.getItem("currentPage")) || 0; }
function setCurrentPage(i) { localStorage.setItem("currentPage", String(i)); }
function goto(i){ setCurrentPage(i); window.location.href = pages[i]; }

function nextPage() {
  const i = getCurrentPage();
  if (i < pages.length - 1) goto(i + 1);
}
function previousPage() {
  const i = getCurrentPage();
  if (i > 0) goto(i - 1);
}

// Nav events
arrowRight?.addEventListener("click", nextPage);
arrowLeft?.addEventListener("click", previousPage);
titleHome?.addEventListener("click", () => localStorage.removeItem("currentPage"));

// Dark mode (persisted)
const THEME_KEY = "theme";           // "darkmode" | "lightmode"
function applyThemeFromStorage(){
  const saved = localStorage.getItem(THEME_KEY);
  body.classList.toggle("dark-mode", saved === JSON.stringify("darkmode"));
}
applyThemeFromStorage();

darkModeToggle?.addEventListener("click", () => {
  const dark = !body.classList.contains("dark-mode");
  body.classList.toggle("dark-mode", dark);
  localStorage.setItem(THEME_KEY, JSON.stringify(dark ? "darkmode" : "lightmode"));
});

/* ============== DATA: state + storage ============== */

class Card {
  constructor(word, definition) {
    this.word = word;
    this.definition = definition;
  }
}

const CARDS_KEY = "cardsArray";

function normalizeCards(arr) {
  // Accept legacy strings or incomplete objects and normalize
  return (arr ?? []).map(c =>
    typeof c === "string"
      ? { word: c, definition: "" }
      : { word: c.word ?? "", definition: c.definition ?? "" }
  );
}

function loadCards() {
  try {
    const raw = JSON.parse(localStorage.getItem(CARDS_KEY));
    return normalizeCards(raw);
  } catch {
    return [];
  }
}

function saveCards(cards) {
  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
}

// Single source of truth in memory
let cards = loadCards();

/* ============== INDEX PAGE (create cards) ============== */

if (onIndex) {
  const wordTextArea       = document.querySelector("#wordTextArea");
  const definitionTextArea = document.querySelector("#definitionTextArea");
  const learnBtn           = document.querySelector("#learnBtn");

  // Focus behavior
  window.addEventListener("DOMContentLoaded", () => wordTextArea?.focus());

  // Enter in the first textarea → jump to definition
  wordTextArea?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      definitionTextArea?.focus();
    }
  });

  // Click anywhere → focus word; clicking definition → focus definition
  document.addEventListener("click", (e) => {
    if (e.target === definitionTextArea) {
      definitionTextArea?.focus();
    } else {
      wordTextArea?.focus();
    }
  });

  // Create new card
  learnBtn?.addEventListener("click", () => {
    const word = wordTextArea?.value.trim() ?? "";
    const definition = definitionTextArea?.value.trim() ?? "";
    if (!word || !definition) return;

    cards.push(new Card(word, definition));
    saveCards(cards);

    // Clear inputs
    if (wordTextArea) wordTextArea.value = "";
    if (definitionTextArea) definitionTextArea.value = "";
    wordTextArea?.focus();
  });
}

/* ============== CARDS PAGE (list / toggle / edit / delete) ============== */

if (onCards) {
  const list = document.querySelector("#cardsLibrary");

  function renderCards() {
    if (!list) return;
    list.textContent = ""; // clear

    cards.forEach((card, index) => {
      const li = document.createElement("li");
      li.className = "card-item";
      li.dataset.index = String(index);
      li.dataset.showing = "word"; // start by showing word

      const text = document.createElement("span");
      text.className = "liTextSpan";
      text.textContent = card.word;

      const del = document.createElement("button");
      del.type = "button";
      del.className = "deleteCardBtn";
      del.title = "Delete";
      del.innerHTML = '<i class="fa-solid fa-trash"></i>';

      li.append(text, del);
      list.appendChild(li);
    });
  }

  // Initial paint
  renderCards();

  // Clicks: delete or toggle
  list?.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li || !list.contains(li)) return;

    // ignore clicks while editing an input we’ve placed inside the <li>
    if (li.classList.contains("editing")) return;

    const index = Number(li.dataset.index);
    if (!Number.isInteger(index) || !cards[index]) return;

    // 1) Delete
    if (e.target.closest(".deleteCardBtn")) {
      cards.splice(index, 1);
      saveCards(cards);
      renderCards();
      return;
    }

    // 2) Toggle word/definition
    const textNode = li.querySelector(".liTextSpan");
    const showing = li.dataset.showing || "word";
    if (showing === "word") {
      textNode.textContent = cards[index].definition;
      li.dataset.showing = "definition";
    } else {
      textNode.textContent = cards[index].word;
      li.dataset.showing = "word";
    }
  });

  // Double‑click: inline edit (edits the field currently showing)
  list?.addEventListener("dblclick", (e) => {
    const textNode = e.target.closest(".liTextSpan");
    if (!textNode) return;

    const li = textNode.closest("li");
    const index = Number(li.dataset.index);
    if (!Number.isInteger(index) || !cards[index]) return;
    if (li.classList.contains("editing")) return;

    const fieldAtStart = li.dataset.showing || "word"; // lock which field we edit

    const input = document.createElement("input");
    input.className = "edit-input";
    input.value = textNode.textContent;

    li.classList.add("editing");
    textNode.replaceWith(input);
    input.focus();
    input.select();

    let saved = false;
    const finalize = () => li.classList.remove("editing");

    function saveEdit() {
      if (saved) return;
      saved = true;
      const updated = input.value.trim();
      cards[index][fieldAtStart] = updated;
      saveCards(cards);
      renderCards();
      finalize();
    }

    function handle(e2) {
      if (e2.type === "keydown") {
        if (e2.key !== "Enter") return;
        e2.preventDefault();
        input.blur();              // fires the blur handler once
        return;
      }
      // blur
      saveEdit();
    }

    input.addEventListener("keydown", handle);
    input.addEventListener("blur", handle, { once: true });
  });
}














/* The text we toggle (centered, responsive) */
.liTextSpan{
  display:block;
  text-align:center;
  font-size: clamp(18px, 2.2vw, 22px);
  color: var(--text);
  margin: 0 auto;
  max-width: 85%;
  word-break: break-word;
  /* overflow: auto; */
}







/* Card item */
#cardsLibrary li{
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-1);
  min-height: 84px;
  padding: var(--space-6);
  transition: transform var(--tr-fast), box-shadow var(--tr-fast), border-color var(--tr-fast);

  overflow: visible;
   padding-right: 4px;
}
#cardsLibrary li:hover{
  transform: translateY(-1px);
  box-shadow: var(--shadow-2);
  border-color: color-mix(in srgb, var(--tint) 28%, var(--border));
}

/* The text we toggle (centered, responsive) */
.liTextSpan {
  display: block;
  text-align: center;
  font-size: clamp(18px, 2.2vw, 22px);
  color: var(--text);
  margin: 0 auto;
  max-width: 85%;
   white-space: normal;        /* was nowrap */
  overflow: visible;          /* was hidden */
  text-overflow: clip;        /* no ellipsis */
  word-break: break-word;     /* break long words if needed */
  overflow-wrap: anywhere; 
  
}




#cardsLibrary li{
position: relative;
background: var(--surface);
border: 1px solid var(--border);
border-radius: var(--radius-lg);
box-shadow: var(--shadow-1);

/* let the card grow as needed */
min-height: 84px; /* just a floor, NOT a fixed height */
padding: var(--space-6);
transition: transform var(--tr-fast), box-shadow var(--tr-fast), border-color var(--tr-fast);

/* important: do NOT clip children */
overflow: visible;
/* tiny extra room so the top-right button never clips the rounded edge */
padding-right: 4px;
}



#cardsLibrary li:hover{
transform: translateY(-1px);
box-shadow: var(--shadow-2);
border-color: color-mix(in srgb, var(--tint) 28%, var(--border));
}


/* The text inside each card: center + wrap + grow */
.liTextSpan{
display: block;
text-align: center;
font-size: clamp(18px, 2.2vw, 22px);
color: var(--text);
margin: 0 auto;
max-width: 85%;

/* ⬇️ these four lines are the key */
white-space: normal; /* allow multiple lines */
overflow-wrap: anywhere; /* break very long tokens if needed */
word-break: break-word; /* legacy fallback */
overflow: visible; /* don’t clip the text */
/* no text-overflow: ellipsis; */
}





input.edit-input{
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: clamp(18px, 2.2vw, 22px);
  text-align: center;
  padding: var(--space-2) var(--space-3);
  border-radius: 8px;
  caret-color: var(--tint);
}


.liTextSpan{
display: block;
text-align: center;
font-size: clamp(18px, 2.2vw, 22px);
color: var(--text);
min-height: 30px; 
/* margin: 0 auto;
max-width: 85%;
⬇️ these four lines are the key 
white-space: normal; // allow multiple lines 
overflow-wrap: anywhere; //break very long tokens if needed 
word-break: break-word;  //legacy fallback 
overflow: visible;  //don’t clip the text 
no text-overflow: ellipsis; */
}



