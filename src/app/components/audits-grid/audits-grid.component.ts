import { Component, OnInit, Input } from '@angular/core';
import { BoardsServiceService } from 'src/app/shared-services/boards-service.service';
import { FramecommonService } from 'src/app/shared-services/framecommon.service';
import {TranslateService} from '@ngx-translate/core';
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-audits-grid',
  templateUrl: './audits-grid.component.html',
  styleUrls: ['./audits-grid.component.css']
})
export class AuditsGridComponent implements OnInit {


  // Data elements
  jsonboards: any = {};
  jsonarray: any[] = [];
  
  // Boards Management
  phaseicosize:  number = 11;
  phaselblsize: number = 12;
  boardsOffset = 0;
  boardsNumToRead = 10;
  mybreakpoint: number = 0;
  boardsless = '#000000';
  showboardttip: boolean = false;
  
  constructor(private boardserv:BoardsServiceService,) { 
    

  }

  ngOnInit(): void {
    this.loadBoards();
  }
 


  // boards section..
  
  boardcommvisible: any;
  boardcommclass: any;
  loadBoards()
  {
    
      this.boardserv.getBoards(this.boardsOffset, this.boardsNumToRead).subscribe((res)=>{
       
        this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 6;
        if (res != null) {
          this.boardsOffset += this.boardsNumToRead;
          this.jsonboards = res; 
          this.jsonarray = this.jsonboards.data;     
          this.boardcommvisible = this.jsonboards.data.map(() => false);   
          this.boardcommclass = this.jsonboards.data.map(() => "visibility");
          console.log("boardcommclass ==> ", this.boardcommclass);
        }  else {
            this.initializeBoardsArray();
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
  
}
