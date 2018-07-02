import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/API/CRM_Settings/';

@Injectable({
   providedIn: 'root'
})
export class CrmSettingsService {

   constructor(private http: Http) {  }

   // Industry Type
      public Industry_Type_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Industry_Type_Create', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Industry_Type_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Industry_Type_List', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Industry_Type_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Industry_Type_SimpleList', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Industry_Type_Update(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Industry_Type_Update', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Industry_Type_Delete(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Industry_Type_Delete', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }


   // Ownership Type
      public Ownership_Type_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Ownership_Type_Create', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Ownership_Type_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Ownership_Type_List', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Ownership_Type_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Ownership_Type_SimpleList', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Ownership_Type_Update(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Ownership_Type_Update', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Ownership_Type_Delete(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Ownership_Type_Delete', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
}
