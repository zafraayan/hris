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

function DailyAttendance() {
  const [tsLength, setTsLength] = useState();
  const [formatDate, setFormatdate] = useState();
  const [attendance, setAttendance] = useState([]);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/employees/daily-attendance"
      );

      const startDate = new Date(`${data.chosenDate}T00:00:00+08:00`);
      const endDate = new Date(`${data.chosenDate}T23:59:59+08:00`);

      const result = Object.keys(res.data)
        .map((key) => {
          const logsForDay = res.data[key].filter((log) => {
            const ts = new Date(log.recordTime);
            return ts >= startDate && ts <= endDate;
          });

          if (logsForDay.length > 0) {
            // format times
            const times = logsForDay.map((log) =>
              new Date(log.recordTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // 24-hour format
              })
            );

            return {
              deviceUserId: key,
              times, // e.g. ["08:05", "12:01", "13:02", "17:30"]
            };
          }
          return null;
        })
        .filter(Boolean);

      setAttendance(result);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(attendance);

  return (
    <>
      <ContentTitle />

      <Box sx={{ m: 2 }} />

      <Box sx={{ m: 2 }} />
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        <Clock />
      </Typography>
      <Box sx={{ m: 2 }} />
      <Stack align="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" sx={{ gap: 2 }}>
            <Controller
              name="chosenDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Select Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }} // ensures the label stays visible
                  InputProps={{
                    sx: { textAlign: "right" }, // optional: aligns text inside the input
                  }}
                  sx={{
                    width: 500,
                    maxWidth: 300,
                    minWidth: 200,
                    mx: "auto", // centers the component horizontally
                    display: "block", // ensures centering takes effect
                  }}
                />
              )}
            />

            <Button
              sx={{ maxWidth: 500, mx: "auto" }}
              type="submit"
              variant="contained"
            >
              Check Attendance
            </Button>
            {formatDate && (
              <Typography variant="h6">Chosen Date: {formatDate}</Typography>
            )}
          </Stack>
        </form>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              {/* dynamically generate columns based on max times */}
              {Array.from(
                {
                  length: Math.max(
                    ...attendance.map((el) => el.times.length),
                    0
                  ),
                },
                (_, idx) => (
                  <TableCell key={idx}>Time {idx + 1}</TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {attendance.map((el, rowIdx) => {
              const employeeName =
                statechEmployees.find(
                  (em) => em.id.toString() === el.deviceUserId.toString()
                )?.name || el.deviceUserId;

              return (
                <TableRow key={rowIdx}>
                  <TableCell>{employeeName}</TableCell>

                  {el.times.map((time, colIdx) => {
                    // Only check the first time-in (colIdx === 0)
                    let isLate = false;

                    if (colIdx === 0 && time) {
                      // Convert to 24h Date object for comparison
                      const t = new Date(`1970-01-01 ${time}`);
                      const cutoff = new Date(`1970-01-01 10:10 AM`);
                      isLate = t > cutoff;
                    }

                    return (
                      <TableCell
                        key={colIdx}
                        sx={isLate ? { color: "red", fontWeight: "bold" } : {}}
                      >
                        {time}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DailyAttendance;
