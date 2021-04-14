// Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor
function UI(){}

UI.prototype.addBookToList = function(book){
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
};

UI.prototype.showAlert = function(message, className){
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

UI.prototype.deleteBook = function(target){
    target.parentElement.parentElement.remove();
}

UI.prototype.clrarFormFields = function(book){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
};

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

        // Show success message
        ui.showAlert('Book Added Successfully.', 'success');

        // Clear form fields
        ui.clrarFormFields(book);
    }

});

// Evelent listener for delete Book
document.querySelector('#book-list').addEventListener('click', function(e){
    e.preventDefault();

    // Instantiate UI
    let ui = new UI();

    if(e.target.className == 'delete'){
        ui.deleteBook(e.target);
        
        // Show book deleted message
        ui.showAlert('Book Removed!', 'success');
    }
    
});