import { Component, inject, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  clearCart,
  selectItensCarrinho,
  selectQuantItens,
  selectSomaItens,
} from '../../store/cart';
import { IProduto } from '../../services/produto';

import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DiscountPipe],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  //Lendo os dados do cofre - vindos do card.selector
  quantidade = this.store.selectSignal(selectQuantItens);
  itens: Signal<IProduto[]> = this.store.selectSignal(selectItensCarrinho);
  totalCarrinho = this.store.selectSignal(selectSomaItens);

  pedidoConcluido = signal(false);

  nomeCliente = signal('');
  emailCliente = signal('');
  valorFinalCompra = signal(0);

  checkoutForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cep: ['', [Validators.required, Validators.maxLength(9), Validators.pattern(/^\d{5}-?\d{3}$/)]],
    endereco: ['', [Validators.required, Validators.minLength(5)]],
    cidade: ['', [Validators.required, Validators.minLength(5)]],
    pagamento: ['', [Validators.required]],
    numeroCartao: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    codigoSeguranca: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
  });

  // VALIDAÇÃO DOS COMPOS , CASO EU SELECIONE PIX OU BOLETO.

  constructor() {
    this.checkoutForm.get('pagamento')?.valueChanges.subscribe((metodo) => {
      const numeroCartao = this.checkoutForm.get('numeroCartao');
      const codigoSeguranca = this.checkoutForm.get('codigoSeguranca');

      if (metodo === 'cartão') {
        numeroCartao?.setValidators([
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ]);
        codigoSeguranca?.setValidators([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
        ]);
      } else {
        numeroCartao?.clearValidators();
        codigoSeguranca?.clearValidators();

        numeroCartao?.setValue('');
        codigoSeguranca?.setValue('');
      }
    });
  }

  //reforço de vaildação - opcional - PARA QUALQUER CAMPO.
  isCampoInvalido(campo: string): boolean {
    const controle = this.checkoutForm.get(campo);
    return !!(controle && controle.invalid && (controle.dirty || controle.touched));
  }

  finalizarPedido(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.nomeCliente.set(this.checkoutForm.get('nome')?.value);
    this.emailCliente.set(this.checkoutForm.get('email')?.value);
    this.valorFinalCompra.set(this.totalCarrinho());

    this.pedidoConcluido.set(true);

    this.store.dispatch(clearCart());
  }
}
