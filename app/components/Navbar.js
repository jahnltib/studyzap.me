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
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} color="secondary" fontWeight={"bold"}>
          StudyZap
        </Typography>
        <SignedOut>
          <Button color="secondary" href="/sign-in">
            Login
          </Button>
          <Button color="secondary" href="/sign-up">
            Sign Up
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Link href="/flashcards">
            <Button color="secondary">Flashcards</Button>
          </Link>
          <Link href="/generate">
            <Button color="secondary">Generate</Button>
          </Link>
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
