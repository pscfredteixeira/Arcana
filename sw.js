/* ARCANA — App shell cache. Dados de aluno continuam somente no localStorage.
 * Cache versão 6: atualizar a versão ao publicar sprints que alteram assets.
 */
const CACHE_NAME='arcana-app-shell-v6';
const APP_SHELL=[
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-32.png",
  "./apple-touch-icon.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./src/app/main.js",
  "./src/app/pwa.js",
  "./src/data/cardStudyMajors.js",
  "./src/data/cardStudyMinorsA.js",
  "./src/data/cardStudyMinorsB.js",
  "./src/data/cardStudies.js",
  "./src/ui/cardStudyView.js",
  "./src/data/atlasCatalogue.js",
  "./src/data/cards.js",
  "./src/data/beginnerMeanings.js",
  "./src/data/accessibleMajors.js",
  "./src/data/accessiblePausCopas.js",
  "./src/data/accessibleEspadasOuros.js",
  "./src/data/accessibleCardProse.js",
  "./src/lessons/accessibleLessonProse.js",
  "./src/lessons/lessonPlainGuides.js",
  "./src/ui/beginnerGuide.js",
  "./src/data/diamondContent.js",
  "./src/data/spreadDefinitions.js",
  "./src/games/atelierGame.js",
  "./src/games/diamondGame.js",
  "./src/games/diamondLogic.js",
  "./src/games/explorationsData.js",
  "./src/games/explorationsLogic.js",
  "./src/games/sixPathsGame.js",
  "./src/lessons/firstLookContent.js",
  "./src/lessons/lessonPractice.js",
  "./src/lessons/sprint7Lessons.js",
  "./src/spreads/spreadLogic.js",
  "./src/spreads/spreadUI.js",
  "./src/study/studyData.js",
  "./src/study/studyUI.js",
  "./src/ui/expandedCourse.js",
  "./src/ui/fullLesson.js",
  "./src/ui/interactiveAtlas.js",
  "./src/ui/templates.js",
  "./styles/atlas.css",
  "./styles/beginner.css",
  "./styles/base.css",
  "./styles/components.css",
  "./styles/course.css",
  "./styles/explorations.css",
  "./styles/games.css",
  "./styles/lesson.css",
  "./styles/spreads.css",
  "./styles/study.css",
  "./styles/tokens.css",
  "./styles/pwa.css"
];
const HOME=new URL('./index.html',self.registration.scope).href;

self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE_NAME);
  await cache.addAll(APP_SHELL);
  await self.skipWaiting();
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('arcana-app-shell-')&&key!==CACHE_NAME).map(key=>caches.delete(key)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 const url=new URL(request.url);
 if(!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE_NAME);
  try{
   const response=await fetch(request);
   if(response.ok&&response.type==='basic'){
    await cache.put(request,response.clone()).catch(()=>{});
   }
   return response;
  }catch{
   const fallback=await cache.match(request,{ignoreSearch:true});
   if(fallback)return fallback;
   if(request.mode==='navigate'){
    const home=await cache.match(HOME);
    if(home)return home;
   }
   return Response.error();
  }
 })());
});
