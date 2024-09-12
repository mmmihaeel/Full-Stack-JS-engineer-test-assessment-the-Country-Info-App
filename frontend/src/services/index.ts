import axios from "axios";
import { CountriesService } from "./countries-service";

const NEXT_PUBLIC_API_BASE_URL = String(process.env.NEXT_PUBLIC_API_BASE_URL);

export type ApiReturnType = {
  countries: ReturnType<typeof CountriesService>;
};

export const Api = (): ApiReturnType => {
  const instance = axios.create({
    baseURL: NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
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
