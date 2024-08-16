"use client";
import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Grid } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  useEffect(() => {}, []);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          StudyZap
        </Typography>
        <SignedOut>
          <Button color="inherit" href="/sign-in">
            Login
          </Button>
          <Button color="inherit" href="/sign-up">
            Sign Up
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Link href="/flashcards">
            <Button
              sx={{
                color: " #016233ff",
              }}
            >
              Dashboard
            </Button>
          </Link>
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
