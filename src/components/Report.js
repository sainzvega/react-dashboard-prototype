import React, { createContext, useState, useMemo } from "react";
import * as Space from "react-spaces";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import { ReportDashboard } from "./ReportDashboard";
import { ReportCapability } from "./ReportCapability";
import { ReportDepartment } from "./ReportDepartment";

const reportRoutes = [
  { name: "Dashboard", path: "/reports/dashboard" },
  { name: "Department", path: "/reports/department" },
  { name: "Capability", path: "/reports/capability" }
];

const reportNavStyles = {
  backgroundColor: "#eee",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start"
};

export const ReportsContext = createContext();
export const Reports = ({ match }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);
  const [capabilityData, setCapabilityData] = useState(null);

  const reportsContextValue = useMemo(() => {
    return {
      dashboardData,
      setDashboardData,
      departmentData,
      setDepartmentData,
      capabilityData,
      setCapabilityData
    };
  }, [
    dashboardData,
    setDashboardData,
    departmentData,
    setDepartmentData,
    capabilityData,
    setCapabilityData
  ]);

  return (
    <ReportsContext.Provider value={reportsContextValue}>
      <Space.Fill>
        <Space.Left size={"25%"} style={reportNavStyles} as="aside">
          {reportRoutes.map(route => (
            <Link key={route.name} to={route.path}>
              {route.name}
            </Link>
          ))}
        </Space.Left>
        <Space.Fill>
          <Switch>
            <Route
              exact
              path={match.url + "/dashboard"}
              component={ReportDashboard}
            />
            <Route
              exact
              path={match.url + "/department"}
              component={ReportDepartment}
            />
            <Route
              exact
              path={match.url + "/capability"}
              component={ReportCapability}
            />
            <Redirect from="/" to="/reports/dashboard" />
          </Switch>
        </Space.Fill>
      </Space.Fill>
    </ReportsContext.Provider>
  );
};
