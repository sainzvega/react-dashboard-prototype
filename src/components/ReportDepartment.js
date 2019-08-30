import React, { useState, useEffect, useContext } from "react";
import * as Space from "react-spaces";

import { getDepartments } from "./api/getDepartments";
import { ReportsContext } from "./Report";

export const ReportDepartment = () => {
  const { departmentData, setDepartmentData } = useContext(ReportsContext);
  const [loading, setLoading] = useState(departmentData === null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (departmentData === null) {
      setLoading(true);
      let isCurrent = true;
      getDepartments()
        .then(data => {
          if (isCurrent) {
            setDepartmentData(data);
          }
        })
        .catch(err => {
          if (isCurrent) {
            setError(err);
          }
        })
        .finally(() => {
          if (isCurrent) {
            setLoading(false);
          }
        });

      return () => {
        isCurrent = false; // if deps change in the middle of API request, there is no need to resolve it.
      };
    }
  }, [departmentData, setDepartmentData, setError, setLoading]);

  if (loading) {
    return (
      <Space.Centered>{loading && <span>Loading data...</span>}</Space.Centered>
    );
  }

  if (error) {
    return (
      <Space.Centered>
        {error && (
          <div>
            <h4>An error occured:</h4>
            <span>{error}</span>
          </div>
        )}
      </Space.Centered>
    );
  }

  return (
    <Space.Centered>
      <table>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Department Key</th>
          </tr>
        </thead>
        <tbody>
          {departmentData &&
            departmentData.map(department => (
              <tr key={department.key}>
                <td>{department.name}</td>
                <td>{department.key}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Space.Centered>
  );
};
