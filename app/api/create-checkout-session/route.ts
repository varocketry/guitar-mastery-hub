import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { stripe, PRICES } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    // Get access token from request body
    const { priceType, accessToken } = await req.json();

    if (!accessToken) {
      console.error('No access token provided');
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Get user from access token
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'Unauthorized - Invalid session' },
        { status: 401 }
      );
    }

    console.log('✅ User authenticated:', user.email);

    // Determine which price to use
    let priceId: string;
    let mode: 'payment' | 'subscription';

    switch (priceType) {
      case 'free':
        priceId = PRICES.free;
        mode = 'payment';
        break;
      case 'coffee':
        priceId = PRICES.coffee;
        mode = 'payment';
        break;
      case 'subscription':
        priceId = PRICES.subscription;
        mode = 'subscription';
        break;
      case 'oneTime':
      default:
        priceId = PRICES.oneTime;
        mode = 'payment';
        break;
    }

    console.log('Creating Stripe session...');
    console.log('Price Type:', priceType);
    console.log('Price ID:', priceId);
    console.log('Mode:', mode);

    // Create Checkout Session
    const stripeSession = await stripe.checkout.sessions.create({
      customer_email: user.email,
      client_reference_id: user.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId: user.id,
        priceType: priceType,
      },
    });

    console.log('✅ Stripe session created:', stripeSession.id);

    return NextResponse.json({ 
      sessionId: stripeSession.id, 
      url: stripeSession.url 
    });
    
  } catch (error: any) {
    console.error('❌ Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
