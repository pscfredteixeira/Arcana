import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {firstLookContent as lesson} from '../src/lessons/firstLookContent.js';
import {fullLessonPage} from '../src/ui/fullLesson.js';

const source=path=>readFileSync(new URL('../'+path, import.meta.url),'utf8');

test('primeira aula tem seis seções originais e objetivos observáveis',()=>{
 assert.equal(lesson.sections.length,6);
 assert.ok(lesson.outcomes.length>=5);
 for(const section of lesson.sections){
  assert.ok(section.id);
  assert.ok(section.paragraphs.length>=3);
  assert.ok(section.principle.length>30);
 }
 assert.equal(new Set(lesson.sections.map(s=>s.id)).size,6);
});
test('aula distingue os métodos de Rachel Pollack e Nei Naiff',()=>{
 const authors=lesson.bibliography.map(s=>s.author);
 assert.ok(authors.includes('Rachel Pollack'));
 assert.ok(authors.includes('Nei Naiff'));
 assert.ok(lesson.bibliography.every(s=>s.where.includes('PDF')));
});
test('aula completa apresenta interatividade, caderno e acessibilidade básica',()=>{
 const html=fullLessonPage();
 for(const key of ['firstlook-exercise','lesson-notes','data-font="larger"','laboratorio','conclusao','fontes','lesson-feature-art'])assert.ok(html.includes(key),key);
 assert.ok(html.length>12000);
 assert.ok(html.includes('O Louco'));
});
test('rotas reais carregam o módulo sem quebrar o site',()=>{
 const main=source('src/app/main.js');
 const index=source('index.html');
 assert.ok(main.includes('fullLessonPage()'));
 assert.ok(main.includes('renderLab()'));
 assert.ok(main.includes('handleLabClick(event.target)'));
 assert.ok(main.includes('saveReflection(event.target.value)'));
 assert.ok(index.includes('./styles/lesson.css'));
});
