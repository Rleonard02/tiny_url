import React, { useState } from "react";
// import "./ShortenForm.css";
import { Box, Button, TextField, Typography } from "@mui/material";
// import { grey } from "@mui/material/colors";

const ShortenForm: React.FC = () => {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalURL: url }),
      });

      const data = await response.json();
      console.log("this is the data: ", data);

      if (response.ok) {
        setShortCode(data.shortCode);
      } else {
        console.log("uh oh!");
        console.error(data.message);
      }
    } catch (error) {
      console.log("uh oh!2");
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        // backgroundColor: "#19857b",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        height: "15rem",
      }}
    >
      <Typography variant="h4" sx={{ color: "black" }}>
        Enter a URL
      </Typography>
      <TextField
        label="URL"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{
          width: "50%",
          // Change the label color
          "& .MuiFormLabel-root": {
            color: "grey",
          },
          // Change the input text color
          "& .MuiInputBase-input": {
            color: "black",
          },
          "& .MuiOutlinedInput-root": {
            // Default outline
            "& fieldset": {
              borderColor: "gray",
            },
            // Hover only
            "&:hover fieldset": {
              borderColor: "gray",
            },
            // Focus only
            "&.Mui-focused fieldset": {
              borderColor: "primary",
            },
            // **Hover + Focus** (both hovered and focused)
            "&:hover.Mui-focused fieldset": {
              borderColor: "#646cff",
            },
          },
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>

      {shortCode && (
        <Typography variant="body1" sx={{ color: "black" }}>
          Your Short URL: http://localhost:8080/api/{shortCode}
        </Typography>
      )}
    </Box>
  );
};

export default ShortenForm;
