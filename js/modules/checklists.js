/* ══════════════════════════════════════════════════════════════
   EFB R44 II — Módulo de Checklists
   ══════════════════════════════════════════════════════════════ */

const ChecklistModule = {

  activeId: null,
  checks: {},  // { listId: Set<itemIndex> } — items marcados

  /* ─── Inicializar ─── */
  init() {
    this._loadFromStorage();
    this._renderListButtons('cl-normal-buttons', CHECKLISTS.normal, false);
    this._renderListButtons('cl-emergency-buttons', CHECKLISTS.emergency, true);
  },

  /* ─── Renderizar botones de listas ─── */
  _renderListButtons(containerId, lists, isEmergency) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    lists.forEach(list => {
      const checked = this.checks[list.id] ? this.checks[list.id].size : 0;
      const total = this._countItems(list);
      const btn = document.createElement('button');
      btn.className = 'cl-btn' + (isEmergency ? ' emergency-btn' : '');
      btn.dataset.id = list.id;
      btn.onclick = () => this.openList(list.id);
      btn.innerHTML = `
        <span>${list.icon || ''} ${list.title}</span>
        <span class="cl-progress">${checked}/${total}</span>
      `;
      container.appendChild(btn);
    });
  },

  /* ─── Contar items de una lista ─── */
  _countItems(list) {
    let count = 0;
    list.sections.forEach(s => {
      if (s.items) count += s.items.length;
    });
    return count;
  },

  /* ─── Abrir una lista ─── */
  openList(id, jumpToEmergency = false) {
    const all = [...CHECKLISTS.normal, ...CHECKLISTS.emergency];
    const list = all.find(l => l.id === id);
    if (!list) return;

    this.activeId = id;
    if (!this.checks[id]) this.checks[id] = new Set();

    // Actualizar botones activos
    document.querySelectorAll('.cl-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.id === id);
    });

    const panel = document.getElementById('cl-content-panel');
    let itemIndex = 0;

    let sectionsHTML = '';
    list.sections.forEach(section => {
      if (section.warning) {
        sectionsHTML += `<div class="cl-warning">⚠️ ${section.warning}</div>`;
        return;
      }
      sectionsHTML += `<div class="cl-section-title">${section.title}</div>`;
      if (section.items) {
        section.items.forEach(item => {
          const idx = itemIndex++;
          const checked = this.checks[id].has(idx);
          const isEmerg = item.isEmergency || list.isEmergency;
          sectionsHTML += `
            <div class="cl-item ${checked ? 'checked' : ''} ${isEmerg ? 'emergency-item' : ''}"
                 data-idx="${idx}" onclick="ChecklistModule.toggleItem('${id}', ${idx}, this)">
              <div class="cl-checkbox"></div>
              <div class="cl-item-text">
                <div class="cl-action">${item.action}</div>
                ${item.value ? `<div class="cl-value">→ ${item.value}</div>` : ''}
                ${item.note ? `<div class="cl-note">${item.note}</div>` : ''}
              </div>
            </div>
          `;
        });
      }
    });

    const total = this._countItems(list);
    const checked = this.checks[id].size;

    panel.innerHTML = `
      <div class="checklist-view">
        <div class="cl-title">${list.icon || ''} ${list.title}</div>
        <div class="cl-subtitle">${list.subtitle} &nbsp;|&nbsp; ${checked}/${total} ítems completados</div>
        ${sectionsHTML}
        <div class="cl-controls">
          <button class="btn-primary" onclick="ChecklistModule.checkAll('${id}')">Marcar todo</button>
          <button class="btn-secondary" onclick="ChecklistModule.resetList('${id}')">Reiniciar</button>
        </div>
      </div>
    `;

    // Actualizar contador en botón
    this._updateButtonCount(id);
  },

  /* ─── Toggle de un ítem ─── */
  toggleItem(listId, idx, element) {
    if (!this.checks[listId]) this.checks[listId] = new Set();
    if (this.checks[listId].has(idx)) {
      this.checks[listId].delete(idx);
      element.classList.remove('checked');
    } else {
      this.checks[listId].add(idx);
      element.classList.add('checked');
    }
    this._saveToStorage();
    this._updateCounter(listId);
    this._updateButtonCount(listId);
  },

  /* ─── Marcar todo ─── */
  checkAll(listId) {
    const all = [...CHECKLISTS.normal, ...CHECKLISTS.emergency];
    const list = all.find(l => l.id === listId);
    if (!list) return;
    const total = this._countItems(list);
    if (!this.checks[listId]) this.checks[listId] = new Set();
    for (let i = 0; i < total; i++) this.checks[listId].add(i);
    this._saveToStorage();
    this.openList(listId);
  },

  /* ─── Reiniciar lista ─── */
  resetList(listId) {
    if (confirm('¿Reiniciar esta lista de verificación?')) {
      this.checks[listId] = new Set();
      this._saveToStorage();
      this.openList(listId);
    }
  },

  /* ─── Actualizar contador en subtítulo ─── */
  _updateCounter(listId) {
    const all = [...CHECKLISTS.normal, ...CHECKLISTS.emergency];
    const list = all.find(l => l.id === listId);
    if (!list) return;
    const total = this._countItems(list);
    const checked = this.checks[listId] ? this.checks[listId].size : 0;
    const subtitle = document.querySelector('#cl-content-panel .cl-subtitle');
    if (subtitle) {
      subtitle.textContent = `${list.subtitle} | ${checked}/${total} ítems completados`;
    }
  },

  /* ─── Actualizar contador en botón lateral ─── */
  _updateButtonCount(listId) {
    const all = [...CHECKLISTS.normal, ...CHECKLISTS.emergency];
    const list = all.find(l => l.id === listId);
    if (!list) return;
    const total = this._countItems(list);
    const checked = this.checks[listId] ? this.checks[listId].size : 0;
    const btn = document.querySelector(`.cl-btn[data-id="${listId}"] .cl-progress`);
    if (btn) btn.textContent = `${checked}/${total}`;
  },

  /* ─── Reiniciar TODAS las listas (nuevo vuelo) ─── */
  resetAll() {
    if (confirm('¿Reiniciar TODAS las listas de verificación?\nUsar al inicio de cada nuevo vuelo.')) {
      this.checks = {};
      this._saveToStorage();
      this._renderListButtons('cl-normal-buttons', CHECKLISTS.normal, false);
      this._renderListButtons('cl-emergency-buttons', CHECKLISTS.emergency, true);
      const panel = document.getElementById('cl-content-panel');
      if (panel) {
        panel.innerHTML = `
          <div class="checklist-placeholder">
            <div class="placeholder-icon">✅</div>
            <p>Listas reiniciadas — Seleccione una lista de verificación</p>
          </div>
        `;
      }
    }
  },

  /* ─── Persistencia localStorage ─── */
  _saveToStorage() {
    const data = {};
    Object.keys(this.checks).forEach(k => {
      data[k] = [...this.checks[k]];
    });
    try { localStorage.setItem('efb_r44_checklists', JSON.stringify(data)); } catch(e) {}
  },

  _loadFromStorage() {
    try {
      const raw = localStorage.getItem('efb_r44_checklists');
      if (raw) {
        const data = JSON.parse(raw);
        Object.keys(data).forEach(k => {
          this.checks[k] = new Set(data[k]);
        });
      }
    } catch(e) {}
  }
};
