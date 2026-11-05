import { createAction, props } from '@ngrx/store';
import { IProduto } from '../../services/produto';

/**
 * ACTIONS
 * Representam a intenção de mudar o estado.
 * São mensagens que dizem o que aconteceu no componente, não alteram o estado diretamente
 */

export const adicionarProduto = createAction(
  '[Carrinho] Adicionar Produto', //quem vai mandar a ação é o carrinho. Isso é um nome qualquer>só pra indiccar o que está acontecendo.
  props<{ produto: IProduto }>(),
);

export const clearCart = createAction('[Carrinho] Esvaziar Carrinho');


