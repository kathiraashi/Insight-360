import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../../LoginService/login.service';

const API_URL = 'http://localhost:3000/API/Account_Settings/';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  headers;
  constructor(private http: Http, private Service: LoginService) {
    this.headers = new Headers();
  }

  ValidateEveryRequest() {
    let Message = JSON.stringify({Status: false, Message: 'Your Login Expired! Please Login Again'});
    if (sessionStorage.getItem('Token') && sessionStorage.getItem('SessionKey') && sessionStorage.getItem('SessionToken') ) {
       const LastSession = new Date(atob(sessionStorage.getItem('SessionKey'))).getTime();
       const NowSession = new Date().getTime();
       const SessionDiff: number = NowSession - LastSession;
       const SessionDiffMinutes: number = SessionDiff / 1000 / 60 ;
       if (SessionDiffMinutes >= 20 ) {
          Message = JSON.stringify({Status: false, Message: 'Your Session Expired! Please Login Again'});
          sessionStorage.clear();
       }
    }
    return Observable.create(observer => {
       const Response = {status: 401, _body: Message };
       observer.next(Response);
       observer.complete();
    });
 }

   // Income Type
        public IncomeType_AsyncValidate(Info: any): Observable<any[]> {
          if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
          return this.http.post(API_URL + 'IncomeType_AsyncValidate', Info, {headers: this.headers })
          .pipe( map(response => response),  catchError(error => of(error)));
      } else {
        return this.ValidateEveryRequest();
     }
    }
      public Income_Type_Create(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
          this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
          sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Income_Type_Create', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
        return this.ValidateEveryRequest();
     }
    }
      public Income_Type_List(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
          this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
          sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Income_Type_List', Info, {headers: this.headers })
         .pipe( map(response => response), catchError(error => of(error)));
      } else {
        return this.ValidateEveryRequest();
     }
    }
      public Income_Type_SimpleList(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
          this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
          sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Income_Type_SimpleList', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
        return this.ValidateEveryRequest();
     }
    }
      public Income_Type_Update(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
          this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
          sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Income_Type_Update', Info, {headers: this.headers })
         .pipe( map(response => response), catchError(error => of(error)));
      } else {
        return this.ValidateEveryRequest();
     }
    }
      public Income_Type_Delete(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
          this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
          sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Income_Type_Delete', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
        return this.ValidateEveryRequest();
     }
    }

   // Payment Terms
      public Payment_Terms_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Payment_Terms_Create', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Payment_Terms_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Payment_Terms_List', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Payment_Terms_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Payment_Terms_SimpleList', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Payment_Terms_Update(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Payment_Terms_Update', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Payment_Terms_Delete(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Payment_Terms_Delete', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }

// Bank
      public Bank_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_AsyncValidate', Info, {headers: this.headers })
         .pipe(map(response => response), catchError(error => of(error)));
   } else {
      return this.ValidateEveryRequest();
   }
   }
      public Bank_Create(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
          this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
          sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_Create', Info, {headers: this.headers })
         .pipe(map(response => response), catchError(error => of(error)));
      } else {
        return this.ValidateEveryRequest();
     }
    }
      public Bank_List(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
          this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
          sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_List', Info, {headers: this.headers })
         .pipe(map(response => response), catchError(error => of(error)));
      } else {
        return this.ValidateEveryRequest();
     }
    }
      public Bank_Simple_List(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
          this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
          sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_Simple_List', Info, {headers: this.headers })
         .pipe(map(response => response), catchError(error => of(error)));
      } else {
        return this.ValidateEveryRequest();
     }
    }
      public Bank_Update(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
          this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
          sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_Update', Info, {headers: this.headers })
         .pipe(map(response => response), catchError(error => of(error)));
      } else {
        return this.ValidateEveryRequest();
     }
    }
      public Bank_Delete(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
          this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
          sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_Delete', Info, {headers: this.headers })
         .pipe(map(response => response), catchError(error => of(error)));
      } else {
        return this.ValidateEveryRequest();
     }
    }

// Taxes
//     public Bank_AsyncValidate(Info: any): Observable<any[]> {
//       if (this.Service.If_LoggedIn()) {
//         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
//         sessionStorage.setItem('SessionKey', btoa(Date()));
//       return this.http.post(API_URL + 'Bank_AsyncValidate', Info, {headers: this.headers })
//       .pipe(map(response => response), catchError(error => of(error)));
//   } else {
//     return this.ValidateEveryRequest();
//  }
// }
  public Taxes_Create(Info: any): Observable<any[]> {
    if (this.Service.If_LoggedIn()) {
      this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
      sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'Taxes_Create', Info, {headers: this.headers })
     .pipe(map(response => response), catchError(error => of(error)));
  } else {
    return this.ValidateEveryRequest();
 }
}
  public Taxes_List(Info: any): Observable<any[]> {
    if (this.Service.If_LoggedIn()) {
      this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
      sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'Taxes_List', Info, {headers: this.headers })
     .pipe(map(response => response), catchError(error => of(error)));
  } else {
    return this.ValidateEveryRequest();
 }
}
  public Taxes_Simple_List(Info: any): Observable<any[]> {
    if (this.Service.If_LoggedIn()) {
      this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
      sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'Taxes_Simple_List', Info, {headers: this.headers })
     .pipe(map(response => response), catchError(error => of(error)));
  } else {
    return this.ValidateEveryRequest();
 }
}
  public Taxes_Update(Info: any): Observable<any[]> {
    if (this.Service.If_LoggedIn()) {
      this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
      sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'Taxes_Update', Info, {headers: this.headers })
     .pipe(map(response => response), catchError(error => of(error)));
  } else {
    return this.ValidateEveryRequest();
 }
}
  public Taxes_Delete(Info: any): Observable<any[]> {
    if (this.Service.If_LoggedIn()) {
      this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
      sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'Taxes_Delete', Info, {headers: this.headers })
     .pipe(map(response => response), catchError(error => of(error)));
  } else {
    return this.ValidateEveryRequest();
 }
}


}
