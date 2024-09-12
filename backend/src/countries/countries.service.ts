import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  AvailableCountry,
  CountryDetails,
  CountryInfo,
  FlagImageResponse,
  PopulationDataResponse,
} from '../interfaces/countries.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAvailableCountries(): Promise<AvailableCountry[]> {
    const url = `${this.configService.get('DATE_NAGER_API_BASE_URL')}/AvailableCountries`;
    const { data } = await firstValueFrom(
      this.httpService.get<AvailableCountry[]>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(
            `Message: ${error?.message}, code: ${error?.code}, status: ${error?.status}`,
            error.stack,
            'Available Countries Request',
          );
          throw new InternalServerErrorException();
        }),
      ),
    );
    return data;
  }

  async getCountryInfo(countryCode: string): Promise<CountryDetails> {
    const availableCountries = await this.getAvailableCountries();

    const availableCountry = availableCountries?.find(
      (availableCountry) => availableCountry?.countryCode === countryCode,
    );

    if (!availableCountry) {
      throw new NotFoundException(`Country with ${countryCode} is not found!`);
    }

    const countryInfoData = await firstValueFrom(
      this.httpService
        .get<CountryInfo>(
          `${this.configService.get('DATE_NAGER_API_BASE_URL')}/CountryInfo/${countryCode}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(
              `Message: ${error?.message}, code: ${error?.code}, status: ${error?.status}`,
              error.stack,
              'Country Info Request',
            );
            throw new InternalServerErrorException();
          }),
        ),
    );

    const populationData = await firstValueFrom(
      this.httpService
        .post<PopulationDataResponse>(
          `${this.configService.get('COUNTRIES_NOW_API_BASE_URL')}/countries/population`,
          { country: availableCountry?.name },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(
              `Message: ${error?.message}, code: ${error?.code}, status: ${error?.status}`,
              error.stack,
              'Population Data Request',
            );
            throw new InternalServerErrorException();
          }),
        ),
    );

    const flagImageData = await firstValueFrom(
      this.httpService
        .post<FlagImageResponse>(
          `${this.configService.get('COUNTRIES_NOW_API_BASE_URL')}/countries/flag/images`,
          { iso2: availableCountry?.countryCode },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(
              `Message: ${error?.message}, code: ${error?.code}, status: ${error?.status}`,
              error.stack,
              'Flag Image Request',
            );
            throw new InternalServerErrorException();
          }),
        ),
    );

    return {
      countryInfo: countryInfoData?.data,
      populationData: populationData?.data?.data?.populationCounts,
      flagUrl: flagImageData?.data?.data?.flag,
    };
  }
}
