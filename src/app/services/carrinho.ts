import { Service, signal } from '@angular/core';

@Service()
export class Carrinho {
  //cria uma  variável qualquer para receber
  itensDoCarrinho = signal<any[]>([]); //para a reatividade

  adicionarProduto(produto: any) {
    this.itensDoCarrinho.update((itens) => [...itens, produto]); //recupera os ultimos itens declarados e adiciona o produto.
  }

  obterQuantidade(): number {
    return this.itensDoCarrinho().length;
  }
}
