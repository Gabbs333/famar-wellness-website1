// Simple test script to check API endpoints
const testEndpoints = async () => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('Testing API endpoints...');
  
  // Test health endpoint
  try {
    const healthResponse = await fetch(`${baseUrl}/api/health`);
    console.log('Health endpoint:', healthResponse.status, healthResponse.statusText);
    if (healthResponse.ok) {
      const data = await healthResponse.json();
      console.log('Health response:', data);
    }
  } catch (error) {
    console.error('Health endpoint error:', error.message);
  }
  
  // Test booking endpoint with dummy data
  const testBooking = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    service: 'Massothérapie Manuelle',
    date: '2024-12-31',
    time: '10:00'
  };
  
  try {
    const bookingResponse = await fetch(`${baseUrl}/api/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testBooking)
    });
    console.log('Booking endpoint:', bookingResponse.status, bookingResponse.statusText);
    if (bookingResponse.ok) {
      const data = await bookingResponse.json();
      console.log('Booking response:', data);
    } else {
      const errorData = await bookingResponse.json().catch(() => ({}));
      console.log('Booking error:', errorData);
    }
  } catch (error) {
    console.error('Booking endpoint error:', error.message);
  }
};

// Run test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testEndpoints();
}

export default testEndpoints;