import { API_KEY as appid, BASE_API_URL } from "./../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlWithSearchParams } from "../utils";
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL + "/data/2.5/",
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.mutation({
      query: ({ lat, lon }) => ({
        url: urlWithSearchParams("weather", { lat, lon, appid }),
        method: "get",
      }),
    }),
    getForecast: builder.mutation({
      query: ({ lat, lon }) => ({
        url: urlWithSearchParams("forecast", { lat, lon, appid }),
        method: "get",
      }),
    }),
  }),
});

export const { useGetCurrentWeatherMutation, useGetForecastMutation } =
  weatherApi;
