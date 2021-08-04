import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicesFetchService} from "./servicesFetch.service";
import {Service} from "./service.model";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

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
    let service: {
      name: string,
      description: string
    }[] = JSON.parse(<string>localStorage.getItem('services'));
    if(service != null){
      this.services = service;
      console.log('services exist');
    }else{
      console.log('services null');
    }


    this.serviceSub = this.fetchService.fetchData().subscribe( response => {
      this.services = response;
      localStorage.setItem('services', JSON.stringify(this.services));
    });
  }
  ngOnDestroy() {
    this.serviceSub.unsubscribe();
  }

}
