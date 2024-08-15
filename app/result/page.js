"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getStripe from "@/utils/get-stripe";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) {
        setError("No session ID provided");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const sessionData = await res.json();
        setSession(sessionData);
      } catch (err) {
        console.error("Error fetching session:", err);
        setError("An error occurred while retrieving the session.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!session_id) {
    setError("No session ID provided. Redirecting to the home page...");
    setLoading(false);
    setTimeout(() => {
      router.push("/"); // Redirect to home or checkout page after a brief delay
    }, 3000);
    return;
  }

  return (
<Container>
  {session.payment_status === "paid" ? (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" color="primary">
          Thank you for your purchase!
        </Typography>
        <Box mt={2} textAlign="center">
          <Typography>
            We have received your payment. You will receive an email with the
            order details shortly.
          </Typography>
        </Box>
      </Box>
    </>
  ) : (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" color="error">
          Payment failed
        </Typography>
        <Box mt={2} textAlign="center">
          <Typography>
            Your payment was not successful. Please try again.
          </Typography>
        </Box>
      </Box>
    </>
  )}
</Container>
  );
};

export default ResultPage;
