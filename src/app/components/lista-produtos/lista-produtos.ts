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

  //Injetando a dependência (SO QUE NÃO É A FORMA MODERNA DE INJETAR A DEPENDENCIA)
  //Importação do bloco da Service Produto
  //Importando o carrinho pra cá tb:private cartService: Carrinho
  constructor(
    private productService: Produto,
    private store: Store,
    // private cartService: Carrinho,
  ) {}

  ngOnInit(): void {
    this.carregarProdutos(); //questão de boa prática. Função da fora do ngOnInit
  }

  carregarProdutos(): void {
    //Simulação do carregamento de vitrine
    // setTimeout(() => {
    //   this.produtos = this.productService.arrayDeProdutos;
    //   this.carregando.set(false);
    // }, 1000);

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
    // alert(`Produto Adicionado: ${produto.title} no valor de R$ ${produto.price}`);
    this.store.dispatch(adicionarProduto({ produto }));
    // this.cartService.adicionarProduto(produto); //enviei para a service Carrinho o produto clicado (adicionado)
    console.log('Produto recebido', produto);
  }
}
