import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   Modules: any[] = [];
   SubModules: any[] = [];
   constructor( public router: Router) {
      const SessionData = sessionStorage.getItem('Token');
      const Security = (SessionData.slice(0, -2)).slice(-32);
      const encData = (SessionData.slice(0, -34));
      const CryptoBytes  = CryptoJS.AES.decrypt(encData, Security);
      const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      this.Modules = DecryptedData.Module_Permissions;
      this.SubModules = DecryptedData.SubModule_Permissions;
   }

   ngOnInit() {
   }

   ModulesValidate(Key) {
      let Available = true;
      this.Modules.map(Obj => { if (Obj.Module_Key === Key) {  Available = true; } });
      return Available;
   }

   SubModulesValidate(Key) {
      let Available = true;
      this.SubModules.map(Obj => { if (Obj.SubModule_Key === Key) {  Available = true; } });
      return Available;
   }

   LogOut() {
      sessionStorage.clear();
      this.router.navigate(['/Login']);
   }

}
