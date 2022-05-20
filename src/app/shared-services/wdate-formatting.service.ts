import { Injectable } from '@angular/core';

import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import 'dayjs/locale/es' // import locale

const MY_FORMATS_ES = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const MY_FORMATS_EN = {
  parse: {
    dateInput: 'MM-DD-YYYY',
  },
  display: {
    dateInput: 'MM-DD-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Injectable({
  providedIn: 'root'
})



export class WdateFormattingService {

  constructor() { }
  public getFormat(): string
  {
    var ddlocale = localStorage.getItem("wigolocaleMODONAGAL");
    
    if (ddlocale == null) {
      ddlocale = 'es_ES';
    }
    var languageid = ddlocale.substring(0,2);
    return languageid;
  }
  public getFormats()
  {
    var ddlocale = localStorage.getItem("wigolocaleMODONAGAL");
    
    if (ddlocale == null) {
      ddlocale = 'es_ES';
    }
    if (ddlocale == 'en_US') {
      return MY_FORMATS_EN;
    } else 
      return MY_FORMATS_ES;
  }
  public getLocale(): string
  {
    var ddlocale = localStorage.getItem("wigolocaleMODONAGAL");
    if (ddlocale == null)
      ddlocale = 'es_ES';
    return ddlocale;  
  }  
  public setLocale(ddlocale: string)
  {
    if (ddlocale !== null)
      localStorage.setItem("wigolocaleMODONAGAL",ddlocale);
  }

  public strDateDISPFMT(indate: Date, separator: string = "/")
  {
    if (indate == null)
      indate = new Date();
    var ddLoc = this.getLocale();
    var languageid = ddLoc.substring(0,2);
    dayjs().locale(languageid);
    var tDate = dayjs(indate);
    var fmt = '';
    switch(languageid) {
      case "es":
        fmt = 'DD' + separator + 'MM' + separator + 'YYYY'; 
        break;
      default:
        fmt = 'MM' + separator + "DD" + separator + "YYYY";
        break;
    }
    return tDate.format(fmt).toString();
  }
  public strDateYYYYMMDDFMT(indate: Date,separator: string = "/")
  {
    
    var mm = indate.getMonth() + 1;
    var mo = (mm < 10) ? "0" + mm : mm;
    var dd = indate.getDate();
    var day = (dd < 10) ? "0" + dd : dd;

    return indate.getFullYear() + separator + mo + separator + day;
    
  }
}
