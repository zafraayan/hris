import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import axios from "axios";

function DailyAttendance() {
  const { handleSubmit } = useForm();
  const [attendance, setAttendance] = useState();

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/logs/daily-logs"
        );
        setAttendance(res.data); // res.data contains your logs
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    }

    fetchLogs();
  }, [attendance]);

  // Handler for delete
  const handleDelete = async (data) => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/api/logs/delete-logs"
      );
      setAttendance(res.data); // res.data contains your logs
      console.log(attendance);
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
    // 👉 call your delete API here
    // await fetch("/api/logs/delete", { method: "DELETE" });
  };

  // Handler for update
  const handleUpdate = async (data) => {
    console.log("Update timestamps clicked", data);
    try {
      const res = await axios.post("http://localhost:5000/api/logs");
      setAttendance(res.data); // res.data contains your logs
    } catch (err) {
      console.error("Error fetching logs:", err);
    }

    // 👉 call your update API here
    // await fetch("/api/logs/update", { method: "POST", body: JSON.stringify(data) });
  };

  return (
    <form>
      <Stack direction="row" spacing={2}>
        {/* Delete Button */}
        <Button
          type="button"
          variant="contained"
          color="error"
          onClick={handleSubmit(handleDelete)}
        >
          Delete Timestamps
        </Button>

        {attendance ? "Attendance is set" : "Attendance is empty"}

        {/* Update Button */}
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleUpdate)}
        >
          Update Timestamps
        </Button>
      </Stack>
    </form>
  );
}

export default DailyAttendance;
