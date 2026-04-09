/* ══════════════════════════════════════════════════════════════
   EFB R44 II — Módulo de Peso y Balance
   ══════════════════════════════════════════════════════════════ */

const WBModule = {

  canvas: null,
  ctx: null,
  lastResult: null,

  init() {
    this._buildForm();
    setTimeout(() => {
      this.canvas = document.getElementById('wb-canvas');
      this._sizeCanvas();
      this._drawEnvelopeOnly();
    }, 100);
    window.addEventListener('resize', () => {
      this._sizeCanvas();
      if (this.lastResult) this._drawChart(this.lastResult.arm, this.lastResult.weight, this.lastResult.ok);
      else this._drawEnvelopeOnly();
    });
  },

  _buildForm() {
    const form = document.getElementById('wb-form');
    if (!form) return;

    let html = '';
    const stations = WB_DATA.stations;

    // BEW section
    const bew = stations.find(s => s.id === 'bew');
    html += `
      <div class="wb-section">
        <div class="wb-section-title">📋 Peso Vacío Equipado (BEW)</div>
        <div class="wb-row-3">
          <label class="wb-field-label">Peso vacío</label>
          <input type="number" id="wb-bew" value="${bew.defaultWeight}" min="1200" max="2000">
          <span class="wb-field-unit">lbs</span>
        </div>
        <div class="wb-row-3">
          <label class="wb-field-label">Brazo vacío (desde mástil)</label>
          <input type="number" id="wb-bew-arm" value="${bew.defaultArm}" min="-10" max="10" step="0.1">
          <span class="wb-field-unit">in</span>
        </div>
        <div style="font-size:11px;color:var(--text-muted);padding:4px 0 8px">
          ⚠️ Usar valores del libro W&amp;B individual del helicóptero
        </div>
      </div>
    `;

    // Occupants
    html += `<div class="wb-section"><div class="wb-section-title">👤 Tripulantes y Pasajeros</div>`;
    ['pilot','copilot','pax_rl','pax_rr'].forEach(id => {
      const s = stations.find(x => x.id === id);
      html += `
        <div class="wb-row-3">
          <label class="wb-field-label">${s.labelShort} <span style="color:var(--text-muted);font-size:10px">(brazo ${s.arm}")</span></label>
          <input type="number" id="wb-${id}" value="${s.defaultWeight}" min="0" max="400" oninput="WBModule._liveUpdate();WBModule._showKg('wb-${id}','kg-${id}')">
          <span class="wb-field-unit">lbs</span>
        </div>
        <div style="font-size:10px;color:var(--accent-blue);padding:0 0 6px 0" id="kg-${id}">${s.defaultWeight>0?'= '+(s.defaultWeight*0.4536).toFixed(0)+' kg':''}</div>
      `;
    });
    html += `</div>`;

    // Fuel
    const fuel = stations.find(s => s.id === 'fuel');
    html += `
      <div class="wb-section">
        <div class="wb-section-title">⛽ Combustible</div>
        <div class="wb-row-3">
          <label class="wb-field-label">Combustible <span style="color:var(--text-muted);font-size:10px">(brazo +5.5")</span></label>
          <input type="number" id="wb-fuel-gal" value="${Math.round(fuel.defaultWeight/6)}" min="0" max="30"
            oninput="WBModule._fuelGalToLbs()" step="0.5">
          <span class="wb-field-unit">gal</span>
        </div>
        <div class="wb-row-3">
          <label class="wb-field-label">Combustible (litros)</label>
          <input type="number" id="wb-fuel-l" value="${(Math.round(fuel.defaultWeight/6)*3.785).toFixed(0)}" min="0" max="114"
            oninput="WBModule._fuelLToLbs()" step="1">
          <span class="wb-field-unit">L</span>
        </div>
        <div class="wb-row-3">
          <label class="wb-field-label">Combustible (en peso)</label>
          <input type="number" id="wb-fuel" value="${fuel.defaultWeight}" min="0" max="180"
            oninput="WBModule._fuelLbsToGal();WBModule._liveUpdate()">
          <span class="wb-field-unit">lbs</span>
        </div>
        <div style="font-size:10px;color:var(--text-muted);padding:2px 0 8px">
          1 US gal AVGAS 100LL ≈ 6.0 lbs (2.72 kg) &nbsp;|&nbsp; Máx.: 29.5 gal = 177 lbs (80.3 kg) = 111.6 L
        </div>
      </div>
    `;

    // Baggage
    const bag = stations.find(s => s.id === 'baggage');
    html += `
      <div class="wb-section">
        <div class="wb-section-title">🧳 Equipaje</div>
        <div class="wb-row-3">
          <label class="wb-field-label">Equipaje <span style="color:var(--text-muted);font-size:10px">(brazo +13.5", máx 50 lbs)</span></label>
          <input type="number" id="wb-baggage" value="${bag.defaultWeight}" min="0" max="50" oninput="WBModule._liveUpdate()">
          <span class="wb-field-unit">lbs</span>
        </div>
      </div>
    `;

    form.innerHTML = html;
  },

  _fuelGalToLbs() {
    const gal = parseFloat(document.getElementById('wb-fuel-gal')?.value) || 0;
    const lbs = gal * 6.0;
    const elLbs = document.getElementById('wb-fuel');
    const elL   = document.getElementById('wb-fuel-l');
    if (elLbs) elLbs.value = lbs.toFixed(1);
    if (elL)   elL.value   = (gal * 3.78541).toFixed(0);
    this._liveUpdate();
  },

  _fuelLToLbs() {
    const liters = parseFloat(document.getElementById('wb-fuel-l')?.value) || 0;
    const gal = liters / 3.78541;
    const lbs = gal * 6.0;
    const elGal = document.getElementById('wb-fuel-gal');
    const elLbs = document.getElementById('wb-fuel');
    if (elGal) elGal.value = gal.toFixed(1);
    if (elLbs) elLbs.value = lbs.toFixed(1);
    this._liveUpdate();
  },

  _fuelLbsToGal() {
    const lbs = parseFloat(document.getElementById('wb-fuel')?.value) || 0;
    const gal = lbs / 6.0;
    const elGal = document.getElementById('wb-fuel-gal');
    const elL   = document.getElementById('wb-fuel-l');
    if (elGal) elGal.value = gal.toFixed(1);
    if (elL)   elL.value   = (gal * 3.78541).toFixed(0);
  },

  _showKg(inputId, spanId) {
    const lbs = parseFloat(document.getElementById(inputId)?.value) || 0;
    const el = document.getElementById(spanId);
    if (el) el.textContent = lbs > 0 ? `= ${(lbs * 0.4536).toFixed(0)} kg` : '';
  },

  _liveUpdate() {
    // Auto-calculate when inputs change
    clearTimeout(this._updateTimer);
    this._updateTimer = setTimeout(() => this.calculate(), 300);
  },

  _getVal(id) { return parseFloat(document.getElementById(id)?.value) || 0; },

  calculate() {
    const bew    = this._getVal('wb-bew');
    const bewArm = this._getVal('wb-bew-arm');
    const pilot  = this._getVal('wb-pilot');
    const copilot= this._getVal('wb-copilot');
    const paxRL  = this._getVal('wb-pax_rl');
    const paxRR  = this._getVal('wb-pax_rr');
    const fuel   = this._getVal('wb-fuel');
    const bag    = this._getVal('wb-baggage');

    // Find arms from data
    const getArm = id => WB_DATA.stations.find(s => s.id === id)?.arm || 0;

    const items = [
      { label: 'Peso Vacío',    weight: bew,    arm: bewArm },
      { label: 'Piloto',        weight: pilot,  arm: getArm('pilot') },
      { label: 'Co-Piloto/Pax Fwd', weight: copilot, arm: getArm('copilot') },
      { label: 'Pax Trasero Izq.', weight: paxRL, arm: getArm('pax_rl') },
      { label: 'Pax Trasero Der.', weight: paxRR, arm: getArm('pax_rr') },
      { label: 'Combustible',   weight: fuel,   arm: getArm('fuel') },
      { label: 'Equipaje',      weight: bag,    arm: getArm('baggage') },
    ];

    const totalWeight  = items.reduce((s,i) => s + i.weight, 0);
    const totalMoment  = items.reduce((s,i) => s + i.weight * i.arm, 0);
    const cgArm        = totalWeight > 0 ? totalMoment / totalWeight : 0;

    // Check limits
    const limits = WB_DATA.limits;
    const weightOK = totalWeight <= limits.maxGrossWeight;
    const cgFwd    = totalWeight >= 2000 ? limits.fwdCGLimitMTOW : limits.fwdCGLimit;
    const cgOK     = cgArm >= cgFwd && cgArm <= limits.aftCGLimit;
    const bagOK    = bag <= limits.maxBaggage;
    const overallOK = weightOK && cgOK && bagOK;

    this.lastResult = { arm: cgArm, weight: totalWeight, ok: overallOK };

    // Show results
    const resDiv = document.getElementById('wb-results');
    resDiv.classList.remove('hidden');

    const fmt = (v, dec=1) => parseFloat(v.toFixed(dec)).toLocaleString('es-AR');

    resDiv.innerHTML = `
      <div style="font-size:12px;font-weight:700;color:var(--accent-amber);margin-bottom:8px;text-transform:uppercase">
        Resultado del Cálculo
      </div>
      <div class="wb-result-row">
        <span class="wb-result-label">Peso Bruto Total</span>
        <div class="dual-value">
          <span class="wb-result-val ${weightOK?'ok':'nok'}">${fmt(totalWeight,0)} lbs</span>
          <span class="val-secondary">(${(totalWeight*0.4536).toFixed(0)} kg)</span>
        </div>
      </div>
      <div class="wb-result-row">
        <span class="wb-result-label">MTOW Disponible</span>
        <div class="dual-value">
          <span class="wb-result-val">${limits.maxGrossWeight} lbs</span>
          <span class="val-secondary">(${(limits.maxGrossWeight*0.4536).toFixed(0)} kg)</span>
        </div>
      </div>
      <div class="wb-result-row">
        <span class="wb-result-label">CG calculado</span>
        <span class="wb-result-val ${cgOK?'ok':'nok'}">${cgArm.toFixed(2)}" del mástil</span>
      </div>
      <div class="wb-result-row">
        <span class="wb-result-label">Límite CG delantero</span>
        <span class="wb-result-val">${cgFwd}" (a ${fmt(totalWeight,0)} lbs)</span>
      </div>
      <div class="wb-result-row">
        <span class="wb-result-label">Límite CG trasero</span>
        <span class="wb-result-val">${limits.aftCGLimit}"</span>
      </div>
      <div class="wb-result-row">
        <span class="wb-result-label">Momento total</span>
        <span class="wb-result-val">${fmt(totalMoment,0)} lb·in</span>
      </div>
      ${!bagOK ? `<div style="color:var(--accent-red);font-size:11px;padding:4px 0">⚠️ Equipaje excede límite de ${limits.maxBaggage} lbs</div>` : ''}
      <div class="wb-status ${overallOK?'ok':'nok'}">
        ${overallOK ? '✓ DENTRO DEL ENVELOPE — APROBADO' : '✗ FUERA DEL ENVELOPE — NO VOLAR'}
      </div>
    `;

    this._drawChart(cgArm, totalWeight, overallOK);
  },

  reset() {
    document.getElementById('wb-bew').value = 1470;
    document.getElementById('wb-bew-arm').value = 0.5;
    document.getElementById('wb-pilot').value = 190;
    document.getElementById('wb-copilot').value = 0;
    document.getElementById('wb-pax_rl').value = 0;
    document.getElementById('wb-pax_rr').value = 0;
    document.getElementById('wb-fuel-gal').value = 20;
    const lEl = document.getElementById('wb-fuel-l');
    if (lEl) lEl.value = (20 * 3.78541).toFixed(0);
    document.getElementById('wb-fuel').value = 120;
    document.getElementById('wb-baggage').value = 0;
    // Reset kg displays
    ['pilot','copilot','pax_rl','pax_rr'].forEach(id => {
      const kgEl = document.getElementById(`kg-${id}`);
      if (kgEl) { const v = document.getElementById(`wb-${id}`)?.value; kgEl.textContent = v > 0 ? `= ${(v*0.4536).toFixed(0)} kg` : ''; }
    });
    document.getElementById('wb-results').classList.add('hidden');
    this.lastResult = null;
    this._drawEnvelopeOnly();
  },

  printReport() {
    if (!this.lastResult) { alert('Calcule el peso y balance primero.'); return; }
    window.print();
  },

  /* ─── Canvas ─── */
  _sizeCanvas() {
    if (!this.canvas) return;
    const container = this.canvas.parentElement;
    const w = Math.min(container.offsetWidth - 32, 480);
    const h = Math.min(container.offsetHeight - 20, 380);
    this.canvas.width  = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');
  },

  _drawEnvelopeOnly() {
    this._drawChart(null, null, null);
  },

  _drawChart(cgArm, weight, isOK) {
    if (!this.canvas || !this.ctx) return;
    const ctx = this.canvas;
    const c   = this.ctx;
    const W   = ctx.width;
    const H   = ctx.height;

    c.clearRect(0, 0, W, H);

    // Margins
    const ml = 55, mr = 20, mt = 20, mb = 45;
    const plotW = W - ml - mr;
    const plotH = H - mt - mb;

    // Axis ranges
    const armMin = -6, armMax = 6;    // inches from mast
    const wtMin  = 1400, wtMax = 2600; // lbs

    const xScale = v => ml + (v - armMin) / (armMax - armMin) * plotW;
    const yScale = v => mt + (1 - (v - wtMin) / (wtMax - wtMin)) * plotH;

    // ── Background ──
    c.fillStyle = '#080d18';
    c.fillRect(0, 0, W, H);

    // ── Grid ──
    c.strokeStyle = '#1e2e4a';
    c.lineWidth = 1;
    // Vertical grid lines (arm)
    for (let a = armMin; a <= armMax; a++) {
      const x = xScale(a);
      c.beginPath(); c.moveTo(x, mt); c.lineTo(x, mt + plotH); c.stroke();
    }
    // Horizontal grid lines (weight)
    for (let w = 1400; w <= 2600; w += 200) {
      const y = yScale(w);
      c.beginPath(); c.moveTo(ml, y); c.lineTo(ml + plotW, y); c.stroke();
    }

    // ── Envelope fill ──
    const env = WB_DATA.cgEnvelope.points;
    c.beginPath();
    c.moveTo(xScale(env[0][0]), yScale(env[0][1]));
    env.slice(1).forEach(([a, w]) => c.lineTo(xScale(a), yScale(w)));
    c.closePath();
    c.fillStyle = 'rgba(0, 212, 161, 0.08)';
    c.fill();

    // ── Envelope border ──
    c.beginPath();
    c.moveTo(xScale(env[0][0]), yScale(env[0][1]));
    env.slice(1).forEach(([a, w]) => c.lineTo(xScale(a), yScale(w)));
    c.closePath();
    c.strokeStyle = '#00d4a1';
    c.lineWidth = 2;
    c.setLineDash([]);
    c.stroke();

    // ── Axes ──
    c.strokeStyle = '#2a3d62';
    c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(ml, mt); c.lineTo(ml, mt + plotH); c.stroke();
    c.beginPath(); c.moveTo(ml, mt + plotH); c.lineTo(ml + plotW, mt + plotH); c.stroke();

    // Datum line (arm = 0)
    c.strokeStyle = 'rgba(245,166,35,0.4)';
    c.lineWidth = 1;
    c.setLineDash([4, 4]);
    const x0 = xScale(0);
    c.beginPath(); c.moveTo(x0, mt); c.lineTo(x0, mt + plotH); c.stroke();
    c.setLineDash([]);

    // ── Labels ──
    c.fillStyle = '#8b9ab8';
    c.font = '10px monospace';
    c.textAlign = 'center';

    // X axis labels (arm)
    for (let a = armMin; a <= armMax; a += 1) {
      const x = xScale(a);
      c.fillText(a + '"', x, mt + plotH + 14);
    }

    // Y axis labels (weight)
    c.textAlign = 'right';
    for (let w = 1400; w <= 2600; w += 200) {
      const y = yScale(w);
      c.fillText(w, ml - 6, y + 3);
    }

    // Axis titles
    c.fillStyle = '#f5a623';
    c.font = 'bold 10px sans-serif';
    c.textAlign = 'center';
    c.fillText('CG — pulgadas desde mástil (fwd ← | → aft)', ml + plotW/2, H - 6);

    c.save();
    c.translate(12, mt + plotH/2);
    c.rotate(-Math.PI/2);
    c.fillText('Peso (lbs)', 0, 0);
    c.restore();

    // Title
    c.fillStyle = '#e4ecf7';
    c.font = 'bold 11px sans-serif';
    c.textAlign = 'center';
    c.fillText('ENVELOPE PESO Y BALANCE — Robinson R44 II', ml + plotW/2, mt - 6);

    // Datum label
    c.fillStyle = 'rgba(245,166,35,0.7)';
    c.font = '9px monospace';
    c.textAlign = 'center';
    c.fillText('Datum', x0, mt + 10);

    // ── Plot CG point ──
    if (cgArm !== null && weight !== null) {
      const px = xScale(cgArm);
      const py = yScale(weight);

      const dotColor = isOK ? '#00d4a1' : '#ff4455';

      // Crosshair lines
      c.strokeStyle = dotColor;
      c.lineWidth = 1;
      c.setLineDash([3, 3]);
      c.beginPath(); c.moveTo(px, mt); c.lineTo(px, mt + plotH); c.stroke();
      c.beginPath(); c.moveTo(ml, py); c.lineTo(ml + plotW, py); c.stroke();
      c.setLineDash([]);

      // Dot
      c.beginPath();
      c.arc(px, py, 7, 0, Math.PI * 2);
      c.fillStyle = dotColor;
      c.fill();
      c.strokeStyle = '#fff';
      c.lineWidth = 2;
      c.stroke();

      // Label
      c.font = 'bold 11px monospace';
      c.fillStyle = dotColor;
      c.textAlign = px > ml + plotW * 0.7 ? 'right' : 'left';
      const lx = px > ml + plotW * 0.7 ? px - 12 : px + 12;
      c.fillText(`${weight.toFixed(0)} lbs`, lx, py - 10);
      c.fillText(`${cgArm.toFixed(2)}"`, lx, py + 5);
    }

    // ── Legend ──
    c.font = '10px sans-serif';
    c.textAlign = 'left';
    c.fillStyle = '#00d4a1'; c.fillRect(ml, mt + 5, 14, 8);
    c.fillStyle = '#8b9ab8'; c.fillText('Envelope aprobado', ml + 18, mt + 13);
  }
};
