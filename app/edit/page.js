"use client";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Modal,
  Button,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import StartIcon from "@mui/icons-material/Start";
import PostAdd from "@mui/icons-material/PostAdd";
import StyleIcon from "@mui/icons-material/Style";
import { AutoAwesome, EditNote } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";

export default function Edit() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [text, setText] = useState("");
  const router = useRouter();
  //   useEffect(() => {
  //     if (!isLoaded || !isSignedIn) {
  //       router.push("/");
  //     }
  //   }, []);

  useEffect(() => {
    if (user) {
      async function getFlashcards() {
        const docRef = doc(collection(db, "users"), user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || [];
          console.log(collections);
          setFlashcards(collections);
        } else {
          await setDoc(docRef, { flashcards: [] });
        }
      }
      getFlashcards();
    }
  }, [user]);

  const handleEditCard = name => {
    console.log("name is", name);
    setEditCard(name);
    setText(name);
    setEditMode(true);
  };

  const handleSubmit = async () => {
    console.log("text", text);
    console.log("edit card", editCard);
    setEditMode(false);
    setEditCard(null);
    const newFlashcards = flashcards.map(flashcard => {
      if (flashcard.name === editCard) {
        return { ...flashcard, name: text };
      }
      return flashcard;
    });
    setFlashcards(newFlashcards || []);
    const docRef = doc(collection(db, "users"), user.id);
    await setDoc(docRef, { flashcards: newFlashcards });
  };
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          p: 2,
        }}
      >
        {/* Library Display */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: 768,
            mb: 2,
          }}
        >
          <IconButton edge="start">
            <InboxIcon
              sx={{
                color: "black",
                ml: 0.2,
              }}
            />
          </IconButton>
          <Typography variant="h6">Edit Your Flashcard Titles</Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid transparent",
            width: "100%",
            maxWidth: "768px",
            height: "40vh",
            p: 2,
            mb: 2,
            borderRadius: "10px",
            bgcolor: "background.box",
            overflow: "auto", // Enable scrolling if needed
          }}
        >
          <Grid container direction="column" spacing={3}>
            {flashcards.map((flashcard, index) => {
              return (
                <Grid item key={index}>
                  <Card sx={{ width: "100%" }}>
                    <CardActionArea>
                      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                        {editCard === flashcard.name ? (
                          <TextField
                            id="outlined-multiline-static"
                            label="Enter text"
                            multiline
                            rows={4}
                            fullWidth
                            value={text}
                            onChange={e => setText(e.target.value)}
                            sx={{ mb: 2 }}
                          />
                        ) : (
                          <Typography variant="h5" component="div">
                            {flashcard.name}
                          </Typography>
                        )}
                        <EditNote
                          onClick={() => {
                            handleEditCard(flashcard.name);
                          }}
                        />
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {editMode && <Button onClick={handleSubmit}> Submit</Button>}
        </Box>
      </Box>
    </Container>
  );
}
