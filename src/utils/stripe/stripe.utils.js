
import { loadStripe } from "@stripe/stripe-js";
// need to add the .env file to the gitignore so that it doesnt get pushed onto github
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
