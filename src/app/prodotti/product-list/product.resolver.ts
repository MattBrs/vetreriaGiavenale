import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductsService } from '../products.service';
import {Product} from "../../shared/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product[]> {
  constructor(private productsService: ProductsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> | Product[] {
    if(this.productsService.products.length<=0){
      console.log('fetching data')
      return this.productsService.fetchProducts();
    }
    return this.productsService.products;
  }
}
