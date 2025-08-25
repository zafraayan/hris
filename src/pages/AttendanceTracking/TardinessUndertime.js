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
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { statechEmployees } from "../../arrays/employees";
import axios from "axios";
import { format, parseISO } from "date-fns";
import LinearProgressWithLabel from "../../components/LinearProgressWithLabel";

function TardinessUndertime() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [attendance, setAttendance] = useState([]);
  const [employeeStats, setEmployeeStats] = useState({}); // ✅ store lates & minutes per employee
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    let timer;

    if (loading) {
      setProgress(0); // reset when starting fetch
      timer = setInterval(() => {
        setProgress((old) => {
          if (old >= 90) return 90; // keep "waiting" at 90%
          return old + 10;
        });
      }, 500);
    } else if (!loading && progress > 0) {
      // only push to 100% AFTER a fetch has started
      setProgress(100);
    }

    return () => clearInterval(timer);
  }, [loading]);

  const onSubmit = async (data) => {
    try {
      setLoading(true); // start loading
      const res = await axios.get(
        "http://localhost:5000/api/logs/refetch-logs",
        {
          params: {
            from: data.dateStart,
            to: data.dateEnd,
          },
        }
      );

      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchEmployees() {
      const res = await axios.get("http://localhost:5000/api/employees");

      setEmployees(res.data);
    }

    fetchEmployees();
  }, []);

  const groupedByUser = attendance.reduce((acc, user) => {
    const { userSn, times } = user;

    if (!acc[userSn]) {
      acc[userSn] = {};
    }

    times.forEach((timeStr) => {
      const dateObj = parseISO(timeStr);
      const dateKey = format(dateObj, "yyyy-MM-dd");
      const timeLabel = format(dateObj, "hh:mm a");

      if (!acc[userSn][dateKey]) {
        acc[userSn][dateKey] = [];
      }

      acc[userSn][dateKey].push({ raw: dateObj, label: timeLabel });
    });

    return acc;
  }, {});

  async function handleFiltering() {
    const dateOne = watch("dateStart");
    const dateTwo = watch("dateEnd");

    try {
      setLoading(true); // start loading
      const res = await axios.get(
        "http://localhost:5000/api/logs/monthly-logs",
        {
          params: {
            from: dateOne,
            to: dateTwo,
          },
        }
      );

      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ===== Form ===== */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                {...register("dateEnd", {
                  required: "End date is required",
                })}
                error={!!errors.dateEnd}
                helperText={errors.dateEnd?.message}
                sx={{ flex: 1 }}
              />
            </Stack>

            <Button
              onClick={handleFiltering}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
            <Button type="submit" variant="contained" color="error">
              Retrieve Data from the Biometric System
            </Button>
          </form>
        </Stack>
      </Box>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
      ) : attendance.length === 0 ? (
        "No Record Found"
      ) : (
        <>
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr" }}>
            {Object.entries(groupedByUser).map(([userSn, dates]) => (
              <Card key={userSn} sx={{ minWidth: 320 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {employees.map(
                      (em) => userSn === em.uid.toString() && em.name
                    )}
                  </Typography>

                  {Object.entries(dates).map(([date, timeObjs]) => {
                    // sort times
                    const sortedTimes = [...timeObjs].sort(
                      (a, b) => a.raw - b.raw
                    );

                    return (
                      <Box key={date} sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {format(new Date(date), "MMMM dd, yyyy")}
                        </Typography>

                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {sortedTimes.map((t, i) => {
                            // Parse time string into comparable Date object
                            const [hour, minute] = t.label.split(":");
                            const isPM = t.label.toLowerCase().includes("pm");
                            let h = parseInt(hour, 10) % 12;
                            if (isPM) h += 12;

                            const timeValue = new Date();
                            timeValue.setHours(h, parseInt(minute), 0, 0);

                            const lateThreshold = new Date();
                            lateThreshold.setHours(10, 10, 0, 0);

                            const isLate = timeValue > lateThreshold;

                            return (
                              <Chip
                                key={i}
                                label={t.label}
                                color={i === 0 && isLate ? "error" : "default"} // 🔴 red if late
                                variant={i === 0 ? "filled" : "outlined"} // first-in is filled
                              />
                            );
                          })}
                        </Stack>
                      </Box>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </>
  );
}

export default TardinessUndertime;
