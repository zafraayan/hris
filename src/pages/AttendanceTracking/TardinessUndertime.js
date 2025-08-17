import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { statechEmployees } from "../../arrays/employees";
import axios from "axios";

function TardinessUndertime() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [attendance, setAttendance] = useState([]);
  const [employeeStats, setEmployeeStats] = useState({}); // ✅ store lates & minutes per employee

  const onSubmit = async (data) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/employees/attendance",
        {
          params: {
            from: data.dateStart,
            to: data.dateEnd,
          },
        }
      );

      const attendanceData = res.data;
      const statsByEmployee = {};

      // Set cutoff time (10:10 AM)
      const cutoffHour = 10;
      const cutoffMinute = 10;

      attendanceData.forEach((el) => {
        const userId = String(el.deviceUserId);

        // Group logs by date
        const groupedByDate = el.recordTime.reduce((acc, time) => {
          const dateKey = new Date(time).toLocaleDateString();
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push(time);
          return acc;
        }, {});

        let lateCount = 0;
        let totalMinutesLate = 0;

        // Check each day’s first time-in
        Object.values(groupedByDate).forEach((times) => {
          const firstTime = new Date(times[0]);

          const isLate =
            firstTime.getHours() > cutoffHour ||
            (firstTime.getHours() === cutoffHour &&
              firstTime.getMinutes() > cutoffMinute);

          if (isLate) {
            lateCount++;

            // ✅ compute minutes late
            const cutoffDate = new Date(firstTime);
            cutoffDate.setHours(cutoffHour, cutoffMinute, 0, 0);

            const diffMs = firstTime - cutoffDate;
            const diffMins = Math.floor(diffMs / 60000);
            totalMinutesLate += diffMins;
          }
        });

        statsByEmployee[userId] = {
          lates: lateCount,
          minutes: totalMinutesLate,
        };
      });

      setAttendance(attendanceData);
      setEmployeeStats(statsByEmployee); // ✅ save result
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* ===== Form ===== */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Stack direction="column">
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
              padding: "24px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" textAlign="center">
              Employee Form
            </Typography>

            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
              <TextField
                label="Date Start"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("dateStart", {
                  required: "Start date is required",
                })}
                error={!!errors.dateStart}
                helperText={errors.dateStart?.message}
                sx={{ flex: 1 }}
              />

              <TextField
                label="Date End"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("dateEnd", { required: "End date is required" })}
                error={!!errors.dateEnd}
                helperText={errors.dateEnd?.message}
                sx={{ flex: 1 }}
              />
            </Stack>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Stack>
      </Box>

      {/* ===== Attendance per Employee ===== */}
      {Array.from({ length: 26 }, (_, i) => {
        const userId = String(i + 1);

        const userAttendance = attendance.filter(
          (el) => String(el.deviceUserId) === userId
        );

        if (userAttendance.length === 0) return null;

        return (
          <Box
            key={userId}
            sx={{
              border: "solid 1px gray",
              width: "auto",
              margin: "auto",
              mb: 2,
              padding: 1,
            }}
          >
            {userAttendance.map((el, idx) => {
              const groupedByDate = el.recordTime.reduce((acc, time) => {
                const dateKey = new Date(time).toLocaleDateString();
                if (!acc[dateKey]) acc[dateKey] = [];
                acc[dateKey].push(time);
                return acc;
              }, {});

              return (
                <React.Fragment key={idx}>
                  <Typography variant="h6" align="center">
                    {statechEmployees.map(
                      (emp) => emp.id.toString() === userId && emp.name
                    )}
                  </Typography>
                  <Stack direction="column" spacing={2}>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <b>Date</b>
                            </TableCell>
                            <TableCell>
                              <b>Times</b>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(groupedByDate).map(
                            ([date, times], dIdx) => {
                              const firstTime = new Date(times[0]);
                              const isLate =
                                firstTime.getHours() > 10 ||
                                (firstTime.getHours() === 10 &&
                                  firstTime.getMinutes() > 10);

                              return (
                                <TableRow key={dIdx}>
                                  <TableCell>{date}</TableCell>

                                  {times.map((time, tIdx) => {
                                    const formattedTime = new Date(
                                      time
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    });

                                    return (
                                      <TableCell
                                        key={tIdx}
                                        style={{
                                          marginRight: "12px",
                                          color:
                                            tIdx === 0 && isLate
                                              ? "red"
                                              : "inherit",
                                        }}
                                      >
                                        {formattedTime}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>

                  {/* ✅ Show employee total lates & minutes late */}
                  <Typography
                    variant="body1"
                    align="right"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    Total Lates: {employeeStats[userId]?.lates || 0} <br />
                    Total Minutes Late: {employeeStats[userId]?.minutes || 0}
                  </Typography>
                </React.Fragment>
              );
            })}
          </Box>
        );
      })}
    </>
  );
}

export default TardinessUndertime;
