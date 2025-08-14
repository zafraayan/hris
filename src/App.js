// App.js
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Attendance from "./pages/Attendance";
import Overview from "./pages/Dashboard/Overview";
import Notifications from "./pages/Dashboard/Notifications";
import { navItems } from "./arrays/navItems";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/attendance")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log(data);

  return (
    <Box component="main" sx={{ flexGrow: 1, ml: "240px", p: 3 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            {navItems.map((el) =>
              el.subMenu.map((sub, i) => (
                <Route path={sub.url} element={sub.component} />
              ))
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
