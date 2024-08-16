"use client";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, doc } from "firebase/firestore";
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    async function getFlashcard() {
      if (!isLoaded || !isSignedIn) {
        return;
      }
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
  const handleBackClick = () => {
    setCurrentCardIndex(prevIndex => {
      if (prevIndex === 0) {
        return flashcards.length;
      } else {
        return prevIndex - 1;
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
    return; // return <RedirectToSignIn />;
  }

  const currentFlashcard = flashcards[currentCardIndex];

  if (!currentFlashcard) {
    return (
      <Container>
        <Typography variant="h3" component="h1" textAlign={"center"} mt={3} mb={3}>
          Flashcard Set:{" "}
          <Typography variant="span" component="span" textTransform={"capitalize"}>
            {search}
          </Typography>
        </Typography>
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Grid item xs={12} sm={8} md={8} key={1} sx={{ height: "500px" }}>
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
                        height: "300px",
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
                        <Typography variant="h3" component="div">
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
      <Typography variant="h3" component="h1" textAlign={"center"} mt={3} mb={3}>
        Flashcard Set:{" "}
        <Typography variant="span" component="span" textTransform={"capitalize"}>
          {search}
        </Typography>
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid item xs={12} sm={8} md={8} key={1} sx={{ height: "500px" }}>
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
                      height: "300px",
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
                  <Box>
                    <div>
                      <Typography variant="h5" component="div" sx={{ fontSize: "1.8rem" }}>
                        {currentFlashcard.front}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h5" component="div" sx={{ fontSize: "1.8rem" }}>
                        {currentFlashcard.back}
                      </Typography>
                    </div>
                    {flipped[currentFlashcard.id] !== true && (
                      <Box>
                        <Button
                          color="secondary"
                          onClick={handleNextClick}
                          sx={{ position: "absolute", right: "0", bottom: "0" }}
                        >
                          <ArrowForwardIcon />
                        </Button>
                        <Button
                          color="secondary"
                          onClick={handleBackClick}
                          sx={{ position: "absolute", left: "0", bottom: "0" }}
                        >
                          <ArrowBackIcon />
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
