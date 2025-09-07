import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import ContentTitle from "../../components/ContentTitle";
import { employees } from "../../arrays/employees";
import { tableheaders } from "../../arrays/tableheaders";
import axios from "axios";

const EmployeeList = () => {
  const [wew, setWew] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        setWew(res.data);
      } catch (err) {
        console.error("Export failed:", err?.message || err);
      }
    })();
  }, []);

  console.log(wew);

  return (
    <>
      <ContentTitle />
      <Box sx={{ overflow: "scroll" }}>
        <Table>
          {/* Table Header */}
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {tableheaders.map((header, index) => (
                <TableCell key={index} sx={{ fontWeight: "bold" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {wew?.map((emp, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f0f8ff",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell>{emp.idNumber}</TableCell>
                <TableCell>{`${emp.firstName} ${emp.middleName} ${emp.lastName}`}</TableCell>
                <TableCell>{emp.screenName}</TableCell>
                <TableCell>{emp.gender}</TableCell>
                <TableCell>{emp.basicSalary}</TableCell>
                {/* <TableCell>{emp.civilStatus}</TableCell>
                <TableCell>{emp.address}</TableCell>
                <TableCell>{emp.contactNumber}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.sssNumber}</TableCell>
                <TableCell>{emp.philHealthNumber}</TableCell>
                <TableCell>{emp.pagibigNumber}</TableCell>
                <TableCell>{emp.tin}</TableCell>
                <TableCell>{emp.dateOfBirth}</TableCell>
                <TableCell>{emp.jobTitle}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.dateHired}</TableCell>
                <TableCell>{emp.employmentType}</TableCell>
                <TableCell>{emp.paymentMethod}</TableCell>
                <TableCell>{emp.bankAccountNo}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default EmployeeList;
