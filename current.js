/*
===============================
 Poly-Mot — single JS entrypoint
===============================
*/

/* --------------------------------
 0) DOM refs (query once)
--------------------------------- */
const body               = document.body;
const arrowRight         = document.querySelector('.arrowRight');
const arrowLeft          = document.querySelector('.arrowLeft');
const titleHome          = document.querySelector('#titleHome');
const darkModeToggle     = document.querySelector('#darkModeToggle');

const list               = document.querySelector('#cardsLibrary');        // cards.html
const textArea           = document.querySelector('textarea');             // index.html
const wordTextArea       = document.querySelector('#wordTextArea');        // index.html
const definitionTextArea = document.querySelector('#definitionTextArea');  // index.html
const learnBtn           = document.querySelector('#learnBtn');            // index.html
const randomBtn          = document.querySelector('#randomBtn');           // random.html

/* --------------------------------
 1) Small utilities
--------------------------------- */
const PAGES = ['index.html', 'cards.html', 'random.html'];

function goTo(pageIndex) {
  const i = Math.max(0, Math.min(PAGES.length - 1, pageIndex)); //This line ensures the page number (pageIndex) stays within valid bounds so it doesn’t go below the first page or beyond the last page.
  localStorage.setItem('currentPage', String(i));
  window.location.href = PAGES[i];
}

function currentPageIndex() {
  return Number.parseInt(localStorage.getItem('currentPage') || '0', 10);// This function’s job is to get the saved page number from localStorage (which we stored earlier in goTo()), turn it into a number, and give it back.
}                                                                       // What the 10 means: The 10 is the radix (base) for parseInt. parseInt(string, radix) tells JavaScript what number system to use. 10 means decimal (0–9 digits) — the normal numbers we use every day. 
                                                                       
/* --------------------------------
 2) Theme (dark mode)
--------------------------------- */
function applyThemeFromStorage() {
  const stored = localStorage.getItem('theme');
  if (stored === JSON.stringify('ligthmode')) body.classList.remove('dark-mode');
}

function toggleTheme() {
  body.classList.toggle('dark-mode');
  const value = body.classList.contains('dark-mode') ? 'darkmode' : 'ligthmode';
  localStorage.setItem('theme', JSON.stringify(value));
}

/* --------------------------------
 3) Cards: storage & normalization
--------------------------------- */
class Card {
  constructor(word, definition) {
    this.word = word;
    this.definition = definition;
  }
}

function normalizeCards(arr) {
  return arr.map(c =>
    typeof c === 'string'
      ? { word: c, definition: '' }
      : { word: c.word ?? '', definition: c.definition ?? '' }
  );
}

function loadCards() {
  const raw = JSON.parse(localStorage.getItem('cardsArray')) ?? [];
  // migrate old formats (strings) once
  if (raw.some(c => typeof c === 'string')) {
    const fixed = normalizeCards(raw);
    localStorage.setItem('cardsArray', JSON.stringify(fixed));
    return fixed;
  }
  return normalizeCards(raw);
}

function saveCards(cards) {
  localStorage.setItem('cardsArray', JSON.stringify(cards));
}

/* --------------------------------
 4) App state (in-memory)
--------------------------------- */
let cards = loadCards(); //What happens here: loadCards is a function. But loadCards() (with parentheses) means: run the function right now and take whatever it returns. The returned value is assigned to cards.

/* --------------------------------
 5) Rendering (cards.html)
--------------------------------- */
function renderCards() {
  if (!list) return;
  list.textContent = '';

  cards.forEach((card, index) => {
    const li = document.createElement('li');
    li.className = 'card-item';
    li.dataset.index = String(index);
    li.dataset.showing = 'word';

    const text = document.createElement('span');
    text.className = 'liTextSpan';
    text.textContent = card.word;
    li.appendChild(text);

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'deleteCardBtn';
    del.title = 'Delete';
    del.innerHTML = '<i class="fa-solid fa-trash"></i>';
    li.appendChild(del);

    list.appendChild(li);
  });
}

