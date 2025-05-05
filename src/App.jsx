import { useEffect, useState } from "react";
import axios from "./api/axiosInstance";
import Logo from "./assets/Logo.svg";
import SearchIcon from "./assets/Search.svg";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("all?sort=population");
      const data = response.data;
      setCountries(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };
  useEffect(() => {
    console.log("Fetching");
    fetchData();
  }, []);

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
                <span>Found 100 Countries</span>
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
                      <button className="rounded-xl px-3 py-1.5">
                        Americas
                      </button>
                      <button className="rounded-xl px-3 py-1.5">
                        Antarctic
                      </button>
                      <button className="rounded-xl px-3 py-1.5 bg-[#282B30]">
                        Africa
                      </button>
                      <button className="rounded-xl px-3 py-1.5">Asia</button>
                      <button className="rounded-xl px-3 py-1.5">Europe</button>
                      <button className="rounded-xl px-3 py-1.5 bg-[#282B30]">
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
