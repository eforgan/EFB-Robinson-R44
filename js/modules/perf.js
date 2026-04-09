/* ══════════════════════════════════════════════════════════════
   EFB R44 II — Módulo de Performance
   ══════════════════════════════════════════════════════════════ */

const PerfModule = {

  activeTab: 'da',

  init() {
    this._initTabs();
    this.showTab('da');
  },

  _initTabs() {
    document.querySelectorAll('.perf-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.perf-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        this.showTab(btn.dataset.tab);
      });
    });
  },

  showTab(tab) {
    this.activeTab = tab;
    const content = document.getElementById('perf-content');
    switch (tab) {
      case 'da':      content.innerHTML = this._renderDensityAlt(); break;
      case 'hover':   content.innerHTML = this._renderHover(); break;
      case 'climb':   content.innerHTML = this._renderClimb(); break;
      case 'cruise':  content.innerHTML = this._renderCruise(); break;
      case 'fuel':    content.innerHTML = this._renderFuel(); break;
      case 'autorot': content.innerHTML = this._renderAutorot(); break;
      case 'hv':      content.innerHTML = this._renderHV(); break;
    }
    this._initTabInteractions(tab);
  },

  /* ─── Fallback imagen R44 ─── */
  _imgFallback(img) {
    img.style.display = 'none';
    const svg = document.getElementById('r44-svg-fallback');
    if (svg) svg.style.display = 'block';
  },

  /* ─── Altitud de Densidad ─── */
  _renderDensityAlt() {
    return `
      <div class="da-calculator">
        <div class="calc-card">
          <div class="calc-title">📊 Calculadora de Altitud de Densidad</div>

          <div class="form-row">
            <label class="form-label">Altitud Presión (PA) — ft</label>
            <input type="number" class="form-input" id="da-pa" value="0" min="0" max="20000"
              oninput="PerfModule.calcDA()" placeholder="ft">
          </div>
          <div class="form-row">
            <label class="form-label">Temperatura OAT — °C</label>
            <input type="number" class="form-input" id="da-oat" value="15" min="-40" max="50"
              oninput="PerfModule.calcDA()">
          </div>
          <div class="form-row">
            <label class="form-label">QNH — hPa (hPa/mb)</label>
            <input type="number" class="form-input" id="da-qnh" value="1013" min="950" max="1050"
              oninput="PerfModule.calcDA()">
          </div>

          <div class="result-box" id="da-result-box">
            <div class="result-label">Altitud de Densidad (DA)</div>
            <div class="result-value" id="da-result">--</div>
            <div class="result-unit">ft MSL</div>
          </div>

          <div style="margin-top:12px" id="da-analysis"></div>
        </div>

        <div class="calc-card">
          <div class="calc-title">🌡️ Referencia Atmósfera Estándar ISA</div>
          <table class="perf-table" style="margin:0">
            <thead>
              <tr>
                <th class="col-label">Alt (ft)</th>
                <th>T° ISA (°C)</th>
                <th>Presión (hPa)</th>
              </tr>
            </thead>
            <tbody>
              ${[[0,15,1013],[2000,11,942],[4000,7,875],[6000,3,812],[8000,-1,753],[10000,-5,697],[12000,-9,644],[14000,-13,595]]
                .map(([a,t,p]) => `<tr>
                  <td class="col-label">${a.toLocaleString()}</td>
                  <td>${t}°C</td>
                  <td>${p}</td>
                </tr>`).join('')}
            </tbody>
          </table>
          <div class="perf-note">
            Temperatura ISA: 15°C al nivel del mar, -2°C cada 1000 ft.<br>
            Fórmula DA: DA ≈ PA + (OAT – ISA_temp) × 120 ft<br>
            Corrección presión: (1013 – QNH) × 27 ft
          </div>

          <div class="calc-title" style="margin-top:16px">⚠️ Efecto sobre Performance R44 II</div>
          <div class="limits-grid" style="margin-top:8px">
            <div class="limit-card">
              <div class="limit-name">HOGE a 2500 lbs / 1134 kg</div>
              <div class="limit-value">~6200 ft</div>
              <div class="limit-note">Hover OGE máximo</div>
            </div>
            <div class="limit-card">
              <div class="limit-name">HIGE a 2500 lbs / 1134 kg</div>
              <div class="limit-value">~9400 ft</div>
              <div class="limit-note">Hover IGE máximo</div>
            </div>
            <div class="limit-card">
              <div class="limit-name">Techo de servicio</div>
              <div class="limit-value">~14.000 ft</div>
              <div class="limit-note">DA aproximada</div>
            </div>
            <div class="limit-card">
              <div class="limit-name">Regla práctica DA</div>
              <div class="limit-value">+10°C ISA</div>
              <div class="limit-note">= +1200 ft DA</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  calcDA() {
    const pa  = parseFloat(document.getElementById('da-pa')?.value) || 0;
    const oat = parseFloat(document.getElementById('da-oat')?.value) || 15;
    const qnh = parseFloat(document.getElementById('da-qnh')?.value) || 1013;

    const isaTemp  = 15 - (pa / 1000) * 2;
    const paCorrQNH = (1013.25 - qnh) * 27;  // pies por hPa diferencia
    const pa_corrected = pa + paCorrQNH;
    const da = pa_corrected + (oat - isaTemp) * 120;
    const daRounded = Math.round(da / 10) * 10;

    const el = document.getElementById('da-result');
    const box = document.getElementById('da-result-box');
    if (el) {
      el.textContent = daRounded.toLocaleString();
      // Color coding
      const color = daRounded > 10000 ? '#ff4455' : daRounded > 6000 ? '#ff7a30' : '#00d4a1';
      el.style.color = color;
    }

    const analysis = document.getElementById('da-analysis');
    if (analysis) {
      let status = [];
      if (daRounded > PERF_DATA.aircraft.maxAlt) {
        status.push(`<span style="color:#ff4455">⚠️ DA excede techo de servicio (~${PERF_DATA.aircraft.maxAlt.toLocaleString()} ft)</span>`);
      } else if (daRounded > PERF_DATA.aircraft.hogeAlt2500) {
        status.push(`<span style="color:#ff7a30">⚠️ No es posible Hover OGE a peso máximo (MTOW 2500 lbs / 1134 kg)</span>`);
        if (daRounded <= PERF_DATA.aircraft.higeAlt2500) {
          status.push(`<span style="color:#f5a623">✓ Hover IGE posible a MTOW (verificar tablas)</span>`);
        } else {
          status.push(`<span style="color:#ff4455">⚠️ Hover IGE también limitado a peso máximo</span>`);
        }
      } else {
        status.push(`<span style="color:#00d4a1">✓ Performance dentro de rangos normales para MTOW (2500 lbs / 1134 kg)</span>`);
      }
      status.push(`<span style="color:#8b9ab8">T° ISA a ${pa.toLocaleString()} ft = ${isaTemp.toFixed(1)}°C &nbsp;|&nbsp; Desvío ISA: ${(oat-isaTemp).toFixed(1)}°C</span>`);
      analysis.innerHTML = status.map(s => `<div style="padding:4px 0;font-size:12px">${s}</div>`).join('');
    }
  },

  /* ─── Hover ─── */
  _renderHover() {
    const ogeData  = PERF_DATA.hoverOGE;
    const igeData  = PERF_DATA.hoverIGE;
    const weights  = ogeData.weights;
    const altOGE   = ogeData.altitudes;
    const altIGE   = igeData.altitudes;

    const renderTable = (data, altitudes, label) => {
      const hdrs = weights.map(w => `<th>${w} lbs<br><small style="color:var(--text-muted);font-weight:500">(${Math.round(w*0.4536)} kg)</small></th>`).join('');
      const rows = altitudes.map((alt, ri) => {
        const cells = weights.map(w => {
          const v = data.data[w][ri];
          const cls = v > 100 ? 'exceed' : v > 95 ? 'warn' : 'good';
          const txt = v > 100 ? `${v}% 🔴` : `${v}%`;
          return `<td class="${cls}">${txt}</td>`;
        }).join('');
        return `<tr><td class="col-label">${alt.toLocaleString()} ft</td>${cells}</tr>`;
      }).join('');

      return `
        <div class="perf-section-title">🚁 ${label}</div>
        <div class="perf-note">${data.note}</div>
        <div class="perf-table-wrapper">
          <table class="perf-table">
            <thead><tr>
              <th class="col-label">DA (ft)</th>
              ${hdrs}
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
    };

    return `
      <div style="margin-bottom:8px">
        <div class="calc-card" style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:14px">
          <div class="calc-title">🔍 Verificador de Hover</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div class="form-row">
              <label class="form-label">DA (ft) — calcular en pestaña anterior</label>
              <input type="number" class="form-input" id="hov-da" value="0" oninput="PerfModule.checkHover()">
            </div>
            <div class="form-row">
              <label class="form-label">Peso bruto (lbs) <span id="hov-gw-kg" style="color:var(--accent-blue);font-size:10px"></span></label>
              <input type="number" class="form-input" id="hov-gw" value="2500" oninput="PerfModule.checkHover()">
            </div>
          </div>
          <div id="hov-result" style="margin-top:10px"></div>
        </div>
      </div>
      ${renderTable(ogeData, altOGE, 'Hover OGE — Potencia Requerida (% potencia máx. continua)')}
      ${renderTable(igeData, altIGE, 'Hover IGE — Potencia Requerida (% potencia máx. continua, skid ~3 ft)')}
    `;
  },

  checkHover() {
    const da = parseFloat(document.getElementById('hov-da')?.value) || 0;
    const gw = parseFloat(document.getElementById('hov-gw')?.value) || 2500;
    const result = document.getElementById('hov-result');
    if (!result) return;
    const kgEl = document.getElementById('hov-gw-kg');
    if (kgEl) kgEl.textContent = `= ${(gw * 0.4536).toFixed(0)} kg`;

    // Interpolate OGE power
    const ogeData = PERF_DATA.hoverOGE;
    const igeData = PERF_DATA.hoverIGE;

    const interp = (dataObj, da_val, gw_val) => {
      const weights = dataObj.weights;
      const alts    = dataObj.altitudes;
      const data    = dataObj.data;

      // Find surrounding weights
      const wUpper = weights.find(w => w >= gw_val) || weights[weights.length-1];
      const wLower = [...weights].reverse().find(w => w <= gw_val) || weights[0];

      // Find surrounding alts
      const aUpper = alts.find(a => a >= da_val) || alts[alts.length-1];
      const aLower = [...alts].reverse().find(a => a <= da_val) || alts[0];

      const ai = alts.indexOf(aLower);
      const aiU = alts.indexOf(aUpper);
      const wLi = weights.indexOf(wLower);
      const wUi = weights.indexOf(wUpper);

      if (ai < 0 || wLi < 0) return null;

      const fAlt = aUpper === aLower ? 0 : (da_val - aLower) / (aUpper - aLower);
      const fW   = wUpper === wLower ? 0 : (gw_val - wLower) / (wUpper - wLower);

      const pLL = data[wLower][ai];
      const pLU = data[wLower][aiU] || pLL;
      const pUL = data[wUpper][ai];
      const pUU = data[wUpper][aiU] || pUL;

      const pL = pLL + fAlt * (pLU - pLL);
      const pU = pUL + fAlt * (pUU - pUL);
      return pL + fW * (pU - pL);
    };

    const ogeP = interp(ogeData, da, gw);
    const igeP = interp(igeData, da, gw);

    const statusColor = p => p > 100 ? '#ff4455' : p > 95 ? '#ff7a30' : '#00d4a1';
    const statusText  = p => p > 100 ? 'NO POSIBLE 🔴' : p > 95 ? 'MARGINAL ⚠️' : 'POSIBLE ✓';

    result.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="result-box">
          <div class="result-label">OGE Power Required</div>
          <div class="result-value" style="color:${statusColor(ogeP)}">${ogeP ? ogeP.toFixed(1)+'%' : '--'}</div>
          <div class="result-unit" style="color:${statusColor(ogeP)}">${ogeP ? statusText(ogeP) : ''}</div>
        </div>
        <div class="result-box">
          <div class="result-label">IGE Power Required (~3 ft)</div>
          <div class="result-value" style="color:${statusColor(igeP)}">${igeP ? igeP.toFixed(1)+'%' : '--'}</div>
          <div class="result-unit" style="color:${statusColor(igeP)}">${igeP ? statusText(igeP) : ''}</div>
        </div>
      </div>
    `;
  },

  /* ─── Ascenso ─── */
  _renderClimb() {
    const d = PERF_DATA.climbRate;
    const hdrs = d.weights.map(w => `<th>${w} lbs<br><small style="color:var(--text-muted);font-weight:500">(${Math.round(w*0.4536)} kg)</small></th>`).join('');
    const rows = d.altitudes.map((alt, ri) => {
      const cells = d.weights.map(w => {
        const v = d.data[w][ri];
        if (v === '--') return `<td class="exceed">—</td>`;
        const cls = v > 800 ? 'good' : v > 300 ? '' : 'warn';
        return `<td class="${cls}">${v}</td>`;
      }).join('');
      return `<tr><td class="col-label">${typeof alt==='number'?alt.toLocaleString():alt} ft</td>${cells}</tr>`;
    }).join('');

    return `
      <div class="perf-section-title">📈 Tasa de Ascenso (FPM) — a Vy ≈ 65-70 KIAS</div>
      <div class="perf-note">${d.note}</div>
      <div class="perf-table-wrapper">
        <table class="perf-table">
          <thead><tr><th class="col-label">DA (ft)</th>${hdrs}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>

      <div class="perf-section-title" style="margin-top:16px">🚁 Velocidades de Referencia</div>
      <div class="limits-grid">
        ${PERF_DATA.speeds.slice(0,6).map(s => `
          <div class="limit-card">
            <div class="limit-name">${s.name}</div>
            <div class="limit-value">${s.value}</div>
            <div class="limit-note">${s.note}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  /* ─── Crucero ─── */
  _renderCruise() {
    const GAL_TO_L_c = 3.78541;
    const rows = PERF_DATA.cruiseTable.map(r => `
      <tr>
        <td class="col-label">${r.alt.toLocaleString()} ft</td>
        <td>${r.kias}</td>
        <td class="good">${r.ktas}</td>
        <td>${r.ff} <small style="color:var(--accent-blue)">(${(r.ff*GAL_TO_L_c).toFixed(1)} L/h)</small></td>
        <td class="good">${r.range}</td>
        <td>${r.endur.toFixed(1)} hr</td>
      </tr>
    `).join('');

    const GAL_TO_L_cruise = 3.78541;
    const powerRows = PERF_DATA.powerTable.map(r => `
      <tr>
        <td class="col-label">${r.pct}%</td>
        <td>${r.kias}</td>
        <td class="good">${r.ktas}</td>
        <td>${r.ff}</td>
        <td class="good">${(r.ff * GAL_TO_L_cruise).toFixed(1)}</td>
        <td>${(r.ff * 6 * 0.4536).toFixed(1)}</td>
      </tr>
    `).join('');

    return `
      <div class="perf-section-title">✈️ Crucero al 75% Potencia — 2500 lbs / 1134 kg MTOW</div>
      <div class="perf-note">
        Combustible utilizable: 29.5 US gal <span style="color:var(--accent-blue)">(111.6 L)</span> &nbsp;|&nbsp;
        Reserva mín.: 45 min (~9.5 gal / <span style="color:var(--accent-blue)">36 L</span>) &nbsp;|&nbsp;
        AVGAS 100LL = 6.0 lbs/gal <span style="color:var(--accent-blue)">(0.72 kg/L)</span>
      </div>
      <div class="perf-table-wrapper">
        <table class="perf-table">
          <thead><tr>
            <th class="col-label">Altitud</th>
            <th>KIAS</th>
            <th>KTAS</th>
            <th>Comb. (GPH / L/h)</th>
            <th>Rango (nm)*</th>
            <th>Endur. (hr)*</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="perf-note">* Con 45 min de reserva, ~24 gal (91 L) disponibles para crucero.</div>

      <div class="perf-section-title" style="margin-top:16px">⚙️ Crucero vs. Potencia — 4000 ft DA, 2500 lbs / 1134 kg</div>
      <div class="perf-table-wrapper">
        <table class="perf-table">
          <thead><tr>
            <th class="col-label">% Potencia</th>
            <th>KIAS</th>
            <th>KTAS</th>
            <th>GPH</th>
            <th>L/h</th>
            <th>kg/h</th>
          </tr></thead>
          <tbody>${powerRows}</tbody>
        </table>
      </div>

      <div class="perf-section-title" style="margin-top:16px">⛽ Limitaciones del Motor</div>
      <div class="limits-grid">
        ${PERF_DATA.engine.slice(0,8).map(e => `
          <div class="limit-card">
            <div class="limit-name">${e.name}</div>
            <div class="limit-value">${e.value}</div>
            <div class="limit-note">${e.note || ''}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  /* ─── Combustible ─── */
  _renderFuel() {
    const GAL_TO_L = 3.78541;  // 1 US gal = 3.78541 litros
    const fuelRows = PERF_DATA.powerTable.map(r => `<tr>
      <td class="col-label">${r.pct}%</td>
      <td>${r.ff} gal/h</td>
      <td class="good">${(r.ff * GAL_TO_L).toFixed(1)} L/h</td>
      <td>${(r.ff * 6).toFixed(1)} lbs/h</td>
    </tr>`).join('');

    return `
      <div class="da-calculator">
        <div class="calc-card">
          <div class="calc-title">⛽ Planificador de Combustible</div>

          <div class="form-row">
            <label class="form-label">Tiempo estimado de vuelo (min)</label>
            <input type="number" class="form-input" id="fuel-time" value="60" oninput="PerfModule.calcFuel()">
          </div>
          <div class="form-row">
            <label class="form-label">Potencia de crucero (%)</label>
            <select class="form-select" id="fuel-pct" onchange="PerfModule.calcFuel()">
              <option value="85">85% — Alta velocidad</option>
              <option value="75" selected>75% — Crucero normal</option>
              <option value="65">65% — Económico</option>
              <option value="55">55% — Máxima endur.</option>
            </select>
          </div>
          <div class="form-row">
            <label class="form-label">Reserva mínima</label>
            <select class="form-select" id="fuel-res" onchange="PerfModule.calcFuel()">
              <option value="45" selected>45 min (reglamentaria)</option>
              <option value="30">30 min (operaciones especiales)</option>
              <option value="60">60 min (vuelos largos)</option>
            </select>
          </div>

          <div style="margin-top:14px" id="fuel-results"></div>
        </div>

        <div class="calc-card">
          <div class="calc-title">📊 Consumo de Referencia</div>
          <div class="perf-table-wrapper">
            <table class="perf-table">
              <thead><tr>
                <th class="col-label">Potencia</th>
                <th>Gal/h (US)</th>
                <th>L/h</th>
                <th>Lbs/h</th>
              </tr></thead>
              <tbody>${fuelRows}</tbody>
            </table>
          </div>
          <div class="perf-note">
            AVGAS 100LL: ~6.0 lbs/gal — ~0.72 kg/L<br>
            1 US gal = 3.785 L &nbsp;|&nbsp; 1 L = 0.264 US gal<br>
            Capacidad usable: <strong>29.5 US gal = 111.6 L = 177 lbs</strong>
          </div>

          <div class="limits-grid" style="margin-top:12px">
            <div class="limit-card">
              <div class="limit-name">Cap. utilizable</div>
              <div class="dual-value">
                <span class="val-primary">29.5 gal</span>
                <span class="val-secondary">= 111.6 L</span>
              </div>
            </div>
            <div class="limit-card">
              <div class="limit-name">Con tanque aux.</div>
              <div class="dual-value">
                <span class="val-primary">46.7 gal</span>
                <span class="val-secondary">= 176.8 L</span>
              </div>
            </div>
            <div class="limit-card">
              <div class="limit-name">Peso 100LL</div>
              <div class="dual-value">
                <span class="val-primary">6.0 lbs/gal</span>
                <span class="val-secondary">= 0.72 kg/L</span>
              </div>
            </div>
            <div class="limit-card">
              <div class="limit-name">Mínimo en tanque</div>
              <div class="dual-value">
                <span class="val-primary">5 gal</span>
                <span class="val-secondary">= 18.9 L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  calcFuel() {
    const GAL_TO_L  = 3.78541;
    const timeMin   = parseFloat(document.getElementById('fuel-time')?.value) || 60;
    const pct       = parseInt(document.getElementById('fuel-pct')?.value) || 75;
    const resMin    = parseInt(document.getElementById('fuel-res')?.value) || 45;

    const fuelFlow  = PERF_DATA.powerTable.find(p => p.pct === pct)?.ff || 12.6;
    const tripGal   = (timeMin / 60) * fuelFlow;
    const resGal    = (resMin  / 60) * fuelFlow;
    const totalGal  = tripGal + resGal;
    const totalLbs  = totalGal * 6.0;
    const usable    = PERF_DATA.aircraft.fuelCapacity;
    const available = usable - resGal;
    const maxTime   = (available / fuelFlow) * 60;

    // Litros
    const tripL     = tripGal  * GAL_TO_L;
    const resL      = resGal   * GAL_TO_L;
    const totalL    = totalGal * GAL_TO_L;
    const usableL   = usable   * GAL_TO_L;

    const ok = totalGal <= usable;
    const statusCol = ok ? 'var(--accent-green)' : 'var(--accent-red)';
    const statusTxt = ok ? '✓ SUFICIENTE COMBUSTIBLE' : '⚠️ COMBUSTIBLE INSUFICIENTE';

    const fmtDual = (gal, L, lbs) =>
      `<div class="dual-value" style="justify-content:flex-end">
         <span class="val-primary">${gal.toFixed(1)} gal / ${L.toFixed(1)} L</span>
         <span class="val-secondary">(${lbs.toFixed(0)} lbs)</span>
       </div>`;

    document.getElementById('fuel-results').innerHTML = `
      <div style="display:grid;gap:6px">
        <div class="wb-result-row">
          <span class="wb-result-label">Consumo de viaje</span>
          ${fmtDual(tripGal, tripL, tripGal*6)}
        </div>
        <div class="wb-result-row">
          <span class="wb-result-label">Reserva (${resMin} min)</span>
          ${fmtDual(resGal, resL, resGal*6)}
        </div>
        <div class="wb-result-row" style="border-top: 1px solid var(--border-bright); padding-top:6px; margin-top:2px">
          <span class="wb-result-label" style="font-weight:700">TOTAL requerido</span>
          <div class="dual-value" style="justify-content:flex-end">
            <span class="val-primary" style="color:${statusCol}">${totalGal.toFixed(1)} gal / ${totalL.toFixed(1)} L</span>
            <span class="val-secondary">(${totalLbs.toFixed(0)} lbs)</span>
          </div>
        </div>
        <div class="wb-result-row">
          <span class="wb-result-label">Disponible (tanque estándar)</span>
          <span class="wb-result-val">${usable} gal / ${usableL.toFixed(1)} L</span>
        </div>
        <div class="wb-result-row">
          <span class="wb-result-label">Caudal consumo (${pct}% pot.)</span>
          <div class="dual-value" style="justify-content:flex-end">
            <span class="val-primary">${fuelFlow} gal/h</span>
            <span class="val-secondary">= ${(fuelFlow*GAL_TO_L).toFixed(1)} L/h</span>
          </div>
        </div>
        <div class="wb-result-row">
          <span class="wb-result-label">Tiempo máx. de crucero</span>
          <span class="wb-result-val">${maxTime.toFixed(0)} min / ${(maxTime/60).toFixed(1)} hr</span>
        </div>
        <div class="wb-status ${ok?'ok':'nok'}">${statusTxt}</div>
      </div>
    `;
  },

  /* ─── Autorrotación ─── */
  _renderAutorot() {
    const a = PERF_DATA.autorotation;
    const rows = a.table.map(r => `
      <tr>
        <td class="col-label">${r.alt.toLocaleString()} ft AGL</td>
        <td class="good">${r.fwd90} nm</td>
        <td>${r.fwd60} nm</td>
      </tr>
    `).join('');

    return `
      <div class="perf-section-title">🌀 Datos de Autorrotación — R44 II</div>

      <div class="limits-grid">
        <div class="limit-card">
          <div class="limit-name">Velocidad óptima (glide)</div>
          <div class="limit-value">${a.bestSpeed} KIAS</div>
          <div class="limit-note">Máxima relación planeo</div>
        </div>
        <div class="limit-card">
          <div class="limit-name">Tasa de descenso</div>
          <div class="limit-value">~${a.descentRate} FPM</div>
          <div class="limit-note">A ${a.bestSpeed} KIAS</div>
        </div>
        <div class="limit-card">
          <div class="limit-name">Relación de planeo</div>
          <div class="limit-value">${a.glideRatio}</div>
          <div class="limit-note">Horizontal: Vertical</div>
        </div>
        <div class="limit-card">
          <div class="limit-name">RPM rotor</div>
          <div class="limit-value">${a.rpmRange}</div>
          <div class="limit-note">Mantener EN VERDE</div>
        </div>
        <div class="limit-card">
          <div class="limit-name">Inicio de flare</div>
          <div class="limit-value">~${a.flareHeight} ft AGL</div>
          <div class="limit-note">Cíclico atrás suave</div>
        </div>
        <div class="limit-card">
          <div class="limit-name">Cushion (colchón)</div>
          <div class="limit-value">~${a.cushionHeight} ft AGL</div>
          <div class="limit-note">Colectivo arriba</div>
        </div>
      </div>

      <div class="perf-section-title" style="margin-top:16px">📏 Distancia Horizontal Aproximada en Autorrotación</div>
      <div class="perf-note">${a.note}</div>
      <div class="perf-table-wrapper">
        <table class="perf-table">
          <thead><tr>
            <th class="col-label">Alt. AGL</th>
            <th>90 KIAS (nm)</th>
            <th>60 KIAS (nm)</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>

      <div class="perf-section-title" style="margin-top:16px">⚠️ Curva H-V (Alturas y Velocidades Críticas)</div>
      <div class="calc-card" style="background:rgba(255,68,85,0.08);border:1px solid rgba(255,68,85,0.3);border-radius:10px;padding:14px">
        <div style="font-size:13px;color:var(--text-primary);line-height:1.7">
          La zona de altura/velocidad peligrosa (Dead Man's Curve) define las combinaciones de <strong>altitud AGL</strong> y
          <strong>velocidad de avance</strong> donde una falla de motor no garantiza autorrotación segura.<br><br>
          <strong style="color:#ff7a30">Zona más crítica:</strong> Altitudes entre 0-500 ft AGL combinadas con velocidades inferiores a 25-30 KIAS.<br>
          <strong style="color:#f5a623">Zona a evitar:</strong> Hover alto (>300 ft AGL) sin velocidad de avance.<br><br>
          <em style="color:var(--text-secondary)">Consultar siempre la curva H-V en la Sección 5 del POH oficial para valores exactos.</em>
        </div>
      </div>

      <div class="perf-section-title" style="margin-top:16px">⚡ Fases de la Autorrotación</div>
      ${[
        ['1. Entrada', 'Colectivo ABAJO inmediatamente al detectar falla. Throttle reducir. Tiempo disponible: ~1-2 seg antes de pérdida de RPM.'],
        ['2. Descenso estabilizado', 'Establecer 90 KIAS. RPM rotor EN VERDE (90-110%). Seleccionar zona de aterrizaje. Mantener airspeed con cíclico.'],
        ['3. Flare', 'A ~100 ft AGL: cíclico suave hacia atrás. La aeronave decelera y la RPM del rotor aumenta (almacena energía).'],
        ['4. Nivel y cushion', 'A ~10-15 ft AGL: cíclico al centro. A ~8 ft: colectivo ARRIBA para frenar descenso final con energía del rotor.'],
      ].map(([t,d]) => `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:8px">
          <div style="font-weight:700;color:var(--accent-amber);margin-bottom:4px">${t}</div>
          <div style="font-size:13px;color:var(--text-secondary)">${d}</div>
        </div>
      `).join('')}
    `;
  },

  _initTabInteractions(tab) {
    if (tab === 'da')   { setTimeout(() => this.calcDA(),    50); }
    if (tab === 'hover'){ setTimeout(() => this.checkHover(),50); }
    if (tab === 'fuel') { setTimeout(() => this.calcFuel(),  50); }
    if (tab === 'hv')   { setTimeout(() => this.drawHVCurve(), 80); }
  },

  /* ══════════════════════════════════════════════════════════════
     CURVA H-V (Altura–Velocidad) — Dinámica
     Zona de peligro según peso y altitud de densidad
     ══════════════════════════════════════════════════════════════ */

  /* Límite base de la zona de peligro — R44 II a MTOW 2500 lbs, ISA SL
     Puntos [kias, ft_AGL] que forman el borde SUPERIOR de la zona de peligro */
  HV_BASE: [
    {v: 0,  h: 80},   // inicio (límite inferior-izquierdo)
    {v: 0,  h: 490},  // arriba-izquierda
    {v: 5,  h: 478},
    {v: 10, h: 455},
    {v: 14, h: 440},
    {v: 18, h: 418},
    {v: 22, h: 380},
    {v: 25, h: 310},
    {v: 27, h: 210},
    {v: 28, h: 130},
    {v: 29, h: 55},
    {v: 30, h: 0},    // la curva toca el suelo a 30 KIAS
  ],

  /* Escalar la curva según peso y DA */
  _scaleHV(weight, da) {
    const wFactor  = Math.sqrt(weight / 2500);    // raíz cuadrada: suaviza el efecto
    const daFactor = 1 + (da / 50000);            // 2% más grande por cada 1000 ft DA
    const hScale   = wFactor * daFactor;
    const vScale   = 1 + (da / 300000);           // efecto mínimo en eje velocidad

    return this.HV_BASE.map(p => ({
      v: Math.round(p.v * vScale * 10) / 10,
      h: Math.round(p.h * hScale),
    }));
  },

  /* Verificar si un punto (speed, height) está dentro de la zona de peligro */
  _inDangerZone(speed, height, points) {
    // La zona de peligro está debajo de la curva y por encima del suelo
    // entre 0 KIAS y el punto donde la curva toca 0 ft
    const maxDangerSpeed = points[points.length - 1].v;
    if (speed > maxDangerSpeed) return false;  // fuera del rango X de peligro
    if (height <= 0) return false;              // en el suelo

    // Interpolar la altura de la curva en la velocidad dada
    let curveH = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i], p1 = points[i + 1];
      if (speed >= p0.v && speed <= p1.v) {
        const t = (speed - p0.v) / (p1.v - p0.v);
        curveH = p0.h + t * (p1.h - p0.h);
        break;
      }
    }
    // El punto está en peligro si su altura está por DEBAJO de la curva
    // y por ENCIMA del límite inferior (80 ft a 0 KIAS → 0 ft a ~15 KIAS)
    const minH = Math.max(0, 80 * (1 - speed / 15));
    return (height < curveH) && (height > minH || speed > 5);
  },

  _renderHV() {
    return `
      <div class="hv-layout">
        <div class="hv-controls-card">
          <div class="calc-title">⚠️ Parámetros de la Curva H-V</div>

          <div class="form-row">
            <label class="form-label">Peso bruto (lbs) <span id="hv-weight-kg" style="color:var(--accent-blue);font-size:10px">= 1134 kg</span></label>
            <input type="number" class="form-input" id="hv-weight" value="2500" min="1500" max="2500" step="50"
              oninput="PerfModule.drawHVCurve()">
          </div>
          <div class="form-row">
            <label class="form-label">Altitud de Densidad (ft)</label>
            <input type="number" class="form-input" id="hv-da" value="0" min="0" max="14000" step="100"
              oninput="PerfModule.drawHVCurve()">
          </div>

          <div style="border-top:1px solid var(--border);margin:14px 0 12px"></div>
          <div class="calc-title" style="color:var(--accent-blue)">📍 Mi Posición Actual</div>

          <div class="form-row">
            <label class="form-label">Velocidad indicada (KIAS)</label>
            <input type="number" class="form-input" id="hv-speed" value="" min="0" max="120" placeholder="—"
              oninput="PerfModule.drawHVCurve()">
          </div>
          <div class="form-row">
            <label class="form-label">Altura AGL (ft)</label>
            <input type="number" class="form-input" id="hv-height" value="" min="0" max="2000" placeholder="—"
              oninput="PerfModule.drawHVCurve()">
          </div>

          <div id="hv-position-status" class="hv-status-box hv-status-neutral" style="margin-top:10px">
            Ingrese velocidad y altura para evaluar su posición
          </div>

          <div style="border-top:1px solid var(--border);margin:14px 0 12px"></div>
          <div style="font-size:11px;color:var(--text-secondary);line-height:1.7">
            <div style="color:var(--accent-red);font-weight:700;margin-bottom:4px">ZONA ROJA = EVITAR</div>
            En esa zona, una falla de motor no garantiza autorrotación segura.
            <br><br>
            <div style="color:var(--accent-green);font-weight:700;margin-bottom:4px">ZONA VERDE = SEGURA</div>
            Suficiente altura o velocidad para autorrotación.
            <br><br>
            <div style="color:var(--accent-amber);font-weight:700;margin-bottom:4px">CURVA BLANCA = LÍMITE</div>
            Valores aproximados del POH. Siempre consultar los valores exactos en la Sección 5 del manual oficial.
            <br><br>
            <strong>Efectos del peso y DA:</strong><br>
            Mayor peso → zona más grande<br>
            Mayor DA → zona más grande
          </div>
        </div>

        <div class="hv-canvas-card">
          <div class="hv-canvas-header">
            🚨 CURVA H-V — ZONA DE ALTURA Y VELOCIDAD PELIGROSA — Robinson R44 II
          </div>
          <div class="hv-canvas-wrap">
            <canvas id="hv-canvas"></canvas>
          </div>
        </div>
      </div>
    `;
  },

  drawHVCurve() {
    const canvas = document.getElementById('hv-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    canvas.width  = Math.min(container.offsetWidth - 24, 700);
    canvas.height = Math.min(container.offsetHeight - 24, 480);

    const weight = parseFloat(document.getElementById('hv-weight')?.value) || 2500;
    const da     = parseFloat(document.getElementById('hv-da')?.value)     || 0;
    const speed  = parseFloat(document.getElementById('hv-speed')?.value);
    const height = parseFloat(document.getElementById('hv-height')?.value);
    const wKgEl = document.getElementById('hv-weight-kg');
    if (wKgEl) wKgEl.textContent = `= ${(weight * 0.4536).toFixed(0)} kg`;

    const c  = canvas.getContext('2d');
    const W  = canvas.width;
    const H  = canvas.height;
    const ml = 52, mr = 20, mt = 28, mb = 44;
    const pw = W - ml - mr;
    const ph = H - mt - mb;

    // Axis ranges
    const vMax = 65;   // KIAS
    const hMax = 700;  // ft AGL

    const xS = v => ml + (v / vMax) * pw;
    const yS = h => mt + (1 - h / hMax) * ph;

    // Scale the curve
    const pts = this._scaleHV(weight, da);
    const maxDangerV = pts[pts.length - 1].v;

    c.clearRect(0, 0, W, H);

    // ── Background: SAFE zone (green) ──
    c.fillStyle = '#080d18';
    c.fillRect(0, 0, W, H);

    // Draw safe zone (everything)
    c.fillStyle = 'rgba(0,200,130,0.10)';
    c.fillRect(ml, mt, pw, ph);

    // ── Draw DANGER zone ──
    // Build polygon: from first point going along the curve, then close at ground
    c.beginPath();
    c.moveTo(xS(0), yS(0));          // ground, left
    c.lineTo(xS(0), yS(pts[0].h));   // up to the bottom of the danger zone at 0 KIAS
    pts.forEach(p => c.lineTo(xS(p.v), yS(p.h)));  // along the curve
    c.lineTo(xS(maxDangerV), yS(0)); // down to ground at max danger speed
    c.closePath();

    const dangerGrad = c.createLinearGradient(ml, mt, ml + pw * 0.5, mt + ph);
    dangerGrad.addColorStop(0, 'rgba(255,50,60,0.60)');
    dangerGrad.addColorStop(1, 'rgba(220,30,50,0.30)');
    c.fillStyle = dangerGrad;
    c.fill();

    // ── Safe IGE hover zone (bottom-left triangle) ──
    c.beginPath();
    c.moveTo(xS(0), yS(0));
    c.lineTo(xS(0), yS(pts[0].h));
    c.lineTo(xS(pts[0].v + 2), yS(0));
    c.closePath();
    c.fillStyle = 'rgba(0,220,150,0.20)';
    c.fill();

    // ── Curve boundary line (white) ──
    c.beginPath();
    c.moveTo(xS(pts[0].v), yS(pts[0].h));
    pts.slice(1).forEach(p => c.lineTo(xS(p.v), yS(p.h)));
    c.strokeStyle = '#ffffff';
    c.lineWidth = 2.5;
    c.lineJoin = 'round';
    c.setLineDash([]);
    c.stroke();

    // ── Grid ──
    c.strokeStyle = 'rgba(255,255,255,0.08)';
    c.lineWidth = 1;
    for (let v = 0; v <= vMax; v += 10) {
      c.beginPath(); c.moveTo(xS(v), mt); c.lineTo(xS(v), mt + ph); c.stroke();
    }
    for (let h = 0; h <= hMax; h += 100) {
      c.beginPath(); c.moveTo(ml, yS(h)); c.lineTo(ml + pw, yS(h)); c.stroke();
    }

    // ── Axes ──
    c.strokeStyle = '#4a5a80';
    c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(ml, mt); c.lineTo(ml, mt + ph); c.stroke();
    c.beginPath(); c.moveTo(ml, mt + ph); c.lineTo(ml + pw, mt + ph); c.stroke();

    // ── Axis Labels ──
    c.fillStyle = '#8b9ab8';
    c.font = '11px monospace';
    c.textAlign = 'center';
    for (let v = 0; v <= vMax; v += 10) {
      c.fillText(v, xS(v), mt + ph + 16);
    }
    c.textAlign = 'right';
    for (let h = 0; h <= hMax; h += 100) {
      c.fillText(h, ml - 6, yS(h) + 4);
    }

    // Axis titles
    c.fillStyle = '#f5a623';
    c.font = 'bold 11px sans-serif';
    c.textAlign = 'center';
    c.fillText('VELOCIDAD INDICADA (KIAS)', ml + pw / 2, H - 6);
    c.save();
    c.translate(12, mt + ph / 2);
    c.rotate(-Math.PI / 2);
    c.fillText('ALTURA AGL (ft)', 0, 0);
    c.restore();

    // ── Labels on chart ──
    c.font = 'bold 12px sans-serif';
    c.fillStyle = 'rgba(255,80,80,0.9)';
    c.textAlign = 'center';
    c.fillText('ZONA A EVITAR', xS(12), yS(250));
    c.font = '10px sans-serif';
    c.fillText('Motor failure → no auto segura', xS(12), yS(215));

    c.fillStyle = 'rgba(0,220,150,0.9)';
    c.font = 'bold 11px sans-serif';
    c.textAlign = 'left';
    c.fillText('✓ ZONA SEGURA', xS(35), yS(600));
    c.fillText('✓ IGE seguro', xS(1), yS(50));

    // ── Title ──
    c.fillStyle = '#e4ecf7';
    c.font = 'bold 11px sans-serif';
    c.textAlign = 'center';
    c.fillText(`Curva H-V  |  ${weight.toLocaleString()} lbs / ${(weight*0.4536).toFixed(0)} kg  |  DA: ${da.toLocaleString()} ft`, ml + pw / 2, mt - 8);

    // ── User position marker ──
    const hasPos = !isNaN(speed) && !isNaN(height) && speed !== '' && height !== '';
    if (hasPos) {
      const inDanger = this._inDangerZone(speed, height, pts);
      const dotColor = inDanger ? '#ff4455' : '#00d4a1';
      const px = xS(Math.min(speed, vMax));
      const py = yS(Math.min(height, hMax));

      // Crosshairs
      c.strokeStyle = dotColor;
      c.lineWidth = 1;
      c.setLineDash([4, 4]);
      c.beginPath(); c.moveTo(px, mt); c.lineTo(px, mt + ph); c.stroke();
      c.beginPath(); c.moveTo(ml, py); c.lineTo(ml + pw, py); c.stroke();
      c.setLineDash([]);

      // Dot with pulse ring
      c.beginPath();
      c.arc(px, py, 10, 0, Math.PI * 2);
      c.fillStyle = dotColor + '33';
      c.fill();
      c.beginPath();
      c.arc(px, py, 6, 0, Math.PI * 2);
      c.fillStyle = dotColor;
      c.fill();
      c.strokeStyle = '#fff';
      c.lineWidth = 2;
      c.stroke();

      // Label
      const isLight = document.body.classList.contains('light-mode');
      c.font = 'bold 11px sans-serif';
      c.fillStyle = dotColor;
      const lx = px > ml + pw * 0.65 ? px - 12 : px + 12;
      c.textAlign = px > ml + pw * 0.65 ? 'right' : 'left';
      c.fillText(`${speed} KIAS`, lx, py - 12);
      c.fillText(`${height} ft AGL`, lx, py + 2);

      // Update status box
      const statusEl = document.getElementById('hv-position-status');
      if (statusEl) {
        statusEl.className = 'hv-status-box ' + (inDanger ? 'hv-status-danger' : 'hv-status-safe');
        statusEl.textContent = inDanger
          ? '⚠️ POSICIÓN EN ZONA DE PELIGRO — Evitar esta combinación altura/velocidad'
          : '✓ POSICIÓN SEGURA — Fuera de la zona de peligro H-V';
      }
    }
  }
};
