import {Component, Input, OnInit} from '@angular/core';
import {Service} from "../service.model";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  @Input('service') item: Service = new Service('', '');
  constructor() { }

  ngOnInit(): void {
  }

}
