// Get profiles from localStorage
const profiles = JSON.parse(localStorage.getItem('users'));
const $next    = document.querySelector('#next');

if( !profiles ){

    fetch('https://randomuser.me/api/?results=10')
    .then( res => res.json() )
    .then( data => {
        localStorage.setItem('users', JSON.stringify(data.results));
        let sData = JSON.parse(localStorage.getItem('users'));

        return initIterator( sData );
    })
    .then( i => {
        
        var profile = i.next().value;
        updateUI(profile);

        $next.addEventListener('click', function(){
            profile = i.next().value;
            updateUI(profile);
        });
    } )
} else {
    var profileIterator = initIterator( profiles );
    updateUI(profileIterator.next().value);

    $next.addEventListener('click', function(){
        updateUI(profileIterator.next().value);
    });
}

/**
 * Iterator
 */
function initIterator( arr ){
    var count = arr.length;
    return {
        next: function(){
            if( count > 0 ){
                count--;

                return {
                    done: false,
                    value: arr[count]
                }
            } else {
                return {
                    done: true,
                }
            }
        }
    }
}

/**
 * @param [profile=null] - The profile object that we want to display.
 * 
 * @returns void
 */
function updateUI( profile = null ){

    if( profile == undefined ){
        alert("No more profiles");
        window.location.reload();
        return;
    }

    // Iterator through the data and show the first user info then 2nd ans so on    
    document.querySelector('#imageDisplay').innerHTML = `<img src="${profile.picture.large}" />`;

    let html = `
    <ul class="list-group">
        <li class="list-group-item">Name: ${profile.name.first} ${profile.name.last}</li>
        <li class="list-group-item">Age: ${profile.dob.age}</li>
        <li class="list-group-item">Email: ${profile.email}</li>
        <li class="list-group-item">Address: ${profile.location.city}, ${profile.location.country}</li>
        <li class="list-group-item">Phone: ${profile.phone}</li>
    </ul>
    `;
    document.querySelector('#profileDisplay').innerHTML = html;
}