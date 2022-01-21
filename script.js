function Book(title, author, numberOfPages, readingDone) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readingDone = readingDone;
}

let library = [];

library.push(new Book("The Final Empire", "Brandon Sanderson", 541, true));
library.push(new Book("The Well of Ascension", "Brandon Sanderson", 590, true));
library.push(new Book("The Hero of Ages", "Brandon Sanderson", 572, false));