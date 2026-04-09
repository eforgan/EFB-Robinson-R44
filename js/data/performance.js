/* ══════════════════════════════════════════════════════════════
   EFB R44 II — Datos de Performance
   Basado en Robinson R44 II POH, Sección 5
   VALORES DE REFERENCIA — Verificar contra POH oficial
   ══════════════════════════════════════════════════════════════ */

const PERF_DATA = {

  /* ─── Limitaciones de Velocidad ─── */
  speeds: [
    { name: 'Vne — Velocidad Nunca Exceder',     value: '120 KIAS',  note: 'Se reduce ~3 KIAS cada 1000 ft sobre 3000 ft MSL' },
    { name: 'Vno — Velocidad Operación Normal',   value: '110 KIAS',  note: 'Velocidad máxima en turbulencia moderada' },
    { name: 'Vy — Mejor Tasa de Ascenso',         value: '65-70 KIAS',note: 'Velocidad óptima de subida' },
    { name: 'Vx — Mejor Ángulo de Ascenso',       value: '45-50 KIAS',note: 'Para superar obstáculos' },
    { name: 'Vauto — Autorrotación óptima',        value: '90 KIAS',   note: 'Glide ratio máximo en autorrotación' },
    { name: 'Velocidad máxima lateral',            value: '25 KIAS',   note: 'Vuelo lateral en cualquier dirección' },
    { name: 'Velocidad máxima hacia atrás',        value: '25 KIAS',   note: 'Vuelo atrás' },
    { name: 'Velocidad máxima con puertas abiertas','value': '60 KIAS',note: 'Con puertas sin asegurar' },
  ],

  /* ─── Limitaciones del Motor (Lycoming IO-540-AE1A5) ─── */
  engine: [
    { name: 'RPM máximas (motor)',         value: '2700 RPM',  category: 'RPM', note: 'Operación continua máxima' },
    { name: 'RPM rotor normal',            value: '102%',      category: 'RPM', note: '~528-532 RPM en rotor principal' },
    { name: 'RPM rotor — rango verde',     value: '90-110%',   category: 'RPM', note: '' },
    { name: 'RPM rotor — alarma',          value: '<90%',      category: 'RPM', note: 'BAJO RPM — acción inmediata' },
    { name: 'Temperatura de aceite máx',   value: '118°C (245°F)', category: 'Motor', note: 'Operación continua' },
    { name: 'Presión aceite — mínima',     value: '25 PSI',    category: 'Motor', note: 'En crucero' },
    { name: 'Presión aceite — máxima',     value: '95 PSI',    category: 'Motor', note: '' },
    { name: 'Presión aceite — en idle',    value: 'MIN 10 PSI',category: 'Motor', note: '' },
    { name: 'CHT máxima (Culata)',         value: '245°C (475°F)',category: 'Motor', note: 'Temperatura de culata' },
    { name: 'Potencia máxima continua',    value: '245 HP',    category: 'Motor', note: 'Lycoming IO-540-AE1A5' },
    { name: 'Combustible — tipo normal',   value: 'AVGAS 100LL',category: 'Comb.',note: 'Color azul' },
    { name: 'Combustible — alternativo',   value: 'AVGAS 100',  category: 'Comb.',note: 'Aprobado por Robinson' },
    { name: 'Aceite — viscosidad estándar','value': 'SAE 15W-50',category: 'Aceite', note: 'Ashless dispersant' },
    { name: 'Aceite — nivel mínimo',       value: '6 QT',      category: 'Aceite', note: 'Para vuelo' },
    { name: 'Aceite — capacidad total',    value: '8 QT',      category: 'Aceite', note: 'Máximo llenado' },
  ],

  /* ─── Hover OGE — Potencia requerida (% de potencia continua máx)
         Válido a 2500 lbs (MTOW) — Atmósfera estándar ISA
         Fuente: R44 II POH Section 5 (valores aproximados de referencia) ─── */
  hoverOGE: {
    weights: [2500, 2300, 2000, 1700],
    altitudes: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000],
    data: {
      2500: [ 84,  87,  90,  93,  97, 100, 104, 108, 113, 118, 123, 135],
      2300: [ 77,  80,  83,  86,  89,  93,  96, 100, 105, 109, 115, 126],
      2000: [ 68,  70,  73,  75,  78,  82,  85,  89,  93,  97, 101, 111],
      1700: [ 57,  60,  62,  65,  67,  70,  73,  77,  80,  84,  88,  97],
    },
    note: 'Valores >100% indican que NO es posible hover OGE a ese peso y altitud de densidad.'
  },

  /* ─── Hover IGE — Potencia requerida (%, skid height ~3 ft)
         Fuente: R44 II POH Section 5 (valores aproximados) ─── */
  hoverIGE: {
    weights: [2500, 2300, 2000, 1700],
    altitudes: [0, 2000, 4000, 6000, 8000, 10000, 12000],
    data: {
      2500: [ 72,  77,  83,  88,  95, 102, 110],
      2300: [ 66,  71,  76,  82,  88,  96, 103],
      2000: [ 58,  63,  68,  73,  79,  85,  92],
      1700: [ 50,  54,  59,  64,  69,  75,  81],
    },
    note: 'Basado en altura de skid de ~3 ft (IGE). Superficie plana y pavimentada.'
  },

  /* ─── Tasa de Ascenso (FPM) — a Vy (65-70 KIAS)
         Atmósfera estándar ISA — Fuente: R44 II POH Section 5 ─── */
  climbRate: {
    weights: [2500, 2300, 2000],
    altitudes: [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000],
    data: {
      2500: [1050,  875,  710,  555,  400,  250,  100,   '--'],
      2300: [1250, 1050,  880,  720,  565,  410,  255,   60],
      2000: [1500, 1300, 1110,  935,  760,  590,  420,  250],
    },
    note: 'A potencia máxima continua (245 HP). Atmósfera estándar ISA. "--" = no se puede mantener vuelo nivelado.'
  },

  /* ─── Performance de Crucero — 75% Potencia
         Combustible utilizable estándar: 29.5 US gal
         Reserva mínima: 45 min (≈ 5.5 gal a 75% potencia)
         Disponible para crucero: ≈ 24 gal ─── */
  cruiseTable: [
    { alt:     0, kias: 95, ktas:  95, ff: 13.2, range: 175, endur: 1.8 },
    { alt:  2000, kias: 94, ktas:  97, ff: 12.9, range: 183, endur: 1.9 },
    { alt:  4000, kias: 93, ktas:  99, ff: 12.6, range: 191, endur: 1.9 },
    { alt:  6000, kias: 91, ktas:  99, ff: 12.3, range: 196, endur: 2.0 },
    { alt:  8000, kias: 89, ktas:  99, ff: 12.0, range: 200, endur: 2.1 },
    { alt: 10000, kias: 87, ktas:  99, ff: 11.7, range: 204, endur: 2.1 },
  ],

  /* ─── Performance vs Potencia (a 4000 ft DA, 2500 lbs) ─── */
  powerTable: [
    { pct: 85, kias: 103, ktas: 110, ff: 14.5 },
    { pct: 75, kias:  93, ktas:  99, ff: 12.6 },
    { pct: 65, kias:  80, ktas:  85, ff: 11.0 },
    { pct: 55, kias:  65, ktas:  69, ff:  9.5 },
    { pct: 45, kias:  50, ktas:  53, ff:  8.2 },
  ],

  /* ─── Autorrotación ─── */
  autorotation: {
    bestSpeed: 90,          // KIAS — mejor glide ratio
    descentRate: 1600,      // FPM — tasa de descenso típica
    glideRatio: '4:1',      // Relación planeo horizontal:vertical (aprox)
    rpmRange: '90-110%',    // Rango RPM de rotor en autorrotación
    flareHeight: 40,        // ft AGL para iniciar flare
    cushionHeight: 8,       // ft AGL para colectivo cushion
    table: [
      { alt: 1000, fwd90: 0.9, fwd60: 0.6 },
      { alt: 2000, fwd90: 1.8, fwd60: 1.2 },
      { alt: 3000, fwd90: 2.7, fwd60: 1.8 },
      { alt: 5000, fwd90: 4.5, fwd60: 3.0 },
    ],
    note: 'Distancia horizontal aproximada en nm desde falla de motor hasta punto de aterrizaje. fwd90=90 KIAS, fwd60=60 KIAS.'
  },

  /* ─── Datos generales del avión para calculadoras ─── */
  aircraft: {
    maxGW:           2500,   // lbs
    fuelCapacity:    29.5,   // US gal usable (estándar)
    fuelAuxCapacity: 17.2,   // US gal tanque auxiliar (si instalado)
    fuelWeightPerGal: 6.0,   // lbs/gal (AVGAS 100LL)
    oilCapacity:      8.0,   // QT
    maxAlt:          14000,  // ft — techo de servicio aprox.
    hogeAlt2500:      6200,  // ft DA — aprox.  HOGE a MTOW
    higeAlt2500:      9400,  // ft DA — aprox.  HIGE a MTOW
  }
};
