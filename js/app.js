/* ══════════════════════════════════════════════════════════════
   EFB Robinson R44 II — App Controller
   ══════════════════════════════════════════════════════════════ */

const App = {

  currentScreen: 'home',
  history: [],
  modules: {},

  /* ─── Inicialización ─── */
  init() {
    // Tema guardado
    this._loadTheme();

    // Inicializar módulos
    ChecklistModule.init();
    PerfModule.init();
    CourseModule.init();
    ManualModule.init();

    // Reloj UTC
    this._startClock();

    // Manejar orientación y resize
    window.addEventListener('resize', () => this._handleResize());

    console.log('EFB Robinson R44 II v2.1 — Iniciado correctamente');
  },

  /* ─── Toggle de tema oscuro/claro ─── */
  toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    const icon    = document.getElementById('theme-icon');
    if (icon) icon.textContent = isLight ? '🌙' : '☀️';
    try { localStorage.setItem('efb_r44_theme', isLight ? 'light' : 'dark'); } catch(e) {}

    // Re-dibujar canvas si están visibles
    setTimeout(() => this._handleResize(), 50);
  },

  _loadTheme() {
    try {
      const saved = localStorage.getItem('efb_r44_theme');
      if (saved === 'light') {
        document.body.classList.add('light-mode');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.textContent = '🌙';
      }
    } catch(e) {}
  },

  /* ─── Navegación ─── */
  navigate(screen, param) {
    const prevScreen = this.currentScreen;

    // Ocultar pantalla actual
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.remove('active');
      s.style.display = '';
    });

    // Mostrar nueva pantalla
    const targetEl = document.getElementById('screen-' + screen);
    if (!targetEl) return;
    targetEl.classList.add('active');

    // Actualizar nav buttons
    document.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.screen === screen);
    });

    // Historial
    if (prevScreen !== screen) {
      this.history.push(prevScreen);
    }
    this.currentScreen = screen;

    // Actualizar header
    this._updateHeader(screen);

    // Inicialización lazy según pantalla
    if (screen === 'wb') {
      setTimeout(() => WBModule.init(), 100);
    }

    // Acciones específicas por parámetro
    if (screen === 'checklists' && param === 'emergency') {
      // Abrir primera emergencia automáticamente
      setTimeout(() => {
        const firstEmerg = CHECKLISTS.emergency[0];
        if (firstEmerg) ChecklistModule.openList(firstEmerg.id);
      }, 100);
    }

    // Scroll to top
    targetEl.scrollTop = 0;
  },

  goBack() {
    if (this.history.length > 0) {
      const prev = this.history.pop();
      this.navigate(prev);
    } else {
      this.navigate('home');
    }
  },

  /* ─── Header dinámico ─── */
  _updateHeader(screen) {
    const titles = {
      home:         { title: 'Robinson R44 II',     subtitle: 'Electronic Flight Bag' },
      checklists:   { title: 'Checklists',           subtitle: 'Listas de Verificación' },
      performance:  { title: 'Performance',          subtitle: 'Tablas y Calculadoras' },
      wb:           { title: 'Peso y Balance',       subtitle: 'Calculadora y Diagrama CG' },
      course:       { title: 'Curso de Adaptación',  subtitle: 'Robinson R44 II — 18 Temas' },
      manual:       { title: 'Manual POH',           subtitle: 'R44 II Pilot\'s Operating Handbook' },
    };

    const info = titles[screen] || titles.home;
    const titleEl    = document.getElementById('header-title');
    const subtitleEl = document.getElementById('header-subtitle');
    const backBtn    = document.getElementById('btn-back');

    if (titleEl)    titleEl.textContent    = info.title;
    if (subtitleEl) subtitleEl.textContent = info.subtitle;
    if (backBtn)    backBtn.classList.toggle('hidden', screen === 'home');
  },

  /* ─── Reloj UTC ─── */
  _startClock() {
    const update = () => {
      const now = new Date();
      const hh  = String(now.getUTCHours()).padStart(2, '0');
      const mm  = String(now.getUTCMinutes()).padStart(2, '0');
      const ss  = String(now.getUTCSeconds()).padStart(2, '0');
      const el  = document.getElementById('utc-clock');
      if (el) el.textContent = `${hh}:${mm}:${ss} UTC`;
    };
    update();
    setInterval(update, 1000);
  },

  /* ─── Resize handler ─── */
  _handleResize() {
    if (this.currentScreen === 'wb') {
      WBModule._sizeCanvas();
      if (WBModule.lastResult) {
        WBModule._drawChart(WBModule.lastResult.arm, WBModule.lastResult.weight, WBModule.lastResult.ok);
      } else {
        WBModule._drawEnvelopeOnly();
      }
    }
    if (this.currentScreen === 'performance' && PerfModule.activeTab === 'hv') {
      PerfModule.drawHVCurve();
    }
  }
};

/* ─── Arrancar la app cuando el DOM esté listo ─── */
document.addEventListener('DOMContentLoaded', () => {
  App.init();

  // Prevenir zoom en doble-tap en tablet
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });

  // Soporte para teclado hardware (tablets con teclado)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') App.goBack();
    if (e.altKey && e.key === '1') App.navigate('home');
    if (e.altKey && e.key === '2') App.navigate('checklists');
    if (e.altKey && e.key === '3') App.navigate('performance');
    if (e.altKey && e.key === '4') App.navigate('wb');
    if (e.altKey && e.key === '5') App.navigate('course');
    if (e.altKey && e.key === '6') App.navigate('manual');
  });
});
