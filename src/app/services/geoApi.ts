import { API_KEY as appid, BASE_API_URL } from "../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlWithSearchParams } from "../utils";
export const geoApi = createApi({
  reducerPath: "geoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL + "/geo/1.0/",
  }),
  endpoints: (builder) => ({
    findByCoords: builder.mutation({
      query: ({ lat, lon }) => ({
        url: urlWithSearchParams("reverse", { lat, lon, appid }),
        method: "get",
      }),
    }),
    findCityByName: builder.mutation({
      query: ({ q }) => ({
        url: urlWithSearchParams("direct", { q, appid, limit: 5 }),
        method: "get",
      }),
    }),
  }),
});

export const { useFindByCoordsMutation, useFindCityByNameMutation } = geoApi;
