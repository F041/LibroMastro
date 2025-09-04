// script.js — versione "mappa di integrazioni" con tubi arrotondati e particelle lungo i path
document.addEventListener('DOMContentLoaded', () => {
  // Inizializza AOS se presente
  if (window.AOS) AOS.init({ duration: 800, once: true, offset: 100 });

  // --- LOGICA PER HEADER DINAMICO IN SCROLL ---
  const header = document.getElementById('main-header');
  if (header) {
      const scrollThreshold = 50;

      const handleScroll = () => {
          if (window.scrollY > scrollThreshold) {
              header.classList.add('header-scrolled');
          } else {
              header.classList.remove('header-scrolled');
          }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); 
  }
  
  // --- LOGICA ANIMAZIONE CANVAS ---

  // Rispetto per utenti con prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.info('prefers-reduced-motion: reduce -> animazione disabilitata');
    return;
  }

  const canvas = document.getElementById('flow-canvas');
  
  if (!canvas) {
    console.warn('flow-canvas non trovato.');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('2D context non disponibile.');
    return;
  }

  // z-index (assicurati che il contenuto abbia z-index > 0)
  canvas.style.zIndex = 0;

  // configurazione
  const CONFIG = {
    connectorsPerSide: 4,
    leftXRatio: 0.12,
    rightXRatio: 0.88,
    verticalTopRatio: 0.28,
    verticalBottomRatio: 0.72,
    tubeWidth: 14,
    tubeInnerHighlight: 3,
    tubeGradientStops_light: [
        { t: 0,   color: 'rgba(107,70,255,0.18)' },
        { t: 0.6, color: 'rgba(125,211,252,0.15)' },
        { t: 1,   color: 'rgba(14,165,233,0.15)' }
    ],
    tubeGradientStops_dark: [
        { t: 0,   color: 'rgba(107,70,255,0.45)' },
        { t: 0.6, color: 'rgba(125,211,252,0.35)' },
        { t: 1,   color: 'rgba(14,165,233,0.35)' }
    ],
    particleCount: 100,
    particleSizeMin: 1.2,
    particleSizeMax: 3,
    particleDurationMin: 4.5,
    particleDurationMax: 9,
    trailFade_light: 0.05,
    trailFade_dark: 0.1,
    tailLen: 0.045,
    hubRadius: 22
  };

  let DPR = Math.max(1, window.devicePixelRatio || 1);
  let width = 0, height = 0;
  let connectors = [];
  let particles = [];
  let animationId = null;
  let lastTime = 0;

  // utilità
  const rand = (a, b) => Math.random() * (b - a) + a;
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function cubicBezier(p0, p1, p2, p3, t) {
    const u = 1 - t, tt = t * t, uu = u * u, uuu = uu * u, ttt = tt * t;
    return {
      x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
      y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y
    };
  }

  function makeControlPoints(sx, sy, ex, ey, curvature = 0.14) {
    const dx = ex - sx, dy = ey - sy;
    const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    const nx = -dy / dist, ny = dx / dist;
    const base = dist * curvature * (0.7 + Math.random() * 0.6);
    const sign = Math.random() < 0.5 ? -1 : 1;
    const offset = base * sign;
    const c1 = { x: lerp(sx, ex, 0.25) + nx * offset * 1.0, y: lerp(sy, ey, 0.25) + ny * offset * 1.0 };
    const c2 = { x: lerp(sx, ex, 0.66) + nx * offset * 0.45, y: lerp(sy, ey, 0.66) + ny * offset * 0.45 };
    return [c1, c2];
  }

  function getHub() {
    return { x: width * 0.5, y: height * 0.5 };
  }

  function initConnectors() {
    connectors = [];
    const leftX = width * CONFIG.leftXRatio;
    const rightX = width * CONFIG.rightXRatio;
    const topY = height * CONFIG.verticalTopRatio;
    const bottomY = height * CONFIG.verticalBottomRatio;
    const stepY = (bottomY - topY) / (CONFIG.connectorsPerSide - 1);

    for (let i = 0; i < CONFIG.connectorsPerSide; i++) {
      const y = topY + stepY * i;
      const startLeft = { x: leftX, y: y };
      const startRight = { x: rightX, y: y };
      const hub = getHub();
      const [c1L, c2L] = makeControlPoints(startLeft.x, startLeft.y, hub.x, hub.y);
      const [c1R, c2R] = makeControlPoints(startRight.x, startRight.y, hub.x, hub.y);
      connectors.push({ start: startLeft, c1: c1L, c2: c2L, end: hub });
      connectors.push({ start: startRight, c1: c1R, c2: c2R, end: hub });
    }
  }

  function drawConnector(conn) {
    const p0 = conn.start, p1 = conn.c1, p2 = conn.c2, p3 = conn.end;
    const path = new Path2D();
    path.moveTo(p0.x, p0.y);
    path.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

    const isDarkMode = document.documentElement.classList.contains('dark');
    const currentGradientStops = isDarkMode ? CONFIG.tubeGradientStops_dark : CONFIG.tubeGradientStops_light;
    const grad = ctx.createLinearGradient(p0.x, p0.y, p3.x, p3.y);
    currentGradientStops.forEach(stop => grad.addColorStop(stop.t, stop.color));

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(15,23,42,0.06)';
    ctx.lineWidth = CONFIG.tubeWidth + 6;
    ctx.stroke(path);
    ctx.strokeStyle = grad;
    ctx.lineWidth = CONFIG.tubeWidth;
    ctx.stroke(path);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = CONFIG.tubeInnerHighlight;
    ctx.globalCompositeOperation = 'overlay';
    ctx.stroke(path);
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';
  }

  function spawnParticleOn(connIndex, isInitial = false) {
    const conn = connectors[connIndex];
    const dur = rand(CONFIG.particleDurationMin, CONFIG.particleDurationMax);
    const size = rand(CONFIG.particleSizeMin, CONFIG.particleSizeMax);
    const tStart = isInitial ? Math.random() : 0;
    
    const isDarkMode = document.documentElement.classList.contains('dark');
    const currentGradientStops = isDarkMode ? CONFIG.tubeGradientStops_dark : CONFIG.tubeGradientStops_light;
    const colorIndex = Math.floor(Math.random() * currentGradientStops.length);
    const color = currentGradientStops[colorIndex].color.replace(/,0\.?\d*\)$/, ',0.95)');
    
    return { connIndex, t: tStart, duration: dur, size, color };
  }

  function initParticles() {
    particles = [];
    const total = CONFIG.particleCount;
    const connCount = connectors.length;
    for (let i = 0; i < total; i++) {
      const connIndex = i % connCount;
      particles.push(spawnParticleOn(connIndex, true));
    }
  }

  function drawHub(tSec) {
    const hub = getHub();
    ctx.save();
    const base = CONFIG.hubRadius;
    const pulse = 1 + Math.sin(tSec * 2.0) * 0.07;
    const glowR = base * 6 * pulse;

    const g = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, glowR);
    g.addColorStop(0, 'rgba(125,211,252,0.08)');
    g.addColorStop(0.4, 'rgba(107,70,255,0.05)');
    g.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(hub.x, hub.y, glowR, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = 'rgba(107,70,255,0.95)';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(14,165,233,0.22)';
    ctx.shadowBlur = 18;
    ctx.arc(hub.x, hub.y, base * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.shadowBlur = 0;
  }

  function animate(time) {
    if (!lastTime) lastTime = time;
    const dt = (time - lastTime) / 1000;
    lastTime = time;

// fade parziale per le scie (ora theme-aware)
const isDarkMode = document.documentElement.classList.contains('dark');
const trailFadeValue = isDarkMode ? CONFIG.trailFade_dark : CONFIG.trailFade_light;

// --- NUOVA LOGICA PER IL COLORE DI SFONDO ---
// In light mode, il canvas è su sfondo bianco, quindi il "fade" deve essere scuro per cancellare.
// In dark mode, il canvas è su sfondo scuro, quindi il "fade" deve essere chiaro per cancellare.
// Ma l'operazione 'destination-out' cancella indipendentemente dal colore,
// il problema è l'opacità residua. Per evitare l'alone, cancelliamo completamente e ridisegniamo.
// Soluzione più semplice: cambiamo lo sfondo del canvas stesso.
// Ma per mantenere le scie, dobbiamo cambiare il colore del "cancellino".
// La soluzione più robusta è pulire e basta, ma perdiamo le scie.
// Manteniamo la logica ma con un colore di sfondo esplicito.

// In realtà, il problema è più semplice: l'operazione 'destination-out' con `rgba(0,0,0,alpha)` 
// rimuove pixel. Il problema non è il colore ma il fatto che il body sottostante è bianco
// e l'opacità generale del canvas non è 1.

// La vera soluzione è cambiare lo sfondo del canvas stesso quando cambia il tema.
// E pulire lo sfondo ad ogni frame con un colore semi-trasparente.

if (isDarkMode) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.15)'; // Colore di sfondo scuro, semi-trasparente per le scie
} else {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)'; // Colore di sfondo chiaro, semi-trasparente
}
ctx.fillRect(0, 0, width, height);

    connectors.forEach(c => drawConnector(c));
    drawHub(time / 1000);

    // ctx.globalCompositeOperation = 'lighter';
    particles.forEach((p, idx) => {
      p.t += dt / p.duration;
      if (p.t >= 1) {
        particles[idx] = spawnParticleOn(p.connIndex, false);
        return;
      }

      const e = ease(p.t);
      const conn = connectors[p.connIndex];
      const pos = cubicBezier(conn.start, conn.c1, conn.c2, conn.end, e);

      const tailT = Math.max(0, p.t - CONFIG.tailLen);
      const eTail = ease(tailT);
      const tailPos = cubicBezier(conn.start, conn.c1, conn.c2, conn.end, eTail);

      ctx.beginPath();
      ctx.lineWidth = Math.max(1, p.size * 1.0);
      const g = ctx.createLinearGradient(tailPos.x, tailPos.y, pos.x, pos.y);
      const alpha = (0.6 * Math.sin(e * Math.PI)).toFixed(2);
      const baseColor = p.color.replace(/,([01]?\.?\d+)\)$/, `,${alpha})`);
      g.addColorStop(0, baseColor.replace(/,([01]?\.?\d+)\)$/, ',0.0)'));
      g.addColorStop(1, baseColor);
      ctx.strokeStyle = g;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = baseColor;
      ctx.shadowColor = baseColor;
      ctx.shadowBlur = 8 + 10 * Math.sin(e * Math.PI);
      ctx.arc(pos.x, pos.y, p.size * (0.9 + 0.8 * Math.sin(e * Math.PI)), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.globalCompositeOperation = 'source-over';
    animationId = requestAnimationFrame(animate);
  }

  function resize() {
    DPR = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.parentElement.getBoundingClientRect();
    width = Math.round(rect.width);
    height = Math.round(rect.height);
    if (height < 120) height = 520;
    canvas.width = Math.round(width * DPR);
    canvas.height = Math.round(height * DPR);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    initConnectors();
    initParticles();

    ctx.clearRect(0, 0, width, height);
  }

  const parent = canvas.parentElement;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationId) {
          lastTime = performance.now();
          animationId = requestAnimationFrame(animate);
        }
      } else {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }
    });
  }, { threshold: 0.04 });

  observer.observe(parent);

  const fallbackTimeout = setTimeout(() => {
    if (!animationId) {
      lastTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }
  }, 300);

  window.addEventListener('resize', () => {
    resize();
  }, { passive: true });

  // inizializza subito
  resize();

  // --- LOGICA PER DARK/LIGHT MODE TOGGLE (POSIZIONE CORRETTA) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  const applyTheme = () => {
      if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
          themeToggleLightIcon.classList.remove('hidden');
          themeToggleDarkIcon.classList.add('hidden');
      } else {
          document.documentElement.classList.remove('dark');
          themeToggleDarkIcon.classList.remove('hidden');
          themeToggleLightIcon.classList.add('hidden');
      }
  };

  applyTheme();

  if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function() {
          if (localStorage.getItem('theme') === 'dark') {
              localStorage.setItem('theme', 'light');
          } else {
              localStorage.setItem('theme', 'dark');
          }
          applyTheme();
          // Ora ctx, width e height esistono e questo comando funzionerà
          ctx.clearRect(0, 0, width, height); 
      });
  }

});