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
  const [employees, setEmployees] = useState([]);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.get("http://localhost:5000/api/logs");

      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:5000/api/logs");

      setAttendance(res.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchEmployees() {
      const res = await axios.get("http://localhost:5000/api/employees");

      setEmployees(res.data);
    }

    fetchEmployees();
  }, []);

  console.log(attendance);
  console.log(employees);

  return (
    <>
      <ContentTitle />

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
    </>
  );
}

export default DailyAttendance;
