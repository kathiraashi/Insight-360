import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../LoginService/login.service';

const API_URL = 'http://localhost:3000/API/';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
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

   // Product Configuration
   public ProductConfig_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product/ProductConfig_Create', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public ProductConfig_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product/ProductConfig_List', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public ProductConfig_Update(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Product/ProductConfig_Update', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }

   // Inventory Configuration
   public InventoryConfig_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Inventory/InventoryConfig_Create', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public InventoryConfig_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Inventory/InventoryConfig_List', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public InventoryConfig_Update(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Inventory/InventoryConfig_Update', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }

   // Account Configuration
   public AccountsConfig_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Accounts/AccountsConfig_Create', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public AccountsConfig_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Accounts/AccountsConfig_List', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public AccountsConfig_Update(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Accounts/AccountsConfig_Update', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Crm Configuration
   public CrmConfig_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Crm/CrmConfig_Create', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public CrmConfig_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Crm/CrmConfig_List', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public CrmConfig_Update(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Crm/CrmConfig_Update', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase Configuration
   public PurchaseConfig_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase/PurchaseConfig_Create', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public PurchaseConfig_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase/PurchaseConfig_List', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public PurchaseConfig_Update(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase/PurchaseConfig_Update', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // Crm Configuration
    public HrConfig_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Hr/HrConfig_Create', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public HrConfig_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Hr/HrConfig_List', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public HrConfig_Update(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Hr/HrConfig_Update', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
}
