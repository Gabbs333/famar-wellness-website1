#!/bin/bash

echo "=== Vercel Deployment Test Script ==="
echo "This script helps test your Vercel deployment setup."
echo ""

# Check if .env file exists
if [ -f ".env" ]; then
    echo "✓ .env file exists"
    
    # Check for Supabase URL
    if grep -q "SUPABASE_URL=" .env; then
        SUPABASE_URL=$(grep "SUPABASE_URL=" .env | cut -d'=' -f2)
        if [ ${#SUPABASE_URL} -gt 5 ]; then
            echo "✓ SUPABASE_URL is set (length: ${#SUPABASE_URL} chars)"
        else
            echo "⚠ SUPABASE_URL appears to be very short: '$SUPABASE_URL'"
            echo "  This might be incomplete. Check your .env file."
        fi
    else
        echo "✗ SUPABASE_URL not found in .env"
    fi
    
    # Check for service role key
    if grep -q "SUPABASE_SERVICE_ROLE_KEY=" .env; then
        KEY_LENGTH=$(grep "SUPABASE_SERVICE_ROLE_KEY=" .env | cut -d'=' -f2 | wc -c)
        echo "✓ SUPABASE_SERVICE_ROLE_KEY is set (length: $KEY_LENGTH chars)"
    else
        echo "✗ SUPABASE_SERVICE_ROLE_KEY not found in .env"
    fi
else
    echo "✗ .env file not found"
    echo "  Create one from .env.example: cp .env.example .env"
fi

echo ""
echo "=== API Structure Check ==="

# Check if api/index.js exists
if [ -f "api/index.js" ]; then
    echo "✓ api/index.js exists"
    
    # Check if it exports a default function
    if grep -q "export default async function handler" api/index.js; then
        echo "✓ api/index.js exports a Vercel Serverless Function"
    else
        echo "✗ api/index.js doesn't export a Vercel handler function"
    fi
else
    echo "✗ api/index.js not found"
fi

# Check vercel.json
if [ -f "vercel.json" ]; then
    echo "✓ vercel.json exists"
    
    # Check for rewrite rule
    if grep -q '"/api/:path\*"' vercel.json || grep -q '"source": "/api/:path' vercel.json; then
        echo "✓ vercel.json has API rewrite rule"
    else
        echo "✗ vercel.json missing API rewrite rule"
    fi
else
    echo "✗ vercel.json not found"
fi

echo ""
echo "=== Frontend Check ==="

# Check Booking component API URL
if [ -f "src/components/Booking.tsx" ]; then
    if grep -q "'/api/book'" src/components/Booking.tsx; then
        echo "✓ Booking.tsx uses '/api/book'"
    else
        echo "✗ Booking.tsx doesn't use '/api/book'"
        echo "  It might still be using Netlify function URL"
    fi
fi

# Check Contact component
if [ -f "src/components/Contact.tsx" ]; then
    if grep -q "'/api/contact'" src/components/Contact.tsx; then
        echo "✓ Contact.tsx uses '/api/contact'"
    else
        echo "✗ Contact.tsx doesn't use '/api/contact'"
    fi
fi

# Check Footer component
if [ -f "src/components/Footer.tsx" ]; then
    if grep -q "'/api/newsletter'" src/components/Footer.tsx; then
        echo "✓ Footer.tsx uses '/api/newsletter'"
    else
        echo "✗ Footer.tsx doesn't use '/api/newsletter'"
    fi
fi

echo ""
echo "=== Next Steps ==="
echo "1. Make sure your Supabase credentials are correct in Vercel dashboard"
echo "2. Push changes to GitHub: git add . && git commit -m 'fix: Vercel deployment' && git push"
echo "3. Check Vercel deployment logs for errors"
echo "4. Test API endpoints after deployment:"
echo "   - https://your-app.vercel.app/api/health"
echo "   - Test the booking form on your site"
echo ""
echo "For local testing:"
echo "1. Update .env with correct Supabase credentials"
echo "2. Run: npm run dev"
echo "3. Test: http://localhost:3000/api/health"