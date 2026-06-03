const CACHE = 'cookie-run-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './image/icon-192.png',
  './image/icon-512.png',
  './image/배경화면6.png',
  './image/아이템_젤리곰.png',
  './image/아이템_별.png',
  './image/장애물_나무.png',
  './image/장애물_돌.png',
  './image/도마뱀.png',
  './image/피카츄2.png',
  './image/피카츄_슬라이팅.png',
  './image/망나뇽_스프라이트/sprite1.png',
  './image/망나뇽_스프라이트/sprite2.png',
  './image/망나뇽_스프라이트/sprite3.png',
  './image/망나뇽_스프라이트/sprite4.png',
  './image/망나뇽_스프라이트/sprite5.png',
  './image/망나뇽_스프라이트/sprite6.png',
  './image/망나뇽_스프라이트/sprite7.png',
  './image/망나뇽_스프라이트/sprite8.png',
  './image/망나뇽_스프라이트/sprite9.png',
  './image/망나뇽_스프라이트/sprite10.png',
  './image/망나뇽_스프라이트/sprite11.png',
  './image/망나뇽_스프라이트/sprite12.png',
  './image/망나뇽_스프라이트/sprite13.png',
  './image/망나뇽_스프라이트/sprite14.png',
  './image/망나뇽_스프라이트/sprite15.png',
  './image/망나뇽_스프라이트/sprite16.png',
  './image/망나뇽_스프라이트/sprite26.png',
  './image/망나뇽_스프라이트/sprite27.png',
  './image/망나뇽_스프라이트/sprite28.png',
  './image/망나뇽_스프라이트/sprite29.png',
  './image/망나뇽_스프라이트/sprite30.png',
  './image/망나뇽_스프라이트/sprite31.png',
  './MUSIC/쿠키런_bgm1.mp3'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
