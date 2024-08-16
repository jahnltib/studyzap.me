import { Container, Typography, Box } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';

export default function ComingSoon() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // Prevent overflow issues
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          bgcolor: "background.default",
          p: 3,
          position: 'relative',
          zIndex: 1, // Ensure this is above other elements if needed
        }}
      >
        <BuildIcon
          sx={{ fontSize: 100, color: "primary.main", mb: 2 }}
        />
        <Typography variant="h4" component="div" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="body1">
          We're working hard to bring you this feature. Stay tuned!
        </Typography>
      </Container>
    </Box>
  );
}
