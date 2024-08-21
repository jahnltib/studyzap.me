import { createClerkClient } from '@clerk/backend';
import { NextResponse } from 'next/server';

// Instantiate the Clerk client
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function GET(req) {
  try {
    // Extract user ID from headers
    const userId = req.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!userId) {
      return new Response('User ID not provided', { status: 400 });
    }

    const userData = await clerkClient.users.getUser(userId);
    
    if (!userData) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(userData.privateMetadata), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error retrieving private metadata:", error.message, error.stack);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const userId = req.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!userId) {
      return new Response('User ID not provided', { status: 400 });
    }

    const updatedUser = await clerkClient.users.updateUser(userId, {
      privateMetadata: {
        "isPremium": true,
      },
    });

    if (!updatedUser) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(updatedUser.privateMetadata), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error updating private metadata:", error.message, error.stack);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const userId = req.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!userId) {
      return new Response('User ID not provided', { status: 400 });
    }

    const updatedUser = await clerkClient.users.updateUser(userId, {
      privateMetadata: {},
    });

    if (!updatedUser) {
      return new Response('User not found', { status: 404 });
    }

    return new Response('Private metadata cleared successfully', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error clearing private metadata:", error.message, error.stack);
    return new Response('Internal Server Error', { status: 500 });
  }
}
