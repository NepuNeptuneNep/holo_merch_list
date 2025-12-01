import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabcase',
  standalone: true
})
export class KebabPipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/\s+/g, '-');
  }
}