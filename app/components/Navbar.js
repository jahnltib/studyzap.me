"use client";

import { Archivo } from "next/font/google";
import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["800"],
});

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {}, []);

  return (
    <AppBar position="static" color="customColor">
      <Toolbar
        sx={{
          height: "50px !important",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image src="/logobox.png" alt="Logo" height={32} width={32} style={{ marginRight: "8px" }} />
          <Typography className={archivo.className} variant="h5" color="textPrimary">
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
            <Link href="/dashboard">
              <Button color="secondary">Dashboard</Button>
            </Link>
            <Link href="/generate">
              <Button color="secondary">Generate</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
