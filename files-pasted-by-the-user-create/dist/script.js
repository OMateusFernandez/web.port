const navigationEntry = performance.getEntriesByType("navigation")[0];
const isPageReload = navigationEntry?.type === "reload";

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (isPageReload) {
  history.replaceState(null, "", `${location.pathname}${location.search}`);
  window.scrollTo(0, 0);
  window.addEventListener("load", () => requestAnimationFrame(() => window.scrollTo(0, 0)), { once: true });
}

const translations = {
  en: {
    siteTitle: "MF — Vlog, IRL & Talking Head Editor", siteDescription: "Mateus Fernandez — video editor for Vlogs, IRL and Talking Head content.",
    skip: "Skip to selected work", navLabel: "Primary navigation", languageLabel: "Language",
    navWork: "Work", navAbout: "About", navContact: "Contact", navCta: "Let's Work", musicMute: "Mute background music", musicUnmute: "Unmute background music", musicHint: "Is the sound getting in the way of your experience? You can turn it off whenever you want!", volumeLabel: "Volume", soundEntry: "Enter with sound", soundEntryHint: "Click anywhere to begin",
    heroEyebrow: "Vlog, IRL & Talking Head editor", heroTitle1: "VIDEO EDITOR", heroTitle2: "FOR CREATORS.",
    typingPrefix: "I edit for", typingLabel: "Storytelling, retention, pacing, sound design and motion graphics",
    heroLede: "I shape Vlogs, IRL footage and Talking Head videos into polished creator content.", heroMeta1: "Vlogs",
    heroMeta2: "IRL", heroMeta3: "Talking Head", heroWork: "View My Work ↓",
    workTogether: "Let's Work Together ↗", scroll: "SCROLL", workEyebrow: "01 / Portfolio",
    workTitle: "SELECTED WORK", longFormHeading: "Long-Form", workIntro: "Selected Vlog, IRL and Talking Head edits built around natural rhythm, clarity and personality.",
    filterLabel: "Filter projects", filterAll: "All", contentLabel: "Content type",
    vlogIrl: "VLOG / IRL", talkingHead: "Talking Head", previousProject: "Previous project", nextProject: "Next project",
    playSample: "WATCH EDITS", sampleLabel: "Play editing sample",
    aboutEyebrow: "02 / Profile", aboutTitle: "ABOUT ME",
    aboutLead: "I'm Mateus Fernandez, a video editor focused on Vlogs, IRL and Talking Head content.",
    aboutCopy: "I turn creator footage into polished videos with natural pacing, clean dialogue and the creator's personality at the center.",
    contactEyebrow: "03 / Start a project", contactTitle1: "HAVE A PROJECT?", contactTitle2: "LET'S MAKE IT GREAT.",
    backTop: "Back to top ↑", closeVideo: "Close video", videoPlaceholder: "VIDEO PLACEHOLDER",
    videoHelp: "Add a local video file or a YouTube link in the project array.", watch: "Watch Project ↗", watchLabel: "Watch",
    thumb: "Thumbnail for", selectedWork: "Selected work", openYoutube: "Watch on YouTube ↗", openVideo: "Open video ↗",
    skills: ["Premiere", "After Effects", "Media Encoder"],
    typingWords: ["Storytelling", "Retention", "Pacing", "Sound Design", "Motion Graphics"],
    categories: { "Long-form": "Long-form", "Vlog / IRL": "VLOG / IRL", "Talking Head": "Talking Head", Sample: "Editing Sample" }
  },
  pt: {
    siteTitle: "MF — Editor de Vlog, IRL & Talking Head", siteDescription: "Mateus Fernandez — editor de vídeo para Vlogs, IRL e conteúdo Talking Head.",
    skip: "Ir para trabalhos selecionados", navLabel: "Navegação principal", languageLabel: "Idioma",
    navWork: "Trabalhos", navAbout: "Sobre", navContact: "Contato", navCta: "Vamos criar", musicMute: "Silenciar música de fundo", musicUnmute: "Ativar som da música de fundo", musicHint: "O som está atrapalhando sua experiência? Você pode desligá-lo quando quiser!", volumeLabel: "Volume", soundEntry: "Entrar com som", soundEntryHint: "Clique em qualquer lugar para começar",
    heroEyebrow: "Editor de Vlog, IRL & Talking Head", heroTitle1: "EDITOR DE VÍDEO", heroTitle2: "PARA CREATORS.",
    typingPrefix: "Eu edito para", typingLabel: "Storytelling, retenção, ritmo, design de som e motion graphics",
    heroLede: "Transformo Vlogs, gravações IRL e vídeos Talking Head em conteúdo profissional para creators.", heroMeta1: "Vlogs",
    heroMeta2: "IRL", heroMeta3: "Talking Head", heroWork: "Ver meus trabalhos ↓",
    workTogether: "Vamos trabalhar juntos ↗", scroll: "ROLE", workEyebrow: "01 / Portfólio",
    workTitle: "TRABALHOS SELECIONADOS", longFormHeading: "Long-Form", workIntro: "Edições selecionadas de Vlog, IRL e Talking Head construídas em torno de ritmo natural, clareza e personalidade.",
    filterLabel: "Filtrar projetos", filterAll: "Todos", contentLabel: "Tipo de conteúdo",
    vlogIrl: "VLOG / IRL", talkingHead: "Talking Head", previousProject: "Projeto anterior", nextProject: "Próximo projeto",
    playSample: "VER EDIÇÕES", sampleLabel: "Reproduzir amostra de edição",
    aboutEyebrow: "02 / Perfil", aboutTitle: "SOBRE MIM",
    aboutLead: "Sou Mateus Fernandez, editor de vídeo especializado em Vlogs, IRL e conteúdo Talking Head.",
    aboutCopy: "Transformo gravações de creators em vídeos profissionais, com ritmo natural, diálogos limpos e a personalidade do criador no centro.",
    contactEyebrow: "03 / Inicie um projeto", contactTitle1: "TEM UM PROJETO?", contactTitle2: "VAMOS TORNÁ-LO INCRÍVEL.",
    backTop: "Voltar ao topo ↑", closeVideo: "Fechar vídeo", videoPlaceholder: "VÍDEO EM BREVE",
    videoHelp: "Adicione um vídeo local ou um link do YouTube no array de projetos.", watch: "Assistir projeto ↗", watchLabel: "Assistir",
    thumb: "Miniatura de", selectedWork: "Trabalhos selecionados", openYoutube: "Assistir no YouTube ↗", openVideo: "Abrir vídeo ↗",
    skills: ["Premiere", "After Effects", "Media Encoder"],
    typingWords: ["Storytelling", "Retenção", "Ritmo", "Design de Som", "Motion Graphics"],
    categories: { "Long-form": "Long-form", "Vlog / IRL": "VLOG / IRL", "Talking Head": "Talking Head", Sample: "Amostra de Edição" }
  }
};

