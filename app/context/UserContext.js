"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { isSignedIn, user } = useUser();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      const fetchPremiumStatus = async () => {
        try {
          const response = await fetch("/api/premium", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.id}`, // Add user ID to headers
            },
          });

          if (response.ok) {
            const data = await response.json();
            setIsPremium(data.isPremium);
          } else {
            throw new Error("Failed to fetch premium status");
          }
        } catch (error) {
          console.error("Error fetching premium status:", error);
        }
      };

      fetchPremiumStatus();
    }
  }, [isSignedIn, user]);

  return (
    <UserContext.Provider value={{ isPremium }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
