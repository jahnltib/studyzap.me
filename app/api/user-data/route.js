import { Clerk } from '@clerk/clerk-sdk-node';

// Initialize Clerk with your server-side API key
const clerk = new Clerk({
  apiKey: process.env.CLERK_SECRET_KEY,
});

export default async function handler(req, res) {
  // Ensure the request method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract the user ID from the request headers or session
  const { userId } = req.headers;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Fetch the user from Clerk
    const user = await clerk.users.getUser(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send back the user metadata
    res.status(200).json({ metadata: user.metadata });
  } catch (error) {
    console.error('Error fetching user metadata:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
