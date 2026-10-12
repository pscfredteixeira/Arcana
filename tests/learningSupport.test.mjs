import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {learningScaffold,beginnerExercises,atelierTeaching,pathTeaching} from '../src/games/learningScaffolds.js';
import {extendedLessons} from '../src/lessons/sprint7Lessons.js';
import {sixPaths,ateliers} from '../src/games/explorationsData.js';
import {diamondContent} from '../src/data/diamondContent.js';

const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('o apoio ensina antes de testar e oferece dica pelo teclado',()=>{
 const html=learningScaffold({title:'O que aprender?',explanation:'Observe uma figura antes de escolher.',example:'Uma ponte pode lembrar uma passagem.',hint:'Compare o desenho.'});
 assert.ok(html.includes('ENTENDA ANTES DE TENTAR'));
 assert.ok(html.includes('Exemplo explicado'));
 assert.ok(html.includes('<details'));
 assert.ok(html.includes('<summary>Preciso de uma dica'));
 assert.ok(html.includes('Observe uma figura'));
 assert.throws(()=>learningScaffold({hint:'sem aula'}),/obrigatória/);
 const escaped=learningScaffold({explanation:'<img src=x onerror=alert(1)>',hint:'<script>alert(1)</script>'});
 assert.ok(!escaped.includes('<img'));
 assert.ok(!escaped.includes('<script'));
 assert.ok(escaped.includes('&lt;'));
});

test('todas as fases dos questionários e jogos têm explicação, exemplo e dica',()=>{
 const items=[
 ...beginnerExercises.firstLook,
 ...extendedLessons.flatMap(l=>beginnerExercises.course[l.slug]||[]),
 ...Object.values(beginnerExercises.diamond),
 ...Object.values(atelierTeaching),
 ...sixPaths.map(pathTeaching)
 ];
 assert.equal(beginnerExercises.firstLook.length,3);
 for(const lesson of extendedLessons)assert.equal(beginnerExercises.course[lesson.slug].length,lesson.activity.length,lesson.slug);
 assert.equal(Object.keys(beginnerExercises.diamond).length,4);
 assert.deepEqual(new Set(Object.keys(atelierTeaching)),new Set(ateliers.map(a=>a.slug)));
 assert.equal(items.length,3+9+4+3+6);
 for(const [i,x] of items.entries()){
  for(const field of ['explanation','example','hint'])assert.ok(typeof x[field]==='string'&&x[field].length>35,i+': '+field);
  const html=learningScaffold(x);
  assert.ok(html.includes('Preciso de uma dica'));
 }
});

test('os jogos mostram apoio pedagógico antes das alternativas, sem mudar o gabarito',()=>{
 for(const p of [
  'src/games/atelierGame.js',
  'src/games/diamondGame.js',
  'src/games/sixPathsGame.js',
  'src/ui/fullLesson.js',
  'src/ui/expandedCourse.js',
  'src/spreads/spreadUI.js'
 ]){
  const s=read(p);
  assert.ok(s.includes('learningScaffold('),p);
 }
 const first=read('src/ui/fullLesson.js');
 assert.ok(first.includes('q.wrong?.[state.picked]'));
 assert.ok(first.includes('beginnerExercises.firstLook[state.step]'));
 const quiz=read('src/ui/expandedCourse.js');
 assert.ok(quiz.includes('beginnerExercises.course[lesson.slug]?.[step]'));
 assert.ok(quiz.includes("item.answer+' nesta tradição"));
 for(const axis of diamondContent.axes)assert.equal(axis.options.filter(o=>o.correct).length,1);
 assert.equal(diamondContent.scenario.options.filter(o=>o.correct).length,1);
});

test('o iPhone recebe os novos recursos no cache sem alterar registros do aluno',()=>{
 const sw=read('sw.js');
 assert.match(sw,/arcana-app-shell-v9/);
 assert.match(sw,/\.\/src\/games\/learningScaffolds\.js/);
 assert.match(read('styles/beginner.css'),/practice-teach-first/);
 assert.match(read('styles/beginner.css'),/practice-optional-hint/);
 assert.match(read('styles/beginner.css'),/max-width:760px/);
});
