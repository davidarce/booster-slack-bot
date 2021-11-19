interface Values {
  [key: string]: any;
}

export class VehicleFilter {
  constructor(values: Values) {
    this.vin = values["field_vin"]["vin_input-action"].value.toUpperCase();
    this.make = values["field_make"]["make_input-action"].value.toUpperCase();
    this.model = values["field_model"]["model_input-action"].value.toUpperCase();
    this.year = values["field_year"]["year_input-action"].value;
    this.fuelType =
      values["field_fuel_type"]["fuel_type-select-action"][
        "selected_option"
      ].value.toUpperCase();
  }

  vin: string;

  make: string;

  model: string;

  year: string;

  fuelType: string;
}
