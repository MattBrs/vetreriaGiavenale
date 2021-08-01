import {NgModule} from "@angular/core";
import {ProductsRoutingModule} from "./products-routing.module";
import {ProductsComponent} from "./products.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations:[ProductsComponent],
  imports: [
    ProductsRoutingModule,
    CommonModule
  ]
})
export class ProductsModule {

}
