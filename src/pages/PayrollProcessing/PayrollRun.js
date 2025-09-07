import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Paper,
  TextField,
  Button,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function PayrollRun() {
  const [employees, setEmployees] = useState([]);
  const [totalDeductions, setTotalDeductions] = useState();
  const [totalEarning, setTotalEarning] = useState();

  const { control, handleSubmit, watch, register, setValue } = useForm({
    defaultValues: {
      idNumber: "",
      screenName: "",
      basicSalary: "",
    },
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  function onSubmit(data) {
    console.log("Submitted:", data);
  }

  const handleSelect = (e) => {
    const emp = employees.find((el) => el.idNumber === e.target.value);

    if (emp) {
      setValue("idNumber", emp.idNumber);
      setValue("screenName", emp.screenName);
      setValue("basicSalary", emp.basicSalary);
      // setValue("total", data.sss + data.philhealth);
    }
  };

  function handleEarnings() {
    const workDays = Number(watch("workDays")) || 0;
    const basicSalary = Number(watch("basicSalary")) || 0;
    const baseOvertime = (basicSalary / 8) * 1.25;
    const overtime = watch("overtime") * baseOvertime;
    const holiday = Number(watch("holiday")) || 0;
    const allowance = Number(watch("allowance")) || 0;
    const incentives = Number(watch("incentives")) || 0;

    const totalEarnings =
      workDays * basicSalary + holiday + allowance + incentives + overtime;

    setTotalEarning(totalEarnings);
    setValue("grossPay", totalEarnings);
    setValue("overtimeCost", overtime);
  }

  useEffect(() => {
    handleEarnings();
  }, [
    watch("workDays"),
    watch("basicSalary"),
    watch("overtimeCost"),
    watch("overtime"),
    watch("holiday"),
    watch("allowance"),
    watch("incentives"),
  ]);

  function handleDeductions() {
    const sss = Number(watch("sss")) || 0;
    const philhealth = Number(watch("philhealth")) || 0;
    const pagibig = Number(watch("pagibig")) || 0;
    const sssLoans = Number(watch("sssLoans")) || 0;
    const cashAdvance = Number(watch("cashAdvance")) || 0;
    const loans = Number(watch("loans")) || 0;
    const others = Number(watch("others")) || 0;

    const total =
      sss + philhealth + pagibig + sssLoans + cashAdvance + loans + others;
    setTotalDeductions(total); // ✅ update state
    setValue("totalDeductions", total); // ✅ keep React Hook Form in sync
  }

  useEffect(() => {
    handleDeductions();
  }, [
    watch("sss"),
    watch("philhealth"),
    watch("pagibig"),
    watch("sssLoans"),
    watch("cashAdvance"),
    watch("loans"),
    watch("others"),
  ]);

  function handleNetpay() {
    const totalEarnings = watch("grossPay");
    const totalDeductions = watch("totalDeductions");

    const netPay = totalEarning - totalDeductions;
    setValue("netPay", netPay);
  }

  useEffect(() => {
    handleNetpay();
  }, [watch("grossPay"), watch("totalDeductions"), watch("netPay")]);

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2}>
          <Stack sx={{ width: "50%" }}>
            <Typography variant="h6">Earnings</Typography>
            <Controller
              name="idNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Employee ID"
                  fullWidth
                  margin="normal"
                  onChange={(e) => {
                    field.onChange(e); // keep RHF in sync
                    handleSelect(e); // your custom logic
                  }}
                >
                  <MenuItem value="">-- Select Employee --</MenuItem>
                  {employees.map((el) => (
                    <MenuItem key={el.idNumber} value={el.idNumber}>
                      {`${el.idNumber} - ${el.screenName}`}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="screenName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Screen Name"
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }} // 👈 read-only
                  sx={{ backgroundColor: "#ecececff" }}
                />
              )}
            />

            <Controller
              name="basicSalary"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Basic Salary"
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }} // 👈 read-only
                  sx={{ backgroundColor: "#ecececff" }}
                />
              )}
            />

            <Controller
              name="workDays"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  type="number"
                  label="Work Days"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Stack direction="row" spacing={2}>
              <Controller
                name="overtime"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    type="number"
                    label="Overtime in hours"
                    margin="normal"
                    sx={{ width: "50%" }}
                  />
                )}
              />

              <Controller
                name="overtimeCost"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    type="number"
                    // label="Overtime Cost"
                    margin="normal"
                    sx={{ width: "50%", backgroundColor: "#ecececff" }}
                  />
                )}
              />
            </Stack>

            <Controller
              name="holiday"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  type="number"
                  label="Holiday Pay"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="allowance"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  type="number"
                  label="Allowance"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="incentives"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  type="number"
                  label="Incentives"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="grossPay"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  type="number"
                  // label="Gross Pay"
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }}
                  sx={{ backgroundColor: "#ecececff" }}
                />
              )}
            />
          </Stack>
          <Stack sx={{ width: "50%" }}>
            <Typography variant="h6">Deductions</Typography>
            <Controller
              name="sss"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => {
                    const value = e.target.valueAsNumber;
                    field.onChange(value);
                  }}
                  type="number"
                  label="SSS"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="philhealth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => {
                    const value = e.target.valueAsNumber;
                    field.onChange(value);
                  }}
                  type="number"
                  label="Philhealth"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="pagibig"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  type="number"
                  label="Pagibig"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="sssLoans"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  type="number"
                  label="SSS Loans"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="cashAdvance"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  type="number"
                  label="Cash Advance"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="loans"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  type="number"
                  label="Loans"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="others"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  type="number"
                  label="others"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="totalDeductions"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={totalDeductions}
                  type="number"
                  // label="Total Deductions"
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }}
                  sx={{ backgroundColor: "#ecececff" }}
                />
              )}
            />

            <Controller
              name="netPay"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  // label="Net Pay"
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }}
                  sx={{ backgroundColor: "#ecececff" }}
                />
              )}
            />
          </Stack>
        </Stack>

        <Stack sx={{ margin: "auto", width: "25%" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
