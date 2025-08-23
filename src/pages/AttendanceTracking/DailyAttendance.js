import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import slogo from "../assets/slogo.jpg";
// import { employees } from "./employees";
import Clock from "../../components/Clock";
import { statechEmployees } from "../../arrays/employees";
import ContentTitle from "../../components/ContentTitle";
import LinearProgressWithLabel from "../../components/LinearProgressWithLabel";

function DailyAttendance() {
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [progress, setProgress] = useState(10);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => (old >= 100 ? 0 : old + 10));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true); // start loading
      const res = await axios.get("http://localhost:5000/api/logs/daily-logs", {
        params: {
          chosenDate: data.date,
        },
      });
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    async function fetchEmployees() {
      const res = await axios.get("http://localhost:5000/api/employees");

      setEmployees(res.data);
    }

    fetchEmployees();
  }, []);

  return (
    <>
      <ContentTitle />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{ margin: "auto", width: "50%" }}
        >
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Select Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>

      <Box>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        ) : attendance.length === 0 ? (
          "No Record Found"
        ) : (
          <TableContainer component={Paper}>
            <Table>
              {/* Table Header */}
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Times</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {attendance.map((at, idx) =>
                  employees.map(
                    (em) =>
                      at.userSn === em.uid.toString() && (
                        <TableRow key={`${idx}-${em.uid}`}>
                          <TableCell>{em.name}</TableCell>

                          {at.times.map((el, i) => (
                            <TableCell
                              key={i}
                              style={{
                                color:
                                  i === 0 &&
                                  new Date(`1970-01-01 ${el}`) >
                                    new Date(`1970-01-01 10:10 AM`)
                                    ? "red"
                                    : "black",
                              }}
                            >
                              {el}
                            </TableCell>
                          ))}
                        </TableRow>
                      )
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}

export default DailyAttendance;
