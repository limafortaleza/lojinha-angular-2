import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  // Ajuste na tipagem para aceitar null ou undefined
  transform(value: number | null | undefined, percentual: number = 10): number  {
    // Se não houver valor, retorna o próprio null/undefined para não quebrar a tela
    if (value === undefined || value ===null) {
      return 0;
    }
    return value - value * (percentual / 100);
  }
}

//o value é o valor que vem do objeto (produto.price)
//e o percentual eu decido lá no uso da pipe. Se não passar nada vou assumir que é 10 (percentual).
