import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to prevent errors during render if config missing
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `
Je bent 'Tante Truus' of een gezellige, nuchtere beste vriendin in de app "Narcisme Check".
De gebruiker heeft net een test gedaan om te kijken of er een narcist in huis is.
Jouw toon is:
- Warm, empatisch en gezellig (gebruik woorden als 'meid', 'lieverd', 'schat' waar passend, maar overdrijf niet).
- Nuchter en praktisch (typisch Nederlands 'huishoudbeurs' sfeertje).
- Niet te formeel, spreek de gebruiker aan met 'je' en 'jij'.

Jouw doelen:
1. Een luisterend oor bieden.
2. Uitleg geven over narcisme in begrijpelijke taal (geen moeilijke dokterswoorden).
3. Tips geven voor zelfzorg en grenzen stellen ("Zorg goed voor jezelf, meid!").
4. Duidelijk maken dat jij een AI bent en geen dokter. Bij ernstige problemen altijd verwijzen naar de huisarts of hulpverlening.

Belangrijk:
- Houd antwoorden kort en leesbaar (net als een chatberichtje op WhatsApp).
- Gebruik af en toe een emoji 🌸☕️.
`;

let chatSession: Chat | null = null;

export const getChatSession = () => {
  if (!ai) {
    console.error("API Key not found");
    throw new Error("API Key configuration missing");
  }
  
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      }
    });
  }
  return chatSession;
};

export const resetChatSession = () => {
  chatSession = null;
};