class UI{
    constructor() {
        const storage = new Storage();

        this.date_now = new Date();
        this.days     = UI.getDays();
        this.months   = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

        // Full date
        let today = {};
        today.date  = this.date_now.getDate(),
        today.month = this.months[this.date_now.getMonth()].slice(0, 3),
        today.year  = this.date_now.getFullYear();
        
     
        this.day_name  = this.days[this.date_now.getDay()];
        this.full_date = `${today.date} ${today.month} ${today.year}`;
        
        // Location
        this.location_name = storage.getLocation();
    }

    static getDays(){
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }


    // Update ui with weather data
    update( weatherData ){

        let $day         = document.querySelector('.date-dayname'),
            $date        = document.querySelector('.date-day'),
            $city        = document.querySelector('.city'),
            $country     = document.querySelector('.country'),
            $todayTemp   = document.querySelector('.weather-temp'),
            $weatherType = document.querySelector('.weather-desc'),
            $feelsLike   = document.querySelector('.precipitation .value'),
            $humidity    = document.querySelector('.humidity .value'),
            $wind        = document.querySelector('.wind .value'),
            $dayList     = document.querySelector('.days-list'),
            $city_input  = document.querySelector('.city-input input'),
            output       = '';

        // Update day name
        $day.textContent = this.day_name;

        // Update date
        $date.textContent = this.full_date;

        // Update location
        $city.textContent = `${storage.getLocation()}`;
        $country.textContent = `${weatherData.current.$country}`;

        // Update temp
        $todayTemp.innerHTML = Number.parseInt(weatherData.current.temp) + '°C';

        // Update kind
        $weatherType.innerHTML = weatherData.current.temp_kind;

        // Feels like
        $feelsLike.innerHTML = Number.parseInt(weatherData.current.feels_like) + '°C';

        // Humidity
        $humidity.innerHTML = weatherData.current.humidity + '%';

        // Wind
        // convert wind unit m/sec to km/hour);
        $wind.innerHTML = Math.round(weatherData.current.wind.toFixed(1) * 3.6) + ' km/h';

        // City
        $city_input.value = storage.getLocation();

        // Country
        $country.innerHTML = weatherData.current.country;

        // Next 4 days
        let $ul = document.createElement('ul');
            $ul.classList.add('days-list');

        $dayList.innerHTML = '';
        weatherData.next_days.map(function(item, i){

            let x = i + 1,
                date_now = new Date(),
                day_number = date_now.getDay();

            if( day_number <= 6 ){
                day_number = day_number + x;
            }

            if( day_number >= 7 ){
                day_number = day_number - 7;
            }
            
            let temp     = item.main.temp,
                day_name = UI.getDays()[ + day_number];

            let icon      = item.weather[0].icon,
                icon_desc = item.weather[0].description;

            let li = document.createElement('li');

            li.innerHTML += `<img title="${icon_desc}" src="https://openweathermap.org/img/wn/${icon}@2x.png" />`;
            li.innerHTML += `<span class="day-name">${day_name.slice(0, 3)}</span>`;
            li.innerHTML += `<span class="day-temp">${Number.parseInt(temp) + '°C'}</span>`;
            $dayList.appendChild(li);
        });

        let $clear = document.createElement('div');
            $clear.classList.add('clear');


        $dayList.appendChild($clear);
    }
}