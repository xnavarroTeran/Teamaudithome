import { Component, OnInit } from '@angular/core';
import { VmenuMainComponent } from "src/app/shared-components/vmenu-main/vmenu-main.component";
import { LoginServiceService } from 'src/app/shared-services/login-service.service';
import { LoadingIndicatorComponent } from 'src/app/shared-components/loading-indicator/loading-indicator.component';
import { UsersServiceService } from 'src/app/shared-services/users-service.service';
import { BoardsServiceService } from 'src/app/shared-services/boards-service.service';
import { FramecommonService } from 'src/app/shared-services/framecommon.service';
import {TranslateService} from '@ngx-translate/core';
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-teamaudit-grid',
  templateUrl: './teamaudit-grid.component.html',
  styleUrls: ['./teamaudit-grid.component.css']
})
export class TeamauditGridComponent implements OnInit {

  // data
  inUsername: string = '';
  inFullname: string = '';
  inOklogin: boolean = true;
  inErrorlogin: boolean = false;
  menuhtml: string = '';
  vmenustyle: string = 'blue';
  
  menubgcolor: string = '#000000';
  menufgcolor: string = '#ffffff';
  // data elements..
  auditno: any; 
  outBoardid: string = "";
  constructor(
    private router: ActivatedRoute,
    private logservices: LoginServiceService,
    private frameserv: FramecommonService,private userserv: UsersServiceService,
    private boardserv:BoardsServiceService,
    private localize: TranslateService,
    private formBuilder: FormBuilder
  ) { 
    this.localize.setDefaultLang("es");
    this.auditno = router.snapshot.queryParamMap.get('auditno');
    try {
      this.outBoardid = this.auditno;
    } catch(e) {
      console.log("Error parsing Audit Number. ")
      this.outBoardid = "";
    }
    this.initialization();
  }

  initialization() {
    this.router.queryParams
      .subscribe(params => {
        
        console.log(" params object = ",params);
        if (params != null) {
        
          var fparams = params['sp'];
         
          this.logservices.asInnoEntryPt(fparams); // see if ther is a new incoming parameter...
        }
        var json = this.logservices.localGetCompPrefs();
        if (json == null) {
          this.inUsername = "";
          this.inFullname = "";
          this.inOklogin = false;
          this.inErrorlogin = true;
          this.vmenustyle = '#000000';
          this.menubgcolor = 'darkseagreen';
          this.menufgcolor = '#ffffff';
        } else {
          this.inUsername = json.username;
          this.inFullname = json.firstname + " " + json.lastname;
          this.inOklogin = true;
          this.inErrorlogin = false;
          this.menubgcolor = json.data[0].themebg;
          this.menufgcolor = json.data[0].themefg;
      
        }
     
      }
      

    );


    
  }
  ngOnInit(): void {
  }

}
