# 🚀 Future Path - Live Web Deployment Guide

This guide walks you through deploying **Future Path** (Frontend + Backend) to the web for free using **Render** or **Vercel + Render**.

---

## ⚡ Option 1: 1-Click Deployment on Render (Easiest & Free)

Render can automatically build and host both your **Backend API** and your **Frontend SPA** using the included [`render.yaml`](./render.yaml) Blueprint!

### Steps:
1. **Push your code to GitHub**:
   Ensure all changes are pushed to your GitHub repository:
   `https://github.com/Shivachinthala19/Future-Path.git`

2. **Go to Render**:
   - Visit [dashboard.render.com](https://dashboard.render.com/) and sign in with GitHub.

3. **Deploy with Blueprint**:
   - Click **New +** > **Blueprint**.
   - Select your repository: `Shivachinthala19/Future-Path`.
   - Render will detect [`render.yaml`](./render.yaml) and automatically configure:
     - **`futurepath-backend`** (Node.js Web Service on port 10000)
     - **`futurepath-frontend`** (Static Site with SPA rewrite to `/index.html`)
   - Click **Apply**.

4. **Connect Frontend to Backend**:
   - Once the backend is deployed, copy its live URL (e.g. `https://futurepath-backend.onrender.com`).
   - In Render, go to **`futurepath-frontend`** > **Environment**.
   - Add/update:
     - `VITE_API_URL` = `https://futurepath-backend.onrender.com/api`
   - In **`futurepath-backend`** > **Environment**, set:
     - `FRONTEND_URL` = your live frontend URL (e.g. `https://futurepath-frontend.onrender.com`).

5. **(Optional) Configure AI & Database Keys**:
   - In **`futurepath-backend`** > **Environment**:
     - `AI_API_KEY`: Your Google Gemini API key (or leave empty to use deterministic knowledge graph).
     - `SUPABASE_URL`: Your Supabase project URL (if using Supabase).
     - `SUPABASE_PUBLISHABLE_KEY`: Your Supabase anon key.
     - `MONGO_URI`: (Optional) MongoDB Atlas URI.

---

## ⚡ Option 2: Frontend on Vercel + Backend on Render

If you prefer Vercel for the frontend (known for blazing-fast Edge CDN):

### Part A: Deploy Backend on Render
1. Go to [dashboard.render.com](https://dashboard.render.com/).
2. Click **New +** > **Web Service**.
3. Connect `Shivachinthala19/Future-Path`.
4. Configure:
   - **Name**: `futurepath-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`
5. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = (Click Generate or enter a strong random string)
   - `USE_MEMORY_DB_FALLBACK` = `true`
   - `AI_API_KEY` = your Google Gemini API key (optional)
   - `SUPABASE_URL` = your Supabase URL (optional)
   - `SUPABASE_PUBLISHABLE_KEY` = your Supabase anon key (optional)
6. Click **Deploy Web Service**.
7. Copy your backend URL: `https://your-backend.onrender.com`.

### Part B: Deploy Frontend on Vercel
1. Go to [vercel.com](https://vercel.com/) and click **Add New...** > **Project**.
2. Import the `Shivachinthala19/Future-Path` repository.
3. Configure project settings:
   - **Root Directory**: Click edit and select `frontend`.
   - **Framework Preset**: `Vite` (automatically detected).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Click **Deploy**.
6. Vercel will build and give you a live production URL like `https://future-path.vercel.app`.

---

## 🛠 Configuration Files Included

- [`frontend/vercel.json`](./frontend/vercel.json): Configured with SPA rewrite (`/(.*) -> /`) so direct route navigation and page reloads never return 404.
- [`frontend/public/_redirects`](./frontend/public/_redirects): Netlify and Render Static Site routing compatibility (`/* /index.html 200`).
- [`render.yaml`](./render.yaml): Render Blueprint for automated full-stack deployment.
