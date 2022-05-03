import { Component, AfterViewInit, ViewChild, Input,Output, EventEmitter } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { json } from 'body-parser';
import { LoginServiceService } from 'src/app/shared-services/login-service.service';
import * as LoadingIndicator from '../loading-indicator/loading-indicator.component';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ObjectUnsubscribedError } from 'rxjs';


@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.css']
})


export class InputEmailComponent implements AfterViewInit {

  displayedColumns = ['appname', 'companyname', 'enter'];
  tempSource =  [
    { appname: "", companyname: '',companytoken: '', logintype: '', enter: ""},
  ];
  dataSource = new MatTableDataSource<any>(this.tempSource);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @Output() cancelLogin = new EventEmitter<string>();
  @Output() sendJsonBack: EventEmitter<JSON> = new EventEmitter<JSON>();
  @Input() inpwidth: string = '200px';
  @Input() jsonobj: JSON = JSON.parse("{}");
  @Input() inpalign: string = 'text-center';
  private json: any = {};
  iserror: boolean = false;
  isbademail: boolean = false;
  isspinner: boolean = false;
  ispwhide: boolean = false;
  isusername: boolean = true;
  ispwd: boolean = false;
  isbadpwd: boolean = false;
  isloginbtn: boolean = true;
  ismultico: boolean = false;
  isvalidated: boolean = false;
  issendvalidbtn: boolean = false;
  isforgotpwd: boolean = true;
  isTest: boolean = false;
  facheck = faCheck;
  fakey = faKey;
  // form field elements.
  username: string = '';
  pwd: string = '';
  rememberme: boolean = false;
  SELECTED_TOKEN: string = '';
  SELECTED_LOGTYPE: string = '';
  
