import "./App.scss";
import React, { ComponentType, useCallback, useEffect, useState } from "react";
import { useFindByCoordsMutation } from "./app/services/geoApi";
import Clock from "./components/Clock";
import {
  useGetCurrentWeatherMutation,
  useGetForecastMutation,
} from "./app/services/weatherApi";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import Forecast from "./components/Forecast";
import { ReactComponent as LocationIcon } from "./assets/location.svg";
import LoadingScreen from "./components/LoadingScreen";
import { CurrentWeatherResponse, ForecastResponse } from "./types";
import Search from "./components/Search";
import { getCityName } from "./app/utils";

const App: ComponentType = () => {
  const [findCityByCoords] = useFindByCoordsMutation();
  const [getCurrentWeather] = useGetCurrentWeatherMutation();
  const [getForecast] = useGetForecastMutation();

  const [city, setCity] = useState({
    name: "Ташкент",
    lat: 41.2646,
    lon: 69.2163,
  });
  const [current, setCurrent] = useState<CurrentWeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const getWeather = useCallback(
    (coord: { lat: number; lon: number }) => {
      Promise.all([
        getCurrentWeather(coord).unwrap(),
        getForecast(coord).unwrap(),
      ])
        .then((res) => {
          setCurrent(res[0]);
          setForecast(res[1]);
          setOpen(false);
        })
        .catch(console.error);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  useEffect(() => {
    handleSelectMyLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeCity = () => {
    setOpen(true);
  };

  const handleSelectMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lon } = position.coords;
      findCityByCoords({ lat, lon })
        .unwrap()
        .then((res) => {
          getWeather({ lat, lon });
          setCity({ name: getCityName(res[0]), lat, lon });
        })
        .catch(console.error);
    });
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  if (!current || !forecast) return <LoadingScreen />;

  return (
    <div className="layout">
      <header>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            columnGap: 40,
            marginBottom: 30,
          }}
        >
          <h1>{getCityName(city)}</h1>
          <Clock />
        </div>
        <div className="actionButtons">
          <button className="actionButton" onClick={handleChangeCity}>
            Сменить город
          </button>
          <button className="actionButton" onClick={handleSelectMyLocation}>
            <LocationIcon />
            Мое местоположение
          </button>
        </div>
      </header>

      {current && <CurrentWeatherCard data={current} />}

      {forecast && <Forecast data={forecast} />}

      {open && (
        <div className="modal">
          <div
            className="modal__overlay"
            onClick={() => handleCloseModal()}
          ></div>
          <div className="modal__dialog dialog">
            <div className="dialog__close"></div>
            <div className="dialog__content">
              <Search onCitySelect={setCity} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
