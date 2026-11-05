import { Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { adicionarProduto } from '../../store/cart'; //veio da Action, pq cortamos a service
import { IProduto, Produto } from '../../services/produto';
import { CardProduto } from '../card-produto/card-produto';
// import { Carrinho } from '../../services/carrinho'; //A service do carrinho não serve mais.

@Component({
  imports: [CardProduto],
  selector: 'app-lista-produtos',
  styleUrl: './lista-produtos.css',
  templateUrl: './lista-produtos.html',
})
export class ListaProdutos implements OnInit {
  //Importa a interface.
  produtos = signal<IProduto[]>([]);
  carregando = signal(true); //assim que o componente é renderizado o componente está carregando.

  constructor(
    private productService: Produto,
    private store: Store,
    // private cartService: Carrinho,
  ) {}

  ngOnInit(): void {
    this.carregarProdutos(); //questão de boa prática. Função da fora do ngOnInit
  }

  carregarProdutos(): void {

    this.productService.obterProdutos().subscribe({
      next: (dadosDaApi: IProduto[]) => {
        console.log('Produtos Chegaram', dadosDaApi);
        this.produtos.set(dadosDaApi);
        this.carregando.set(false);
      },
      error: (error: any) => {
        console.error('Opa, deu ruim!', error);
        this.carregando.set(false);
        alert('Ocorreu um erro ao carregar a lista de produtos!');
      },
    });
  }

  receberProduto(produto: any) {
    alert(`Produto Adicionado: ${produto.title}`);
    this.store.dispatch(adicionarProduto({ produto }));
    console.log('Produto recebido', produto);
  }
}
