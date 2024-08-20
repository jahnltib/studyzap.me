import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);

    // Check if the user has "premium" in their private metadata
    const isPremium = user.privateMetadata?.premium === true;

    if (req.method === "GET") {
      return res.status(200).json({ premium: isPremium });
    }

    if (req.method === "POST") {
      // Update the "premium" status in the user's private metadata
      await clerkClient.users.updateUser(userId, {
        privateMetadata: {
          premium: true,
        },
      });

      return res.status(200).json({ success: true });
    }

    // Handle unsupported methods
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });

  } catch (error) {
    console.error("Error handling premium status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
