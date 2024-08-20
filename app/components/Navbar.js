"use client";

import Link from "next/link";
import { Archivo } from "next/font/google";
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["800"],
});

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <AppBar position="static" color="customColor" textDecoration="none">
      <Toolbar
        sx={{
          height: "50px !important",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textDecoration: "none",
          
        }}
      >
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none", // Ensure no underline
              color: "inherit", // Ensure text color inherits
            }}
          >
            <Image
              src="/logobox.png"
              alt="Logo"
              height={32}
              width={32}
              style={{ marginRight: "8px" }}
            />
            <Typography
              className={archivo.className}
              variant="h5"
              color="textPrimary"
              textDecoration="none"
            >
              studyzap
            </Typography>
          </Box>
        </Link>

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
            <Link href="/dashboard" passHref>
              <Button color="secondary">Dashboard</Button>
            </Link>
            <Link href="/generate" passHref>
              <Button color="secondary">Generate</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
