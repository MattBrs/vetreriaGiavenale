import {NgModule} from "@angular/core";
import {ProductsRoutingModule} from "./products-routing.module";
import {ProductsComponent} from "./products.component";
import {CommonModule} from "@angular/common";
import { ProductListComponent } from './product-list/product-list.component';
import { ItemComponent } from './product-list/item/item.component';
import { SelectCategoryPipe } from './select-category.pipe';
import { HighlightDirective } from './product-list/item/highlight.directive';




@NgModule({
  declarations:[
    ProductsComponent,
    ProductListComponent,
    ItemComponent,
    SelectCategoryPipe,
    HighlightDirective
  ],
    imports: [
      ProductsRoutingModule,
      CommonModule,
    ]
})
export class ProductsModule {

}
