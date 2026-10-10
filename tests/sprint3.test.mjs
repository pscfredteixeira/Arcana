import test from 'node:test';
import assert from 'node:assert/strict';
import {cards} from '../src/data/cards.js';
import {atlasPageExpanded,atlasDetailExpanded,atlasCardsExpanded} from '../src/ui/interactiveAtlas.js';
import {readFileSync} from 'node:fs';

test('catálogo contém 78 cartas RWS distintas e categorizadas',()=>{
 assert.equal(cards.length,78);
 assert.equal(new Set(cards.map(c=>c.slug)).size,78);
 assert.equal(new Set(cards.map(c=>c.id)).size,78);
 assert.equal(cards.filter(c=>c.arcana==='major').length,22);
 assert.equal(cards.filter(c=>c.arcana==='minor').length,56);
 for(const suit of ['paus','copas','espadas','ouros']) assert.equal(cards.filter(c=>c.suit===suit).length,14);
});
test('todas as cartas possuem imagem histórica, fonte e pergunta de reflexão',()=>{
 for(const c of cards){
 assert.match(c.file,/\.jpg$/);
 assert.match(c.image,/commons\.wikimedia\.org/);
 assert.match(c.commons,/commons\.wikimedia\.org/);
 assert.ok(c.name&&c.slug&&c.tagline&&c.sight&&c.reflect&&c.meaning);
 assert.ok(c.sight.length>30);
 }
});
test('atlas permite navegar e filtrar, e exibe fichas e lupa',()=>{
 const html=atlasPageExpanded();
 assert.match(html,/78 cartas/);
 assert.match(html,/data-kind="paus"/);
 assert.match(html,/data-kind="ouros"/);
 assert.match(html,/id="atlas-search"/);
 assert.match(html,/#\/carta\/o-louco/);
 const detail=atlasDetailExpanded(cards[0]);
 assert.match(detail,/data-spot="0"/);
 assert.match(detail,/data-open-zoom/);
 assert.match(detail,/atlas-lightbox/);
 assert.match(detail,/Consultar|Ver arquivo e licença/);
 assert.match(atlasCardsExpanded(cards),/Ás de Espadas/);
});
test('roteador e estilos do sprint 3 estão integrados',()=>{
 const app=readFileSync(new URL('../src/app/main.js',import.meta.url),'utf8');
 const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.match(app,/atlasPageExpanded\(\)/);
 assert.match(app,/atlasDetailExpanded\(c\)/);
 assert.match(app,/handleAtlasClick/);
 assert.match(index,/styles\/atlas.css/);
});

test('cartas sem lupa específica não exibem o algarismo 1 no meio da imagem',()=>{
 const generic=cards.filter(c=>!['o-louco','o-mago','a-sacerdotisa','a-imperatriz','o-imperador','o-hierofante'].includes(c.slug));
 assert.equal(generic.length,72);
 for(const c of generic){
  const html=atlasDetailExpanded(c);
  assert.ok(!html.includes('data-spot="0"'),c.slug+' tinha marcador central');
  assert.match(html,/Imagem sem marcadores sobrepostos/);
  assert.match(html,/data-open-zoom/);
 }
 for(const slug of ['o-louco','o-mago','a-sacerdotisa','a-imperatriz','o-imperador','o-hierofante']){
  assert.match(atlasDetailExpanded(cards.find(c=>c.slug===slug)),/data-spot="0"/);
 }
});
