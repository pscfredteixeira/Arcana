import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cards} from '../src/data/cards.js';
import {diamondContent} from '../src/data/diamondContent.js';
import {positions,cardSlugs,emptyDiamond,normalizedDiamond,placeCard,clearSlot,allPlaced,gradeBoard,evaluateOption} from '../src/games/diamondLogic.js';

test('origem do exercício e configuração correspondem às quatro cartas da obra',()=>{
 assert.match(diamondContent.source,/Rachel|quatro cartas|capítulo 1/i);
 assert.deepEqual(cardSlugs,['o-louco','o-mago','a-sacerdotisa','o-mundo']);
 assert.equal(diamondContent.placements.top.card,'o-louco');
 assert.equal(diamondContent.placements.bottom.card,'o-mundo');
 assert.equal(diamondContent.placements.left.card,'o-mago');
 assert.equal(diamondContent.placements.right.card,'a-sacerdotisa');
 assert.ok(cardSlugs.every(slug=>cards.some(c=>c.slug===slug)));
});
test('composição evita cartas duplicadas e permite reposicionar',()=>{
 let board=emptyDiamond().board;
 board=placeCard(board,'top','o-louco');
 board=placeCard(board,'left','o-louco');
 assert.equal(board.top,null);
 assert.equal(board.left,'o-louco');
 board=clearSlot(board,'left');
 assert.equal(board.left,null);
 board=placeCard(board,'left','o-mago');
 assert.equal(allPlaced(board),false);
 board=placeCard(board,'top','o-louco');
 board=placeCard(board,'right','a-sacerdotisa');
 board=placeCard(board,'bottom','o-mundo');
 assert.equal(allPlaced(board),true);
 assert.equal(gradeBoard(board).correct,true);
 const swapped={...board,top:'o-mundo',bottom:'o-louco'};
 assert.equal(gradeBoard(swapped).correct,false);
 assert.deepEqual(gradeBoard(swapped).errors,['top','bottom']);
});
test('estado salvo inválido é normalizado sem duplicar cartas',()=>{
 const result=normalizedDiamond({step:'axes',board:{top:'o-louco',bottom:'o-louco',left:'invalida'},axisIndex:99,reflection:'teste'});
 assert.equal(result.board.top,'o-louco');
 assert.equal(result.board.bottom,null);
 assert.equal(result.board.left,null);
 assert.equal(result.axisIndex,0);
 assert.equal(result.reflection,'teste');
 assert.equal(normalizedDiamond(null).step,'compose');
});
test('fases interpretativas só admitem explicações justificadas',()=>{
 assert.equal(diamondContent.axes.length,2);
 for(const axis of diamondContent.axes){
  assert.equal(axis.options.filter(o=>o.correct).length,1);
  for(const option of axis.options){
   const result=evaluateOption(axis.options,option.id);
   assert.equal(result.correct,option.correct);
   assert.ok(result.explanation.length>40);
  }
 }
 assert.equal(diamondContent.scenario.options.filter(o=>o.correct).length,1);
 assert.equal(evaluateOption(diamondContent.scenario.options,'b').correct,true);
 assert.equal(evaluateOption(diamondContent.scenario.options,'nope'),null);
});
test('navegação, CSS e jogo foram integrados ao site',()=>{
 const app=readFileSync(new URL('../src/app/main.js',import.meta.url),'utf8');
 const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const game=readFileSync(new URL('../src/games/diamondGame.js',import.meta.url),'utf8');
 const css=readFileSync(new URL('../styles/games.css',import.meta.url),'utf8');
 assert.match(app,/praticas\/diamante/);
 assert.match(app,/handleDiamondClick/);
 assert.match(app,/renderDiamond/);
 assert.match(app,/handleDiamondInput/);
 assert.match(index,/styles\/games.css/);
 assert.match(game,/data-dia-pick/);
 assert.match(game,/data-dia-slot/);
 assert.match(game,/data-dia-check/);
 assert.match(game,/role="status"/);
 assert.match(css,/@media\(max-width:760px\)/);
});
test('jogo termina as três etapas, com escolhas e feedback sem arrastar',async()=>{
 const memory=new Map();
 globalThis.localStorage={
   getItem(key){return memory.get(key)??null;},
   setItem(key,value){memory.set(key,String(value));}
 };
 const root={innerHTML:'',querySelector(){return null;}};
 globalThis.document={getElementById(id){return id==='diamond-root'?root:null;},querySelector(){return null;}};
 const game=await import('../src/games/diamondGame.js');
 const click=(selector,data={})=>({closest(query){return query===selector?{dataset:data}:null;}});
 game.renderDiamond();
 assert.match(root.innerHTML,/Recrie o diamante/);
 for(const [pos,slug] of [['top','o-louco'],['left','o-mago'],['right','a-sacerdotisa'],['bottom','o-mundo']]){
  game.handleDiamondClick(click('[data-dia-pick]',{diaPick:slug}));
  game.handleDiamondClick(click('[data-dia-slot]',{diaSlot:pos}));
 }
 game.handleDiamondClick(click('[data-dia-check]'));
 assert.equal(game.getDiamondSnapshot().step,'axes');
 game.handleDiamondClick(click('[data-dia-axis]',{diaAxis:'a'}));
 game.handleDiamondClick(click('[data-dia-axis-next]'));
 assert.equal(game.getDiamondSnapshot().axisIndex,1);
 game.handleDiamondClick(click('[data-dia-axis]',{diaAxis:'b'}));
 game.handleDiamondClick(click('[data-dia-axis-next]'));
 assert.equal(game.getDiamondSnapshot().step,'scenario');
 game.handleDiamondClick(click('[data-dia-scenario]',{diaScenario:'b'}));
 game.handleDiamondInput({id:'diamond-reflection',value:'Que recursos estão disponíveis para dar o primeiro passo?'});
 game.handleDiamondClick(click('[data-dia-scenario-next]'));
 assert.equal(game.getDiamondSnapshot().step,'complete');
 assert.equal(game.getDiamondSnapshot().completed,true);
 assert.match(root.innerHTML,/Que recursos estão disponíveis/);
 assert.match(memory.get('arcana-diamond-v1'),/"completed":true/);
 game.handleDiamondClick(click('[data-dia-reset]'));
 assert.equal(game.getDiamondSnapshot().step,'compose');
});
