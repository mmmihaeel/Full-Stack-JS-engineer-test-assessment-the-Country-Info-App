export interface AvailableCountry {
  countryCode: string;
  name: string;
}

export interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: BorderCountry[] | null;
}

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: BorderCountry[];
}

export interface FlagImageResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
  };
}

export interface PopulationCount {
  year: number;
  value: number;
}

export interface PopulationDataResponse {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationCount[];
  };
}

export interface CountryDetails {
  countryInfo: CountryInfo;
  populationData: PopulationCount[];
  flagUrl: string;
}
