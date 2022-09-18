import React, { useEffect, useState } from "react";
import axios from "axios";
import "./busComponent.css";
import DataAlign from "./dataAlign";
const BusComponent = (props) => {
  const [busInfo, setBusInfo] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/getBusDetails").then(
      (res) => setBusInfo(res.data),
      (err) => console.log(err)
    );
  }, []);
  return (
    <div className="bus">
      <table>
        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Arrival Time</th>
            <th>Destination Time</th>
            <th>Total Time</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
            <DataAlign data={busInfo} filterObj={props.details}/>
        </tbody>
      </table>
    </div>
  );
};

export default BusComponent;
