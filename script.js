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

function displayLibrary() {
    const container = document.querySelector(".container")
    library.forEach(book => {
        const bookCard = document.createElement("div");
        const bookTitle = document.createElement("h3");
        const bookAuthor = document.createElement("p");
        const numPages = document.createElement("p");
        const readingStatus = document.createElement("p");

        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        numPages.textContent = `Number of Pages: ${book.numberOfPages}`;
        if (book.readingDone) {
            readingStatus.textContent = "Reading Complete!";
        } else {
            readingStatus.textContent = "Not read yet";
        }
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(numPages);
        bookCard.appendChild(readingStatus);
        container.appendChild(bookCard);
    })
}

addBookToLibrary(new Book("The Final Empire", "Brandon Sanderson", 541, true));
addBookToLibrary(new Book("The Well of Ascension", "Brandon Sanderson", 590, true));
addBookToLibrary(new Book("The Hero of Ages", "Brandon Sanderson", 572, true));
displayLibrary();