/* --------------------------------
 6) Cards page interactions
--------------------------------- */
function wireCardsPage() {
  if (!list) return;

  // click: delete or toggle word/definition
  list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li || !list.contains(li)) return;

    const index = Number(li.dataset.index);
    if (!Number.isInteger(index) || !cards[index]) return;

    // delete
    if (e.target.closest('.deleteCardBtn')) {
      cards.splice(index, 1);
      saveCards(cards);
      renderCards();
      return;
    }

    // ignore toggles while editing
    if (li.classList.contains('editing')) return;

    // toggle
    const textNode = li.querySelector('.liTextSpan');
    const showing = li.dataset.showing || 'word';
    if (showing === 'word') {
      textNode.textContent = cards[index].definition;
      li.dataset.showing = 'definition';
    } else {
      textNode.textContent = cards[index].word;
      li.dataset.showing = 'word';
    }
  });

  // dblclick: inline edit of whatever is currently shown
  list.addEventListener('dblclick', (e) => {
    const textNode = e.target.closest('.liTextSpan');
    if (!textNode) return;

    const li = textNode.closest('li');
    const index = Number(li.dataset.index);
    if (!Number.isInteger(index) || !cards[index]) return;
    if (li.classList.contains('editing')) return;

    const fieldAtStart = li.dataset.showing || 'word';
    const input = document.createElement('textarea');
    input.className = 'edit-input';
    input.value = textNode.textContent;
    
    attachAutoCapitalize(input);
    if (input.value.length > 0) {
  const first = input.value.charAt(0);
  if (first !== first.toUpperCase()) {
    const start = input.selectionStart ?? input.value.length;
    const end   = input.selectionEnd   ?? input.value.length;
    input.value = first.toUpperCase() + input.value.slice(1);
    input.setSelectionRange(start, end);
  }
} 

    li.classList.add('editing');
    textNode.replaceWith(input);
    input.focus();
    input.select();

    let saved = false;
    const finish = () => { li.classList.remove('editing'); };

    function saveEdit() {
      if (saved) return;
      saved = true;
      const val = input.value.trim();
      cards[index][fieldAtStart] = val;
      saveCards(cards);
      renderCards(); // keeps indices + UI consistent
      finish();
    }

    function handler(ev) {
      if (ev.type === 'keydown') {
        if (ev.key !== 'Enter') return;
        ev.preventDefault();
        input.blur();           // will fall into 'blur' path once
        return;
      }
      // blur
      saveEdit();
    }

    input.addEventListener('keydown', handler);
    input.addEventListener('blur', handler, { once: true });
  });

  // initial paint
  renderCards();
}

/* --------------------------------
 7) Index page interactions
--------------------------------- */
function wireIndexPage() {
  if (!wordTextArea || !definitionTextArea || !learnBtn) return;

  document.querySelectorAll('textarea').forEach(attachAutoCapitalize);
  
  // focus rules
  document.addEventListener('DOMContentLoaded', () => wordTextArea.focus());

  if (textArea) {
    textArea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        definitionTextArea.focus();
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target === definitionTextArea) {
      definitionTextArea.focus();
    } else {
      wordTextArea.focus();
    }
  });

  // add card
  learnBtn.addEventListener('click', () => {
    const word = wordTextArea.value.trim();
    const def  = definitionTextArea.value.trim();
    if (!word || !def) return;

    cards.push(new Card(word, def));
    saveCards(cards);

    // clear inputs
    wordTextArea.value = '';
    definitionTextArea.value = '';
    wordTextArea.focus();
  });
}

/* --------------------------------
 8) Nav + theme wiring (all pages)
--------------------------------- */
function wireCommon() {
  // arrows
  arrowRight?.addEventListener('click', () => {
    const i = currentPageIndex();
    if (i < PAGES.length - 1) goTo(i + 1);
  });

  arrowLeft?.addEventListener('click', () => {
    const i = currentPageIndex();
    if (i > 0) goTo(i - 1);
  });

  // title resets nav memory
  titleHome?.addEventListener('click', () => {
    localStorage.removeItem('currentPage');
  });

  // theme
  applyThemeFromStorage();
  darkModeToggle?.addEventListener('click', toggleTheme);
}

/* --------------------------------
 9) Boot
--------------------------------- */
wireCommon();

if (window.location.pathname.includes('cards.html')) {
  wireCardsPage();
}

if (window.location.pathname.includes('index.html')) {
  wireIndexPage();
}

if (window.location.pathname.includes('random.html')) { //ADD
  wireRandomPage();
}



// Generic function to capitalize first letter without moving caret
function attachAutoCapitalize(textarea) {
  textarea.addEventListener('input', () => {
    if (textarea.value.length > 0) {
      const firstChar = textarea.value.charAt(0);
      if (firstChar !== firstChar.toUpperCase()) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = firstChar.toUpperCase() + textarea.value.slice(1);
        textarea.setSelectionRange(start, end);
      }
    }
  });
}

// Attach to all textareas on page load
document.querySelectorAll('textarea').forEach(attachAutoCapitalize);

// If you create new textareas dynamically (like on li edit), attach there too:
function createEditableTextarea(li) {
  const textarea = document.createElement('textarea');
  textarea.value = li.textContent.trim();
  attachAutoCapitalize(textarea); // ✅ apply capitalization
  return textarea;
}


/* --------------------------------                                //ADD
 7) Random page interactions
--------------------------------- */           

function wireRandomPage (){                                                  
                                                        
function getRandomWordAndDef(e){  
e.preventDefault();
  const randomIndex = Math.floor(Math.random() * cards.length);
  const randomElement = cards[randomIndex];
  const displayArea = document.querySelector('.display-area')
  const displayArea2 = document.querySelector('.display-area2')
  
  displayArea.textContent = `${randomElement.word} `
  displayArea2.textContent = `${randomElement.definition}`

  console.log(randomIndex)
  console.log(cards)
  console.log(randomElement)
return randomIndex;
}

randomBtn.addEventListener('click',getRandomWordAndDef)



}


