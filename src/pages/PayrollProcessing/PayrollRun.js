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
import { NumericFormat } from "react-number-format";
import ConfirmationDialog from "../../components/ConfirmationDialog";

export default function PayrollRun() {
  const [employees, setEmployees] = useState([]);
  const [totalDeductions, setTotalDeductions] = useState();
  const [totalEarning, setTotalEarning] = useState();
  const [pPeriod, setPperiod] = useState();
  const [display, setDisplay] = useState(false);
  const [isReadonly, setIsreadonly] = useState(true);
  const [open, setOpen] = useState(false);
  const [pendingData, setPendingData] = useState();
  const [errMessage, setErrmessage] = useState();

  const { control, reset, handleSubmit, watch, register, setValue } = useForm({
    defaultValues: {
      idNumber: "",
      screenName: "",
      basicSalary: 0,
    },
  });

  function onSubmit(data) {
    if (data.from && data.to) {
      if (data.grossPay === 0 || data.netPay === 0) {
        setErrmessage("Invalid Gross/Net Pay");
        setOpen(true);
      }
    }

    const newData = { ...data, payrollPeriod: pPeriod };
    setPendingData(newData);
    console.log(newData);
    reset();
  }

  function confirmSubmit() {
    setOpen(false);
  }

  const handleSelect = (e) => {
    const emp = employees.find((el) => el.idNumber === e.target.value);

    if (emp) {
      setValue("idNumber", emp.idNumber);
      setValue("screenName", emp.screenName);
      setValue("basicSalary", emp.basicSalary);
      // setValue("total", data.sss + data.philhealth);
      setIsreadonly(false);
    } else {
      setIsreadonly(true);
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

    // setTotalEarning(totalEarnings);
    setValue("grossPay", !totalEarnings ? 0 : totalEarnings.toLocaleString());
    // setValue("overtimeCost", overtime);
    setValue("overtimeCostDisplay", !overtime ? 0 : overtime.toLocaleString());
  }

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
    setValue("totalDeductions", total.toLocaleString()); // ✅ keep React Hook Form in sync
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  function handleNetpay() {
    const totalEarnings = Number(String(watch("grossPay")).replace(/,/g, ""));
    const totalDeductions = Number(
      String(watch("totalDeductions")).replace(/,/g, "")
    );

    const net = totalEarnings - totalDeductions;

    setValue("netPay", net.toLocaleString());
  }

  function handleSet() {
    const from = watch("from");
    const to = watch("to");
    const range = `${new Date(from).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })} - ${new Date(to).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;
    setPperiod(range);
    if (!from || !to) {
      setErrmessage("Invalid Date Range");
      setOpen(true);
    } else {
      setValue("period", range);
      setDisplay(true);
    }
  }

  useEffect(() => {
    handleDeductions();
    handleEarnings();
    handleNetpay();
  }, [
    watch("sss"),
    watch("philhealth"),
    watch("pagibig"),
    watch("sssLoans"),
    watch("cashAdvance"),
    watch("loans"),
    watch("others"),
    watch("workDays"),
    watch("basicSalary"),
    watch("overtimeCost"),
    watch("overtimeCostDisplay"),
    watch("overtime"),
    watch("holiday"),
    watch("allowance"),
    watch("incentives"),
    watch("grossPay"),
    watch("totalDeductions"),
    watch("netPay"),
  ]);

  function disableInput(params) {
    return {
      sx: {
        backgroundColor: params ? "#ecececff" : "inherit",
      },
      InputProps: params ? { readOnly: true } : {},
    };
  }

  return (
    <>
      <ConfirmationDialog
        open={open}
        title="Error"
        message={errMessage}
        onConfirm={confirmSubmit}
        // onCancel={() => setOpen(false)}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          {display && (
            <Stack direction="column">
              <Typography variant="h6" align="right">
                Payroll Period - {pPeriod}
              </Typography>
              <Button
                onClick={() => setDisplay(false)}
                sx={{ width: "10%", ml: 2, alignSelf: "end" }}
                variant="contained"
              >
                Edit
              </Button>
            </Stack>
          )}

          {display || (
            <>
              <Typography align="center" variant="h6">
                Please select a payroll range
              </Typography>
              <Stack direction="row" spacing={2}>
                <Stack
                  direction="column"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  <Controller
                    name="from"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} type="date" />}
                  />
                  <Typography variant="h6">From</Typography>
                </Stack>
                <Stack
                  direction="column"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  <Controller
                    name="to"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} type="date" />}
                  />
                  <Typography variant="h6">To</Typography>
                </Stack>
              </Stack>
              <Button
                type="submit"
                variant="contained"
                sx={{ m: "auto", width: "25%" }}
                onClick={handleSet}
              >
                Set
              </Button>
            </>
          )}
        </Stack>
        {display && (
          <>
            <Stack direction="row" spacing={2}></Stack>
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
                      label="Please select an employee ID to begin"
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
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Basic Salary"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: true }}
                      sx={{ backgroundColor: "#ecececff" }}
                    />
                  )}
                />

                <Controller
                  name="workDays"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Work Days"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      // fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      {...disableInput(isReadonly)}
                    />
                  )}
                />

                <Stack direction="row" spacing={2}>
                  <Controller
                    name="overtime"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <NumericFormat
                        {...field}
                        customInput={TextField}
                        label="Overtime"
                        thousandSeparator=","
                        decimalScale={2} // always 2 decimals
                        // fixedDecimalScale // force .00 format
                        allowNegative={false} // prevent negative input
                        fullWidth
                        margin="normal"
                        {...disableInput(isReadonly)}
                      />
                    )}
                  />

                  <Controller
                    name="overtimeCostDisplay"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <NumericFormat
                        {...field}
                        customInput={TextField}
                        label="Overtime"
                        thousandSeparator=","
                        decimalScale={2} // always 2 decimals
                        fixedDecimalScale // force .00 format
                        allowNegative={false} // prevent negative input
                        fullWidth
                        margin="normal"
                        sx={{ width: "50%", backgroundColor: "#ecececff" }}
                      />
                    )}
                  />
                </Stack>

                <Controller
                  name="holiday"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Holiday"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      {...disableInput(isReadonly)}
                    />
                  )}
                />

                <Controller
                  name="allowance"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Allowance"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      {...disableInput(isReadonly)}
                    />
                  )}
                />

                <Controller
                  name="incentives"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Incentives"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      {...disableInput(isReadonly)}
                    />
                  )}
                />

                <Controller
                  name="grossPay"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Gross Pay"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      sx={{ backgroundColor: "#ecececff" }}
                      InputProps={{ readOnly: true }}
                    />
                  )}
                />
              </Stack>
              <Stack sx={{ width: "50%" }}>
                <Typography variant="h6">Deductions</Typography>
                <Controller
                  name="sss"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="SSS"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      {...disableInput(isReadonly)}
                    />
                  )}
                />
                <Controller
                  name="philhealth"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Phil Health"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      {...disableInput(isReadonly)}
                    />
                  )}
                />
                <Controller
                  name="pagibig"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Pagibig"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      {...disableInput(isReadonly)}
                    />
                  )}
                />
                <Controller
                  name="sssLoans"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="SSS Loans"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      {...disableInput(isReadonly)}
                    />
                  )}
                />
                <Controller
                  name="cashAdvance"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Cash Advance"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      {...disableInput(isReadonly)}
                    />
                  )}
                />
                <Controller
                  name="loans"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Loans"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      {...disableInput(isReadonly)}
                    />
                  )}
                />

                <Controller
                  name="others"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Others"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      {...disableInput(isReadonly)}
                    />
                  )}
                />

                <Controller
                  name="totalDeductions"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Total Deductions"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      sx={{ backgroundColor: "#ecececff" }}
                      InputProps={{ readOnly: true }}
                    />
                  )}
                />

                <Controller
                  name="netPay"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Net Pay"
                      thousandSeparator=","
                      decimalScale={2} // always 2 decimals
                      fixedDecimalScale // force .00 format
                      allowNegative={false} // prevent negative input
                      fullWidth
                      margin="normal"
                      sx={{ backgroundColor: "#ecececff" }}
                      InputProps={{ readOnly: true }}
                    />
                  )}
                />
              </Stack>
            </Stack>

            <Stack sx={{ margin: "auto", width: "25%" }}>
              <Button disabled={isReadonly} type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </>
        )}
      </form>
    </>
  );
}
