import {Component, OnInit, Input} from "@angular/core";
import { WigoconfigsService } from 'src/app/shared-services/wigoconfigs.service';
import { LoginServiceService } from 'src/app/shared-services/login-service.service';

declare let $: any;

@Component({selector: "app-page-header", templateUrl: "./page-header.component.html", styleUrls: ["./page-header.component.css"]})
export class PageHeaderComponent implements OnInit {
  constructor(private wconfigserv: WigoconfigsService,
              private loginserv: LoginServiceService) {

  }
  apptitle = 'Team Audit';
  landingbg = 'darkseagreen';
  applogo = '../assets/images/logo-product.png';

  // field visibility
  
  @Input() inUsername: string = '';
  @Input() inFullname: string = '';
  @Input() inErrorlogin: boolean = false;
  @Input() inOklogin: boolean = true;
  
  initialization() {
    //======================
    // Sticky menu
    //======================

    $(window).scroll(function () {
      if ($(window).scrollTop() >= 1) {
        $(".header").addClass("fixed-header");
      } else {
        $(".header").removeClass("fixed-header");
      }
    });

    //======================
    // Preloder
    //======================
    $(window).on("load", function () {
    
     
      $("body").delay(500).css({overflow: "visible"});
    });

    //======================
    // Mobile menu
    //======================
    $("#mobile-menu-toggler").on("click", function (e: { preventDefault: () => void; }) {
      e.preventDefault();
      $(".primary-menu > ul").slideToggle();
    });
    $(".has-menu-child").append('<i class="menu-dropdown fas fa-angle-down"></i>');

    if ($(window).width() <= 991) {
      $(".menu-dropdown").on("click",  () => {
        $(this).prev().slideToggle("slow");
        $(this).toggleClass("fa-angle-down fa-angle-up");
      });
    }
  }

  ngOnInit() {
    this.initialization();

  }

  hdrSetupUser(username: string, fullname: string)
  {

  }
  callLogin()
  {
    window.location.href="http://localhost:4200";
  }
  
  callLogout()
  {
    var url = this.wconfigserv.getTeamauditLanding();
    this.loginserv.localClearCmpPref();
    window.location.href=url;
  }
}
