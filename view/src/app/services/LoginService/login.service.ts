import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/API/RegisterAndLogin/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   constructor(private http: Http) {  }

   public User_Login_Validate(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'User_Login_Validate', Info)
      .pipe( map(response => response),  catchError(error => of(error)));
   }

}
