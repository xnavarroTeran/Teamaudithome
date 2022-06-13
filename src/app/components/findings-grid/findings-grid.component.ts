import { Component, OnInit, Input } from '@angular/core';
import { FindingsServiceService } from 'src/app/shared-services/findings-service.service';
import { CommentsService } from 'src/app/shared-services/comments.service';
import { json } from 'body-parser';

@Component({
  selector: 'app-findings-grid',
  templateUrl: './findings-grid.component.html',
  styleUrls: ['./findings-grid.component.css']
})
export class FindingsGridComponent implements OnInit {

  @Input() inBoardid: string = "";

  phasecodeall: string = "all";
  phasecodeprop: string = "A";
  phasecodereview: string = "C";
  phasecodeimplement: string = "P";
  phasecodefinal: string = "S";

  jsonboards: any = {};
  jsonarray: any[] = [];
  numcomments: number[] = [];
  numtoread: number = 5;
 
  selecteddata: any = {};

  boardid: number = 0;
  boardname: string = "";
  boarddesc: string = "";
  timelinetitle: string = "";
  showboarddesc: boolean = false;
  showtimeline: boolean = false;
  isshowcomments: boolean = false;
  isdeleditcomments: boolean = false;
  

  numfindings = 0;
  loadingfindings: boolean = true;
  findmodenorm: boolean = true;
  showmodeexpanded: boolean = false;
  shownorecsfound: boolean = false;

  constructor(private findsev:FindingsServiceService,
              private commserv: CommentsService ) { 
   
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.boardid = parseInt(this.inBoardid);
    this.loadFindings();
     
   }

   
  boardcommvisible: any;
  boardcommclass: any;
  jsoncomments: any;
  jsontimeline: any;
  phasecode: string = "all";
  loadFindings()
  {

      this.loadingfindings = true;
      this.findsev.getFindings(this.boardid, this.phasecode).subscribe((res)=>{
       
        this.loadingfindings = false;
        if (res != null && res.data.length > 0) {
          this.jsonboards = res; 
          this.jsonarray = this.jsonboards.data;     
          this.numfindings = this.jsonboards.data.length;
          this.boardname = this.jsonboards.boardname;
          this.boarddesc = this.jsonboards.boarddesc;
          this.boardcommvisible = this.jsonboards.data.map(() => false);  
          this.jsoncomments = this.jsonboards.data.map(() => []) ;
          this.boardcommclass = this.jsonboards.data.map(() => "visibility");
          this.numcomments = this.jsonboards.data.map(() => 0) ;
          this.findmodenorm=true;
          this.showmodeexpanded=false;
          this.shownorecsfound=false;
          
        }  else {
          this.findmodenorm=false;
          this.showmodeexpanded=false;
          this.shownorecsfound=true;
        }
      });
      
  }

  findingsPhasecode(pcode:string = "all")
  {
    this.phasecode = pcode;
    this.loadFindings();

  }

  checkOverflow (element: any) {
    
    var elem = document.getElementById(element);
    if (elem == null)
      return false;
    var offHeight = elem.offsetHeight;
    var scrHeight = elem.scrollHeight;
    var offWidth = elem.offsetWidth;
    var scrWidth  = elem.scrollWidth;
    var isOverflow = offHeight < scrHeight || offWidth < scrWidth;
    return isOverflow;
  }
  
  expandFindings(data: any)
  {
    this.selecteddata = data;
    this.findmodenorm = !this.findmodenorm;
    this.showmodeexpanded = !this.showmodeexpanded;
  }
  contractFindings()
  {
    this.findmodenorm = true;
  }

  expandDescription()
  {
    this.showboarddesc = !this.showboarddesc;
  }
  
  toggleComments(i: number, auditid: number)
  {
    this.boardcommvisible[i] = !this.boardcommvisible[i];
    
  }

  commentsdelconfirm: any;  
  iscommentmodeedit: any;
  loadingfirstcomments: boolean = false;
  loadComments(ndx: number,auditid: number)
  {
    this.loadingfirstcomments = true;
      this.commserv.loadInnocomments(auditid,this.numtoread).subscribe((res)=>{
       
        this.loadingfirstcomments = false;
        if (res != null) {
          this.jsoncomments[ndx] = res.data;     
          this.numcomments[ndx] = this.jsonboards.data.length;
          this.commentsdelconfirm = this.jsonboards.data.map(() => false);  
          this.iscommentmodeedit = this.jsonboards.data.map(() => false);  
          this.isdeleditcomments = (res.isdelcomm == "Y") ? true : false;
        }  
      });
      
  }
  
  showTimeline(ndx: number,auditid: number)
  {
    this.timelinetitle = this.jsonboards.data[ndx].innotitle;
    this.showtimeline = true;
      
  }

  closeTimeline(nothing: string)
  {
    this.showtimeline = false;
  }
}