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

const Registration = () => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Box sx={boxstyle}>
        <Typography variant="h5" fontWeight={600}>
          Employee Registration
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {/* Personal Info */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="First Name" fullWidth required />
                )}
              />
              <Controller
                name="middleName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Middle Name"
                    fullWidth
                    required
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Last Name" fullWidth required />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Gender"
                    fullWidth
                    required
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                )}
              />
              <Controller
                name="civilStatus"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} select label="Civil Status" fullWidth>
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Widowed">Widowed</MenuItem>
                  </TextField>
                )}
              />
            </Stack>

            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  multiline
                  rows={2}
                />
              )}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="contactNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Contact Number" fullWidth />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} type="email" label="Email" fullWidth />
                )}
              />
            </Stack>

            {/* Government IDs */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="sssNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="SSS Number" fullWidth />
                )}
              />
              <Controller
                name="philHealth"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="PhilHealth Number" fullWidth />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="pagIbig"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Pag-IBIG Number" fullWidth />
                )}
              />
              <Controller
                name="tin"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="TIN" fullWidth />
                )}
              />
            </Stack>

            {/* Employment Info */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="dateOfBirth"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                )}
              />
              <Controller
                name="jobTitle"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Job Title" fullWidth />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="department"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Department" fullWidth />
                )}
              />
              <Controller
                name="dateHired"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date Hired"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                )}
              />
            </Stack>

            <Controller
              name="employmentType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} select label="Employment Type" fullWidth>
                  <MenuItem value="Regular">Regular</MenuItem>
                  <MenuItem value="Probationary">Probationary</MenuItem>
                  <MenuItem value="Contractual">Contractual</MenuItem>
                </TextField>
              )}
            />

            {/* Salary and Payment */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="basicSalary"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Basic Salary"
                    type="number"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="paymentMethod"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} select label="Payment Method" fullWidth>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                  </TextField>
                )}
              />
            </Stack>

            <Controller
              name="bankAccount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Bank Account No." fullWidth />
              )}
            />

            <Button type="submit" variant="contained" fullWidth>
              Register Employee
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default Registration;
