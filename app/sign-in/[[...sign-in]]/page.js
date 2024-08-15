import React from "react";
import { Container, Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { SignIn } from "@clerk/nextjs";
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
        href="/sign-up"
        sx={{ '&:hover': { backgroundColor: 'secondary.main', color: '#fff' } }}
        aria-label="Sign up for an account"
      >
        Sign Up
      </Button>
    </Toolbar>
  </AppBar>
);

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign In | Flashcard SaaS</title>
        <meta name="description" content="Sign in to your Flashcard SaaS account to access your personalized flashcards." />
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
              Sign In
            </Typography>
            <SignIn />
          </Box>
        </Container>
      </div>
    </>
  );
}