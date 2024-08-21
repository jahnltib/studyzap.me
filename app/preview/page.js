"use client";

import React, { useState } from 'react';
import { Box, Button, Container, Typography } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import { useUser } from '@clerk/clerk-react';

export default function ComingSoon() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [privateMetadata, setPrivateMetadata] = useState(null);

  const handleRequestPrivateMetadata = async () => {
    if (!isSignedIn || !user) return;

    try {
      const response = await fetch("/api/clerk", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`, // Add user ID to headers
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch private metadata");
      }

      const data = await response.json();
      setPrivateMetadata(data);
      console.log("Private Metadata:", data);
    } catch (error) {
      console.error("Error fetching private metadata:", error);
    }
  };

  const handleUpdatePrivateMetadata = async () => {
    if (!isSignedIn || !user) return;

    try {
      const response = await fetch("/api/clerk", {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`, // Add user ID to headers
        },
        body: JSON.stringify({
          privateMetadata: { stripeId: "new_stripe_id" },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update private metadata");
      }

      const data = await response.json();
      setPrivateMetadata(data);
      console.log("Updated Private Metadata:", data);
    } catch (error) {
      console.error("Error updating private metadata:", error);
    }
  };

  const handleClearPrivateMetadata = async () => {
    if (!isSignedIn || !user) return;

    try {
      const response = await fetch("/api/clerk", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`, // Add user ID to headers
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear private metadata");
      }

      const message = await response.text();
      setPrivateMetadata(null);
      console.log(message);
    } catch (error) {
      console.error("Error clearing private metadata:", error);
    }
  };

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

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleRequestPrivateMetadata}
          sx={{ mt: 2 }}
        >
          Request Private Metadata
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleUpdatePrivateMetadata}
          sx={{ mt: 2 }}
        >
          Update Private Metadata
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleClearPrivateMetadata}
          sx={{ mt: 2 }}
        >
          Clear Private Metadata
        </Button>

        {privateMetadata && (
          <Box mt={4}>
            <Typography variant="h6">Private Metadata:</Typography>
            <pre>{JSON.stringify(privateMetadata, null, 2)}</pre>
          </Box>
        )}
      </Container>
    </Box>
  );
}
