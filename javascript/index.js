const API_KEY = "ca644bb54b258eb289a8600b74525693";
const getCurrentWeatherData = async()=>{
    const city = "Mawsynram";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    return response.json()
}

const  loadCurrrentForecast =({name,main:{temp,temp_max,temp_min},weather:[{description}]})=>{


   const currentForecastElement =  document.querySelector("#current-forecast")
   currentForecastElement.querySelector(".city").textContent = name;

   currentForecastElement.querySelector(".temp").textContent = formatTemperature(temp);

   currentForecastElement.querySelector(".description").textContent = description;

   currentForecastElement.querySelector(".min-max-temp").textContent = `High: ${formatTemperature(temp_max)}   and  Low: ${formatTemperature(temp_min)}`;

}

const formatTemperature = (temp)=>`${temp?.toFixed(1)}℃`;
const createIconUrl =(icon)=>`http://openweathermap.org/img/wn/${icon}@2x.png`; 

const getHourlyForecast = async ({name:city})=>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${"pune"}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    return data.list.map(forecast=>{
        const {main:{temp,temp_max,temp_min},dt,dt_txt,weather:[{description,icon}]} = forecast;
        return {temp,temp_max,temp_min,dt,dt_txt,description,icon}
    })
}



const loadHourlyForecast = (hourlyForecast) =>{
    console.log(hourlyForecast);
    let dataFor12Hours = hourlyForecast.slice(1,13);
    console.log(dataFor12Hours);
    const hourlyContainer = document.querySelector(".hourly-container");
    let innerHtmlString =``;

    for (let {temp,icon,dt_txt} of dataFor12Hours){
        innerHtmlString += `<article>
        <h2 class="time">${dt_txt.split(" ")[1]}</h2>
        <img class="icon" src="${createIconUrl(icon)}" />
        <p class="hourly-temp">${formatTemperature(temp)}</p>
    </article>`
    }
    hourlyContainer.innerHTML= innerHtmlString;
}


document.addEventListener("DOMContentLoaded",async ()=>{
    const currentWeather =await getCurrentWeatherData();
    loadCurrrentForecast(currentWeather);
    const hourlyForecast = await getHourlyForecast(currentWeather); 
    loadHourlyForecast(hourlyForecast);
});