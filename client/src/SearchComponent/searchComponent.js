import React, { useState } from "react";
import BusComponent from "../BusComponent/busComponent";
import "./searchComponent.css";
const SearchComponent = (props) => {
  const currentDate = new Date();
  const [error, setError] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [count, setCount] = useState(0);
  const [search,setSearch] = useState(false)

  const onOriginChange = (event) => {
    setOrigin(event.target.value);
    origin == "" && setCount(count+1);
  };
  const onDestinationChange = (event) => {
    setDestination(event.target.value);
    destination == "" && setCount(count+1);
  };

  const onDateChange = (event) => {
    const lDate = new Date(event.target.value);
    const strDate = `${lDate.getFullYear()}-${lDate.getMonth()+1}-${lDate.getDate()}`;
    if (lDate >= currentDate) {
      setDate(strDate);
      setError("");
      date == "" && setCount(count+1);
    } else {
      setError(`Date should be greater than ${strDate}`);
    }
  };

  const onSearch = () => {
    setSearch(true)
  };

  return (
    <>
      <div className="search">
        <div className="origin">
          <label>Origin</label>
          <input
            type={"text"}
            defaultValue={origin}
            min={new Date()}
            onChange={(event) => {
              onOriginChange(event);
            }}
            placeholder="Enter the Origin"
          />
        </div>
        <div>
          <label>Destination</label>
          <input
            type={"text"}
            defaultValue={destination}
            onChange={(event) => {
              onDestinationChange(event);
            }}
            placeholder="Enter the Destination"
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type={"date"}
            onChange={(event) => {
              onDateChange(event);
            }}
          />
        </div>
        <div>
          <button onClick={() => onSearch()} className="searchBtn" disabled = {count < 3}>
            Search
          </button>
        </div>
      </div>
      {error != "" && <div className="error">{error}</div>}
    
      {search && error == "" && <BusComponent details = { { origin , destination, date } }/>}

    </>
  );
};

export default SearchComponent;
