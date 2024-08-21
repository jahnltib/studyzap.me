import { getClerkSession } from '@clerk/nextjs/server';

export async function checkPremiumStatus(req) {
  const { userId } = await getClerkSession(req);
  const user = await fetchUserMetadata(userId);
  return user.isPremium;
}

async function fetchUserMetadata(userId) {
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();
  return data;
}
