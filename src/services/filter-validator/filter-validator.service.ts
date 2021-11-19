import { VehicleFilter } from "../../models/vehicle-filter.model";
import { NhtsaAPIService, nhtsaAPIService } from "../nhtsa-api";

interface Error {
  vin?: string;
  make?: string;
  model?: string;
  year?: string;
  fuelType?: string;
  hasError: boolean;
}

const TRANSLITERATION_TABLE: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  P: 7,
  R: 9,
  S: 2,
  T: 3,
  U: 4,
  V: 5,
  W: 6,
  X: 7,
  Y: 8,
  Z: 9,
};

const WEIGHTS_ARRAY: number[] = [
  8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2,
];

export class FilterValidatorService {
  constructor(private readonly nhtsaService: NhtsaAPIService) {}

  public async validateFilters(filter: VehicleFilter): Promise<Error> {
    const errors: Error = {
      hasError: false,
    };

    // Validate VIN
    if (!this.isValidVIN(filter.vin)) {
      errors.vin = "VIN is not valid";
      errors.hasError = true;
    }

    // Validate Make
    const makeList = await this.nhtsaService.getVehicleMakes();
    if (!makeList.find((make) => make.Name.toUpperCase() === filter.make)) {
      errors.make = "Make is not valid, maybe does not exits.";
      errors.hasError = true;
    }

    // Validate Model
    const modelByMakeList = await this.nhtsaService.getVehicleModelsByMake(
      filter.make
    );
    if (!modelByMakeList.find((model) => model.Model_Name.toUpperCase() === filter.model)) {
      errors.model = `Model is not valid for a given Make: ${filter.make}`;
      errors.hasError = true;
    }

    // Validate Year
    if (!this.isValidYear(filter.year)) {
      errors.year = "Year is not a valid number";
      errors.hasError = true;
    }

    // Validate Fueltype
    const fuelTypeList = await this.nhtsaService.getFuelTypes();
    if (!fuelTypeList.find((fuelType) => fuelType.Name.toUpperCase() === filter.fuelType)) {
      errors.fuelType = "Fuel Type is not valid, maybe does not exits.";
      errors.hasError = true;
    }

    return errors;
  }

  private isValidVIN(vin: string) {
    // validate length
    if (vin.length !== 17) {
      return false;
    }

    // Normalize the vin to all uppercase letters */
    vin = vin.toUpperCase();

    // validate does not contain letters O, I, and Q
    if (/[OIQ]/.test(vin)) {
      return false;
    }

    // split the vin digits into an array */
    const vinArray: string[] = vin.split("");

    // checkDigit will be tested against the checkSum later */
    const checkDigit: string = vinArray[8];

    /*
     * In a valid VIN, the checkDigit can either be:
     * a number, 0-9 inclusive OR the character 'X'
     */
    if (isNaN(parseInt(checkDigit)) && checkDigit !== "X") {
      return false;
    }

    /*
     * The checkValue must be a digit and 'X' is the only valid alphabetic check value.
     * As per the algorithm, a checkDigit of 'X' is equal to a checkValue of `10` and needs
     * to be converted as such.
     */
    const checkValue: number = checkDigit === "X" ? 10 : parseInt(checkDigit);

    /*
     * Maps the vinArray and converts any values (digits) that are alphabetic,
     * into numbers, using the TRANSLITERATION_TABLE.
     * Then these numbers are multiplied against their corresponding weight
     * in the WEIGHTS_ARRAY, matched by index position.
     * All 17 of those digitValues are then added together and divided by 11.
     * The remainder, or % modulo, of that division will be the final 'checksum'.
     */
    const checksum: number =
      vinArray
        .map((digit: string, index: number) => {
          let digitValue: number;
          /* Use the transliteration table to convert any Not a Number(NaN) values to numbers */
          isNaN(parseInt(digit))
            ? (digitValue = TRANSLITERATION_TABLE[digit])
            : (digitValue = parseInt(digit));

          /* Convert the digitValue to a weighted number corresponding to it's position, by index, in the weightsArray. */
          const weight: number = WEIGHTS_ARRAY[index];

          /* The final step for each digit is to multiply the digit by it's corresponding weight */
          return digitValue * weight;
        })
        /* Finally, get the sum of all digits and divide by 11, the remainder of that operation is the checksum */
        .reduce((acc, currValue) => acc + currValue, 0) % 11;

    /*
     * The checksum is compared against the checkValue we set earlier (the 9th digit of the VIN)
     * As per the algorithm, if they are equal to each other, then the VIN must be valid and
     * we return true, otherwise the VIN is invalid and we return false.
     */
    return checksum === checkValue;
  }

  private isValidYear(year: string) {
    return !isNaN(parseInt(year));
  }
}

export const filterValidatorService = new FilterValidatorService(
  nhtsaAPIService
);
