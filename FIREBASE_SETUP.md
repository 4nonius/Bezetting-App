# Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter project name
   - Enable/disable Google Analytics (optional)
   - Create project

## Step 2: Add Web App to Firebase

1. In your Firebase project, click the web icon (`</>`) to add a web app
2. Register your app with a nickname (e.g., "Bezetting PWA")
3. **Copy the Firebase configuration object** - you'll need these values

## Step 3: Configure Environment Variables

1. Create a `.env` file in the root of your project (copy from `.env.example`)
2. Add your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

## Step 4: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development)
4. Select a location for your database
5. Click "Enable"

### Security Rules (Important!)

After setting up, update your Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents (for development)
    // TODO: Update these rules for production!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Warning:** The above rules allow anyone to read/write. Update them for production!

## Step 5: Initialize Firebase in Your App

The Firebase configuration is already set up in `src/firebase/config.js`. 

The app will:
- Use Firebase when online
- Fall back to localStorage when offline
- Sync data automatically when connection is restored

## Step 6: Login to Firebase CLI (Optional - for deployment)

```bash
firebase login
```

## Step 7: Initialize Firebase in Your Project (Optional)

```bash
firebase init
```

Select:
- Firestore (for database)
- Hosting (if you want to deploy)

## Testing

1. Start your app: `npm start`
2. The app will automatically initialize with default data on first run
3. Check Firebase Console > Firestore Database to see your data

## Notes

- The Firebase SDK is already installed via npm (`firebase` package)
- No need to add Firebase via CDN - we're using the npm package
- The app works offline with localStorage and syncs when online
- All database operations are handled in `src/firebase/database.js`

