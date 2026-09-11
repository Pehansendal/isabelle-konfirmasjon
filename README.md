# Isabelle sin konfirmasjon – Presentasjon ✨

En elegant, selvkjørende bilde- og videopresentasjon bygget for storskjerm, TV og prosjektor.

---

## 🚀 Innstillinger for Cloudflare Pages

Når du kobler GitHub-repoet `https://github.com/Pehansendal/isabelle-konfirmasjon` til [Cloudflare Pages](https://dash.cloudflare.com/):

| Innstilling | Verdi du setter inn |
| :--- | :--- |
| **Project name** | `isabelle-konfirmasjon` (eller valgfritt) |
| **Production branch** | `main` |
| **Framework preset** | `None` |
| **Build command** | *(La stå helt tomt)* |
| **Build output directory** | `/` (eller la stå tomt/standard) |
| **Root directory** | `/` (eller la stå tomt/standard) |

> ℹ️ **Merk:** Siden presentasjonen er bygget i ren HTML, CSS og JavaScript, trengs det ingen bygging eller kompilering. Nettsiden distribueres lynraskt via Cloudflares globale nettverk.

---

## 📁 Mappestruktur

```
isabelle-konfirmasjon/
│
├── index.html              # Hovedfil for presentasjonen
├── css/
│   └── style.css           # Styling, mørk kino-modus og effekter
├── js/
│   ├── slides.js           # Her lister du opp bilder og videoer
│   └── app.js              # Presentasjonsmotor (timer, spoling, video)
├── media/
│   ├── bilder/             # Mappe for konfirmasjonsbildene dine
│   └── videoer/            # Mappe for videoene dine
├── .gitignore
└── README.md
```

---

## 📸 Hvordan legge inn egne bilder og videoer

### 1. Legg filene i mappene
- Kopier bildene dine inn i `media/bilder/` (f.eks. `bilde1.jpg`, `skolestart.jpg`, osv.).
- Kopier videofilene inn i `media/videoer/` (f.eks. `tale.mp4`, `sykkeltur.mp4`).

### 2. Oppdater listen i `js/slides.js`
Åpne `js/slides.js` i en teksteditor og skriv inn filene dine i ønsket rekkefølge:

```javascript
const slides = [
  // Intro-slide
  {
    type: 'intro',
    title: 'Isabelle',
    subtitle: 'En reise gjennom barndom og oppvekst',
    tag: 'Konfirmasjon 2026'
  },

  // Bilder (4 sekunder per bilde er standard)
  {
    type: 'image',
    src: 'media/bilder/baby.jpg',
    caption: 'De aller første månedene'
  },
  {
    type: 'image',
    src: 'media/bilder/sykkel.jpg',
    caption: 'Første sykkeltur uten støttehjul!',
    duration: 6000 // Valgfritt: vis dette bildet i 6 sekunder
  },

  // Videoer til slutt
  {
    type: 'video',
    src: 'media/videoer/hilsen.mp4',
    caption: 'En liten videohilsen'
  },

  // Avslutning
  {
    type: 'outro',
    title: 'Gratulerer med konfirmasjonen!',
    subtitle: 'Vi er så uendelig stolte av deg, Isabelle ❤️'
  }
];
```

---

## 🔄 Hvordan oppdatere GitHub og nettsiden

Hver gang du legger til nye bilder eller endrer `slides.js`, kjører du disse tre kommandoene i terminalen:

```bash
git add .
git commit -m "Lagt til nye bilder"
git push origin main
```

Cloudflare Pages vil da automatisk hente endringene og oppdatere nettsiden i løpet av sekunder!

---

## 🎮 Kontroller og hurtigtaster under festen

| Tast / Knapp | Funksjon |
| :--- | :--- |
| **Mellomrom** (eller klikk på ▶/⏸) | **Pause** eller **Start** avspillingen |
| **Høyre piltast `→`** | **Neste bilde/video** (spol fremover) |
| **Venstre piltast `←`** | **Forrige bilde/video** (spol bakover) |
| **F** | **Fullskjerm** av/på (perfekt for TV / projektor) |
| **M** | **Lyd av/på** (mute/unmute) |
| **Tidslinje / Galleri** | Klikk på prikkene eller galleri-ikonet for å hoppe rett til et bilde |

God konfirmasjonsfeiring! 🎉
