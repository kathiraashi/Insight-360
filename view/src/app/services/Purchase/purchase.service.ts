import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../LoginService/login.service';

const API_URL = 'http://localhost:3000/API/Purchase/';
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
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

   // ********************************************** Purchase Service **********************************************
   // Vendor Phone Number Async Validator
   public Phone_AsyncValidators(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Phone_AsyncValidators', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Vendor Create
   public PurchaseVendor_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Vendor_Create', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Vendor List
   public PurchaseVendor_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Vendor_List', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Vendor Simple List
   public PurchaseVendor_SimpleList(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Vendor_SimpleList', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Vendor View
   public PurchaseVendor_View(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Vendor_View', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // ***************************** Vendor Contact ************************************
   // Mobile Number Async Validators
   public Mobile_AsyncValidators(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Vendor_Contact_Mobile_AsyncValidators', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Name Async Validators
   public Name_AsyncValidators(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Vendor_Contact_Name_AsyncValidators', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase Create Service
   public VendorContact_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Vendor_Contact_Create', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Vendor List Service
   public VendorContact_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Vendor_Contact_List', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // Vendor List Service
    public VendorContact_SimpleList(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Vendor_Contact_SimpleList', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Vendor View Service
   public VendorContact_View(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Vendor_Contact_View', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // ***************************** Purchase Request ************************************
   // Purchase Number Async Validator
   public PurchaseRequest_Number_AsyncValidators(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_Number_AsyncValidators', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // Purchase request create
    public PurchaseRequest_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_Create', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // Purchase request create
    public PurchaseRequest_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_List', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // Purchase request create
    public PurchaseRequest_ApprovedList(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_ApprovedList', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // Purchase request create
    public PurchaseRequest_View(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_View', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase request Edit
   public PurchaseRequest_Edit(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_Edit', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // Purchase request Approve
    public PurchaseRequest_Approve(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_Approve', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase request Request-Approve
   public PurchaseRequest_RequestApprove(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_RequestApprove', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase request Modify
   public PurchaseRequest_Modification(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_Modification', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase request Cancel
   public PurchaseRequest_Cancel(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_Cancel', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase request Reject
   public PurchaseRequest_Reject(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_Reject', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase request Reject
   public PurchaseRequest_CancelApproval(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Request_Cancel_Approval', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // ********************************* Purchase quote ******************************************
    // Quote Number Async Validators
    public QuoteNumber_AsyncValidators(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Quote_Number_AsyncValidators', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // Order Number Async Validators
    public OrderNumber_AsyncValidators(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Order_Number_AsyncValidators', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase Quote create
   public PurchaseQuote_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Quote_Create', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase Quote List
   public PurchaseQuote_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Quote_List', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase Quote View
   public PurchaseQuote_View(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Quote_View', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // Purchase Quote Edit
    public PurchaseQuote_Edit(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Quote_Edit', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase Quote Confirm Order
   public PurchaseQuote_ConfirmOrder(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Quote_Confirm_Order', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
    // Purchase Quote Order List
    public PurchaseQuote_OrderList(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Quote_Order_List', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   // Purchase Quote Order List
   public PurchaseQuote_CreateToReceive(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
         localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Purchase_Quote_Order_CreateToReceive', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }

}
