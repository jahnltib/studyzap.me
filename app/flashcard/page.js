"use client";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, doc } from "firebase/firestore";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

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

  const handleNextClick = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? -1 : prevIndex + 1
    );
  };

  const handleReset = () => {
    setCurrentCardIndex(0);
    setFlipped({});
  };

  if (!isLoaded || !isSignedIn) {
    return <RedirectToSignIn />;
  }

  const currentFlashcard = flashcards[currentCardIndex];

  // New animation styles
  const cardStyle = {
    backgroundColor: "transparent",
    width: "300px",
    height: "300px",
    perspective: "1000px",
    cursor: "pointer",
    margin: "0 auto",
    borderRadius: "10px", // Added border radius
    overflow: "hidden", // Ensures the border radius applies correctly
  };

  const innerCardStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    textAlign: "center",
    transition: "transform 0.6s",
    transformStyle: "preserve-3d",
    transform: flipped[currentFlashcard?.id]
      ? "rotateY(180deg)"
      : "rotateY(0deg)",
  };

  const frontStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    backgroundColor: "#fff", // Set consistent background color
    color: "black", // Set consistent text color
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px", // Added border radius
    boxSizing: "border-box",
  };

  const backStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    backgroundColor: "#fff", // Set consistent background color
    color: "black", // Set consistent text color
    transform: "rotateY(180deg)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px", // Added border radius
    boxSizing: "border-box",
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" textAlign="center">
        Flashcard Set:{" "}
        <Typography variant="span" component="span" textTransform="capitalize">
          {search}
        </Typography>
      </Typography>
      {currentFlashcard ? (
        <>
          <Card
            style={cardStyle}
            onClick={() => handleCardClick(currentFlashcard.id)}
          >
            <div style={innerCardStyle}>
              <div style={frontStyle}>
                <Typography variant="h5" component="div">
                  {currentFlashcard.front}
                </Typography>
              </div>
              <div style={backStyle}>
                <Typography variant="h5" component="div">
                  {currentFlashcard.back}
                </Typography>
              </div>
            </div>
          </Card>
          <Box
            sx={{
              mt: 2,
              textAlign: "center",
              maxWidth: "768px",
            }}
          >
            <Button
              sx={{ display: "block" }}
              color="secondary"
              onClick={handleNextClick}
            >
              Next
            </Button>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "768px",
            mt: 2,
          }}
        >
          <Card>
            <Box
              sx={{
                cursor: "pointer",
                maxWidth: "768px",
              }}
            >
              <CardContent
                sx={{
                  maxWidth: "768px",
                }}
              >
                <Box
                  sx={{
                    perspective: "1000px",
                    textAlign: "center",
                    "& > div": {
                      transition: "transform 0.6s",
                      transformStyle: "preserve-3d",
                      position: "relative",
                      width: "100%",
                      maxWidth: "768px",
                      height: "40vh",
                      backgroundColor: "#fff", // Set the background color of the card
                      borderRadius: "10px", // Added border radius
                      overflow: "hidden", // Ensures the border radius applies correctly
                    },
                    "& > div > div": {
                      position: "absolute",
                      width: "100%",
                      maxWidth: "768px",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 2,
                      boxSizing: "border-box",
                      backgroundColor: "#fff", // Set the background color of the card faces
                      color: "black", // Set the text color of the card faces
                      borderRadius: "10px", // Added border radius
                    },
                    "& > div > div:nth-of-type(2)": {
                      transform: "rotateY(180deg)",
                      maxWidth: "768px",
                    },
                  }}
                >
                  <div>
                    <Typography variant="h5" component="div">
                      You've reached the end of the flashcards!
                    </Typography>
                  </div>
                </Box>
              </CardContent>
            </Box>
          </Card>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              sx={{ fontWeight: "bold" }}
              color="primary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
