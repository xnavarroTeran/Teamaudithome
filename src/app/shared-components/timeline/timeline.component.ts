import { Component, OnInit, Input,Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import { FindingsServiceService } from 'src/app/shared-services/findings-service.service';

@Component({
  selector: 'app-timeline',
  encapsulation: ViewEncapsulation.None,
  
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})


export class TimelineComponent implements OnInit {

  @Input() timelinetitle: string = "";
  @Input() auditid: number = 0;
  @Output() closeTimeline = new EventEmitter<string>();
  title = 'datatables';
  tlhtml: string = "";
  jsontimeline: any[] = [];

  constructor(private findsev:FindingsServiceService) { 
   
   
  }

  ngOnInit(): void {
    this.showTimeline();
  
  }
  
  showTimeline()
  {

    this.findsev.getTimeline(this.auditid).subscribe((res)=>{
       
        if (res != null) {
          
          this.jsontimeline = res.data;
          this.formTimeline();
        }  
      });
     
  }
  formTimeline()
  {
    var html = "";
    html += "<div class='container-fluid w-top-10'>";
    for (var nx=0; nx < this.jsontimeline.length; nx++) {
      html += "   <div class='row steps-xs'>";
     
      html += "       <div   class='col-12'>";
    html += "           <h2>" + this.jsontimeline[nx].nodetitle + "</h2>";
      html +=             this.jsontimeline[nx].fmttrandate;
      html += "           <p>";
      html +=               "<strong>" + this.jsontimeline[nx].nodedesc + "<br>&nbsp;" + " by " + this.jsontimeline[nx].byuser + "</strong>";
      html += "           </p>";
      html += "           <i class='step-line'></i>";
      html += "       </div>";

      html += "   </div>";
      if (nx < this.jsontimeline.length - 1) {
        html += "<div class='row w-top-10 w-bottom-10'>";
        html += "   <div class='col-12'>";
        html += "     <i class='fa fa-arrow-down'></i>";
        html += "   </div>";
        html += "</div>";
      }
    }
    html += "</div>";
    this.tlhtml = html;
  }

  outTimeline()
  {
    this.closeTimeline.next('');
  }
}
