/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * created by 
 * 12.22.2021 xan - initial entry
 */

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



(function ( jQuery ) {
 
   
    $('body').on('change','.w-isflagged-only',function() {
        var elemid = $(this).attr("id");
        var id = elemid.split('ZZ')[0];
        var innotipid = $('#' + id).attr("innotipid");
        var isChk = $('#' + elemid).prop("checked");
        if (isChk === false)
            wsdlForMyCommIdeas(id, innotipid,false);
        else
            wsdlForMyCommIdeas(id, innotipid,true);
        return false;
    });
    
    $.fn.CInnoComments22 = function( options ) {
        
       
        var settings = $.extend({
            userid: '',
            innotipid: '',
            title: 'Comms',
            lblwrittenby: 'Written...',
            lbldate: 'Date',
            lblcomment: 'Comment'
            
        }, options );
        
        var id = $(this).attr("id");
        $('#' + id).attr("userid", settings.userid);
        $('#' + id).attr("innotipid", settings.innotipid);
        $('#' + id).initInnoCommentsForm(settings.title,
                                         settings.lblwrittenby,
                                         settings.lbldate,
                                         settings.lblcomment,
                                         );
        wsdlForMyCommIdeas(id, settings.innotipid,false);
       return false;
        
    };
    $.fn.initInnoCommentsForm = function(lblTitle,lblWBy,lblWDate,lblComment) 
    {
        var id = $(this).attr("id");
        var lblFlagged = $('#lbl-flagged').val();
        
        var html = '';
        html += "<div id=\"home_innocomms_" + id + "\"class=\"container-fluid\">\n";
        html += "    <div id=\"innohome_innocomms_loading\" class=\"row img-process-running\" style=\"display: none;\">\n";
        html += "       <div class='col-12'>";
        html += "           <img src=\"img/loading.gif\" height=\"36px;\" width=\"36px;\">\n";
        html += "       </div>";
        html += "    </div>\n";
        html += "    <div class=\"row text-right\">\n";
        html += "       <div class='col-12'>";
        html += "           <span>";
        html += "               <input id='" + id + "ZZ_flagged-onlyXXTT' class='w-isflagged-only' type='checkbox'/>";
        html += "               <label for '" + id + "%_flagged-onlyXXTT'>";
        html += "                   <strong>";
        html +=                         lblFlagged;
        html += "                   </strong>";
        html += "               </label>";
        html += "           </span>";  
        html += "       </div>";
        html += "    </div>\n";
        html += "    <div id=\"home_innocomms_lst_" + id + "\"class=\"row\">\n";
        html += "        <div class=\"col-12\">\n";
        html += "           <table id=\"table_lst_comments_" + id + "\" class=\"table table-bordered w-font-main-para-sm\" cellspacing=\"0\" width=\"100%\">\n";
        html += "               <thead>\n";
        html += "                   <tr class='text-primary text-center w-font-r75'>\n";
        html += "                       <th class='text-center'>" + lblWBy + "</th>\n";
        html += "                       <th class='text-center'>" + lblWDate + "</th>\n";
        html += "                       <th class='text-center'>" + lblComment + "</th>\n"; 
        html += "                       <th class='text-center'></th>\n"; 
        html += "                   </tr>\n";
        html += "              </thead>\n";
        html += "           </table><div class=\"clear\"></div>\n";
        html += "        </div>\n";
        html += "    </div>";
        html += "</div>\n";
             
        $('#' + id).html(html);
    };
    
    
  
}( jQuery ));


