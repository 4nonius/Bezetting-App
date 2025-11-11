# GitHub Actions Setup - Stap voor Stap

## Stap 1: Firebase Service Account aanmaken

1. Ga naar: https://console.firebase.google.com/project/mealapp-70aae/settings/serviceaccounts/adminsdk
2. Klik op de tab **"Service accounts"**
3. Klik op **"Generate new private key"**
4. Klik op **"Generate key"** in de popup
5. Een JSON-bestand wordt gedownload - **bewaar dit veilig!**

## Stap 2: GitHub Secret toevoegen

1. Ga naar je GitHub repository op GitHub.com
2. Klik op **Settings** (bovenaan de repository pagina)
3. Klik op **Secrets and variables** → **Actions** (in de linker sidebar)
4. Klik op **"New repository secret"**
5. Vul in:
   - **Name:** `FIREBASE_SERVICE_ACCOUNT`
   - **Secret:** Open het gedownloade JSON-bestand en **kopieer de volledige inhoud** (alles tussen { en })
6. Klik op **"Add secret"**

## Stap 3: Code committen en pushen

Voer deze commando's uit in je terminal:

```bash
git add .
git commit -m "Add GitHub Actions for automatic Firebase deployment"
git push origin master
```

## Stap 4: Controleren

1. Ga naar je GitHub repository
2. Klik op de tab **"Actions"**
3. Je zou een workflow moeten zien draaien: **"Deploy to Firebase Hosting"**
4. Wacht tot deze klaar is (groen vinkje)
5. Je app is automatisch gedeployed!

## Hoe het werkt:

- **Bij elke push naar `master` branch:**
  - GitHub Actions bouwt automatisch je app (`npm run build`)
  - Deployt naar Firebase Hosting
  - Je app is live op `https://mealapp-70aae.web.app`

- **Geen handmatige deployment meer nodig!**

## Troubleshooting:

Als de workflow faalt:
1. Check de **Actions** tab in GitHub voor error details
2. Zorg dat de `FIREBASE_SERVICE_ACCOUNT` secret correct is (volledige JSON)
3. Zorg dat je project ID `mealapp-70aae` klopt

