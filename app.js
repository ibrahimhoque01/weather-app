const inputSubmit = document.querySelector('.input-submit');
const btnSubmit = document.querySelector('.btn-submit');


function setDate(){
  let date, day, days, dayMonth,  month, months;
        date = new Date();
        days = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
        day = date.getDay();
        if (day > 0){
          day = days[day-1];
        }else{
          day = 'Sunday';
        }
        dayMonth = date.getDate();
        month = date.getMonth();
  
        document.querySelector('.date-time').textContent = `${day} ${dayMonth}th ${months[month]}`;

      };


async function getWeather(){
    try{
        
        const getData = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${inputSubmit.value}&units=metric&appid=b852762e189531f0e8cf857a51fdb129`);
        const formatData = await getData.json();
        console.log(formatData);

        const temp = Math.floor(formatData.main.temp);
        const name = formatData.name;
        const country = formatData.sys.country;
        const description = formatData.weather[0].description;
        const icon = formatData.weather[0].icon;

        const minTemp = Math.floor(formatData.main.temp_min);
        const maxTemp = Math.floor(formatData.main.temp_max);
        const humidity = formatData.main.humidity;
        const wind = formatData.wind.speed;

        document.querySelector('.curr-temp').textContent = `${temp}°`;
        document.querySelector('.city-heading').textContent = `${name}, ${country}`;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector('.desc').textContent = description;

        document.querySelector('.min-temp').textContent = `${minTemp}°`;
        document.querySelector('.max-temp').textContent = `${maxTemp}°`;
        document.querySelector('.wind').textContent = `${wind}mph`;
        document.querySelector('.humidity').textContent = `${humidity}%`;

      }
    catch{
        document.querySelectorAll('.weather-info').textContent = '----';
        document.querySelectorAll('.weather-data').textContent = '----';
    }
}



inputSubmit.addEventListener('keypress', (event) => {
  if (event.keycode === 13 || event.which === 13){
    event.preventDefault();
   getWeather();
   setDate();
  }
});




btnSubmit.addEventListener('click', () => {
  getWeather();
  setDate();
});



  // const cities = new Map();
  // cities.set('nyc', 5128581);
  // cities.set('london', 2643743);
  // cities.set('paris', 2968815);