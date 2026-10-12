import test from 'node:test';
import assert from 'node:assert/strict';
import {journeyTasks} from '../src/journey/majorJourneyData.js';
import {MAJOR_JOURNEY_KEY,loadMajorJourney} from '../src/journey/majorJourneyLogic.js';
import {majorStationPage,handleMajorJourneyClick,handleMajorJourneyInput,majorJourneyHub} from '../src/journey/majorJourneyUI.js';

test('integração completa de uma estação: ver, compreender, tentar, rever, concluir e anotar',()=>{
 const prevDocument=globalThis.document,prevStorage=globalThis.localStorage;
 const data=new Map();
 globalThis.localStorage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};
 const root={dataset:{majorSlug:'o-louco'},innerHTML:'',querySelector:()=>({focus(){}})};
 globalThis.document={getElementById:id=>id==='major-journey-root'?root:null};
 const click=(kind,val)=>handleMajorJourneyClick({closest:()=>({hasAttribute:x=>x===kind,dataset:{majorChoice:String(val)}})});
 try{
  assert.ok(majorStationPage('o-louco').includes('major-journey-root'));
  assert.equal(click('data-major-stage'),true);
  assert.equal(loadMajorJourney(globalThis.localStorage).stage,'understand');
  assert.ok(root.innerHTML.includes('Por que esse significado?'));
  assert.equal(click('data-major-stage'),true);
  assert.equal(loadMajorJourney(globalThis.localStorage).stage,'practice');
  assert.ok(root.innerHTML.includes('data-major-choice'));
  assert.equal(click('data-major-choice',0),true);
  assert.equal(loadMajorJourney(globalThis.localStorage).completed.length,0);
  assert.ok(root.innerHTML.includes('Ainda não'));
  assert.equal(click('data-major-choice',journeyTasks['o-louco'].answer),true);
  assert.deepEqual(loadMajorJourney(globalThis.localStorage).completed,['o-louco']);
  assert.ok(root.innerHTML.includes('Ir para a próxima carta'));
  assert.equal(handleMajorJourneyInput({id:'major-note',dataset:{majorNote:'o-louco'},value:'Aprendi que um começo precisa de coragem e atenção.'}),true);
  assert.match(loadMajorJourney(globalThis.localStorage).notes['o-louco'],/coragem e atenção/);
  assert.ok(majorJourneyHub().includes('1 <small>de 22'));
  assert.ok(data.has(MAJOR_JOURNEY_KEY));
 }finally{globalThis.document=prevDocument;globalThis.localStorage=prevStorage;}
});
