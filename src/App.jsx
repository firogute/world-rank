import { useEffect, useState } from "react";
import axios from "./api/axiosInstance";
import Logo from "./assets/Logo.svg";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("all?sort=population");
      const data = response.data;
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
        <main className="min-h-screen flex ">
          <header className="header flex justify-center items-center w-full">
            <img src={Logo} alt="logo" className="" />
          </header>

          <div className=""></div>
        </main>
      </div>
    </>
  );
}

export default App;
