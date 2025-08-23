import { Home } from "./pages/Home.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/login.jsx";
import {Logout} from "./pages/Logout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar.jsx";
import { Problem} from "./pages/Problems.jsx";
import {ProblemDetails} from "./pages/ProblemDetails.jsx";
import { Profile } from "./pages/Profile.jsx";
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Root route */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/problems" element={<Problem />} />
          <Route path="/:id" element={<ProblemDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export { App };