// Add a YouTube URL to `youtube` (watch and youtu.be links are supported)
// or add a local MP4 path to `video`. Leave one of them empty.
const projects = [
  { format: "Long-form", content: "Vlog / IRL", year: "2026", thumbnail: "https://img.youtube.com/vi/4mp_tx_H7bU/maxresdefault.jpg", video: "", youtube: "https://youtu.be/4mp_tx_H7bU?si=kNkT6TPMpcoZxE6z" },
  { format: "Long-form", content: "Vlog / IRL", year: "2026", thumbnail: "https://img.youtube.com/vi/oeFsCztt5k8/maxresdefault.jpg", video: "", youtube: "https://youtu.be/oeFsCztt5k8?si=x-XUT1lSCpsJYMG5" },
  { format: "Long-form", content: "Talking Head", year: "2026", thumbnail: "https://img.youtube.com/vi/zgKbV7-WrIY/maxresdefault.jpg", video: "", youtube: "https://youtu.be/zgKbV7-WrIY?si=zkXFzBM_nxSA4bFA" },
  { format: "Long-form", content: "Talking Head", year: "2026", thumbnail: "https://img.youtube.com/vi/PmhANTwOZv4/maxresdefault.jpg", video: "", youtube: "https://youtu.be/PmhANTwOZv4?si=87rSnSvdze9XRRFx" },
  { format: "Long-form", content: "Talking Head", year: "2026", thumbnail: "assets/images/project-placeholder.svg", video: "assets/videos/talking-head-01.mp4", youtube: "" }
];

