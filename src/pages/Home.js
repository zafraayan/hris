import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Box, Card, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <Header />
      <Box sx={{ p: 0, m: 0, display: "flex" }}>
        <Sidebar />
        <Box
          sx={{
            p: 2,
            mt: 5,
            width: "100%",
            // height: "100%",
            // backgroundColor: "green",
          }}
        >
          <main>
            <Outlet />
          </main>
        </Box>
      </Box>
    </>
  );
}

export default Home;
