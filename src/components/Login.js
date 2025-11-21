import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import HotelIcon from "@mui/icons-material/Hotel";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [roomError, setRoomError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !room) return;
    if (roomError) return;
    onLogin({ name, room });
  }

  function handleRoomChange(e) {
    const value = e.target.value;
    setRoom(value);

    // allow only numbers & not more than 1200
    if (!/^[0-9]*$/.test(value) || Number(value) > 1200) {
      setRoomError(true);
    } else {
      setRoomError(false);
    }
  }

  const disabled = !name || !room || roomError;

  return (
    <Paper
      elevation={12}
      sx={{
        p: 4,
        maxWidth: 450,
        mx: "auto",
        mt: 10,
        borderRadius: 4,
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.6s ease",
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ bgcolor: "#1c4a91", width: 64, height: 64, mb: 1 }}>
          <HotelIcon fontSize="large" />
        </Avatar>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Hotel BlueHarbor
        </Typography>

        <Typography variant="subtitle1" sx={{ opacity: 0.7, mb: 2 }}>
          Guest Access Portal
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            label="Room key card number"
            value={room}
            onChange={handleRoomChange}
            fullWidth
            margin="normal"
            error={roomError}
            helperText={
              roomError
                ? "Invalid room key — only numbers allowed and must be between 1 and 1200"
                : ""
            }
            sx={{
              transition: "0.25s",
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: roomError ? "red" : "#1c4a91",
                boxShadow: roomError
                  ? "0 0 6px #ff000066"
                  : "0 0 6px #1c4a9166",
              },
            }}
          />

          <TextField
            label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            sx={{
              transition: "0.25s",
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#1c4a91",
                boxShadow: "0 0 6px #1c4a9166",
              },
            }}
          />

          <Tooltip
            title={disabled ? "Please enter details" : ""}
            placement="top"
          >
            <span>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={disabled}
                sx={{
                  mt: 3,
                  py: 1.3,
                  bgcolor: "#1c4a91",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  borderRadius: 2,
                  transition: "0.28s",
                  cursor: disabled ? "not-allowed" : "pointer",
                  "&:hover": disabled
                    ? { bgcolor: "#1c4a91" }
                    : {
                        transform: "translateY(-2px)",
                        bgcolor: "#163a76",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
                      },
                }}
              >
                Enter Hotel
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Box>

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </Paper>
  );
}
