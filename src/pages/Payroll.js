import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Stack,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { boxstyle } from "../snippets/boxstyle";

const Payroll = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Box sx={boxstyle}>Payroll</Box>
    </>
  );
};

export default Payroll;
