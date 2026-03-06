import React, { useState } from "react";
import axios from "axios";
function App() {
const [city, setCity] = useState("");
const [weather, setWeather] = useState(null);
const [error, setError] = useState("");
const API_KEY = "582e9ae5ce0fec83e472a16beb764991"; // Replace with your key
const getWeather = async () => {
if (!city) {
setError("Please enter a city name");
return;
}
try {
const response = await axios.get(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}
&units=metric`
);
setWeather(response.data);
setError("");
} catch (err) {
setError("City not found");
setWeather(null);
}

};
return (
<div style={styles.container}>
<h1>Weather App</h1>
<input
type="text"
placeholder="Enter City"
value={city}
onChange={(e) => setCity(e.target.value)}
style={styles.input}
/>
<button onClick={getWeather} style={styles.button}>
Get Weather
</button>
{error && <p style={{ color: "red" }}>{error}</p>}
{weather && (
<div style={styles.card}>
<h2>{weather.name}</h2>
<p>Temperature: {weather.main.temp} °C</p>
<p>Condition: {weather.weather[0].description}</p>
<p>Humidity: {weather.main.humidity}%</p>
</div>
)}
</div>
);
}
const styles = {
container: {
textAlign: "center",
marginTop: "50px",
fontFamily: "Arial"
},
input: {
padding: "8px",
marginRight: "10px"
},
button: {
padding: "8px 15px"
},
card: {
marginTop: "20px",
padding: "15px",
border: "1px solid gray",
display: "inline-block"
}
};
export default App;