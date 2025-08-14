import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";

// Generate 19 dummy rows, each with 21 columns
const rows = Array.from({ length: 5 }, (_, rowIndex) =>
  Array.from(
    { length: 21 },
    (_, colIndex) => `Row ${rowIndex + 1} - Col ${colIndex + 1}`
  )
);

// Generate column headers
const headers = Array.from({ length: 21 }, (_, i) => `Header ${i + 1}`);

function Tables() {
  return <Box sx={{ mt: 7 }}>Zaf</Box>;
}

export default Tables;
