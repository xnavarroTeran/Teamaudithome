// customDateAdapter.ts
// description:
//  Provide date format services 
//
//  Modification history:
//      05.09.2022 xan - initial entry
//
// @Copyright Wigo Technologies 2016, 2017, 2018, 2019, 2020, 2021, 2022. All rights reserved
 
import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { WdateFormattingService } from './../shared-services/wdate-formatting.service';

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

@Injectable()
export class CustomDateAdapter extends MomentDateAdapter
{
  constructor(private _dateTimeService: WdateFormattingService)
  {
    super('es_ES'); // set default locale
  }

  public getDateFormats()
  {
   
    const formats = this._dateTimeService.getFormats();
    return formats;
    
  }
  public override format(date: moment.Moment, displayFormat: string): string
  {
    const locale = this._dateTimeService.getLocale();
    const format = this._dateTimeService.getFormat();

    return date.locale(locale).format(format);
  }
}
