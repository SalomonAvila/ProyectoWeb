import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { TeacherDashboard } from "./pages/TeacherDashboard";
import { CoordinatorDashboard } from "./pages/CoordinatorDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ActiveShift } from "./pages/ActiveShift";
import { ReportIncident } from "./pages/ReportIncident";
import { CoordinatorAnalytics } from "./pages/CoordinatorAnalytics";
import { ManageZones } from "./pages/ManageZones";
import { ManageShifts } from "./pages/ManageShifts";
import { CoordinatorLive } from "./pages/CoordinatorLive";
import { AdminConfig } from "./pages/AdminConfig";
import { AdminReports } from "./pages/AdminReports";
import { CalendarView } from "./pages/CalendarView";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/teacher",
    Component: TeacherDashboard,
  },
  {
    path: "/teacher/shift/:shiftId",
    Component: ActiveShift,
  },
  {
    path: "/teacher/report",
    Component: ReportIncident,
  },
  {
    path: "/coordinator",
    Component: CoordinatorDashboard,
  },
  {
    path: "/coordinator/live",
    Component: CoordinatorLive,
  },
  {
    path: "/coordinator/analytics",
    Component: CoordinatorAnalytics,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/zones",
    Component: ManageZones,
  },
  {
    path: "/admin/shifts",
    Component: ManageShifts,
  },
  {
    path: "/admin/shifts/calendar",
    Component: CalendarView,
  },
  {
    path: "/admin/config",
    Component: AdminConfig,
  },
  {
    path: "/admin/reports",
    Component: AdminReports,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);