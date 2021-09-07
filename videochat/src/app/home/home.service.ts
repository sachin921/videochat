import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  rootURL = '/api';
  setLoggedInStatus(value:string)
  {
  //this.loggedInStatus=value
  localStorage.setItem('isLoggedIn', value);
  }
  //login
	login(login:any)
	{
		return this.http.post(this.rootURL+'/login', {login});
	}
}
