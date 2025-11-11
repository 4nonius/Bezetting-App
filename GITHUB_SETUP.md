# GitHub Actions Setup voor Firebase Hosting

## Stap 1: Firebase CI Token genereren

Voer dit uit in je terminal:
```bash
firebase login:ci
```

Dit geeft je een token dat je nodig hebt voor GitHub Secrets.

## Stap 2: Firebase Service Account aanmaken

1. Ga naar [Firebase Console](https://console.firebase.google.com/project/mealapp-70aae/settings/serviceaccounts/adminsdk)
2. Klik op "Generate new private key"
3. Download het JSON bestand (dit is je service account key)

## Stap 3: GitHub Secrets toevoegen

1. Ga naar je GitHub repository
2. Klik op **Settings** → **Secrets and variables** → **Actions**
3. Klik op **New repository secret**
4. Voeg deze secret toe:
   - **Name:** `FIREBASE_SERVICE_ACCOUNT`
   - **Value:** Plak de volledige inhoud van het gedownloade JSON bestand

## Stap 4: Code committen en pushen

```bash
git add .
git commit -m "Add GitHub Actions for Firebase deployment"
git push origin master
```

## Hoe het werkt:

- Bij elke push naar de `master` branch wordt automatisch:
  1. De code gebouwd (`npm run build`)
  2. Gedeployed naar Firebase Hosting
  3. Je app is live op `https://mealapp-70aae.web.app`

## Alternatief: Firebase GitHub App (Eenvoudiger)

Als je liever de Firebase GitHub App gebruikt (aanbevolen):
1. Ga naar [Firebase Console](https://console.firebase.google.com/project/mealapp-70aae/hosting)
2. Klik op "Get started" bij "GitHub" in de sidebar
3. Volg de instructies om je GitHub repository te koppelen
4. Firebase maakt automatisch de workflow aan

