import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductsService} from "../products.service";
import {Product} from "../../shared/product.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  paramsSub: Subscription | null = null;
  productCategory: string = '';
  listSub: Subscription | null = null;
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productsService.products;
    this.paramsSub = this.route.paramMap.subscribe(
      params => {
        this.productCategory = <string>params.get('category');
      }
    );
    this.listSub = this.productsService.fetchProducts().subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
