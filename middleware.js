import { clerkMiddleware } from "@clerk/nextjs/server";

const enhancedClerkMiddleware = async (req, res) => {
  try {
    await clerkMiddleware(req, res);
  } catch (error) {
    console.error("Error in Clerk middleware:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default enhancedClerkMiddleware;

export const config = {
  matcher: [
    // Exclude Next.js internals and static files (with certain extensions) from middleware
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always apply middleware to API routes
    '/(api|trpc)(.*)',
  ],
};