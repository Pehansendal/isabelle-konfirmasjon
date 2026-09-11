/**
 * ============================================================================
 * ISABELLE SIN KONFIRMASJON - BILDE- OG VIDEOLISTE
 * ============================================================================
 * 
 * Her legger du inn bildene og videoene du ønsker i presentasjonen.
 * Bildene legges i mappen: media/bilder/
 * Videoene legges i mappen: media/videoer/
 * 
 * Standard visningstid er 4 sekunder per bilde. 
 * Videoer spilles helt ferdig før neste bilde/video starter automatisk.
 * 
 * EKSEMPEL PÅ BILDE:
 *   { type: 'image', src: 'media/bilder/bilde1.jpg', caption: 'Liten jente på ferie, 2012' },
 * 
 * EKSEMPEL PÅ BILDE MED EGEN VISNINGSTID (f.eks. 6 sekunder):
 *   { type: 'image', src: 'media/bilder/bilde2.jpg', caption: 'Første skoledag', duration: 6000 },
 * 
 * EKSEMPEL PÅ VIDEO:
 *   { type: 'video', src: 'media/videoer/video1.mp4', caption: 'Klassetur i 8. klasse' },
 */

// Standard visningstid i millisekunder (4000 ms = 4 sekunder)
const DEFAULT_IMAGE_DURATION = 4000;

// Presentasjonens tittel og undertekst
const PRESENTATION_CONFIG = {
  title: "Isabelle sin konfirmasjon",
  subtitle: "Minner, oppvekst og store øyeblikk",
  date: "2026",
  autoStartOnWelcomeClick: true, // Starter automatisk i fullskjerm når man trykker Start
  endTitle: "Gratulerer med dagen, Isabelle! ❤️",
  endSubtitle: "Takk for alle gode minner – og mange flere i vente!",
};

// Liste over slides i rekkefølge
// Du kan fritt legge til, fjerne eller endre rekkefølgen her:
const slides = [
  // --- START / INTRO ---
  {
    type: 'intro',
    title: 'Isabelle',
    subtitle: 'En reise gjennom barndom og oppvekst',
    tag: 'Konfirmasjon 2026',
    duration: 5000
  },

  // --- BILDE-EKSEMPLER (Bytt ut med dine egne bilder i media/bilder/) ---
  {
    type: 'image',
    src: 'media/bilder/eksempel1.svg',
    caption: 'De første årene – nysgjerrig og full av smil',
    duration: DEFAULT_IMAGE_DURATION
  },
  {
    type: 'image',
    src: 'media/bilder/eksempel2.svg',
    caption: 'Barnehagetid og gode venner',
    duration: DEFAULT_IMAGE_DURATION
  },
  {
    type: 'image',
    src: 'media/bilder/eksempel3.svg',
    caption: 'Første skoledag – stolt og klar med skolesekken',
    duration: DEFAULT_IMAGE_DURATION
  },
  {
    type: 'image',
    src: 'media/bilder/eksempel4.svg',
    caption: 'Sommerferier, lek og latter med familien',
    duration: DEFAULT_IMAGE_DURATION
  },
  {
    type: 'image',
    src: 'media/bilder/eksempel5.svg',
    caption: 'Fritidsaktiviteter, idrett og gode stunder',
    duration: DEFAULT_IMAGE_DURATION
  },

  // --- VIDEOER TIL SLUTT (Bytt ut med dine egne videoer i media/videoer/) ---
  {
    type: 'video',
    src: 'media/videoer/eksempel-video.mp4',
    caption: 'Glimt fra årene som har gått (Video)',
    // Videoer spilles automatisk til slutten før neste slide vises!
  },

  // --- AVSLUTNING / OUTRO ---
  {
    type: 'outro',
    title: 'Gratulerer med konfirmasjonen!',
    subtitle: 'Vi er så uendelig stolte av deg, Isabelle ❤️',
    tag: 'Hilsen familie og venner'
  }
];
