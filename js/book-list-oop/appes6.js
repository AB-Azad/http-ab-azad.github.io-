/**
 * Book class
 */
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

/**
 * UI class
 */
class UI{
    constructor(){}

    addBookToList(book){
        // Create tr element
        let tr = document.createElement('tr');
        tr.innerHTML = ` 
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        // Insert this row to the DOM
        let bookList = document.querySelector('#book-list');
        bookList.appendChild(tr);
    }

   showAlert(message, className){
        // Create div
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(message));
        div.className = `alert ${className}`;

        // Insert error into the DOM
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        target.parentElement.parentElement.remove();
    }

    clearFormFields(book){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    };
}


/**
 * Storage class
 */
class Storage{
    static addBook(book){
        let books;
        if(localStorage.getItem('books') == null){
           books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        // Add new book to the object
        books.push(book);

        // Convert book object to string
        books = JSON.stringify(books);

        // Add book to the localstrorage
        localStorage.setItem('books', books);
    }

    static deleteBook(isbn){
        let books;

        // Get books from localstorage
        books = JSON.parse(localStorage.getItem('books'));

        // Find the book into the localstorage
        for(let i in books){
            if(books[i].isbn == isbn){
                // Remove the book 
                books.splice(i,1)
            }
        }

        // Convert book object to string
        books = JSON.stringify(books);

        // Update the localstorage
        localStorage.setItem('books', books);
    }

    static displayBooks(){
        let books;
        // Get books from localstorage
        books = JSON.parse(localStorage.getItem('books'));

        // loop through each book & geneate DOM
        for(let i in books){
            let ui = new UI();
            ui.addBookToList(books[i]);
        }
    }
}

// Event listener for add Book
document.querySelector('#book-form').addEventListener('submit', function(e){
    e.preventDefault();

    let elTitle = document.querySelector('#title'),
        elAuthor = document.querySelector('#author'),
        elIsbn = document.querySelector('#isbn');

    // Get form values
    let title = elTitle.value,
        author = elAuthor.value,
        isbn = elIsbn.value;

    // Instantiate book
    let book = new Book(title, author, isbn);
    
    // Instantiate UI
    let ui = new UI();

    // Validate
    if(title == '' || author == '' || isbn == ''){
        ui.showAlert('You must fill all the fields.', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add book to the database
        Storage.addBook(book);

        // Show success message
        ui.showAlert('Book Added Successfully.', 'success');

        // Clear form fields
        ui.clearFormFields(book);
    }

});

// DOM load event
document.addEventListener('DOMContentLoaded', Storage.displayBooks());

// Evelent listener for delete Book
document.querySelector('#book-list').addEventListener('click', function(e){
    e.preventDefault();

    // Instantiate UI
    let ui = new UI();

    if(e.target.className == 'delete'){
        ui.deleteBook(e.target);

        let isbn;
        isbn = e.target.parentElement.parentElement.querySelector('td:nth-child(3)').textContent;

        // Remove from database
        Storage.deleteBook(isbn);
        
        // Show book deleted message
        ui.showAlert('Book Removed!', 'success');
    }
    
});