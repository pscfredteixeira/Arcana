import {majorExplanation} from './accessibleMajors.js';
import {accessiblePausCopas} from './accessiblePausCopas.js';
import {accessibleEspadasOuros} from './accessibleEspadasOuros.js';

/**
 * 78 explicações aprofundadas em linguagem corrente.
 * Cada texto explica a relação entre um detalhe visual concreto e o tema da carta.
 * São textos editoriais do ARCANA, não traduções nem citações dos autores.
 */
export const accessibleCardProse=Object.freeze({
 ...majorExplanation,
 ...accessiblePausCopas,
 ...accessibleEspadasOuros
});
