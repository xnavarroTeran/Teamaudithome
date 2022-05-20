import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { WigoconfigsService } from 'src/app/shared-services/wigoconfigs.service';
import { LoginServiceService } from 'src/app/shared-services/login-service.service';
import { WdateFormattingService } from 'src/app/shared-services/wdate-formatting.service'
import * as _moment from 'moment';
const moment = require('moment');


@Injectable({
  providedIn: 'root'
})

export class BoardsServiceService {
  

  
  constructor(private http: HttpClient,
              private configservice: WigoconfigsService,
              private logservices: LoginServiceService,
              private wdateserv: WdateFormattingService ) { 

  }
  
  getBoards(status: string,selauditors: string, datefrom: Date, dateto: Date, searchterm: string, offset: number, limit: number): Observable<any>{
    
    var params = this.logservices.localGetCompPrefs();
    
    var selFrom = this.wdateserv.strDateYYYYMMDDFMT(datefrom,"-");
    var selTo = this.wdateserv.strDateYYYYMMDDFMT(dateto,"-");

    
    if (selauditors == undefined || selauditors == '')
      selauditors = '0';
    var userid = params.userid;
    var authToken = this.configservice.getMicrotken() + "~" + params.companytoken + "~" + userid;
    const url = this.configservice.getTeamauditApi() + "getBoards/" + userid + "/" + status + "/" + selFrom + "/" + selTo + "/" + selauditors + "/" + offset + "/" + limit;
    
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

