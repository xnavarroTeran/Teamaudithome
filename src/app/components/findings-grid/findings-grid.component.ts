import { Component, OnInit, Input } from '@angular/core';
import { FindingsServiceService } from 'src/app/shared-services/findings-service.service';

@Component({
  selector: 'app-findings-grid',
  templateUrl: './findings-grid.component.html',
  styleUrls: ['./findings-grid.component.css']
})
export class FindingsGridComponent implements OnInit {

  @Input() inBoardid: string = "";
  jsonboards: any = {};
  jsonarray: any[] = [];
  
  boardid: number = 0;
  numfindings = 0;
  loadingfindings: boolean = false;
  constructor(private findsev:FindingsServiceService ) { 
   
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.boardid = parseInt(this.inBoardid);
    this.loadFindings();
     
   }

  loadFindings()
  {

      this.loadingfindings = true;
      this.findsev.getFindings(this.boardid).subscribe((res)=>{
       
        this.loadingfindings = false;
        if (res != null) {
          this.jsonboards = res; 
          this.jsonarray = this.jsonboards.data;     
          this.numfindings = this.jsonboards.data.length;
        }  
      });
      
  }
}