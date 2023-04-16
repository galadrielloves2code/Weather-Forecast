import React, { useState, useEffect, useContext, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/nav-bar";
import { WeatherInfo } from "./components/weather-info";
import clearSky from "./img/01d.jpg"
import FiveDaysForecast from "./components/fiveDaysForecast";

export const BackgrondStateCtx = createContext();

function App() {
  const [background, setBackground] = useState(clearSky);

  return (
  <div className="vh-100">
    <BackgrondStateCtx.Provider value={setBackground}>
    <div className="App" style={{ backgroundImage: `url(${background})` }}>

        <NavBar />
        <WeatherInfo />
       
     
    </div>
    </BackgrondStateCtx.Provider>
    </div>
  );
}

export default App;
