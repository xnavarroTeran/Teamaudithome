import {Component, AfterViewInit,ViewChild} from "@angular/core";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { InputEmailComponent } from "src/app/shared-components/input-email/input-email.component";
import { VmenuMainComponent } from "src/app/shared-components/vmenu-main/vmenu-main.component";
import { LoginServiceService } from 'src/app/shared-services/login-service.service';
import { LoadingIndicatorComponent } from 'src/app/shared-components/loading-indicator/loading-indicator.component';
import { UsersServiceService } from 'src/app/shared-services/users-service.service';
import { FramecommonService } from 'src/app/shared-services/framecommon.service';
import { ActivatedRoute } from "@angular/router";
import { FormControl } from '@angular/forms';

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
  "jsonobj": JSON;
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
  filtersviewop: boolean = true;
  

  // fields setup
  filtersview = false;
  constructor(
    private router: ActivatedRoute,
    private logservices: LoginServiceService,
    private frameserv: FramecommonService,private userserv: UsersServiceService
    ) 
  {
    console.log("route is ==> ", this.router.url);
  }

  json:  any = {};
  onAppReady()
  {
    

  }
  
  ngAfterViewInit(): void {
   // this.menuhtml = this.frameserv.formVMenu('innodtl-vert-menu', '006400');
    
  }
  selectedFW = new FormControl();
  
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
          this.menubgcolor = 'darkseagreen'; //json.bgcolor;
          this.menufgcolor = '#ffffff'; //json.fgcolor;
      
        }
        this.onAppReady();
       
      }
      
    );


    
  }

  ngOnInit() {
    this.initialization();
   }

  openBoardFilters()
  {

    this.filtersview = !this.filtersview;
    this.filtersviewop = !this.filtersviewop;
    if (this.filtersview) {
      this.loadAuditors();
    }
  }

  lstauditors: string[] = [];
  auditorsloaded: boolean = false;
  loadingauditors: boolean = false;

  loadAuditors()
  {

    if (this.auditorsloaded) 
      return;
      this.loadingauditors = true;
      this.userserv.getAuditors().subscribe((res)=>{
      this.json = res;
      this.loadingauditors = false;
      this.lstauditors = [];
      for (var nx = 0; nx < this.json.data.length; nx++) {
        var name = this.json.data[nx].firstname + " " + this.json.data[nx].lastname;
        this.lstauditors.push(name);
      }
      this.auditorsloaded = true;
      console.log(" loaded aditors ... ==>", this.json);
    });
      
  }
}

