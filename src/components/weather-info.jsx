import React, { useContext, useEffect, useState } from "react";
import { usePosition } from "use-position";
import axios from "axios";
import { BackgrondStateCtx } from "../App";
import brokenClouds from "../img/02d.jpg"
import cloudy from "../img/03d.jpg"
import clearSky from "../img/01d.jpg"
import stormy from "../img/11d.jpg"
import showerRain from "../img/09d.jpg"
import rainy from "../img/10d.jpg"
import snowy from "../img/13d.jpg"
import hazy from "../img/50d.jpg"



function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function WeatherIcon({ code }) {
  const setBackground = useContext(BackgrondStateCtx);

  // Hava durumu koduna göre simgeyi ve background degistirme
  let iconName;
  if (code === 800) {
    iconName = "01d"; // Açık hava durumu için simge adı
    setBackground(clearSky);
  } else if ([200, 201, 202, 210, 211, 221, 230, 231, 232].includes(code)) {
    iconName = "11d"; // Fırtınalı hava durumu için simge adı
    setBackground(stormy);
  } else if (
    [300, 301, 302, 310, 311, 312, 313, 314, 321, 520, 521, 522, 531].includes(
      code
    )
  ) {
    iconName = "09d"; // Sağanak yağış hava durumu için simge adı
    setBackground(showerRain);
  } else if ([500, 501, 502, 503, 504].includes(code)) {
    iconName = "10d"; // Yağmurlu hava durumu için simge adı
    setBackground(rainy);
  } else if (
    [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622].includes(code)
  ) {
    iconName = "13d"; // Karlı hava durumu için simge adı
    setBackground(snowy);
  } else if (
    [701, 711, 721, 731, 741, 751, 761, 762, 771, 781].includes(code)
  ) {
    iconName = "50d"; // Puslu hava durumu için simge adı
    setBackground(hazy);
  } else if (code === 801) {
    iconName = "02d"; // parcali bulutlu hava durumu
    setBackground(brokenClouds);
  } else if (code === 802) {
    iconName = "03d"; // bulutlu hava durumu
    setBackground(cloudy);
  } else if (code === 803 || code === 804) {
    iconName = "04d"; // bulutlu hava durumu
    setBackground(cloudy);
  } else {
    iconName = "01d"; // Diğer hava durumları için varsayılan simge adı
    setBackground(clearSky);
  }

  return (
    <img
      src={`https://openweathermap.org/img/wn/${iconName}.png`}
      alt="Weather Icon"
    />
  );
}

export function WeatherInfo() {
  const [veri, setVeri] = useState();
  const { latitude, longitude } = usePosition();
  useEffect(() => {
    if (latitude && longitude) {
      weatherAll(latitude, longitude);
    }
  }, [latitude, longitude]);

  const weatherAll = async (latitude, longitude) => {
    const api_key = process.env.REACT_APP_WEATHER_DATA_KEY;
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`
      );
      setVeri(data);
    } catch {
      alert("Something went wrong :(");
    }
  };

  return (
    <div className="d-flex justify-content-center p-5 my-5 mx-auto">
      {veri && (
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
          <h1>{veri.name}</h1>
          <div className="container d-flex justify-content-center align-tems-center">
            <p className="mt-3">{kelvinToCelsius(veri.main.temp)}°C</p>
            <div>{<WeatherIcon code={veri.weather[0].id} />}</div>
          </div>
          <p className="text-capitalize">{veri.weather[0].description}</p>
          
        </div>
      )}
    </div>
  );
}