const grid = document.querySelector("#projectGrid");
const carousel = document.querySelector("#projectCarousel");
const carouselViewport = carousel.querySelector(".carousel-viewport");
const carouselStatus = document.querySelector("#carouselStatus");
const carouselPrev = document.querySelector("#carouselPrev");
const carouselNext = document.querySelector("#carouselNext");
const modal = document.querySelector("#videoModal");
const modalVideo = document.querySelector("#modalVideo");
const modalYoutube = document.querySelector("#modalYoutube");
const videoPlaceholder = document.querySelector("#videoPlaceholder");
const modalCategory = document.querySelector("#modalCategory");
const modalExternal = document.querySelector("#modalExternal");
const closeButton = document.querySelector("#modalClose");
const backgroundMusic = document.querySelector("#backgroundMusic");
const switchSound = document.querySelector("#switchSound");
const musicToggle = document.querySelector("#musicToggle");
const musicVolume = document.querySelector("#musicVolume");
const soundEntry = document.querySelector("#soundEntry");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let previousFocus = null;
let currentLanguage = "en";
let activeContent = "Vlog / IRL";
let activeProjects = [];
let currentSlide = 0;
let carouselTimer;
let changeTimer;
let typingTimer;
let scrollTypingObserver;
let lastAudibleVolume = 0.4;
let awaitingSoundActivation = false;
let resumeMusicAfterVideo = false;

backgroundMusic.volume = 0.4;
switchSound.volume = 0.45;
musicVolume.value = String(Math.round(backgroundMusic.volume * 100));

function playSwitchSound() {
  switchSound.pause();
  switchSound.currentTime = 0;
  void switchSound.play().catch(() => { /* A following interaction can retry the effect. */ });
}

function updateMusicControl() {
  const playing = !backgroundMusic.paused;
  const muted = backgroundMusic.muted || backgroundMusic.volume === 0;
  const label = translations[currentLanguage][muted ? "musicUnmute" : "musicMute"];
  musicToggle.classList.toggle("is-playing", playing);
  musicToggle.classList.toggle("is-muted", muted);
  musicToggle.setAttribute("aria-pressed", String(muted));
  musicToggle.setAttribute("aria-label", label);
  musicToggle.title = label;
}

const musicUnlockEvents = ["pointerdown", "touchstart", "keydown"];
function removeMusicUnlockListeners() {
  musicUnlockEvents.forEach(eventName => document.removeEventListener(eventName, unlockBackgroundMusic, true));
}
function showSoundEntry() {
  if (!modal.hidden) return;
  if (!soundEntry.hidden) return;
  soundEntry.hidden = false;
  requestAnimationFrame(() => soundEntry.classList.add("is-visible"));
}
function hideSoundEntry() {
  soundEntry.classList.remove("is-visible");
  window.setTimeout(() => { soundEntry.hidden = true; }, 360);
}
async function activateBackgroundSound() {
  if (!modal.hidden) return;
  awaitingSoundActivation = false;
  backgroundMusic.muted = false;
  try {
    await backgroundMusic.play();
    removeMusicUnlockListeners();
    hideSoundEntry();
  } catch {
    if (!modal.hidden) return;
    awaitingSoundActivation = true;
    backgroundMusic.muted = true;
    showSoundEntry();
  }
  updateMusicControl();
}
async function playBackgroundMusic() {
  if (!modal.hidden) return;
  if (awaitingSoundActivation && backgroundMusic.muted) {
    try { await backgroundMusic.play(); } catch { /* Keep the activation screen available. */ }
    showSoundEntry();
    updateMusicControl();
    return;
  }
  try {
    await backgroundMusic.play();
    if (!backgroundMusic.muted) removeMusicUnlockListeners();
  } catch {
    if (!modal.hidden) return;
    awaitingSoundActivation = true;
    backgroundMusic.muted = true;
    try { await backgroundMusic.play(); } catch { /* The entry interaction will retry playback. */ }
    showSoundEntry();
  }
  updateMusicControl();
}
function unlockBackgroundMusic(event) {
  if (event.target instanceof Element && event.target.closest("#musicToggle")) return;
  if (awaitingSoundActivation) void activateBackgroundSound();
  else void playBackgroundMusic();
}

