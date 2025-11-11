# Lighthouse Analyse en Screenshots Instructies

## Lighthouse Analyse Uitvoeren

### Stap 1: Start de Development Server

```bash
npm start
```

Wacht tot de app geladen is op `http://localhost:3000`

### Stap 2: Open Chrome DevTools

1. Open Chrome browser
2. Ga naar `http://localhost:3000`
3. Druk op `F12` of `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
4. Klik op het tabblad **"Lighthouse"**

### Stap 3: Run Lighthouse Analyse

1. Selecteer de categorieën die je wilt testen:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
   - ✅ Progressive Web App

2. Selecteer **"Desktop"** of **"Mobile"** (of beide)

3. Klik op **"Analyze page load"**

4. Wacht tot de analyse klaar is (ongeveer 30-60 seconden)

### Stap 4: Screenshot Maken

1. Na de analyse, klik op de **download knop** (rechtsboven) om het rapport te downloaden
2. Of maak een screenshot van het volledige Lighthouse rapport:
   - Druk op `F12` om DevTools te openen
   - Scroll door het rapport
   - Gebruik `Windows + Shift + S` (Windows) of `Cmd + Shift + 4` (Mac) voor screenshot

### Stap 5: Noteer de Scores

Noteer de volgende scores in `PWA_DOCUMENTATIE.md`:

- Performance: [score]
- Accessibility: [score]
- Best Practices: [score]
- SEO: [score]
- PWA: [score]

En de metrics:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)
- Speed Index

---

## Screenshots Maken voor Documentatie

### 1. Browser Caches Screenshot

1. Open Chrome DevTools (`F12`)
2. Ga naar **Application** tab
3. Klik op **Cache Storage** in de linker sidebar
4. Maak een screenshot van alle cache names en hun sizes
5. Klik op een cache name om de inhoud te zien
6. Maak ook een screenshot van **Service Workers** sectie

### 2. Network Tab Screenshot

1. Open Chrome DevTools (`F12`)
2. Ga naar **Network** tab
3. Herlaad de pagina (`Ctrl+R` of `F5`)
4. Filter op "JS" en "CSS" om cached resources te zien
5. Maak een screenshot die toont welke bestanden "from cache" zijn

### 3. Responsive Design Screenshots

#### Desktop View:
1. Open de app in Chrome
2. Zet browser op volledig scherm
3. Maak screenshot van Dashboard
4. Maak screenshot van Map view
5. Maak screenshot van Location Details modal

#### Mobile View:
1. Open Chrome DevTools (`F12`)
2. Klik op **Toggle device toolbar** (`Ctrl+Shift+M`)
3. Selecteer een mobile device (bijv. iPhone 12 Pro)
4. Herlaad de pagina
5. Maak screenshots van:
   - Dashboard
   - Map view
   - Location Details
   - Occupancy Tracking

#### Tablet View:
1. In DevTools, selecteer iPad of tablet device
2. Herlaad de pagina
3. Maak screenshots van verschillende views

### 4. PWA Installatie Screenshots

#### Desktop:
1. Open de app in Chrome
2. Kijk naar de installatie icon in de adresbalk
3. Klik op het installatie icon
4. Maak screenshot van de installatie prompt
5. Installeer de app
6. Open de geïnstalleerde PWA
7. Maak screenshot van standalone mode (geen browser chrome)

#### Mobile (Android):
1. Open de app in Chrome Mobile
2. Wacht op "Add to Home Screen" prompt
3. Maak screenshot van de prompt
4. Voeg toe aan home screen
5. Open de app vanaf home screen
6. Maak screenshot van standalone mode

### 5. Manifest Effecten Screenshots

1. **Theme Color:**
   - Maak screenshot van browser adresbalk met theme color
   - Op mobile: screenshot van status bar met theme color

2. **App Shortcuts:**
   - Long-press op app icon (mobile)
   - Maak screenshot van shortcuts menu

3. **Splash Screen:**
   - Open de geïnstalleerde PWA
   - Maak screenshot van splash screen (als zichtbaar)

---

## Automatische Lighthouse Analyse (Optioneel)

Je kunt ook Lighthouse via command line gebruiken:

```bash
# Installeer Lighthouse CLI
npm install -g lighthouse

# Run analyse
lighthouse http://localhost:3000 --view --output html --output-path ./lighthouse-report.html
```

Dit genereert een HTML rapport dat je kunt openen in je browser.

---

## Tips voor Goede Screenshots

1. **Gebruik hoge resolutie:** Zorg dat screenshots scherp zijn
2. **Volledig scherm:** Maak screenshots van volledige views, niet alleen delen
3. **Annotaties:** Voeg eventueel tekst toe om belangrijke delen te markeren
4. **Consistentie:** Gebruik dezelfde device sizes voor vergelijkingen
5. **Organisatie:** Sla screenshots op met duidelijke namen:
   - `dashboard-desktop.png`
   - `dashboard-mobile.png`
   - `lighthouse-report.png`
   - `cache-storage.png`
   - etc.

---

## Waar Screenshots Toevoegen in Documentatie

Voeg de screenshots toe op de volgende plaatsen in `PWA_DOCUMENTATIE.md`:

1. **Responsive Design sectie:** Screenshots van verschillende devices
2. **Caching Strategie sectie:** Screenshots van Cache Storage en Network tab
3. **Web Manifest sectie:** Screenshots van installatie, standalone mode, shortcuts
4. **Lighthouse Analyse sectie:** Screenshot van volledig Lighthouse rapport


