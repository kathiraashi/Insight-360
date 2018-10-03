import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PermissionsCheckService {

  constructor() { }

   public SubModulePermissionValidate(SubModuleKey) {
      if (localStorage.getItem('Token')) {
         const SessionData = localStorage.getItem('Token');
         const Security = (SessionData.slice(0, -2)).slice(-32);
         const encData = (SessionData.slice(0, -34));
         const CryptoBytes  = CryptoJS.AES.decrypt(encData, Security);
         const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         let SubModule = {};
         DecryptedData.SubModule_Permissions.map(Obj => {
            if (Obj.SubModule_Key === SubModuleKey) {
               SubModule = Obj;
               SubModule['Status'] = true;
            }
         });
         return SubModule;
      } else {
         localStorage.clear();
         return {Status: false};
      }
   }

}
