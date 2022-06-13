import { Component, OnInit, Input,HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BoardsServiceService } from 'src/app/shared-services/boards-service.service';
import { FramecommonService } from 'src/app/shared-services/framecommon.service';
import {TranslateService} from '@ngx-translate/core';
import { UsersServiceService } from 'src/app/shared-services/users-service.service';
import { LoginServiceService } from 'src/app/shared-services/login-service.service';
import { WdateFormattingService } from 'src/app/shared-services/wdate-formatting.service';
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatOption, MAT_DATE_FORMATS } from '@angular/material/core';

import * as _util from '../../ts/utilities';
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin

import * as _moment from 'moment';

const moment = require('moment');


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
  selector: 'app-audits-grid',
  templateUrl: './audits-grid.component.html',
  styleUrls: ['./audits-grid.component.css']
})
export class AuditsGridComponent implements OnInit {

  // Environment variables
  ismobile: boolean = false;

  // Data elements
  jsonboards: any = {};
  jsonarray: any[] = [];
  json:  any = {};
  jsonprefs: any = {};

  // Boards Management
  phaseicosize:  number = 11;
  phaselblsize: number = 12;
  boardsOffset = 0;
  boardsNumToRead = 10;
  mybreakpoint: number = 0;
  boardsless = '#000000';
  showboardttip: boolean = false;
  // Filters related data
  Aufromdate: string = "05/01/2022";
  Autodate: string = "05/17/2022";

  statesdefault: string = '0';
  selectedFW: FormGroup;
  selectedauditors: string = "";
  auditorsDefaults: string = "'0'";
  last20nodate: boolean = true;
  numauditsread: number = 0;
  filtersview:boolean = false;
  filtersdate:boolean = false;
  showrefreshbtn:boolean = false;
  filtersviewop: boolean = true;
  selbyauditIs: boolean = false;
  isviewsearch: boolean = false;
  iserroronsearch: boolean = false;
  datefrom = moment();
  dateto = moment();
  searchtext: string = "";
  chkbydate: boolean = false;
  


  selFromDate: string = '';
  selFromDay: string = '';
  selFromMonth: string = '';
  selFromYear: string = '';
  selToDate: string = '';
  selToDay: string = '';
  selToMonth: string = '';
  selToYear: string = '';

  @ViewChild('allSelected') private allSelected!: MatOption;
  constructor(private boardserv:BoardsServiceService,
              private localize: TranslateService,
              private frameserv: FramecommonService,
              private userserv: UsersServiceService,
              private logservices: LoginServiceService,
              private datefmt: WdateFormattingService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute
              ) { 
    
        this.selectedFW = this.fb.group({
          userType: new FormControl('')
        });
        this.setLabels();
      

  }

  ngOnInit(): void {
    
    
    if (window.screen.width < 768) { // 768px portrait
      this.ismobile = true;
    } else
      this.ismobile = false;
      var tDate = new Date();
      this.Autodate = this.datefmt.strDateDISPFMT(tDate,"/");
      this.dateto = moment(tDate);
      tDate.setMonth(tDate.getMonth() - 2);
      this.datefrom = moment(tDate);
      this.Aufromdate = this.datefmt.strDateDISPFMT(tDate,"/");
      this.loadBoards();
  }
 


  // boards section..
  
  boardcommvisible: any;
  boardcommclass: any;
  loadBoards()
  {

      var fDate = new Date("1900/01/01");
      var tDate = new Date("9999/01/01");
      this.boardsOffset = 0;
      this.boardsNumToRead = 20;
      this.numauditsread = 0;
      this.last20nodate = true;
      if (this.filtersdate == true) {
        fDate = this.datefrom.toDate();
        tDate = this.dateto.toDate();
        this.Aufromdate = this.datefmt.strDateDISPFMT(fDate);
        this.Autodate = this.datefmt.strDateDISPFMT(tDate);
        this.boardsNumToRead = 0;
        this.last20nodate = false;
      }
      if (this.filtersview == true) {
        this.boardsNumToRead = 0;
        this.last20nodate = false;
      }
      this.loadingaudits = true;
      this.initializeBoardsArray;
      var selAuditors = "0";
      if (this.filtersview == true)
        selAuditors = this.selectedauditors;
      this.boardserv.getBoards(this.statesdefault, selAuditors,fDate, tDate, this.boardsOffset, this.boardsNumToRead).subscribe((res)=>{
       
        this.loadingaudits = false;
        this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 6;
        if (res != null) {
          this.boardsOffset += this.boardsNumToRead;
          this.jsonboards = res; 
          this.jsonarray = this.jsonboards.data;     
          this.numauditsread = this.jsonboards.data.length;
          this.boardcommvisible = this.jsonboards.data.map(() => false);   
          this.boardcommclass = this.jsonboards.data.map(() => "visibility");
          if (this.jsonboards.selbyaudit == "Y")
            this.selbyauditIs = true;
        }  
      });
      
  }
  
