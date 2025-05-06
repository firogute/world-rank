import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

const CountryDetail = ({ country, onBack }) => {
  const [neighbors, setNeighbors] = useState([]);
  useEffect(() => {
    const fetchNeighbors = async () => {
      if (!country.borders || country.borders.length === 0) return;

      try {
        const responses = await Promise.all(
          country.borders.map((code) => axios.get(`alpha/${code}`))
        );
        const result = responses.map((res) => res.data[0]);
        const neighborsData = result.map((c) => ({
          name: c.name.common,
          flag: c.flags.png,
          alt: c.flags.alt,
        }));
        setNeighbors(neighborsData);
      } catch (error) {
        console.error("Error fetching neighbors:", error);
      }
    };

    fetchNeighbors();
  }, [country.borders]);
  return (
    <div className="bg-[#1B1D1F] border border-[#282B30] sm:rounded-xl mx-auto -mt-[45px] sm:-mt-[60px] max-w-[720px] w-full text-[#D2D5DA] z-10 flex flex-col gap-10">
      <div className="max-w-[260px] min-h-[196px] mx-auto -mt-[37.5px] sm:-mt-[50px] grid">
        <img
          alt={country.flags.alt}
          className="w-full h-full rounded-xl"
          src={country.flags.png}
        />
      </div>
      <div className="text-center">
        <h1 className="text-[2rem] font-medium">{country.name.common}</h1>
        <p>{country.name.official}</p>
      </div>
      <div className="flex gap-10 justify-center flex-wrap px-5">
        <div className="grow bg-[#282B30] px-5 py-2 rounded-xl flex items-center justify-center">
          <p className="pr-5 border-r py-2 border-[#1B1D1F]">Population</p>
          <p className="bg-[#282B30] p-3 pl-5 py-2 text-lg font-medium">
            {country.population.toLocaleString()}
          </p>
        </div>
        <div className="grow bg-[#282B30] px-5 py-2 rounded-xl flex items-center justify-center">
          <p className="pr-5 border-r py-2 border-[#1B1D1F]">Area</p>
          <p className="bg-[#282B30] p-3 pl-5 py-2 text-lg font-medium">
            {country.area.toLocaleString()} km²
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-sm">
          <div className="border-t border-[#282B30] px-5 py-6 flex justify-between">
            <p>Region</p>
            <p>{country.region}</p>
          </div>
          <div className="border-t border-[#282B30] px-5 py-6 flex justify-between">
            <p>Subregion</p>
            <p>{country.subregion}</p>
          </div>
          <div className="border-t border-[#282B30] px-5 py-6 flex justify-between">
            <p>Languages</p>
            <p>{Object.values(country.languages).join(", ")}</p>
          </div>
          <div className="border-t border-[#282B30] px-5 py-6 flex justify-between">
            <p>Currencies</p>
            <p>
              {Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(", ")}
            </p>
          </div>
          <div className="border-t border-[#282B30] px-5 py-6 flex justify-between">
            <p>Continents</p>
            <p>{country.continents.join(", ")}</p>
          </div>
          <div className="border-t border-[#282B30] px-5 py-6 flex flex-col gap-6">
            <p className="font-bold">Neighbouring Countries</p>
            <div className="flex gap-4 flex-wrap">
              {neighbors.map((neighbor, i) => {
                return (
                  <div className="flex flex-col gap-1.5" key={i}>
                    <figure>
                      <img
                        alt={neighbor.alt}
                        className="rounded-md w-20 h-[60px]"
                        src={neighbor.flag}
                      />
                      <figcaption>{neighbor.name}</figcaption>
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-[#282B30] rounded-xl text-sm text-white"
        onClick={onBack}
      >
        Back to Country List
      </button>
    </div>
  );
};

export default CountryDetail;
