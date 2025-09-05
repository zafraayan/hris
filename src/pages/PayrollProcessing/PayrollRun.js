import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function PayrollRun() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      payrollDate: null,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="periodStart"
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              label="Payroll Date"
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                },
              }}
            />
          )}
        />
        <Controller
          name="periodEnd"
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              label="Payroll Date"
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                },
              }}
            />
          )}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </LocalizationProvider>
  );
}
