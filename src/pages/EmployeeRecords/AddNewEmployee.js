import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Stack,
  TextField,
  Button,
  MenuItem,
  Typography,
  emphasize,
} from "@mui/material";
import ContentTitle from "../../components/ContentTitle";
import { departments } from "../../arrays/departments";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function AddNewEmployee() {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      idNumber: data.idNumber,
      screenName: data.screenName,
      gender: data.gender,
      status: data.status,
      address: data.address,
      contactNumber: data.contactNumber,
      email: data.email,
      sssNumber: data.sssNumber,
      philHealth: data.philHealth,
      pagIbig: data.pagIbig,
      tin: data.tin,
      dateOfBirth: data.dateOfBirth,
      department: data.department,
      position: data.position,
      dateHired: data.dateHired,
      employmentType: data.employmentType,
      basicSalary: data.basicSalary,
    };

    console.log("Form Data:", payload);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/employees",
        payload
      );
      toast.success("Successfully Added!");
      reset(); // Clear the form after successful submit
    } catch (error) {
      toast.error("Error inserting data");
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Box>
        <ContentTitle />
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
                  <TextField {...field} label="Middle Name" fullWidth />
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
                name="idNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Id Number" fullWidth />
                )}
              />
              <Controller
                name="screenName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Screen Name" fullWidth />
                )}
              />
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
                name="status"
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
                  <TextField
                    {...field}
                    label="Contact Number"
                    type="number"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  pattern: {
                    value: /^\S+@\S+\.\S+$/, // only if filled
                    message: "Please enter a valid email address",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Email"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
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
                  <TextField
                    {...field}
                    label="SSS Number"
                    type="number"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="philHealth"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="PhilHealth Number"
                    type="number"
                    fullWidth
                  />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="pagIbig"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Pag-IBIG Number"
                    type="number"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="tin"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="TIN" type="number" fullWidth />
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
                  />
                )}
              />

              <Controller
                name="department"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} select label="Department" fullWidth>
                    {departments.map((el) => (
                      <MenuItem value={el.department}>{el.department}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="position"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} select label="Position" fullWidth>
                    {departments.map((el) =>
                      el.positions.map((pos) => (
                        <MenuItem value={pos}>{pos}</MenuItem>
                      ))
                    )}
                  </TextField>
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
                    required
                  />
                )}
              />
            </Stack>

            <Button type="submit" variant="contained" fullWidth>
              Register Employee
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default AddNewEmployee;
