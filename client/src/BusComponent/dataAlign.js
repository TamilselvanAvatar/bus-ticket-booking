import React from "react";
import { Link } from "react-router-dom";

import "./dataAlign.css";

const DataAlign = ({ data, filterObj }) => {
  console.dir({ data, filterObj });
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const handler = () => {
    return data?.map((el) => {
      let date = new Date(filterObj.date).getDay();
      let oT = new Date("01-01-1900 " + el.originTime);
      let dT = new Date("01-01-1900 " + el.destinationTime);

      let hr = Math.abs(dT.getHours() - oT.getHours());

      let totalTime = `${hr <= 12 ? hr : 24 - hr} hr ${
        dT.getMinutes() - oT.getMinutes()
      } min`;

      if (
        el.origin.toLowerCase() === filterObj.origin.toLowerCase() &&
        el.destination.toLowerCase() === filterObj.destination.toLowerCase() &&
        el.availableDay.includes(days[date])
      ) {
        return (
          <tr key={el.id}>
            <td>{el.busName}</td>
            <td>{el.origin}</td>
            <td>{el.destination}</td>
            <td>{el.originTime}</td>
            <td>{el.destinationTime}</td>
            <td>{totalTime}</td>
            <td>{el.rate}</td>
            <td>
              <span className="book">
                <Link to={{ pathname: "/busBook" }} state = {el}>Book</Link>
              </span>
            </td>
          </tr>
        );
      }
    });
  };
  return handler();
};

export default DataAlign;
