import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../shared/product.model";
import { tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [];

  constructor(private http: HttpClient) {
  }

  fetchProducts(){
    return this.http.get<Product[]>(
      'https://vetreriagiavenale-default-rtdb.europe-west1.firebasedatabase.app/products.json'
    ).pipe(
      tap(products => {
        this.products = products;
      })
    );
  }
}
