"use client";

import React from 'react';
import { Box, Container, Typography } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";

export default function ComingSoon() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
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
          position: "relative",
          zIndex: 1,
        }}
      >
        <BuildIcon sx={{ fontSize: 100, color: "primary.main", mb: 2 }} />
        <Typography variant="h4" component="div" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="body1" gutterBottom>
          We're working hard to bring you this feature. Stay tuned!
        </Typography>
      </Container>
    </Box>
  );
}
