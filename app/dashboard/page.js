"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { Box, Grid, Typography, IconButton, Card, CardActionArea, CardContent, Container, Modal, Button, List, ListItem } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import StartIcon from '@mui/icons-material/Start';
import PostAdd from '@mui/icons-material/PostAdd';
import StyleIcon from '@mui/icons-material/Style';
import { CameraEnhance, EditNote } from "@mui/icons-material";

const boxData = [
  { icon: <PostAdd sx={{ fontSize: 40 }} color="primary"/>, text: "Generate Flashcards", route: '/generate' },
  { icon: <StyleIcon sx={{ fontSize: 40 }} color="primary"/>, text: "Practice Cards", route: '/practice-cards' },
  { icon: <EditNote sx={{ fontSize: 40 }} color="grey"/>, text: "Manage/Edit Flashcards", route: '/preview' },
  { icon: <CameraEnhance sx={{ fontSize: 40 }} color="grey"/>, text: "Take a Picture", route: '/preview' },
];

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSet, setSelectedSet] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      async function getFlashcards() {
        const docRef = doc(collection(db, "users"), user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || [];
          setFlashcards(collections);
        } else {
          await setDoc(docRef, { flashcards: [] });
        }
      }
      getFlashcards();
    }
  }, [user]);

  const handleCardClick = id => {
    router.push(`/flashcard?id=${id}`);
  };

  const handleGridItemClick = route => {
    if (route === '/practice-cards') {
      setModalOpen(true);
    } else {
      router.push(route);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSetSelect = setName => {
    setSelectedSet(setName);
    setModalOpen(false);
    // Navigate to the practice page with the selected set
    router.push(`/flashcard?id=${setName}`);
  };

  if (!isLoaded || !isSignedIn) {
    return <></>; // or a loading indicator if preferred
  }

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
          <Typography variant="h6">Your Flashcard Sets</Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid transparent",
            width: "100%",
            maxWidth: '768px',
            height: "40vh",
            p: 2,
            mb: 2,
            borderRadius: '10px',
            bgcolor: "background.box",
            overflow: 'auto', // Enable scrolling if needed
          }}
        >
          <Grid container direction="column" spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item key={index}>
                <Card sx={{ width: "100%" }}>
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
        </Box>

        {/* Explore Features + Icon Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mb: 2,
            maxWidth: 768,
          }}
        >
          <IconButton edge="start">
            <StartIcon
              sx={{
                color: "black",
                ml: 0.2,
              }}
            />
          </IconButton>
          <Typography variant="h6">Explore these features</Typography>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            maxWidth: 768,
            mt: 0.25,
            mx: -1,
            px: 0,
          }}
        >
          {boxData.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Box
                onClick={() => handleGridItemClick(item.route)} // Route based on item
                sx={{
                  border: "1px solid transparent",
                  bgcolor: "background.box",
                  borderRadius: 1.25,
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 1,
                  minWidth: 0,  // Ensure items do not expand beyond container
                  maxWidth: '100%',
                  flexBasis: 'calc(50% - 16px)', // Adjust for spacing
                  boxSizing: 'border-box', // Include padding and border in width
                  transition: "all 0.3s ease", // Smooth transition for hover effects
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                {item.icon}
                <Typography variant="body2">{item.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Modal for Selecting Flashcard Set */}
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box
            sx={{
              border: '1px transparent',
              borderRadius: 2,
              bgcolor: 'background.paper',
              p: 4,
              width: 300,
              boxShadow: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography variant="h6" component="div" mb={2}>
              Select a Flashcard Set
            </Typography>
            <List>
              {flashcards.map((flashcard, index) => (
                <ListItem button key={index} onClick={() => handleSetSelect(flashcard.name)}>
                  {flashcard.name}
                </ListItem>
              ))}
            </List>
            <Button variant="outlined" onClick={handleModalClose} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>

      </Box>
    </Container>
  );
}
