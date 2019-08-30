import React, { useContext, useEffect, useState } from "react";
import * as Space from "react-spaces";

import { ReportsContext } from "./Report";
import { getCapabilities } from "./api/getCapabilities";
// import { useFetch } from "./hooks/useFetch";
// const { loading, data, error } = useFetch(getCapabilities, true, []);

export const ReportCapability = () => {
  const { capabilityData, setCapabilityData } = useContext(ReportsContext);
  const [loading, setLoading] = useState(capabilityData === null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (capabilityData === null) {
      setLoading(true);
      let isCurrent = true;
      getCapabilities()
        .then(data => {
          if (isCurrent) {
            setCapabilityData(data);
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
  }, [capabilityData, setCapabilityData, setError, setLoading]);

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
            <th>Capability Name</th>
            <th>Capability Key</th>
          </tr>
        </thead>
        <tbody>
          {capabilityData &&
            capabilityData.map(cap => (
              <tr key={cap.key}>
                <td>{cap.name}</td>
                <td>{cap.key}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Space.Centered>
  );
};
