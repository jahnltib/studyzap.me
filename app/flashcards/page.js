"use client";

// React and Next.js imports
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Clerk authentication import
import { useUser } from "@clerk/nextjs";

// Firebase imports
import { db } from "@/firebase";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";

// Material-UI imports
import { Container, Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([
    {
      name: "Flashcard 1",
    },
    {
      name: "Flashcard 2",
    },
    {
      name: "Flashcard 3",
    },
  ]);
  const router = useRouter();

  useEffect(() => {
    console.log("signed in", user, isSignedIn);
    if (user) {
      // router.push("/sign-in");
    }
  }, []);

  // useEffect(() => {
  //   async function getFlashcards() {
  //     if (!user) return;
  //     const docRef = doc(collection(db, "users"), user.id);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       const collections = docSnap.data().flashcards || [];
  //       setFlashcards(collections);
  //     } else {
  //       await setDoc(docRef, { flashcards: [] });
  //     }
  //   }
  //   getFlashcards();
  // }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = id => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{ mt: 4, minHeight: "400px" }}>
        {/* Flashcards aligned to the left in a column */}
        <Grid item xs={8} sx={{ border: "4px solid #020202ff" }}>
          <Grid container direction="column" spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item key={index}>
                <Card sx={{ width: "50%" }}>
                  <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {flashcard.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Three different cards on the right */}
        <Grid item xs={4}>
          <Grid container>
            {["Card 1", "Card 2", "Card 3"].map((cardName, index) => (
              <Grid item xs={12} key={index} width={"50%"}>
                <Card sx={{ width: "100%", height: "250px", border: "4px solid #020202ff" }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {cardName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
