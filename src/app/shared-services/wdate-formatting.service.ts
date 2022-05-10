import { Injectable } from '@angular/core';
import * as moment from 'moment';

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
}
