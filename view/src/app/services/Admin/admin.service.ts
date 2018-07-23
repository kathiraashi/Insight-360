import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/API/AdminManagement/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

   constructor(private http: Http) {  }

   public User_Name_Validate(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'User_Name_Validate', Info)
      .pipe( map(response => response), catchError(error => of(error)));
   }

   public User_Create(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'User_Create', Info)
      .pipe( map(response => response), catchError(error => of(error)));
   }

   public UserTypeBased_SimpleUsersList(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'UserTypeBased_SimpleUsersList', Info)
      .pipe( map(response => response), catchError(error => of(error)));
   }

   public Users_List(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'Users_List', Info)
      .pipe( map(response => response), catchError(error => of(error)));
   }

   public UserTypes_List(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'UserTypes_List', Info)
      .pipe( map(response => response), catchError(error => of(error)));
   }


   public ModulesAndSubModules_List(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'ModulesAndSubModules_List', Info)
      .pipe( map(response => response), catchError(error => of(error)));
   }

   public Create_Permissions_Group(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'Create_Permissions_Group', Info)
      .pipe( map(response => response), catchError(error => of(error)));
   }

   public PermissionsGroup_SimpleList(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'PermissionsGroup_SimpleList', Info)
      .pipe( map(response => response), catchError(error => of(error)));
   }

   public UserTypeBased_PermissionsGroup_SimpleList(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'UserTypeBased_PermissionsGroup_SimpleList', Info)
      .pipe( map(response => response), catchError(error => of(error)));
   }

   public GroupPermission_ModulesAndSubModules_List(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'GroupPermission_ModulesAndSubModules_List', Info)
      .pipe( map(response => response), catchError(error => of(error)));
   }

}
