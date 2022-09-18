import "./App.css";
import {
  Route,
  Routes,
  Outlet,
  BrowserRouter as Router,
} from "react-router-dom";
import SearchComponent from "./SearchComponent/searchComponent";
import PersonComponent from "./PersonComponent/personComponent";


function App() {
  return (
    <div className="App">
      <header className="App-header">Bus Ticket Booking</header>

      <Router>
        <Routes>
          <Route path="/" element={<SearchComponent />} />
          <Route path="/busBook" element={<PersonComponent />} />
        </Routes>
      </Router>
      <Outlet />
    </div>
  );
}

export default App;
