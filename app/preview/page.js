"use client";

import { useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import axios from "axios";

export default function ComingSoon() {
  const [premiumStatus, setPremiumStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkPremiumStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/premium");
      setPremiumStatus(response.data.premium);
    } catch (err) {
      setError("Failed to fetch premium status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          bgcolor: "background.default",
          p: 3,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <BuildIcon
          sx={{ fontSize: 100, color: "primary.main", mb: 2 }}
        />
        <Typography variant="h4" component="div" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="body1">
          We're working hard to bring you this feature. Stay tuned!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={checkPremiumStatus}
        >
          Check Premium Status
        </Button>
        {loading && <Typography variant="body1">Loading...</Typography>}
        {error && <Typography variant="body1" color="error">{error}</Typography>}
        {premiumStatus !== null && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {premiumStatus ? "You have a premium account." : "You do not have a premium account."}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
