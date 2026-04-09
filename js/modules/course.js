/* ══════════════════════════════════════════════════════════════
   EFB R44 II — Módulo del Curso de Adaptación
   ══════════════════════════════════════════════════════════════ */

const CourseModule = {

  activeTopic: null,

  init() {
    this._renderTopicList();
  },

  _renderTopicList() {
    const container = document.getElementById('course-topic-list');
    if (!container) return;
    container.innerHTML = COURSE_DATA.topics.map(t => `
      <button class="course-topic-btn" data-id="${t.id}" onclick="CourseModule.openTopic(${t.id})">
        <div class="topic-number">${t.id}</div>
        <div class="topic-text">
          <div class="topic-title">${t.title}</div>
          <div class="topic-subtitle">${t.subtitle}</div>
        </div>
      </button>
    `).join('');
  },

  openTopic(id) {
    const topic = COURSE_DATA.topics.find(t => t.id === id);
    if (!topic) return;
    this.activeTopic = id;

    // Update active state
    document.querySelectorAll('.course-topic-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.id) === id);
    });

    const panel = document.getElementById('course-content-panel');

    // Key data grid
    const keyDataHTML = topic.keyData ? `
      <div class="course-key-data">
        ${topic.keyData.map(k => `
          <div class="key-data-item">
            <div class="key-data-name">${k.name}</div>
            <div class="key-data-val">${k.value}</div>
          </div>
        `).join('')}
      </div>
    ` : '';

    // Build content sections
    const contentHTML = topic.content.map(section => `
      <div class="course-section">
        <div class="course-section-title">
          <span>▸</span> ${section.title}
        </div>
        <div class="course-content-block">
          ${section.items.map(item => `
            <div class="content-item">
              <span class="content-bullet">•</span>
              <span>${item}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Objectives
    const objectivesHTML = `
      <div class="course-section">
        <div class="course-section-title">
          <span>🎯</span> OBJETIVOS DE APRENDIZAJE
        </div>
        <ul class="course-objectives">
          ${topic.objectives.map(o => `<li>${o}</li>`).join('')}
        </ul>
      </div>
    `;

    // Navigation buttons
    const prevTopic = COURSE_DATA.topics.find(t => t.id === id - 1);
    const nextTopic = COURSE_DATA.topics.find(t => t.id === id + 1);
    const navHTML = `
      <div style="display:flex;gap:10px;margin-top:24px;padding-top:16px;border-top:1px solid var(--border)">
        ${prevTopic ? `<button class="btn-secondary" onclick="CourseModule.openTopic(${prevTopic.id})">
          ← Tema ${prevTopic.id}: ${prevTopic.title.substring(0,30)}...
        </button>` : '<div></div>'}
        ${nextTopic ? `<button class="btn-primary" style="margin-left:auto" onclick="CourseModule.openTopic(${nextTopic.id})">
          Tema ${nextTopic.id}: ${nextTopic.title.substring(0,28)}... →
        </button>` : ''}
      </div>
    `;

    panel.innerHTML = `
      <div class="course-view">
        <div class="course-topic-header">
          <div class="course-num-badge">TEMA ${topic.id} DE ${COURSE_DATA.topics.length}</div>
          <div class="course-topic-title">${topic.title}</div>
          <div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">${topic.subtitle}</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
            <a class="poh-link-btn" href="docs/R442FM.pdf#page=${topic.pohPages[0]}" target="_blank">
              📄 POH ${topic.pohSection} — Pág. ${topic.pohPages[0]}
            </a>
            ${topic.pohPages[1] ? `<a class="poh-link-btn" href="docs/R442FM.pdf#page=${topic.pohPages[1]}" target="_blank">
              📄 Hasta pág. ${topic.pohPages[1]}
            </a>` : ''}
            <span style="font-size:11px;color:var(--text-muted)">* Verificar páginas en el POH del helicóptero</span>
          </div>
        </div>

        ${keyDataHTML ? `
        <div class="course-section">
          <div class="course-section-title"><span>📊</span> DATOS CLAVE</div>
          ${keyDataHTML}
        </div>` : ''}

        ${objectivesHTML}
        ${contentHTML}
        ${navHTML}
      </div>
    `;
    panel.scrollTop = 0;
  }
};

/* ══════════════════════════════════════════════════════════════
   EFB R44 II — Módulo del Manual POH
   ══════════════════════════════════════════════════════════════ */

