# Firebase Hosting Setup Guide

## Step 1: Login to Firebase

Run this command in your terminal (it will open a browser for authentication):

```bash
firebase login
```

## Step 2: Initialize Firebase in Your Project

After logging in, run:

```bash
firebase init
```

### During initialization, select:

1. **What do you want to use as your public directory?**
   - Answer: `build` (this is where React builds your production app)

2. **Configure as a single-page app?**
   - Answer: `Yes` (React Router needs this)

3. **Set up automatic builds and deploys with GitHub?**
   - Answer: `No` (unless you want CI/CD)

4. **File build/index.html already exists. Overwrite?**
   - Answer: `No` (we'll build it ourselves)

5. **What Firebase features do you want to set up?**
   - Select: `Firestore` (for database) and `Hosting` (for deployment)

## Step 3: Build Your App

Before deploying, build your React app:

```bash
npm run build
```

## Step 4: Deploy to Firebase Hosting

After building, deploy:

```bash
firebase deploy --only hosting
```

Or deploy everything (Firestore rules, hosting, etc.):

```bash
firebase deploy
```

## Important Notes:

- Your app will be available at: `https://your-project-id.web.app`
- You can also use a custom domain later
- The build folder will be deployed (make sure to run `npm run build` first)
- Firebase Hosting automatically provides HTTPS

## For PWA Features:

Firebase Hosting works great with PWAs because:
- ✅ Automatic HTTPS (required for service workers)
- ✅ Fast CDN delivery
- ✅ Easy deployment
- ✅ Free tier is generous

## Next Steps After Deployment:

1. Test your PWA at the deployed URL
2. Check if service worker is working
3. Test offline functionality
4. Verify Firebase database connection

