class Weather{
constructor(city){
    this.apiKey='7f2c443e506aab50e023ea1f0d9d38f6';
    this.city = city;
}

// change the weather location 
changeLocation(city){
    this.city = city;
    

}

// fetch the openweathermap api
async getWeather(){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`);
    const responseData = await response.json();
    
    return responseData;
}
}