import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'https://www.skyposium.com/api/';

@Injectable({
  providedIn: 'root'
})


export class RegisterService {

  constructor(private http: HttpClient) { }
  rootURL = '/api';
  create(user:any)
  {
   
      return this.http.post(this.rootURL+'/user', {user});
  }
  


}
