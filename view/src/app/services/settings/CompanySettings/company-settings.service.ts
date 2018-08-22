import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../../LoginService/login.service';

const API_URL = 'http://localhost:3000/API/Company_Settings/';

@Injectable({
  providedIn: 'root'
})
export class CompanySettingsService {

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

 // Registration Type
      public RegistrationType_AsyncValidate(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'RegistrationType_AsyncValidate', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
      }
      public Registration_Type_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Registration_Type_Create', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
      }
      public Registration_Type_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Registration_Type_List', Info, {headers: this.headers })
            .pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Registration_Type_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Registration_Type_SimpleList', Info, {headers: this.headers })
            .pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Registration_Type_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Registration_Type_Update', Info, {headers: this.headers })
            .pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Registration_Type_Delete(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
          this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
          sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'Registration_Type_Delete', Info, {headers: this.headers })
        .pipe( map(response => response),  catchError(error => of(error)));
        } else {
        return this.ValidateEveryRequest();
        }
      }

      // Registration Info
      // public RegistrationType_AsyncValidate(Info: any): Observable<any[]> {
      //    if (this.Service.If_LoggedIn()) {
      //      this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
      //      sessionStorage.setItem('SessionKey', btoa(Date()));
      //    return this.http.post(API_URL + 'RegistrationType_AsyncValidate', Info, {headers: this.headers })
      //    .pipe( map(response => response),  catchError(error => of(error)));
      //  } else {
      //  return this.ValidateEveryRequest();
      //  }
      //  }
      public Registration_Info_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Registration_Info_Create', Info, {headers: this.headers })
            .pipe( map(response => response),  catchError(error => of(error)));
         } else {
         return this.ValidateEveryRequest();
         }
      }
      public Registration_Info_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Registration_Info_List', Info, {headers: this.headers })
            .pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Registration_Info_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Registration_Info_Update', Info, {headers: this.headers })
            .pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Registration_Info_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Registration_Info_Delete', Info, {headers: this.headers })
            .pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }

      // Departments
      public Departments_AsyncValidate(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
           this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
           sessionStorage.setItem('SessionKey', btoa(Date()));
           return this.http.post(API_URL + 'Departments_AsyncValidate', Info, {headers: this.headers })
           .pipe( map(response => response),  catchError(error => of(error)));
        } else {
           return this.ValidateEveryRequest();
        }
        }
        public Departments_Create(Info: any): Observable<any[]> {
        if (this.Service.If_LoggedIn()) {
           this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
           sessionStorage.setItem('SessionKey', btoa(Date()));
           return this.http.post(API_URL + 'Departments_Create', Info, {headers: this.headers })
           .pipe( map(response => response),  catchError(error => of(error)));
        } else {
           return this.ValidateEveryRequest();
        }
        }
        public Departments_List(Info: any): Observable<any[]> {
           if (this.Service.If_LoggedIn()) {
              this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
              sessionStorage.setItem('SessionKey', btoa(Date()));
              return this.http.post(API_URL + 'Departments_List', Info, {headers: this.headers })
              .pipe( map(response => response), catchError(error => of(error)));
           } else {
              return this.ValidateEveryRequest();
           }
        }
        public Departments_Simple_List(Info: any): Observable<any[]> {
           if (this.Service.If_LoggedIn()) {
              this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
              sessionStorage.setItem('SessionKey', btoa(Date()));
              return this.http.post(API_URL + 'Departments_Simple_List', Info, {headers: this.headers })
              .pipe( map(response => response),  catchError(error => of(error)));
           } else {
              return this.ValidateEveryRequest();
           }
        }
        public Departments_Update(Info: any): Observable<any[]> {
           if (this.Service.If_LoggedIn()) {
              this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
              sessionStorage.setItem('SessionKey', btoa(Date()));
              return this.http.post(API_URL + 'Departments_Update', Info, {headers: this.headers })
              .pipe( map(response => response), catchError(error => of(error)));
           } else {
              return this.ValidateEveryRequest();
           }
        }
        public Departments_Delete(Info: any): Observable<any[]> {
          if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
          return this.http.post(API_URL + 'Departments_Delete', Info, {headers: this.headers })
          .pipe( map(response => response),  catchError(error => of(error)));
          } else {
          return this.ValidateEveryRequest();
          }
        }

   // Pf Info
      public PfInfo_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'PfInfo_AsyncValidate', Info, {headers: this.headers })
            .pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
         }
         public PfInfo_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'PfInfo_Create', Info, {headers: this.headers })
            .pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
         }
         public PfInfo_List(Info: any): Observable<any[]> {
            if (this.Service.If_LoggedIn()) {
               this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
               sessionStorage.setItem('SessionKey', btoa(Date()));
               return this.http.post(API_URL + 'PfInfo_List', Info, {headers: this.headers })
               .pipe( map(response => response), catchError(error => of(error)));
            } else {
               return this.ValidateEveryRequest();
            }
         }
         public PfInfo_Simple_List(Info: any): Observable<any[]> {
            if (this.Service.If_LoggedIn()) {
               this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
               sessionStorage.setItem('SessionKey', btoa(Date()));
               return this.http.post(API_URL + 'PfInfo_Simple_List', Info, {headers: this.headers })
               .pipe( map(response => response),  catchError(error => of(error)));
            } else {
               return this.ValidateEveryRequest();
            }
         }
         public pfInfo_Update(Info: any): Observable<any[]> {
            if (this.Service.If_LoggedIn()) {
               this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
               sessionStorage.setItem('SessionKey', btoa(Date()));
               return this.http.post(API_URL + 'pfInfo_Update', Info, {headers: this.headers })
               .pipe( map(response => response), catchError(error => of(error)));
            } else {
               return this.ValidateEveryRequest();
            }
         }
         public PfInfo_Delete(Info: any): Observable<any[]> {
           if (this.Service.If_LoggedIn()) {
             this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
             sessionStorage.setItem('SessionKey', btoa(Date()));
           return this.http.post(API_URL + 'PfInfo_Delete', Info, {headers: this.headers })
           .pipe( map(response => response),  catchError(error => of(error)));
           } else {
           return this.ValidateEveryRequest();
           }
         }

