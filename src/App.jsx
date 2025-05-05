import { useEffect, useState } from "react";
import axios from "./api/axiosInstance";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get("all?sort=population");
      console.log(response.data);
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
