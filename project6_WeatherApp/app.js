// get stored location data
const storage = new Storage();
const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation);
const ui = new UI();

// load weather on dom load
document.addEventListener('DOMContentLoaded',getWeather);
// change location event
document.getElementById('w-change-btn').addEventListener('click',(e)=>{
    const city = document.getElementById('city').value;
    weather.changeLocation(city);
    //set location using local storage 
    storage.setLocationData(city);
    // get new weather
    getWeather();

    //close the modal must use jquery
    $('#locModal').modal('hide');
});

function getWeather(){
weather.getWeather()
.then(result => {
   
    ui.showWeather(result);
})
.catch(err => console.log(err));
}