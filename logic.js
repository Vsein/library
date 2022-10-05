class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

const library = new Library();

const displayLibrary = (() => {

  const addBook = (book) => {
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

  const renew = () => {
    for (let book of myLibrary) {
      addBookCard(book);
    }
  };

  return { addBook, renew };
})();

const BookModal = (() => {

  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('addBookModal');
  const form = document.getElementById('addBookForm');
  const readStatusBtn = document.getElementById('read-status');
  const addBookBtn = document.getElementById('addBookBtn');
  const closeBtn = document.getElementById('close-btn');
  const submitBookBtn = document.getElementById('submitBookBtn');

  const changeReadStatus = () => {
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

  readStatusBtn.onclick = changeReadStatus;

  const open = () => {
    overlay.classList.add('active');
    modal.classList.add('active');
  };

  addBookBtn.onclick = open;

  const close = () => {
    overlay.classList.remove('active');
    modal.classList.remove('active');
  };

  overlay.onclick = close;
  closeBtn.onclick = close;

  const getBook = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = readStatusBtn.classList.contains('read');
    return new Book(title, author, pages, read);
  };

  const submitBook = (e) => {
    e.preventDefault();
    let book = getBook();
    library.addBook(book);
    displayController.addBook(book);
    close();
    form.reset();
  }

  form.onsubmit = submitBook;

})();
