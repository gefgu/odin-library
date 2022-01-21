function Book(title, author, numberOfPages, readingDone) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readingDone = readingDone;
}

function displayLibrary() {
  library.forEach((book) => addBookToDisplay(book));
}

function addBookToDisplay(book) {
  const row = document.createElement("tr");
  const titleElement = document.createElement("td");
  const authorElement = document.createElement("td");
  const numberOfPagesElement = document.createElement("td");
  const statusElement = document.createElement("td");

  titleElement.textContent = book.title;
  authorElement.textContent = book.author;
  numberOfPagesElement.textContent = book.numberOfPages;
  statusElement.textContent = book.readingDone ? "READ" : "NOT READ";
  row.appendChild(titleElement);
  row.appendChild(authorElement);
  row.appendChild(numberOfPagesElement);
  row.appendChild(statusElement);
  libraryTableBody.appendChild(row);
}

let library = [];
const libraryTableBody = document.querySelector(".library tbody");
const bookForm = document.querySelector(".new-book-form");
const addButton = document.querySelector("#add-button");
const exitButton = document.querySelector(".exit");

library.push(new Book("The Final Empire", "Brandon Sanderson", 541, true));
library.push(new Book("The Well of Ascension", "Brandon Sanderson", 590, true));
library.push(new Book("The Hero of Ages", "Brandon Sanderson", 572, false));

displayLibrary();
addButton.addEventListener("click", () => {
  bookForm.classList.add("active");
});

exitButton.addEventListener("click", () => {
  bookForm.classList.remove("active");
  bookForm.reset();
});
