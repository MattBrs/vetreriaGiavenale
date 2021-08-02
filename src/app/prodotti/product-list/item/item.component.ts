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
          backgroundColor: '#add8e6',
          marginBottom: '10px',
          color: '#074455',
          borderRadius: '20px'
        })),
        state('hover', style({
          backgroundColor: '#074455',
          marginBottom: '10px',
          color: '#add8e6',
          borderRadius: '20px'
        })),
        transition('normal => hover', [
          animate(200)
        ]),
        transition('hover => normal', [
          animate(400)
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
