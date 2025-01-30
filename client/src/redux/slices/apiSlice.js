import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//const API_URI = "http://localhost:4000/api";
const API_URI="https://digishyam-management-system-backend.onrender.com";
const baseQuery = fetchBaseQuery({ baseUrl: API_URI });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
