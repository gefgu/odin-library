function Book(title, author, numberOfPages, readingDone) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readingDone = readingDone;
}

let library = [];

function addBookToLibrary(book) {
  library.push(book);
}

addBookToLibrary(new Book("The Final Empire", "Brandon Sanderson", 541, true));
addBookToLibrary(new Book("The Well of Ascension", "Brandon Sanderson", 590, true));
addBookToLibrary(new Book("The Hero of Ages", "Brandon Sanderson", 572, true));