function categoryLabel(value) { return translations[currentLanguage].categories[value] || value; }
function projectAccessibleName(project, index) {
  return `${categoryLabel(project.content)} ${String(index + 1).padStart(2, "0")}`;
}

function setTypeAwareText(element, text) {
  if (element.classList.contains("type-on-scroll")) {
    element.dataset.typeText = text;
    element.setAttribute("aria-label", text);
    element.textContent = element.dataset.typed === "true" ? text : "";
  } else {
    element.textContent = text;
  }
}

function renderProjects() {
  const copy = translations[currentLanguage];
  activeProjects = projects.filter(project => project.content === activeContent);
  currentSlide = 0;
  setTypeAwareText(document.querySelector("#work-title"), copy.longFormHeading);
  grid.innerHTML = "";
  activeProjects.forEach((project, index) => {
    const projectIndex = projects.indexOf(project);
    const accessibleName = projectAccessibleName(project, index);
    const placeholderStyle = project.thumbnail.includes("project-placeholder")
      ? `style="filter:hue-rotate(${projectIndex * 18}deg) brightness(${0.75 + (index % 3) * 0.08})"`
      : "";
    const mediaPreview = project.video
      ? `<video src="${project.video}#t=0.1" muted playsinline preload="metadata" aria-hidden="true"></video>`
      : `<img src="${project.thumbnail}" alt="${copy.thumb} ${accessibleName}" loading="lazy" width="1600" height="900" ${placeholderStyle}>`;
    const article = document.createElement("article");
    article.className = "project-card";
    article.innerHTML = `
      <button class="project-button" type="button" data-project-index="${projectIndex}" aria-label="${copy.watchLabel} ${accessibleName}" aria-haspopup="dialog" aria-controls="videoModal">
        <span class="project-media">
          ${mediaPreview}
          <span class="project-badge">${categoryLabel(project.format)}</span>
          <span class="project-overlay"><span>${copy.watch}</span></span>
        </span>
      </button>`;
    grid.appendChild(article);
  });
  prepareScrollTyping(grid);
  requestAnimationFrame(() => { updateCarousel(); startCarousel(); });
}

function visibleCardCount() {
  const card = grid.querySelector(".project-card");
  if (!card) return 1;
  const gap = parseFloat(getComputedStyle(grid).gap) || 0;
  return Math.max(1, Math.floor((carouselViewport.clientWidth + gap) / (card.offsetWidth + gap)));
}

function maximumSlide() { return Math.max(0, activeProjects.length - visibleCardCount()); }

