import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import hpp from 'hpp';
import { rateLimit } from 'express-rate-limit';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();

// 1. Security Headers (Helmet)
app.use(helmet());

// 2. HTTP Parameter Pollution Protection
app.use(hpp());

// 3. Refined CORS (Restrict to trusted origins)
const allowedOrigins = [
  'http://localhost:5173', // Vite default dev port
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL // Future production URL from .env
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// 4. Tiered Rate Limiting
// General API Limiter (100 reqs / 15 mins)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// Stricter Payment Verification Limiter (5 reqs / 15 mins)
// Prevents brute-forcing payment signatures
const paymentVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Security alert: Too many payment verification attempts. Please contact support.' }
});

// Apply General Limiter to all /api/ routes
app.use('/api/', apiLimiter);

// Apply Stricter Limiter specifically to payment verification
app.use('/api/verify-payment', paymentVerifyLimiter);

// Initialize Supabase Admin Client using Service Role Key
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("⚠️ Warning: Supabase Service Role Key missing. Database updates will fail.");
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Razorpay Client
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.warn("⚠️ Warning: Razorpay keys missing in .env");
}

const PLAN_PRICES = {
  pro: 39900, // ₹399 in paisa
  team: 149900 // ₹1499 in paisa
};

// Route 1: Create Order
app.post('/api/create-order', async (req, res) => {
  try {
    if (!razorpay) return res.status(500).json({ error: "Razorpay keys not configured" });

    const { plan, userId } = req.body;
    if (!PLAN_PRICES[plan]) return res.status(400).json({ error: "Invalid plan" });

    const options = {
      amount: PLAN_PRICES[plan],
      currency: "INR",
      receipt: `receipt_order_${Date.now()}_${userId}`,
      notes: { plan, userId }
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: options.amount });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Route 2: Verify Payment & Upgrade Subscription
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, userId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Cryptographically valid, safely upgrade user!
      const { error } = await supabase
        .from('subscriptions')
        .update({ plan: plan, updated_at: new Date().toISOString() })
        .eq('user_id', userId);

      if (error) throw error;
      
      res.json({ success: true, message: "Payment verified, subscription updated!" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Razorpay Backend running securely on port ${PORT}`));
