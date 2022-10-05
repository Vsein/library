let myLibrary = [];

const bookFactory = (
  title = "Unknown",
  author = "Unknown",
  pages = 0,
  read = ''
) => {
  return { title, author, pages, read };
}

const overlay = document.getElementById('overlay');
const addBookBtn = document.getElementById('addBookBtn');
const addBookForm = document.getElementById('addBookForm');
const addBookModal = document.getElementById('addBookModal');
const submitBookBtn = document.getElementById('submitBookBtn');
const readStatusBtn = document.getElementById('read-status');
const closeOverlayBtn = document.getElementById('close-btn');

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
  const read = readStatusBtn.classList.contains('read');
  return bookFactory(title, author, pages, read);
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
  if (book.author) {
    p.textContent += `Author: ${book.author}\r\n`;
  }
  if (book.pages) {
    p.textContent += `Pages: ${book.pages}\r\n`;
  }
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

const changeStatus = () => {
  if (readStatusBtn.classList.contains('read')) {
    readStatusBtn.textContent = 'Unread';
    readStatusBtn.classList.remove('read');
    readStatusBtn.classList.add('unread');
  } else {
    readStatusBtn.textContent = 'Already read';
    readStatusBtn.classList.remove('unread');
    readStatusBtn.classList.add('read');
  }
}

readStatusBtn.onclick = changeStatus;
addBookBtn.onclick = openAddBookModal;
addBookForm.onsubmit = addBookToLibrary;
overlay.onclick = closeAddBookModal;
closeOverlayBtn.onclick = closeAddBookModal;

displayBooks();
