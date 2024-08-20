"use client";

import Image from "next/image";
import React from "react";
import { Typography, Box, Button, Grid, Card } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", my: 10 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to StudyZap
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            backgroundColor: "#EDEDED",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 1,
            mb: 4,
            padding: "20px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/product.png" // No need for 'public/' prefix
            alt="Hero"
            width={1200}
            height={600}
            style={{
              width: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.4))",
            }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            mr: 2,
            fontSize: "1.2rem",
            padding: "12px 24px",
            minWidth: "150px",
          }}
          href="/sign-up"
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            mt: 2,
            fontSize: "1.2rem",
            padding: "12px 24px",
            minWidth: "150px",
          }}
          href="#info"
        >
          Learn More
        </Button>
      </Box>

      {/* Info Section */}
      <Box
        id="info"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#E0E0E0",
        }}
      >
        <Box
          sx={{
            maxWidth: "90vw",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens
            alignItems: "center",
            justifyContent: "center",
            gap: 4, // Gap between image and card
          }}
        >
          <Card
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "40px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              maxWidth: "100%",
              maxWidth: { xs: "100%", md: "400px" },
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom marginBottom="20px">
              Features
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                <CheckCircle sx={{ mr: 1, color: "green" }} />
                <Typography variant="body1">
                  Generate flashcards from text using AI
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle sx={{ mr: 1, color: "green" }} />
                <Typography variant="body1">
                  Save and practice flashcard sets
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "5px"}}>
                <CheckCircle sx={{ mr: 1, color: "green" }} />
                <Typography variant="body1">
                  Manually edit and manage flashcards
                </Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 4 }}
              href="/generate"
            >
              Get Started
            </Button>
          </Card>

          <Card
            sx={{
              backgroundColor: "#E0E0E0",
              maxWidth: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: { xs: "60%", md: "100%" },
              boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
            }}
          >
            <Image
              src="/Generate.png" // No need for 'public/' prefix
              alt="Generate Flashcards with AI in seconds."
              width={2694}
              height={1860}
              style={{
                border: "1px solid #transparent",
                borderRadius: "10px",
                width: "100%",
                height: "auto",
                maxHeight: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0px 8px 5px rgba(0, 0, 0, 0.3))",
              }}
            />
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
