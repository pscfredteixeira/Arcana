import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cards} from '../src/data/cards.js';
import {majorStudies} from '../src/data/cardStudyMajors.js';
import {minorStudies,suitStudies} from '../src/data/cardStudyMinorsA.js';
import {minorStudiesRest} from '../src/data/cardStudyMinorsB.js';
import {getCardStudy,allStudies,editorialPrinciples} from '../src/data/cardStudies.js';
import {renderCardStudy} from '../src/ui/cardStudyView.js';
import {atlasDetailExpanded} from '../src/ui/interactiveAtlas.js';

test('todas as 78 cartas têm interpretação individual aprofundada',()=>{
 assert.equal(cards.length,78);
 assert.equal(Object.keys(majorStudies).length,22);
 assert.equal(Object.keys(minorStudies).length,28);
 assert.equal(Object.keys(minorStudiesRest).length,28);
 assert.equal(Object.keys(allStudies).length,78);
 assert.deepEqual(new Set(cards.map(c=>c.slug)),new Set(Object.keys(allStudies)));
 assert.equal(new Set(cards.map(c=>getCardStudy(c)?.main)).size,78);
 for(const c of cards){
  const s=getCardStudy(c);
  assert.ok(s,'Estudo ausente: '+c.name);
  for(const prop of ['visual','main','tension','case','question','sources','structure','comparative']){
   assert.equal(typeof s[prop],'string',c.slug+' / '+prop);
   assert.ok(s[prop].trim().length>30,c.slug+' / '+prop);
  }
  assert.ok(s.main.length>170,c.name+': interpretação curta');
  assert.ok(s.tension.length>100,c.name+': falta tensão interpretativa');
  assert.ok(s.case.length>75,c.name+': falta exemplo prático');
 }
});
test('cada naipe possui foco próprio e as 14 cartas estão representadas',()=>{
 for(const suit of ['paus','copas','espadas','ouros']){
  assert.equal(cards.filter(c=>c.suit===suit).length,14);
  assert.ok(suitStudies[suit]);
  for(const field of ['element','field','scope','prompt'])assert.ok(suitStudies[suit][field].length>10);
 }
});
test('a ficha apresenta fundamentos, observação, reflexão, método e fontes',()=>{
 for(const c of cards){
  const html=renderCardStudy(c);
  assert.ok(html.includes('Olhe antes de interpretar'));
  assert.ok(html.includes('O que a imagem coloca em jogo?'));
  assert.ok(html.includes('A tensão que não deve ser apagada'));
  assert.ok(html.includes('Um exemplo da vida cotidiana'));
  assert.ok(html.includes('Pollack e Naiff'));
  assert.ok(html.includes('BIBLIOGRAFIA E CRITÉRIO EDITORIAL'));
  assert.ok(html.length>3000,c.name+': ficha não detalhada');
  if(c.suit)assert.ok(html.includes('NAIPE / ELEMENTO SIMBÓLICO'));
  const page=atlasDetailExpanded(c);
  assert.ok(page.includes('atlas-deep-reading'));
  assert.ok(page.includes('atlas-source'));
  assert.ok(page.includes('data-open-zoom'));
  assert.ok(page.includes('Comparar e relacionar'));
 }
});
test('fontes são atribuições de método e não citações literais falsas',()=>{
 assert.equal(editorialPrinciples.length,3);
 for(const c of cards){
  const s=getCardStudy(c);
  assert.match(s.sources,/Rachel Pollack/);
  assert.match(s.sources,/Nei Naiff/);
  assert.match(s.sources,/não (?:atribuição|citações)/i);
 }
});
test('layout mobile não depende de hover nem oculta os estudos',()=>{
 const css=readFileSync(new URL('../styles/atlas.css',import.meta.url),'utf8');
 assert.ok(css.includes('.atlas-deep-reading'));
 assert.ok(css.includes('.atlas-study-pair'));
 assert.ok(css.includes('@media(max-width:780px)'));
 assert.ok(css.includes('.atlas-reading-sources'));
});
