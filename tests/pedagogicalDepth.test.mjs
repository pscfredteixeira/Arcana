import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cards} from '../src/data/cards.js';
import {accessibleCardProse} from '../src/data/accessibleCardProse.js';
import {accessibleLessonProse,accessibleSection} from '../src/lessons/accessibleLessonProse.js';
import {firstLookContent} from '../src/lessons/firstLookContent.js';
import {extendedLessons} from '../src/lessons/sprint7Lessons.js';
import {getCardStudy} from '../src/data/cardStudies.js';
import {renderCardStudy} from '../src/ui/cardStudyView.js';
import {fullLessonPage} from '../src/ui/fullLesson.js';
import {expandedLessonPage} from '../src/ui/expandedCourse.js';

const read=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('cada uma das 78 cartas tem explicação didática singular a partir do desenho',()=>{
 assert.equal(cards.length,78);
 assert.deepEqual(new Set(Object.keys(accessibleCardProse)),new Set(cards.map(c=>c.slug)));
 const mains=new Set();
 for(const c of cards){
  const text=accessibleCardProse[c.slug];
  assert.equal(typeof text,'string',c.slug);
  assert.ok(text.length>=260,'Texto curto: '+c.slug);
  assert.match(text,/costuma|pode|representa|significa|lembra/i,'Sem ligação entre a cena e uma ideia interpretativa: '+c.slug);
  assert.ok(!mains.has(text),'Texto duplicado: '+c.slug);mains.add(text);
  const study=getCardStudy(c);
  assert.equal(study.main,text,c.slug);
  assert.ok(study.advanced.length>110,c.slug+' perdeu aprofundamento anterior');
  const html=renderCardStudy(c);
  assert.ok(html.includes(text),c.slug);
  assert.ok(html.includes('Quero aprofundar'),c.slug);
  assert.ok(html.indexOf(text)<html.indexOf('Quero aprofundar'),c.slug);
  assert.ok(html.includes('O que aparece no desenho?'),c.slug);
 }
});

test('todas as 18 seções das quatro aulas agora ensinam o básico antes da teoria',()=>{
 const sections=[...firstLookContent.sections,...extendedLessons.flatMap(l=>l.sections)];
 assert.equal(sections.length,18);
 assert.equal(Object.keys(accessibleLessonProse).length,18);
 assert.deepEqual(new Set(sections.map(s=>s.id)),new Set(Object.keys(accessibleLessonProse)));
 for(const s of sections){
  const paragraphs=accessibleSection(s);
  assert.ok(Array.isArray(paragraphs),s.id);
  assert.equal(paragraphs.length,3,s.id);
  paragraphs.forEach((p,i)=>assert.ok(p.length>140,s.id+' parágrafo '+i+' curto'));
 }
 const first=fullLessonPage();
 assert.ok(first.includes('Para saber mais: explicação aprofundada'));
 assert.ok(first.includes(accessibleLessonProse['primeiro-contato'][0]));
 assert.ok(first.includes(firstLookContent.sections[0].paragraphs[0]));
 for(const lesson of extendedLessons){
  const html=expandedLessonPage(lesson);
  assert.ok(html.includes('Quer se aprofundar nesta parte?'),lesson.slug);
  assert.ok(html.includes(accessibleLessonProse[lesson.sections[0].id][0]),lesson.slug);
  assert.ok(html.includes(lesson.sections[0].paragraphs[0]),lesson.slug);
 }
});

test('a nova formação é instalada também no aplicativo PWA sem apagar registros',()=>{
 const sw=read('sw.js');
 for(const file of ['accessibleMajors.js','accessiblePausCopas.js','accessibleEspadasOuros.js','accessibleCardProse.js','accessibleLessonProse.js'])assert.ok(sw.includes(file),'PWA sem '+file);
 assert.match(sw,/arcana-app-shell-v11/);
 const css=read('styles/beginner.css');
 assert.match(css,/lesson-more-theory/);
 assert.match(css,/atlas-advanced-study/);
 assert.ok(!read('src/ui/cardStudyView.js').includes('innerHTML='));
});
