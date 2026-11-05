import { Component, inject } from '@angular/core';
// import { Carrinho } from '../../services/carrinho';
import { Store } from '@ngrx/store';
import { selectQuantItens } from '../../store/cart';
import { clearCart } from '../../store/cart';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-cabecalho',
  styleUrl: './cabecalho.css',
  templateUrl: './cabecalho.html',
})
export class Cabecalho {
  private store = inject(Store);

  //Lendo o cofre
  quantidade = this.store.selectSignal(selectQuantItens);

  esvaziarCarrinho(): void {
    this.store.dispatch(clearCart());
  }
}
