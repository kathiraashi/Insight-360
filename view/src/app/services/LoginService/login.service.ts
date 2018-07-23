import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

const API_URL = 'http://localhost:3000/API/RegisterAndLogin/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   constructor(private http: Http) {  }

   public User_Login_Validate(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'User_Login_Validate', Info)
      .pipe( map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData.Status) {
            sessionStorage.setItem('Token', ReceivingData['Response']);
            sessionStorage.setItem('SessionKey', btoa(Date()));
            const Security = (ReceivingData['Response'].slice(0, -1)).slice(-32);
            const encData = (ReceivingData['Response'].slice(0, -33)).concat('=');
            const CryptoBytes  = CryptoJS.AES.decrypt(encData, Security);
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           console.log(DecryptedData);
         }
         delete ReceivingData['Response'];
         response['_body'] = JSON.stringify(ReceivingData);
        return response;
      }
      ), catchError(error => of(error)));
   }
   public If_LoggedIn() {
      if (sessionStorage.getItem('Token')) {
         const LastSession = new Date(atob(sessionStorage.getItem('SessionKey'))).getTime();
         const NowSession = new Date().getTime();
         const SessionDiff: number = NowSession - LastSession;
         const SessionDiffMs: number = SessionDiff / 1000 / 60 / 60 / 60;
         if (SessionDiffMs < 20 ) { return true;
         } else { return false; }
      } else { return false; }
   }

}
