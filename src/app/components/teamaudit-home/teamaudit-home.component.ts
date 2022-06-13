import {Component, AfterViewInit,ViewChild} from "@angular/core";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { InputEmailComponent } from "src/app/shared-components/input-email/input-email.component";
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



declare let $: any;
declare var TweenMax: any;


@Component({
  selector: 'app-teamaudit-home',
  templateUrl: './teamaudit-home.component.html',
  styleUrls: ['./teamaudit-home.component.css']
})
export class TeamauditHomeComponent implements AfterViewInit {

  
  @ViewChild(InputEmailComponent)
  title = 'angular-responsive-sidebar';
  primaryInputEmailComponent!: InputEmailComponent;
 

  "loginB": boolean = true;
  "loginEm": boolean = false;
  "loginPw": boolean = true;
  "selcomp": boolean = false;
  menubgcolor: string = '#000000';
  menufgcolor: string = '#ffffff';
  selected: string = 'option2';
  
  // data
  inUsername: string = '';
  inFullname: string = '';
  inOklogin: boolean = true;
  inErrorlogin: boolean = false;
  menuhtml: string = '';
  vmenustyle: string = 'blue';
  
  

  // fields setup
  filtersview = false;


  
  constructor(
    private router: ActivatedRoute,
    private logservices: LoginServiceService,
    private frameserv: FramecommonService,private userserv: UsersServiceService,
    private boardserv:BoardsServiceService,
    private localize: TranslateService,
    private formBuilder: FormBuilder
    ) 
  {

    
    this.localize.setDefaultLang("es");
    this.initializeBoardsArray();
    
    this.initialization();
  }

  ngOnInit() {
    
    
   }

   ngAfterViewInit(): void {
    // this.menuhtml = this.frameserv.formVMenu('innodtl-vert-menu', '006400');
    
     
   }

  
  onAppReady()
  {
    

  }
  
 
  
  
  fatimescircle = faTimesCircle;
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
          this.menubgcolor = "#" + json.data[0].themebg;
          this.menufgcolor = "#" + json.data[0].themefg;
        
        }
        this.onAppReady();
       
      }
      

    );


    
  }

  
  
 
  // boards section..
  boardsOffset = 0;
  boardsNumToRead = 10;
  jsonboards: any = {};
  phaseicosize:  number = 11;
  phaselblsize: number = 12;
  mybreakpoint: number = 0;
 
  handleSize(event: any) {
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 6;
    }
  
    initializeBoardsArray()
  {
    this.jsonboards = [
      {"id": 1},
      {"boardname":"Empty Name"}
    ];

  }
 
}

