"use client";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, doc } from "firebase/firestore";
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, Button } from "@mui/material";
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

      // Construct the path dynamically based on `search` and user ID
      const colRef = collection(doc(collection(db, "users"), user.id), "flashcardSets", search, "cards");

      try {
        const querySnapshot = await getDocs(colRef);
        const flashcards = [];
        querySnapshot.forEach(doc => {
          flashcards.push({ id: doc.id, ...doc.data() });
        });
        setFlashcards(flashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }
    getFlashcard();
  }, [search, user?.id]);

  const handleCardClick = id => {
    setFlipped(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNextClick = () => {
    setCurrentCardIndex(prevIndex => {
      if (prevIndex === flashcards.length - 1) {
        return -1;
      } else {
        return prevIndex + 1;
      }
    });
  };
  const hanldeReset = () => {
    setCurrentCardIndex(0);
    setFlipped({});
  };

  /* Should redirect to sign-in page if not logged in.
                   Should show a loading indicator if not signed in. */
  if (!isLoaded || !isSignedIn) {
    return <RedirectToSignIn />;
  }

  const currentFlashcard = flashcards[currentCardIndex];
  console.log("currentFlashcard", currentFlashcard);

  if (!currentFlashcard) {
    return (
      <Container>
        <Typography variant="h4" component="h1" textAlign={"center"}>
          Flashcard Set:{" "}
          <Typography variant="span" component="span" textTransform={"capitalize"}>
            {search}
          </Typography>
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
          <Grid item xs={12} sm={6} md={4} key={1}>
            <Card>
              <Box sx={{ cursor: "pointer" }}>
                <CardContent>
                  <Box
                    sx={{
                      perspective: "1000px",
                      textAlign: "center",
                      "& > div": {
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
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
                          You&apos;ve reached the end of the flashcards!
                        </Typography>
                      </div>
                      <Button
                        sx={{ position: "absolute", right: 0, bottom: 0, fontWeight: "bold" }}
                        color="primary"
                        onClick={hanldeReset}
                      >
                        Reset
                      </Button>
                    </div>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return (
    <Container>
      <Typography variant="h4" component="h1" textAlign={"center"}>
        Flashcard Set:{" "}
        <Typography variant="span" component="span" textTransform={"capitalize"}>
          {search}
        </Typography>
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
        <Grid item xs={12} sm={6} md={4} key={1}>
          <Card>
            <Box onClick={() => handleCardClick(currentFlashcard.id)} sx={{ cursor: "pointer" }}>
              <CardContent>
                <Box
                  sx={{
                    perspective: "1000px",
                    textAlign: "center",
                    "& > div": {
                      transition: "transform 0.6s",
                      transformStyle: "preserve-3d",
                      position: "relative",
                      width: "100%",
                      height: "200px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      transform: flipped[currentFlashcard.id] ? "rotateY(180deg)" : "rotateY(0deg)",
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
                        {currentFlashcard.front}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h5" component="div">
                        {currentFlashcard.back}
                      </Typography>
                    </div>
                    {flipped[currentFlashcard.id] !== true && (
                      <Button
                        sx={{ position: "absolute", right: 0, bottom: 0 }}
                        color="secondary"
                        onClick={handleNextClick}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Grid>

        {/* {flashcards.map(flashcard => (
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
                        transform: flipped[flashcard.id] ? "rotateY(180deg)" : "rotateY(0deg)",
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
        ))} */}
      </Grid>
    </Container>
  );
}
