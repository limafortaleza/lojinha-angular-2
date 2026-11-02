// import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Checkout } from './pages/checkout/checkout';
import { Home } from './pages/home/home';
import { ProdutoDetalhe } from './pages/produto-detalhe/produto-detalhe';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'checkout', component: Checkout },
  { path: 'produto/:id',component:ProdutoDetalhe },
  { path: '**', redirectTo: '' }, //tem que ser sempre a ultima
];
