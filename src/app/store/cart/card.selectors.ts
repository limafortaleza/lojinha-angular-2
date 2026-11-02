import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

/**
 * SELECTORS
 * Funções usadas para ler fatias especificas do cofre
 */

//Pega a fatia principal do cofre global
export const selectCartState = createFeatureSelector<CartState>('cart');

// le a lista completa de itens do carrinho
export const selectItensCarrinho = createSelector(selectCartState, (state) => state.itens);

// le so a quantidade total de itens no carrinho
export const selectQuantItens = createSelector(selectCartState, (state) => state.itens.length);
