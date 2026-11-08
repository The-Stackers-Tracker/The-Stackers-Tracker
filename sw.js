// The Stackers Tracker service worker: lets the app open offline and install as an app.
// Change VERSION with every update so phones fetch the new files.
const VERSION='stack-tracker-b69';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 const page=r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html');
 if(page){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(VERSION).then(x=>x.put('./index.html',c));return res}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r)))});
