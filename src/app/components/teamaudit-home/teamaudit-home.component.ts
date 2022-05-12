import {Component, AfterViewInit,ViewChild, HostListener} from "@angular/core";
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

import * as _moment from 'moment';
const moment = _moment;

declare let $: any;
declare var TweenMax: any;

export interface DDLoader {
  value: number;
  viewValue: string;
}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

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
  filtersviewop: boolean = true;
  

  // fields setup
  filtersview = false;
  campaignOne: FormGroup;

  datefrom = moment();
  dateto = moment();

  selFromDate: string = '';
  selFromDay: string = '';
  selFromMonth: string = '';
  selFromYear: string = '';
  selToDate: string = '';
  selToDay: string = '';
  selToMonth: string = '';
  selToYear: string = '';

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.datefrom = moment(event.value);
    this.selFromDate = this.datefrom.format('DD');
    this.selFromDay = this.datefrom.format('dddd');
    this.selFromMonth = this.datefrom.format('MMMM');
    this.selFromYear = this.datefrom.format('YYYY');
    
  }

  addToEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateto = moment(event.value);
    this.selToDate = this.dateto.format('DD');
    this.selToDay = this.dateto.format('dddd');
    this.selToMonth = this.dateto.format('MMMM');
    this.selToYear = this.dateto.format('YYYY');
  }

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
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
    });

  }

  ngOnInit() {
    this.initialization();
    this.setLabels();
   }

   ngAfterViewInit(): void {
    // this.menuhtml = this.frameserv.formVMenu('innodtl-vert-menu', '006400');
   
     
   }

  json:  any = {};
  onAppReady()
  {
    

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

  
  openBoardFilters()
  {

    this.filtersview = !this.filtersview;
    this.filtersviewop = !this.filtersviewop;
    if (this.filtersview) {
      this.loadAuditors();
    }
  }

  auditorsloaded: boolean = false;
  loadingauditors: boolean = false;
  ddauditors: DDLoader[] = [];
  ddselall: string = "";
  statesdefault: string = '1';

  setLabels() {
    this.localize.get('GLOBAL.ALL').subscribe((data:any)=> {
      this.ddselall = data;
    
    });
  }

  
  loadAuditors()
  {
    
    if (this.auditorsloaded) 
      return;
      this.loadingauditors = true;
      this.userserv.getAuditors().subscribe((res)=>{
        this.json = res;
        this.loadingauditors = false;
        this.ddauditors = [];
        this.ddauditors.push({value: 0, viewValue: this.ddselall});
        for (var nx = 0; nx < this.json.data.length; nx++) {
          var name = this.json.data[nx].firstname + " " + this.json.data[nx].lastname;
          this.ddauditors.push({value: this.json.data[nx].id, viewValue: name});
        }
        this.selectedFW.setValue(0);
        this.auditorsloaded = true;
        this.loadBoards();
      });
      
  }

  // boards section..
  boardsOffset = 0;
  boardsNumToRead = 10;
  jsonboards: any = {};
  phaseicosize:  number = 11;
  phaselblsize: number = 12;
  mybreakpoint: number = 0;
  loadBoards()
  {
    
      this.boardserv.getBoards(this.boardsOffset, this.boardsNumToRead).subscribe((res)=>{
       
        this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 6;
        var html = "<div class='auditboard'> This is a test.. let's see.</div>";
        if (res != null) {
          this.boardsOffset += this.boardsNumToRead;
          this.jsonboards = res.data;        
        }  else {
            this.initializeBoardsArray();
          }
        console.log(" boards ==> ", this.jsonboards);
      });
      
  }

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
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
    if (scrollBottom <= 30) {
      this.loadBoards();
    }
  }
}

