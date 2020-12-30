class UI{
    constructor(){
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.maxTemp= document.getElementById('w-max-temp');
        this.wind = document.getElementById('w-wind');
    }

     showWeather(weather){
         this.location.textContent = weather.name + ', '+ weather.sys.country ;
         this.desc.textContent = weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.slice(1);
         this.string.textContent = Math.round(weather.main.temp - 273) + ' C';
         this.icon.setAttribute('src', "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png");
         this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}`;
         this.feelsLike.textContent = `Feels like: ${ Math.round(weather.main.feels_like - 273) + ' C'}`;
         this.maxTemp.textContent = `Maximum Temprature: ${Math.round(weather.main.temp_max-273)+ ' C'}`;
         this.wind.textContent = `Wind Speed: ${weather.wind.speed} Wind Degree: ${weather.wind.deg}`;


    }
}