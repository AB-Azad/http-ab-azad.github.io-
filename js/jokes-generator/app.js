// Add event listener
document.querySelector('.get-jokes').addEventListener('click', loadJokes);

// Load jokes
function loadJokes(e){
  e.preventDefault();

  let types = document.getElementsByName('type'),
      number = Number(document.getElementById('number').value),
      selectedType,
      blankUL = document.querySelector('.jokes');

      for(let i = 0; i < types.length; i++){
        if(types[i].checked){
          selectedType = types[i].value;
        }
      }

  // loading spinner add
  document.querySelector('.get-jokes').classList.add('loading');

  // Process XHR request
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://v2.jokeapi.dev/joke/'+ selectedType +'?type=single&amount='+ number, true);

  xhr.onload = function(){
    if(this.status === 200){

      let response = JSON.parse(this.responseText),
          joke = response.joke,
          jokes = response.jokes,
          outputHTML = '';

      if( !response.error ){

        // if return multiple jokes
        if(jokes !== undefined){
          for(let i in jokes){
            joke = jokes[i].joke;
            outputHTML += `<li>${joke}</li>`;
          }
        } else {
          outputHTML += `<li>${joke}</li>`;
        }

        blankUL.innerHTML = outputHTML;

      } else {
        blankUL.innerHTML = ` 
          <li>Something Went Wrong!</li>
        `;
      }

    }

    document.querySelector('.get-jokes').classList.remove('loading');
  };

  xhr.send();
}