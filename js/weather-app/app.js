const ui = new UI();
const weather = new Weather();
const storage = new Storage();

// When page is loaded show weather data by default location
document.addEventListener('DOMContentLoaded', getWeather());
document.addEventListener('DOMContentLoaded', updateDate());

/**
 * It gets the weather data from the promise, then it prepares the data to be displayed on the
 * UI, and finally it updates the UI with the prepared data
 */
function getWeather(){
    weather.getData().then( res => {
        if( res.currentWeather.cod === '404' ){
            alert('City not found. Please update location with a valid city name.');
            return;
        } else {
            // Prepare weather data
            var weatherData = {
                current: {
                    temp: res.currentWeather.main.temp,
                    temp_kind: res.currentWeather.weather[0].description.slice(0,1).toUpperCase()+ res.currentWeather.weather[0].description.slice( 1, 9999),
                    feels_like: res.currentWeather.main.feels_like,
                    humidity: res.currentWeather.main.humidity,
                    wind: res.currentWeather.wind.speed,
                    country: res.currentWeather.sys.country
                },
                next_days: res.next3DaysWeather.list
            }

            ui.update(weatherData);
        }
    }).catch( e => {
        // console.log('cathed', e);
    });
}

/**
 * > The function `updateDate()` updates the date on the page
 */
function updateDate(){
    var date_now = new Date(),
        months   = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    // Full date
    let today = {};
        today.date  = date_now.getDate(),
        today.month = months[date_now.getMonth()].slice(0, 3),
        today.year  = date_now.getFullYear();
    
 
    var full_date = `${today.date} ${today.month} ${today.year}`;
    document.querySelector('.date-day').textContent = full_date;
}

// On change location
$button = document.querySelector('.location-button');
$button.addEventListener('click', function(){
    let city_name = '';

    // Open modal
    document.querySelector('.location-select').style.display = 'block';

    if( city_name ){
        // Store the city name
        storage.setLocation( city_name );
        
        // Get weather and update UI
        getWeather();
    }
});

// Update location from modal
document.querySelector('.update-weather').addEventListener('click', function(){
    document.querySelector('.modal').style.display = 'none';

    var $city = document.querySelector('.city-input input');

    
    if(  $city ){
        storage.setLocation( $city.value );
        
        getWeather();
    }
});

// Close modal
document.querySelector('.modal .close').addEventListener('click', function(){
    document.querySelector('.modal').style.display = 'none';
});