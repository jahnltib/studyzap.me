"use client";

import { Archivo } from "next/font/google";
import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["800"],
});

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {}, []);

  return (
    <AppBar 
      position="static" 
      color="customColor" 
    >
      <Toolbar
        sx={{
          height: "50px !important",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logobox.png"
            alt="Logo"
            style={{ height: "32px", marginRight: "8px" }}
          />
          <Typography
            className={archivo.className}
            variant="h5"
            color="textPrimary"
          >
            studyzap
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
