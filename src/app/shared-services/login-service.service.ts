import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { WigoconfigsService } from 'src/app/shared-services/wigoconfigs.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Session } from 'inspector';


const options = {
  responseType: 'json' as const,
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  })
};
const optionsPost = {
  responseType: 'json' as const,
  
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    
  })
};


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
  entryToken: string = "uncl3mo0622-eztxt";
  getEntryToken()
  {
    return this.entryToken;
  }
  jsonObject: JSON;
  private json: any = {};
  arrayObj: any = {};
  wigoserv: WigoconfigsService;
  constructor(private http: HttpClient, configservice: WigoconfigsService ) { 
    this.jsonObject = <JSON>this.arrayObj;
    
    this.wigoserv = configservice;

  }

  
  
getLoginType(email: string){
  const url = "http://localhost:8080/loginType/" + this.wigoserv.getMicrotken() + "/" + email;
  this.http.get(url).subscribe((res)=>{
    this.json = res
    console.log("Dumping this.json ====> ", this.json, " === Json success == ", this.json.success);
  });
  return this.http.get(url,options);
}

getHostedJson()
{
  return this.json;

}
  postToLogin(email: string, pwd: string, companytoken: string) : Observable<any>
  {
    
    var formData: any = new FormData();
    console.log(" microtoken ==> ", this.wigoserv.getMicrotken());
    formData.append("microtoken", this.wigoserv.getMicrotken());
    formData.append("loggeduser",1);
    formData.append("companytoken",companytoken);
    formData.append("email",email);
    formData.append("pwd",pwd);
    console.log("form data microtoken is ==> ", formData.get("microtoken"));
    const url = "http://localhost:8080/userLogin";
    return this.http.post(url,formData,optionsPost);
  }

  asInnoEntryPt(inParam: string)
  {
    if (inParam == undefined || inParam == null) {
      return false;
    }
    console.log("inParam ==> " + inParam);
    var rawIn = atob(inParam);
    console.log(" rawIn in asInnoEntryPt ==> " + rawIn);
    var json = JSON.parse(rawIn);
    console.log(" json in asInnoEntryPt ==> ", json);
    if (json == undefined || json == null)
      return false;
    sessionStorage.setItem(this.getEntryToken(),JSON.stringify(json));
    return true;
      
  }
  localGetCompPrefs()
  {
    var strJson = sessionStorage.getItem(this.getEntryToken());
    if (strJson == undefined || strJson == null) {
      return null;
    }
    var json = JSON.parse(strJson);
    return json;
  }

  
}
