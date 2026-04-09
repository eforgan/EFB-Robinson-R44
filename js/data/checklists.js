/* ══════════════════════════════════════════════════════════════
   EFB R44 II — Datos de Checklists
   Basado en Robinson R44 II Pilot's Operating Handbook
   SOLO REFERENCIA — Verificar contra POH oficial del helicóptero
   ══════════════════════════════════════════════════════════════ */

const CHECKLISTS = {

  normal: [

    {
      id: 'preflight',
      title: 'INSPECCIÓN PRE-VUELO',
      subtitle: 'Walk-around completo — Robinson R44 II',
      icon: '🔍',
      sections: [
        {
          title: 'DOCUMENTACIÓN',
          items: [
            { action: 'Certificado de aeronavegabilidad', value: 'A BORDO Y VIGENTE' },
            { action: 'Certificado de matrícula', value: 'A BORDO' },
            { action: 'Manual de operaciones (POH)', value: 'A BORDO' },
            { action: 'Radiolicencia de estación', value: 'A BORDO Y VIGENTE' },
            { action: 'Manual de peso y balance', value: 'A BORDO Y ACTUALIZADO' },
            { action: 'Licencia de piloto y habilitaciones', value: 'VIGENTES' },
            { action: 'Libreta de vuelo', value: 'ACTUALIZADA' },
            { action: 'Libro técnico de la aeronave', value: 'VERIFICAR ÚLTIMAS ENTRADAS' },
          ]
        },
        {
          title: 'CABINA — INTERIOR',
          items: [
            { action: 'Interruptor de batería (Battery)', value: 'OFF', note: 'Mantener en OFF durante inspección exterior' },
            { action: 'Interruptores de circuito (Circuit breakers)', value: 'ENTRADOS (IN)' },
            { action: 'Colectivo', value: 'ABAJO Y TRABADO' },
            { action: 'Freno de rotor (Rotor brake)', value: 'LIBRE (OFF)' },
            { action: 'Controles de vuelo', value: 'LIBRE Y CORRECTO RECORRIDO' },
            { action: 'Combustible (gauge)', value: 'VERIFICAR CANTIDAD' },
            { action: 'Extintor de incendios', value: 'EN SU LUGAR Y CARGADO' },
            { action: 'Botiquín de primeros auxilios', value: 'EN SU LUGAR' },
          ]
        },
        {
          title: 'ROTOR PRINCIPAL',
          items: [
            { action: 'Palas del rotor — condición general', value: 'SIN DAÑOS, GRIETAS NI DELAMINACIONES' },
            { action: 'Palas — borde de ataque', value: 'SIN DAÑOS' },
            { action: 'Palas — borde de salida', value: 'SIN DAÑOS' },
            { action: 'Cabezal del rotor (Rotor hub)', value: 'SIN JUEGO EXCESIVO' },
            { action: 'Articulaciones de paso (Pitch links)', value: 'FIJADAS, SIN JUEGO' },
            { action: 'Plato oscilante (Swashplate)', value: 'LIMPIO, SIN DAÑOS' },
            { action: 'Mástil del rotor (Mast)', value: 'SIN GRIETAS NI DAÑOS' },
            { action: 'Pernos y tuercas de palas', value: 'SEGUROS, PASADORES EN SU LUGAR' },
          ]
        },
        {
          title: 'MOTOR Y COMPARTIMENTO',
          items: [
            { action: 'Aceite del motor — nivel', value: 'MÍNIMO 6 QT, MÁXIMO 8 QT' },
            { action: 'Aceite — tapón y tubo de llenado', value: 'ASEGURADO' },
            { action: 'Aceite — fugas visibles', value: 'NINGUNA' },
            { action: 'Filtro de aceite', value: 'SIN FUGAS' },
            { action: 'Mangueras y conexiones', value: 'SIN DAÑOS, SIN FUGAS' },
            { action: 'Bujías de encendido', value: 'CONEXIONES SEGURAS' },
            { action: 'Sistema de escape', value: 'SEGURO, SIN GRIETAS' },
            { action: 'Filtro de aire del carburador/admisión', value: 'LIMPIO Y EN SU LUGAR' },
            { action: 'Ventilación del cárter', value: 'LIBRE Y SIN OBSTRUCCIÓN' },
            { action: 'Arnés eléctrico del motor', value: 'SIN DAÑOS, ASEGURADO' },
          ]
        },
        {
          title: 'SISTEMA DE EMBRAGUE Y TRANSMISIÓN',
          items: [
            { action: 'Correas V (V-belts)', value: 'EN SU LUGAR, SIN GRIETAS NI DESGASTE EXCESIVO' },
            { action: 'Tensión de correas', value: 'CORRECTA' },
            { action: 'Caja de transmisión principal — aceite', value: 'NIVEL CORRECTO (SIGHT GLASS)' },
            { action: 'Caja de cola — aceite', value: 'NIVEL CORRECTO' },
            { action: 'Eje de cola (Tail drive shaft)', value: 'SEGURO, SIN DAÑOS' },
            { action: 'Articulaciones de cola', value: 'ASEGURADAS' },
          ]
        },
        {
          title: 'SISTEMA DE COMBUSTIBLE',
          items: [
            { action: 'Combustible — tipo', value: 'AVGAS 100LL (azul) o APROBADO' },
            { action: 'Combustible — drenar sump izquierdo', value: 'DRENAR, VERIFICAR SIN AGUA/SEDIMENTOS' },
            { action: 'Combustible — drenar sump derecho', value: 'DRENAR, VERIFICAR SIN AGUA/SEDIMENTOS' },
            { action: 'Tapas de combustible', value: 'ASEGURADAS Y SIN FUGAS' },
            { action: 'Tubería de combustible visible', value: 'SIN FUGAS' },
          ]
        },
        {
          title: 'ROTOR DE COLA Y BOOM',
          items: [
            { action: 'Rotor de cola — palas', value: 'SIN DAÑOS, LIBRE DE OBSTRUCCIONES' },
            { action: 'Rotor de cola — cabezal', value: 'ASEGURADO, SIN JUEGO EXCESIVO' },
            { action: 'Timón de cola (Vertical stabilizer)', value: 'SIN DAÑOS' },
            { action: 'Estabilizadores horizontales', value: 'ASEGURADOS, SIN DAÑOS' },
            { action: 'Boom de cola', value: 'SIN GRIETAS, DAÑOS NI CORROSIÓN' },
          ]
        },
        {
          title: 'TREN DE ATERRIZAJE Y ESTRUCTURA',
          items: [
            { action: 'Patines (Skids)', value: 'SIN DAÑOS, TUBOS Y SOLDADURAS CORRECTOS' },
            { action: 'Amortiguadores de patín', value: 'EN SU LUGAR, SIN DAÑOS' },
            { action: 'Fuselaje — condición general', value: 'SIN GRIETAS, DAÑOS NI CORROSIÓN' },
            { action: 'Puertas y bisagras', value: 'SIN DAÑOS, BISAGRAS ASEGURADAS' },
            { action: 'Luces de posición (NAV)', value: 'EN SU LUGAR Y EN CONDICIÓN' },
            { action: 'Luz anticolisión (Strobe)', value: 'EN SU LUGAR' },
            { action: 'Faro de aterrizaje (si instalado)', value: 'EN SU LUGAR' },
          ]
        }
      ]
    },

    {
      id: 'before-start',
      title: 'ANTES DEL ENCENDIDO',
      subtitle: 'Pre-start checks — cockpit',
      icon: '🔋',
      sections: [
        {
          title: 'TRIPULANTES Y PASAJEROS',
          items: [
            { action: 'Cinturones de seguridad', value: 'ABROCHADOS Y AJUSTADOS' },
            { action: 'Puertas', value: 'CERRADAS Y ASEGURADAS' },
            { action: 'Briefing a pasajeros', value: 'COMPLETADO' },
            { action: 'Equipo suelto en cabina', value: 'ASEGURADO' },
          ]
        },
        {
          title: 'CONTROLES Y SWITCHES',
          items: [
            { action: 'Freno de rotor', value: 'LIBRE (OFF)', note: 'Verificar que el rotor pueda girar' },
            { action: 'Colectivo', value: 'COMPLETAMENTE ABAJO Y TRABADO' },
            { action: 'Throttle (acelerador)', value: 'COMPLETAMENTE CERRADO (ROLLED BACK)' },
            { action: 'Cortacombustible (Fuel shutoff)', value: 'ON (ABIERTO)' },
            { action: 'Mezcla (Mixture)', value: 'RICH (COMPLETA)' },
            { action: 'Calefacción de carburador', value: 'FRÍO (OFF)', note: 'Solo para motores carburados — el IO-540 es inyectado' },
            { action: 'Interruptor de batería', value: 'ON' },
            { action: 'Cantidad de combustible en gauges', value: 'VERIFICAR Y COMPARAR CON INSPECCION VISUAL' },
            { action: 'Radios y aviónica', value: 'OFF (durante arranque)' },
            { action: 'Gobernador de RPM (Governor)', value: 'OFF (para arranque)' },
            { action: 'Alternador', value: 'OFF (para arranque)', note: 'Se activa después del arranque' },
          ]
        },
        {
          title: 'ÁREA CIRCUNDANTE',
          items: [
            { action: 'Área libre de obstáculos y personas', value: 'VERIFICADO', note: 'Distancia mínima segura al rotor' },
            { action: 'Dirección del viento', value: 'VERIFICADO' },
            { action: 'Permiso de arranque (si en pista controlada)', value: 'OBTENIDO' },
          ]
        }
      ]
    },

    {
      id: 'engine-start',
      title: 'ARRANQUE DEL MOTOR',
      subtitle: 'Engine start procedure — Lycoming IO-540',
      icon: '🔑',
      sections: [
        {
          title: 'SECUENCIA DE ARRANQUE',
          items: [
            { action: 'Área — anunciar "CLEAR"', value: 'CONFIRMAR ÁREA LIBRE', note: 'Esperar confirmación antes de continuar' },
            { action: 'Throttle', value: 'COMPLETAMENTE CERRADO luego 1/2 pulgada abierto' },
            { action: 'Llave de ignición (Magneto key)', value: 'START — soltar al encendido', note: 'No activar starter más de 30 segundos seguidos' },
            { action: 'Motor encendido — throttle', value: 'AUMENTAR SUAVEMENTE A 1000-1200 RPM' },
            { action: 'Presión de aceite', value: 'VERIFICAR — DEBE SUBIR EN 30 SEGUNDOS', note: 'Si no sube en 30 seg: APAGAR MOTOR' },
            { action: 'RPM motor', value: 'ESTABILIZAR EN 1000-1200 RPM' },
          ]
        },
        {
          title: 'POST-ARRANQUE INMEDIATO',
          items: [
            { action: 'Temperatura de culata (CHT)', value: 'OBSERVAR SUBIDA GRADUAL' },
            { action: 'Temperatura de aceite', value: 'OBSERVAR SUBIDA GRADUAL' },
            { action: 'Presión de aceite', value: 'EN RANGO VERDE' },
            { action: 'Voltaje / Amperímetro', value: 'NORMAL' },
            { action: 'Alternador', value: 'ON' },
            { action: 'Radios/Aviónica', value: 'ON (si necesario)' },
            { action: 'Gobernador (Governor)', value: 'ON — después de 1 min de rodaje en idle' },
          ]
        }
      ]
    },

    {
      id: 'warmup',
      title: 'CALENTAMIENTO Y BEFORE TAKEOFF',
      subtitle: 'Engine warm-up and pre-takeoff checks',
      icon: '🌡️',
      sections: [
        {
          title: 'CALENTAMIENTO DEL MOTOR',
          items: [
            { action: 'RPM motor en calentamiento', value: '1000-1500 RPM' },
            { action: 'Temperatura de aceite', value: 'ESPERAR MÍNIMO 50°C (120°F) antes de despegue', note: 'En clima frío, tiempo de calentamiento puede ser varios minutos' },
            { action: 'CHT (Cylinder Head Temp)', value: 'EN RANGO NORMAL' },
            { action: 'Tiempo mínimo de calentamiento', value: 'NO MENOS DE 2 MINUTOS EN IDLE' },
          ]
        },
        {
          title: 'PRUEBA DE GOBERNADOR Y FRICIÓN',
          items: [
            { action: 'Colectivo — levantar suavemente', value: 'VERIFICAR RPM ROTOR ESTABLE ~102%' },
            { action: 'Gobernador', value: 'VERIFICAR FUNCIONAMIENTO — RPM SE MANTIENE' },
            { action: 'Sistema hidráulico (si equipado)', value: 'VERIFICAR — CONTROLES SIN RESISTENCIA EXCESIVA' },
            { action: 'Controles de vuelo — recorrido completo', value: 'LIBRE, CORRECTO Y SIN INTERFERENCIAS' },
          ]
        },
        {
          title: 'PRUEBA DE MAGNETOS',
          items: [
            { action: 'Throttle', value: 'INCREMENTAR A 2000 RPM' },
            { action: 'Magneto LEFT — verificar caída RPM', value: 'MÁXIMO 125 RPM DE CAÍDA' },
            { action: 'Magneto BOTH', value: 'RPM RECUPERA' },
            { action: 'Magneto RIGHT — verificar caída RPM', value: 'MÁXIMO 125 RPM DE CAÍDA' },
            { action: 'Magneto BOTH', value: 'AMBOS MAGNETOS OPERATIVOS' },
            { action: 'Diferencia entre magnetos', value: 'MÁXIMO 50 RPM DE DIFERENCIA' },
            { action: 'Throttle', value: 'REDUCIR A IDLE' },
          ]
        },
        {
          title: 'VERIFICACIONES FINALES PRE-DESPEGUE',
          items: [
            { action: 'Temperatura de aceite', value: 'EN RANGO VERDE' },
            { action: 'Presión de aceite', value: 'EN RANGO VERDE' },
            { action: 'CHT', value: 'EN RANGO VERDE' },
            { action: 'Combustible remanente', value: 'SUFICIENTE PARA VUELO + RESERVA (45 MIN)' },
            { action: 'Cortacombustible (Fuel shutoff)', value: 'ON' },
            { action: 'Cinturones', value: 'ABROCHADOS' },
            { action: 'Puertas', value: 'CERRADAS Y ASEGURADAS' },
            { action: 'Altímetro', value: 'AJUSTADO A PRESIÓN LOCAL (QNH)' },
            { action: 'Radio', value: 'FRECUENCIA CORRECTA' },
            { action: 'Transpondedor', value: 'CÓDIGO CORRECTO Y EN ALT' },
            { action: 'Viento y obstáculos', value: 'VERIFICADOS' },
          ]
        }
      ]
    },

    {
      id: 'takeoff',
      title: 'DESPEGUE',
      subtitle: 'Takeoff procedure',
      icon: '🚁',
      sections: [
        {
          title: 'VUELO ESTACIONARIO (HOVER CHECK)',
          items: [
            { action: 'Potencia requerida para hover', value: 'VERIFICAR — DENTRO DE LÍMITES', note: 'Si hay duda de performance, consultar tablas antes de despegue' },
            { action: 'RPM rotor en hover', value: '~102% (EN VERDE)', note: 'Gobernador mantiene RPM' },
            { action: 'Controles de vuelo', value: 'RESPUESTA NORMAL' },
            { action: 'Estado de la aeronave en hover', value: 'SIN VIBRACIONES ANORMALES' },
            { action: 'Altura de hover IGE check', value: 'A ~3-5 FT DE ALTURA' },
          ]
        },
        {
          title: 'DESPEGUE NORMAL (OGE)',
          items: [
            { action: 'Área de despegue', value: 'LIBRE DE OBSTÁCULOS Y PERSONAS' },
            { action: 'Colectivo', value: 'INCREMENTAR SUAVEMENTE' },
            { action: 'Cíclico', value: 'INCLINAR SUAVEMENTE HACIA ADELANTE PARA GANAR VELOCIDAD' },
            { action: 'Velocidad de transición', value: 'ATRAVESAR SMOOTHLY — ~15-20 KIAS' },
            { action: 'Efectos de vórtice (VRS)', value: 'EVITAR DESCENSO VERTICAL SIN VELOCIDAD DE AVANCE' },
          ]
        }
      ]
    },

    {
      id: 'cruise',
      title: 'CRUCERO',
      subtitle: 'Cruise configuration',
      icon: '✈️',
      sections: [
        {
          title: 'CONFIGURACIÓN DE CRUCERO',
          items: [
            { action: 'Altitud de crucero', value: 'ALCANZADA Y ESTABLECIDA' },
            { action: 'RPM rotor', value: '~102% (EN VERDE)' },
            { action: 'Potencia de crucero', value: '65-75% POTENCIA NORMAL' },
            { action: 'Velocidad de crucero', value: '90-110 KIAS (VERIFICAR Vne SEGÚN ALTITUD)' },
            { action: 'Temperatura de aceite', value: 'EN RANGO VERDE' },
            { action: 'Presión de aceite', value: 'EN RANGO VERDE' },
            { action: 'CHT (Temperatura culata)', value: 'EN RANGO VERDE (MAX 245°C/470°F)' },
            { action: 'Temperatura de caja de transmisión', value: 'EN RANGO VERDE (si hay indicador)' },
            { action: 'Combustible — cantidad y selector', value: 'VERIFICAR CONSUMO VS. PLAN' },
            { action: 'Altímetro', value: 'VERIFICAR — AJUSTAR QNH SI ES NECESARIO' },
            { action: 'Luces (según VMC nocturno)', value: 'POSICIÓN Y ANTICOLISIÓN — ON' },
          ]
        },
        {
          title: 'MONITOREO PERIÓDICO (cada 15-20 min)',
          items: [
            { action: 'Combustible remanente', value: 'VERIFICAR' },
            { action: 'Instrumentos de motor', value: 'EN RANGO VERDE' },
            { action: 'Navegación', value: 'EN RUTA / VERIFICAR POSICIÓN' },
            { action: 'METAR/TAF', value: 'MONITOREAR CONDICIONES METEOROLÓGICAS' },
          ]
        }
      ]
    },

    {
      id: 'descent-landing',
      title: 'DESCENSO Y ATERRIZAJE',
      subtitle: 'Descent and landing checks',
      icon: '🛬',
      sections: [
        {
          title: 'DESCENSO',
          items: [
            { action: 'Potencia', value: 'REDUCIR GRADUALMENTE' },
            { action: 'Velocidad de descenso', value: 'NO EXCEDER Vne PARA LA ALTITUD' },
            { action: 'RPM rotor', value: 'EN VERDE (gobernador activo)' },
            { action: 'Temperatura de aceite', value: 'MONITOREAR (no descender muy rápido con poco poder)' },
            { action: 'Altímetro', value: 'AJUSTAR A QNH LOCAL' },
          ]
        },
        {
          title: 'APROXIMACIÓN',
          items: [
            { action: 'Viento y condiciones del área de aterrizaje', value: 'EVALUAR' },
            { action: 'Obstáculos en final', value: 'IDENTIFICADOS' },
            { action: 'Velocidad de aproximación', value: '60-80 KIAS — REDUCIR PROGRESIVAMENTE' },
            { action: 'Transición a hover', value: 'A ~40-50 FT AGL — FLARE SUAVE' },
            { action: 'RPM rotor en hover', value: 'VERIFICAR EN VERDE' },
          ]
        },
        {
          title: 'ATERRIZAJE',
          items: [
            { action: 'Hover estacionario', value: 'ESTABLECIDO A 5 FT AGL' },
            { action: 'Área de toque', value: 'LIBRE, FIRME, SIN PENDIENTE EXCESIVA' },
            { action: 'Colectivo', value: 'BAJAR SUAVEMENTE PARA DESCENSO' },
            { action: 'Contacto con suelo', value: 'SUAVE — COLECTIVO COMPLETAMENTE ABAJO' },
            { action: 'Anti-torque (pedales)', value: 'NEUTRAL AL CONTACTO' },
            { action: 'Colectivo trabado', value: 'VERIFICAR TRABADO ABAJO' },
          ]
        }
      ]
    },

    {
      id: 'shutdown',
      title: 'PARADA DEL MOTOR',
      subtitle: 'Engine shutdown procedure',
      icon: '🔴',
      sections: [
        {
          title: 'ENFRIAMIENTO',
          items: [
            { action: 'Motor — ralentí (1000 RPM)', value: '2 MINUTOS MÍNIMO', note: 'Permite enfriamiento gradual de turbos y culatas' },
            { action: 'Temperaturas', value: 'VERIFICAR BAJANDO A VALORES NORMALES' },
            { action: 'Gobernador', value: 'OFF' },
          ]
        },
        {
          title: 'SECUENCIA DE PARADA',
          items: [
            { action: 'Radios y aviónica', value: 'OFF' },
            { action: 'Cortacombustible (Fuel shutoff)', value: 'OFF (CERRAR)', note: 'Dejar que el motor se pare por falta de combustible' },
            { action: 'Motor parado', value: 'VERIFICAR RPM = 0' },
            { action: 'Llave de ignición (Magnetos)', value: 'OFF (BOTH OFF)' },
            { action: 'Alternador', value: 'OFF' },
            { action: 'Batería', value: 'OFF' },
            { action: 'Freno de rotor', value: 'APLICAR — frenar rotor gradualmente', note: 'No aplicar bruscamente' },
            { action: 'Colectivo', value: 'COMPLETAMENTE ABAJO Y TRABADO' },
          ]
        },
        {
          title: 'POST-PARADA',
          items: [
            { action: 'Pasajeros — desembarco', value: 'ESPERAR PARADA TOTAL DEL ROTOR', note: 'NUNCA desembarcar con rotor girando' },
            { action: 'Combustible remanente', value: 'ANOTAR EN LIBRO TÉCNICO' },
            { action: 'Anomalías', value: 'REGISTRAR EN LIBRO TÉCNICO' },
            { action: 'Seguro de palas (Blade ties)', value: 'COLOCAR SI ES NECESARIO' },
            { action: 'Cubierta del motor (si disponible)', value: 'COLOCAR SI SE DEJA LARGO TIEMPO' },
          ]
        }
      ]
    }
  ],

  emergency: [

    {
      id: 'engine-failure-high',
      title: 'FALLA DE MOTOR — ALTA ALTITUD',
      subtitle: 'Por encima de 500 ft AGL — Entrada a autorrotación',
      icon: '⚠️',
      isEmergency: true,
      sections: [
        {
          title: '⚡ ACCIÓN INMEDIATA',
          items: [
            { action: 'Colectivo', value: 'BAJAR INMEDIATAMENTE', note: 'Acción crítica: previene pérdida de RPM del rotor', isEmergency: true },
            { action: 'Throttle', value: 'REDUCIR AL MÍNIMO (RODAR HACIA ATRÁS)', note: 'Previene sobre-velocidad del rotor al bajar colectivo', isEmergency: true },
            { action: 'RPM del rotor', value: 'MANTENER EN VERDE (90-110%)', isEmergency: true },
            { action: 'Velocidad de descenso', value: '80-90 KIAS — AUTORROTACIÓN ÓPTIMA', isEmergency: true },
          ]
        },
        {
          title: 'ACCIONES SECUNDARIAS',
          items: [
            { action: 'Cortacombustible', value: 'CONSIDERAR OFF (si hay incendio o falla de motor confirmada)' },
            { action: 'Mayday', value: 'DECLARAR "MAYDAY MAYDAY MAYDAY" — informar posición', note: 'Si tiempo lo permite' },
            { action: 'Transpondedor', value: 'CÓDIGO 7700' },
            { action: 'Área de aterrizaje', value: 'IDENTIFICAR — CAMPO ABIERTO, RUTA, PLAYA, etc.' },
            { action: 'Pasajeros', value: 'INFORMAR "BRACE FOR LANDING"' },
          ]
        },
        {
          title: 'FLARE Y ATERRIZAJE',
          items: [
            { action: 'A ~100 ft AGL', value: 'COMENZAR FLARE — cíclico hacia atrás', note: 'Velocidad decrece, RPM del rotor aumenta' },
            { action: 'A ~10 ft AGL', value: 'COLECTIVO — LEVANTAR para frenar descenso' },
            { action: 'Reducir velocidad a', value: '0 KIAS CON CÍCLICO AL CENTRO' },
            { action: 'Aterrizaje', value: 'COLECTIVO — LEVANTAR COMPLETAMENTE PARA CUSHION' },
          ]
        },
        {
          warning: 'CRÍTICO: La RPM del rotor es TODO. Sin RPM no hay autorrotación. Bajar el colectivo es la primera y más importante acción.'
        }
      ]
    },

    {
      id: 'engine-failure-low',
      title: 'FALLA DE MOTOR — BAJA ALTITUD',
      subtitle: 'Menos de 500 ft AGL — Procedimiento de emergencia',
      icon: '🔴',
      isEmergency: true,
      sections: [
        {
          title: '⚡ ACCIÓN INMEDIATA',
          items: [
            { action: 'Colectivo', value: 'BAJAR INMEDIATAMENTE', isEmergency: true },
            { action: 'Throttle', value: 'MÍNIMO', isEmergency: true },
            { action: 'Aterrizaje', value: 'EN EL ÁREA DISPONIBLE MÁS CERCANA', isEmergency: true },
          ]
        },
        {
          title: 'NOTA ESPECIAL — ALTURA CRÍTICA (Dead Man\'s Curve)',
          items: [
            { action: 'Zona de altura/velocidad peligrosa', value: 'CONSULTAR GRÁFICO H-V DEL POH', note: 'Alturas entre 0-500 ft AGL y bajas velocidades son las más críticas' },
            { action: 'Si hay velocidad de avance suficiente', value: 'USAR VELOCIDAD PARA AMPLIAR ZONA DE ATERRIZAJE' },
          ]
        },
        {
          warning: 'Debajo de 500 ft AGL el tiempo de reacción es CRÍTICO. No hay tiempo para diagnóstico — bajar colectivo es INSTINTIVO.'
        }
      ]
    },

    {
      id: 'low-rpm',
      title: 'ALARMA DE BAJA RPM',
      subtitle: 'Low Rotor RPM Warning',
      icon: '🔔',
      isEmergency: true,
      sections: [
        {
          title: '⚡ ACCIÓN INMEDIATA',
          items: [
            { action: 'Colectivo', value: 'BAJAR PARA RECUPERAR RPM', isEmergency: true },
            { action: 'Throttle', value: 'VERIFICAR — AUMENTAR SI ES NECESARIO' },
            { action: 'RPM rotor', value: 'RECUPERAR A RANGO VERDE (90-110%)' },
          ]
        },
        {
          title: 'ANÁLISIS DE CAUSAS',
          items: [
            { action: 'Governor', value: 'VERIFICAR QUE ESTÉ ON Y FUNCIONANDO' },
            { action: 'Falla del gobernador', value: 'CONTROLAR RPM MANUALMENTE CON THROTTLE' },
            { action: 'Si RPM no se recupera', value: 'PROCEDER COMO FALLA DE MOTOR — PREPARAR AUTORROTACIÓN' },
          ]
        },
        {
          warning: 'La alarma de baja RPM es una señal de peligro inmediato. La respuesta debe ser automática: BAJAR COLECTIVO.'
        }
      ]
    },

    {
      id: 'tail-rotor-failure',
      title: 'FALLA DEL ROTOR DE COLA',
      subtitle: 'Tail rotor failure / loss of tail rotor effectiveness',
      icon: '🌀',
      isEmergency: true,
      sections: [
        {
          title: '⚡ TIPOS Y ACCIONES',
          items: [
            { action: 'Pérdida completa de control de cola', value: 'LA AERONAVE GIRARÁ — CONTROLAR POTENCIA', isEmergency: true },
            { action: 'Si potencia baja', value: 'EL GIRO PUEDE CONTROLARSE PARCIALMENTE' },
            { action: 'Aterrizaje inmediato', value: 'BUSCAR ÁREA Y ATERRIZAR', isEmergency: true },
          ]
        },
        {
          title: 'PROCEDIMIENTO SEGÚN ALTITUD',
          items: [
            { action: 'Alta velocidad — falla de cola en crucero', value: 'REDUCIR POTENCIA — EL TRIM DE COLA PUEDE AYUDAR', note: 'Las aletas de estabilización ayudan en vuelo hacia adelante' },
            { action: 'Hover o baja velocidad', value: 'MÁS CRÍTICO — ATERRIZAR INMEDIATAMENTE' },
            { action: 'Autorrotación', value: 'SI NO SE PUEDE CONTROLAR LA AERONAVE' },
          ]
        },
        {
          warning: 'Diferenciar entre falla mecánica (pérdida de control total) y LTE (Loss of Tail Rotor Effectiveness) que se remedia con velocidad de avance.'
        }
      ]
    },

    {
      id: 'hydraulic-failure',
      title: 'FALLA SISTEMA HIDRÁULICO',
      subtitle: 'Hydraulic system failure — R44 II',
      icon: '💧',
      isEmergency: true,
      sections: [
        {
          title: '⚡ SÍNTOMAS Y ACCIONES',
          items: [
            { action: 'Señal de falla hidráulica', value: 'LUZ DE ADVERTENCIA — HYD' },
            { action: 'Controles de vuelo', value: 'AUMENTARÁ RESISTENCIA EN LOS CONTROLES', note: 'Se puede volar sin hidráulico pero con mayor fuerza' },
            { action: 'Velocidad', value: 'REDUCIR A 60-80 KIAS — CONTROLES MÁS FÁCILES A MENOR VELOCIDAD', isEmergency: true },
          ]
        },
        {
          title: 'PROCEDIMIENTO',
          items: [
            { action: 'Aterrizaje', value: 'PROCEDER A ATERRIZAJE PRECAUTORIO LO ANTES POSIBLE' },
            { action: 'Acercamiento', value: 'VELOCIDAD REDUCIDA — EVITAR MANIOBRAS BRUSCAS' },
            { action: 'Notificar', value: 'ATC / BASE — DECLARA URGENCIA (PAN PAN)' },
          ]
        },
        {
          warning: 'El R44 II puede volar sin hidráulico pero el esfuerzo en los controles aumenta significativamente. Aterrizar lo antes posible.'
        }
      ]
    },

    {
      id: 'governor-failure',
      title: 'FALLA DEL GOBERNADOR',
      subtitle: 'Governor failure or malfunction',
      icon: '⚙️',
      isEmergency: true,
      sections: [
        {
          title: 'SÍNTOMAS',
          items: [
            { action: 'RPM del rotor', value: 'INESTABLE O FUERA DE RANGO' },
            { action: 'Throttle', value: 'NO RESPONDE NORMALMENTE' },
          ]
        },
        {
          title: '⚡ ACCIONES',
          items: [
            { action: 'Governor switch', value: 'OFF', isEmergency: true },
            { action: 'Throttle', value: 'CONTROLAR MANUALMENTE PARA MANTENER RPM EN VERDE', isEmergency: true },
            { action: 'RPM objetivo', value: '102% ROTOR RPM', note: 'Sin gobernador, el piloto controla RPM con throttle' },
            { action: 'Aterrizaje', value: 'PROCEDER A ATERRIZAJE EN EL PRIMER AERÓDROMO ADECUADO' },
          ]
        },
        {
          warning: 'Sin gobernador, el control del RPM del rotor depende 100% del piloto a través del throttle. Coordinar colectivo y throttle manualmente.'
        }
      ]
    },

    {
      id: 'engine-fire-flight',
      title: 'INCENDIO DE MOTOR EN VUELO',
      subtitle: 'Engine fire in flight',
      icon: '🔥',
      isEmergency: true,
      sections: [
        {
          title: '⚡ ACCIONES INMEDIATAS',
          items: [
            { action: 'Cortacombustible (Fuel shutoff)', value: 'OFF', isEmergency: true },
            { action: 'Mezcla (Mixture)', value: 'LEAN / OFF (si aplica)', isEmergency: true },
            { action: 'Throttle', value: 'CERRADO', isEmergency: true },
            { action: 'Aterrizaje de emergencia', value: 'INMEDIATO — AUTORROTACIÓN', isEmergency: true },
          ]
        },
        {
          title: 'ACCIONES ADICIONALES',
          items: [
            { action: 'Puertas', value: 'ABRIR PARA VENTILACIÓN (si el fuego no está en cabina)' },
            { action: 'Mayday', value: '"MAYDAY MAYDAY MAYDAY — INCENDIO DE MOTOR — POSICIÓN"' },
            { action: 'Transpondedor', value: '7700' },
            { action: 'Pasajeros', value: '"BRACE FOR EMERGENCY LANDING"' },
          ]
        },
        {
          warning: 'NO intentar sofocar el fuego del motor en vuelo. Cortar combustible y aterrizar INMEDIATAMENTE. El tiempo es crítico.'
        }
      ]
    },

    {
      id: 'fire-ground',
      title: 'INCENDIO EN ARRANQUE',
      subtitle: 'Engine fire during starting',
      icon: '🔥',
      isEmergency: true,
      sections: [
        {
          title: '⚡ ACCIONES INMEDIATAS',
          items: [
            { action: 'Starter', value: 'CONTINUAR MOTOREANDO (si motor no arrancó)', note: 'El flujo de aire puede apagar el fuego de admisión', isEmergency: true },
            { action: 'Throttle', value: 'COMPLETAMENTE ABIERTO', note: 'Intenta limpiar carburante del colector de admisión', isEmergency: true },
            { action: 'Si el fuego persiste', value: 'CORTAR COMBUSTIBLE — EVACUAR AERONAVE' },
            { action: 'Cortacombustible', value: 'OFF', isEmergency: true },
            { action: 'Batería y magnetos', value: 'OFF', isEmergency: true },
            { action: 'EVACUAR', value: 'ALEJARSE DEL HELICÓPTERO', isEmergency: true },
            { action: 'Extintor', value: 'USAR EXTINTOR — LLAMAR BOMBEROS' },
          ]
        }
      ]
    },

    {
      id: 'smoke-cabin',
      title: 'HUMO EN CABINA',
      subtitle: 'Smoke or fumes in cabin',
      icon: '💨',
      isEmergency: true,
      sections: [
        {
          title: '⚡ ACCIONES',
          items: [
            { action: 'Identificar fuente del humo', value: 'ELÉCTRICO vs. MOTOR/COMBUSTIBLE' },
            { action: 'Puertas y ventanillas', value: 'ABRIR PARA VENTILACIÓN' },
            { action: 'Si humo eléctrico', value: 'BATERÍA — OFF / IDENTIFICAR CIRCUITO DEFECTUOSO' },
            { action: 'Si humo de combustible/motor', value: 'PROCEDER COMO INCENDIO DE MOTOR' },
            { action: 'Aterrizaje', value: 'PROCEDER A ATERRIZAJE PRECAUTORIO INMEDIATO' },
            { action: 'Mayday/Pan Pan', value: 'DECLARAR URGENCIA — INFORMAR A ATC' },
          ]
        }
      ]
    },

    {
      id: 'ditching',
      title: 'AMERIZAJE FORZOSO',
      subtitle: 'Emergency ditching — water landing',
      icon: '🌊',
      isEmergency: true,
      sections: [
        {
          title: '⚡ PREPARACIÓN',
          items: [
            { action: 'Mayday', value: '"MAYDAY MAYDAY MAYDAY — AMERIZAJE FORZOSO"', isEmergency: true },
            { action: 'Transpondedor', value: '7700 + ELT ON' },
            { action: 'Chalecos salvavidas', value: 'COLOCAR ANTES DEL AMERIZAJE', note: 'NO inflar hasta salir del helicóptero' },
            { action: 'Puertas', value: 'ABRIR LIGERAMENTE O TRABAR EN POSICIÓN ABIERTA' },
            { action: 'Cinturones', value: 'ABROCHADOS HASTA EL IMPACTO' },
          ]
        },
        {
          title: 'AMERIZAJE',
          items: [
            { action: 'Velocidad de amerizaje', value: 'MÍNIMA POSIBLE — USAR FLARE' },
            { action: 'Dirección', value: 'A FAVOR DEL VIENTO Y OLA' },
            { action: 'Colectivo', value: 'COMPLETAMENTE ARRIBA EN EL ÚLTIMO MOMENTO PARA FRENAR' },
          ]
        },
        {
          title: 'EVACUACIÓN',
          items: [
            { action: 'Esperar que la aeronave se estabilice', value: 'NO PÁNICO — ESPERAR PARADA DE ROTACIÓN' },
            { action: 'Cinturones', value: 'SOLTAR' },
            { action: 'Salida', value: 'POR PUERTAS O VENTANAS — ORIENTARSE HACIA SUPERFICIE' },
            { action: 'Chaleco', value: 'INFLAR EN SUPERFICIE' },
          ]
        }
      ]
    }
  ]
};
