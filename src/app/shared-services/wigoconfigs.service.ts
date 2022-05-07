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
  constructor() { 
    this.wigoHosts = <JSON> this.arrayObj;
    console.log("Wigo host is ==> ", this.wigoHosts);
  }

  wigoHosts: any;
  
  arrayObj: any = {
    "LOCAL_CONFIG": "uncl3mo0622-eztxt",
    "HOST_MODE": "local", // modes: local or cloud or cloud test
    "hWigos":
        [{
            "taudithome": "http://localhost:4201/teamaudit-home", 
            "wigoworld": "http://localhost:8082/",
            "tauditapi": "http://localhost:8081/",
            "wapistats": "http://localhost:3000/",
            "wframe": "http://localhost:3001/",
            "wapifiles":"http://localhost:3005/",
            "wapijsons":"http://localhost:3007/",
            //"wapifiles":"https://innovissum.com/wsfiles/",
            "cataai":"http://localhost:3006/",
            "wapistats_java": "http://localhost:8080/wapistats7_0/service/",
            "wapiluka_java": "http://localhost:8080/Lukafiles701/webresources/",
            "wapiserv_java": "http://localhost:8080/wapiservices/service/",
            "wapidb_java": "http://localhost:8080/wapidb/service/",
            "legacyhome": "http://localhost:8080/Innovaboard500/",
            "defaultcompid": 1,
            "defaulttoken": 'a642976b-7a71-42e5-b327-7417c1e6a46b'
           
        },
        {
            "taudithome": "http://www.teamaudit.net/",
            "wigoworld": "http://localhost:8082/",
            "tauditapi": "http://localhost:8081/", 
            "wapistats": "https://innotips.com/wapistatsnjs/",
            "wframe": "https://innotips.com/wsframe/",
            "wapifiles":"https://innovissum.com/wsfiles/",
            "wapijsons":"https://innovissum.com/wsjsons/",
            "cataai":"https://innovissum.com/cataai/",
            "wapistats_java": "https://innotips.com/wapistats/service/",
            "wapiluka_java": "https://innotips.com/wapiluka/webresources/",
            "wapiserv_java": "https://innoboards.com/wapiservices/service/",
            "wapidb_java": "https://innoboards.com/wapidb/service/",
            "legacyhome": "http://localhost:8080/Innovaboard500/",
            "defaultcompid": 1,
            "defaulttoken": 'a642976b-7a71-42e5-b327-7417c1e6a46b'
 
           
        },
        {
            "taudithome": "http://www.teamaudit.net/", 
            "wigoworld": "http://localhost:8082/",
            "tauditapi": "http://localhost:8081/", 
            "wapistats": "https://innoboards.com/wapistatsnjs/",
            "wframe": "https://innoboards.com/wsframe/",
            "wapifiles":"https://innovissum.com/wsfiles/",
            "wapijsons":"https://innovissum.com/wsjsons/",
            "cataid":"https://innovissum.com/cataai/",
            "wapistats_java": "https://innotips.com/wapistats/service/",
            "wapiluka_java": "https://innotips.com/wapiluka/webresources/",
            "wapiserv_java": "https://innoboards.com/wapiservices/service/",
            "wapidb_java": "https://innoboards.com/wapidb/service/",
            "legacyhome": "http://localhost:8080/Innovaboard500/",
            "defaultcompid": 1,
            "defaulttoken": '26867d6a-627e-4a8e-b447-7e761eedde04'
           
        }
      ],
    "ws_boards_url": "http://localhost:8080/wapistats5_0/service/"
   
  };
  entryToken: string = "uncl3mo0622-eztxt";
  getEntryToken()
  {
    return this.wigoHosts.LOCAL_CONFIG;
  }

  getHOSTMode()
  {
      var hmode = this.wigoHosts.HOST_MODE;
      var ndx = 0;
      switch(hmode) {
          case "cloud":
              ndx = 1;
              break;
          case "cloudtest":
              ndx = 2;
              break;
          default:
              ndx = 0;
              break;
      }
      return ndx;
  }
  getTeamauditHome()
  {
    var ndx = this.getHOSTMode();
    return this.wigoHosts.hWigos[ndx].taudithome;
  }
  getWigoWorldApi()
  {
    var ndx = this.getHOSTMode();
    return this.wigoHosts.hWigos[ndx].wigoworld;
  }
  getTeamauditApi()
  {
    var ndx = this.getHOSTMode();
    return this.wigoHosts.hWigos[ndx].tauditapi;
  }
}


