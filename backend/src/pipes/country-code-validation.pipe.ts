import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class CountryCodeValidationPipe implements PipeTransform {
  constructor(private readonly countriesService: CountriesService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'countryCode') {
      return value;
    }
    const countryCode = value.toUpperCase();
    const countries = await this.countriesService.getAvailableCountries();
    const isValid = countries.some(
      (country) => country.countryCode === countryCode,
    );
    if (!isValid) {
      throw new BadRequestException('Invalid country code');
    }
    return countryCode;
  }
}
