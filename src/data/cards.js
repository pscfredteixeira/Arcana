import {expandedCards} from './atlasCatalogue.js';
/**
 * ARCANA / Sprint 1
 * Six initial RWS cards. Editorial notes are original summaries intended for a UI preview,
 * not the full curriculum. Additional cards require editorial review before inclusion.
 * Artwork: Pamela Colman Smith (1910), public-domain scans via Wikimedia Commons.
 */
const COMMONS_ROOT = 'https://commons.wikimedia.org/wiki/File:';
const IMAGE_ROOT = 'https://commons.wikimedia.org/wiki/Special:FilePath/';

function sourceFile(name) {
  return COMMONS_ROOT + encodeURIComponent(name.replaceAll(' ', '_'));
}
function imageFile(name) {
  return IMAGE_ROOT + encodeURIComponent(name.replaceAll(' ', '_')) + '?width=550';
}
const records = [
  {
    id: 'rws-00', numeral:'0', name:'O Louco', slug:'o-louco',
    tagline:'A possibilidade antes do primeiro passo.',
    keywords:['Início', 'Abertura', 'Risco', 'Movimento'],
    file:'RWS Tarot 00 Fool.jpg',
    sight:'Observe a figura que caminha perto da borda de um precipício, o pequeno animal e a paisagem ao fundo.',
    meaning:'Uma imagem de movimento e abertura ao desconhecido. Pode sugerir disposição para começar, mas também convida a perguntar que riscos ainda não foram percebidos.',
    reflect:'O que, na imagem, transmite confiança? O que poderia transmitir imprudência?'
  },
  {
    id:'rws-01', numeral:'I', name:'O Mago', slug:'o-mago',
    tagline:'Intenção, atenção e possibilidade de agir.',
    keywords:['Iniciativa', 'Recursos', 'Ação', 'Concentração'],
    file:'RWS Tarot 01 Magician.jpg',
    sight:'Procure a postura do personagem, uma mão erguida e outra apontada para a terra, e os quatro objetos sobre a mesa.',
    meaning:'O Mago apresenta uma figura que dirige a atenção para o que pode fazer. A presença de instrumentos variados favorece a leitura de habilidades disponíveis e ações deliberadas.',
    reflect:'Que diferença você percebe entre possuir recursos e saber mobilizá-los?'
  },
  {
    id:'rws-02', numeral:'II', name:'A Sacerdotisa', slug:'a-sacerdotisa',
    tagline:'Silêncio, observação e conhecimento velado.',
    keywords:['Interioridade', 'Escuta', 'Mistério', 'Intuição'],
    file:'RWS Tarot 02 High Priestess.jpg',
    sight:'Observe as duas colunas, o véu atrás da figura e a postura frontal e imóvel.',
    meaning:'A cena valoriza a contenção e aquilo que nem sempre é dito de imediato. A leitura pode explorar a diferença entre agir rapidamente e conceder tempo à observação.',
    reflect:'Quais detalhes dão a impressão de que existe algo além do que vemos?'
  },
  {
    id:'rws-03', numeral:'III', name:'A Imperatriz', slug:'a-imperatriz',
    tagline:'Vida sensível, criação e abundância.',
    keywords:['Cultivo', 'Criação', 'Natureza', 'Cuidado'],
    file:'RWS Tarot 03 Empress.jpg',
    sight:'Repare na vegetação, na água, nas vestes e na posição relaxada da personagem.',
    meaning:'A imagem reúne ambiente fértil e uma postura receptiva. Essa combinação pode ser observada como metáfora para cultivo, criatividade e atenção aos ritmos da vida.',
    reflect:'Que elementos tornam a cena acolhedora? Essa sensação muda ao olhar seus detalhes?'
  },
  {
    id:'rws-04', numeral:'IV', name:'O Imperador', slug:'o-imperador',
    tagline:'Estrutura, estabilidade e responsabilidade.',
    keywords:['Ordem', 'Limites', 'Autoridade', 'Forma'],
    file:'RWS Tarot 04 Emperor.jpg',
    sight:'Observe o trono de pedra, os elementos de montanha e a postura firme da figura central.',
    meaning:'A composição enfatiza permanência e estrutura. Uma leitura contextual pode perguntar tanto o que é sustentado pela ordem quanto o que se torna rígido demais.',
    reflect:'O que na carta sugere segurança? E o que pode sugerir inflexibilidade?'
  },
  {
    id:'rws-05', numeral:'V', name:'O Hierofante', slug:'o-hierofante',
    tagline:'Tradições, transmissão e aprendizagem.',
    keywords:['Ensino', 'Tradição', 'Rito', 'Comunidade'],
    file:'RWS Tarot 05 Hierophant.jpg',
    sight:'Repare na figura central, nas duas figuras diante dela e nos símbolos cerimoniais.',
    meaning:'A cena sugere uma relação de transmissão de conhecimento e autoridade ritual. Pode convidar à reflexão sobre o valor das tradições e sobre a liberdade de questioná-las.',
    reflect:'Como a cena diferencia quem ensina, quem aprende e o conhecimento transmitido?'
  }
];

const allRecords = [...records.map((c,rank)=>({...c,arcana:'major',suit:null,rank})),...expandedCards];
export const cards = allRecords.map(card => ({
  ...card,
  image:imageFile(card.file),
  commons:sourceFile(card.file),
  imageLicense:'Obra histórica Rider–Waite–Smith de Pamela Colman Smith (1910). Consulte a licença e a procedência do arquivo no Wikimedia Commons.'
}));

export const findCard = slug => cards.find(card=>card.slug===slug);
