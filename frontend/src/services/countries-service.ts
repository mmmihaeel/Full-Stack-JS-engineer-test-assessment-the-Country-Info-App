import {
  AvailableCountry,
  CountryDetails,
} from "@/interfaces/countries.interface";
import { AxiosInstance } from "axios";

export const CountriesService = (instance: AxiosInstance) => ({
  async getCountries() {
    try {
      const { data } = await instance.get<AvailableCountry[]>("/countries");
      return data;
    } catch (err) {
      throw err;
    }
  },

  async getCountryDetails(countyCode: string) {
    try {
      const { data } = await instance.get<CountryDetails>(
        `/countries/${countyCode}`
      );
      return data;
    } catch (err) {
      throw err;
    }
  },
});
