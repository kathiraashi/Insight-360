import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

const API_URL = 'http://localhost:3000/API/RegisterAndLogin/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   constructor(private http: Http) {
   }


   public User_Login_Validate(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'User_Login_Validate', Info)
      .pipe( map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData.Status) {
            const Security = (ReceivingData['Response'].slice(0, -2)).slice(-32);
            const encData = (ReceivingData['Response'].slice(0, -34));
            const CryptoBytes  = CryptoJS.AES.decrypt(encData, Security);
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            localStorage.setItem('Token', ReceivingData['Response']);
            localStorage.setItem('SessionToken', btoa(DecryptedData._id + Security));
            localStorage.setItem('SessionKey', btoa(Date()));
         }
         delete ReceivingData['Response'];
         response['_body'] = JSON.stringify(ReceivingData);
        return response;
      }
      ), catchError(error => of(error)));
   }

   public If_LoggedIn() {
      if (localStorage.getItem('Token') && localStorage.getItem('SessionKey') && localStorage.getItem('SessionToken') ) {
         const LastSession = new Date(atob(localStorage.getItem('SessionKey'))).getTime();
         const NowSession = new Date().getTime();
         const SessionDiff: number = NowSession - LastSession;
         const SessionDiffMinutes: number = SessionDiff / 1000 / 60 ;
         if (SessionDiffMinutes < 20 ) { return true;
         } else {
            localStorage.clear();
            return false;
         }
      } else { localStorage.clear(); return false;  }
   }
   public LoggedUserInfo() {
      if (localStorage.getItem('Token') && localStorage.getItem('SessionKey') && localStorage.getItem('SessionToken') ) {
         const LastSession = new Date(atob(localStorage.getItem('SessionKey'))).getTime();
         const NowSession = new Date().getTime();
         const SessionDiff: number = NowSession - LastSession;
         const SessionDiffMinutes: number = SessionDiff / 1000 / 60 ;
         if (SessionDiffMinutes < 20 ) {
            const User_Data = localStorage.getItem('Token');
            const Security = (User_Data.slice(0, -2)).slice(-32);
            const encData = (User_Data.slice(0, -34));
            const CryptoBytes  = CryptoJS.AES.decrypt(encData, Security);
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            return DecryptedData;
         } else {
            localStorage.clear();
            return false;
         }
      } else { localStorage.clear(); return false;  }
   }

}
