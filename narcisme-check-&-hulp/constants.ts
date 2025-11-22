import { Question, QuizResult } from './types';

export const QUESTIONS: Question[] = [
  { id: 1, text: "Vindt hij/zij zichzelf écht geweldig en wordt er graag opgeschept over prestaties?" },
  { id: 2, text: "Droomt diegene vaak hardop over onbeperkt succes, macht, of de 'perfecte' film-liefde?" },
  { id: 3, text: "Vindt hij/zij zichzelf zo speciaal dat alleen andere 'topmensen' hem/haar begrijpen?" },
  { id: 4, text: "Heeft diegene constant complimentjes en bewondering nodig van jou en anderen?" },
  { id: 5, text: "Verwacht hij/zij altijd een voorkeursbehandeling (bijvoorbeeld in restaurants of winkels)?" },
  { id: 6, text: "Gebruikt hij/zij anderen (of jou!) wel eens als voetveeg om eigen doelen te bereiken?" },
  { id: 7, text: "Lijkt het alsof hij/zij zich totaal niet kan inleven in hoe jij je voelt?" },
  { id: 8, text: "Is hij/zij vaak jaloers op anderen, of denkt-ie dat iedereen jaloers op hem/haar is?" },
  { id: 9, text: "Doet diegene vaak uit de hoogte of arrogant tegen mensen?" },
  { id: 10, text: "Krijg jij vaak de schuld als er iets misgaat, zelfs als je er niets aan kon doen?" },
  { id: 11, text: "Worden jouw woorden vaak verdraaid waardoor je aan jezelf gaat twijfelen (gaslighting)?" },
  { id: 12, text: "Wordt hij/zij woest of krijg je de 'silent treatment' (negeren) als je kritiek hebt?" },
  { id: 13, text: "Gaat elk gesprek uiteindelijk toch weer over hem/haar?" },
  { id: 14, text: "Is diegene super charmant voor de buitenwereld, maar thuis een heel ander persoon?" },
  { id: 15, text: "Heb je het gevoel dat je constant 'op eieren loopt' thuis?" },
  { id: 16, text: "Probeert hij/zij je weg te houden bij je vriendinnen of familie?" },
  { id: 17, text: "Wordt er gewoon over je grenzen heen gewalst als je 'nee' zegt?" },
  { id: 18, text: "Beschuldigt hij/zij jou vaak van dingen die hij/zij eigenlijk zélf doet?" },
  { id: 19, text: "Is hij/zij stiekem heel snel beledigd, ondanks die grote mond?" },
  { id: 20, text: "Ben je na een dag samen vaak helemaal kapot en leeggezogen?" }
];

export const RESULTS: QuizResult[] = [
  {
    score: 0,
    maxScore: 5,
    level: 'low',
    title: "Lekker bezig, niks aan de hand!",
    description: "Nou meid, dat klinkt gelukkig heel normaal. Iedereen is wel eens een beetje egoïstisch of chagrijnig, maar hier lijkt geen sprake van een narcist in huis. Lekker genieten van elkaar!",
  },
  {
    score: 6,
    maxScore: 10,
    level: 'moderate',
    title: "Een beetje oppassen...",
    description: "Hmm, er zijn wel wat trekjes te zien. Dat kan best lastig zijn in huis! Het hoeft geen stoornis te zijn, maar het is wel belangrijk dat je goed je grenzen aangeeft. Laat je niet gek maken!",
  },
  {
    score: 11,
    maxScore: 15,
    level: 'high',
    title: "Oei, dit klinkt heftig!",
    description: "Poeh, dat zijn best veel signalen. Het klinkt alsof het er bij jou thuis niet altijd even gezellig aan toe gaat. Dit gedrag kost jou waarschijnlijk bakken met energie. Denk goed om jezelf, lieverd!",
  },
  {
    score: 16,
    maxScore: 20,
    level: 'severe',
    title: "Alarmfase Rood!",
    description: "Lieve schat, dit klinkt echt niet goed. Dit zijn hele sterke kenmerken van narcisme. Dit is niet gezond voor jou en kan je helemaal uitputten. Zoek steun bij vriendinnen of een prof, want jij verdient beter!",
  },
];