import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { htmlPrefilter } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class FramecommonService {

  constructor(private localize: TranslateService) { 
    

  }

lbldashb: string = '';
setLabels()
{
  this.localize.get('MAIN.HOME').subscribe((data:any)=> {
    console.log(data);
    this.lbldashb = data;

   });
}

formVMenu(divid: string, thecolor: string) {
  this.localize.get('MENU.HOME').subscribe((data:any)=> {
    console.log(data);
    this.lbldashb = data;
    $('#' + divid).html(this.buildMenu(thecolor));
      
   });
   return " ";
}
buildMenu(thecolor: string)
{
    var lblInnoCamp = "innocampp";
    var lblMyIdeas = "My Ideas";
    var lblMyConfRooms = "My Conf Rooms";
    var lblMyComms = "My Committees";
    var lblMyMeets = " My meets";
    var lblMyProj = "My Projects";
    var lblArch ="Archvied"
    var lblHlp  = "Hep";
    
    var lblKPI = "KPI's";
    var lblAnalytics = "Analytics";
    var lblUsers = "Users";
    
    if (thecolor == null)
      thecolor = '000000';
    var colStyle = " style=\"color: #" + thecolor + ";\" ";
    var html = "<div id=\"vmenu-placeholder\" style=\"margin-top: 70px;\" class=\"wigovmenu\">\n" +
"        </div>\n" +
"        <div id=\"innohome_vmenu_dashb\" \n" +
"             style=\"width: 100%;\" \n" +
"             class=\"wigovmenu text-center\" \n" +
"             data-container='body'\n" +
"             data-html='true'\n" +
"             data-placement='right'>\n" +
"                <a href=\"#\" onclick=\"return showDashboardSub();\">\n" +
"                     <div id=\"inno-boards-icon\" class=\"text-center\" " + colStyle + ">\n" +
"                        <i id='ih_vm_dash_i' class=\"fas fa-home pull-center\"></i>&nbsp;\n" +
"                     </div>\n" +
"                     <div id=\"inno-boards-text\" class=\"text-center\">\n" +
"                        <span class=\"wigo-xs-noshow wigo-sm-font-size\" " + colStyle + ">\n" +
                            this.lbldashb +
"                        </span>\n" +
"                     </div>\n" +
"                    \n" +
"                </a>\n" +
"                <div id=\"ih-vsub-dashb\" style='display: none; font-size: 12px; position: relative; left: 30px; padding-top: 10px; padding-bottom: 30px; z-index: 9999'>" +
"                   <a href=\"#\" onclick=\"return showDashboard();\">\n" +
"                       <div id=\"inno-boards-icon\" class=\"text-center\" " + colStyle + ">\n" +
"                           <i class=\"fas fa-chart-bar pull-center\"></i>&nbsp;\n" +
"                       </div>\n" +
"                       <div id=\"inno-boards-text\" class=\"text-center\">\n" +
"                           <span class=\"wigo-xs-noshow wigo-sm-font-size\" " + colStyle + ">\n" +
                                lblKPI +
"                           </span>\n" +
"                       </div>\n" +
"                   </a>\n" +
"                   <br>" +
"                   <a href=\"#\" onclick=\"return showAnalytics();\">\n" +
"                       <div id=\"inno-boards-icon\" class=\"text-center\" " + colStyle + ">\n" +
"                           <i class=\"fas fa-book pull-center\"></i>&nbsp;\n" +
"                       </div>\n" +
"                       <div id=\"inno-boards-text\" class=\"text-center\">\n" +
"                           <span class=\"wigo-xs-noshow wigo-sm-font-size\" " + colStyle + ">\n" +
                                lblAnalytics +
"                           </span>\n" +
"                       </div>\n" +
"                   </a>" +
"                   <br>" +
"                   <a href=\"#\" onclick=\"return showUsersDash();\">\n" +
"                       <div id=\"inno-userdash-icon\" class=\"text-center\" " + colStyle + ">\n" +
"                           <i class=\"fas fa-users pull-center\"></i>&nbsp;\n" +
"                       </div>\n" +
"                       <div id=\"inno-userdash-text\" class=\"text-center\">\n" +
"                           <span class=\"wigo-xs-noshow wigo-sm-font-size\" " + colStyle + ">\n" +
                                lblUsers +
"                           </span>\n" +
"                       </div>\n" +
"                   </a>" +

"               </div>" +
"                <div id=\"innohome_boards_tab_div\" class=\"wigo-vtransp-menu-divider\"></div>    \n" +
"        </div>\n" +
"        <div id=\"innohome_vmenu_boards\" \n" +
"             style=\"width: 100%;\" \n" +
"             class=\"wigovmenu text-center\" \n" +
"             data-container='body'\n" +
"             data-html='true'\n" +
"             data-placement='right'>\n" +
"                <a href=\"#\" onclick=\"return showCampaigns();\">\n" +
"                    \n" +
"                    \n" +
"                     <div id=\"inno-boards-icon\" class=\"text-center\" " + colStyle + ">\n" +
"                        <i class=\"fas fa-rocket pull-center\"></i>&nbsp;\n" +
"                     </div>\n" +
"                     <div id=\"inno-boards-text\" class=\"text-center\">\n" +
"                        <span class=\"wigo-xs-noshow wigo-sm-font-size\" " + colStyle + ">\n" +
                            lblInnoCamp +
"                        </span>\n" +
"                     </div>\n" +
"                    \n" +
"                </a>\n" +
"                <div id=\"innohome_boards_tab_div\" class=\"wigo-vtransp-menu-divider\"></div>    \n" +
"        </div>\n" +
"        <div id=\"innohome_myideas\" \n" +
"             style=\"width: 100%;\" \n" +
"             class=\"wigovmenu text-center\" \n" +
"             data-container='body'\n" +
"             data-html='true'\n" +
"             data-placement='right'>\n" +
"                <a href=\"#\" onclick=\"return showMyIdeasIn('body',0);\">\n" +
"                    \n" +
"                     <div id=\"ideasIcon\" class=\"text-center\" " + colStyle + ">\n" +
"                        <i class=\"far fa-lightbulb pull-center\"></i>&nbsp;\n" +
"                     </div>\n" +
"                     <div id=\"ideasText\"class=\"text-center\">\n" +
"                        <span class=\"wigo-xs-noshow wigo-sm-font-size\" " + colStyle + ">\n" +
                            lblMyIdeas +
"                        </span>\n" +
"                     </div>\n" +
"                    \n" +
"                </a>\n" +
"                <div id=\"innohome_myideas_tab_div\" class=\"wigo-vtransp-menu-divider\"></div>    \n" +
"        </div>\n" +
"        <div id=\"innohome_mycommittees\" \n" +
"             style=\"width: 100%;\" \n" +
"             class=\"wigovmenu text-center\" \n" +
"             data-container='body'\n" +
"             data-html='true'\n" +
"             data-placement='right'>\n" +
"                <a id=\"innohome_mycommittees_a\" \n" +
"                   href=\"#\"\n" +
"                   onclick=\"return showMyCommittees();\">\n" +
"                    \n" +
"                     <div id=\"committeesIcon\" class=\"text-center\" " + colStyle + ">\n" +
"                        <i class=\"fa fa-users pull-center\"></i>&nbsp;\n" +
"                     </div>\n" +
"                     <div id=\"committeesText\" class=\"text-center\">\n" +
"                        <span class=\"wigo-xs-noshow wigo-sm-font-size\" " + colStyle + ">\n" +
"                             \n" +
                                lblMyComms +
"                        </span>\n" +
"                     </div>\n" +
"                </a>\n" +
"                <div id=\"innohome_mycommittees_tab_div\" class=\"wigo-vtransp-menu-divider\"></div>    \n" +
"        </div>\n" +
"        <div id=\"innohome_myconfrooms\" \n" +
"             style=\"width: 100%;\" \n" +
"             class=\"wigovmenu text-center\" \n" +
"             data-container='body'\n" +
"             data-html='true'\n" +
"             data-placement='right'>\n" +
"                <a id=\"innohome_myconfrooms_a\" \n" +
"                   href=\"#\"\n" +
"                   onclick=\"return showMyConferences();\">\n" +
"                    \n" +
"                     <div id=\"confroomsIcon\" class=\"text-center\" " + colStyle + ">\n" +
"                        <i class=\"fa fa-user-shield pull-center\"></i>&nbsp;\n" +
"                     </div>\n" +
"                     <div id=\"commfroomText\" class=\"text-center\">\n" +
"                        <span class=\"wigo-xs-noshow wigo-sm-font-size\" " + colStyle + ">\n" +
"                             \n" +
                                lblMyConfRooms +
"                        </span>\n" +
"                     </div>\n" +
"                </a>\n" +
"                <div id=\"innohome_mycommittees_tab_div\" class=\"wigo-vtransp-menu-divider\"></div>    \n" +
"        </div>\n" +
"        <div id=\"innohome_myprojects\" \n" +
"             style=\"width: 100%;\" \n" +
"             class=\"wigovmenu text-center\" \n" +
"             data-container='body'\n" +
"             data-html='true'\n" +
"             data-placement='right'>\n" +
"                <a id=\"innohome_myprojects_a\" \n" +
"                   href=\"#\" onclick=\"return showMyProjects();\">\n" +
"                     <div id=\"projectsIcon\" class=\"text-center\" " + colStyle + ">\n" +
"                        <i class=\"fas fa-project-diagram pull-center\"></i>&nbsp;\n" +
"                     </div>\n" +
"                     <div id=\"projectsText\"class=\"text-center\">\n" +
"                        <span class=\"wigo-xs-noshow wigo-sm-font-size\" " + colStyle + ">\n" +
                            lblMyProj + 
"                        </span>\n" +
"                     </div>\n" +
"                    \n" +
"                </a>\n" +
"                <div id=\"innohome_projects_tab_div\" class=\"wigo-vtransp-menu-divider\"></div>    \n" +
"        </div>\n" +
"        <div id=\"innohome_archived\" style=\"width: 100%;\" \n" +
"             class=\"wigovmenu text-center\"\n" +
"             data-container='body'\n" +
"             data-html='true'\n" +
"             data-placement='right'>\n" +
"              <a href=\"#\" onclick='return showArchived();'>\n" +
"                    \n" +
"                    \n" +
"                     <div id=\"archivedIcon\"class=\"text-center\" " + colStyle + ">\n" +
"                        <i class=\"fa fa-file-archive pull-center\"></i>&nbsp;\n" +
"                     </div>\n" +
"                     <div id=\"archivedText\"class=\"text-center\">\n" +
"                        <span class=\"wigo-xs-noshow wigo-sm-font-size\" " + colStyle + ">\n" +
                            lblArch +
"                        </span>\n" +
"                     </div>\n" +
"                    \n" +
"                </a>\n" +
"                <div id=\"innohome_archived_tab_div\" class=\"wigo-vtransp-menu-divider\"></div>    \n" +
"        </div>\n" +
"                        \n" +
"        <div id=\"innohome_info\" \n" +
"             style=\"width: 100%;\" \n" +
"             class=\"wigovmenu text-center\" \n" +
"             data-container='body'\n" +
"             data-html='true'\n" +
"             data-placement='right'>\n" +
"                <a href=\"#\" onclick=\"return showInfoIn();\">\n" +
"                     <div id=\"infoIcon\" class=\"text-center\" " + colStyle + ">\n" +
"                        <i class=\"fas fa-question\"></i>&nbsp;\n" +
"                     </div>\n" +
"                     <div id=\"infoText\" class=\"text-center\">\n" +
"                        <span class=\"wigo-xs-noshow wigo-sm-font-size\" " + colStyle + ">\n" +
"                             \n" +
                            lblHlp + 
"                        </span>\n" +
"                     </div>\n" +
"                    \n" +
"                </a>\n" +
"                <div id=\"innohome_myideas_tab_div\" class=\"wigo-vtransp-menu-divider\"></div>    \n" +
"        </div>\n" +
"       ";
    return html;

  }
}
