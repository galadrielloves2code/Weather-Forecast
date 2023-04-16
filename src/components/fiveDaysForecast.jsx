import React, { useState, useEffect } from "react";

const FiveDaysForecast = () => {
  const [location, setLocation] = useState({});
  const [forecast, setForecast] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.log(error);
        }
      );
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchForecast = async () => {
      if (location.lat && location.lon) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=YOUR_API_KEY&units=metric`
        );
        const data = await response.json();
        setForecast(data.list.filter((item, index) => index % 8 === 0));
      }
    };
    fetchForecast();
  }, [location]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="btn btn-primary dropdown-toggle" type="button" onClick={handleToggle}>
        {isOpen ? "Hide Forecast" : "Show Forecast"}
      </button>
      {isOpen && (
        <div className="dropdown-menu show">
          {forecast.length > 0 ? (
            forecast.map((item) => (
              <a className="dropdown-item" key={item.dt}>
                <h5>{new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}</h5>
                <p>{item.weather[0].description}</p>
                <p>Temperature: {Math.round(item.main.temp)}&deg;C</p>
                <p>Humidity: {item.main.humidity}%</p>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
              </a>
            ))
          ) : (
            <p className="dropdown-item">Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FiveDaysForecast;
