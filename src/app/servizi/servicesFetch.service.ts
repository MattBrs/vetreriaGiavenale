import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Service} from "./service.model";

@Injectable({
  providedIn: 'root'
})
export class ServicesFetchService {
  constructor(private http: HttpClient) {
  }

  fetchData(){
    return this.http.get<Service[]>('https://vetreriagiavenale-default-rtdb.europe-west1.firebasedatabase.app/services.json');
  }
}
