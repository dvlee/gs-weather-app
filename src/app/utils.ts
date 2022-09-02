import { CityProps } from "../types";
import { locale } from "./constants";

export const convertTempKtoC = (tempK: number) => Math.floor(tempK - 273.15);

export const urlWithSearchParams = (
  url: string,
  params: Record<string, string | number>
) => {
  return (
    url +
    "?" +
    Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&")
  );
};

export const getTime = (date: string | Date) => {
  const d = new Date(date);
  const hours = ("0" + d.getHours()).slice(-2);
  const minutes = ("0" + d.getMinutes()).slice(-2);
  return `${hours}:${minutes}`;
};

export const getCityName = (city: CityProps): string =>
  (city.local_names && city.local_names[locale]) ?? city.name;

export const isToday = (date: string | Date) => {
  const d = new Date(date);
  const today = new Date();
  return d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
};

export const getDayOfWeek = (date: string | Date) => {
  const d = new Date(date);
  const days = ["Вс.", "Пн.", "Вт.", "Ср.", "Чт.", "Пт.", "Сб."];
  return days[d.getDay()];
};
