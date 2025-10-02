import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const CountryDetail = ({ country, onBack }) => {
  const [details, setDetails] = useState(null);
  const [neighbors, setNeighbors] = useState([]);

  // fetch extra details: languages, currencies, continents, borders
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `alpha/${country.cca3}?fields=languages,currencies,continents,borders`
        );
        setDetails(res.data[0]);
      } catch (err) {
        console.error("Error fetching country details:", err);
      }
    };
    fetchDetails();
  }, [country]);

  // fetch neighboring countries
  useEffect(() => {
    if (!details?.borders?.length) return;

    const fetchNeighbors = async () => {
      try {
        const responses = await Promise.all(
          details.borders.map((code) =>
            axios.get(`alpha/${code}?fields=name,flags`)
          )
        );
        const neighborsData = responses.map((res) => ({
          name: res.data[0].name.common,
          flag: res.data[0].flags.png,
          alt: res.data[0].flags.alt,
        }));
        setNeighbors(neighborsData);
      } catch (err) {
        console.error("Error fetching neighbors:", err);
      }
    };
    fetchNeighbors();
  }, [details]);

  if (!details) return <p className="text-white text-center py-10">Loading...</p>;

  return (
    <div className="bg-[#1B1D1F] border border-[#282B30] sm:rounded-xl mx-auto max-w-[720px] w-full text-[#D2D5DA] flex flex-col gap-6 p-5">
      <div className="max-w-[260px] mx-auto">
        <img
          src={country.flags.png}
          alt={country.flags.alt || country.name.common}
          className="rounded-xl w-full h-full"
        />
      </div>
      <h1 className="text-2xl text-center">{country.name.common}</h1>
      <p className="text-center">{country.name.official}</p>

      <div className="flex gap-6 justify-center flex-wrap">
        <div className="bg-[#282B30] px-5 py-2 rounded-xl flex items-center justify-center gap-2">
          <p>Population:</p>
          <p>{country.population.toLocaleString()}</p>
        </div>
        <div className="bg-[#282B30] px-5 py-2 rounded-xl flex items-center justify-center gap-2">
          <p>Area:</p>
          <p>{country.area.toLocaleString()} km²</p>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <div className="border-t border-[#282B30] py-4 flex justify-between">
          <p>Region</p>
          <p>{country.region}</p>
        </div>
        <div className="border-t border-[#282B30] py-4 flex justify-between">
          <p>Subregion</p>
          <p>{country.subregion}</p>
        </div>
        <div className="border-t border-[#282B30] py-4 flex justify-between">
          <p>Languages</p>
          <p>{Object.values(details.languages || {}).join(", ")}</p>
        </div>
        <div className="border-t border-[#282B30] py-4 flex justify-between">
          <p>Currencies</p>
          <p>
            {details.currencies
              ? Object.values(details.currencies)
                .map((c) => c.name)
                .join(", ")
              : "N/A"}
          </p>
        </div>
        <div className="border-t border-[#282B30] py-4 flex justify-between">
          <p>Continents</p>
          <p>{details.continents?.join(", ")}</p>
        </div>

        {neighbors.length > 0 && (
          <div className="border-t border-[#282B30] py-4">
            <p className="font-bold">Neighbouring Countries</p>
            <div className="flex flex-wrap gap-4 mt-2">
              {neighbors.map((n, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <img src={n.flag} alt={n.alt} className="w-20 h-12 rounded-md" />
                  <p>{n.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        className="mt-6 px-4 py-2 bg-[#282B30] rounded-xl text-white"
        onClick={onBack}
      >
        Back to Country List
      </button>
    </div>
  );
};

export default CountryDetail;
