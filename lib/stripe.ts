import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

export const PRICES = {
  free: process.env.NEXT_PUBLIC_STRIPE_FREE_PRICE_ID!,
  coffee: process.env.NEXT_PUBLIC_STRIPE_COFFEE_PRICE_ID!,
  oneTime: process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_PRICE_ID!,
  subscription: process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID!,
};
