console.log(`helo`);

// Class Books

class Book {
  constructor(name, author, type) {
    this.bookName = name;
    this.authorName = author;
    this.bookType = type;
  }
}

// Class Display

class Display {
  // Adding book
  static displayBooks() {
    console.log(`displayCalled`);

    let bookItem = localStorage.getItem(`books`);
    let bookObj;
    if (bookItem == null) {
      bookObj = [];
    } else {
      bookObj = JSON.parse(bookItem);
    }

    let tableHtml = `
        <tr>
        <th>Name</th>
        <th>Author</th>
        <th>Type</th>
        </tr>
        `;

    bookObj.forEach(function (elements, index) {
      console.log(index);
      tableHtml += `
            <tr>
            <td>${elements.newbookName}</td>
            <td>${elements.newauthorName}</td>
            <td>${elements.newbookType}</td>
            </tr>
            
            `;
    });

    document.getElementsByTagName(`table`)[0].innerHTML = tableHtml;
  }

  // Clearing the input tags
  clear() {
    document.getElementById(`libaryForm`).reset();
  }

  // Validating The submition
  validate(book) {
    console.log(`validate Book called`);

    let html = document.querySelector(`.wrap`);
    let newDiv = document.createElement(`div`);
    newDiv.setAttribute(`class`, `message`);
    console.log(newDiv);
    let val;
    if (
      book.bookName.length <= 3 ||
      book.authorName.length <= 3 ||
      book.bookType == undefined
    ) {
      newDiv.innerHTML = `
            <span>
            <i class="fas fa-exclamation-circle"></i>
            Sorry You cannot add this book !!
            </span>
            <span>
            <i class="fas fa-times" id="closeBtn"></i>
            </span>
            `;
      val = false;
    } else {
      newDiv.innerHTML = `
            <span>
                <i class="fas fa-clipboard-check"></i>
                Book Succesfully Added !!
            </span>
            <span>
                <i class="fas fa-times" id="closeBtn"></i>
            </span>
            `;
      val = true;
    }

    console.log(newDiv);
    html.insertBefore(newDiv, document.querySelector(`.mainContent`));

    // for automatically Removing
    setTimeout(function () {
      newDiv.remove();
    }, 3000);

    // for manually removing
    document.getElementById(`closeBtn`).addEventListener(`click`, function () {
      newDiv.remove();
    });
    return val;
  }

  //Adding new Book to local storage
  addtoLocalstorage(book) {
    let bookItem = localStorage.getItem(`books`);
    let bookObj;
    if (bookItem == null) {
      bookObj = [];
    } else {
      bookObj = JSON.parse(bookItem);
    }
    let newBook = {
      newbookName: book.bookName,
      newauthorName: book.authorName,
      newbookType: book.bookType,
    };

    bookObj.push(newBook);
    localStorage.setItem(`books`, JSON.stringify(bookObj));

    console.log(`book Aded`, bookObj);
  }
}

//Diplaying The books when pages refreshes

Display.displayBooks();

// Adding Books

document.getElementById(`addBook`).addEventListener("click", libarySubmit);

function libarySubmit(e) {
  e.preventDefault();

  let bookName = document.getElementById(`bookName`).value;
  let authorName = document.getElementById(`authorName`).value;
  let bookType;

  let fiction = document.getElementById(`fiction`);
  let cooking = document.getElementById(`cooking`);
  let coding = document.getElementById(`coding`);

  if (fiction.checked) {
    bookType = fiction.value;
  } else if (cooking.checked) {
    bookType = cooking.value;
  } else if (coding.checked) {
    bookType = coding.value;
  }

  let book = new Book(bookName, authorName, bookType);
  let display = new Display();
  let succes = display.validate(book);
  if (succes) {
    display.addtoLocalstorage(book);
    Display.displayBooks();
    display.clear();
    id = "closeBtn";
  }
  display.clear();
}

// Searching Books

// for showing submenu
document.getElementById(`searchOptions`).addEventListener(`click`, function () {
  console.log(`cal`);
  document.querySelector(`.subMenu`).style.display = `block`;

  // for hidding submenu automatically
  setTimeout(function () {
    console.log(`AA gya mao`);
    document.querySelector(`.subMenu`).style.display = `none`;
  }, 5000);
});

// Search Choice Function

function searchChoice(choice) {
  // for hiding submenu  manually
  document.querySelector(`.subMenu`).style.display = `none`;

  let bookItem = localStorage.getItem(`books`);
  let bookObj;

  if (bookItem == null) {
    bookObj = [];
  } else {
    bookObj = JSON.parse(bookItem);
  }
  let tableHtml = `
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Type</th>
                        </tr>
                        `;

  let searchText = document.getElementById(`searchTxt`);
  // Searching By book Name
  if (choice == "Book Name") {
    searchText.style.visibility = `visible`;
    searchText.placeholder = `Book Name`;

    searchText.addEventListener(`input`, function () {
      let txt = searchText.value.toLowerCase();

      bookObj.forEach(function (element) {
        if (element.newbookName.toLowerCase().includes(txt)) {
          tableHtml += `
                         <tr>
                            <td>${element.newbookName}</td>
                            <td>${element.newauthorName}</td>
                            <td>${element.newbookType}</td>
                          </tr>
                      `;
        }
      });
      document.getElementsByTagName(`table`)[0].innerHTML = tableHtml;
      tableHtml = `
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Type</th>
                        </tr>
                        `;
    });
  }

  // Searching by Author Name
  else if (choice == "Author Name") {
    searchText.style.visibility = `visible`;
    searchText.placeholder = `Author Name`;

    searchText.addEventListener(`input`, function () {
      let txt = searchText.value.toLowerCase();

      bookObj.forEach(function (element) {
        if (element.newauthorName.toLowerCase().includes(txt)) {
          tableHtml += `
                         <tr>
                            <td>${element.newbookName}</td>
                            <td>${element.newauthorName}</td>
                            <td>${element.newbookType}</td>
                          </tr>
                      `;
        }
      });
      document.getElementsByTagName(`table`)[0].innerHTML = tableHtml;
      tableHtml = `
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Type</th>
                        </tr>
                        `;
    });
  }

  // Searching by Book Type
  else {
    searchText.style.visibility = `hidden`;
    bookObj.forEach(function (element) {
      if (element.newbookType.toLowerCase() == choice.toLowerCase()) {
        tableHtml += `
                         <tr>
                            <td>${element.newbookName}</td>
                            <td>${element.newauthorName}</td>
                            <td>${element.newbookType}</td>
                          </tr>
                      `;
      }
    });
    document.getElementsByTagName(`table`)[0].innerHTML = tableHtml;
  }
}
