# GitHub Workflow Setup - Node.js 20 Fix

## Probleem
Firebase CLI v14.24.2 vereist Node.js >=20.0.0, maar de workflow gebruikte Node.js 18.

## Oplossing
De workflow is bijgewerkt naar Node.js 20. Omdat je Personal Access Token de `workflow` scope mist, moet je de workflow handmatig toevoegen via GitHub.

## Stappen:

### 1. Ga naar je GitHub repository
https://github.com/4nonius/Bezetting-App

### 2. Maak de workflow directory aan
- Klik op "Add file" → "Create new file"
- Typ: `.github/workflows/firebase-hosting.yml`
- GitHub maakt automatisch de directories aan

### 3. Kopieer de volgende inhoud:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - master
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        env:
          REACT_APP_FIREBASE_API_KEY: ${{ secrets.REACT_APP_FIREBASE_API_KEY }}
          REACT_APP_FIREBASE_AUTH_DOMAIN: ${{ secrets.REACT_APP_FIREBASE_AUTH_DOMAIN }}
          REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.REACT_APP_FIREBASE_PROJECT_ID }}
          REACT_APP_FIREBASE_STORAGE_BUCKET: ${{ secrets.REACT_APP_FIREBASE_STORAGE_BUCKET }}
          REACT_APP_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.REACT_APP_FIREBASE_MESSAGING_SENDER_ID }}
          REACT_APP_FIREBASE_APP_ID: ${{ secrets.REACT_APP_FIREBASE_APP_ID }}
        run: npm run build
      
      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: mealapp-70aae
```

### 4. Commit de file
- Klik op "Commit new file"
- De workflow wordt automatisch getriggerd bij de volgende push

## Belangrijk: GitHub Secrets toevoegen

Zorg dat je de volgende secrets hebt toegevoegd in:
**Settings** → **Secrets and variables** → **Actions**

1. `REACT_APP_FIREBASE_API_KEY`
2. `REACT_APP_FIREBASE_AUTH_DOMAIN`
3. `REACT_APP_FIREBASE_PROJECT_ID`
4. `REACT_APP_FIREBASE_STORAGE_BUCKET`
5. `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
6. `REACT_APP_FIREBASE_APP_ID`
7. `FIREBASE_SERVICE_ACCOUNT` (JSON van Firebase Service Account)

## Alternatief: Personal Access Token updaten

Als je via command line wilt pushen:

1. Ga naar: https://github.com/settings/tokens
2. Maak een nieuwe token aan met `workflow` scope
3. Gebruik deze token voor git push

