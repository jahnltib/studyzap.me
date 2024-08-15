"use client";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, doc } from "firebase/firestore";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      // Construct the path dynamically based on `search` and user ID
      const colRef = collection(
        doc(collection(db, "users"), user.id),
        "flashcardSets",
        search,
        "cards"
      );

      try {
        const querySnapshot = await getDocs(colRef);
        const flashcards = [];
        querySnapshot.forEach((doc) => {
          flashcards.push({ id: doc.id, ...doc.data() });
        });
        setFlashcards(flashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }
    getFlashcard();
  }, [search, user?.id]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return null; {/* Should redirect to sign-in page if not logged in.
                     Should show a loading indicator if not signed in. */}
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" textAlign={"center"}>
        Flashcard Set: {search}
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                <CardContent>
                  <Box
                    sx={{
                      perspective: "1000px",
                      "& > div": {
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transform: flipped[flashcard.id]
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                      },
                      "& > div > div": {
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 2,
                        boxSizing: "border-box",
                      },
                      "& > div > div:nth-of-type(2)": {
                        transform: "rotateY(180deg)",
                      },
                    }}
                  >
                    <div>
                      <div>
                        <Typography variant="h5" component="div">
                          {flashcard.front}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="h5" component="div">
                          {flashcard.back}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
