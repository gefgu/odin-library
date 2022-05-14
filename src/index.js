import "./style.css";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  orderBy,
  serverTimestamp,
  query,
  getDocs,
  where,
  limit,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { async } from "@firebase/util";

const collectionName = "library";

// Firebase
const firebaseHelper = (() => {
  async function signIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }
  function signOutUser() {
    signOut(getAuth());
  }
  async function addBookToFirebase(book) {
    try {
      await addDoc(collection(getFirestore(), collectionName), {
        book: { ...book },
        timestamp: serverTimestamp(),
        userId: getAuth().currentUser.uid,
      });
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
  }
  async function getBooksOfUser() {
    if (isLogged) {
      const booksQuery = query(
        collection(getFirestore(), collectionName),
        where("userId", "==", getAuth().currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const booksSnapshot = await getDocs(booksQuery);
      const newLibrary = [];
      booksSnapshot.forEach((element) => {
        const book = { ...element.data().book };
        newLibrary.push(
          new Book(book.title, book.author, book.numberOfPages, book.read)
        );
      });
      return newLibrary;
    }
  }
  async function updateBookData(book) {
    const bookQuery = query(
      collection(getFirestore(), collectionName),
      where("book.title", "==", book.title),
      limit(1)
    );

    const booksSnapshot = await getDocs(bookQuery);
    let newBook = booksSnapshot.docs[0].data();
    newBook.book = { ...book };
    await updateDoc(booksSnapshot.docs[0].ref, newBook);
  }

  const firebaseConfig = {
    apiKey: "AIzaSyDHXd7_Gb-EDaoWsnitWJ4FV1mVUIQdf8E",
    authDomain: "odin-library-b0feb.firebaseapp.com",
    projectId: "odin-library-b0feb",
    storageBucket: "odin-library-b0feb.appspot.com",
    messagingSenderId: "89926987302",
    appId: "1:89926987302:web:7953dd13783ab9786f40e7",
  };

  const app = initializeApp(firebaseConfig);

  let isLogged = false;
  onAuthStateChanged(getAuth(), async (user) => {
    if (user) {
      isLogged = true;
      accountButton.textContent = `${user.displayName} - Log Out`;
      library = await getBooksOfUser();
      displayLibrary();
    } else {
      isLogged = false;
      accountButton.textContent = "Sign In";
      library = [];
      displayLibrary();
    }
  });

  const accountButton = document.querySelector(".account-button");
  accountButton.addEventListener("click", async () => {
    if (isLogged) {
      signOutUser();
    } else {
      await signIn();
    }
  });

  return {
    addBookToFirebase,
    getBooksOfUser,
    updateBookData
  };
})();

class Book {
  constructor(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
  }

  toggleStatus() {
    this.read = !this.read;
    firebaseHelper.updateBookData(this);
  }
}

function displayLibrary() {
  document.querySelectorAll("tbody tr").forEach((element) => element.remove());
  library.forEach((book, index) => addBookToDisplay(book, index));
}

function addBookToDisplay(book, index) {
  const row = document.createElement("tr");
  const titleElement = document.createElement("td");
  const authorElement = document.createElement("td");
  const numberOfPagesElement = document.createElement("td");
  const statusElement = document.createElement("td");
  const statusButton = document.createElement("button");
  const deleteElement = document.createElement("td");
  const deleteButton = document.createElement("button");

  row.dataset.index = index;

  titleElement.textContent = book.title;
  authorElement.textContent = book.author;
  numberOfPagesElement.textContent = book.numberOfPages;

  statusButton.textContent = book.read ? "READ" : "NOT READ";
  statusButton.classList.add("status-button");
  statusButton.addEventListener("click", toggleBookStatus);
  statusElement.appendChild(statusButton);

  deleteButton.textContent = "DELETE";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", removeBookFromLibrary);
  deleteElement.appendChild(deleteButton);

  row.appendChild(titleElement);
  row.appendChild(authorElement);
  row.appendChild(numberOfPagesElement);
  row.appendChild(statusElement);
  row.appendChild(deleteElement);
  libraryTableBody.appendChild(row);
}

async function addBookToLibrary(event) {
  event.preventDefault();
  const book = new Book(
    this.elements.title.value,
    this.elements.author.value,
    +this.elements.pages.value,
    this.elements.status.value === "true" ? true : false
  );
  await firebaseHelper.addBookToFirebase(book);
  addBookToDisplay(book, library.push(book) - 1);
  this.reset();
  this.classList.remove("active");
}

function toggleBookStatus() {
  const index = this.parentNode.parentNode.dataset.index;
  library[index].toggleStatus();
  displayLibrary();
}

function removeBookFromLibrary() {
  const index = this.parentNode.parentNode.dataset.index;
  library.splice(index, 1);
  displayLibrary();
}
// Add event listeners
let library = [];
const libraryTableBody = document.querySelector(".library tbody");
const bookForm = document.querySelector(".new-book-form");
const addButton = document.querySelector("#add-button");
const exitButton = document.querySelector(".exit");

displayLibrary();
addButton.addEventListener("click", () => {
  bookForm.classList.add("active");
});
bookForm.addEventListener("submit", addBookToLibrary);

exitButton.addEventListener("click", () => {
  bookForm.classList.remove("active");
  bookForm.reset();
});

// Add form validation
(() => {
  const formTitleInput = bookForm.querySelector("#title");
  const formAuthorInput = bookForm.querySelector("#author");
  const formPagesInput = bookForm.querySelector("#pages");

  const showCustomMessageForEmptyField = (field, message) => {
    field.addEventListener("input", () => {
      field.setCustomValidity("");
      field.checkValidity();
    });

    field.addEventListener("invalid", () => {
      if (field.value === "") {
        field.setCustomValidity(message);
      }
    });
  };

  showCustomMessageForEmptyField(formTitleInput, "A book needs a title!");
  showCustomMessageForEmptyField(formAuthorInput, "A book needs an author!");
  showCustomMessageForEmptyField(formPagesInput, "A book needs pages!");

  formPagesInput.addEventListener("input", () => {
    if (formPagesInput.value <= 0) {
      formPagesInput.setCustomValidity(
        "A book needs a positive number of pages!"
      );
    }
  });
})();
