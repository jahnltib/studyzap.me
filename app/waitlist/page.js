"use client";
import React, { useEffect, useState } from "react";
import { Container, Box, Typography, AppBar, Toolbar, Button, TextField, FormControl } from "@mui/material";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { doc, collection, getDoc, setDoc, addDoc, set } from "firebase/firestore";
import { db } from "@/firebase";
export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();

    const docRef = doc(db, "waitlist", "waitlist");
    await setDoc(docRef, { email: email });

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSuccess(true);
      setEmail("");
    }

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  useEffect(() => {
    async function getData() {
      const docRef = doc(collection(db, "waitlist"), "waitlist");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data();
        console.log("collections", collections);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          minHeight="100vh"
          p={2}
          flexDirection={"column"}
        >
          <Typography variant="h1" mb={2}>
            Join our Waitlist!
          </Typography>
          <Box display={"flex"} flexDirection={"column"}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Typography variant="h5" mb={3}>
                  Sign up to get early access to our product.
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Enter your email"
                  variant="outlined"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  mt="2"
                  sx={{ width: "50%", textAlign: "center", margin: "0 auto", marginTop: "10px" }}
                >
                  Submit
                </Button>
              </FormControl>
            </form>
          </Box>
          {success && (
            <Typography variant="h5" mt={2} color={"green"}>
              Thank you for signing up! We will notify you when our product is ready.
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}