function wsdlForMyCommIdeas(id, innotipid,isFlaggedOnly)
{
    
    var userid = $('#' + id).attr("userid");
    var wsBaseURL = glb_wsBasenjsURL;
    var wsCompid = glb_wsCompid;
    var wsCompToken = glb_wsCompToken;
    var flaggedonly = (isFlaggedOnly === true) ? 1 : 0;
    var committeeid = 0;
    var  wsLoginURL = wsBaseURL + "Comments/getInnoComments/";
    wsLoginURL += wsCompid + "/" + wsCompToken + "/"; 
    wsLoginURL += userid + "/" + innotipid + "/" + committeeid + "/" + flaggedonly + "/1";
    $.ajax({
        url: wsLoginURL,
        dataType: 'JSONP',
        jsonpCallback: 'jsonpCallback',
        type: 'GET',
        success: function(aData) {
            loadMyComments(id,aData);
        }
    });

    return false;
        
};
        
        
function loadMyComments(id, aData)
{
    var userid= $('#' + id).attr('userid');
    
    $('#table_lst_comments_' + id).dataTable().fnDestroy();
        
    $('#table_lst_comments_' + id).DataTable( {
                    
            "fnCreatedRow": function( nRow, aData, iDataIndex ) {
                     }, 
            "oLanguage": { "sSearch": "<p style=\"font-size:11px; margin-top: 50px;\"></p>",
                        sProcessing: "<img src='img/ajax-loader.gif'>",
                "oPaginate": {
                        "sFirst": "<<",
                        "sLast": ">>",
                        "sNext": ">",
                        "sPrevious": "<"

                  } },
                "columnDefs": [
                        { responsivePriority: 1, targets: 0 },
                        { responsivePriority: 1, targets: 1 },
                        { responsivePriority: 1, targets: 2 },
                        { responsivePriority: 1, targets: 3 }
                    ],

                "bFilter" : true, 
                "bProcessing" : true,
                "bLengthChange": false,
                "bInfo": false,
                "pagingType": "full_numbers",
                "iDisplayLength": 200,
                "order": [[ 0, "asc" ]],
                dom: 'Bfrtip',
                        buttons: [
                            'copyHtml5',
                            'excelHtml5',
                            'csvHtml5',
                            'pdfHtml5'
                        ],
                 "language": {
                        "search": '<i class="fas fa-search"></i>'
                    },
                 tableTools: {
                        
                        "aButtons"          : []
                       
                    },
                 "data": aData.data,
                "columns": [
                        { "data": "writtenby","sWidth": "10%","className": "text-center",
                            "render": function(data,type,row,meta) {
                                var divid = InnoGUID();
                                var imgid = divid + "_img";
                                var data = userpicFormatPicDiv(divid,
                                                               imgid,
                                                               row.userpicpath,
                                                               row.userimg,
                                                               row.firstname,
                                                               row.lastname,
                                                               row.userid);
                                return data;
                            }
                        },
                        { "data": "commentdate","sWidth": "10%",},
                        { "data": "comment","sWidth": "70%","className": "text-left"},
                        { "data": "flaggername","sWidth": "20%","className": "text-center",
                           "render": function(data,type,row,meta) {
                               var isFlag = row.flaggedby;
                               data = formatFlagButton(userid, row.id,row.flaggedby,row.flaggername); 
                               return data;
                           }
                       }
                ]
        });
         
        
}

function formatFlagButton(userid, commentid, flaggedby, flaggername) 
{
    
    var lblFlag = $('#lbl-flag').val();
    var lblUnFlag = $('#lbl-unflag').val();
    var divid = InnoGUID();
    
    var isFlag = flaggedby;
    var html = '';
    html += "<div id='" + divid + "'>";
    if (parseInt(isFlag) <= 0) {
        html += "<button class='btn btn-primary btn-sm' ";
        html += "        onclick=\"return flagComment('" + userid + "','" + commentid + "','" + divid + "');\">";
        html +=      lblFlag;
        html += "</button>";
    } else 
        if (parseInt(isFlag) === parseInt(userid)) {
            html += "<button class='btn btn-danger btn-sm' ";
            html += "   onclick=\"return UnflagComment('" + userid + "','" + commentid + "','" + divid + "');\">";
            html +=     lblUnFlag;
            html += "</button>";
        } else {
             html +="    <i class='fa fa-flag text-success w-istooltip' title='" + flaggername + "'></i>";

        }
    html += "</div>";
    return html;
}

function flagComment(userid, commentid, divid)
{
    var wsBaseURL = glb_wsBasenjsURL;
    var wsCompid = glb_wsCompid;
    var wsCompToken = glb_wsCompToken;

    var  wsLoginURL = wsBaseURL + "Comments/flagInnoComments/";
    wsLoginURL += wsCompid + "/" + wsCompToken + "/"; 
    wsLoginURL += userid + "/" + commentid + "/1";
    $.ajax({
        url: wsLoginURL,
        dataType: 'JSONP',
        jsonpCallback: 'jsonpCallback',
        type: 'GET',
        success: function(aData) {
            var html = formatFlagButton(userid, 
                                        aData.data[0].id,
                                        aData.data[0].flaggedby,
                                        aData.data[0].flaggername);
            $('#' + divid).html(html);
        }
    });
}