  constructor(private service: LoginServiceService) {
    var savedEmail = localStorage.getItem("billgrabackucilliTA_EM");
    var savedPwd   = localStorage.getItem("billgrabackucilliTA_PW");
    if (savedEmail != null && savedEmail.trim() != '') {
      this.rememberme = true;
      this.username = savedEmail;
     
    }
    console.log("saved passwrod is ==> " + savedPwd);
    if (savedPwd != null && savedPwd.trim() != '') {
      this.pwd = savedPwd;
      this.rememberme = true;
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    
   
  }
  setErrorOn()
  {
    this.iserror = true;
  }
  setErrorOff()
  {
    this.iserror = false;
  }
  bademailErrorOn()
  {
    this.isbademail = true;
  }
  bademailErrorOff()
  {
    this.isbademail = false;
  }
  
  getInpWidth()
  {
    return this.inpwidth;
  }
  getInpAlign()
  {
    return this.inpalign;
  }
  outCancelLogin(): void {

    this.iserror = false;
    this.isbademail = false;
    this.isspinner = false;
    this.ispwhide = false;
    this.isusername = false;
    this.ispwd = true;
    this.ismultico = false;
    this.isloginbtn = true;

    this.cancelLogin.next('');

  }

  switchToInit()
  {
    this.iserror = false;
    this.isbademail = false;
    this.isspinner = false;
    this.ispwhide = false;
    this.ispwd = false;
    this.ismultico = false;
    this.isusername = true;
    this.isforgotpwd = true;
    this.isloginbtn = true;
    this.isvalidated = false;
    this.issendvalidbtn = false;
  }
  swithToPassword()
  {
    console.log("email is ===> " + this.username);
    this.iserror = false;
    this.isbademail = false;
    this.isspinner = false;
    this.ispwhide = false;
    this.ismultico = false;
    this.ispwd = true;
    this.isloginbtn = true;
    this.isusername = true;
    this.isvalidated = false;
    this.issendvalidbtn = false;
    this.isforgotpwd = true;
  }
  swithToMultico()
  {
    console.log("email is ===> " + this.username);
    this.iserror = false;
    this.isbademail = false;
    this.isspinner = false;
    this.ispwhide = false;
    this.ispwd = false;
    this.isloginbtn = false;
    this.isusername = true;
    this.ismultico = true;
    this.isvalidated = false;
    this.issendvalidbtn = false;
    this.isforgotpwd = true;
  }

  unvalidatedUser()
  {
    this.iserror = false;
    this.isbademail = false;
    this.isspinner = false;
    this.ispwhide = false;
    this.ispwd = false;
    this.isloginbtn = false;
    this.isusername = false;
    this.ismultico = false;
    this.isvalidated = true;
    this.issendvalidbtn = true;
    this.isforgotpwd = false;
    
  }

  dualActionButton()
  {
    return (this.ispwd == false) ? this.verifyEmail() : this.validatePwd();
  }

  verifyEmail() {
    if(typeof this.username !='undefined' && this.username){
      this.setErrorOff();
      this.getLoginConfig(this.username);
      return;
    }
    this.setErrorOn();
    
    setTimeout(() => {
        this.setErrorOff();
    }, 3000);
    
    return;
  }
  
  validatePwd()
    {
      if(typeof this.pwd !='undefined' && this.pwd){
        this.setErrorOff();
        this.postToLogin(this.username,this.pwd);
        return;
      } 
      this.isbadpwd = true;
      setTimeout(() => {
        this.isbadpwd = false;
      }, 5000);
      return true;
    }
  
  outsendJsonBackc(): void {
    console.log("IN outsendJsonBackc..");
    this.jsonobj = this.service.getHostedJson();
    this.sendJsonBack.emit();
  }
  getLoginConfig(email: string)
  {
      this.isspinner = true;
     
      this.service.getLoginType(email).subscribe({
        error: (err) => { console.error(err) },
        complete: () => { 
          this.isspinner = false;
          
          var json  = this.service.getHostedJson();
          
          if (json.success === 'F' || json.data.length <= 0) {
            this.bademailErrorOn();
            setTimeout(() => {
              this.bademailErrorOff();
              
            }, 3000);
           
            return false;
          }
          this.saveLSEmail();

          if (json.data.length == 1) {
            var object = {};
            object = {
              appname: json.data[0].appname,
              companyname: json.data[0].companyname,
              companytoken: json.data[0].companytoken,
              logintype: json.data[0].logintype,
              

            }
            this.SELECTED_TOKEN = json.data[0].companytoken;
            this.processLoginType();
            
            return true;
          }
          this.loadMultiCoData();
          return true;
        }
      });
    }
    processLoginType()
    {
      var json = this.service.getHostedJson();

      this.swithToPassword();
    }
    
    postToLogin(email: string,pwd: string)
    {
        this.isspinner = true;
        this.service.postToLogin(email,pwd,this.SELECTED_TOKEN).subscribe(res => {
            this.isspinner = false;
            var json  = res;
            console.log("on Post To Login ===> ", json);
            if (json.auth == 'false') {
                this.isbadpwd = true;
              setTimeout(() => {
                 this.isbadpwd = false;
                
              }, 5000);
              return;
            }
            if (json.validated == 'false') {
              this.unvalidatedUser();
              return;
            }
            this.saveLSPwd();
            return true;
        
        });
      }
  
    remCreds()
    {

    }

    saveLSEmail() 
    {
      if (this.rememberme) {
        localStorage.setItem("billgrabackucilliTA_EM",this.username);
        console.log("username on saveLS...==> " + this.username + " <====");
      } else 
        localStorage.removeItem("billgrabackucilliTA_EM");
    }
    saveLSPwd()
    {
      if (this.rememberme) {
        localStorage.setItem("billgrabackucilliTA_PW",this.pwd);
        console.log("Saving password ======================> " + this.pwd);
      }  else {
        localStorage.removeItem("billgrabackucilliTA_PW");
        
      }
   
    }
    loadMultiCoData()
    {
      var json = this.service.getHostedJson();
      this.tempSource =  [];
      interface objectIn {
        appname: string;
        companyname: string;
        enter: string;
      };
      var tempObj;
      console.log("In load Multi Company Data");
      this.swithToMultico();
      console.log("Json object is ===> ", json);
      for (var nx = 0; nx < json.data.length; nx++) {
        
        tempObj = {appname: json.data[nx].appname, 
                   companyname: json.data[nx].companyname, 
                   companytoken: json.data[nx].companytoken,
                   logintype: json.data[nx].logintype,
                   enter: ""};
        console.log("tempObj ==> ", tempObj);
        this.tempSource.push(tempObj);
      }
      console.log("tempSource ===> ", this.tempSource);
      this.dataSource = new MatTableDataSource<any>(this.tempSource);
      console.log("dataSource ==> ", this.dataSource);
      return true;
    }
    
    compaSelected(token: string,logintype: string)
    {
      this.SELECTED_TOKEN = token;
      this.SELECTED_LOGTYPE = logintype;
      this.swithToPassword();
    }
}

export interface Element {
  appname: string;
  companyname: string;
  companytoken: string;
  logintype: string;
  enter: string;
  
}

const ELEMENT_DATA: Element[] = [
 
  ];
