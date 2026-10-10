import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cards, findCard} from '../src/data/cards.js';
import {routes,siteHeader,homePage,learnPage,lessonPage,atlasPage,atlasCards,detailPage,practicePage,aboutPage} from '../src/ui/templates.js';

const source = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('o baralho ampliado tem 78 cartas distintas e iconografia identificada',()=>{
  assert.equal(cards.length,78);
  assert.equal(new Set(cards.map(c=>c.slug)).size,78);
  assert.equal(new Set(cards.map(c=>c.id)).size,78);
  for(const c of cards){
    assert.match(c.image,/^https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//);
    assert.match(c.commons,/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.match(c.imageLicense,/Pamela Colman Smith/);
    assert.ok(c.sight.length>30);
    assert.ok(c.reflect.length>20);
    assert.equal(findCard(c.slug),c);
  }
});

test('navegação do protótipo cobre as áreas previstas',()=>{
  assert.deepEqual(routes.map(r=>r.key),['home','learn','atlas','practice','study']);
  assert.equal(routes.length,5);
  for(const route of routes)assert.ok(siteHeader(route.key).includes('href="'+route.href+'"'));
});

test('páginas demonstrativas contêm material legível e links válidos',()=>{
  const output=[homePage(),learnPage(),lessonPage(),atlasPage(),practicePage(),aboutPage()];
  output.forEach(h=>{
    assert.ok(h.length>250);
    assert.ok(!h.includes('undefined'));
    assert.ok(!h.includes('[object Object]'));
  });
  assert.match(lessonPage(),/data-font="larger"/);
  assert.match(learnPage(),/#\/aula\/primeiro-olhar/);
  assert.match(homePage(),/#\/atlas/);
  assert.match(atlasPage(),/id="atlas-search"/);
  assert.match(atlasCards(cards),/O Louco/);
  assert.match(detailPage(cards[0]),/Fonte da imagem/);
  assert.match(detailPage(cards[0]),/noopener noreferrer/);
});

test('página usa caminhos relativos compatíveis com GitHub Pages',()=>{
  const index=source('index.html');
  assert.match(index,/lang="pt-BR"/);
  assert.match(index,/viewport/);
  for(const resource of ['styles/tokens.css','styles/base.css','styles/components.css','src/app/main.js']){
    assert.ok(index.includes('./'+resource));
    assert.ok(source(resource).length>100);
  }
  assert.ok(!index.includes('href="/styles/'));
  assert.ok(!index.includes('src="/src/'));
});

test('pesquisa visual revela estados e navegação por teclado',()=>{
  assert.match(atlasPage(),/label class="search-field"/);
  assert.match(atlasCards(cards),/aria-label="Abrir/);
  assert.match(lessonPage(),/data-font="normal"/);
  assert.match(source('styles/components.css'),/prefers-reduced-motion|focus-visible|font-controls/);
  assert.match(source('styles/base.css'),/prefers-reduced-motion/);
});
