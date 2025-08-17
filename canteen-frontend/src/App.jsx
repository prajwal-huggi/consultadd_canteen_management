import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Admin from "./screens/Admin";
import User from "./screens/User";
import Register from "./screens/Register";
import Checkout from "./screens/Checkout";
import UserHistory from "./screens/UserHistory";
import AllEmployee from "./screens/AllEmployee";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userHistory"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <UserHistory />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allEmployee"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AllEmployee />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