function updateCarousel() {
  const card = grid.querySelector(".project-card");
  if (!card) return;
  currentSlide = Math.min(currentSlide, maximumSlide());
  const gap = parseFloat(getComputedStyle(grid).gap) || 0;
  grid.style.transform = `translate3d(-${currentSlide * (card.offsetWidth + gap)}px, 0, 0)`;
  carouselStatus.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(activeProjects.length).padStart(2, "0")}`;
  const movable = maximumSlide() > 0;
  carouselPrev.disabled = !movable;
  carouselNext.disabled = !movable;
}

function moveCarousel(direction) {
  const max = maximumSlide();
  if (!max) return;
  currentSlide = direction > 0 ? (currentSlide >= max ? 0 : currentSlide + 1) : (currentSlide <= 0 ? max : currentSlide - 1);
  updateCarousel();
}

function stopCarousel() { window.clearInterval(carouselTimer); }
function startCarousel() {
  stopCarousel();
  if (!modal.hidden || carousel.matches(":hover, :focus-within")) return;
  if (!reduceMotion && activeProjects.length >= 3 && maximumSlide() > 0) {
    carouselTimer = window.setInterval(() => moveCarousel(1), 5000);
  }
}

function updateSwitch(group, secondActive) {
  group.classList.toggle("is-second", secondActive);
  group.querySelectorAll(".switch-option").forEach((button, index) => {
    const active = index === (secondActive ? 1 : 0);
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function changePortfolio(value, secondActive) {
  const oldSecond = activeContent === "Talking Head";
  if (value === activeContent) return;
  playSwitchSound();
  activeContent = value;
  const group = document.querySelector("[data-content]").closest(".switch-group");
  updateSwitch(group, secondActive);
  stopCarousel();
  window.clearTimeout(changeTimer);
  carousel.classList.remove("forward", "backward");
  carousel.classList.add("is-changing", secondActive && !oldSecond ? "forward" : "backward");
  changeTimer = window.setTimeout(() => {
    renderProjects();
    requestAnimationFrame(() => carousel.classList.remove("is-changing", "forward", "backward"));
  }, 220);
}

function applyLanguage(language) {
  if (language !== currentLanguage) playSwitchSound();
  currentLanguage = language;
  const copy = translations[language];
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  document.title = copy.siteTitle;
  document.querySelector('meta[name="description"]').setAttribute("content", copy.siteDescription);
  document.querySelectorAll("[data-i18n]").forEach(element => { setTypeAwareText(element, copy[element.dataset.i18n]); });
  document.querySelectorAll("[data-i18n-aria]").forEach(element => { element.setAttribute("aria-label", copy[element.dataset.i18nAria]); });
  document.querySelectorAll(".language-option").forEach(button => {
    const active = button.dataset.lang === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderProjects();
  startTyping();
  updateMusicControl();
}

function startTyping() {
  window.clearTimeout(typingTimer);
  const target = document.querySelector("#typingText");
  const words = translations[currentLanguage].typingWords;
  if (reduceMotion) { target.textContent = words[0]; return; }
  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  const type = () => {
    const word = words[wordIndex];
    target.textContent = word.slice(0, characterIndex);
    if (!deleting && characterIndex < word.length) {
      characterIndex += 1; typingTimer = window.setTimeout(type, 72);
    } else if (!deleting) {
      deleting = true; typingTimer = window.setTimeout(type, 1250);
    } else if (characterIndex > 0) {
      characterIndex -= 1; typingTimer = window.setTimeout(type, 38);
    } else {
      deleting = false; wordIndex = (wordIndex + 1) % words.length; typingTimer = window.setTimeout(type, 260);
    }
  };
  type();
}

function youtubeId(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.split("/").filter(Boolean)[0] || "";
    if (parsed.pathname.startsWith("/embed/")) return parsed.pathname.split("/")[2] || "";
    return parsed.searchParams.get("v") || "";
  } catch { return ""; }
}

function openModal(item) {
  previousFocus = document.activeElement;
  resumeMusicAfterVideo = !backgroundMusic.paused;
  modal.hidden = false;
  hideSoundEntry();
  backgroundMusic.pause();
  document.body.classList.add("modal-open");
  stopCarousel();
  modalCategory.textContent = `${categoryLabel(item.format || item.category)} / ${categoryLabel(item.content || item.niche || "Sample")} / ${item.year}`;
  const embedId = youtubeId(item.youtube);
  modalVideo.hidden = true;
  modalYoutube.hidden = true;
  videoPlaceholder.hidden = true;
  modalExternal.hidden = true;
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalYoutube.removeAttribute("src");
  if (embedId) {
    modalYoutube.hidden = false;
    const params = new URLSearchParams({ autoplay: "1", playsinline: "1", rel: "0", origin: location.origin });
    modalYoutube.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(embedId)}?${params}`;
    modalExternal.href = `https://www.youtube.com/watch?v=${encodeURIComponent(embedId)}`;
    modalExternal.textContent = translations[currentLanguage].openYoutube;
    modalExternal.hidden = false;
  } else if (item.video) {
    modalVideo.src = item.video;
    modalVideo.poster = item.thumbnail || "";
    modalVideo.hidden = false;
    modalExternal.href = item.video;
    modalExternal.textContent = translations[currentLanguage].openVideo;
    modalExternal.hidden = false;
    modalVideo.load();
    void modalVideo.play().catch(() => { /* Controls remain available if autoplay is restricted. */ });
  } else {
    videoPlaceholder.hidden = false;
  }
  closeButton.focus({ preventScroll: true });
}

