let myLibrary = [];

const bookFactory = (
  title = "Unknown",
  author = "Unknown",
  pages = 0,
  read = "Unread"
) => {
  return { title, author, pages, read };
}

const overlay = document.getElementById('overlay');
const addBookBtn = document.getElementById('addBookBtn');
const addBookForm = document.getElementById('addBookForm');
const addBookModal = document.getElementById('addBookModal');
const submitBookBtn = document.getElementById('submitBookBtn');

const openAddBookModal = () => {
  addBookForm.reset();
  overlay.classList.add('active');
  addBookModal.classList.add('active');
}

const closeAddBookModal = () => {
  overlay.classList.remove('active');
  addBookModal.classList.remove('active');
}

const getBookFromInput = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const stat = document.querySelector('input[name="status"]:checked').value;
  return bookFactory(title, author, pages, stat);
}

const addBookToLibrary = (e) => {
  e.preventDefault();
  let book = getBookFromInput();
  myLibrary.push(book);
  addBookCard(book);
  closeAddBookModal();
}

const addBookCard = (book) => {
  const bookGrid = document.querySelector(".bookGrid");
  const card = document.createElement('div');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  card.classList.add('card');
  h2.classList.add('title');
  h2.textContent = book.title;
  p.textContent = `Author: ${book.author}\r\nPages: ${book.pages}\r\n`;
  if (book.read) {
    p.textContent += `Status: Already read`;
  } else {
    p.textContent += `Status: In waiting list`;
  }
  card.appendChild(h2);
  card.appendChild(p);
  bookGrid.appendChild(card);
}

const displayBooks = () => {
  for (let book of myLibrary) {
    addBookCard(book);
  }
}

addBookBtn.onclick = openAddBookModal;
addBookForm.onsubmit = addBookToLibrary;

displayBooks();
