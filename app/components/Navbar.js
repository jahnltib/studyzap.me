"use client";

import React from 'react';
import Link from 'next/link';
import { Archivo } from 'next/font/google';
import { AppBar, Toolbar, Typography, Button, Box, Badge } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { useUserContext } from '../context/UserContext'; // Import the useUserContext hook
import Image from 'next/image';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['800'],
});

export default function Navbar() {
  const { isPremium } = useUserContext(); // Use the context hook

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
        <Link href="/" passHref style={{ textDecoration: "none" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link href="/preview" passHref>
              <Badge
                      badgeContent={isPremium ? "PREMIUM" : "BASIC"}
                      color={isPremium ? "success" : "secondary"}
                      sx={{
                        marginRight: "55px", // Adjust the margin as needed
                        ".MuiBadge-dot": {
                          padding: "10px", // Adjust the padding of the badge content
                        },
                        ".MuiBadge-badge": {
                          padding: "16px 14px", // Adjust the padding of the badge container
                        },
                      }}
                    />
                </Link>
              <Link href="/dashboard" passHref>
                <Button color="secondary">
                  Dashboard
                </Button>
              </Link>
              <Link href="/generate" passHref>
                <Button color="secondary">Generate</Button>
              </Link>
              <UserButton />
            </Box>
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
