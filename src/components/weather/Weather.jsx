import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import './Weather.css'

const WeatherForecast = () => {
  const [data, setdata] = useState({});
  const [img,   setimg] = useState("");
  const inputRef = useRef();
  const Api_key = "22a1b820daa89ae898ab969c12baa861";

  async function Search() {
    console.log(inputRef.current.value);
    // let lon = 0;
    // let lat = 0;

    //   const response =await  axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${inputRef.current.value}&limit=4&appid=${Api_key}`);
    //   lon = response.data[0].lon;
    //   lat = response.data[0].lat;

    forecast();
    // console.log(response);
    //     forecast(lat, lon);
    //   }
  }

  async function forecast() {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`
    ).catch((err)=>{
      alert(err.response.data.message)
    });
    console.log(response);
    setdata(response.data);
    setimg(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  }

  return (
    <div className="container">
      <h1>Weather Forecast</h1>
      <input type="text" ref={inputRef}  placeholder="Enter City..."/> <br />

 <button onClick={Search}>Search</button>
      {data.name != null ? (
        <><br />
          <b>City Name: {data.name} </b><br />
          <b>Temperature: {data.main.temp}</b><br />
          <b>Maximum temperature:{data.main.temp_max}</b> <br />
          <b>Minimum temperature:{data.main.temp_min}</b> <br />
          <b>Staate Name: {data.sys.country} </b><br />
          <b>Sunrice: {`${new Date(data.sys.sunrise*1000).toLocaleTimeString()}`}</b> <br />
          <b> Sunset:{`${new Date(data.sys.sunset*1000).toLocaleTimeString()}`}</b>
          <img src={img} alt="" />  <br />
        </>
      ) : (
        null
      )}
    </div>
  );
};

export default WeatherForecast;
