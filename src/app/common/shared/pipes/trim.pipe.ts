import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: string, args = 70): any {
    
    return value.length > args ? `${value.substring(0, args)} ...` : value;
  }

}
