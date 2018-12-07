import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../LoginService/login.service';

const API_URL = 'http://localhost:3000/API/Inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
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
   // ************************** Stock Details ******************************************
    // Stock List
    public StockDetails_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/Stock_Details_List', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Stock View
   public StockDetails_View(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/Stock_Details_View', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Stock add
   public StockDetails_Add(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/Stock_Details_Add', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Stock Remove
   public StockDetails_Remove(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/Stock_Details_Remove', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // Stock Availability
   public StockDetails_Availability(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/Stock_Details_Availability', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // ************************************* Deliver Order ********************************
   // Deliver Order List
   public DeliverOrder_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/Deliver_Order_List', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Deliver Order Convert
   public DeliverOrder_Convert(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/Deliver_Order_Convert', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Deliver Order View
    public DeliverOrder_View(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/Deliver_Order_View', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Deliver Order View
   public DeliverOrder_Update(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/Deliver_Order_Update', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Deliver Order View
   public DeliverOrder_CreatedBackOrder(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/Deliver_Order_Create_BackOrder', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Deliver Order View
   public DeliverOrder_StockRemove(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/Deliver_Order_Stock_Remove', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // ************************************* To Receive ********************************
    // Deliver Order List
    public ToReceive_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/To_Receive_List', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // to receive view
   public ToReceive_View(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/To_Receive_View', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // to receive Convert
   public ToReceive_Convert(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/To_Receive_Convert', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // to receive update
   public ToReceive_Update(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/To_Receive_Update', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // to receive create back order
   public ToReceive_CreateBackOrder(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/To_Receive_Create_BackOrder', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // to receive update stock
   public ToReceive_StockAdd(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + '/To_Receive_Stock_Add', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
}
