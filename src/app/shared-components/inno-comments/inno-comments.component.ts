import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/shared-services/comments.service';
import { LoginServiceService } from 'src/app/shared-services/login-service.service';

declare var jQuery: any;


@Component({
  selector: 'app-inno-comments',
  templateUrl: './inno-comments.component.html',
  styleUrls: ['./inno-comments.component.css']
})
export class InnoCommentsComponent implements OnInit {

  // data elements
  @Input() innotipid: number = 0;
  @Input() title: string = "Comms...";
  @Input() lblwrittenby: string = 'Written...';
  @Input() lbldate: string = 'Date';
  @Input() lblcomment: string = 'Comment';
  @Input() commentindex: number = 0;
  
  

  @Input() inAuditid: number = 0;
  @Output() closeComments = new EventEmitter<number>();
  
  userid: number = 0;
  textcomment: string = "";
  showloadingcomm: boolean = false;
  jsonboards: any = {};
  jsonarray: any[] = [];
  inComments: any = [];

  iscommentmodeedit: any;
  commentconfdel: any;
  isdelcomments: boolean = false;
  
  currentuserid: number = 0;
  numcomments: number = 0;
  numtoread: number = 10;
  ismodenormal: boolean = true; 

  constructor(private commserv: CommentsService,
              private logservices: LoginServiceService) { 
    this.currentuserid = this.logservices.localGetCompPrefs().userid;

  }

  ngOnInit(): void {
    this.loadComments();
  }

  exitComments()
  {
      this.closeComments.next(this.commentindex);
  }

  loadAllComments()
  {
    this.numtoread = 0;
    this.loadComments();
  }
  loadComments()
  {

      this.showloadingcomm = true;
      this.commserv.loadInnocomments(this.inAuditid,this.numtoread).subscribe((res)=>{
       
        this.showloadingcomm = false;
        if (res != null) {
          this.jsonboards = res; 
          this.inComments = this.jsonboards.data;     
          this.numcomments = this.jsonboards.data.length;
          this.iscommentmodeedit = this.jsonboards.data.map(() => false);  
          this.isdelcomments = (res.isdelcomm == "Y") ? true : false;
          this.commentconfdel = this.jsonboards.data.map(() => false);  
       
        }  
      });
      
  }

  
  
  // delete section

  setEditMode(ndx: number) {
    this.iscommentmodeedit[ndx] = true;
    this.ismodenormal = false;
  }

  cancelEdit(ndx: number) {
    this.iscommentmodeedit[ndx] = false;
    this.ismodenormal = true;
  }
  showconfirmdel: boolean = false;
  deleteConfirm(ndx: number)
  {
    this.commentconfdel[ndx] = true;
    this.ismodenormal = false;
  }

  deleteCancel(ndx: number)
  {
    
    this.commentconfdel[ndx] = false;
    this.ismodenormal = true;
  }
  deleteComment(commid: number, ndx: number)
  {
        this.commserv.deleteComment(commid).subscribe((res)=>{
        this.inComments.splice(ndx,ndx);
        this.iscommentmodeedit.splice(ndx,ndx);
        this.commentconfdel.splice(ndx,ndx);
     

    });
    this.cancelEdit(ndx);
  }

  saveComment(commid: number, ndx: number, comment: string)
  {
      this.commserv.saveComment(this.inAuditid, commid,comment).subscribe((res)=>{
     
      });
      this.cancelEdit(ndx);
  
  }

  addComment()
  {
    if (this.textcomment == '')
      return false;
    this.commserv.saveComment(this.inAuditid, 0,this.textcomment).subscribe((res)=>{
      if (res != null) {
        console.log("returned data ===> ", res.data);
        this.inComments.unshift(res.data[0]);
        this.textcomment = "";
      }
     
    });
    return true;
  }

  setIsDeleteComment(userid: number)
  {
    if (userid == this.currentuserid || this.isdelcomments)
      return true;
    return false;
  }

  clearSearchText()
  {
    this.textcomment = "";
  }
  
  
}

