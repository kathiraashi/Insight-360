import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../LoginService/login.service';

const API_URL = 'http://localhost:3000/API/Product/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   headers;
   constructor(private http: Http, private Service: LoginService) {
     this.headers = new Headers();
   }

   ValidateEveryRequest() {
      let Message = JSON.stringify({Status: false, Message: 'Your Login Expired! Please Login Again'});
      if (localStorage.getItem('Token') && localStorage.getItem('SessionKey') && localStorage.getItem('SessionToken') ) {
         const LastSession = new Date(atob(localStorage.getItem('SessionKey'))).getTime();
         const NowSession = new Date().getTime();
         const SessionDiff: number = NowSession - LastSession;
         const SessionDiffMinutes: number = SessionDiff / 1000 / 60 ;
         if (SessionDiffMinutes >= 20 ) {
            Message = JSON.stringify({Status: false, Message: 'Your Session Expired! Please Login Again'});
            localStorage.clear();
         }
      }
      return Observable.create(observer => {
         const Response = {status: 401, _body: Message };
         observer.next(Response);
         observer.complete();
      });
   }
   // Product Name Validators service
   public Product_Name_AsyncValidators(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product_Name_AsyncValidators', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Product Name Validators service
   public Product_Name_withAttribute_AsyncValidators(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product_Name_withAttribute_AsyncValidators', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
  // Product service
   public Product_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product_Create', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public Product_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product_List', Info, {headers: this.headers })
         .pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public Product_List_Sold(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product_List_Sold', Info, {headers: this.headers })
         .pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public Product_List_Purchase(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product_List_Purchase', Info, {headers: this.headers })
         .pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public Product_Simple_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product_Simple_List', Info, {headers: this.headers })
         .pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public Product_View(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product_View', Info, {headers: this.headers })
         .pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public Product_Update(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product_Update', Info, {headers: this.headers })
         .pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }

}
