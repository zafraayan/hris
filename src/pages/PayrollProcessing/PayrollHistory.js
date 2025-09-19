import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function PayrollHistory() {
  const [payroll, Setpayroll] = useState();

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/payroll");
        Setpayroll(res.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchPayroll();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", margin: "auto", mt: 5 }}
    >
      <Typography variant="h6" align="center" sx={{ m: 2 }}>
        Employee List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>ID #</strong>
            </TableCell>
            <TableCell>
              <strong>Screen Name</strong>
            </TableCell>
            <TableCell>
              <strong>Basic Salary</strong>
            </TableCell>
            <TableCell>
              <strong>Work Days</strong>
            </TableCell>

            <TableCell>
              <strong>Overtime</strong>
            </TableCell>
            <TableCell>
              <strong>Overtime Cost</strong>
            </TableCell>
            <TableCell>
              <strong>Holiday</strong>
            </TableCell>
            <TableCell>
              <strong>Allowance</strong>
            </TableCell>
            <TableCell>
              <strong>Incentives</strong>
            </TableCell>
            <TableCell>
              <strong>Gross Pay</strong>
            </TableCell>

            <TableCell>
              <strong>SSS</strong>
            </TableCell>
            <TableCell>
              <strong>Phil Health</strong>
            </TableCell>
            <TableCell>
              <strong>Pag-Ibig</strong>
            </TableCell>
            <TableCell>
              <strong>Cash Advance</strong>
            </TableCell>
            <TableCell>
              <strong>SSS Loans</strong>
            </TableCell>
            <TableCell>
              <strong>Cash Advance</strong>
            </TableCell>
            <TableCell>
              <strong>Loans</strong>
            </TableCell>
            <TableCell>
              <strong>Others</strong>
            </TableCell>
            <TableCell>
              <strong>Total Deductions</strong>
            </TableCell>
            <TableCell>
              <strong>Net Pay</strong>
            </TableCell>
            <TableCell>
              <strong>Payroll Period</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payroll?.map((pay, index) => (
            <TableRow key={index}>
              <TableCell>{pay.idNumber}</TableCell>
              <TableCell>{pay.screenName}</TableCell>
              <TableCell>{pay.basicSalary.toLocaleString()}</TableCell>
              <TableCell>{pay.workDays}</TableCell>
              <TableCell>{pay.overtime}</TableCell>
              <TableCell>{pay.overtimeCostDisplay.toLocaleString()}</TableCell>
              <TableCell>{pay.holiday.toLocaleString()}</TableCell>
              <TableCell>{pay.allowance.toLocaleString()}</TableCell>
              <TableCell>{pay.incentives.toLocaleString()}</TableCell>
              <TableCell>{pay.grossPay.toLocaleString()}</TableCell>
              <TableCell>{pay.sss.toLocaleString()}</TableCell>
              <TableCell>{pay.philhealth.toLocaleString()}</TableCell>
              <TableCell>{pay.pagibig.toLocaleString()}</TableCell>
              <TableCell>{pay.sssLoans.toLocaleString()}</TableCell>
              <TableCell>{pay.cashAdvance.toLocaleString()}</TableCell>
              <TableCell>{pay.others.toLocaleString()}</TableCell>
              <TableCell>{pay.loans.toLocaleString()}</TableCell>
              <TableCell>{pay.others.toLocaleString()}</TableCell>
              <TableCell>{pay.totalDeductions.toLocaleString()}</TableCell>
              <TableCell>{pay.netPay.toLocaleString()}</TableCell>
              <TableCell>{pay.payrollPeriod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PayrollHistory;
