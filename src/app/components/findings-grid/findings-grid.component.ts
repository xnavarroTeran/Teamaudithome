import { Component, OnInit, Input } from '@angular/core';
import { FindingsServiceService } from 'src/app/shared-services/findings-service.service';
import { CommentsService } from 'src/app/shared-services/comments.service';

@Component({
  selector: 'app-findings-grid',
  templateUrl: './findings-grid.component.html',
  styleUrls: ['./findings-grid.component.css']
})
export class FindingsGridComponent implements OnInit {

  @Input() inBoardid: string = "";
  jsonboards: any = {};
  jsonarray: any[] = [];
  numcomments: number[] = [];
  numtoread: number = 5;
 
  selecteddata: any = {};

  boardid: number = 0;
  boardname: string = "";
  boarddesc: string = "";

  showboarddesc: boolean = false;
  isshowcomments: boolean = false;
  isdeleditcomments: boolean = false;

  numfindings = 0;
  loadingfindings: boolean = true;
  findmodenorm: boolean = true;
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

  loadFindings()
  {

      this.loadingfindings = true;
      this.findsev.getFindings(this.boardid).subscribe((res)=>{
       
        this.loadingfindings = false;
        if (res != null) {
          this.jsonboards = res; 
          this.jsonarray = this.jsonboards.data;     
          this.numfindings = this.jsonboards.data.length;
          this.boardname = this.jsonboards.boardname;
          this.boarddesc = this.jsonboards.boarddesc;
          this.boardcommvisible = this.jsonboards.data.map(() => false);  
          this.jsoncomments = this.jsonboards.data.map(() => []) ;
          this.boardcommclass = this.jsonboards.data.map(() => "visibility");
          this.numcomments = this.jsonboards.data.map(() => 0) ;
          
        }  
      });
      
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
    if (this.boardcommvisible[i] == true)
      this.loadComments(i,auditid);
  }

  commentsdelconfirm: any;  
  iscommentmodeedit: any;

  loadComments(ndx: number,auditid: number)
  {

      this.commserv.loadInnocomments(auditid,this.numtoread).subscribe((res)=>{
       
        if (res != null) {
          this.jsoncomments[ndx] = res.data;     
          this.numcomments[ndx] = this.jsonboards.data.length;
          this.commentsdelconfirm = this.jsonboards.data.map(() => false);  
          this.iscommentmodeedit = this.jsonboards.data.map(() => false);  
          this.isdeleditcomments = (res.isdelcomm == "Y") ? true : false;
        }  
      });
      
  }
  
}