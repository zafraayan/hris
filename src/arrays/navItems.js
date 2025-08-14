import Notifications from "../pages/Dashboard/Notifications";
import Overview from "../pages/Dashboard/Overview";
import QuickActions from "../pages/Dashboard/QuickActions";
import EmployeeList from "../pages/EmployeeRecords/EmployeeList";
import EmployeeDocuments from "../pages/EmployeeRecords/EmployeeDocuments";
import AddNewEmployee from "../pages/EmployeeRecords/AddNewEmployee";
import DepartmentsPositions from "../pages/EmployeeRecords/DepartmentsPositions";
import EmployeeStatus from "../pages/EmployeeRecords/EmployeeStatus";
import OrganizationalChart from "../pages/OrganizationChart/OrganizationalChart";
import PositionHierarchy from "../pages/OrganizationChart/PositionHierarchy";
import UpdateStructure from "../pages/OrganizationChart/UpdateStructure";

import Adjustments from "../pages/PayrollProcessing/Adjustments";
import OvertimeManagement from "../pages/PayrollProcessing/OvertimeManagement";
import PayrollHistory from "../pages/PayrollProcessing/PayrollHistory";
import PayrollRun from "../pages/PayrollProcessing/PayrollRun";
import TaxContribution from "../pages/PayrollProcessing/TaxContribution";

import DownloadPayslip from "../pages/Payslip/DownloadPayslip";
import GeneratePayslip from "../pages/Payslip/GeneratePayslip";
import PayslipHistory from "../pages/Payslip/PayslipHistory";

import AllowanceSetup from "../pages/DeductionsBenefits/AllowanceSetup";
import BenefitsSetup from "../pages/DeductionsBenefits/BenefitsSetup";
import GovernmentContributions from "../pages/DeductionsBenefits/GovernmentContributions";
import LoanManagement from "../pages/DeductionsBenefits/LoanManagement";

import DailyAttendance from "../pages/AttendanceTracking/DailyAttendance";
import OvertimeRequests from "../pages/AttendanceTracking/OvertimeRequests";
import TardinessUndertime from "../pages/AttendanceTracking/TardinessUndertime";

import LeaveBalances from "../pages/LeaveManagement/LeaveBalances";
import LeavePolicies from "../pages/LeaveManagement/LeavePolicies";
import LeaveRequest from "../pages/LeaveManagement/LeaveRequest";

import ApplicantList from "../pages/Recruitment/ApplicantList";
import HiringStatus from "../pages/Recruitment/HiringStatus";
import InterviewSchedules from "../pages/Recruitment/InterviewSchedules";
import JobPostings from "../pages/Recruitment/JobPostings";

import AttendanceReport from "../pages/Reports/AttendanceReport";
import ComplianceReport from "../pages/Reports/ComplianceReport";
import EmployeeReport from "../pages/Reports/EmployeeReport";
import PayrollReport from "../pages/Reports/PayrollReport";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DeveloperBoardOffIcon from "@mui/icons-material/DeveloperBoardOff";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import SpatialTrackingIcon from "@mui/icons-material/SpatialTracking";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";

