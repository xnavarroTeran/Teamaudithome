import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WigoconfigsService {

  "Wmicrotoken": string = "s3rfa35tgas666yxan2341132434";
  getMicrotken()
  {
    console.log("Getting it from Wigoconfigs...==>" + this.Wmicrotoken);
    return this.Wmicrotoken;
  }
  constructor() { }

}


