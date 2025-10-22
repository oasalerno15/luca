# Troubleshooting "Failed to Fetch" Errors

## Problem
You're seeing "TypeError: fetch failed" when trying to connect to Supabase from the Contact and Volunteer forms.

## Root Cause
The Supabase connection itself is failing, not just missing tables.

## Solutions (Try in Order)

### Solution 1: Check if Supabase Project is Paused ⚠️ MOST LIKELY

**Supabase free tier projects pause after 7 days of inactivity!**

1. Go to: https://supabase.com/dashboard/project/qxmfmtddaxnjfhgrmqjo
2. Look for a "Project Paused" banner at the top
3. If paused, click "Restore Project" or "Unpause"
4. Wait 2-3 minutes for the project to wake up
5. Refresh your app and try the forms again

### Solution 2: Verify Supabase Credentials

1. Go to: https://supabase.com/dashboard/project/qxmfmtddaxnjfhgrmqjo/settings/api

2. Copy the correct values:
   - **Project URL**: Should match `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key**: Should match `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Update your `.env.local` file if they don't match

4. **IMPORTANT**: Restart your dev server after changing `.env.local`:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

### Solution 3: Check Network/Firewall

1. Try opening this URL in your browser (replace with your actual Supabase URL):
   ```
   https://qxmfmtddaxnjfhgrmqjo.supabase.co/rest/v1/
   ```

2. You should see: `{"message":"The server is running"}`

3. If you see an error:
   - Check if a VPN is blocking the connection
   - Check firewall settings
   - Try a different network

### Solution 4: Test Connection in Browser Console

1. Open your app in the browser
2. Open DevTools (F12)
3. Go to Console tab
4. Paste this and press Enter:

```javascript
fetch('https://qxmfmtddaxnjfhgrmqjo.supabase.co/rest/v1/', {
  headers: {
    'apikey': 'YOUR_ANON_KEY_HERE',
    'Authorization': 'Bearer YOUR_ANON_KEY_HERE'
  }
}).then(r => r.json()).then(console.log).catch(console.error);
```

Replace `YOUR_ANON_KEY_HERE` with your actual anon key from `.env.local`

If this works, the issue is in your app code. If it fails, the issue is network/Supabase.

### Solution 5: Create New Tables (After Connection Works)

**ONLY do this after verifying the connection works!**

1. Go to: https://supabase.com/dashboard/project/qxmfmtddaxnjfhgrmqjo/sql
2. Copy and paste the contents of `QUICK_FIX_FETCH_ERRORS.sql`
3. Click "Run" to create the missing tables

## Quick Checklist

- [ ] Supabase project is not paused
- [ ] Correct URL and key in `.env.local`
- [ ] Dev server restarted after env changes
- [ ] Can access Supabase URL in browser
- [ ] No VPN/firewall blocking connection
- [ ] Tables created in Supabase

## Still Not Working?

If none of the above work, please share:
1. The exact error message from browser console
2. Screenshot of your Supabase dashboard
3. Output of: `cat .env.local` (hide the actual key, just confirm it exists)

---

## Expected Behavior After Fix

✅ Contact form submits successfully with green success message  
✅ Volunteer form submits and shows acknowledgment page  
✅ Student registration creates account and shows confirmation  
✅ No "failed to fetch" errors in console  

## Test After Fixing

1. **Test Contact Form**: Fill it out and submit - should see green success message
2. **Test Volunteer Form**: Fill it out and submit - should see "Application Submitted Successfully!"
3. **Test Student Registration**: Create account - should see "Welcome to our tutoring platform!"
4. Check Supabase dashboard to see if data was inserted

