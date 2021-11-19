import endpoints from "../../config/endpoints";
import axios, { AxiosInstance } from "axios";
import uriParser from "../../utils/uri-parser.util";
import { VehicleFilter } from "../../models/vehicle-filter.model";
import { DecodeVinResult, FuelType, FuelTypeResult, Make, MakesResult, Model, ModelResult, VehicleInformation } from "../../models/vehicle-information.model";
import { normalize } from "path";

export class NhtsaAPIService {
  constructor(private readonly connector: AxiosInstance) {}

  public async getVehicleMakes(): Promise<Make[]> {
    try {
      const response = await this.connector.get(endpoints.getVehicleMakes);
      const makesResult: MakesResult = response.data;
      return makesResult.Results;
    } catch (error) {
      console.log("Something went wrong getting vehicles make list: ", error);
      return [];
    }
  }

  public async getVehicleModelsByMake(make: string): Promise<Model[]> {
    try {
      const url: string = uriParser(endpoints.getVehicleModelsByMake, { make });
      const response = await this.connector.get(url);
      const modelResult: ModelResult = response.data;
      return modelResult.Results;
    } catch (error) {
      console.log("Something went wrong getting model list: ", error);
      return [];
    }
  }

  public async getFuelTypes(): Promise<FuelType[]> {
    try {
      const response = await this.connector.get(endpoints.getFuelTypes);
      const fuelTypeResult: FuelTypeResult = response.data;
      return fuelTypeResult.Results;
    } catch (error) {
      console.log("Something went wrong getting fuel type list: ", error);
      return [];
    }
  }

  public async searchVehicle(filters: VehicleFilter): Promise<VehicleInformation> {
    try {
      const url: string = uriParser(endpoints.decodedVinValues, { vin: filters.vin, year: filters.year});
      const response = await this.connector.get(url);
      const decodeVinResult: DecodeVinResult = response.data;
      const vehicles: VehicleInformation[] = decodeVinResult.Results;

      // filter result by remain filters
      const filteredVehicle: VehicleInformation = vehicles.find(
        vehicle =>
          vehicle.Make.toUpperCase() === filters.make &&
          vehicle.Model.toUpperCase() === filters.model &&
          (vehicle.FuelTypePrimary.toUpperCase() === filters.fuelType ||
            vehicle.FuelTypeSecondary.toUpperCase() === filters.fuelType)
      );

      return filteredVehicle;

    } catch (error) {
      console.log("Something went wrong searching the vehicle: ", error);
      return null;
    }
  }

  private normalizeFilters(filters: VehicleFilter): VehicleFilter {
    // Normalize all properties to all uppercase letters */
    filters.vin = filters.vin.toUpperCase();
    filters.make = filters.make.toUpperCase();
    filters.model = filters.model.toUpperCase();
    filters.fuelType = filters.fuelType.toUpperCase();
    return filters;
  }
}

export const nhtsaAPIService = new NhtsaAPIService(
  axios.create({
    timeout: 5000,
  })
);
