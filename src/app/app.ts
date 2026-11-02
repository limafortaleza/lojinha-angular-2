import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecalho } from './components/cabecalho/cabecalho';
import { Rodape } from './components/rodape/rodape';
import { ListaProdutos } from './components/lista-produtos/lista-produtos';

//Decorator:
@Component({
  imports: [RouterOutlet, Cabecalho, Rodape, ListaProdutos],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // protected readonly title = signal('lojinha-angular');
}
