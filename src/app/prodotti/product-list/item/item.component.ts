import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../shared/product.model";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input('product') item: Product = new Product('jars', '', '', 0);

  constructor() { }

  ngOnInit(): void {
  }

}
