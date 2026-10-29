# 🚀 Deployment Checklist for Apple Clone

## ✅ Files Prepared for Deployment

This project is now configured and ready to deploy to Vercel (Frontend) + Render (Backend).

### Configuration Files Added:
- ✅ `render.yaml` - Render deployment configuration
- ✅ `apple-fullStack/client/vercel.json` - Vercel configuration
- ✅ `apple-fullStack/client/.env.production` - Production API URL
- ✅ `apple-fullStack/client/.env.local` - Local development API URL
- ✅ Updated `Iphone.js` to use environment variables

---

## 📋 Quick Deployment Steps

### Option 1: Vercel + Render (Recommended)

#### Backend to Render:
1. Go to https://render.com and sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect repository: `Korsiyee/Apple-Clone`
4. Use these settings:
   - Root Directory: `apple-fullStack/server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables for database
6. Deploy and get your backend URL

#### Frontend to Vercel:
1. Go to https://vercel.com and sign up with GitHub
2. Click "Import Project"
3. Select `Korsiyee/Apple-Clone`
4. Use these settings:
   - Root Directory: `apple-fullStack/client`
   - Framework: Create React App
5. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
6. Deploy!

---

## 🔧 Post-Deployment Steps

1. **Initialize Database** (after backend deploys):
   - Visit: `https://your-backend.onrender.com/install`
   - Visit: `https://your-backend.onrender.com/seed-iphone`

2. **Update CORS** (in backend):
   - Add your Vercel URL to allowed origins

3. **Test Your App**:
   - Frontend: `https://your-app.vercel.app`
   - Backend API: `https://your-backend.onrender.com/iphone`

---

## 📝 Environment Variables Needed

### Backend (Render):
```
NODE_ENV=production
DB_HOST=<database-host>
DB_USER=<database-user>
DB_PASSWORD=<database-password>
DB_NAME=bonsa
```

### Frontend (Vercel):
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

---

## 🆘 Troubleshooting

- **CORS Error**: Make sure backend allows your Vercel domain
- **API 404**: Check REACT_APP_API_URL is set correctly in Vercel
- **Database Error**: Verify environment variables in Render
- **Slow First Load**: Render free tier sleeps after 15 min (first request takes 30-60s)

---

For complete step-by-step guide, see: `DEPLOYMENT_GUIDE.md`
