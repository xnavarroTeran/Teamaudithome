import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { WigoconfigsService } from 'src/app/shared-services/wigoconfigs.service';
import { LoginServiceService } from 'src/app/shared-services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient,
    private configservice: WigoconfigsService,
    private logservices: LoginServiceService) { 

  }

  loadInnocomments(auditid: number, limit: number): Observable<any>{
    
    var params = this.logservices.localGetCompPrefs();
    
    var userid = params.userid;
    var authToken = this.configservice.getMicrotken() + "~" + params.companytoken + "~" + userid;
    const url = this.configservice.getTeamauditApi() + "getInnocomments/" + userid + "/" + auditid + "/" + limit;
    
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

  deleteComment(commentid: number) : Observable<any>
  {
    var params = this.logservices.localGetCompPrefs();
    var userid = params.userid;
    var authToken = this.configservice.getMicrotken() + "~" + params.companytoken + "~" + userid;
    
    var formData: any = new FormData();
    formData.append("userid",userid);
    formData.append("commentid",commentid);
    var callOptions = {
      responseType: 'json' as const,
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'X-Authorization': authToken
      })
    };
    const url = this.configservice.getTeamauditApi() + "archiveComment";
    return this.http.post(url,formData,callOptions);
  }

  saveComment(auditid: number, commentid: number,comment: string) : Observable<any>
  {
    var params = this.logservices.localGetCompPrefs();
    var userid = params.userid;
    var authToken = this.configservice.getMicrotken() + "~" + params.companytoken + "~" + userid;
    var formData: any = new FormData();
    formData.append("userid",userid);
    formData.append("commentid",commentid);
    formData.append("auditid",auditid);
    formData.append("comment",comment);
    var callOptions = {
      responseType: 'json' as const,
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'X-Authorization': authToken
      })
    };
    const url = this.configservice.getTeamauditApi() + "saveComment";
    return this.http.post(url,formData,callOptions);
  }

}