// Esi Info
public EsiInfo_AsyncValidate(Info: any): Observable<any[]> {
   if (this.Service.If_LoggedIn()) {
      this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'EsiInfo_AsyncValidate', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
   } else {
      return this.ValidateEveryRequest();
   }
   }
   public EsiInfo_Create(Info: any): Observable<any[]> {
   if (this.Service.If_LoggedIn()) {
      this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'EsiInfo_Create', Info, {headers: this.headers })
      .pipe( map(response => response),  catchError(error => of(error)));
   } else {
      return this.ValidateEveryRequest();
   }
   }
   public EsiInfo_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'EsiInfo_List', Info, {headers: this.headers })
         .pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public EsiInfo_Simple_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'EsiInfo_Simple_List', Info, {headers: this.headers })
         .pipe( map(response => response),  catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public EsiInfo_Update(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'EsiInfo_Update', Info, {headers: this.headers })
         .pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public EsiInfo_Delete(Info: any): Observable<any[]> {
     if (this.Service.If_LoggedIn()) {
       this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
       sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'EsiInfo_Delete', Info, {headers: this.headers })
     .pipe( map(response => response),  catchError(error => of(error)));
     } else {
     return this.ValidateEveryRequest();
     }
   }

   // Pt Info
public PtInfo_AsyncValidate(Info: any): Observable<any[]> {
  if (this.Service.If_LoggedIn()) {
     this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
     sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'PtInfo_AsyncValidate', Info, {headers: this.headers })
     .pipe( map(response => response),  catchError(error => of(error)));
  } else {
     return this.ValidateEveryRequest();
  }
  }
  public PtInfo_Create(Info: any): Observable<any[]> {
  if (this.Service.If_LoggedIn()) {
     this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
     sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'PtInfo_Create', Info, {headers: this.headers })
     .pipe( map(response => response),  catchError(error => of(error)));
  } else {
     return this.ValidateEveryRequest();
  }
  }
  public PtInfo_List(Info: any): Observable<any[]> {
     if (this.Service.If_LoggedIn()) {
        this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'PtInfo_List', Info, {headers: this.headers })
        .pipe( map(response => response), catchError(error => of(error)));
     } else {
        return this.ValidateEveryRequest();
     }
  }
  public PtInfo_Simple_List(Info: any): Observable<any[]> {
     if (this.Service.If_LoggedIn()) {
        this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'PtInfo_Simple_List', Info, {headers: this.headers })
        .pipe( map(response => response),  catchError(error => of(error)));
     } else {
        return this.ValidateEveryRequest();
     }
  }
  public PtInfo_Update(Info: any): Observable<any[]> {
     if (this.Service.If_LoggedIn()) {
        this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'PtInfo_Update', Info, {headers: this.headers })
        .pipe( map(response => response), catchError(error => of(error)));
     } else {
        return this.ValidateEveryRequest();
     }
  }
  public PtInfo_Delete(Info: any): Observable<any[]> {
    if (this.Service.If_LoggedIn()) {
      this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
      sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'PtInfo_Delete', Info, {headers: this.headers })
    .pipe( map(response => response),  catchError(error => of(error)));
    } else {
    return this.ValidateEveryRequest();
    }
  }

