import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {AuthGuard} from "../auth/auth.guard";
import {ProductResolver} from "./product-list/product.resolver";

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: ':category',
        component: ProductListComponent
      }
    ],
    canActivate: [AuthGuard],
    resolve: {products: ProductResolver}
  }
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {

}
