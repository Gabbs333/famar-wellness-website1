// Development server for local testing
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Booking endpoint
app.post('/api/book', async (req, res) => {
  try {
    const { name, email, phone, service, date, time } = req.body;

    if (!name || !email || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          service: service || '',
          date,
          time,
          client_name: name,
          client_email: email,
          client_phone: phone || null,
          status: 'confirmed'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase booking error:', error);
      return res.status(500).json({ 
        error: 'Failed to save booking',
        details: error.message 
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Réservation confirmée',
      booking: data[0]
    });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, type = 'contact' } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({ error: 'Name and contact info required' });
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([{ 
        name, 
        email: email || null, 
        phone: phone || null, 
        message: message || '', 
        type, 
        status: 'new' 
      }])
      .select();

    if (error) {
      console.error('Supabase contact error:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent',
      contact: data[0]
    });
  } catch (error) {
    console.error('Contact error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Newsletter endpoint
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email }])
      .select();

    if (error) {
      // Check if it's a duplicate
      if (error.code === '23505') {
        return res.status(200).json({ 
          success: true, 
          message: 'Already subscribed' 
        });
      }
      
      console.error('Supabase newsletter error:', error);
      return res.status(500).json({ 
        error: 'Failed to subscribe',
        details: error.message 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Subscribed successfully',
      data: data[0]
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files from dist directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  
  // Fallback to index.html for SPA routing
  app.get('*', (req, res) => {
    res.sendFile('dist/index.html', { root: '.' });
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Development server running on http://localhost:${PORT}`);
  console.log(`API endpoints available at:`);
  console.log(`  GET  http://localhost:${PORT}/api/health`);
  console.log(`  POST http://localhost:${PORT}/api/book`);
  console.log(`  POST http://localhost:${PORT}/api/contact`);
  console.log(`  POST http://localhost:${PORT}/api/newsletter`);
});