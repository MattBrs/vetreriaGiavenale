import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../shared/product.model";

@Pipe({
  name: 'selectCategory'
})
export class SelectCategoryPipe implements PipeTransform {

  transform(value: Product[],selectedCategory: string): any {
    if(value.length<=0 || selectedCategory == ''){
      return value;
    }

    let newProducts: Product[] = [];
    for(let item of value){
      if(item.category == selectedCategory){
        newProducts.push(item);
      }
    }
    return newProducts;

  }

}
