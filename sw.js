/* ══════════════════════════════════════════════════════════════
   EFB Robinson R44 II — Service Worker
   Cachea todos los archivos para uso offline completo
   ══════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'efb-r44-v7';

const ASSETS = [
  '/EFB-Robinson-R44/',
  '/EFB-Robinson-R44/index.html',
  '/EFB-Robinson-R44/css/efb.css',
  '/EFB-Robinson-R44/js/app.js',
  '/EFB-Robinson-R44/js/data/checklists.js',
  '/EFB-Robinson-R44/js/data/performance.js',
  '/EFB-Robinson-R44/js/data/wb.js',
  '/EFB-Robinson-R44/js/data/course.js',
  '/EFB-Robinson-R44/js/modules/checklists.js',
  '/EFB-Robinson-R44/js/modules/perf.js',
  '/EFB-Robinson-R44/js/modules/wb.js',
  '/EFB-Robinson-R44/js/modules/course.js',
  '/EFB-Robinson-R44/manifest.json',
  '/EFB-Robinson-R44/images/logo-modena.png',
  '/EFB-Robinson-R44/docs/20210823_083416_800x550.jpg',
  '/EFB-Robinson-R44/docs/Robinson_R44_II_(cropped).jpg',
  '/EFB-Robinson-R44/docs/r44_4-876x487.jpg',
  '/EFB-Robinson-R44/docs/R442FM.pdf',
];

/* ─── Instalación: cachear todos los assets ─── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cachear assets críticos (sin el PDF que es pesado)
      const criticalAssets = ASSETS.filter(a => !a.endsWith('.pdf'));
      return cache.addAll(criticalAssets).then(() => {
        // PDF en segundo plano, no bloquea la instalación
        cache.add('/EFB-Robinson-R44/docs/R442FM.pdf').catch(err => {
          console.warn('SW: no se pudo cachear el PDF:', err);
        });
      });
    })
    .then(() => self.skipWaiting())
    .catch(err => console.error('SW: error en instalación:', err))
  );
});

/* ─── Activación: limpiar caches viejos ─── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ─── Fetch: cache-first para assets, network-first para el resto ─── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) {
    return; // Dejar pasar (ej: imagen del Wikipedia)
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Solo cachear respuestas exitosas del mismo origen (no PDFs grandes dinámicos)
        if (response && response.status === 200 && response.type === 'basic'
            && !event.request.url.endsWith('.pdf')) {
          const toCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, toCache);
            // Limitar el caché dinámico a 60 entradas
            cache.keys().then(keys => {
              if (keys.length > 60) cache.delete(keys[0]);
            });
          });
        }
        return response;
      }).catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('/EFB-Robinson-R44/index.html');
        }
        // Fallback SVG para imágenes que no cargaron offline
        if (event.request.destination === 'image') {
          return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><rect width="640" height="360" fill="#060c18"/><text x="320" y="190" font-size="60" text-anchor="middle">🚁</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
      });
    })
  );
});
