import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./personComponent.css";
import axios from "axios";
const PersonComponent = (props) => {
  const location = useLocation();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phNo, setPhNo] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const bus = { ...location.state };

  const onConfirm = () => {
    let seatAvaivable = bus.seatAvaivable - 1;
    let person = {
      name: name,
      age: age,
      phNo: phNo,
      gender:gender,
      origin: bus.origin,
      destination: bus.destination,
      busNo: bus.busNo,
      arrivalTime: bus.originTime,
    };

    bus.seatAvaivable = seatAvaivable;
    console.log(bus, person);
    axios
      .request({
        url: `http://localhost:3000/api/updateBusDetail/${bus._id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ ...bus }),
      })
      .then(
        (data) => {
          if (data != null) {
            axios
              .request(
                {
                  url : "http://localhost:3000/api/postPersonInfo",
                  method : "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  data: JSON.stringify({ ...person }),
                }
              )
              .then(
                (data) => {
                  setMessage("You will receive mail shortly");
                },
                (err) => {
                  console.log(err);
                }
              );
          }
        },
        (err) => {
          console.log(err);
        }
      );
  };
  if (message === "") {
    return (
      <div className="container">
        <div>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type={"text"}
                    placeholder="Enter your name"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Age</td>
                <td>
                  <input
                    type={"number"}
                    placeholder="Enter your Age"
                    onChange={(event) => {
                      setAge(event.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>
                  <input
                    type={"text"}
                    placeholder="Enter your gender"
                    onChange={(event) => {
                      setGender(event.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Contact Number</td>
                <td>
                  <input
                    type={"text"}
                    pattern={"[6-9]{1}[0-9]{9}"}
                    placeholder="Enter your Contact Number"
                    onChange={(event) => {
                      if (event.target.value.match(/[6-9]{1}[0-9]{9}/)) {
                        setPhNo(event.target.value);
                      }
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Bus Name</td>
                <td>{bus.busName}</td>
              </tr>
              <tr>
                <td>Travel</td>
                <td>{bus.origin + " to " + bus.destination}</td>
              </tr>
              <tr>
                <td>Bus No</td>
                <td>{bus.busNo}</td>
              </tr>
              <tr>
                <td>Arrival Time</td>
                <td>{bus.originTime}</td>
              </tr>
              <tr>
                <td>Rate</td>
                <td>{bus.rate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="book">
          {name !== "" && age !== "" && phNo !== "" && gender !== "" && (
            <span>
              <a
                onClick={() => {
                  onConfirm();
                }}
              >
                Confirm
              </a>
            </span>
          )}
        </div>
      </div>
    );
  } else {
    return <div style={{color:"green","fontStyle" : "italic"}}>{message}</div>;
  }
};

export default PersonComponent;
