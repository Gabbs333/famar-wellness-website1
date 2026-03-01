// Test script to check login API
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testLogin() {
  console.log('Testing login API...\n');
  
  // Test 1: Check if API is accessible
  console.log('1. Testing health endpoint:');
  try {
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    console.log(`   Status: ${healthRes.status}`);
    console.log(`   Response: ${await healthRes.text()}\n`);
  } catch (error) {
    console.log(`   Error: ${error.message}\n`);
  }
  
  // Test 2: Test login endpoint
  console.log('2. Testing login endpoint:');
  try {
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin' })
    });
    
    console.log(`   Status: ${loginRes.status}`);
    console.log(`   Status Text: ${loginRes.statusText}`);
    
    const responseText = await loginRes.text();
    console.log(`   Response: ${responseText}\n`);
    
    if (loginRes.ok) {
      const data = JSON.parse(responseText);
      console.log('   ✅ Login successful!');
      console.log(`   Token: ${data.token ? 'Received' : 'Missing'}`);
    } else {
      console.log('   ❌ Login failed');
    }
  } catch (error) {
    console.log(`   Error: ${error.message}\n`);
  }
  
  // Test 3: Test with wrong credentials
  console.log('3. Testing with wrong credentials:');
  try {
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'wrong', password: 'wrong' })
    });
    
    console.log(`   Status: ${loginRes.status}`);
    const responseText = await loginRes.text();
    console.log(`   Response: ${responseText}\n`);
  } catch (error) {
    console.log(`   Error: ${error.message}\n`);
  }
  
  console.log('=== Test Complete ===');
  console.log('\nTo run the dev server: npm run dev');
  console.log('Then test in browser: http://localhost:3000/admin/login');
}

testLogin().catch(console.error);