function closeModal() {
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  modalYoutube.removeAttribute("src");
  modal.hidden = true;
  modalExternal.removeAttribute("href");
  document.body.classList.remove("modal-open");
  previousFocus?.focus({ preventScroll: true });
  startCarousel();
  if (resumeMusicAfterVideo) void playBackgroundMusic();
  resumeMusicAfterVideo = false;
}

document.querySelectorAll("[data-content]").forEach(button => button.addEventListener("click", () => changePortfolio(button.dataset.content, button.dataset.content === "Talking Head")));
document.querySelectorAll(".language-option").forEach(button => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));
grid.addEventListener("click", event => {
  const button = event.target.closest("button[data-project-index]");
  if (!button || !grid.contains(button)) return;
  const project = projects[Number(button.dataset.projectIndex)];
  if (project) openModal(project);
});
carouselPrev.addEventListener("click", () => { moveCarousel(-1); startCarousel(); });
carouselNext.addEventListener("click", () => { moveCarousel(1); startCarousel(); });
carousel.addEventListener("mouseenter", stopCarousel);
carousel.addEventListener("mouseleave", startCarousel);
carousel.addEventListener("focusin", stopCarousel);
carousel.addEventListener("focusout", startCarousel);
window.addEventListener("resize", updateCarousel);
closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => {
  if (modal.hidden) return;
  if (event.key === "Escape") closeModal();
  if (event.key === "Tab") {
    const focusable = [...modal.querySelectorAll('button, a[href], video[controls], iframe')].filter(element => !element.hidden && element.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
musicToggle.addEventListener("click", () => {
  playSwitchSound();
  const shouldUnmute = backgroundMusic.muted || backgroundMusic.volume === 0;
  if (shouldUnmute) {
    if (backgroundMusic.volume === 0) {
      backgroundMusic.volume = lastAudibleVolume;
      musicVolume.value = String(Math.round(lastAudibleVolume * 100));
    }
    backgroundMusic.muted = false;
    awaitingSoundActivation = false;
    hideSoundEntry();
  } else {
    backgroundMusic.muted = true;
  }
  if (backgroundMusic.paused) void playBackgroundMusic();
  updateMusicControl();
});
soundEntry.addEventListener("click", () => void activateBackgroundSound());
musicVolume.addEventListener("input", () => {
  const value = Number(musicVolume.value);
  backgroundMusic.volume = value / 100;
  if (value > 0) {
    lastAudibleVolume = value / 100;
    backgroundMusic.muted = false;
  }
  if (backgroundMusic.paused) void playBackgroundMusic();
  updateMusicControl();
});
backgroundMusic.addEventListener("play", updateMusicControl);
backgroundMusic.addEventListener("pause", updateMusicControl);
backgroundMusic.addEventListener("canplay", () => {
  if (backgroundMusic.paused) void playBackgroundMusic();
}, { once: true });
backgroundMusic.addEventListener("ended", () => {
  backgroundMusic.currentTime = 0;
  void playBackgroundMusic();
});
musicUnlockEvents.forEach(eventName => document.addEventListener(eventName, unlockBackgroundMusic, { capture: true }));
void playBackgroundMusic();
document.addEventListener("DOMContentLoaded", () => void playBackgroundMusic(), { once: true });
window.addEventListener("load", () => void playBackgroundMusic(), { once: true });
window.addEventListener("pageshow", () => void playBackgroundMusic());
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && backgroundMusic.paused) void playBackgroundMusic();
});
window.addEventListener("scroll", () => document.querySelector("#siteHeader").classList.toggle("scrolled", window.scrollY > 24), { passive: true });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
function observeReveals(scope = document) { scope.querySelectorAll(".reveal:not(.in-view)").forEach(item => observer.observe(item)); }

