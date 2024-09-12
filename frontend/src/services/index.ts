import axios from "axios";
import https from "node:https";
import { CountriesService } from "./countries-service";

const API_URL = String(process.env.API_URL);

export type ApiReturnType = {
  countries: ReturnType<typeof CountriesService>;
};

export const Api = (xServerPassword?: string | undefined): ApiReturnType => {
  const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    headers: {
      "x-server-password": xServerPassword,
    },
  });
  const result = Object.entries({
    countries: CountriesService,
  }).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);
  return result;
};
