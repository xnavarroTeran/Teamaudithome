import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { WigoconfigsService } from 'src/app/shared-services/wigoconfigs.service';
import { LoginServiceService } from 'src/app/shared-services/login-service.service';


@Injectable({
  providedIn: 'root'
})

export class UsersServiceService {
  
  
  constructor(private http: HttpClient,private configservice: WigoconfigsService,private logservices: LoginServiceService) { 

  }

  getAuditors(): Observable<any>{
    
    var params = this.logservices.localGetCompPrefs();
    var userid = params.userid;
    var authToken = this.configservice.getMicrotken() + "~" + params.companytoken + "~" + userid;
    const url = this.configservice.getTeamauditApi() + "getAuditors";
    
    var callOptions = {
        responseType: 'json' as const,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'X-Authorization': authToken
      })
    };
  
    return this.http.get(url, callOptions);
  }
  
  
}


