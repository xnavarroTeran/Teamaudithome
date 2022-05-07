import {Component, AfterViewInit,ViewChild} from "@angular/core";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { InputEmailComponent } from "src/app/shared-components/input-email/input-email.component";
import { LoginServiceService } from 'src/app/shared-services/login-service.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-myacct',
  templateUrl: './myacct.component.html',
  styleUrls: ['./myacct.component.css']
})

export class MyAcctComponent implements AfterViewInit   {
  
  inUsername: string = 'xnavaroTeran';
  inFullname: string = 'Xavier Navarro';
  
   constructor(private router: ActivatedRoute,private logservices: LoginServiceService) {}

    ngOnInit() {
      this.initialization();
    }
   

   ngAfterViewInit() {
   
   }

   initialization() 
   {
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
      } else {
        this.inUsername = json.username;
        this.inFullname = json.firstname;
    
      }
      this.onAppReady();
     
    });

  }
  onAppReady()
  {

  }
}