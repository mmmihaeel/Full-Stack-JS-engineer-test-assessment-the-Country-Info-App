import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import {
  AvailableCountry,
  CountryInfo,
  FlagImageResponse,
  PopulationDataResponse,
} from '../interfaces/countries.interface';
import { ConfigModule } from '@nestjs/config';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [CountriesService],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should fetch available countries', async () => {
    const mockResponse: AxiosResponse<AvailableCountry[]> = {
      data: [
        {
          countryCode: 'AD',
          name: 'Andorra',
        },
        {
          countryCode: 'AL',
          name: 'Albania',
        },
        {
          countryCode: 'AM',
          name: 'Armenia',
        },
      ],
      status: 200,
      statusText: 'OK',
      headers: undefined,
      config: undefined,
    };

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(mockResponse));

    const countries = await service.getAvailableCountries();
    expect(countries).toEqual(mockResponse.data);
  });

  it('should fetch country info', async () => {
    const mockBorderCountriesResponse: AxiosResponse<CountryInfo> = {
      data: undefined,
      status: 200,
      statusText: 'OK',
      headers: undefined,
      config: undefined,
    };
    const mockPopulationDataResponse: AxiosResponse<PopulationDataResponse> = {
      data: {
        error: false,
        msg: 'Albania with population',
        data: {
          country: 'Albania',
          code: 'ALB',
          iso3: 'ALB',
          populationCounts: [
            {
              year: 1960,
              value: 1608800,
            },
          ],
        },
      },
      status: 200,
      statusText: 'OK',
      headers: undefined,
      config: undefined,
    };
    const mockFlagUrlResponse: AxiosResponse<FlagImageResponse> = {
      data: {
        error: false,
        msg: 'Albania and flag retrieved',
        data: {
          name: 'Albania',
          flag: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg',
          iso2: 'AL',
          iso3: 'ALB',
        },
      },
      status: 0,
      statusText: '',
      headers: undefined,
      config: undefined,
    };

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(mockBorderCountriesResponse))
      .mockImplementationOnce(() => of(mockPopulationDataResponse))
      .mockImplementationOnce(() => of(mockFlagUrlResponse));

    const countryInfo = await service.getCountryInfo('AD');

    expect(countryInfo).toEqual({
      borderCountries: mockBorderCountriesResponse.data.borders.map(
        (country) => country.countryCode,
      ),
      populationData: mockPopulationDataResponse?.data?.data?.populationCounts,
      flagUrl: mockFlagUrlResponse?.data?.data?.flag,
    });
  });
});
