import { useEffect, useState } from "react";
import axios from "./api/axiosInstance";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?sort=population"
      );

      const data = await response.json();
      console.log(data[0]);
    } catch (e) {
      console.error(e.message);
    }
  };
  useEffect(() => {
    console.log("Fetching");
    fetchData();
  }, []);

  return <></>;
}

export default App;
