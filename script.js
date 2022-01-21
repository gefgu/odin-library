function Book(title, author, numberOfPages, readingDone) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readingDone = readingDone;
}

function displayLibrary() {
  // for each
  // create row element
  // create table data with book name
  // create table data with book author
  // create table data with book number of pages
  // create table data with book status
  library.forEach(book => {
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
  });
}

let library = [];
const libraryTableBody = document.querySelector(".library tbody");

library.push(new Book("The Final Empire", "Brandon Sanderson", 541, true));
library.push(new Book("The Well of Ascension", "Brandon Sanderson", 590, true));
library.push(new Book("The Hero of Ages", "Brandon Sanderson", 572, false));

displayLibrary();