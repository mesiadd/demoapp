
import './App.css';

// Import the Router from react-router 
import { Routes, Route } from "react-router";
// Import the page components
import Home from './Pages/Home';
import AddEmployee from './Pages/AddEmployee';
import Login from './Pages/Login';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
