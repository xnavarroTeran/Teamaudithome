import { Injectable, Inject } from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {


  

  constructor(@Inject('language') private languageid: string = 'en') { 
  

  }

  getCurrentDate()
  {
    var fulldate = this.dateobjToYYYYMMDD();
    return this.formatDateLanguage(fulldate,"-",false);

  }

  getDateMinusMonths(tdate: Date, mo: number) {
    var newDate = tdate.getMonth() - mo;
    return newDate;

    
  }
  dateobjToYYYYMMDD(dDate: Date = new Date()) 
    {
        var dd = dDate.getDate().toString();
        var mm = (dDate.getMonth()+1).toString(); //As January is 0.
        var yyyy = dDate.getFullYear();
        if(parseInt(dd) < 10) dd='0'+dd;
        if(parseInt(mm)<10) mm='0'+mm;
        var fulldate = yyyy + "-" + mm + "-" + dd; 
        return fulldate;
        
    };

  formatDateLanguage(strdate: string,strseparator: string ,short: boolean) {
    if (strdate == '')
      return strdate;

    var tokendate = strdate.split(strseparator);
    var yy = tokendate[0];
    if (short === true)
        yy = yy.substring(2); // make it yy
    var mm = tokendate[1];
    var dd = tokendate[2];

    var newdate
    switch(this.languageid) {
        case "es":
            newdate = dd + strseparator + mm + strseparator + yy;
            break;

        case "en":
        default:
            newdate = mm + strseparator + dd + strseparator + yy;
            break;

    }
    return newdate;
};
}
