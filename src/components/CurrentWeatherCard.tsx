import React, { ComponentType } from "react";
import { ReactComponent as WindIcon } from "../assets/wind.svg";
import { ReactComponent as HumidityIcon } from "../assets/humidity.svg";
import { ReactComponent as PressureIcon } from "../assets/pressure.svg";
import { CurrentWeatherResponse } from "../types";
import { convertTempKtoC } from "../app/utils";

interface CurrentWeatherCardProps {
  data: CurrentWeatherResponse;
}

const weatherStatus: Record<string, string> = {
  Clouds: "Облачно",
  Clear: "Ясно",
  Rain: "Дождь",
  Snow: "Снег",
  Thunderstorm: "Гроза",
  Drizzle: "Изморось",
  Mist: "Туман",
  Smoke: "Дымка",
  Haze: "Дымка",
  Dust: "Пыль",
  Fog: "Туман",
  Sand: "Песок",
  Tornado: "Торнадо",
};

const CurrentWeatherCard: ComponentType<CurrentWeatherCardProps> = ({
  data,
}) => {
  if (!data) return null;

  return (
    <div className="weatherCard">
      <div className="weatherCard__temperature">
        <div className="weatherCard__temperature-icon">
          <img src={`/icons/${data.weather[0].icon}.png`} alt="" />
        </div>
        {/* 90/108 / 700 */}
        <div className="weatherCard__temperature-value">
          +{convertTempKtoC(data.main.temp)}°
        </div>
      </div>
      {/* 30/36 */}
      <div className="weatherCard__info">
        {weatherStatus[data.weather[0].main]}
      </div>
      <div className="weatherCard__details">
        <div className="weatherCard__details-item">
          <WindIcon />
          {/* 18/22 */}
          {data.wind.speed} м/с
        </div>
        <div className="weatherCard__details-item">
          <HumidityIcon />
          {data.main.humidity}%
        </div>
        <div className="weatherCard__details-item">
          <PressureIcon />
          {data.main.pressure} мм.рт.ст.
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
