class Weather{
    constructor(){
        this.apiKey       = '4b45462b359fda05021d1bb246b299e6';
        this.daysCount    = 4;
    }

    async getData( $city ){
        let currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${storage.getLocation()}&appid=${this.apiKey}&units=metric`);
        let currentWeather         = await currentWeatherResponse.json();

        let next3DaysResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${storage.getLocation()}&cnt=${this.daysCount}&appid=${this.apiKey}&units=metric`);
        let next3DaysWeather  = await next3DaysResponse.json();

        return {
            currentWeather,
            next3DaysWeather
        };
    }
}