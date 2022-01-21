function Book(title, author, numberOfPages, readingDone) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readingDone = readingDone;
}

function displayLibrary() {
  document.querySelectorAll("tbody tr").forEach(element => element.remove());
  library.forEach((book, index) => addBookToDisplay(book, index));
}

function addBookToDisplay(book, index) {
  const row = document.createElement("tr");
  const titleElement = document.createElement("td");
  const authorElement = document.createElement("td");
  const numberOfPagesElement = document.createElement("td");
  const statusElement = document.createElement("td");
  const deleteElement = document.createElement("td");
  const deleteButton = document.createElement("button");

  row.dataset.index = index;

  titleElement.textContent = book.title;
  authorElement.textContent = book.author;
  numberOfPagesElement.textContent = book.numberOfPages;
  statusElement.textContent = book.readingDone ? "READ" : "NOT READ";
  deleteButton.textContent = "DELETE";

  deleteButton.classList.add("delete-button");
  deleteButton.dataset.index = index;
  deleteButton.addEventListener("click", removeBookFromLibrary);
  deleteElement.appendChild(deleteButton);

  row.appendChild(titleElement);
  row.appendChild(authorElement);
  row.appendChild(numberOfPagesElement);
  row.appendChild(statusElement);
  row.appendChild(deleteElement);
  libraryTableBody.appendChild(row);
}

function addBookToLibrary(event) {
  event.preventDefault();
  const book = new Book(
    this.elements.title.value,
    this.elements.author.value,
    +this.elements.pages.value,
    this.elements.status.value === "true" ? true : false,
  );
  addBookToDisplay(book, library.push(book) - 1);
  this.reset();
  this.classList.remove("active");
}

function removeBookFromLibrary() {
  const index = this.dataset.index;
  library.splice(index, 1);
  displayLibrary();
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
bookForm.addEventListener("submit", addBookToLibrary);

exitButton.addEventListener("click", () => {
  bookForm.classList.remove("active");
  bookForm.reset();
});
