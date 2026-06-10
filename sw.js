const CACHE = 'cookie-run-v3';
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
  './image/망나뇽_스프라이트2/sprite4200.png',
  './image/망나뇽_스프라이트2/sprite4201.png',
  './image/망나뇽_스프라이트2/sprite4202.png',
  './image/망나뇽_스프라이트2/sprite4203.png',
  './image/망나뇽_스프라이트2/sprite4204.png',
  './image/망나뇽_스프라이트2/sprite4205.png',
  './image/망나뇽_스프라이트2/sprite4206.png',
  './image/망나뇽_스프라이트2/sprite4207.png',
  './image/망나뇽_스프라이트2/sprite4208.png',
  './image/망나뇽_스프라이트2/sprite4209.png',
  './image/망나뇽_스프라이트2/sprite4210.png',
  './image/망나뇽_스프라이트2/sprite4211.png',
  './image/망나뇽_스프라이트2/sprite4212.png',
  './image/망나뇽_스프라이트2/sprite4213.png',
  './image/망나뇽_스프라이트2/sprite4214.png',
  './image/망나뇽_스프라이트2/sprite4215.png',
  './image/망나뇽_스프라이트2/sprite4216.png',
  './image/망나뇽_스프라이트2/sprite4217.png',
  './image/망나뇽_스프라이트2/sprite4218.png',
  './image/망나뇽_스프라이트2/sprite4219.png',
  './image/망나뇽_스프라이트2/sprite4220.png',
  './image/망나뇽_스프라이트2/sprite4221.png',
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
  const url = new URL(e.request.url);
  // index.html은 항상 네트워크 우선 — 코드 업데이트가 즉시 반영되도록
  if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }
  // 나머지 에셋은 캐시 우선
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
