import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import DashboardPage from "./components/Dashboard/Dashboard";
import PatientListPage from "./components/PatientList/PatientListPage";
import DoctorProfilePage from "./components/DoctorProfile/DoctorProfile";
import ProfilePage from "./components/Profile/Profile";
import Footer from './components/footer/footer';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    avatarUrl: "",
    phone: "7898789878"
  });

  function handleUpdateProfile(updated) {
    setUser({ ...user, ...updated });
  }

  return (
    <Router>
      <div className="App-root">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/patientList" element={<PatientListPage />} />
            <Route path="/doctorProfile" element={<DoctorProfilePage />} />
            <Route
              path="/profile"
              element={
                <ProfilePage user={user} onUpdateProfile={handleUpdateProfile} />
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer position="top-right" autoClose={2500} />
      </div>
    </Router>
  );
}

export default App;
