import { Component, inject, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearCart, selectItensCarrinho, selectQuantItens } from '../../store/cart';
import { IProduto } from '../../services/produto';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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

  pedidoConcluido = signal(false);

  nomeCliente = signal('');
  emailCliente = signal('');

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

  //reforço de vaildação - opcional
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

    this.pedidoConcluido.set(true);

    this.store.dispatch(clearCart());

    // this.checkoutForm.reset({
    //   pagamento: 'cartão',
    // });
  }
}
