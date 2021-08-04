import {NgModule} from "@angular/core";
import {ServiceComponent} from "./service/service.component";
import {ServicesComponent} from "./services.component";
import {CommonModule} from "@angular/common";
import {ServicesRoutingModule} from "./services-routing.module";

@NgModule({
  declarations: [
    ServicesComponent,
    ServiceComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule {

}
