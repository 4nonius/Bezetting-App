# Security Cleanup - Verwijderen van gevoelige data uit Git History

## ✅ Wat is al gedaan:
- ✅ Hardcoded API keys verwijderd uit `src/firebase/config.js`
- ✅ Environment variables geïmplementeerd
- ✅ `.env.example` template toegevoegd
- ✅ Fix gepusht naar GitHub (nieuwe commits zijn veilig)

## ⚠️ Belangrijk om te weten:

**Firebase API keys zijn over het algemeen veilig om publiek te hebben:**
- Ze zijn bedoeld voor client-side apps
- Ze worden automatisch publiek in de gebouwde JavaScript
- **Echte beveiliging komt van Firestore Security Rules**, niet van het verbergen van de API key

**Maar:** Het is een best practice om ze niet in de code te committen.

## 🔒 Volledige verwijdering uit Git History (Optioneel)

De oude versie met hardcoded keys staat nog in de git history. Om deze volledig te verwijderen:

### Optie 1: BFG Repo-Cleaner (Aanbevolen)

1. Download BFG: https://rtyley.github.io/bfg-repo-cleaner/
2. Maak een backup van je repository
3. Voer uit:
```bash
# Clone een fresh copy
git clone --mirror https://github.com/4nonius/Bezetting-App.git

# Verwijder de gevoelige strings
java -jar bfg.jar --replace-text passwords.txt Bezetting-App.git

# Push de opgeschoonde history (LET OP: force push!)
cd Bezetting-App.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

Maak eerst een `passwords.txt` bestand met:
```
AIzaSyCDCUY6zk3DWA1vCkc71UwE2HXiJmh4a54==>REMOVED
1096256305429==>REMOVED
7633683d9f6a5a0c8c911c==>REMOVED
```

### Optie 2: Git Filter-Branch

```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch src/firebase/config.js" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

### ⚠️ Waarschuwingen:

1. **Force push is destructief** - zorg dat iedereen die de repo gebruikt op de hoogte is
2. **Backup eerst** - maak een volledige backup
3. **Coördineer met team** - anderen moeten hun lokale repos opnieuw clonen
4. **GitHub heeft nog steeds backups** - volledige verwijdering is niet gegarandeerd

## 🛡️ Aanbevolen acties:

1. **Firestore Security Rules controleren:**
   - Ga naar Firebase Console → Firestore Database → Rules
   - Zorg dat alleen geautoriseerde gebruikers kunnen lezen/schrijven

2. **API Key beperkingen instellen (optioneel):**
   - Firebase Console → Project Settings → General
   - Klik op je web app → "Restrict key"
   - Beperk tot je domein (bijv. `mealapp-70aae.web.app`)

3. **Monitoring instellen:**
   - Firebase Console → Monitoring
   - Stel alerts in voor ongebruikelijke activiteit

## 📝 Conclusie:

Voor de meeste gevallen is het **niet nodig** om de history te herschrijven:
- ✅ Nieuwe commits zijn veilig
- ✅ Firebase API keys zijn bedoeld om publiek te zijn
- ✅ Echte beveiliging komt van Security Rules
- ⚠️ History herschrijven is complex en kan problemen veroorzaken

**Aanbeveling:** Focus op goede Firestore Security Rules in plaats van het herschrijven van history.

