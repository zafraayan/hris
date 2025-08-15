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
  const [users, setUsers] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:3001/attendance");
        setUsers(res.data);
      } catch (err) {
        console.error("Export failed:", err?.message || err);
      }
    })();
  }, []);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (data) => {
    const { chosenDate } = data;
    try {
      const res = await axios.get("http://localhost:5000/api/employees/lates", {
        params: {
          cDate: chosenDate,
        },
      });
      setUsers(res.data);

      const zafDate = new Date(chosenDate);

      const formatted = zafDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setFormatdate(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const arrayCount = [];
    users?.map((el) => arrayCount.push(el.recordTime.length));
    setTsLength(Math.max(...arrayCount));
  });

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

      <Box>
        {users?.length === 0 ? (
          <Typography align="center">
            {users?.length > 0 || "No Record Found"}
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, tableLayout: "fixed" }}
              size="small"
              aria-label="a dense table"
              variant="filled"
            >
              {users?.length > 0 && (
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Employee Name
                    </TableCell>
                    {Array.from({ length: tsLength }, (_, i) => (
                      <TableCell
                        sx={{ fontWeight: "bold" }}
                        align="right"
                      >{`Time In ${i + 1}`}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
              )}

              <TableBody>
                {users?.map((record) => (
                  <TableRow key={record.deviceUserId}>
                    <TableCell
                      sx={{ width: 200, minWidth: 200, maxWidth: 200 }}
                      component="th"
                      scope="row"
                    >
                      {statechEmployees.map(
                        (em) => em.id === Number(record.deviceUserId) && em.name
                      )}
                    </TableCell>

                    {record.recordTime.map((ts, index) => (
                      <TableCell
                        sx={{ width: 50, minWidth: 50, maxWidth: 50 }}
                        align="right"
                        key={index}
                      >
                        {index === 0
                          ? (() => {
                              // Parse timestamp
                              const date = new Date(ts);

                              // Format time in PH timezone
                              const formattedTime = new Intl.DateTimeFormat(
                                "en-US",
                                {
                                  hour12: false,
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  timeZone: "Asia/Manila",
                                }
                              ).format(date);

                              return formattedTime > "10:10" ? (
                                <Typography
                                  sx={{ color: "red", fontWeight: 600 }}
                                >
                                  {formattedTime}
                                </Typography>
                              ) : (
                                formattedTime
                              );
                            })()
                          : (() => {
                              const date = new Date(ts);
                              return new Intl.DateTimeFormat("en-US", {
                                hour12: false,
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "Asia/Manila",
                              }).format(date);
                            })()}

                        {/* {index === 0 ? (
                          ts.split("T")[1].slice(0, 5) > "02:10" ? (
                            <Typography sx={{ color: "red", fontWeight: 600 }}>
                              {ts.split("T")[1].slice(0, 5)}
                            </Typography>
                          ) : (
                            ts.split("T")[1].slice(0, 5)
                          )
                        ) : (
                          ts.split("T")[1].slice(0, 5)
                        )} */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      {/* <Button onClick={handleClick} variant="outlined">
        Click Me
      </Button> */}
    </>
  );
}

export default DailyAttendance;
