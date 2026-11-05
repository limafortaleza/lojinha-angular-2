import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { IProduto } from '../../services/produto';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, CurrencyPipe, UpperCasePipe, TruncatePipe, DiscountPipe, RouterLink],
  selector: 'app-card-produto',
  styleUrl: './card-produto.css',
  templateUrl: './card-produto.html',
})
export class CardProduto {

  @Input() produto?: IProduto;


  @Output() adicionarAoCarrinho = new EventEmitter<IProduto>();

  
  clicouComprar(): void {
    this.adicionarAoCarrinho.emit(this.produto); //envia um unico objeto, o objeto clicado.
    console.log('Produto enviado', this.produto);
  }
}
