# Environment Variables Setup

## Waarom?
De Firebase API keys zijn verwijderd uit de code voor betere beveiliging. Ze worden nu via environment variables beheerd.

**Belangrijk:** Firebase API keys zijn over het algemeen veilig om in client-side code te hebben (ze zijn publiek door design), maar het is een best practice om ze niet direct in de code te committen.

## Lokale Development

1. Maak een `.env.local` bestand in de root van het project (als deze nog niet bestaat)
2. Kopieer de inhoud van `.env.example` naar `.env.local`
3. Vul je Firebase credentials in:

```env
REACT_APP_FIREBASE_API_KEY=je-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=je-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=je-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=je-project-id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=je-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=je-app-id
```

4. Herstart de development server (`npm start`)

**Let op:** `.env.local` staat in `.gitignore` en wordt niet gecommit naar GitHub.

## GitHub Actions (CI/CD)

Voor automatische deployments via GitHub Actions, voeg de volgende secrets toe aan je GitHub repository:

1. Ga naar je GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Klik op **New repository secret** en voeg elk van deze secrets toe:

- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`

3. Gebruik dezelfde waarden als in je `.env.local` bestand

## Firebase Console

Je kunt je Firebase credentials vinden in:
**Firebase Console** → **Project Settings** → **General** → **Your apps** → **Web app**

## Veiligheid

- ✅ `.env.local` staat in `.gitignore` - wordt niet gecommit
- ✅ `.env.example` bevat alleen placeholders - veilig om te committen
- ✅ GitHub secrets zijn encrypted - veilig voor CI/CD
- ⚠️ Firebase API keys zijn publiek in de gebouwde app (normaal voor client-side apps)
- ✅ Firestore Security Rules beschermen je data, niet de API key

## Troubleshooting

Als je een error krijgt: `Missing required Firebase environment variables`
- Controleer of `.env.local` bestaat en correct is ingevuld
- Herstart de development server na het aanmaken/wijzigen van `.env.local`
- Controleer of alle variabelen beginnen met `REACT_APP_` (vereist voor Create React App)

