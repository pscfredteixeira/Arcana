import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {installGuideMarkup,INSTALL_WAIT_DAYS} from '../src/app/pwa.js';

const text=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('ARCANA tem manifesto instalável com os ícones corretos',()=>{
 const manifest=JSON.parse(text('manifest.webmanifest'));
 assert.equal(manifest.short_name,'ARCANA');
 assert.equal(manifest.display,'standalone');
 assert.equal(manifest.scope,'./');
 assert.equal(manifest.start_url,'./#/');
 assert.equal(manifest.icons.find(i=>i.sizes==='192x192').type,'image/png');
 assert.equal(manifest.icons.find(i=>i.sizes==='512x512').type,'image/png');
 for(const icon of manifest.icons){
  const path=icon.src.replace(/^\.\//,'');
  assert.ok(existsSync(new URL('../'+path,import.meta.url)),path);
 }
 for(const size of [180,192,512]){
  const path=new URL('../icons/icon-'+size+'.png',import.meta.url);
  assert.ok(existsSync(path),'Icon '+size);
  const png=readFileSync(path);
  assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16),size);
  assert.equal(png.readUInt32BE(20),size);
 }
});
test('o cache local inclui os arquivos necessários e mantém a navegação offline em falhas de conexão',()=>{
 const sw=text('sw.js');
 const match=sw.match(/const APP_SHELL=(\[[\s\S]*?\]);/);
 assert.ok(match,'Array APP_SHELL');
 const files=JSON.parse(match[1]);
 assert.ok(files.includes('./manifest.webmanifest'));
 assert.ok(files.includes('./icons/icon-180.png'));
 for(const file of files){
  assert.ok(existsSync(new URL('../'+file.replace(/^\.\//,''),import.meta.url)),file);
 }
 assert.match(sw,/caches\.open/);
 assert.match(sw,/cache\.match/);
 assert.match(sw,/fetch\(request\)/);
});
test('iPhone recebe orientações reais de instalação, nunca um botão falso de instalação iOS',()=>{
 const markup=installGuideMarkup({safari:true,android:false});
 assert.match(markup,/Adicionar à Tela de Início/);
 assert.match(markup,/Compartilhar/);
 assert.match(markup,/Abrir como App da Web/);
 assert.doesNotMatch(markup,/data-pwa-install/);
 assert.match(markup,/data-pwa-understood/);
 assert.equal(INSTALL_WAIT_DAYS,14);
 const android=installGuideMarkup({safari:false,android:true});
 assert.match(android,/data-pwa-install/);
});
test('a marca visual e o nome do app não mostram o antigo subtítulo',()=>{
 const manifest=JSON.parse(text('manifest.webmanifest'));
 const index=text('index.html');
 const header=text('src/ui/templates.js');
 const app=text('src/app/main.js');
 const study=text('src/study/studyUI.js');
 for(const s of [manifest.name,index,header,app,study]){
  assert.doesNotMatch(s,/arquivo vivo/i);
 }
 assert.match(header,/logo-main">ARCANA/);
 assert.match(index,/apple-touch-icon/);
 assert.match(index,/manifest\.webmanifest/);
 assert.match(index,/styles\/pwa\.css/);
});