// It Info
public ItInfo_AsyncValidate(Info: any): Observable<any[]> {
  if (this.Service.If_LoggedIn()) {
     this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
     sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'ItInfo_AsyncValidate', Info, {headers: this.headers })
     .pipe( map(response => response),  catchError(error => of(error)));
  } else {
     return this.ValidateEveryRequest();
  }
  }
  public ItInfo_Create(Info: any): Observable<any[]> {
  if (this.Service.If_LoggedIn()) {
     this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
     sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'ItInfo_Create', Info, {headers: this.headers })
     .pipe( map(response => response),  catchError(error => of(error)));
  } else {
     return this.ValidateEveryRequest();
  }
  }
  public ItInfo_List(Info: any): Observable<any[]> {
     if (this.Service.If_LoggedIn()) {
        this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ItInfo_List', Info, {headers: this.headers })
        .pipe( map(response => response), catchError(error => of(error)));
     } else {
        return this.ValidateEveryRequest();
     }
  }
  public ItInfo_Simple_List(Info: any): Observable<any[]> {
     if (this.Service.If_LoggedIn()) {
        this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ItInfo_Simple_List', Info, {headers: this.headers })
        .pipe( map(response => response),  catchError(error => of(error)));
     } else {
        return this.ValidateEveryRequest();
     }
  }
  public ItInfo_Update(Info: any): Observable<any[]> {
     if (this.Service.If_LoggedIn()) {
        this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ItInfo_Update', Info, {headers: this.headers })
        .pipe( map(response => response), catchError(error => of(error)));
     } else {
        return this.ValidateEveryRequest();
     }
  }
  public ItInfo_Delete(Info: any): Observable<any[]> {
    if (this.Service.If_LoggedIn()) {
      this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
      sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'ItInfo_Delete', Info, {headers: this.headers })
    .pipe( map(response => response),  catchError(error => of(error)));
    } else {
    return this.ValidateEveryRequest();
    }
  }

   // Branch
      public Branch_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Branch_Create', Info, {headers: this.headers })
            .pipe( map(response => response),  catchError(error => of(error)));
         } else {
         return this.ValidateEveryRequest();
         }
         }
      public Branch_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Branch_List', Info, {headers: this.headers })
            .pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Branch_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Branch_Update', Info, {headers: this.headers })
            .pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Branch_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Branch_Delete', Info, {headers: this.headers })
            .pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
}
