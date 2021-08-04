import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicesFetchService} from "./servicesFetch.service";
import {Service} from "./service.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-services',
  templateUrl: 'services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {
  services: Service[] = []
  serviceSub = new Subscription();
  constructor(private fetchService: ServicesFetchService) { }

  ngOnInit(): void {
    this.serviceSub = this.fetchService.fetchData().subscribe( response => {
      this.services = response;
    });
  }
  ngOnDestroy() {
    this.serviceSub.unsubscribe();
  }

}
