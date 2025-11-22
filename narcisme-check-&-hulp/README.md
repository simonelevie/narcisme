# Narcisme Check App 🌸

Een interactieve quiz-applicatie met AI-chat functionaliteit om gebruikers te helpen signalen van narcisme te herkennen.

## 🚀 Hoe zet ik dit online? (De eerste keer)

### Stap 1: Bestanden
Zorg dat alle bestanden uit de chat in één map op je computer staan.

### Stap 2: GitHub
1. Maak een nieuwe repository aan op [GitHub.com](https://github.com).
2. Upload alle bestanden uit je map naar GitHub.

### Stap 3: Vercel
1. Ga naar [Vercel.com](https://vercel.com) en maak een nieuw project.
2. Importeer je GitHub repository.
3. **Belangrijk:** Voeg bij 'Environment Variables' de volgende sleutels toe:

| Key | Waarde |
| --- | --- |
| `API_KEY` | Je Google Gemini API Key |
| `ACTIVECAMPAIGN_URL` | Je ActiveCampaign URL (bijv. https://account.api-us1.com) |
| `ACTIVECAMPAIGN_KEY` | Je ActiveCampaign API Key |

4. Klik op **Deploy**.

---

## 🔄 Hoe doe ik een update?

Wil je iets aanpassen aan de app?

1. **Vraag de AI** om de wijziging.
2. **Pas het bestand aan** op je eigen computer.
3. Ga naar je repository op **GitHub**.
4. Klik op **Add file** -> **Upload files**.
5. Sleep de aangepaste bestanden erheen en klik op **Commit changes**.
6. **Klaar!** Vercel ziet de wijziging en updatet de website automatisch binnen 1 minuut.

## 🛠 Lokaal testen (Voor gevorderden)

Als je Node.js op je computer hebt, kun je ook lokaal testen:

1. Open de terminal in deze map.
2. Typ `npm install` (om alles te installeren).
3. Maak een bestand `.env` en zet daar je sleutels in (zie stap 3 hierboven).
4. Typ `npm run dev` om de app te starten.
