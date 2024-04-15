
function showweatherDetails(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const apiKey = '2074f2120fa857317c9107735758391b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log("I got: " + apiUrl);

    fetch(apiUrl)
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Not 2xx response", {cause: response});
            }
        })
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            console.log(data);
            weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                    <p>Temperature: ${data.main.temp} &#8451</p>
                                    <p>Weather: ${data.weather[0].description}</p>`;
            
        })
        .catch(err => {
            console.log("Ops " + err);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = '<h2>Check the city name</2>';
        });
}

document.getElementById('weatherForm').addEventListener('submit',showweatherDetails );

