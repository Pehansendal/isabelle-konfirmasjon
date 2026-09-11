/**
 * ============================================================================
 * ISABELLE SIN KONFIRMASJON - BILDE- OG VIDEOLISTE
 * ============================================================================
 */

// Standard visningstid i millisekunder (4000 ms = 4 sekunder)
const DEFAULT_IMAGE_DURATION = 4000;

// Presentasjonens tittel og innstillinger
const PRESENTATION_CONFIG = {
  title: "Isabelle sin konfirmasjon",
  subtitle: "Minner, oppvekst og store øyeblikk",
  date: "2026",
  autoStartOnWelcomeClick: true,
  endTitle: "Gratulerer med dagen, Isabelle! ❤️",
  endSubtitle: "Takk for alle gode minner – og mange flere i vente!",
};

// Liste over bildene i presentasjonen
const slides = [
  // --- START / INTRO ---
  {
    type: 'intro',
    title: 'Isabelle',
    subtitle: 'En reise gjennom barndom og oppvekst',
    tag: 'Konfirmasjon 2026',
    duration: 4500
  },

  // --- DINE BILDER (22 bilder) ---
  { type: 'image', src: 'media/bilder/14k1EBJi.jpg', caption: 'Minner med Isabelle #1', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/6PCMbcK8.jpg', caption: 'Minner med Isabelle #2', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/6T7mmhNz.jpg', caption: 'Minner med Isabelle #3', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/8ceDHNr8.jpg', caption: 'Minner med Isabelle #4', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/AwSYnaK8.jpg', caption: 'Minner med Isabelle #5', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/FtUz2bhW.jpg', caption: 'Minner med Isabelle #6', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/GfjHCs2F.jpg', caption: 'Minner med Isabelle #7', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/INCqf45J.jpg', caption: 'Minner med Isabelle #8', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/PYDwvoRN.jpg', caption: 'Minner med Isabelle #9', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/ShwUhven.jpg', caption: 'Minner med Isabelle #10', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/WnHXk2H2.jpg', caption: 'Minner med Isabelle #11', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/_Z7bsB7y.jpg', caption: 'Minner med Isabelle #12', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/bZcIliDR.jpg', caption: 'Minner med Isabelle #13', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/j9CPKsc7.jpg', caption: 'Minner med Isabelle #14', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/jagXVn3F.jpg', caption: 'Minner med Isabelle #15', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/kphpfuyF.jpg', caption: 'Minner med Isabelle #16', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/m3qnzExX.jpg', caption: 'Minner med Isabelle #17', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/nSJywntQ.jpg', caption: 'Minner med Isabelle #18', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/oLLcUQhO.jpg', caption: 'Minner med Isabelle #19', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/podV-1AW.jpg', caption: 'Minner med Isabelle #20', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/uYjd7Gi1.jpg', caption: 'Minner med Isabelle #21', duration: DEFAULT_IMAGE_DURATION },
  { type: 'image', src: 'media/bilder/w0S2yJ0f.jpg', caption: 'Minner med Isabelle #22', duration: DEFAULT_IMAGE_DURATION },

  // --- NÅR DU LEGGGER INN VIDEOER: Fjern // foran linjene under ---
  // {
  //   type: 'video',
  //   src: 'media/videoer/min_video.mp4',
  //   caption: 'En koselig videohilsen'
  // },

  // --- AVSLUTNING / OUTRO ---
  {
    type: 'outro',
    title: 'Gratulerer med konfirmasjonen!',
    subtitle: 'Vi er så uendelig stolte av deg, Isabelle ❤️',
    tag: 'Hilsen familie og venner'
  }
];
