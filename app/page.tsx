"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  CustomFilter,
  Hero,
  SearchBar,
  CarCard,
  ShowMore,
} from "@/components";

import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { CarProps } from "@/types";

export default function Home() {

  // Cars state (typed)
  const [allCars, setAllCars] = useState<CarProps[]>([]);

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Search states
  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");

  // Filter states
  const [fuel, setFuel] = useState<string>("");
  const [year, setYear] = useState<number>(2022);

  // Pagination state
  const [limit, setLimit] = useState<number>(10);

  /**
   * Fetch cars safely
   */
  const getCars = async () => {
    setLoading(true);

    try {
      const result = await fetchCars({
        manufacturer,
        year,
        fuel,
        limit,
        model,
      });

      // Ensure array safety
      if (Array.isArray(result)) {
        setAllCars(result);
      } else {
        console.error("Invalid API response:", result);
        setAllCars([]);
      }

    } catch (error) {
      console.error("Fetch error:", error);
      setAllCars([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch when filters change
   */
  useEffect(() => {
    getCars();
  }, [manufacturer, model, fuel, year, limit]);

  /**
   * Empty state
   */
  const isDataEmpty = !loading && allCars.length === 0;

  return (
    <main className="overflow-hidden">

      {/* Hero */}
      <Hero />

      <div
        className="mt-12 padding-x padding-y max-width"
        id="discover"
      >

        {/* Header */}
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>

        {/* Filters */}
        <div className="home__filters">

          <SearchBar
            setManufacturer={setManufacturer}
            setModel={setModel}
          />

          <div className="home__filter-container">

            <CustomFilter
              title="fuel"
              options={fuels}
              setFilter={setFuel}
            />

            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />

          </div>

        </div>

        {/* Results */}
        {!isDataEmpty ? (

          <section>

            {/* Car Cards */}
            <div className="home__cars-wrapper">

              {Array.isArray(allCars) &&
                allCars.map((car, index) => (
                  <CarCard
                    key={`${car.make}-${car.model}-${index}`}
                    car={car}
                  />
                ))}

            </div>

            {/* Loader */}
            {loading && (
              <div className="mt-16 w-full flex justify-center">
                <Image
                  src="/loader.svg"
                  alt="Loading"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            {/* Pagination */}
            <ShowMore
              pageNumber={limit / 10}
              isNext={allCars.length === limit}
              setLimit={setLimit}
            />

          </section>

        ) : (

          <div className="home__error-container">

            <h2 className="text-xl font-bold">
              No cars found
            </h2>

            <p className="text-gray-500">
              Try changing filters or search
            </p>

          </div>

        )}

      </div>

    </main>
  );
}