function UnflagComment(userid, commentid, divid)
{
    var wsBaseURL = glb_wsBasenjsURL;
    var wsCompid = glb_wsCompid;
    var wsCompToken = glb_wsCompToken;

    var  wsLoginURL = wsBaseURL + "Comments/unflagInnoComments/";
    wsLoginURL += wsCompid + "/" + wsCompToken + "/"; 
    wsLoginURL += userid + "/" + commentid + "/1";
    $.ajax({
        url: wsLoginURL,
        dataType: 'JSONP',
        jsonpCallback: 'jsonpCallback',
        type: 'GET',
        success: function(aData) {
            var html = formatFlagButton(userid, 
                                        aData.data[0].id,
                                        aData.data[0].flaggedby,
                                        aData.data[0].flaggername);
            $('#' + divid).html(html);
        }
    });
}

function gotoEvalCommittee(boardid,innotipid,title)
{
    var userid = localgetUserId();
    var token = glb_wsCompToken;
    var aData = localGetCompPrefs(getEntryToken());
    var json = {};
    json.adata = aData;
    json.userid = localgetUserId();
    var token = btoa(JSON.stringify(json));
    //var title = btoa($('#h_innotipinfo_innotitle').html());
    title = btoa(title);
    var gotoCall =  gbl_contextRoot + "/innotip360comms.htm?cata=" + token;
    gotoCall += "&boardid=" + boardid + "&innotipid=" + innotipid + "&target=classifs&ti=" + title;
    return gotoCall;
}


function myCommUserPicError(divid, imgid,imgpath,imgname,firstname,lastname,mainowner) { 
    var imgname = '';
    var pichtml = userpicFormatPicDiv(divid,imgid,imgpath, imgname, firstname, lastname);
    var usrtooltip = userFormatTooltip(firstname + " " + lastname);
    var spansect = "<div style=\"display: inline; cursor: pointer;\" " + usrtooltip + "\">" + pichtml + "</div>"; 
    $('#' + divid).html(spansect);
    
    return false;
   
}

 function userpicFormatPicDiv(divid, imgid, imgpath,imgname,firstname,lastname,mainowner)
    {
        var picurl = '';
        var html = '';
        if (imgname === "blank_img.jpg" || 
            imgname === "blank_image.jpg" || 
            imgname === '') {
                html += "<div id='" + divid + "' class=\"wigo-user-no-pic w-istooltip\" title=\"" + firstname + " " + lastname + "\" style=\"cursor: pointer;\">\n";
                picurl = userFormatUserImage(imgid,imgpath, imgname, firstname, lastname);
                html += picurl;
                html += "</div>";

        } else { 
                html += "<div id='" + divid + "' class=\"userinnopics-extra-small w-istooltip\" style=\"display: inline; cursor: pointer;\" title=\"" + firstname + " " + lastname + "\">\n";
                picurl = userFormatUserImage(imgid,imgpath, imgname, firstname, lastname);
                html += "<img id=\"" + imgid + "\" src=\"" + picurl + "\" class=\"userinnopics-extra-small\" onerror=\"return myCommUserPicError('" + divid + "','" + imgid + "','" + imgpath + "','" + imgname + "','" + firstname + "','" + lastname + "'," + mainowner + ");\">";
                html += "</div>\n";
        }
        return html;
    }
    
    function userFormatUserImage(id,imgpath,imgname,firstname,lastname)
    {


       var picurl = '';
        if (imgname === "blank_img.jpg" || 
            imgname === "blank_image.jpg" || 
            imgname === '') {
                picurl += firstname.substring(0, 1)
                            + "" + lastname.substring(0, 1);

        } else {
                picurl += imgpath + "/" +imgname;

        }
       return picurl; 
    }
   
    function userFormatTooltip(lbl)
    {
        var html = "title=\"" + lbl + "\" " +
                   "data-toggle=\"tooltip\"";
           return html;
    }


  


