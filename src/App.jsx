import { useCallback, useEffect, useState } from "react";
import axios from "./api/axiosInstance";
import Logo from "./assets/Logo.svg";
import SearchIcon from "./assets/Search.svg";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedSort, setSelectedSort] = useState("population");
  const [selectedRegions, setSelectedRegions] = useState([]);

  // FETCHING COUNTRIES FROM API
  const fetchData = async () => {
    try {
      const response = await axios.get("all");
      const data = response.data;
      const sorted = data.sort((a, b) => b[selectedSort] - a[selectedSort]);
      setCountries(sorted);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FILTER BY REGION

  const filterByRegion = (countries, selectedRegions) => {
    if (selectedRegions.length === 0) return countries;
    return countries.filter((country) =>
      selectedRegions.includes(country.region)
    );
  };

  // SORT COUNTRIES
  const sortCountries = (countries, selectedSort) => {
    const sorted = [...countries];
    if (selectedSort === "name") {
      sorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else {
      sorted.sort((a, b) => b[selectedSort] - a[selectedSort]);
    }
    return sorted;
  };

  const paginate = (countries, currentPage, itemsPerPage = 10) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return countries.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleNext = () => {
    if (currentPage * 10 < countries.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSort = (e) => setSelectedSort(e.target.value);

  useEffect(() => {
    sortCountries(selectedSort);
  }, [selectedSort]);

  const toggleRegion = (region) => {
    setSelectedRegions((prevRegions) => {
      if (prevRegions.includes(region)) {
        return prevRegions.filter((r) => r != region);
      }
      return [...prevRegions, region];
    });
  };

  const isRegionSelected = (region) => selectedRegions.includes(region);

  const applyFilters = useCallback(() => {
    const regionFiltered = filterByRegion(countries, selectedRegions);
    const sorted = sortCountries(regionFiltered, selectedSort);
    const paginated = paginate(sorted, currentPage);
    setFilteredCountries(paginated);
  }, [countries, selectedRegions, selectedSort, currentPage]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <>
      <div className="bg-[#1B1D1F]">
        <main className="min-h-screen flex flex-col font-['Be_Vietnam_Pro',sans-serif] font-normal">
          <header className="header flex justify-center items-center w-full">
            <img src={Logo} alt="logo" className="" />
          </header>

          <div className="z-10 flex justify-center">
            <div className="text-[#D2D5DA] bg-[#1B1D1F] border border-[#282B30] -mt-[60px] mx-3 rounded-xl py-6 px-3 md:px-7 md:mx-7 basis-7xl">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_384px]  gap-6">
                <span>Found {countries.length} Countries</span>
                <div className="relative">
                  <input
                    type="text"
                    className="cursor-text placeholder:text-[#D2D5DA] rounded-xl bg-[#282B30] pl-11 px-3 py-2.5 w-full"
                    placeholder="Search by Name, Region, Subregion"
                  />
                  <img
                    src={SearchIcon}
                    alt="search-icon"
                    className="absolute top-1/2 -translate-y-1/2 left-2 size-6"
                  />
                </div>
              </div>
              <div className="mt-9 grid grid-cols-1 md:grid-cols-[215px_1fr] gap-7">
                <div className="font-medium flex flex-col gap-3">
                  <label htmlFor="sortby" className="text-xs">
                    Sort By
                  </label>
                  <select
                    name="sortby"
                    id="sortby"
                    className="cursor-pointer px-3 py-2 pr-8 border-2 border-[#282B30] rounded-xl appearance-none bg-no-repeat bg-[right_0.5rem_center] text-sm"
                    onChange={handleSort}
                    value={selectedSort}
                  >
                    <option value="area" className="bg-[#1B1D1F]">
                      Area
                    </option>
                    <option value="name" className="bg-[#1B1D1F]">
                      Name
                    </option>
                    <option value="population" className="bg-[#1B1D1F]">
                      Population
                    </option>
                  </select>
                  <div className="mt-9 flex flex-col gap-3">
                    <p className="text-xs">Region</p>
                    <div className="flex flex-wrap gap-2.5 text-sm">
                      <button
                        className={`rounded-xl px-3 py-1.5 ${
                          isRegionSelected("Americas")
                            ? "bg-[#282B30]"
                            : "bg-transparent"
                        }`}
                        onClick={() => toggleRegion("Americas")}
                      >
                        Americas
                      </button>
                      <button
                        className={`rounded-xl px-3 py-1.5 ${
                          isRegionSelected("Antarctic")
                            ? "bg-[#282B30]"
                            : "bg-transparent"
                        }`}
                        onClick={() => toggleRegion("Antarctic")}
                      >
                        Antarctic
                      </button>
                      <button
                        className={`rounded-xl px-3 py-1.5 ${
                          isRegionSelected("Africa")
                            ? "bg-[#282B30]"
                            : "bg-transparent"
                        }`}
                        onClick={() => toggleRegion("Africa")}
                      >
                        Africa
                      </button>
                      <button
                        className={`rounded-xl px-3 py-1.5 ${
                          isRegionSelected("Asia")
                            ? "bg-[#282B30]"
                            : "bg-transparent"
                        }`}
                        onClick={() => toggleRegion("Asia")}
                      >
                        Asia
                      </button>
                      <button
                        className={`rounded-xl px-3 py-1.5 ${
                          isRegionSelected("Europe")
                            ? "bg-[#282B30]"
                            : "bg-transparent"
                        }`}
                        onClick={() => toggleRegion("Europe")}
                      >
                        Europe
                      </button>
                      <button
                        className={`rounded-xl px-3 py-1.5 ${
                          isRegionSelected("Oceania")
                            ? "bg-[#282B30]"
                            : "bg-transparent"
                        }`}
                        onClick={() => toggleRegion("Oceania")}
                      >
                        Oceania
                      </button>
                    </div>
                  </div>
                  <div className="mt-9 flex flex-col gap-3">
                    <p className="text-xs">Status</p>
                    <div className="grid grid-cols-[auto_1fr] gap-2.5 items-center text-sm">
                      <input
                        type="checkbox"
                        name="member"
                        id="member"
                        className="cursor-pointer size-6 bg-[#1B1D1F] rounded-md checked:bg-[#4E80EE] border-2 border-[#D2D5DA] checked:border-[#4E80EE] appearance-none"
                      />
                      <label htmlFor="member" className="cursor-pointer">
                        Member of the United Nations
                      </label>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-2.5 items-center text-sm">
                      <input
                        type="checkbox"
                        name="independent"
                        id="independent"
                        className="cursor-pointer size-6 bg-[#1B1D1F] rounded-md checked:bg-[#4E80EE] border-2 border-[#D2D5DA] checked:border-[#4E80EE] appearance-none"
                      />
                      <label htmlFor="independent" className="cursor-pointer">
                        Independent
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full grow flex flex-col gap-3 overflow-x-scroll lg:overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs">
                        <td className=" pb-4 pr-3 border-b-2 border-[#282B30]">
                          Flag
                        </td>
                        <td className=" pb-4 pr-3 border-b-2 border-[#282B30]">
                          Name
                        </td>
                        <td className=" pb-4 pr-3 border-b-2 border-[#282B30]">
                          Population
                        </td>
                        <td className=" pb-4 pr-3 border-b-2 border-[#282B30]">
                          Area (km<sup>2</sup>)
                        </td>
                        <td className=" pb-4 pr-3 border-b-2 border-[#282B30]">
                          Region
                        </td>
                      </tr>
                    </thead>
                    <tbody className="font-normal">
                      {filteredCountries.map((country, i) => {
                        return (
                          <tr
                            key={i}
                            className="hover:bg-[#282B30] cursor-pointer transition-all"
                          >
                            <td className="p-3 pl-0">
                              <img
                                src={country.flags.png}
                                alt={country.flags.alt}
                                className="max-w-12 h-10 rounded-sm"
                              />
                            </td>
                            <td className="p-3 pl-0">{country.name.common}</td>
                            <td className="p-3 pl-0">
                              {country.population.toLocaleString()}
                            </td>
                            <td className="p-3 pl-0">
                              {country.area.toLocaleString()}
                            </td>
                            <td className="p-3 pl-0">{country.region}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="w-full flex justify-between">
                    <p className="text-sm self-end">
                      Showing {(currentPage - 1) * 10 + 1} to{" "}
                      {Math.min(currentPage * 10, countries.length)} of{" "}
                      {countries.length} countries
                    </p>
                    <div className="flex gap-3">
                      {currentPage > 1 ? (
                        <button
                          className="px-3 py-1.5 border-2 border-[#282B30] rounded-xl hover:bg-[#282B30] cursor-pointer transition-all"
                          onClick={handlePrev}
                        >
                          « Prev Page {currentPage - 1}
                        </button>
                      ) : (
                        ""
                      )}
                      {currentPage * 10 < countries.length && (
                        <button
                          className="px-3 py-1.5 border-2 border-[#282B30] rounded-xl hover:bg-[#282B30] cursor-pointer transition-all"
                          onClick={handleNext}
                        >
                          Next Page {currentPage + 1} »
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="text-center text-sm mt-12 mx-auto py-8 text-[#97A3B6]">
          Coded by{" "}
          <a
            href="#"
            className="no-underline text-gray-200 font-semibold hover:underline"
          >
            Firomsa Guteta
          </a>{" "}
          | Challenge by
          <a
            href="https://www.devchallenges.io?ref=challenge"
            className="text-gray-200 font-semibold hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            devChallenges.io
          </a>
          . |{" "}
          <a
            href="https://github.com/firogute/world-rank"
            className="text-gray-200 font-semibold hover:underline"
          >
            Source code
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
