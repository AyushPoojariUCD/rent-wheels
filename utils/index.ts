import { CarProps } from "@/types";
import { mockCars } from "./mockData";


// ✅ FETCH CARS (mock version)
export async function fetchCars(filters: any): Promise<CarProps[]> {

  await new Promise(resolve => setTimeout(resolve, 200));

  let cars = [...mockCars];

  if (filters.manufacturer)
    cars = cars.filter(car =>
      car.make.toLowerCase()
        .includes(filters.manufacturer.toLowerCase())
    );

  if (filters.model)
    cars = cars.filter(car =>
      car.model.toLowerCase()
        .includes(filters.model.toLowerCase())
    );

  if (filters.year)
    cars = cars.filter(car =>
      car.year === filters.year
    );

  if (filters.fuel)
    cars = cars.filter(car =>
      car.fuel_type === filters.fuel
    );

  return cars.slice(0, filters.limit || 10);
}



// ✅ CALCULATE RENT
export function calculateCarRent(
  city_mpg: number,
  year: number
): string {

  const basePrice = 50;

  const mileageFactor = city_mpg * 0.1;

  const ageFactor =
    (new Date().getFullYear() - year) * 0.05;

  const rent =
    basePrice + mileageFactor + ageFactor;

  return Math.round(rent).toString();
}



// ✅ GENERATE IMAGE URL (THIS FIXES YOUR ERROR)
export function generateCarImageUrl(
  car: CarProps,
  angle?: string
): string {

  const url = new URL(
    "https://cdn.imagin.studio/getimage"
  );

  url.searchParams.append(
    "customer",
    "hrjavascript-mastery"
  );

  url.searchParams.append(
    "make",
    car.make
  );

  url.searchParams.append(
    "modelFamily",
    car.model.split(" ")[0]
  );

  url.searchParams.append(
    "modelYear",
    car.year.toString()
  );

  url.searchParams.append(
    "zoomType",
    "fullscreen"
  );

  url.searchParams.append(
    "angle",
    angle || "front"
  );

  return url.toString();
}



// ✅ UPDATE SEARCH PARAMS (optional)
export function updateSearchParams(
  type: string,
  value: string
): string {

  const params =
    new URLSearchParams(window.location.search);

  params.set(type, value);

  return `${window.location.pathname}?${params.toString()}`;
}