function typeElement(element) {
  if (element.dataset.typed === "true") return;
  const text = element.dataset.typeText || "";
  const characters = Array.from(text);
  const tokens = text.match(/\S+|\s+/g) || [];
  element.dataset.typed = "true";
  element.classList.add("is-typing");
  const delay = characters.length > 70 ? 6 : characters.length > 30 ? 9 : 14;
  const duration = 320;
  const fragment = document.createDocumentFragment();

  let characterIndex = 0;
  tokens.forEach(token => {
    if (/^\s+$/.test(token)) {
      fragment.appendChild(document.createTextNode(token));
      characterIndex += token.length;
      return;
    }

    const word = document.createElement("span");
    word.className = "type-word";
    word.setAttribute("aria-hidden", "true");
    Array.from(token).forEach(character => {
      const letter = document.createElement("span");
      letter.className = "type-letter";
      letter.style.setProperty("--letter-delay", `${characterIndex * delay}ms`);
      letter.textContent = character;
      word.appendChild(letter);
      characterIndex += 1;
    });
    fragment.appendChild(word);
  });

  element.replaceChildren(fragment);
  window.setTimeout(() => {
    element.classList.remove("is-typing");
    element.style.removeProperty("min-height");
    element.style.removeProperty("min-width");
  }, duration + characters.length * delay + 40);
}

function prepareScrollTyping(scope = document) {
  if (!scrollTypingObserver) return;
  const selector = ".section-heading h2, .eyebrow, .about-lead, .about-copy > p, .reel-play b, #contact-title span, .contact-link, .email, .project-card h3, .project-badge";
  scope.querySelectorAll(selector).forEach(element => {
    if (element.classList.contains("type-on-scroll")) return;
    const section = element.closest(".section");
    if (!section || section.dataset.typingRevealed === "true") return;
    const text = element.textContent.trim();
    if (!text) return;
    const bounds = element.getBoundingClientRect();
    element.style.minHeight = `${bounds.height}px`;
    if (element.classList.contains("project-badge")) element.style.minWidth = `${bounds.width}px`;
    element.dataset.typeText = text;
    element.setAttribute("aria-label", text);
    element.classList.add("type-on-scroll");
    element.textContent = "";
  });
}

function initScrollTyping() {
  if (reduceMotion) return;
  scrollTypingObserver = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
      const section = entry.target;
      scrollTypingObserver.unobserve(section);
      section.dataset.typingRevealed = "true";
      section.querySelectorAll(".type-on-scroll:not([data-typed='true'])").forEach((element, index) => {
        window.setTimeout(() => typeElement(element), 180 + index * 90);
      });
    });
  }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
  prepareScrollTyping(document);
  document.querySelectorAll(".section").forEach(section => scrollTypingObserver.observe(section));
}

if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const hero = document.querySelector(".hero");
  const heroCopy = document.querySelector("#heroCopy");
  hero.addEventListener("pointermove", event => {
    const x = (event.clientX / window.innerWidth - 0.5) * 9;
    const y = (event.clientY / window.innerHeight - 0.5) * 6;
    heroCopy.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
  hero.addEventListener("pointerleave", () => { heroCopy.style.transform = "translate3d(0,0,0)"; });
}

applyLanguage("en");
observeReveals();
initScrollTyping();
document.querySelector("#year").textContent = new Date().getFullYear();
