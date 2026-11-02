import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { InterfaceProduto, Produto } from '../../services/produto';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
  imports: [CommonModule, CurrencyPipe, UpperCasePipe, TruncatePipe, DiscountPipe],
  selector: 'app-card-produto',
  styleUrl: './card-produto.css',
  templateUrl: './card-produto.html',
})
export class CardProduto {
  //Faço o input da interface? Não sabia!!!
  //Componente FILHO do PAI(lista-produtos.html)
  @Input() produto?: InterfaceProduto;

  //emite para o sftw inteiro do que está saindo daqui.
  //como não sabemos  o que vem no evento colocamos o tipo any.
  //O EventEmitter é uma classe nativa do Angular responsável por gerenciar eventos.
  //Melhor tipar com o meu contrato InterfaceProduto
  @Output() adicionarAoCarrinho = new EventEmitter<InterfaceProduto>();

  //instanciar a partir do EventEmitter, que tá escutando um evento, através da propriedade "adicionar" eu capturo no metodo clicouComprar() o que vou emitir:"this.produto"

  clicouComprar(): void {
    this.adicionarAoCarrinho.emit(this.produto); //envia um unico objeto, o objeto clicado.
    console.log('Produto enviado', this.produto);
  }
}
