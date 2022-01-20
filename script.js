function Book(title, author, numberOfPages, readingDone) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readingDone = readingDone;
}

let library = [];

function addBookToLibrary(event) {
  event.preventDefault()
  console.log(this);
  console.log(event);
}

function displayLibrary() {
  library.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("p");
    const numPages = document.createElement("p");
    const readingStatus = document.createElement("p");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = `Author: ${book.author}`;
    numPages.textContent = `Number of Pages: ${book.numberOfPages}`;
    if (book.readingDone) {
      readingStatus.textContent = "Reading Complete!";
    } else {
      readingStatus.textContent = "Not read yet!";
    }

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(numPages);
    bookCard.appendChild(readingStatus);
    container.appendChild(bookCard);
  });
}

function cleanDisplay() {
  container.childNodes.forEach(e => e.remove())
}


const container = document.querySelector(".container");
const bookForm = document.querySelector("form");

library.push(new Book("The Final Empire", "Brandon Sanderson", 541, true));
library.push(
  new Book("The Well of Ascension", "Brandon Sanderson", 590, true)
);
library.push(new Book("The Hero of Ages", "Brandon Sanderson", 572, false));
displayLibrary();

bookForm.addEventListener("submit", addBookToLibrary);