const ManualModule = {

  sections: [
    { num: '1', title: 'Información General',         pages: [1, 12],   desc: 'Certificación, especificaciones, descripción' },
    { num: '2', title: 'Limitaciones',                pages: [13, 30],  desc: 'Velocidades, motor, peso, maniobras' },
    { num: '3', title: 'Procedimientos de Emergencia',pages: [31, 40],  desc: 'Autorrotación, fallas, emergencias' },
    { num: '4', title: 'Procedimientos Normales',     pages: [41, 64],  desc: 'Pre-vuelo, arranque, vuelo, parada' },
    { num: '5', title: 'Performance',                 pages: [65, 80],  desc: 'Tablas DA, hover, ascenso, crucero' },
    { num: '6', title: 'Peso y Balance',              pages: [81, 92],  desc: 'Envelope CG, tablas, datos de peso' },
    { num: '7', title: 'Descripción de la Célula y Sistemas',pages: [93, 200], desc: 'Motor, rotor, combustible, eléctrico, controles' },
    { num: '8', title: 'Manejo, Servicio y Mantenimiento',   pages: [201, 230], desc: 'Lubricación, inspecciones, mantenimiento' },
    { num: '9', title: 'Suplementos',                 pages: [231, 270], desc: 'Sistemas opcionales, flotadores, IFR, etc.' },
  ],

  init() {
    this._renderIndex();
  },

  _renderIndex() {
    const container = document.getElementById('manual-sections');
    if (!container) return;
    container.innerHTML = this.sections.map(s => `
      <button class="manual-section-btn" data-num="${s.num}" onclick="ManualModule.openSection('${s.num}')">
        <div class="section-num">${s.num}</div>
        <div class="section-info">
          <div class="section-name">${s.title}</div>
          <div class="section-pages">Pág. ${s.pages[0]}–${s.pages[1]} &nbsp;|&nbsp; ${s.desc}</div>
        </div>
      </button>
    `).join('');
  },

  openSection(num) {
    const s = this.sections.find(x => x.num === num);
    if (!s) return;

    document.querySelectorAll('.manual-section-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.num === num);
    });

    // Page buttons
    const pages = [];
    for (let p = s.pages[0]; p <= s.pages[1]; p += 1) pages.push(p);

    const pageLinksHTML = pages.map(p => `
      <button class="page-link-btn" onclick="ManualModule.gotoPage(${p})">Pág. ${p}</button>
    `).join('');

    const viewer = document.getElementById('manual-view-panel');
    viewer.innerHTML = `
      <div class="manual-content">
        <div class="manual-section-header">Sección ${num} — ${s.title}</div>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:14px">${s.desc}</p>

        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
          <button class="btn-primary" onclick="ManualModule.openPDFPage(${s.pages[0]})">
            📄 Abrir sección en PDF (pág. ${s.pages[0]})
          </button>
          <button class="btn-secondary" onclick="ManualModule.openFull()">
            Abrir PDF completo
          </button>
        </div>

        <div class="manual-section-header" style="font-size:14px;margin-bottom:8px">Acceso rápido por página</div>
        <div class="manual-page-links">${pageLinksHTML}</div>

        <div style="background:rgba(74,158,255,0.06);border:1px solid rgba(74,158,255,0.25);border-radius:12px;padding:24px;text-align:center;margin-top:8px">
          <div style="font-size:32px;margin-bottom:12px">📄</div>
          <div style="font-size:15px;font-weight:700;color:var(--text-primary);margin-bottom:6px">
            Sección ${num} — ${s.title}
          </div>
          <div style="font-size:12px;color:var(--text-secondary);margin-bottom:20px">
            Páginas ${s.pages[0]}–${s.pages[1]} del POH Robinson R44 II
          </div>
          <button class="btn-primary" style="font-size:15px;padding:14px 28px;margin-bottom:10px"
            onclick="window.open('docs/R442FM.pdf#page=${s.pages[0]}','_blank')">
            📖 Abrir Sección en Visor PDF
          </button>
          <div style="font-size:11px;color:var(--text-muted);margin-top:12px">
            Se abrirá en una nueva pestaña del navegador
          </div>
        </div>
      </div>
    `;
  },

  gotoPage(page) {
    const iframe = document.getElementById('pdf-iframe');
    if (iframe) {
      iframe.src = `docs/R442FM.pdf#page=${page}`;
    }
  },

  openPDFPage(page) {
    window.open(`docs/R442FM.pdf#page=${page}`, '_blank');
  },

  openFull() {
    window.open('docs/R442FM.pdf', '_blank');
  }
};
