import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

//REGRA DE NEGÓCIO
export interface IProduto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}

@Service()
export class Produto {
  //1.Injetar o HTTPCliente:
  private http = inject(HttpClient);

  // 2. A URL oficial da API que vamos consumir
  private apiUrl = 'https://fakestoreapi.com/products';

  obterProdutos(): Observable<IProduto[]> {
    // 3. Faz um pedido do tipo GET e retorna um Observable
    return this.http.get<IProduto[]>(this.apiUrl);
  }

  getProductById(id: number | string): Observable<IProduto> {
    // 4. Faz um pedido do tipo GET para um produto específico
    return this.http.get<IProduto>(`${this.apiUrl}/${id}`);
  }

  
}
