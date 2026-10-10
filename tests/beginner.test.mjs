import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cards} from '../src/data/cards.js';
import {beginnerMeanings,getBeginnerMeaning} from '../src/data/beginnerMeanings.js';
import {lessonPlainGuides,plainGuideForSection} from '../src/lessons/lessonPlainGuides.js';
import {firstLookContent} from '../src/lessons/firstLookContent.js';
import {extendedLessons} from '../src/lessons/sprint7Lessons.js';
import {beginnerGuidePage,glossary} from '../src/ui/beginnerGuide.js';
import {renderCardStudy} from '../src/ui/cardStudyView.js';
import {homePage,learnPage,siteFooter} from '../src/ui/templates.js';
import {atlasPageExpanded} from '../src/ui/interactiveAtlas.js';
import {expandedLessonPage} from '../src/ui/expandedCourse.js';
import {fullLessonPage} from '../src/ui/fullLesson.js';

test('cada carta tem significado explícito e exemplo próprio no início',()=>{
 assert.equal(cards.length,78);
 assert.equal(Object.keys(beginnerMeanings).length,78);
 assert.deepEqual(new Set(Object.keys(beginnerMeanings)),new Set(cards.map(c=>c.slug)));
 const seen=new Set();
 for(const c of cards){
  const def=getBeginnerMeaning(c);
  assert.ok(def,c.name);
  assert.ok(def.meaning.length>40,c.name);
  assert.ok(def.example.length>45,c.name);
  assert.ok(!seen.has(def.meaning),'Explicação genérica duplicada: '+c.name);
  seen.add(def.meaning);
  const html=renderCardStudy(c);
  assert.match(html,/PRIMEIRO, A EXPLICAÇÃO SIMPLES/);
  assert.ok(html.indexOf('O que significa '+c.name+'?')<html.indexOf('Quer entender'),c.name);
  assert.ok(html.includes(def.meaning),c.name);
  assert.ok(html.includes(def.example),c.name);
 }
});
test('o guia começa do zero e define termos frequentes com exemplos',()=>{
 const page=beginnerGuidePage();
 for(const token of ['O básico','Afinal, o que é tarô?','22','56','78','Exemplo: O Louco','Olhe','Entenda','Relacione','Tarô','Arcano','Naipe','Símbolo','Tiragem','Hipótese']){
  assert.ok(page.includes(token),token);
 }
 assert.ok(glossary.length>=12);
 assert.ok(page.includes('#/aula/mapa-78-cartas'));
 assert.ok(page.includes('#/carta/o-louco'));
});
test('todas as seções das quatro aulas apresentam resumo e exemplo fáceis',()=>{
 const sections=[...firstLookContent.sections,...extendedLessons.flatMap(l=>l.sections)];
 assert.equal(sections.length,18);
 for(const s of sections){
  const entry=plainGuideForSection(s.id);
  assert.ok(entry,s.id);
  assert.ok(entry[0].length>65,s.id+' definição muito curta');
  assert.ok(entry[1].length>40,s.id+' exemplo muito curto');
 }
 assert.equal(Object.keys(lessonPlainGuides).length,18);
 assert.match(fullLessonPage(),/Em palavras simples/);
 for(const l of extendedLessons)assert.match(expandedLessonPage(l),/Em palavras simples/);
});
test('guia e percurso ficam acessíveis nas telas principais',()=>{
 const app=readFileSync(new URL('../src/app/main.js',import.meta.url),'utf8');
 const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const sw=readFileSync(new URL('../sw.js',import.meta.url),'utf8');
 assert.ok(homePage().includes('#/comece-aqui'));
 assert.ok(learnPage().includes('#/comece-aqui'));
 assert.ok(atlasPageExpanded().includes('#/comece-aqui'));
 assert.ok(siteFooter().includes('#/sobre'));
 assert.match(app,/path==='\/comece-aqui'/);
 assert.match(index,/styles\/beginner.css/);
 for(const file of ['beginnerMeanings.js','beginnerGuide.js','lessonPlainGuides.js','beginner.css'])assert.ok(sw.includes(file),file);
});
