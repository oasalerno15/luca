// Test Supabase Connection
// Run with: node test-supabase-connection.js

const fs = require('fs');
const path = require('path');

// Read .env.local file
let supabaseUrl, supabaseKey;
try {
  const envPath = path.join(__dirname, '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1].trim();
    }
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      supabaseKey = line.split('=')[1].trim();
    }
  });
} catch (error) {
  console.error('❌ Could not read .env.local file');
}

const { createClient } = require('@supabase/supabase-js');

console.log('🔍 Testing Supabase Connection...\n');
console.log('URL:', supabaseUrl ? '✅ Found' : '❌ Missing');
console.log('Key:', supabaseKey ? '✅ Found' : '❌ Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('\n❌ ERROR: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test 1: Check if contact_submissions table exists
    console.log('\n📋 Test 1: Checking contact_submissions table...');
    const { data: contactData, error: contactError } = await supabase
      .from('contact_submissions')
      .select('count')
      .limit(0);
    
    if (contactError) {
      console.error('❌ contact_submissions table missing or inaccessible:', contactError.message);
      console.log('   → Run QUICK_FIX_FETCH_ERRORS.sql in Supabase SQL Editor');
    } else {
      console.log('✅ contact_submissions table exists');
    }

    // Test 2: Check if volunteer_applications table exists
    console.log('\n📋 Test 2: Checking volunteer_applications table...');
    const { data: volunteerData, error: volunteerError } = await supabase
      .from('volunteer_applications')
      .select('count')
      .limit(0);
    
    if (volunteerError) {
      console.error('❌ volunteer_applications table missing or inaccessible:', volunteerError.message);
      console.log('   → Run QUICK_FIX_FETCH_ERRORS.sql in Supabase SQL Editor');
    } else {
      console.log('✅ volunteer_applications table exists');
    }

    // Test 3: Check if profiles table exists
    console.log('\n📋 Test 3: Checking profiles table...');
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(0);
    
    if (profilesError) {
      console.error('❌ profiles table missing:', profilesError.message);
      console.log('   → Run database-setup.sql in Supabase SQL Editor');
    } else {
      console.log('✅ profiles table exists');
    }

    // Test 4: Try to insert test data (will rollback)
    console.log('\n📋 Test 4: Testing insert permissions...');
    const { error: insertError } = await supabase
      .from('contact_submissions')
      .insert([{
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        subject: 'test',
        message: 'This is a test - should be deleted'
      }])
      .select();
    
    if (insertError) {
      console.error('❌ Cannot insert into contact_submissions:', insertError.message);
      console.log('   → Check RLS policies in Supabase');
    } else {
      console.log('✅ Insert permissions working');
    }

    console.log('\n' + '='.repeat(50));
    if (!contactError && !volunteerError && !profilesError && !insertError) {
      console.log('🎉 All tests passed! Your Supabase is configured correctly.');
    } else {
      console.log('⚠️  Some tests failed. Follow the instructions above to fix.');
    }
    console.log('='.repeat(50) + '\n');

  } catch (error) {
    console.error('\n❌ Connection test failed:', error.message);
  }
}

testConnection();

