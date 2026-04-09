/* ══════════════════════════════════════════════════════════════
   EFB R44 II — Datos de Peso y Balance
   Robinson R44 II POH, Sección 6
   Datum: Eje del rotor principal (centro del mástil)
   Brazos positivos = hacia la POPA (aft) del datum
   Brazos negativos = hacia la PROA (fwd) del datum
   VALORES APROXIMADOS — Verificar contra W&B del helicóptero específico
   ══════════════════════════════════════════════════════════════ */

const WB_DATA = {

  /*
   * Estaciones de carga (brazos en pulgadas desde datum = mástil rotor principal)
   * Los valores exactos varían según número de serie y equipos instalados.
   * Consultar siempre el Manual de Peso y Balance del helicóptero específico.
   */
  stations: [
    {
      id: 'bew',
      label: 'Peso Vacío Equipado (BEW)',
      labelShort: 'Peso Vacío',
      arm: null,         // Se ingresa junto al momento del W&B individual
      defaultWeight: 1470,
      defaultArm: 0.5,   // Varía según configuración (dato de referencia)
      unit: 'lbs',
      armUnit: 'in',
      fixed: true,
      note: 'Verificar en el libro de Peso y Balance del helicóptero'
    },
    {
      id: 'pilot',
      label: 'Piloto (asiento izquierdo delantero)',
      labelShort: 'Piloto',
      arm: -42.5,        // pulgadas adelante del datum
      defaultWeight: 190,
      unit: 'lbs',
      armUnit: 'in'
    },
    {
      id: 'copilot',
      label: 'Co-Piloto / Pasajero Delantero (derecho)',
      labelShort: 'Co-Piloto / Pax FWD',
      arm: -42.5,
      defaultWeight: 0,
      unit: 'lbs',
      armUnit: 'in'
    },
    {
      id: 'pax_rl',
      label: 'Pasajero Trasero Izquierdo',
      labelShort: 'Pax Trasero Izq.',
      arm: -3.5,
      defaultWeight: 0,
      unit: 'lbs',
      armUnit: 'in'
    },
    {
      id: 'pax_rr',
      label: 'Pasajero Trasero Derecho',
      labelShort: 'Pax Trasero Der.',
      arm: -3.5,
      defaultWeight: 0,
      unit: 'lbs',
      armUnit: 'in'
    },
    {
      id: 'fuel',
      label: 'Combustible (AVGAS 100LL)',
      labelShort: 'Combustible',
      arm: 5.5,
      defaultWeight: 120,  // lbs = ~20 gal
      unit: 'lbs',
      armUnit: 'in',
      fuelMode: true,      // Permite input en galones o lbs
      lbsPerGal: 6.0,
      maxGal: 29.5,        // Galones utilizables estándar
      note: '1 US Gal AVGAS = 6.0 lbs aprox.'
    },
    {
      id: 'baggage',
      label: 'Equipaje / Carga (compartimento trasero)',
      labelShort: 'Equipaje',
      arm: 13.5,
      defaultWeight: 0,
      maxWeight: 50,       // lbs máx equipaje (verificar POH)
      unit: 'lbs',
      armUnit: 'in'
    }
  ],

  /*
   * Envolvente de CG — R44 II
   * Puntos que definen el límite del envelope
   * (coordenadas: [arm_inches, weight_lbs])
   * Datum = mástil del rotor principal
   */
  cgEnvelope: {
    // Límite del envelope (vértices en orden)
    points: [
      // [arm, weight]
      [-3.0, 1500],   // Esquina delantera-liviana
      [-3.0, 2000],   // Límite delantero a 2000 lbs
      [-2.0, 2500],   // Esquina delantera-pesada (límite fwd se restringe)
      [ 3.5, 2500],   // Esquina trasera-pesada
      [ 3.5, 1500],   // Esquina trasera-liviana
    ],
    fwdLimit: [        // Límite delantero interpolado por peso
      { weight: 1500, arm: -3.0 },
      { weight: 2000, arm: -3.0 },
      { weight: 2500, arm: -2.0 },
    ],
    aftLimit: -3.5,    // No sobrepasa nunca este límite trasero (en todas las condiciones)
    maxWeight: 2500,   // lbs — MTOW
    minWeight: 1450,   // lbs — peso mínimo de operación aproximado
  },

  /*
   * Advertencias de W&B
   */
  limits: {
    maxGrossWeight: 2500,   // lbs
    fwdCGLimit: -3.0,       // pulgadas desde datum (límite máx a peso normal)
    fwdCGLimitMTOW: -2.0,   // pulgadas (límite más restrictivo a MTOW)
    aftCGLimit: 3.5,         // pulgadas desde datum
    maxBaggage: 50,          // lbs — compartimento trasero
  },

  /*
   * Datos de combustible
   */
  fuel: {
    usable: 29.5,           // US gal — capacidad utilizable estándar
    unusable: 0.5,          // US gal — no utilizable
    total: 30.0,            // US gal — total del tanque estándar
    auxUsable: 17.2,        // US gal — tanque auxiliar (si instalado)
    lbsPerGal: 6.0,         // AVGAS 100LL a 15°C aprox.
  }
};
