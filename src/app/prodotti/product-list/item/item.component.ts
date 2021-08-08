import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../shared/product.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  animations: [
      trigger('hoverAnimation', [
        state('normal', style({
          backgroundColor: '#e91e63',
        })),
        state('hover', style({
          backgroundColor: '#9c27b0',
          width: '90%'
        })),
        transition('normal => hover', [
          animate(200)
        ]),
        transition('hover => normal', [
          animate(200)
        ])
      ])
    ]
})
export class ItemComponent implements OnInit {
  @Input('product') item: Product = new Product('jars', '', '', 0);
  divState = 'normal';

  constructor() { }

  onStateChange() {
    this.divState = this.divState=='normal' ? 'hover':'normal';
  }

  ngOnInit(): void {
  }

}
