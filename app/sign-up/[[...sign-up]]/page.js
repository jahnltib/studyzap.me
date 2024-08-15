import React from "react";
import { Container, Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import Head from "next/head";

const AppBarComponent = () => (
  <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Flashcard SaaS
      </Typography>
      <Button
        color="inherit"
        component={Link}
        href="/sign-in"
        sx={{ '&:hover': { backgroundColor: 'secondary.main', color: '#fff' } }}
        aria-label="Sign in to your account"
      >
        Sign In
      </Button>
    </Toolbar>
  </AppBar>
);

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign Up | Flashcard SaaS</title>
        <meta name="description" content="Sign up for Flashcard SaaS to start creating and managing your flashcards." />
      </Head>
      <div>
        <AppBarComponent />
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