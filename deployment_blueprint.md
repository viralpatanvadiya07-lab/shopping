# 🚀 ShopVerse Deployment Blueprint

Your application is now **Deployment Ready**. To make it live for your groups, follow these 3 simple phases.

## Phase 1: Push to GitHub
Since Vercel and Render connect directly to GitHub, you need to put your code there first.

1.  **Create a new Repository** on [GitHub](https://github.com/new) named `shopverse`.
2.  **Run these commands** in your terminal:
    ```powershell
    git remote add origin https://github.com/YOUR_USERNAME/shopverse.git
    git branch -M main
    git push -u origin main
    ```

## Phase 2: Deploy Backend (Render)
Render is perfect for hosting your Node.js/Express server for free.

1.  Go to [Render.com](https://render.com) and create a new **Web Service**.
2.  Connect your GitHub repo.
3.  **Settings**:
    *   **Root Directory**: `backend`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
4.  **Environment Variables**:
    *   `MONGO_URI`: (Your MongoDB Atlas Link)
    *   `JWT_SECRET`: (Anything random, e.g., `shopverse_secret_99`)
    *   `PORT`: `5000`

## Phase 3: Deploy Frontend (Vercel)
Vercel will give you the high-speed link to share with your groups.

1.  Go to [Vercel.com](https://vercel.com) and click **"Add New" -> "Project"**.
2.  Import your GitHub repo.
3.  **Settings**:
    *   **Root Directory**: `frontend`
    *   **Framework Preset**: `Vite`
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
4.  **Environment Variables**:
    *   `VITE_API_URL`: (Paste your Render Backend URL here + `/api`)
        *   Example: `https://shopverse-api.onrender.com/api`

---

### 💡 Pro Tip
Once deployed, your frontend link (e.g., `https://shopverse.vercel.app`) is the one you share with your friends!

**I have already:**
- [x] Prepared `api.js` for dynamic backend switching.
- [x] Added `vercel.json` for proper React routing.
- [x] Committed all changes to your local Git.