  searchKP(e: any)
  {
    if (e.which === 13)
      this.searchBoards(); 
  }
  searchBoards()
  {

     
     
      if (this.searchtext == '') {
        
        this.iserroronsearch = true;
        setTimeout(() => {
          this.iserroronsearch = false;
        }, 3000);
        return;
      }
      this.initializeBoardsArray;
      this.loadingaudits = true;
      this.boardserv.searchBoards(this.statesdefault, this.searchtext).subscribe((res)=>{
       
        this.loadingaudits = false;
        this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 6;
        if (res != null) {
          this.boardsOffset += this.boardsNumToRead;
          this.jsonboards = res; 
          this.jsonarray = this.jsonboards.data;     
          this.numauditsread = this.jsonboards.data.length;
          this.boardcommvisible = this.jsonboards.data.map(() => false);   
          this.boardcommclass = this.jsonboards.data.map(() => "visibility");
          if (this.jsonboards.selbyaudit == "Y")
            this.selbyauditIs = true;
        }  
      });
      
  }
  showBoardTooltip(i: number): void {
    this.boardcommvisible[i] = !this.boardcommvisible[i];

    this.boardcommclass[i] = (this.boardcommclass[i] == "visibility") ? "visibility_off" : "visibility";
  }
  
  initializeBoardsArray()
  {
    this.jsonboards = [
      {"id": 1},
      {"boardname":""}
    ];

  }
  
  openViewSearch()
  {
    this.isviewsearch = !this.isviewsearch;
    if (this.isviewsearch)
      this.forceFiltersClose();
  }

  // process methods
  forceFiltersClose()
  {
    this.filtersview = false;
    this.filtersdate = false;
    this.procRefreshButton();
  }
  openFilterAuditors()
  {

    this.filtersview = !this.filtersview;
    this.filtersviewop = !this.filtersviewop;
    this.procRefreshButton();
    
    if (this.filtersview) {
      this.loadAuditors();
    } else 
    
      this.loadBoards();
  }


  openFromToDate()
  {

    this.filtersdate = !this.filtersdate;
    if (this.filtersdate == false) 
      this.loadBoards();
    this.procRefreshButton();
  }
  
  procRefreshButton()
  {
    if (this.filtersdate == false && this.filtersview == false)
      this.showrefreshbtn = false;
    else
      this.showrefreshbtn = true;
  }

  auditorsloaded: boolean = false;
  loadingauditors: boolean = false;
  loadingaudits: boolean = false;
  ddauditors: DDLoader[] = [];
  ddselall: string = "";
 

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
        for (var nx = 0; nx < this.json.data.length; nx++) {
          var name = this.json.data[nx].firstname + " " + this.json.data[nx].lastname;
          this.ddauditors.push({value: this.json.data[nx].id, viewValue: name});
        }
        this.auditorsloaded = true;
       // this.selectedFW.controls['userType'].setValue([this.json.data[3].id]);
      
      });
      
  }

  tosslePerOne(all: any){
    if (this.allSelected.selected) {
     this.allSelected.deselect();
     return false;
    }
    if(this.selectedFW.controls['userType'].value.length==this.ddauditors.length)
     this.allSelected.select();
    return false;
  }
  toggleAllSelection() {
     if (this.allSelected.selected) {
       this.selectedFW.controls['userType']
         .patchValue([...this.ddauditors.map(item => item.value), 0]);
     } else {
       this.selectedFW.controls['userType'].patchValue([]);
     }
  }
 

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

  gotoInnoAudits(auditno: string)
  {
    this.router.navigate(['/teamaudit-grid'], { queryParams: { "auditno": auditno} });
  }
}