export const navItems = [
  {
    id: 1,
    text: "Dashboard",
    url: "/",
    icon: <DashboardIcon />,
    subMenu: [
      {
        id: 1,
        text: "Overview",
        url: "/",
        component: <Overview />,
      },
      {
        id: 2,
        text: "Notifications",
        url: "/notifications",
        component: <Notifications />,
      },
      {
        id: 3,
        text: "Quick Actions",
        url: "/quick-actions",
        component: <QuickActions />,
      },
    ],
  },
  {
    id: 2,
    text: "Employee Records",
    url: "/",
    icon: <BadgeIcon />,
    subMenu: [
      {
        id: 1,
        text: "Add New Employee",
        url: "/add-new-employee",
        component: <AddNewEmployee />,
      },
      {
        id: 2,
        text: "Employee List",
        url: "/employee-list",
        component: <EmployeeList />,
      },
      {
        id: 3,
        text: "Departments & Positions",
        url: "/departments-&-positions",
        component: <DepartmentsPositions />,
      },
      {
        id: 4,
        text: "Employee Documents",
        url: "/employee-documents",
        component: <EmployeeDocuments />,
      },
      {
        id: 5,
        text: "Employee Status",
        url: "/employee-status",
        component: <EmployeeStatus />,
      },
    ],
  },
  {
    id: 3,
    text: "Organization Chart",
    url: "/",
    icon: <AccountTreeIcon />,
    subMenu: [
      {
        id: 1,
        text: "View Organization Chart",
        url: "/view-organizational-chart",
        component: <OrganizationalChart />,
      },
      {
        id: 2,
        text: "Update Structure",
        url: "/update-structure",
        component: <UpdateStructure />,
      },
      {
        id: 3,
        text: "Position Hierarchy",
        url: "/position-hierarchy",
        component: <PositionHierarchy />,
      },
    ],
  },
  {
    id: 4,
    text: "Payroll Processing",
    url: "/",
    icon: <DeveloperBoardOffIcon />,
    subMenu: [
      {
        id: 1,
        text: "Payroll Run",
        url: "/payroll-run",
        component: <PayrollRun />,
      },
      {
        id: 2,
        text: "Payroll History",
        url: "/payroll-history",
        component: <PayrollHistory />,
      },
      {
        id: 3,
        text: "Adjustments",
        url: "/adjustments",
        component: <Adjustments />,
      },
      {
        id: 4,
        text: "Overtime Management",
        url: "/overtime-management",
        component: <OvertimeManagement />,
      },
      {
        id: 5,
        text: "Tax & Contribution Setup",
        url: "/tax-contribution",
        component: <TaxContribution />,
      },
    ],
  },
  {
    id: 5,
    text: "Payslip",
    url: "/",
    icon: <PriceCheckIcon />,
    subMenu: [
      {
        id: 1,
        text: "Generate Payslip",
        url: "/generate-payslip",
        component: <GeneratePayslip />,
      },
      {
        id: 2,
        text: "Payslip History",
        url: "/payslip-history",
        component: <PayslipHistory />,
      },
      {
        id: 3,
        text: "Download Payslip",
        url: "/download-payslip",
        component: <DownloadPayslip />,
      },
    ],
  },
  {
    id: 6,
    text: "Deductions & Benefits",
    url: "/",
    icon: <LoyaltyIcon />,
    subMenu: [
      {
        id: 1,
        text: "Government Contributions",
        url: "/government-contributions",
        component: <GovernmentContributions />,
      },
      {
        id: 2,
        text: "Loan Management",
        url: "/loan-management",
        component: <LoanManagement />,
      },
      {
        id: 3,
        text: "Benefits Setup",
        url: "/benefits-setup",
        component: <BenefitsSetup />,
      },
      {
        id: 4,
        text: "Allowance Setup",
        url: "/allowance-setup",
        component: <AllowanceSetup />,
      },
    ],
  },
  {
    id: 7,
    text: "Attendance Tracking",
    url: "/",
    icon: <SpatialTrackingIcon />,
    subMenu: [
      {
        id: 1,
        text: "Daily Attendance Logs",
        url: "/daily-attendance-logs",
        component: <DailyAttendance />,
      },
      {
        id: 2,
        text: "Overtime Requests",
        url: "/overtime-requests",
        component: <OvertimeRequests />,
      },
      {
        id: 3,
        text: "Tardiness & Undertime Reports",
        url: "/tardiness-&-undertime-reports",
        component: <TardinessUndertime />,
      },
    ],
  },
  {
    id: 8,
    text: "Leave Management",
    url: "/",
    icon: <ManageAccountsIcon />,
    subMenu: [
      {
        id: 1,
        text: "Leave Request",
        url: "/leave-request",
        component: <LeaveRequest />,
      },
      {
        id: 2,
        text: "Leave Balances",
        url: "/leave-balances",
        component: <LeaveBalances />,
      },
      {
        id: 3,
        text: "Leave Policies",
        url: "/leave-policies",
        component: <LeavePolicies />,
      },
    ],
  },
  {
    id: 9,
    text: "Recruitment",
    url: "/",
    icon: <PeopleIcon />,
    subMenu: [
      {
        id: 1,
        text: "Job Postings",
        url: "/job-postings",
        component: <JobPostings />,
      },
      {
        id: 2,
        text: "Applicant List",
        url: "/applicant-list",
        component: <ApplicantList />,
      },
      {
        id: 3,
        text: "Interview Schedules",
        url: "/interview-schedules",
        component: <InterviewSchedules />,
      },
      {
        id: 4,
        text: "Hiring Status",
        url: "/hiring-status",
        component: <HiringStatus />,
      },
    ],
  },
  {
    id: 10,
    text: "Reports",
    url: "/",
    icon: <AssessmentIcon />,
    subMenu: [
      {
        id: 1,
        text: "Payroll Report",
        url: "/payroll-report",
        component: <PayrollReport />,
      },
      {
        id: 2,
        text: "Attendance Reports",
        url: "/attendance-reports",
        component: <AttendanceReport />,
      },
      {
        id: 3,
        text: "Employee Reports",
        url: "/employee-reports",
        component: <EmployeeReport />,
      },
      {
        id: 4,
        text: "Compliance Reports",
        url: "/compliance-reports",
        component: <ComplianceReport />,
      },
    ],
  },
];
