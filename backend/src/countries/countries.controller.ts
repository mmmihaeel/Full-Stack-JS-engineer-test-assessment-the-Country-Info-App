import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import {
  AvailableCountry,
  CountryDetails,
} from '../interfaces/countries.interface';
import { CountryCodeValidationPipe } from '../pipes/country-code-validation.pipe';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('/')
  async getAvailableCountries(): Promise<AvailableCountry[]> {
    return this.countriesService.getAvailableCountries();
  }

  @Get('/:countryCode')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getCountryInfo(
    @Param('countryCode', CountryCodeValidationPipe) countryCode: string,
  ): Promise<CountryDetails> {
    return this.countriesService.getCountryInfo(countryCode);
  }
}
