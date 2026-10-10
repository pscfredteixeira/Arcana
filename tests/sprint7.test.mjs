import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {extendedLessons,lessonBySlug,lessonById} from '../src/lessons/sprint7Lessons.js';
import {PRACTICE_KEY,normalizePractices,readPractices,savePractices,progressOf,getExpectedChoice} from '../src/lessons/lessonPractice.js';
import {completedLesson,setCompletedLesson,readStudySummary,LESSON_IDS,buildBackup,validateBackup,restoreBackup} from '../src/study/studyData.js';
import {expandedLessonPage,renderCoursePractice,handleCourseClick} from '../src/ui/expandedCourse.js';
import {cards} from '../src/data/cards.js';

const storage=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),entries:()=>Object.fromEntries(m)};};
function click(selector,data={}){return {closest:s=>s===selector?{dataset:data}:null};}

test('três novas aulas possuem conteúdo extenso, objetivos, bibliografia e três fases',()=>{
 assert.equal(extendedLessons.length,3);
 assert.equal(new Set(extendedLessons.map(l=>l.slug)).size,3);
 assert.equal(new Set(extendedLessons.map(l=>l.id)).size,3);
 for(const lesson of extendedLessons){
  assert.equal(lesson.sections.length,4);
  assert.equal(lesson.activity.length,3);
  assert.ok(lesson.objectives.length>=4);
  assert.ok(lesson.bibliography.length>=2);
  assert.ok(lesson.sections.every(s=>s.paragraphs.length>=3&&s.principle.length>25));
  assert.ok(lesson.sections.reduce((n,s)=>n+s.paragraphs.join(' ').length,0)>1500);
  assert.equal(lessonBySlug(lesson.slug),lesson);
  assert.equal(lessonById(lesson.id),lesson);
  assert.ok(lesson.illustrations.every(slug=>cards.some(c=>c.slug===slug)),lesson.slug);
 }
});
test('as fontes e diferenças entre tradições permanecem identificadas',()=>{
 const structure=lessonBySlug('mapa-78-cartas');
 const details=structure.sections.flatMap(s=>s.paragraphs).join(' ');
 assert.match(details,/Força.*VIII/);
 assert.match(details,/Justiça.*XI/);
 assert.match(details,/Naiff/);
 const suits=lessonBySlug('quatro-naipes');
 const naiff=suits.sections.flatMap(s=>s.paragraphs).join(' ');
 for(const token of ['Ter','Ser','Estar','Ficar','Pollack','Naiff'])assert.ok(naiff.includes(token));
 for(const lesson of extendedLessons){
  assert.ok(lesson.bibliography.find(s=>s.author==='Rachel Pollack'));
  assert.ok(lesson.bibliography.find(s=>s.author==='Nei Naiff'));
  assert.ok(lesson.bibliography.every(s=>s.pages.includes('PDF')));
 }
});
test('a oficina dos naipes exige quatro correspondências distintas',()=>{
 const a=lessonBySlug('quatro-naipes').activity[0];
 assert.equal(a.kind,'match');
 assert.equal(a.items.length,4);
 assert.deepEqual(a.items.map(x=>x.answer),['Fogo','Água','Ar','Terra']);
 assert.equal(new Set(a.items.map(x=>x.id)).size,4);
 assert.ok(a.items.every(x=>cards.some(c=>c.slug===x.card)));
});
test('perguntas têm exatamente uma opção justificada',()=>{
 for(const l of extendedLessons)for(const a of l.activity){
  if(a.kind!=='choice')continue;
  assert.equal(a.options.filter(x=>x.right).length,1);
  assert.ok(getExpectedChoice(a)>=0);
  assert.ok(a.options.every(x=>x.why.length>25));
 }
});
test('resposta visual responsiva renderiza as três aulas e marcadores de conclusão',()=>{
 for(const l of extendedLessons){
  const page=expandedLessonPage(l);
  assert.ok(page.length>6000,l.slug);
  for(const marker of ['course-practice-root','lesson-mark-control','data-lesson-id="'+l.id+'"','bibliografia','columns-'])assert.ok(page.includes(marker),l.slug+':'+marker);
  assert.match(page,/data-anchor/);
  assert.ok(!page.includes('undefined'));
 }
});
test('o progresso dos laboratórios pode ser salvo e restaurado por backup',()=>{
 const local=storage();
 const progress={[extendedLessons[0].id]:{step:2,completed:false},[extendedLessons[1].id]:{step:3,completed:true}};
 assert.equal(savePractices(local,progress),true);
 assert.equal(readPractices(local)[extendedLessons[1].id].completed,true);
 assert.equal(progressOf(local,extendedLessons[0].id).step,2);
 assert.deepEqual(normalizePractices({'unrecognized':{step:2}}),{});
 assert.equal(setCompletedLesson(local,true,'F-04.01'),true);
 assert.equal(setCompletedLesson(local,true,'F-03.01'),true);
 assert.equal(completedLesson(local,'F-04.01'),true);
 assert.equal(completedLesson(local,'F-03.01'),true);
 const summary=readStudySummary(local);
 assert.equal(summary.lessonsCompletedCount,2);
 assert.equal(summary.lessonsAvailableCount,4);
 assert.equal(summary.newPracticeSteps,5);
 const backup=buildBackup(local);
 const serialized=JSON.parse(JSON.stringify(backup));
 const restored=storage();
 restoreBackup(restored,validateBackup(serialized));
 assert.deepEqual(readPractices(restored),readPractices(local));
 assert.equal(completedLesson(restored,'F-04.01'),true);
});
test('exercícios mostram feedback, bloqueiam avanço sem acerto e concluem três etapas',()=>{
 const local=storage();globalThis.localStorage=local;
 const root={innerHTML:'',scrollIntoView(){}};
 globalThis.document={getElementById:id=>id==='course-practice-root'?root:null,querySelector:()=>null};
 globalThis.location={hash:'#/aula/mapa-78-cartas'};
 renderCoursePractice();
 assert.match(root.innerHTML,/Famílias/);
 const a=lessonBySlug('mapa-78-cartas').activity;
 const incorrect=a[0].options.findIndex(o=>!o.right);
 handleCourseClick(click('[data-course-choice]',{courseChoice:String(incorrect)}));
 assert.match(root.innerHTML,/Vamos olhar novamente/);
 handleCourseClick(click('[data-course-next]'));
 assert.equal(progressOf(local,'F-02.01').step,0);
 handleCourseClick(click('[data-course-retry]'));
 for(let i=0;i<3;i++){
  const correct=getExpectedChoice(a[i]);
  handleCourseClick(click('[data-course-choice]',{courseChoice:String(correct)}));
  handleCourseClick(click('[data-course-next]'));
 }
 assert.equal(progressOf(local,'F-02.01').completed,true);
 assert.match(root.innerHTML,/Três etapas concluídas/);
 handleCourseClick(click('[data-course-restart]'));
 assert.equal(progressOf(local,'F-02.01').step,0);
});
test('oficina de associação funciona sem arrastar cartas',()=>{
 const local=storage();globalThis.localStorage=local;
 const root={innerHTML:'',scrollIntoView(){}};
 globalThis.document={getElementById:id=>id==='course-practice-root'?root:null,querySelector:()=>null};
 globalThis.location={hash:'#/aula/quatro-naipes'};
 renderCoursePractice();
 const a=lessonBySlug('quatro-naipes').activity[0];
 assert.match(root.innerHTML,/data-course-match-item/);
 handleCourseClick(click('[data-course-match-target]',{courseMatchTarget:'Ar'}));
 assert.match(root.innerHTML,/Escolha primeiro/);
 for(const item of a.items){
  handleCourseClick(click('[data-course-match-item]',{courseMatchItem:item.id}));
  handleCourseClick(click('[data-course-match-target]',{courseMatchTarget:item.answer}));
 }
 assert.match(root.innerHTML,/Quatro correspondências encontradas/);
 handleCourseClick(click('[data-course-next]'));
 assert.equal(progressOf(local,'I-01.01').step,1);
});
test('todas as páginas, arquivos e navegação estão ligados',()=>{
 const app=readFileSync(new URL('../src/app/main.js',import.meta.url),'utf8');
 const templates=readFileSync(new URL('../src/ui/templates.js',import.meta.url),'utf8');
 const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const study=readFileSync(new URL('../src/study/studyUI.js',import.meta.url),'utf8');
 const css=readFileSync(new URL('../styles/course.css',import.meta.url),'utf8');
 assert.match(app,/renderCoursePractice/);
 assert.match(app,/handleCourseClick/);
 assert.match(app,/lessonBySlug/);
 for(const route of extendedLessons) assert.ok(templates.includes(route.slug));
 assert.match(index,/styles\/course.css/);
 assert.match(study,/newCourseCards/);
 assert.match(css,/@media\(max-width:760px\)/);
});
