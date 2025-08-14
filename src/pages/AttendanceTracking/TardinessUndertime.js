import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

function TardinessUndertime() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Example: send to backend
    // fetch("/api/employees", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
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

        <Stack
          direction="row"
          spacing={2} // adds gap between items
          sx={{ width: "100%" }}
        >
          {/* ID Select */}
          <FormControl sx={{ flex: 1 }} error={!!errors.id}>
            <InputLabel id="id-label">ID</InputLabel>
            <Controller
              name="id"
              control={control}
              rules={{ required: "ID is required" }}
              render={({ field }) => (
                <Select labelId="id-label" {...field}>
                  <MenuItem value="EMP001">EMP001</MenuItem>
                  <MenuItem value="EMP002">EMP002</MenuItem>
                  <MenuItem value="EMP003">EMP003</MenuItem>
                </Select>
              )}
            />
            {errors.id && (
              <Typography variant="caption" color="error">
                {errors.id.message}
              </Typography>
            )}
          </FormControl>

          {/* Date Start */}
          <TextField
            label="Date Start"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register("dateStart", { required: "Start date is required" })}
            error={!!errors.dateStart}
            helperText={errors.dateStart?.message}
            sx={{ flex: 1 }}
          />

          {/* Date End */}
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
    </Box>
  );
}

export default TardinessUndertime;
