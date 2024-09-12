import CountryList from "@/components/CountryList/CountryList";
import { Api } from "@/services";
import React from "react";

const CountryListPage = async () => {
  try {
    const countries = await Api().countries.getCountries();

    return <CountryList countries={countries} />;
  } catch (err) {
    return <CountryList countries={undefined} />;
  }
}

export default CountryListPage;