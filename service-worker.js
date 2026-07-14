const CACHE_NAME = 'glaktarbo-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'icons/icon-192-v2.png' // تم تعديل المسار والاسم هنا ليطابق مجلدك الحقيقي
];

// السيرفس وركر وحفظ الملفات في الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// تفعيل وتنظيف الكاش
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// جلب الملفات
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});