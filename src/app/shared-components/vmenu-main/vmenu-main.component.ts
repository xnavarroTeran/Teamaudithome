import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { LoginServiceService } from 'src/app/shared-services/login-service.service';

@Component({
  selector: 'app-vmenu-main',
  templateUrl: './vmenu-main.component.html',
  styleUrls: ['./vmenu-main.component.css']
})
export class VmenuMainComponent implements OnInit {

  @Input() bgcolor: string = "#000000";
  @Input() fgcolor: string = "ffffff";
  @Output() showAuditors = new EventEmitter<string>();
  colStyle: string  = "#ffffff";
  constructor(private logservices: LoginServiceService) {
    
   }

  ngOnInit(): void {
    this.colStyle = this.fgcolor;

  }

  goShowAuditors()
  {
    this.showAuditors.next('');
  }

  
  goAddAudit()
  {
    var fparam = this.logservices.localGetCompPrefs();
    var b64param = btoa(JSON.stringify(fparam));
    var url = "http://localhost:8083/index/" + b64param;
    window.location.href = url;
  }
}
