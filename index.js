import { navigate, links } from './modules/nav.js';
import CheckAvialability from './modules/avialability.js';
import { DateTime } from './modules/luxon.js';

const listContainer = document.getElementById('list-container');
const addBtn = document.querySelector('#add-btn');
const titleField = document.querySelector('#title-field');
const authorField = document.querySelector('#author-field');
const date = document.querySelector('.date');
let UpdateList;
let books = [];
if (localStorage.getItem('books') !== null) {
  books = JSON.parse(localStorage.getItem('books'));
}

const removeBook = (bookId) => {
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
    CheckAvialability();
    UpdateList();
  }
};

UpdateList = () => {
  listContainer.innerHTML = '';
  books.forEach((book) => {
    const newBook = document.createElement('div');
    newBook.innerHTML = `
        <p>"${book.title}" by ${book.author}</p>
        <button id="book${book.id}" class="remove">Remove</button>
      `;
    newBook.classList.add('book');
    listContainer.appendChild(newBook);
    const removeBtn = document.getElementById(`book${book.id}`);
    removeBtn.addEventListener('click', () => {
      newBook.remove();
      removeBook(book.id);
    });
  });
};

const AddBook = () => {
  if (titleField.value !== '' && authorField.value !== '') {
    let newId;
    try {
      newId = books[books.length - 1].id + 1;
    } catch (e) {
      newId = 0;
    }
    books.push({ title: titleField.value, author: authorField.value, id: newId });
    localStorage.setItem('books', JSON.stringify(books));
    titleField.value = '';
    authorField.value = '';
    UpdateList();
    CheckAvialability();
    navigate(0);
  }
};

CheckAvialability();

UpdateList();

addBtn.addEventListener('click', AddBook);

for (let i = 0; i < 3; i += 1) {
  links[i].addEventListener('click', () => {
    navigate(i);
  });
}

const now = DateTime.now();
date.innerHTML = now.toLocaleString({
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
});
