import { Component } from '@angular/core';
import { Carrinho } from '../../services/carrinho';

@Component({
  imports: [],
  selector: 'app-cabecalho',
  styleUrl: './cabecalho.css',
  templateUrl: './cabecalho.html',
})
export class Cabecalho {

  //trazer o carrinho para cá, pq eu quero exibir no meu cabeçalho o método de Obter quantidade da service carrinho
  constructor(public cartService:Carrinho){}

}
