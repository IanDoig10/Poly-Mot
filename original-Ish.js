
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