import { createReducer, on } from '@ngrx/store';
import { IProduto } from '../../services/produto';
import { adicionarProduto, clearCart } from './cart.action';


export interface CartState {
  // contrato do meu status
  itens: IProduto[];
}


export const cartInitialState: CartState = {
  itens: [], //quando a aplicação é carregada, começa com um array vazio.
};


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
