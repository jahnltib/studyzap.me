import { loadStripe } from '@stripe/stripe-js'

let stripePromise

/**
 * Retrieves the Stripe instance. Ensures we create only one instance of `Stripe` and reuse it if it exists already.
 * @returns {Promise<Stripe>} The Stripe instance.
 * @throws {Error} Throws an error if the Stripe publishable key is not defined.
 */
const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      throw new Error("Stripe publishable key is not defined in environment variables.");
    }

    // Ensure that the key is a valid string (additional check, if needed)
    if (typeof publishableKey !== 'string' || publishableKey.trim() === '') {
      throw new Error("Invalid Stripe publishable key.");
    }

    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}

export default getStripe;