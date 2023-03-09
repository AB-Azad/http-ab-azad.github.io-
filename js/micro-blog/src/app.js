import { http } from './http';
console.log(http);

import { ui } from './UI';

// Initial state of the App
document.addEventListener('DOMContentLoaded', displayPosts );

// Listen for add/update post
ui.submiBtn.addEventListener('click', submitPost );

// Listen to enable edit state
ui.posts.addEventListener('click', enableEditState );

// Listen for delete
ui.posts.addEventListener('click', deletePost );

// Display posts
function displayPosts(){
    http.get('https://640875a02f01352a8a936fad.mockapi.io/posts')
    .then( res => ui.displayPosts(res) )
    .catch( err => console.log(err) )
}

// Reload post list when any post is added/edited/deleted
function reloadPosts(){
    http.get('https://640875a02f01352a8a936fad.mockapi.io/posts')
    .then(res => ui.displayPosts(res))
    .then(err => console.log(err))
}

// Listen for add/update post
function submitPost(e){
    e.preventDefault();

    // Validation
    if(ui.titleInput.value === '' || ui.bodyInput.value === ''){
        ui.displayMessage('Please fill in all the fields', 'alert alert-danger')
        return;
    }

    
    if( !ui.idInput.value ){
        // Add
        http.post('https://640875a02f01352a8a936fad.mockapi.io/posts', {
            title: ui.titleInput.value,
            body: ui.bodyInput.value
        })
        .then( res => {
            alert('Post Added!');
            ui.clearForm();
            reloadPosts()
        } )
        .catch( err => console.log(err) )
    } else if( ui.idInput.value ){
        // Update
        http.put(`https://640875a02f01352a8a936fad.mockapi.io/posts/${ui.idInput.value}`, {
            title: ui.titleInput.value,
            body: ui.bodyInput.value
        })
        .then( res => {
            alert('Post Updated!');
            ui.clearForm();
            reloadPosts()
        } )
        .catch( err => console.log(err) )
    }
}

// Listen for enable edit state
function enableEditState(e){
    e.preventDefault();
    
    if(e.target.parentElement.classList.contains('edit')){
        let id = e.target.parentElement.dataset.id;
        let title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        let desc = e.target.parentElement.previousElementSibling.textContent;

        let data = {
            id, title, desc
        }

        ui.fillForm(data);
    }
}

// Listen for delete
function deletePost(e){
    e.preventDefault();

    if(e.target.parentElement.classList.contains('delete')){
        if( confirm('Do you want to delete the post!') ){
            let id = e.target.parentElement.dataset.id;
            http.delete(`https://640875a02f01352a8a936fad.mockapi.io/posts/${id}`)
            .then( res => {
                alert('Post Deleted!');
                reloadPosts();
            })
            .catch( err => console.log(err) )
        }
    }
}