import React from "react";
import { Container, Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import Head from "next/head";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign In | Flashcard SaaS</title>
        <meta
          name="description"
          content="Sign in to your Flashcard SaaS account to access your personalized flashcards."
        />
      </Head>
      <div>
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ textAlign: "center", my: 20 }}
          >
            <SignIn />
          </Box>
        </Container>
      </div>
    </>
  );
}
