// Test script for admin API endpoints
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_URL = 'http://localhost:3000';
let authToken = '';

// Helper to generate token (same as in API)
const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const testEndpoints = async () => {
  console.log('=== Testing Admin API Endpoints ===\n');

  // Test 1: Health endpoint
  console.log('1. Testing health endpoint...');
  try {
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    console.log(`   Status: ${healthRes.status} ${healthRes.statusText}`);
    if (healthRes.ok) {
      const data = await healthRes.json();
      console.log(`   Response: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }

  // Test 2: Login
  console.log('\n2. Testing login...');
  try {
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin' })
    });
    console.log(`   Status: ${loginRes.status} ${loginRes.statusText}`);
    if (loginRes.ok) {
      const data = await loginRes.json();
      console.log(`   Login successful! Token received: ${data.token ? 'Yes' : 'No'}`);
      authToken = data.token;
    } else {
      const errorData = await loginRes.json().catch(() => ({}));
      console.log(`   Error: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }

  if (!authToken) {
    console.log('\n⚠️  Cannot continue tests without authentication token');
    return;
  }

  // Test 3: Admin stats
  console.log('\n3. Testing admin stats...');
  try {
    const statsRes = await fetch(`${BASE_URL}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    console.log(`   Status: ${statsRes.status} ${statsRes.statusText}`);
    if (statsRes.ok) {
      const data = await statsRes.json();
      console.log(`   Stats:`, data);
    } else {
      const errorData = await statsRes.json().catch(() => ({}));
      console.log(`   Error: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }

  // Test 4: Test Supabase connection directly
  console.log('\n4. Testing Supabase connection...');
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log(`   Supabase error: ${error.message}`);
    } else {
      console.log(`   Supabase connected successfully`);
      console.log(`   Bookings count: ${bookings?.count || 0}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }

  // Test 5: Check if tables exist
  console.log('\n5. Checking required tables...');
  const tables = ['bookings', 'contacts', 'subscribers', 'posts', 'users'];
  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`   Table "${table}": ❌ ${error.message}`);
      } else {
        console.log(`   Table "${table}": ✅ Exists`);
      }
    } catch (error) {
      console.log(`   Table "${table}": ❌ ${error.message}`);
    }
  }

  console.log('\n=== Test Summary ===');
  console.log('To test the admin panel:');
  console.log('1. Start the development server: npm run dev');
  console.log('2. Open your browser to: http://localhost:3000/admin/login');
  console.log('3. Login with username: "admin", password: "admin"');
  console.log('4. Navigate to the dashboard and test each section');
  console.log('\nNote: Make sure the Supabase tables are created with the schema in supabase-schema.sql');
};

// Run tests
testEndpoints().catch(console.error);