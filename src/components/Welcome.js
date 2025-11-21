import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Fade from "@mui/material/Fade";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";

const images = [
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    caption: "Welcome to Blue Harbor Hotel",
  },
  {
    src: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80",
    caption: "Luxury Rooms & Premium Comfort",
  },
  {
    src: "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?auto=format&fit=crop&w=1200&q=80",
    caption: "Fine Dining & Rooftop Restaurant",
  },
];

export default function Welcome({ user }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [openInfo, setOpenInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % images.length);
        setFade(true);
      }, 300);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  if (!user) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography>Please login first.</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper
        elevation={10}
        sx={{
          p: 4,
          borderRadius: 3,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome, {user.name}! 👋
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, opacity: 0.75 }}>
          Room {user.room} • We’re glad to have you with us.
        </Typography>

        {/* Slideshow */}
        <Box
          sx={{
            height: 340,
            mb: 3,
            borderRadius: 3,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
          }}
        >
          <Fade in={fade} timeout={500}>
            <img
              key={index}
              src={images[index].src}
              alt="slide"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
              }}
            />
          </Fade>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              p: 2,
              background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
              color: "#fff",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
              {images[index].caption}
            </Typography>
          </Box>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/chat")}
            sx={{
              px: 4,
              py: 1.2,
              fontSize: "1rem",
              borderRadius: 2,
              boxShadow: "0px 6px 12px rgba(0,0,0,0.25)",
              background: "linear-gradient(45deg, #1c4a91, #007aff)",
              ":hover": { opacity: 0.92 },
            }}
          >
            Open Chat Assistant
          </Button>

          <Button
            size="large"
            onClick={() => setOpenInfo(true)}
            sx={{
              px: 4,
              py: 1.2,
              fontSize: "1rem",
              borderRadius: 2,
              border: "2px solid #1c4a91",
              boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
              ":hover": { background: "rgba(0,0,0,0.06)" },
            }}
          >
            Hotel Info
          </Button>
        </Box>
      </Paper>

      {/* Popup Modal */}
      <Dialog
        open={openInfo}
        onClose={() => setOpenInfo(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(14px)",
            p: 2,
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            border: "1px solid rgba(255,255,255,0.4)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            fontSize: "1.8rem",
            textAlign: "center",
            pb: 1,
          }}
        >
          Blue Harbor Hotel 🏨
        </DialogTitle>

        <DialogContent sx={{ px: 3, pb: 1 }}>
          <Paper elevation={6} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "1.25rem", mb: 1 }}>
              Our Story 🌊
            </Typography>
            <Typography sx={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
              Founded in 1998 along the serene coastline, Blue Harbor is known
              worldwide for its luxury hospitality, breathtaking ocean views and
              peaceful ambiance.
            </Typography>
          </Paper>

          <Paper elevation={6} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "1.25rem", mb: 1 }}>
              Amenities 🌟
            </Typography>
            <Box
              component="ul"
              sx={{ mt: 0, px: 2, fontSize: "1.07rem", lineHeight: 1.95 }}
            >
              <li>📶 Free High-Speed WiFi</li>
              <li>🍽 Rooftop Restaurant & Sunset Bar</li>
              <li>💆‍♂️ Spa & 🏋️‍♂️ Gym — 10 AM to 8 PM</li>
              <li>🏊 Swimming Pool — 8 AM to 8 PM</li>
              <li>🛎 24/7 Room Service</li>
              <li>🥐 Breakfast — 7 AM to 10 AM</li>
            </Box>
          </Paper>

          <Paper elevation={6} sx={{ p: 3, borderRadius: 3, mb: 2 }}>
            <Typography sx={{ fontWeight: 700, mb: 2, fontSize: "1.25rem" }}>
              ⭐ Guest Reviews
            </Typography>

            {[ 
              { name: "Aarav", review: "Amazing hospitality and great food! The staff is super friendly.", rating: 5 },
              { name: "Sofia", review: "Rooms are exquisite and comfortable. Loved the ocean balcony view!", rating: 4.5 },
              { name: "David", review: "Perfect for family stays. The kids enjoyed the pool a lot.", rating: 4.7 }
            ].map((r, i) => (
              <Box
                key={i}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
                  transition: "0.25s",
                  ":hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 6px 25px rgba(0,0,0,0.22)",
                  },
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "1.05rem" }}>
                  {r.name}
                </Typography>
                <Rating value={r.rating} precision={0.5} readOnly size="small" />
                <Typography sx={{ mt: 1, opacity: 0.8 }}>{r.review}</Typography>
              </Box>
            ))}
          </Paper>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => setOpenInfo(false)}
              sx={{
                px: 5,
                py: 1.2,
                borderRadius: 2,
                background: "linear-gradient(45deg, #1c4a91, #007aff)",
                fontWeight: 600,
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              }}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
