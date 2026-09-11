/**
 * ============================================================================
 * ISABELLE SIN KONFIRMASJON - PRESENTASJONSMOTOR (APP.JS)
 * ============================================================================
 * 
 * Håndterer:
 * - 4 sekunder per bilde med myk fremdriftslinje
 * - Videoavspilling med automatisk overgang ved videoens slutt
 * - Pause, start og spoling (forover/bakover)
 * - Fullskjerm, tastatursnarveier og auto-skjul av kontrollpanelet
 */

(function () {
  'use strict';

  // --- STATE ---
  let currentIndex = 0;
  let isPlaying = false;
  let isMuted = false;
  let hasStarted = false;
  
  // Timer og fremdrift
  let slideStartTime = 0;
  let slidePausedAt = 0;
  let currentSlideDuration = DEFAULT_IMAGE_DURATION || 4000;
  let animationFrameId = null;

  // Auto-skjul av kontroller
  let hideControlsTimeout = null;
  const CONTROLS_HIDE_DELAY = 3200;

  // DOM-elementer
  const stageContent = document.getElementById('stage-content');
  const stageBackdrop = document.getElementById('stage-backdrop');
  const progressBar = document.getElementById('progress-bar');
  const pauseIndicator = document.getElementById('pause-indicator');
  const captionBar = document.getElementById('caption-bar');
  const controlPanel = document.getElementById('control-panel');
  const slideCounter = document.getElementById('slide-counter');
  const timelineScrubber = document.getElementById('timeline-scrubber');

  // Knapper og ikoner
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const btnAudio = document.getElementById('btn-audio');
  const iconVolumeOn = document.getElementById('icon-volume-on');
  const iconVolumeOff = document.getElementById('icon-volume-off');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const iconFsEnter = document.getElementById('icon-fs-enter');
  const iconFsExit = document.getElementById('icon-fs-exit');

  // Modaler
  const welcomeModal = document.getElementById('welcome-modal');
  const btnStart = document.getElementById('btn-start');
  const galleryDrawer = document.getElementById('gallery-drawer');
  const galleryGrid = document.getElementById('gallery-grid');
  const btnGallery = document.getElementById('btn-gallery');
  const btnGalleryClose = document.getElementById('btn-gallery-close');

  // ==========================================================================
  // INITIALISERING
  // ==========================================================================
  function init() {
    if (!slides || slides.length === 0) {
      console.error('Ingen slides funnet i slides.js!');
      return;
    }

    // Sett opp velkomsttekster fra konfigurasjon
    if (typeof PRESENTATION_CONFIG !== 'undefined') {
      const titleEl = document.getElementById('welcome-title');
      const subEl = document.getElementById('welcome-subtitle');
      if (titleEl && PRESENTATION_CONFIG.title) titleEl.textContent = PRESENTATION_CONFIG.title;
      if (subEl && PRESENTATION_CONFIG.subtitle) subEl.textContent = PRESENTATION_CONFIG.subtitle;
    }

    buildTimelineScrubber();
    buildGalleryGrid();
    setupEventListeners();
    renderSlide(currentIndex);
  }

  // ==========================================================================
  // TIMELINE SCRUBBER & GALLERI
  // ==========================================================================
  function buildTimelineScrubber() {
    timelineScrubber.innerHTML = '';
    slides.forEach((slide, index) => {
      const dot = document.createElement('div');
      dot.className = 'timeline-dot' + (slide.type === 'video' ? ' video-dot' : '');
      dot.title = `Slide ${index + 1}: ${slide.caption || slide.title || (slide.type === 'video' ? 'Video' : 'Bilde')}`;
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(index);
      });
      timelineScrubber.appendChild(dot);
    });
  }

  function updateTimelineScrubber(index) {
    const dots = timelineScrubber.querySelectorAll('.timeline-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    // Rull scrubber så aktiv prikk er synlig
    const activeDot = dots[index];
    if (activeDot) {
      activeDot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  function buildGalleryGrid() {
    galleryGrid.innerHTML = '';
    slides.forEach((slide, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('data-index', index);

      let previewImg = '';
      if (slide.type === 'image') {
        previewImg = `<img src="${slide.src}" alt="Slide ${index + 1}" onerror="this.src='media/bilder/eksempel1.svg'">`;
      } else if (slide.type === 'video') {
        previewImg = `<div style="height:100%; display:flex; align-items:center; justify-content:center; background:#1e2433; color:#fdf3cd; font-size:1.8rem;">🎬</div>`;
      } else {
        previewImg = `<div style="height:100%; display:flex; align-items:center; justify-content:center; background:#1b1e2a; color:#e6ca65; font-size:1.2rem; font-weight:700;">✨</div>`;
      }

      const badgeText = slide.type === 'video' ? 'Video' : `#${index + 1}`;
      const titleText = slide.caption || slide.title || `Slide ${index + 1}`;

      item.innerHTML = `
        ${previewImg}
        <span class="gallery-item-badge">${badgeText}</span>
        <span class="gallery-item-title">${titleText}</span>
      `;

      item.addEventListener('click', () => {
        goToSlide(index);
        closeGallery();
      });

      galleryGrid.appendChild(item);
    });
  }

  function updateGalleryActive(index) {
    const items = galleryGrid.querySelectorAll('.gallery-item');
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  // ==========================================================================
  // RENDER SLIDE
  // ==========================================================================
  function renderSlide(index) {
    cancelAnimationFrame(animationFrameId);
    resetProgressBar();

    const slide = slides[index];
    if (!slide) return;

    // Oppdater teller og kontroller
    slideCounter.textContent = `${index + 1} / ${slides.length}`;
    updateTimelineScrubber(index);
    updateGalleryActive(index);

    // Tøm scenen mykt eller bytt innhold
    stageContent.innerHTML = '';

    const slideLayer = document.createElement('div');
    slideLayer.className = 'slide-layer active';

    // Sett varighet for bildeslides
    currentSlideDuration = slide.duration || DEFAULT_IMAGE_DURATION || 4000;

    // Bygg innhold basert på type
    if (slide.type === 'image') {
      renderImageSlide(slide, slideLayer);
    } else if (slide.type === 'video') {
      renderVideoSlide(slide, slideLayer);
    } else if (slide.type === 'intro' || slide.type === 'outro') {
      renderCardSlide(slide, slideLayer);
    }

    stageContent.appendChild(slideLayer);

    // Bildetekst
    if (slide.caption) {
      captionBar.textContent = slide.caption;
      captionBar.classList.remove('hidden');
    } else {
      captionBar.classList.add('hidden');
    }

    // Start timer dersom presentasjonen er i gang og ikke er en aktiv video
    if (isPlaying && slide.type !== 'video') {
      startSlideTimer();
    }
  }

  // --- RENDERE BILDE ---
  function renderImageSlide(slide, container) {
    const img = document.createElement('img');
    img.className = 'slide-image ken-burns';
    img.src = slide.src;
    img.alt = slide.caption || 'Konfirmasjonsbilde';

    img.onerror = function () {
      console.warn('Kunne ikke laste bilde:', slide.src, 'Viser eksempel.');
      img.src = 'media/bilder/eksempel1.svg';
    };

    container.appendChild(img);
    stageBackdrop.style.backgroundImage = `url('${slide.src}')`;
  }

  // --- RENDERE VIDEO ---
  function renderVideoSlide(slide, container) {
    const videoContainer = document.createElement('div');
    videoContainer.className = 'slide-video-container';

    const video = document.createElement('video');
    video.className = 'slide-video';
    video.src = slide.src;
    video.playsInline = true;
    video.muted = isMuted;
    video.autoplay = isPlaying;
    video.controls = false; // Vi bruker våre egne lekre kontroller

    // Følg videoens fremdrift på topplinjen
    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percent}%`;
      }
    });

    // Når videoen er ferdig -> automatisk videre til neste slide!
    video.addEventListener('ended', () => {
      console.log('Video ferdig, går videre...');
      nextSlide();
    });

    // Håndter feil hvis brukeren ikke har lagt inn videofilen ennå
    video.addEventListener('error', () => {
      console.warn('Videofil ikke funnet ennå:', slide.src);
      videoContainer.innerHTML = `
        <div class="special-card">
          <div class="special-badge">Videoplassholder</div>
          <h2 class="special-title">Her kommer video</h2>
          <p class="special-subtitle" style="margin-bottom: 1.5rem;">
            Legg videofilen <strong>${slide.src.split('/').pop()}</strong> inn i mappen <code>media/videoer/</code>.
          </p>
          <div style="font-size: 0.95rem; color: #fdf3cd; background: rgba(212,175,55,0.15); border: 1px solid var(--border-gold); padding: 10px 20px; border-radius: 30px; display: inline-block;">
            Går automatisk videre om 5 sekunder...
          </div>
        </div>
      `;
      // Gi 5 sekunder før vi går videre automatisk
      currentSlideDuration = 5000;
      if (isPlaying) startSlideTimer();
    });

    videoContainer.appendChild(video);
    container.appendChild(videoContainer);

    // Prøv å starte avspilling hvis aktiv
    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Nettleser blokkerte lyd; forsøk muted
          video.muted = true;
          isMuted = true;
          updateAudioIcon();
          video.play().catch(e => console.log('Autoplay feilet:', e));
        });
      }
    }
  }

  // --- RENDERE SPESIALKORT (INTRO/OUTRO) ---
  function renderCardSlide(slide, container) {
    const card = document.createElement('div');
    card.className = 'special-card';

    const isOutro = slide.type === 'outro';

    card.innerHTML = `
      <div class="special-badge">${slide.tag || 'Isabelle'}</div>
      <h1 class="special-title">${slide.title}</h1>
      <p class="special-subtitle">${slide.subtitle}</p>
      ${isOutro ? `
        <div style="margin-top: 2.5rem; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <button class="btn-start-presentation" id="btn-restart" style="padding: 14px 34px; font-size: 1rem;">
            <span>Spill på nytt ↺</span>
          </button>
        </div>
      ` : ''}
    `;

    container.appendChild(card);

    if (isOutro) {
      // På siste slide pauser vi automatisk slik at bildet blir stående for applaus!
      pausePresentation();
      const btnRestart = card.querySelector('#btn-restart');
      if (btnRestart) {
        btnRestart.addEventListener('click', () => {
          goToSlide(0);
          playPresentation();
        });
      }
    }
  }

  // ==========================================================================
  // FREMDRIFT OG TIMER (4 SEKUNDER PER BILDE)
  // ==========================================================================
  function startSlideTimer() {
    cancelAnimationFrame(animationFrameId);
    slideStartTime = performance.now() - slidePausedAt;
    slidePausedAt = 0;

    function step(timestamp) {
      if (!isPlaying) return;

      const elapsed = timestamp - slideStartTime;
      const progress = Math.min(elapsed / currentSlideDuration, 1);
      progressBar.style.width = `${progress * 100}%`;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Tiden er ute -> Gå til neste slide!
        progressBar.style.width = '100%';
        nextSlide();
      }
    }

    animationFrameId = requestAnimationFrame(step);
  }

  function pauseSlideTimer() {
    cancelAnimationFrame(animationFrameId);
    slidePausedAt = performance.now() - slideStartTime;
  }

  function resetProgressBar() {
    progressBar.style.width = '0%';
    slidePausedAt = 0;
  }

  // ==========================================================================
  // NAVIGASJONSKONTROLLER ("SPOLE", NESTE, FORRIGE)
  // ==========================================================================
  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      // Vi har nådd slutten!
      goToSlide(0);
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(slides.length - 1);
    }
  }

  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    
    // Stopp eventuell pågående video
    stopCurrentVideo();

    currentIndex = index;
    renderSlide(currentIndex);
  }

  function stopCurrentVideo() {
    const activeVideo = stageContent.querySelector('video');
    if (activeVideo) {
      activeVideo.pause();
      activeVideo.currentTime = 0;
    }
  }

  // ==========================================================================
  // AVSPILLING (PLAY / PAUSE)
  // ==========================================================================
  function playPresentation() {
    isPlaying = true;
    updatePlayPauseUI();
    pauseIndicator.classList.remove('visible');
    progressBar.classList.remove('paused');

    const activeVideo = stageContent.querySelector('video');
    if (activeVideo) {
      activeVideo.play().catch(e => console.log('Video play error:', e));
    } else {
      startSlideTimer();
    }
  }

  function pausePresentation() {
    isPlaying = false;
    updatePlayPauseUI();
    pauseIndicator.classList.add('visible');
    progressBar.classList.add('paused');

    const activeVideo = stageContent.querySelector('video');
    if (activeVideo) {
      activeVideo.pause();
    } else {
      pauseSlideTimer();
    }
  }

  function togglePlayPause() {
    if (isPlaying) {
      pausePresentation();
    } else {
      playPresentation();
    }
  }

  function updatePlayPauseUI() {
    if (isPlaying) {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      btnPlayPause.title = 'Pause (Mellomromstast)';
    } else {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
      btnPlayPause.title = 'Start (Mellomromstast)';
    }
  }

  // ==========================================================================
  // FULLSKJERM & LYD
  // ==========================================================================
  function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  }

  function enterFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(err => console.warn(err));
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
    iconFsEnter.style.display = 'none';
    iconFsExit.style.display = 'block';
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => console.warn(err));
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    iconFsEnter.style.display = 'block';
    iconFsExit.style.display = 'none';
  }

  function toggleMute() {
    isMuted = !isMuted;
    updateAudioIcon();
    const activeVideo = stageContent.querySelector('video');
    if (activeVideo) {
      activeVideo.muted = isMuted;
    }
  }

  function updateAudioIcon() {
    if (isMuted) {
      iconVolumeOn.style.display = 'none';
      iconVolumeOff.style.display = 'block';
      btnAudio.title = 'Skru på lyd (M)';
    } else {
      iconVolumeOn.style.display = 'block';
      iconVolumeOff.style.display = 'none';
      btnAudio.title = 'Skru av lyd (M)';
    }
  }

  // ==========================================================================
  // AUTO-SKJUL AV KONTROLLER VED INAKTIVITET
  // ==========================================================================
  function resetControlsTimeout() {
    controlPanel.classList.remove('auto-hide');
    captionBar.classList.remove('hidden-by-autohide');

    clearTimeout(hideControlsTimeout);

    // Skjul kun dersom presentasjonen spilles og musen er i ro
    if (isPlaying && !galleryDrawer.classList.contains('open')) {
      hideControlsTimeout = setTimeout(() => {
        controlPanel.classList.add('auto-hide');
      }, CONTROLS_HIDE_DELAY);
    }
  }

  // ==========================================================================
  // GALLERISKUFF
  // ==========================================================================
  function openGallery() {
    galleryDrawer.classList.add('open');
    controlPanel.classList.remove('auto-hide');
  }

  function closeGallery() {
    galleryDrawer.classList.remove('open');
  }

  function toggleGallery() {
    if (galleryDrawer.classList.contains('open')) {
      closeGallery();
    } else {
      openGallery();
    }
  }

  // ==========================================================================
  // EVENT LISTENERS
  // ==========================================================================
  function setupEventListeners() {
    // Start-knapp på velkomstskjerm
    btnStart.addEventListener('click', () => {
      welcomeModal.classList.add('hidden');
      hasStarted = true;
      enterFullscreen();
      playPresentation();
    });

    // Kontrollknapper
    btnPlayPause.addEventListener('click', togglePlayPause);
    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);
    btnFullscreen.addEventListener('click', toggleFullscreen);
    btnAudio.addEventListener('click', toggleMute);
    btnGallery.addEventListener('click', toggleGallery);
    btnGalleryClose.addEventListener('click', closeGallery);

    // Auto-hide ved musbevegelse og berøring
    window.addEventListener('mousemove', resetControlsTimeout);
    window.addEventListener('touchstart', resetControlsTimeout);

    // Tastatursnarveier
    window.addEventListener('keydown', (e) => {
      // Ignorer tastatur hvis man skriver i et input-felt
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch (e.code) {
        case 'Space':
        case 'KeyK':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowRight':
        case 'KeyL':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'KeyJ':
          e.preventDefault();
          prevSlide();
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'Escape':
          if (galleryDrawer.classList.contains('open')) {
            closeGallery();
          }
          break;
      }
      resetControlsTimeout();
    });

    // Fullskjermstatus lytter
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        iconFsEnter.style.display = 'block';
        iconFsExit.style.display = 'none';
      } else {
        iconFsEnter.style.display = 'none';
        iconFsExit.style.display = 'block';
      }
    });
  }

  // Start applikasjonen når DOM er klar
  document.addEventListener('DOMContentLoaded', init);
})();
