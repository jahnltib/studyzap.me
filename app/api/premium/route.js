import { createClerkClient } from '@clerk/backend';
import { NextResponse } from 'next/server';

// Instantiate the Clerk client
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY, // Ensure this is set in your environment variables
});

export async function GET(req) {
  try {
    // Extract user ID from headers
    const userId = req.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!userId) {
      return new NextResponse('User ID not provided', { status: 400 });
    }

    const user = await clerkClient.users.getUser(userId);
    
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Determine if user is premium
    const privateMetadata = user.privateMetadata || {};
    const isPremium = privateMetadata.isPremium === true;

    return new NextResponse(JSON.stringify({ isPremium }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching user data:", error.message, error.stack);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
