import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Chat from "./components/Chat";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HotelIcon from "@mui/icons-material/Hotel";
import Fade from "@mui/material/Fade";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("hotel_user"));
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    localStorage.setItem("hotel_user", JSON.stringify(u));
    navigate("/welcome");
  };

  return (
    <div
      style={{
        background: "linear-gradient(120deg,#0d1b3d,#1c4a91,#0d1b3d)",
        minHeight: "100vh",
        paddingBottom: "30px",
      }}
    >
      {/* Premium AppBar */}
      <AppBar
        position="fixed"
        elevation={10}
        sx={{
          background: "linear-gradient(45deg, #0d1b3d, #1c4a91)",
          borderBottom: "2px solid rgba(255,255,255,0.15)",
        }}
      >
        <Toolbar>
          <HotelIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            BlueHarbor Assistant
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container
        maxWidth="md"
        sx={{
          pt: 12,
          animation: "fadeInPage 0.6s ease",
        }}
      >
        <Fade in timeout={500}>
          <div>
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/welcome" element={<Welcome user={user} />} />
              <Route path="/chat" element={<Chat user={user} />} />
              <Route path="/" element={<Login onLogin={handleLogin} />} />
            </Routes>
          </div>
        </Fade>
      </Container>

      {/* Styles used in this component */}
      <style>
        {`
        @keyframes fadeInPage {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
}
