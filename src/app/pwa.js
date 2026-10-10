/**
 * ARCANA · Convite de instalação. iOS não oferece beforeinstallprompt:
 * explicamos Compartilhar > Adicionar à Tela de Início, sem simular
 * a interface do sistema ou prometer uma instalação automática.
 */
export const INSTALL_DISMISS_KEY='arcana-install-dismissed-until-v1';
export const INSTALL_WAIT_DAYS=14;
let deferredInstall=null;
let initialized=false;
let invitation=null;
const isStandalone=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const isIOS=()=>/iPad|iPhone|iPod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const safariOnIOS=()=>isIOS()&&/Safari/i.test(navigator.userAgent)&&!/CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|Instagram|FBAN|FBAV/i.test(navigator.userAgent);
const safeRead=()=>{try{return Number(localStorage.getItem(INSTALL_DISMISS_KEY))||0;}catch{return 0;}};
const safeWrite=value=>{try{localStorage.setItem(INSTALL_DISMISS_KEY,String(value));}catch{}};
const icon='./apple-touch-icon.png?v=5';

export function installGuideMarkup({safari=safariOnIOS(),android=false}={}){
 const intro=safari
  ?'<ol class="pwa-install-steps"><li><span>01</span><p>No <strong>Safari</strong>, toque em <strong>Compartilhar</strong>. Se necessário, abra antes o menu da página.</p></li><li><span>02</span><p>Selecione <strong>Adicionar à Tela de Início</strong>.</p></li><li><span>03</span><p>Deixe <strong>Abrir como App da Web</strong> ativado e toque em <strong>Adicionar</strong>.</p></li></ol>'
  :android
   ?'<p class="pwa-install-instruction">Toque em <strong>Instalar aplicativo</strong> para confirmar no navegador.</p>'
   :'<p class="pwa-install-instruction">No iPhone, abra o ARCANA no Safari, toque em <strong>Compartilhar</strong>, escolha <strong>Adicionar à Tela de Início</strong> e ative <strong>Abrir como App da Web</strong>. Em outros navegadores, procure <strong>Instalar</strong> no menu.</p>';
 return '<section class="pwa-invitation" role="region" aria-labelledby="pwa-invitation-title"><button class="pwa-close" type="button" data-pwa-dismiss aria-label="Fechar convite de instalação">×</button>'
  +'<div class="pwa-intro"><img src="'+icon+'" alt="" width="62" height="62" class="pwa-app-icon"><div><span class="eyebrow">ARCANA · NO SEU IPHONE</span><h2 id="pwa-invitation-title">Seu estudo, <em>mais perto.</em></h2></div></div>'
  +'<p class="pwa-invitation-lede">Coloque o ARCANA na tela inicial e abra a escola como um aplicativo. Sem App Store, sem criar uma conta.</p>'
  +intro
  +'<div class="pwa-invitation-actions">'+(android?'<button type="button" class="button" data-pwa-install>Instalar aplicativo</button>':'<button type="button" class="button" data-pwa-understood>Entendi</button>')+'<button type="button" class="button secondary" data-pwa-dismiss>Agora não</button></div>'
  +'<p class="pwa-install-footnote">Já tem anotações? A versão instalada pode usar um armazenamento separado do Safari. <a href="#/meu-estudo" data-pwa-backup>Faça um backup em Meu Estudo</a> antes de instalar.</p></section>';
}
function hideInvitation(remember=false){
 if(remember)safeWrite(Date.now()+INSTALL_WAIT_DAYS*24*60*60*1000);
 if(invitation){invitation.remove();invitation=null;}
}
function showInvitation({manual=false}={}){
 if(isStandalone())return;
 if(!manual&&(!safariOnIOS()||safeRead()>Date.now()))return;
 if(!invitation){
  invitation=document.createElement('div');
  invitation.id='pwa-invite-portal';
  document.body.append(invitation);
 }
 invitation.innerHTML=installGuideMarkup({safari:safariOnIOS(),android:!!deferredInstall&&!isIOS()});
 if(manual)invitation.querySelector('.pwa-close')?.focus();
}
function onClick(event){
 if(event.target.closest('[data-pwa-backup]')){hideInvitation(false);return;}
 if(event.target.closest('[data-pwa-open]')){
  event.preventDefault();showInvitation({manual:true});return;
 }
 if(event.target.closest('[data-pwa-dismiss]')||event.target.closest('[data-pwa-understood]')){hideInvitation(true);return;}
 if(event.target.closest('[data-pwa-install]')){
  if(deferredInstall){
   const eventToPrompt=deferredInstall;
   deferredInstall=null;
   // A instalação do Chrome é acionada somente após o clique humano.
   void (async()=>{try{
    await eventToPrompt.prompt();
    const answer=await eventToPrompt.userChoice;
    if(answer?.outcome==='accepted')hideInvitation(true);
   }catch{showInvitation({manual:true});}})();
  }else{showInvitation({manual:true});}
 }
}
async function registerSW(){
 if(!('serviceWorker' in navigator)||!window.isSecureContext)return;
 try{
  const url=new URL('../../sw.js',import.meta.url);
  await navigator.serviceWorker.register(url.href,{scope:new URL('../../',import.meta.url).pathname,updateViaCache:'none'});
 }catch(error){
  // Falha de cache não impede uso online da escola.
  console.warn('ARCANA: modo offline indisponível neste navegador.',error);
 }
}
export function initPWA(){
 if(initialized)return;
 initialized=true;
 document.addEventListener('click',onClick);
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredInstall=event;});
 window.addEventListener('appinstalled',()=>hideInvitation(true));
 if(document.readyState==='complete')void registerSW();
 else window.addEventListener('load',()=>void registerSW(),{once:true});
 if(!isStandalone()&&safariOnIOS()&&safeRead()<=Date.now())window.setTimeout(()=>showInvitation(),1400);
}
export function getInstallState(){
 return {installed:isStandalone(),ios:isIOS(),iosSafari:safariOnIOS(),suppressedUntil:safeRead()};
}
