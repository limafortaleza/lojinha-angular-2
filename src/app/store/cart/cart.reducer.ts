import { createReducer, on } from '@ngrx/store';
import { IProduto } from '../../services/produto';
import { adicionarProduto, clearCart } from './cart.action';

/**
 * estado
 * Define o formato dos dados guardados no cofre
 */
export interface CartState {
  // contrato do meu status
  itens: IProduto[];
}

/**
 * Como o carrinho começa quando a aplicação é aberta pela primeira vez na sessão
 */
// Estado inicial quando a aplicação é iniciada:

export const cartInitialState: CartState = {
  itens: [], //quando a aplicação é carregada, começa com um array vazio.
};

/**
 * REDUCER
 * Função pura que recebe o estado atual e uma ação disparada
 */

export const CartReducer = createReducer(
  // ler o estado inicial
  cartInitialState,
  on(adicionarProduto, (state, { produto }) => ({
    ...state,
    itens: [...state.itens, produto],
  })),
  on(clearCart, (state) => ({
    ...state,
    itens: [],
  })),
);
