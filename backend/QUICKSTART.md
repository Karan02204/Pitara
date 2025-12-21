# Quick Start Guide - Gifty Hub Backend

## 🚀 Get Started in 3 Steps

### Step 1: Set Up MongoDB

**Choose one option:**

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account → Create cluster (M0 Free tier)
3. Create database user and whitelist your IP
4. Get connection string and update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gifty-hub
   ```

#### Option B: Local MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB runs automatically - no config needed!

### Step 2: Seed the Database

```bash
cd backend
npm run seed
```

You should see:
```
✅ Connected to MongoDB
✨ Successfully seeded 12 gifts
```

### Step 3: Run the Application

**Terminal 1 - Backend:**
```bash
npm run server:dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

**Open:** http://localhost:8080

---

## ✅ Verify It's Working

1. **Backend Running?**
   - Look for: `🚀 Server is running on http://localhost:5000`

2. **Frontend Connected?**
   - Open http://localhost:8080/catalog
   - Gifts should load (with loading spinner first)

3. **Test Order Creation:**
   - Add items to cart
   - Go to checkout
   - Fill in details and submit
   - You should see an order number!

---

## 🔧 Common Issues

### "MongoDB connection error"
- **Atlas**: Check connection string, username, password, IP whitelist
- **Local**: Make sure MongoDB service is running

### "Port 5000 already in use"
- Change PORT in `backend/.env` to another port (e.g., 5001)

### "No gifts showing"
- Run: `cd backend && npm run seed`

---

## 📚 Full Documentation

- [Main README](../README.md) - Complete project overview
- [Backend README](README.md) - Detailed backend docs
- [Walkthrough](../.gemini/antigravity/brain/*/walkthrough.md) - Step-by-step guide

---

## 🎯 What You Can Do Now

✅ Browse gift catalog from database  
✅ Filter by category  
✅ Create custom hampers  
✅ Add items to cart  
✅ Complete checkout  
✅ Orders saved to MongoDB  
✅ Auto-generated order numbers  

---

**Need Help?** Check the walkthrough.md for detailed troubleshooting!
