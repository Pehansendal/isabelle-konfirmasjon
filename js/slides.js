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
  subtitle: "Isabelle er virkelig spesiell",
  date: "2026",
  autoStartOnWelcomeClick: true,
  endTitle: "Gratulerer med dagen, Isabelle! ❤️",
  endSubtitle: "Takk for alle gode minner – og mange flere i vente!",
};

// Liste over bildene i presentasjonen
const slides = [
  // --- DINE BILDER (22 bilder) ---
  { type: 'image', src: 'media/bilder/14k1EBJi.jpg' },
  { type: 'image', src: 'media/bilder/6PCMbcK8.jpg' },
  { type: 'image', src: 'media/bilder/6T7mmhNz.jpg' },
  { type: 'image', src: 'media/bilder/8ceDHNr8.jpg' },
  { type: 'image', src: 'media/bilder/AwSYnaK8.jpg' },
  { type: 'image', src: 'media/bilder/FtUz2bhW.jpg' },
  { type: 'image', src: 'media/bilder/GfjHCs2F.jpg' },
  { type: 'image', src: 'media/bilder/INCqf45J.jpg' },
  { type: 'image', src: 'media/bilder/PYDwvoRN.jpg' },
  { type: 'image', src: 'media/bilder/ShwUhven.jpg' },
  { type: 'image', src: 'media/bilder/WnHXk2H2.jpg' },
  { type: 'image', src: 'media/bilder/_Z7bsB7y.jpg' },
  { type: 'image', src: 'media/bilder/bZcIliDR.jpg' },
  { type: 'image', src: 'media/bilder/j9CPKsc7.jpg' },
  { type: 'image', src: 'media/bilder/jagXVn3F.jpg' },
  { type: 'image', src: 'media/bilder/kphpfuyF.jpg' },
  { type: 'image', src: 'media/bilder/m3qnzExX.jpg' },
  { type: 'image', src: 'media/bilder/nSJywntQ.jpg' },
  { type: 'image', src: 'media/bilder/oLLcUQhO.jpg' },
  { type: 'image', src: 'media/bilder/podV-1AW.jpg' },
  { type: 'image', src: 'media/bilder/uYjd7Gi1.jpg' },
  { type: 'image', src: 'media/bilder/w0S2yJ0f.jpg' },

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
