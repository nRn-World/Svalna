const CACHE='svalna-v42';
const ASSETS=['./','./index.html','./styles.css?v=27','./app.js?v=29','./cloud-sync.js?v=7','./assets/vendor/firebase-app-compat.js','./assets/vendor/firebase-auth-compat.js','./assets/vendor/firebase-firestore-compat.js','./assets/vendor/zxing.js','./manifest.webmanifest','./assets/icon.svg','./assets/icons/icon-192.png','./assets/icons/brand-192.png','./assets/icons/icon-512.png','./assets/icons/icon-maskable-512.png','./assets/icons/icon-180.png','./assets/photos/eggs.webp','./assets/photos/milk.webp','./assets/photos/ketchup.webp','./assets/photos/apples.webp','./assets/photos/tomatoes.webp','./assets/photos/broccoli.webp','./assets/photos/strawberries.webp','./assets/photos/scan-milk.webp'];

self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
));

self.addEventListener('activate', e => e.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));

// ── Web Push: show notification when a push event arrives ──────────────────
self.addEventListener('push', e => {
  let title = 'Svalna';
  let body = '';
  let tag = 'svalna-push';
  let icon = 'assets/icon.svg';
  try {
    const data = e.data ? e.data.json() : {};
    title = data.title || title;
    body = data.body || body;
    tag = data.tag || tag;
    icon = data.icon || icon;
  } catch {
    body = e.data ? e.data.text() : '';
  }
  e.waitUntil(
    self.registration.showNotification(title, { body, icon, tag, badge: 'assets/icons/icon-192.png', data: { url: './' } })
  );
});

// ── Notification click: focus or open the app ──────────────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = e.notification.data?.url || './';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes(self.location.origin));
      if (existing) return existing.focus();
      return clients.openWindow(target);
    })
  );
});

// ── Fetch: cache-first for assets, network-first for navigation ────────────
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const navigation = e.request.mode === 'navigate';
  if (navigation) {
    e.respondWith(
      fetch(e.request)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
