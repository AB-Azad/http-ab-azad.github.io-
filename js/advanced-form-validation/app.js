// Add event Listeners
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('zip').addEventListener('blur', validateZip);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);

function validateName(){
    const name = document.getElementById('name');
    const re     = /^[a-zA-Z]{3,5}$/;

    if( !re.exec(name.value) ){
        name.classList.add('is-invalid');
    }else{
        name.classList.remove('is-invalid');
    }   
}

function validateZip(){
    const zip = document.getElementById('zip');
    const re     = /^[0-9]{4}(-[0-9]{3})?$/; // e.g: valid values are "12345", "12345-330"

    if( !re.exec(zip.value) ){
        zip.classList.add('is-invalid');
    }else{
        zip.classList.remove('is-invalid');
    }   
}

function validateEmail(){
    const email = document.getElementById('email');
    const re     = /^([a-zA-Z0-9\_\-\.]+)@([a-zA-Z0-9\_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if( !re.exec(email.value) ){
        email.classList.add('is-invalid');
    }else{
        email.classList.remove('is-invalid');
    }   
}

function validatePhone(){
    const phone = document.getElementById('phone');
    // some valid values are: "555", "555-555", "555-555-555", "555.555.555", "(555)-555-555"
    const re    = /^(\(?\d{3}\)?)([\-\.])?([\d]{3})?([\-\.])?([\d]{3})?$/;
    console.log(re.exec(phone.value));

    if( !re.exec(phone.value) ){
        phone.classList.add('is-invalid');
    }else{
        phone.classList.remove('is-invalid');
    }   
}
