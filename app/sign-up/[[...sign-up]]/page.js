import React from "react";
import { Container, Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import Head from "next/head";

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign Up | Flashcard SaaS</title>
        <meta name="description" content="Sign up for Flashcard SaaS to start creating and managing your flashcards." />
      </Head>
      <div>
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ textAlign: "center", my: 4 }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Sign Up
            </Typography>
            <SignUp />
          </Box>
        </Container>
      </div>
    </>
  );
}
