import {Component, AfterViewInit,ViewChild} from "@angular/core";
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { InputEmailComponent } from "src/app/shared-components/input-email/input-email.component";
import { LoginServiceService } from 'src/app/shared-services/login-service.service';
import * as indexcontroller from '../../../assets/js/wigocontrollers/indexcontroller.js'
import { ActivatedRoute } from "@angular/router";

declare let $: any;
declare var TweenMax: any;

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-teamaudit-home',
  templateUrl: './teamaudit-home.component.html',
  styleUrls: ['./teamaudit-home.component.css']
})
export class TeamauditHomeComponent implements AfterViewInit {

  
  @ViewChild(InputEmailComponent)
  primaryInputEmailComponent!: InputEmailComponent;
 
  "loginB": boolean = true;
  "loginEm": boolean = false;
  "loginPw": boolean = true;
  "selcomp": boolean = false;
  "jsonobj": JSON;
  selected: string = 'option2';
  
  // data
  inUsername: string = '';
  inFullname: string = '';
  inOklogin: boolean = true;
  inErrorlogin: boolean = false;

  constructor(private router: ActivatedRoute,private logservices: LoginServiceService) 
  {
    console.log("route is ==> ", this.router.url);
  }

  onAppReady()
  {
   
  }
  ngAfterViewInit(): void {
     indexcontroller.onIndexInit();
   
    
  }
  fahandshake = faHandshake;
  fascale = faScaleBalanced;
  farectlist = faRectangleList;
  fapeoplegroup = faPeopleGroup;
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
        } else {
          this.inUsername = "xnavarroTeran";
          this.inFullname = "Xavier Navarro";
          this.inOklogin = true;
          this.inErrorlogin = false;
      
        }
        this.onAppReady();
       
      }
      
    );

    // ============================
    // Button Animation
    // ============================
    $(".btn").on("mouseenter mousemove",  (e: { pageX: number; pageY: number; }) => {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find(".bh").css({top: relY, left: relX});
      var origin = relX + "px" + " " + relY + "px";
    }).on("mouseout",  (e: { pageX: number; pageY: number; }) => {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find(".bh").css({top: relY, left: relX});
    });

    // ============================
    // Tweenmax
    // ============================

  
  }

  ngOnInit() {
    this.initialization();
   }

  wigoLogin(){
    this.loginB = false;
    this.loginEm = true;
    
  }
  
  hideLogin(){
    this.loginB = true;
    this.loginEm = false;
    
  }

  getJsonBack() {
    console.log("Came to the parent func *********************************", this.jsonobj);
  }
 

}
