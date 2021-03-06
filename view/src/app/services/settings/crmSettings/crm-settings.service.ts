import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../../LoginService/login.service';

const API_URL = 'http://localhost:3000/API/CRM_Settings/';

@Injectable({
   providedIn: 'root'
})
export class CrmSettingsService {

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

   // Industry Type
      public IndustryType_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'IndustryType_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Industry_Type_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Industry_Type_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Industry_Type_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Industry_Type_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Industry_Type_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Industry_Type_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Industry_Type_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Industry_Type_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Industry_Type_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Industry_Type_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Ownership Type
      public OwnershipType_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'OwnershipType_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ownership_Type_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ownership_Type_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ownership_Type_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ownership_Type_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ownership_Type_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ownership_Type_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ownership_Type_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ownership_Type_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ownership_Type_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Ownership_Type_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }

   // Account Type
      public AccountType_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'AccountType_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Account_Type_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Account_Type_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Account_Type_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Account_Type_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Account_Type_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Account_Type_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Account_Type_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Account_Type_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Account_Type_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Account_Type_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }

   // Activity Type
      public ActivityType_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'ActivityType_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Type_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Type_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Type_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Type_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Type_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Type_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Type_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Type_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Type_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Type_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Activity Status
      public ActivityStatus_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'ActivityStatus_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Status_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Status_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Status_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Status_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Status_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Status_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Status_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Status_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Status_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Status_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Activity Priority
      public ActivityPriority_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'ActivityPriority_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Priority_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Priority_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Priority_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Priority_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Priority_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Priority_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Priority_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Priority_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Priority_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Priority_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }


   // Contact Role
      public ContactRole_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'ContactRole_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Contact_Role_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Contact_Role_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Contact_Role_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Contact_Role_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Contact_Role_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Contact_Role_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Contact_Role_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Contact_Role_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Contact_Role_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Contact_Role_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Pipeline Status
      public PipelineStatus_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'PipelineStatus_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Pipeline_Status_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Pipeline_Status_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Pipeline_Status_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Pipeline_Status_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Pipeline_Status_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Pipeline_Status_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Pipeline_Status_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Pipeline_Status_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Pipeline_Status_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(localStorage.getItem('SessionToken')));
            localStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Pipeline_Status_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
}
