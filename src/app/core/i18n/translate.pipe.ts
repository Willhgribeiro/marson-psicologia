import { Pipe, PipeTransform } from '@angular/core';
import { ptBR } from './pt-br';

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  transform(key: string): string {
    const segments = key.split('.');
    let value: any = ptBR;

    for (const segment of segments) {
      if (value && typeof value === 'object' && segment in value) {
        value = value[segment];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }
}
