import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidePassword',
  standalone: true
})
export class HidePasswordPipe implements PipeTransform {

  transform(password: string): string {
    return password.replace(/./g, '*');
  }

}
