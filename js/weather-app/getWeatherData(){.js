getWeatherData(){
    // request to get the location & ip
    let currentLocationResponse = fetch('http://www.geoplugin.net/json.gp');

    currentLocationResponse
    .then((data) => {
        return data.json();
    })
    .then((location) => {
        var city = this.city;

        if(location.city){
            city = location.geoplugin_city;
        }

        let currentWeatherResponse = fetch(`//api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`);
        currentWeatherResponse.then((weather) => function(){
            return weather;
        })
    })
}