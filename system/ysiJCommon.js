
//load jQuery and Jquery-ui js files
if (typeof jQuery == "undefined") {
    loadjscssfile(document, "jquery.js", "js");
    loadjscssfile(document, "jquery-ui.js", "js");
}

(function ($) {
    $.getJsScript = function (url, callback, cache) {
        var regExp = new RegExp("^/([^/]+)/");
        var webShare = (regExp.test(location.pathname)) ? "/" + RegExp.$1 + "/" : "";
        url = webShare + "system/" + url;
        if (typeof cache == "undefined")
            cache = true;
        jQuery.ajax({
            type: "GET",
            url: url,
            dataType: "script",
            success: callback,
            cache: cache
        });
    }
})(jQuery);

// ysiDiv related code
jQuery(document).ready(function () {
    var exHeadObject;
    var divid;
    var tempheight;
    var state;
    var pagename;

    pagename = getPageName();

    jQuery('span[id*="_expanderHead"]').each(function () {
        exHeadObject = this.id;
        divid = exHeadObject.substr(0, exHeadObject.length - 13);


        tempheight = jQuery('div[id="' + divid + '_expanderContent"]').height()
        var div = jQuery(jQuery('span[id="' + divid + '_expanderSign"]'))[0];
        jQuery.data(div, "height", { first: tempheight });

        var IsDefaultCollapsed;

        state = sessionStorage.getItem(pagename + '#' + divid);

        IsDefaultCollapsed = jQuery('#' + divid + '_expanderContent').attr("DefaultCollapsed");

        if (state != "+") {
            jQuery('div[id="' + divid + '_expanderContent"]').height(15);
            jQuery('span[id="' + divid + '_expanderSign"]').html("+");
        }

    });

    jQuery('span[id*="_expanderHead"]').click(function () {
        exHeadObject = this.id;
        divid = exHeadObject.substr(0, exHeadObject.length - 13);
        var IsParentDiv = jQuery('#' + divid + '_expanderContent').attr("parentdiv");

        if (IsParentDiv == "True") {

            var action;
            if (jQuery('span[id="' + divid + '_expanderSign"]').text() == "-") {
                action = 'collapse';
            }
            else {
                action = 'expand';
            }

            jQuery('#' + divid + '_expanderContent').find('span[id*="_expanderHead"]').each(function () {
                exHeadObject = this.id;
                var innerDivId = exHeadObject.substr(0, exHeadObject.length - 13);
                var Isparentinnerdivid = jQuery('#' + innerDivId + '_expanderContent').attr("parentdiv");
                if (action == "collapse") {
                    if (Isparentinnerdivid != 'True')//for Parent Div only change the Sign do not actually Collapse\Expand
                    {
                        CollapseDiv(innerDivId,pagename);
                    }
                    else {
                        jQuery('span[id="' + divid + '_expanderSign"]').html("+");
                        jQuery('span[id*="' + divid + '_expanderHead"]').css('border', '');
                        sessionStorage.setItem(pagename + '#' + divid, '-');
                    }
                }
                else {
                    if (Isparentinnerdivid != 'True')//for Parent Div only change the Sign do not actually Collapse\Expand
                    {
                        ExpandDiv(innerDivId,pagename);
                    }
                    else {
                        jQuery('span[id="' + divid + '_expanderSign"]').html("-");
                        jQuery('span[id="' + divid + '_expanderSign"]').css('border-right', '1px solid #000000');
                        jQuery('span[id="' + divid + '_expanderSign"]').css('border-bottom', '1px solid #000000');
                        sessionStorage.setItem(pagename + '#' + divid, '+');
                    }
                }

            });
        }
        else {
            ExpandCollapseDiv(divid,pagename);
        }

    });
    ResetBase64Values();
});

function ExpandCollapseDiv(divid, pagename) {
    if (jQuery('span[id="' + divid + '_expanderSign"]').text() == "-") {
        CollapseDiv(divid, pagename);
    }
    else {
        ExpandDiv(divid, pagename);
    }
}


function ExpandDiv(divid, pagename) {
    var div = jQuery(jQuery('span[id="' + divid + '_expanderSign"]'))[0];
    jQuery('div[id="' + divid + '_expanderContent"]').animate({ "height": jQuery.data(div, "height").first }, "fast");
    jQuery('span[id="' + divid + '_expanderSign"]').html("-")
    jQuery('span[id="' + divid + '_expanderSign"]').css('border-right', '1px solid #000000')
    jQuery('span[id="' + divid + '_expanderSign"]').css('border-bottom', '1px solid #000000')
    sessionStorage.setItem(pagename + '#' + divid, '+');
}

function CollapseDiv(divid, pagename) {
    jQuery('div[id="' + divid + '_expanderContent"]').animate({ "height": "15px" }, "slow");
    jQuery('span[id="' + divid + '_expanderSign"]').html("+")
    jQuery('span[id*="' + divid + '_expanderHead"]').css('border', '');
    sessionStorage.setItem(pagename + '#' + divid, '-');
}

var __bind = function(fn, me) { return function() { fn.apply(me, arguments); }; }
function showLoading() {
    var jq = getParentWindow();
    if (!jq) { jq = window.jQuery; }
    (function($) {
        $("#divLoading").show();
    })(jq);
}

function HideLoading() {
    var jq = getParentWindow();
    if (!jq) { jq = window.jQuery; }
    (function($) {
        $("#divLoading").hide();
    })(jq);
}

function split(val) {
    return val.split('^');
}

//variable declration
var fileDownloadCheckTimer;
var autocompleteSettings; // autocompelete input common settings
(function($) {

    function isVisible(that) {
        //var that = $(this);
        if (that.type == "hidden")
            return true;
        var myStyle = that.style;
        if (that.getAttribute("width") && parseFloat(that.getAttribute("width").replace("px", "")) == 0) {
            return false;
        }
        if (myStyle.width != "0px" && myStyle.height != "0px" && myStyle.display != "none" && myStyle.visibility != "hidden")
            return true;
        return false;
    }

    $(document).ready(function() {

        $.ajaxSetup({
            beforeSend: function() {
                showLoading();
            },
            complete: function() {
                HideLoading();
            },
            success: function() {
                HideLoading();
            }
        });

        //remove height from dropdown list
        //$("select").filter(function() { return $(this).height() <= 20; }).css({ 'height': '' });
        //$('input[style*="width:0px"]').css('top', '-1000px');
        //$("*[height='0px']").css('display', 'none');
        //$('*[width="0px"]').css('display', 'none');
        $("input").filter(function() { return !isVisible(this); }).hide();
        $("table").filter(function() { return $(this).attr("cellspacing") == null || $(this).attr("cellspacing") == "0" }).attr("cellspacing", "1");

        //resize lookup list button
        $('button').filter(function() {
            return $(this).width() <= 12 && $.trim($(this).text()) == "";
        }).width("12px").height("19px").css("vertical-align", "top");

        $("#TabStrip").css('white-space', 'nowrap');

        //set <OBJECT ID=""ysiComm1"" height =0 chrome
        $("object[id='ysiComm1']").height("0px");
        
        //Detecting the File Download Dialog In the Browser
        var downloadBtnSelector = "button[id*='PDF'], button[id*='Excel'], img[onclick*='excelexport'], img[onclick*='pdfexport']";
        $(downloadBtnSelector).unbind("click");
        if ($(downloadBtnSelector).size()) {
            $(downloadBtnSelector).each(function(index, element) {
                var doOnClick = $(element).attr("onclick");
                element.click = null;
                $(element).attr("doOnClick", doOnClick);
                $(element).removeAttr("onclick");
                $(element).click(function(e) {
                    var token = new Date().getTime(); //use the current timestamp as the token value
                    $('#download_token_value_id').val(token);
                    eval($(this).attr("doOnClick"));
                    fileDownloadCheckTimer = setInterval(function() {
                        var cookieValue = $.cookie('fileDownloadToken');
                        if (cookieValue == token) {
                            clearInterval(fileDownloadCheckTimer);
                            if (typeof ProgressbarHide != "undefined") ProgressbarHide();
                        }
                    }, 1000);

                    e.preventDefault();
                });
            });
            if ($("#download_token_value_id").size() == 0) {
                var download_token = $("<input type=\"hidden\" id=\"download_token_value_id\" name=\"download_token_value_id\"/>");
                $("form").append(download_token);
            }
        }

        //browser wise set remove css attributes
        if (($.browser.msie && $.browser.version > 8) || !$.browser.msie) {
        if (typeof document.getElementById("NojQuerySpanCss") == 'undefined' || document.getElementById("NojQuerySpanCss") == null)
         {
            if (document.getElementsByTagName("a").length < 1000) {
                $("a").each(function(ind, anc) {
                    var anc = $(anc);
                    if (anc.hasClass("Txt") || anc.hasClass("txt")) anc.css("padding-left", "-=3");
                    if (anc.get(0).style.width != "" && isVisible(anc.get(0))) anc.css({ "display": "inline-block" });
                });
            }
            
	    $("span").each(function(ind, span) {
	        var span = $(span);
		if (!span.closest("div").hasClass("ysi-grid-dDiv"))
		{
        	        if (span.is(":not(:empty)") && span.css("height") && span.height() > 19) { span.css({ "height": "auto" }); }
	                if (isVisible(span.get(0))) span.css({ "display": "inline-block", "vertical-align": "top" });
                	if (span.hasClass("FINP")) span.css({ "margin": "0em" });
	                if (span.hasClass("Txt") || span.hasClass("txt")) span.css({ "padding-top": "-=1", "padding-right": "-=1", "padding-bottom": "-=1", "padding-left": "-=4" });
		}
            });
		
            $("#filterDiv table tr").filter(function() {
                var row = $(this);
                return row.children().size() == 0 || row.find("td").size() == 1 && $("td:eq(0)", row).is(":empty");
            }).remove(); //remove blank row from filterDiv table for propert UI
	}

	    /*if ($.browser.webkit){ $("#filterDiv input.INP").css({"margin-left":"2px","width":"115px"}); }
	    if ($.browser.webkit){ $("#filterDiv input.FREQ").css({"margin-left":"2px","width":"115px"}); }*/
            //hide button having height = 0px;
            $("button").filter(function() { return $(this).height() == 0; }).hide();
        }

        if (!$.browser.msie || ($.browser.msie && $.browser.version > 8)) {
            //remove ysiDataGrid blank ToolBar table
            $("div[id*='_DataGridContainer']").each(function(index, grd) {
                var headerDiv = $(grd).children("div[id*='_HeaderDiv']");
                //set grid sort-up and sort-down image position
                if ($.browser.msie && $.browser.version > 8) {
                    $("table.header th img", headerDiv).filter(function() {
                        return this.src.toLowerCase().search("sortup.gif") > -1 || this.src.toLowerCase().search("sortdown.gif") > -1;
                    }).attr("style", function(i, s) { return s + 'position: relative !important;' });
                } else {
                    $("table.header th img", headerDiv).filter(function() {
                        return this.src.toLowerCase().search("sortup.gif") > -1 || this.src.toLowerCase().search("sortdown.gif") > -1;
                    }).css({ "marginTop": "3px", "marginRight": "3px", "z-index": "" });
                }
                var ToolBarTable = headerDiv.prev();
                ToolBarTable.css("z-index", 3);
                if (ToolBarTable.size() && ToolBarTable.is("table") && ToolBarTable.find("tr > td").size() == 0)
                    ToolBarTable.hide();
                //headerDiv.css("overflow", "");

                // set max-height for datadiv Div to remove horizontal blank spaces
                var DataDiv = $(grd).children("div[id*='_DataDiv']");
                if (DataDiv.css("overflow") == "auto") {
                    var maxHeight = DataDiv.get(0).style.height;
                    DataDiv.css("height", "");
                    DataDiv.css("max-height", maxHeight);
                }
            });
        }

        //        $('form').submit(function () {
        //            //showLoading();
        //            //Remove final carrot on submit from all lookuplist
        //            $(".ui-autocomplete-input").each(function(ind, input){
        //                var txtVal = $(this).val();
        //                if(txtVal != "" && trim($(this).val()).substr(txtVal.length -1) == "^")
        //                 $(this).val(trim($(this).val()).substr(0, txtVal.length -1));
        //            });
        //        });

        if (typeof (ReAlignJumpToBox) == 'function') ReAlignJumpToBox($, this);

        if (typeof (AdjustFunctionLinks) == 'function') AdjustFunctionLinks($, this);

        if (typeof CheckUserBrowserAgnostic != "undefined" && CheckUserBrowserAgnostic()) {

            //find all anchor tag calling javascript:OpenNewWindow method        
            $("a[href*='javascript:OpenNewWindow'], a[href*='JavaScript:OpenNewWindow']").each(function(index, element) {
                var href = $(element).attr("href");
                href = href.replace(/javascript:opennewwindow/i, "");
                href = href.replace(";", "");
                href = href.replace("('", "").replace("')", "");

                $(element).attr("href", href);

                $(element).click(function(e) {
                    OpenNewWindowInDialogBox($(this).attr("href"), $.trim($(this).text()));
                    e.preventDefault();
                    return false;
                });
            });
        }

        //find all button tag calling location.href method
        $("button[onclick*='location.href']").each(function(index, element) {
            var onclick = $(element).attr("onclick")
            $(element).attr("href", onclick);
            element.onclick = null;
            $(element).click(function(e) {
                e.preventDefault();
                eval($(this).attr("href"));
            });
        });

        //find all input tag calling isDay = true method
        //        $("input[isday*='true']").each(function(index, element) {
        //            //$(element).focus(function(e) {
        //                $(this).datepicker();
        //            //});
        //        });

        var datecontrols = $("a[href*='javascript:show_calendar'],a[href*='javaScript:show_calendar'], a[href*='JavaScript:show_calendar'], img[onclick*='javascript:show_calendar'], img[onclick*='JavaScript:show_calendar']");
        var dpDiv;
        var dateFormat = typeof GetDateFormat != "undefined" ? GetDateFormat().toLowerCase().replace(/{/g, "").replace(/}/g, "").replace("yyyy", "yy") : "mm/dd/yy";
        var frameBody;
        try {
            frameBody = window.parent.document.getElementById("filter") == null ? $(window.document.body) : $(window.parent.document.getElementById("filter").contentWindow.document.body);
        }
        catch (e) {
        }

        for (var i = 0; i < datecontrols.length; i++) {
            var dtCtl = $(datecontrols[i]);
            //find target control
            var targetControlId = dtCtl.attr(datecontrols[i].nodeName.toLowerCase() == "a" ? "href" : "onclick");
            targetControlId = targetControlId.replace(/javascript:show_calendar/i, "");
            targetControlId = targetControlId.substr(2, targetControlId.length - 4);
	    if (targetControlId.search(",") > -1){targetControlId = targetControlId.split(",")[0].replace("'","");}

            var dtPickerControl = null;
            if (document.getElementsByName(targetControlId).length == 0) {
                if (!document.getElementById(targetControlId)) {
                    if (targetControlId.indexOf(".") > -1) {
                        targetControlId = targetControlId.substr(targetControlId.indexOf(".") + 1);
                    }
                }
                dtPickerControl = document.getElementById(targetControlId);
                if (!dtPickerControl) {
                    if (document.getElementsByName(targetControlId).length > 0) { dtPickerControl = document.getElementsByName(targetControlId)[0]; }
                }
            } else {
                dtPickerControl = document.getElementsByName(targetControlId)[0];
            }

			if (GetSubCookie("Culture", "LanguageCode") == "de-DE") {
				if (dtPickerControl)
					$(dtPickerControl).datepicker({ showOn: null,onClose: function () {$(this).focus(); }, closeText: "Schließen",prevText: "&#x3C;Zurück",nextText: "Vor&#x3E;",currentText: "Heute", firstDay: 1, monthNamesShort: [ "Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez" ], dayNamesShort: [ "So","Mo","Di","Mi","Do","Fr","Sa" ], dayNamesMin: [ "So","Mo","Di","Mi","Do","Fr","Sa" ], changeMonth: true, changeYear: true, monthRange: '1:12', yearRange: '1920:2050', minDte: new Date(), beforeShow: function (input, inst) { dpDiv = $(inst.dpDiv[0]); }, dateFormat: dateFormat }).css({ "z-index": "9998" });
			}
			else if (GetSubCookie("Culture", "LanguageCode") == "zh-CN") {
				if (dtPickerControl)
					$(dtPickerControl).datepicker({ showOn: null,onClose: function () {$(this).focus(); }, closeText: "关闭",prevText: "&#x3C;上月",nextText: "下月&#x3E;",currentText: "今天", firstDay: 1, monthNamesShort:  [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ], dayNamesShort: [ "周日","周一","周二","周三","周四","周五","周六" ], dayNamesMin: [ "日","一","二","三","四","五","六" ], changeMonth: true, changeYear: true, monthRange: '1:12', yearRange: '1920:2050', minDte: new Date(), showMonthAfterYear: true, beforeShow: function (input, inst) { dpDiv = $(inst.dpDiv[0]); }, dateFormat: dateFormat }).css({ "z-index": "9998" });
			}
			else {
				if (dtPickerControl)
					$(dtPickerControl).datepicker({ showOn: null,onClose: function () {$(this).focus(); }, changeMonth: true, changeYear: true, monthRange: '1:12', yearRange: '1920:2050', minDte: new Date(), beforeShow: function (input, inst) { dpDiv = $(inst.dpDiv[0]); }, dateFormat: dateFormat }).css({ "z-index": "9998" });
			}

            datecontrols[i].targetControl = targetControlId;
            //$("#"+targetControlId).attr("datepicker","true");

            //remve href from anchor link
            if (datecontrols[i].nodeName.toLowerCase() == "a")
                dtCtl.removeAttr("href");

            //remove onclick
            datecontrols[i].onclick = null;

            //show datetime picker on element click
            dtCtl.click(function(e) {
                if (typeof $(document.all($(this).attr("targetControl"))).datepicker != "undefined") {
                    $(document.all(this.targetControl)).datepicker("show");
                    if (frameBody != null && typeof frameBody != "undefined") {
                        //set framebody vertical scroll position to max to show calendar properly
                        var clHeight = frameBody[0].clientHeight;

                        var dpOffsetTop = dpDiv.offset().top;
                        var dpOuterHeight = dpDiv.outerHeight();
                        if ((dpOffsetTop + dpOuterHeight) > clHeight) {
                            frameBody.scrollTop((dpOffsetTop + dpOuterHeight + 5) - clHeight);
                        }
                    }
                }
            });
        }

        if (typeof CheckUserBrowserAgnostic != "undefined" && CheckUserBrowserAgnostic()) {
            //find all lookup buttons calling javascript:OpenNewWindow method
            $("button[onclick*='javascript:OpenNewWindow'], button[onclick*='JavaScript:OpenNewWindow']").each(function(index, element) {
                var onclick = $(element).attr("onclick");
                onclick = onclick.replace(/javascript:opennewwindow/i, "");
                onclick = onclick.replace(";", "");
                onclick = onclick.replace("('", "").replace("')", "");

                $(element).attr("lookupUrl", onclick);
                $(element).removeAttr("onclick");

                $(element).click(function(e) {
                    OpenNewWindowInDialogBox($(this).attr("lookupUrl"), $.trim($(this).text()));
                    e.preventDefault();
                    return false;
                });
            });
        }

        //find all disabled buttons
        /*
        if (($.browser.msie && $.browser.version > 8) || !$.browser.msie) {
            $("button[disabled]").addClass("datagrid_disabled");
        }
		*/
		
        // removing madatory fileds if it is disabled.
        $("input[disabled]").attr("mandatory", "false");

        //find all close button calling javascript function to close popup window
        $(":button").each(function(ind, btn) {
            var btn = $(btn);
            if (btn.attr("onclick") != null && btn.attr("onclick") != "") {
                if ((btn.text().toLowerCase() == "close" || btn.text().toLowerCase() == "<u>c</u>lose") && btn.attr("onclick").search("_doPostBack") < 0) {
                    btn.unbind("click");
                    btn.attr("execute", btn.attr("onclick"));
                    btn.removeAttr("onclick");

                    btn.click(function(e) {
                        e.preventDefault();
                        var jsFunction = $(this).attr("execute");
                        if (jsFunction.search("_doPostBack") < 0) {
                            var opener = window.parent; //here we are opening popup in jQuery DialogBox so opener will be window.parent (iframe parent)
                            var result = eval(jsFunction);
                            if(typeof result == "undefined" || result)
								window.parent.jQuery(".ui-dialog-content").dialog("close");
                        }
                        return false;
                    });
                } else {
                    if (typeof btn.attr("type") == "undefined" || (btn.attr("type") && btn.attr("type") != "submit")) {
                        btn.click(function(e) {
                            e.preventDefault();
                        });
                    }
                }
            }
        });

        //find all tr having ondblclick=ShowSelection()
        $("tr[ondblclick*='ShowSelection']").each(function(index, row) {
            $(row).attr("ondblclick", $(row).attr("ondblclick").replace("ShowSelection()", "ShowSelection(this)"));
        });

        if (!$.browser.msie) {
            $(":button*[onclick]").each(function(ind, element) {
                if ($(element).attr("onclick").search(/javascript:lookup2/i) > -1) {
                    $(element).attr("onclick", $(element).attr("onclick") + ";return false;");
                }
            });
        }

        $("#MessageTableContainer button").unbind("click").bind("click", function(e) { e.preventDefault(); e.stopPropagation(); return false; });

        //ReSetTabPosition();
        AlignAddressBlock($);

        SetLookupWidth($);

        AssignHotkeysForCopyPastAspxPageValues($);

        setFCTGridAlignment($);

        if (typeof EliminateAutoComplete == "undefined" || !EliminateAutoComplete)
            DoAutoComplete($);

		$("#filterDiv img").css({"vertical-align":"middle"});
		$("#filterDiv input[isday=true]").css({"vertical-align":"middle"});

    });
})(jQuery);


function AlignAddressBlock($) {

    if (($.browser.msie && $.browser.version > 8) || ((!$.browser.msie) && $("table[id*='AddressBlock_AddressTable']").size())) {

        var addrBlock = $("table[id*='AddressBlock_AddressTable']");
        if (!addrBlock.size()) {
            return;
        }

        //find 2nd column width
        var firstRowLastColumnWidth = 0;
        var firstRow = addrBlock.parent().parent().parent().prev(); // Find Previous Row
        if (!firstRow.size()) {
            //alert("No Previous Row");
            // Find Next Row
            firstRow = addrBlock.parent().parent().parent().next();
            if (!firstRow.size()) {
                //alert("No Next Row");
                return;
            }
        }

        if (firstRow.children().size() == 1)
            return;

        //$("span[style*=width]", firstRow.parent()).css({ "display": "inline-block" });

        addrBlock.find("span").css({ "display": "inline-block", "white-space": "nowrap" });
        //addrBlock.css({ "table-layout": "" });        
        addrBlock.css("top", "");
        addrBlock.css({ "width": "" });

        var trfirstColumnWidth = 0;
        var tableWidth = 0;
        var trFirstColumn;
        $("td", firstRow).each(function(ind, td) {
            if (ind == 0) {

                trFirstColumn = $(td);

                if ($(td).attr("style")) {
                    trfirstColumnWidth = parseInt(getStylePropertyValue($(td), "width").replace("px", ""));
                } else {
                    trfirstColumnWidth = trFirstColumn.width();
                }

                
                // trfirstColumnWidth = trFirstColumn.width();
                //                var tdWidth;
                //                if ($(td).attr("style")) {
                //                    tdWidth = parseInt(getStylePropertyValue($(td), "width").replace("px", ""));
                //                } else {
                //                    tdWidth = trfirstColumnWidth;
                //                }
                //                if (tdWidth > trfirstColumnWidth)
                //                    trfirstColumnWidth = tdWidth;
                //                if ($(td).find(":first-child").size()) {
                //                    var lblWidth = $(td).find(":first-child").width();
                //                    if (lblWidth > trfirstColumnWidth)
                //                        trfirstColumnWidth = lblWidth;
                //                }
                
            } else {
                if ($(td).attr("style")) {
                    tableWidth = parseInt(getStylePropertyValue($(td), "width").replace("px", ""));
                } else {
                    tableWidth = tableWidth + $(td).width();
                }
                
            }
        });

        var firstColGroupWidth = 0;
        var thirdColGroupWidth = 0;

        if ($("colgroup", addrBlock).size() == 0) {
            var addrBlockTBody = $("tbody", addrBlock);
            //var addrFirstRow = addrBlock.find("tr:eq(0)");

            var colGroup1 = $("<colgroup />");
            var col1 = $("<col/>");
            col1.attr("width", trfirstColumnWidth);
            //addrFirstRow.find("td:eq(0)").width(trfirstColumnWidth);
            colGroup1.append(col1);

            var colGroup2 = $("<colgroup />");
            var col2 = $("<col/>");
            //find 2nd col width
            var secondColWidth = 0;
            $("tr", addrBlock).each(function(ind, tr) {
                var tdCount = 0;
                var hasColSpan = false;
                $("td", tr).each(function(ind, td) {
                    if ($(td).attr("colspan"))
                        hasColSpan = true;
                });
                if (!hasColSpan) {
                    var el = $(tr).find("td:eq(1)");
                    secondColWidth = el.find(":first-child").innerWidth();
                }
            });
            //addrFirstRow.find("td:eq(1)").width(secondColWidth);						
            col2.attr("width", secondColWidth + 2);
            colGroup2.append(col2);

            var colGroup3 = $("<colgroup />");
            var col3 = $("<col/>");
            //col3.attr("width", (addrBlock.width() - trfirstColumnWidth - secondColWidth));
            colGroup3.append(col3);

            colGroup1.insertBefore(addrBlockTBody);
            colGroup2.insertBefore(addrBlockTBody);
            colGroup3.insertBefore(addrBlockTBody);

        } else {
            $("colgroup", addrBlock).each(function(ind, colGroup) {
                if ($(colGroup).prev().size()) {
                    //find empty tbody after colgroup
                    if ($(colGroup).prev()[0].nodeName.toLowerCase() == "tbody") {
                        var tbody = $(colGroup).prev();
                        if (tbody.find("tr").length == 1 && tbody.find("tr td").is(":empty")) {
                            tbody.remove();
                        }
                    }
                    if (ind == 0) {
                        firstColGroupWidth = parseInt($(colGroup).find("col:eq(0)").attr("width").replace("px", ""));
                        //$(colGroup).find("col:eq(0)").attr("width", trfirstColumnWidth);
                        if (firstColGroupWidth < trfirstColumnWidth) {
                            $(colGroup).find("col:eq(0)").attr("width", trfirstColumnWidth);
                        } else {
                            trfirstColumnWidth = firstColGroupWidth;
                        }
                    }
                    else if (ind == 1) {
                        secondColGroupWidth = parseInt($(colGroup).find("col:eq(0)").attr("width"));
                    } else if (ind == 2) {
                        thirdColGroupWidth = parseInt($(colGroup).find("col:eq(0)").attr("width").replace("px", ""));
                        //$(colGroup).find("col:eq(0)").attr("width", tableWidth - firstColGroupWidth + 2);
                        //$(colGroup).find("col:eq(0)").attr("width", thirdColGroupWidth - (trfirstColumnWidth - firstColGroupWidth));
                        $(colGroup).find("col:eq(0)").removeAttr("width");
                    }
                }
            });
        }

        if (trFirstColumn) {
            trFirstColumn.width(trfirstColumnWidth - 1);
        }
        //remove empty td
        //        $("tr", addrBlock).each(function(ind, tr) {
        //            for (var i = 0; i < $(tr).find("td").length; i++) {
        //                if ($(tr).find("td:eq(" + i + ")").is(":empty")) {
        //                    $(tr).find("td:eq(" + i + ")").remove();
        //                }
        //            }
        //        });
    }
    
    if ($.browser.msie && $.browser.version <= 9) {
    	    	
    	var topPixels, leftPixels = 0;
    	topPixels = $('#AddressBlock_AddressContainer').css('top');
    	leftPixels = $('#AddressBlock_AddressContainer').css('left');
    	if (topPixels == 'auto' || topPixels == undefined) {
    		topPixels = '0px';
    		}
    	if (leftPixels == 'auto' || leftPixels == undefined) {
    		leftPixels = '0px';
    	}
    	topPixels = topPixels.replace('px','');
    	leftPixels = leftPixels.replace('px','');
    	if ($.browser.version < 9) {
    			$('#AddressBlock_AddressContainer').css('top',topPixels - 4)	
    			$('#AddressBlock_AddressContainer').css('left',leftPixels - 2)
    	}
    	else {
    		if ($.browser.version == 9) {
    			$('#AddressBlock_AddressContainer').css('top',topPixels - 1)
    		}
    	}
    }
}


function getStylePropertyValue(objElement, attrName) {
    var styAttArry = objElement.attr("style").split(";");
    var styAttValue = "";
    attrName = attrName.toLowerCase();
    for (var i = 0; i < styAttArry.length; i++) {
        if (styAttArry[i].toLowerCase().indexOf(attrName) > -1) {
            styAttValue = trim(styAttArry[i].split(":")[1]);
        }
    }
    return styAttValue;
}

function SetLookupWidth($) {
    $("a[id*='_LookupLink']").each(function(index, element) {

        var obj = $(element);
        if (obj.length > 0 && obj.parent().children().size() > 1 && obj.parent()[0].nodeName.toUpperCase() == "TD") {
            var td = $("<td/>");
            var parentTD = obj.parent();
            var colspan = parseInt(obj.parent().attr("colspan"));
            if (colspan > 1) {
                obj.parent().attr("colspan", colspan - 1);
            }
            //obj.parents("tr:first").prepend(td);
            td.insertBefore(parentTD);
            obj.appendTo(td);
        }
    });

    $("input[islookup='True']").each(function(index, element) {
        if ($(element).attr("type") == "hidden") {
            var obj = $(element).parent().find("span:first");
            if (obj.length > 0 && obj.parent().children().size() > 1 && obj.parent().children("input").size() == 1 && obj.parent()[0].nodeName.toUpperCase() == "TD") {
                var parentTD = obj.parent();
                var td = $("<td/>");
                var colspan = parseInt(obj.parent().attr("colspan"));
                if (colspan > 1) {
                    obj.parent().attr("colspan", colspan - 1);
                }
                //obj.parents("tr:first").prepend(td);
                td.insertBefore(parentTD);
                obj.appendTo(td);
            }
        }
    });
}
function DoAutoComplete($) {

    if (typeof $.fn.autocomplete == 'undefined') {
        $.getJsScript("jquery-ui.js", function(data) { //load jquery-ui.js if autocomplete is not defined
            DoAutoComplete($);
        }, true);
        return;
    }

    autocompleteSettings = {
        minLength: 2,
        delay: 500,
        focus: function() {
            // prevent value inserted on focus
            return false;
        },
        select: function(event, ui) {
            var isMultiSelect = false;
            if ($(this).attr("multiselect"))
                isMultiSelect = $(this).attr("multiselect") == "true";

            if (!isMultiSelect) {
                this.value = trim(ui.item.value);
                return false;
            }

            var terms = split(this.value);
            // remove the current input
            terms.pop();
            // add the selected item
            terms.push(trim(ui.item.value));
            // add placeholder to get the comma-and-space at the end
            terms.push("");
            this.value = terms.join("^");
            return false;
        },
        open: function() {
            $(this).autocomplete('widget').css({
                'z-index': 9999,
                'width': '',
                'white-space': 'nowrap'
            });
            return false;
        }
    }

    //if (!$.browser.mozilla) {
    autocompleteSettings = $.extend(autocompleteSettings, {
        change: function(event, ui) {
            if (ui.item) {
                var input = event.srcElement || event.target;
                $(input).trigger("change");
            }
        }
    });
    //}

    var myCustomBeforeunloadListener = document.body.onbeforeunload;

    DoAutocompleteForiDataAspPages($);

    DoAutoCompleteForLookupAspxPages($);

    // IE9 blank screen 
    if ($.browser.msie || ($.browser.msie && $.browser.version == 9)) {
        $("ul.ui-autocomplete").addClass("ui-autocomplete-ie9-fix");
    }
    var autoCompleteSelector = "input[lookupurl], input[lookupClass]";

    $(autoCompleteSelector).not("input.ui-autocomplete-input").bind("keydown", function(event) {
        if ($(this).data("autocomplete") && event.keyCode === $.ui.keyCode.TAB && $(this).data("autocomplete").menu.active) {
            event.preventDefault();
        }
    });

    $(autoCompleteSelector).each(function(ind, lookupTextbox) {
        //handle Lookup Textbox onChange Event

        var fnOnChange = lookupTextbox.onchange;
        lookupTextbox.onchange = null;
        $(lookupTextbox).unbind("change");

        var fnOnChangeNew = function(event) {

            var that = this;

            //var that = e.target;
            var data = $.data(that); //Get plugin data for 'this'
            if (data.autocomplete.menu.active) {
                data.autocomplete.menu.active.find('a').trigger('click');
            }

            var txtVal = trim($(that).val());

            //remove "^" sign at the end of string
            if (txtVal != "" && txtVal.substr(txtVal.length - 1) == "^") txtVal = txtVal.substr(0, txtVal.length - 1);

            $(this).val(txtVal);

            if (that.myOnChangefnOn) that.myOnChangefnOn(event);

            if ($(this).attr("DescFieldName")) {

                var descFieldId = $(that).attr("DescFieldName");

                if (document.all(descFieldId) && data.autocomplete.selectedItem) {
                    if (document.all(descFieldId).nodeName == "SPAN")
                        document.all(descFieldId).innerHTML = (txtVal.indexOf("^") > -1 ? "" : data.autocomplete.selectedItem.desc);
                    else if (document.all(descFieldId).nodeName == "INPUT")
                        document.all(descFieldId).value = (txtVal.indexOf("^") > -1 ? "" : data.autocomplete.selectedItem.desc);
                }
                else if (document.all(descFieldId)) {
                    if (document.all(descFieldId).nodeName == "SPAN")
                        document.all(descFieldId).innerHTML = "";
                    else if (document.all(descFieldId).nodeName == "INPUT")
                        document.all(descFieldId).value = "";
                }
            }

            if ($(that).attr("doOnChange")) {
                eval($(that).attr("doOnChange")); //manually trigger onchange event
            }

            // If there's a ^ character, then exit.
            if (txtVal.indexOf("^") > -1) { return; }

            if ($(that).attr("lookupClass")) {
                ValidateLookupCode($(this), __bind(function() {
                    if ($(that).attr("lookupOnSelectFunction")) {
                        eval($(that).attr("lookupOnSelectFunction"))
                    }
                }, that));
            }

        }

        lookupTextbox.onchange = fnOnChangeNew;
        lookupTextbox.myOnChangefnOn = fnOnChange;
    });

    if (typeof ProgressbarHide !== "undefined") ProgressbarHide();

    document.body.onbeforeunload = myCustomBeforeunloadListener;
}

// do autocomplete for all iData.asp lookuplist links textboxes
function DoAutocompleteForiDataAspPages($) {

    //find out anchor tag lookuplist textboxes which haven't attribute lookupurl from lookuplist links
    $("a[href]").filter(function () {
        return this.href.search(/javascript.listwindow/i) > -1;
    }).each(function (ind, element) {

        var lookupurl = this.href.replace(/javascript:listwindow/i, "").replace("('", "").replace("')", "");
        if (lookupurl.search(/field=/i) > -1) {
            //lookupurl = lookupurl.substr(lookupurl.toLowerCase().indexOf("?") + 1);
            lookupurl = lookupurl.substring(0, lookupurl.indexOf("'"));

            var lookupControlID = GetToken("field", lookupurl);
            var MultiSelect = GetToken("Multiple", lookupurl);
            var lookupControl = document.all(lookupControlID);

            if (lookupControl) {
                lookupControl = $(lookupControl);
                lookupControl.attr("lookupurl", lookupurl);
                lookupControl.attr("multiselect", MultiSelect == "True" || MultiSelect == "-1" ? "true" : "false");
                lookupControl.attr("DescFieldName", "DESC" + lookupControlID); //to display discription
            }
        }
    });

    //find out button lookuplist textboxes which haven't attribute lookupurl from lookuplist links
    $("button[onclick]").filter(function () {
        return $(this).attr("onclick").search(/javascript.listwindow/i) > -1;
    }).each(function (ind, element) {

        $(this).click(function (e) { e.preventDefault(); });

        var lookupurl = $(this).attr("onclick").replace(/javascript:listwindow/i, "").replace("('", "").replace("')", "");
        if (lookupurl.search(/field=/i) > -1) {
            //lookupurl = lookupurl.substr(lookupurl.toLowerCase().indexOf("?") + 1);
            lookupurl = lookupurl.substring(0, lookupurl.indexOf("'"));

            var lookupControlID = GetToken("field", lookupurl);
            var MultiSelect = GetToken("Multiple", lookupurl);
            var lookupControl = document.all(lookupControlID);

            if (lookupControl) {
                lookupControl = $(lookupControl);
                lookupControl.attr("lookupurl", lookupurl);
                lookupControl.attr("multiselect", MultiSelect == "True" || MultiSelect == "-1" ? "true" : "false");
                lookupControl.attr("DescFieldName", "DESC" + lookupControlID); //to display discription
            }
        }
    });

    //do for filter textboxes
    var settings = {
        source: function (request, response) {
            var hdnInpTextBox = $(this.element);
            var formSubmit = $("form[name=filter]");
            var term;
            if ($(this.element).attr("multiselect") == "true") {
                term = split(request.term);
                term = term.pop();
            } else term = request.term;

            //if term is empty or "^" or same as previous then return back
            //if (!term || term == "^" || term == this.previous) { response(null); return; };
            if (!term || term == "^" ) { response(null); return; };

            var additionalParams;
            additionalParams = DoLookupListAutoCompleteUrl(hdnInpTextBox.attr("lookupurl"), hdnInpTextBox.attr("name"));
            additionalParams = hdnInpTextBox.attr("lookupurl").search("select=") == -1 ? "&select=" + ($("input[name=select]").val() != undefined ? $("input[name=select]").val() : "") : "";
            additionalParams += "&search=" + term + "&bAutoFilter=1" + GetAutoCompleteSvalue(hdnInpTextBox.attr("lookupurl"), hdnInpTextBox.attr("name"));

            $.ajax({
                type: 'POST',
                url: $(this.element).attr("lookupurl") + additionalParams,
                data: null,
                success: function (data) {

                    if (data.result.length) {
                        response($.map(data.result, function (item) {
                            return {
                                label: trim(item.code) + (item.desc != null && item.desc.length > 0 ? ' (' + trim(item.desc) + ')' : ''),
                                value: trim(item.code),
                                desc: item.desc
                            }
                        }));
                    } else {
                        //search by desc if seach by code has no result
                        $.ajax({
                            type: 'POST',
                            url: hdnInpTextBox.attr("lookupurl") + additionalParams.replace("&search=", "&search2="),
                            data: null,
                            success: function (data) {
                                response($.map(data.result, function (item) {
                                    return {
                                        label: trim(item.code) + (item.desc != null && item.desc.length > 0 ? ' (' + trim(item.desc) + ')' : ''),
                                        value: trim(item.code),
                                        desc: item.desc
                                    }
                                }));
                            },
                            dataType: "json"
                        });
                    }
                },
                dataType: "json"
            });
        }
    };

    settings = $.extend(settings, autocompleteSettings);
    $("input[lookupurl]").not(".ui-autocomplete-input").autocomplete(settings);
}


function GetAutoCompleteSvalue(url, fieldname) {
    var newWindow;
    var ii = 0;
    var sValue = "";
    var ss = "";

    /* do "URLenocding" of plus (+) sign that the JavaScript function escape() neglects.
    This becomes a problem if the select statement passed contains a plus sign */
    var re = new RegExp("\\+", "g");
    url = url.replace(re, '%2B');

    var ij = document.forms[0].elements.length;
    if (ij > 200) { ij = 200 }
    var bChangedSave = 0;
    //if the field is disabled don't show the list
    if (document.forms[0].elements[fieldname].disabled) { return }
    s1 = GetToken("Parent1", url)
    s2 = GetToken("Parent2", url)
    s3 = GetToken("Parent3", url)
    s4 = GetToken("Parent4", url)
    s5 = GetToken("Parent1Handle", url)
    s6 = GetToken("Parent2Handle", url)
    s7 = "select"

    if (typeof (document.forms[0].elements["BSAVE"]) != "undefined") {
        if (document.forms[0].elements["BSAVE"].value == "0") {
            bChangedSave = 1
            document.forms[0].elements["BSAVE"].value == "1"
        }
    }

    //note that we don't send values with a #, because the DLL won't get anything after the first #!
    //we just send the first 250 chars, then we'll also send special Parentx tokens
    //don't send Parentx tokens in for loop

    for (ii = 0; ii < ij; ii++) {
        if (typeof (document.forms[0].elements["select"]) != "undefined") {
            if (document.forms[0].elements[ii].value != "" && document.forms[0].elements[ii].value.length < 60 && document.forms[0].elements[ii].value.indexOf("#") == -1) {
                var sElementName
                sElementName = document.forms[0].elements[ii].name
                if (sElementName != "" && sElementName != s1 && sElementName != s2 && sElementName != s3 && sElementName != s4
			&& sElementName != s5 && sElementName != s6 && sElementName != s7) {
                   
                    /* see encoding below */
                    var tagName
                    tagName = document.forms[0].elements[ii].tagName
                    if (tagName != null) tagName = tagName.toUpperCase();
                    if (tagName == "INPUT" || tagName == "SELECT") {
                        sValue = sValue + "&" + sElementName + "=" + document.forms[0].elements[ii].value;
                    }
                }
            }
        }
        if (sValue.length > 250) { break }
    }


    url = url + sValue;
    //get special parent tags
    var parentTags = ""
    if (s1 != null) { parentTags = parentTags + "&" + s1 + "=" + document.forms[0].elements[s1].value; }
    if (s2 != null) { parentTags = parentTags + "&" + s2 + "=" + document.forms[0].elements[s2].value; }
    if (s3 != null) { parentTags = parentTags + "&" + s3 + "=" + document.forms[0].elements[s3].value; }
    if (s4 != null) { parentTags = parentTags + "&" + s4 + "=" + document.forms[0].elements[s4].value; }
    if (s5 != null) { parentTags = parentTags + "&" + s5 + "=" + document.forms[0].elements[s5].value; }
    if (s6 != null) { parentTags = parentTags + "&" + s6 + "=" + document.forms[0].elements[s6].value; }
    if (parentTags != "") {
        url = url + parentTags
    }

    if (typeof (document.forms[0].elements["select"]) != "undefined") {
        var sSelect = document.forms[0].elements["select"].value
        url = url + "&select=" + sSelect;
    }

    url = url + '&data=' + document.forms[0].elements[fieldname].value;
    var i = url.indexOf("?")
    if (i > 0) {
        var p1, p2
        p1 = url.substring(0, i + 1)
        p2 = url.substr(i + 1)
        re.compile("\\<", "g")
        p2 = p2.replace(re, '')
        re.compile("\\>", "g")
        p2 = p2.replace(re, '')
        url = p1 + encodeURI(p2)
    }

    if (bChangedSave == 1) {
        document.forms[0].elements["BSAVE"].value == "0"
    }

    return sValue + parentTags;
}
    

// do autocomplete for all lookup.aspx lookuplist links textboxes
function DoAutoCompleteForLookupAspxPages($) {

    //find out all lookup links which call listWindow('Lookup.aspx?') page 
    // find out nearest textbox and add lookupClass attribute with assemblyname and classname
    $("a[href]").filter(function() {
        return this.href.search(/javascript:listwindow\(lookup.aspx\?assemblyname/i) > -1;
    }).each(function(ind, element) {
        //if ($(element).attr("href") != null && typeof $(element).attr("href") != "undefined" && $(element).attr("href").search(/lookup.aspx\?assemblyname/i) > -1) {
        var href = $(element).attr("href").replace(/javascript:listwindow/i, "").replace("('", "").replace("')", "");
        href = href.substring(12, href.indexOf("'"));

        var AssemblyName = GetToken("AssemblyName", href);
        var ClassName = GetToken("ClassName", href);
        var AttribNameId = GetToken("AttribNameId", href);
        var MultiSelect = GetToken("Multiple", href);
        var field = GetToken("field", href);

        var inp = $("input[name='" + field + "']"); //$(element).parent().parent().find(".INP");
        inp.attr("lookupClass", AssemblyName + encodeURI('#') + ClassName);
        inp.attr("AttribNameId", AttribNameId);
        inp.attr("multiselect", MultiSelect == "True" || MultiSelect == "-1" ? "true" : "false");
        inp.attr("DescFieldName", "DESC" + field); //to display discription
        //}
        //            else if ($(element).attr("href").search("JAVASCRIPT:Lookup2") > -1) {
        //                $(element).attr("href", $(element).attr("href").replace("JAVASCRIPT:Lookup2","javascript:return Lookup2"));
        //            }            
    });

    //assign title for lookup list dialogbox
    $("a[href]").filter(function() {
        return this.href.search(/javascript:lookup2/i) > -1;
    }).each(function(index, element) {
        var args = this.href.split(',');
        if (args.length > 2) {
            var codeTargetID = $.trim(decodeURI(args[2].replace(/%20'/g, "").replace(/'/g, "").replace(/%/g, "")));
            var descTargetID = $.trim(decodeURI(args[3].replace(/%20'/g, "").replace(/'/g, "").replace(/%/g, "")));
            var MultiSelect = $.trim(decodeURI(args[4].replace(/%20'/g, "").replace(/'/g, "").replace(/\)/g, "").replace(/%/g, "")));
            MultiSelect = MultiSelect == "True" || MultiSelect == "-1" ? "true" : "false";

            if (codeTargetID.search(" ") > -1) {
                $("input[id*='" + codeTargetID.substr(0, codeTargetID.indexOf(" ")) + "']").attr("LLTitle", $(this).text()).attr("DescFieldName", descTargetID).attr("multiselect", MultiSelect);
            } else {
                $("#" + codeTargetID).attr("LLTitle", $(this).text()).attr("DescFieldName", descTargetID).attr("multiselect", MultiSelect);
            }
        }
    });

    //do for lookup list control
    var settings = {
        source: function(request, response) {
            var hdnInpTextBox = $(this.element);
            // delegate back to autocomplete, but extract the last term                    
            var term;
            if ($(this.element).attr("multiselect") == "true") {
                term = split(request.term);
                term = term.pop();
            } else term = request.term;

            //if term is empty or "^" or same as previous then return back
            //if (!term || term == "^" || term == this.previous) { response(null); return; }
            if (!term || term == "^" ) { response(null); return; }
            //term = encodeURI(term);

            var additionalParams = "";
            if (hdnInpTextBox.attr("AttribNameId")) additionalParams = "&AttribNameId=" + hdnInpTextBox.attr("AttribNameId");
            //if (hdnInpTextBox.attr("urlParams")) additionalParams += hdnInpTextBox.attr("urlParams");

            var searchParameter = "LookupGrid:txtHeader0=" + encodeURI(term);
            var LookupDefaultCaption = "";
            var re = new RegExp("YSI\\.(\\w+)\\#YSI\\.(.+)\\.Lookups\\.", "i");
            var LookupClassName = hdnInpTextBox.attr("lookupClass") ? hdnInpTextBox.attr("lookupClass") : "";
            var m = re.exec(LookupClassName);
            if (m) {
                LookupDefaultCaption = getLookupDefaultCaptionFromLookupClassName(LookupClassName);
                searchParameter += "&Lookup" + LookupDefaultCaption + ":txtCode:textbox=" + encodeURI(term);
            }

            searchParameter += getParentsAndThereTypes(hdnInpTextBox[0]); //get myParents And myParentTypes attribute value
	
            $.ajax({
                type: 'GET',
                url: "lookuplist.ashx?lookupClass=" + escape(hdnInpTextBox.attr("lookupClass")) + "&" + searchParameter + "&handlertype=autocomplete" + additionalParams,
                data: {
                    maxRows: 10
                },
                success: function(data) {              	
                    if (data.length > 0) {//search by code
                        response($.map(data, function(item) {
                            var myCode, myDesc, mylabel, myValue;
                            var i = 0;
                            for (var prop in item) {
                                if (prop != undefined && prop != null) {
                                    if ((prop.indexOf("code") != -1 || i == 0) && !myCode) myCode = trim(item[prop]);
                                    else if ((prop.indexOf("desc") != -1 || prop.indexOf("name") != -1 || i == 1) && !myDesc) myDesc = !isValidInteger(item[prop]) ? trim(item[prop]) : item[prop];
                                    i++;
                                }
                            }
                         
                            //if (isValidInteger(myCode)) {
                            //  var temp = myDesc;
                            //  myDesc = myCode;
                            //  myCode = temp;
                            //}
                            mylabel = trim(myCode) + (myDesc != null && !isValidInteger(myDesc) && myDesc.length > 1 ? " (" + trim(myDesc) + ")" : "");
                            myValue = trim(myCode);
                            return {
                                label: mylabel,
                                value: myValue,
                                desc: myDesc
                            }
                        }));
                    } else {//search by description or name
                        searchParameter = "Lookup" + LookupDefaultCaption + ":txtDescription:textbox=" + encodeURI(term);
                        searchParameter += "&Lookup" + LookupDefaultCaption + ":txtName:textbox=" + encodeURI(term);
                        searchParameter += "&LookupGrid:txtHeader1=" + encodeURI(term);
                        searchParameter += getParentsAndThereTypes(hdnInpTextBox[0]);
												
                        $.ajax({
                            type: 'GET',
                            url: "lookuplist.ashx?lookupClass=" + escape(hdnInpTextBox.attr("lookupClass")) + "&handlertype=autocomplete" + additionalParams  + "&" + searchParameter,
                            data: {
                                maxRows: 10
                            },
                            success: function(data) {
													
                                response($.map(data, function(item) {
                                    var myCode, myDesc, mylabel, myValue;
                                    var i = 0;
                                    for (var prop in item) {
                                        if (prop != undefined && prop != null) {
                                            if ((prop.indexOf("code") != -1 || i == 0) && !myCode) myCode = trim(item[prop]);
                                            else if ((prop.indexOf("desc") != -1 || prop.indexOf("name") != -1 || i == 1) && !myDesc) myDesc = !isValidInteger(item[prop]) ? trim(item[prop]) : item[prop];
                                            i++;
                                        }
                                    }
                                    //if (isValidInteger(myCode)) {
                                    //  var temp = myDesc;
                                    //  myDesc = myCode;
                                    //  myCode = temp;
                                    //}
                                    mylabel = trim(myCode) + (myDesc != null && !isValidInteger(myDesc) && myDesc.length > 1 ? " (" + trim(myDesc) + ")" : "");
                                    myValue = trim(myCode);
                                    return {
                                        label: mylabel,
                                        value: myValue,
                                        desc: myDesc
                                    }
                                }));

                            },
                            dataType: "json"
                        });
                    }
                },
                dataType: "json"
            });
        }
    };

    settings = $.extend(settings, autocompleteSettings);
    $("input[lookupClass]").not(".FINP, .ui-autocomplete-input").autocomplete(settings);
}

function getParentsAndThereTypes(obj) {
    var params = "";
    if (obj.getAttribute("myParents")) {
        var parentsArray = obj.getAttribute("myParents").split("^")
        var parentTypesArray = obj.getAttribute("myParentTypes").split("^")
        for (var i = 0; i < parentsArray.length - 1; i++) {
            // If the parent is a <td>, we need to get the value from .innerText,
            // if it's a <input>, we need .value.
            var myObj = document.all(parentsArray[i]);
            if (!myObj)
                myObj = document.all(parentsArray[i].replace(":", "$"));
            if (myObj) {
                if (typeof myObj.innerText != "undefined") {
                    if (myObj.innerText != "") { s = myObj.innerText }
                    else { s = myObj.value };
                } else if (typeof myObj.textContent != "undefined") {
                    if (myObj.textContent != "") { s = myObj.textContent }
                    else { s = myObj.value };
                }
                params += "&" + parentTypesArray[i] + "=" + encodeURIComponent(s)
            }
        }
    }
    return params;
}

function getLookupDefaultCaptionFromLookupClassName(LookupID) {
    var re = new RegExp("YSI\\.(\\w+)\\#YSI\\.(.+)\\.Lookups\\.", "i");
    m = re.exec(LookupID);
    if (m) {
        var re = new RegExp("YSI\\.(\\w+)\\#YSI\\.(.+)\\.Lookups\\.(.*lookup$)", "i");
        var m = re.exec(LookupID);
        if (m) {
            LookupID = m[3].replace("ysi", "").replace(/orlist/i, "").replace(/lookup/i, "");
            switch (LookupID.toLowerCase()) {
                case "account":
                    LookupID = "AccountType";
                    break;
                case "persontenant":
                    LookupID = "person";
                    break;
                case "icitemtype":
                    LookupID = "ItemType";
                    break;
            }
            if (LookupID.toLowerCase().indexOf("property") > -1) {
                LookupID = "Property";
            }
        } else {
            re = new RegExp("YSI\\.(\\w+)\\#YSI\\.(.+)\\.Lookups\\.", "i");
            LookupID = LookupID.replace(re, "").replace("ysi", "");
            switch (LookupID.toLowerCase()) {
                case "currentnoticetenant":
                    LookupID = "Tenant";
                    break;
            }
        }
    }
    return LookupID;
}

var lookupXmlHTTP;
function ValidateLookupCode(lookup, fnCallBack) {
    var cookies = escape(document.cookie);
    var searchValue = encodeURIComponent(lookup.val().trim());
    if (searchValue == "") { return }
    // If there's a ^ character, then exit.
    if (searchValue.indexOf("%5E") >= 0) { return }
    var lookupClass = lookup.attr("lookupClass");

    var ParentsURL = ""
    // If any parents are supplied, add them to the ParentsURL.  Ignore
    // errors here because there might not be any.
    try {
        var parentsArray = lookup.attr("myParents").split("^")
        var parentTypesArray = lookup.attr("myParentTypes").split("^")
        for (var i = 0; i < parentsArray.length - 1; i++) {
            // If the parent is a <td>, we need to get the value from .innerText,
            // if it's a <input>, we need .value.
            if (document.all(parentsArray[i]).innerHTML != "") { s = document.all(parentsArray[i]).innerHTML }
            else { s = document.all(parentsArray[i]).value }
            ParentsURL += "&" + parentTypesArray[i] + "=" + s
        }
    }
    catch (any) { }
    ParentsURL = escape(ParentsURL)

    var xmldoc;
    var dom = getActiveXObject("Msxml2.DOMDocument");
    var s = SoapHeader()
    s += "<GetLookupValues xmlns=\"YSI.WebServices.SysLookupUtils\">"
    s += "<Cookies>" + cookies + "</Cookies>"
    s += "<SearchValue>" + searchValue + "</SearchValue>"
    s += "<LookupClass>" + lookupClass + "</LookupClass>"
    s += "<ParentsURL>" + ParentsURL + "</ParentsURL>"
    s += "</GetLookupValues>"
    s += "</soap:Body>"
    s += "</soap:Envelope>"
    if (BrowserDetect.browser == "MSIE") dom.loadXML(s); else xmldoc = loadXMLString(s);

    lookupXmlHTTP = getActiveXObject("Msxml2.XMLHTTP");
    if (BrowserDetect.browser == "MSIE")
        lookupXmlHTTP.Open("Post", WebServiceURL2("SysLookupUtils.asmx"), true);
    else
        lookupXmlHTTP.open("Post", WebServiceURL2("SysLookupUtils.asmx"), true);
    lookupXmlHTTP.setRequestHeader("SOAPAction", "YSI.WebServices.SysLookupUtils/GetLookupValues");
    lookupXmlHTTP.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    lookupXmlHTTP.onreadystatechange = __bind(Lookup_onChange_ready, [lookup, fnCallBack]);
    if (BrowserDetect.browser == "MSIE") lookupXmlHTTP.Send(dom.xml); else lookupXmlHTTP.send(xmldoc);
}

function Lookup_onChange_ready() {
    lookup = this[0];
    fnCallBack = this[1];

    if (lookupXmlHTTP.readyState == 4) {
        var objXml = getActiveXObject("Msxml2.DomDocument");
        if (!objXml) { return; }
        objXml = lookupXmlHTTP.responseXML
        if (objXml && objXml.xml == "") { return; }

        try {
            if (lookup == null) { return }

            var noMatch = false
            if (objXml.getElementsByTagName("ExactMatch").length == 1) { fnCallBack(); }
            else if (objXml.getElementsByTagName("NoMatch").length == 1) { lookup.val("(invalid)"); }
            else { alert("Invalid Code"); }

        }
        catch (any) { }
    }
}

/*****************************************************************************************************************/
// common variables
var $jQuery = typeof jQuery != "undefined" ? jQuery.noConflict() : null;
var jDialogBox = null;
var jTabs = null;
var showSearchResultBtn;
var pageName;

var pinUnpinBtn;
var webShareName;

function AddTab(data, ajaxSettings) {

    $jQuery = (typeof $jQuery == "undefined" || typeof $jQuery == null) && typeof jQuery != "undefined" ? jQuery.noConflict() : $jQuery;

    webShareName = jQuery('input#WEBSHARENAME').val();

    if (jTabs == null) {
        //create a dialog box
        jDialogBox = $jQuery(".dialogbox");
        jDialogBox.css("min-height", "355");
        jDialogBox.resizable({
            minWidth: 450, minHeight: 360,
            start: function (event, ui) {
                var d = $jQuery('<div class="iframeCover" style="z-index:99; position:absolute; width:100%; top:0px; left:0px;height:' + $jQuery(window).height() + 'px"></div>');
                $jQuery("body").append(d);
            },
            stop: function (event, ui) {
                $jQuery('div.iframeCover').remove();
            },
            resize: function (event, ui) {
                jTabs.height(jDialogBox.height() - 5);
                adjustColumnSizing();
                tabHeight = jQuery('.tabs').css('height').replace(/[^\d.]/g, '');
                tabHeight = parseInt(tabHeight);
                jQuery('.dataTables_scrollBody').css('height', jDialogBox.height() - tabHeight - 170);
            }
        }).draggable({ containment: "window", iframeFix: true, handle: "ul.ui-draggable", cancel: "ul.ui-draggable li" });

        //add tab div
        jTabs = $jQuery("<div id='tabs' style='width: 100%; z-index: 1004; min-height: 354px;'><ul class='tabs ui-draggable'></ul></div>");
        $jQuery("ul.ui-draggable", jTabs).css("cursor", "move"); // On mouse over of dialog box header to indicates it is moveable.


        jDialogBox.append(jTabs);

        jTabs.tabs({
            collapsible: false,
            tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
            add: function (event, ui) {
                var selector = "span.ui-icon-close";
                $jQuery(selector, ui.tab.parentNode).css({ "float": "left", "margin": "0.4em 0.2em 0 0", "cursor": "pointer" });
                // close icon: removing the tab on click
                // note: closable tabs gonna be an option in the future - see http://dev.jqueryui.com/ticket/3924
                $jQuery(selector, ui.tab.parentNode).click(function () {
                    var index = $jQuery("li", jTabs).index($jQuery(this).parent());
                    var tabDivId = $jQuery(this).prev().attr("href");
                    $jQuery(tabDivId).find("table.display").remove();
                    jTabs.tabs("remove", index);
                    //check if last tab is closed in tabs then close dialogbox
                    if ($jQuery('ul.tabs li:visible', jTabs).length == 0) {
                        closeBtn.trigger("click");
                        showSearchResultBtn.hide();
                    }
                });
            },
            select: function (event, ui) { setTimeout(adjustColumnSizing, 1); }
        });



        //add Pin/Unpin button at right top corner
        if (sessionStorage.getItem(webShareName + '#PinDialogBox') == 'false') {
            pinUnpinBtn = $jQuery("<a href=\"javascript:void(0);\" class=\"ui-corner-all\" role=\"button\"><span id=\"pinUnpinIconDialogBox\" class=\"ui-icon ui-icon-pin-w\">pin</span></a>");
        }
        else {
            pinUnpinBtn = $jQuery("<a href=\"javascript:void(0);\" class=\"ui-corner-all\" role=\"button\"><span id=\"pinUnpinIconDialogBox\" class=\"ui-icon ui-icon-pin-s\">pin</span></a>");
        }

        pinUnpinBtn.css({ "right": "0", "margin": "0.4em 2.0em 0 0", "cursor": "pointer", zIndex: 1004, "padding": "7px 7px", "position": "absolute" });
        pinUnpinBtn.hover(function () { $jQuery(this).addClass("ui-state-hover"); }, function () { $jQuery(this).removeClass("ui-state-hover"); });
        pinUnpinBtn.click(function (e) {
            e.preventDefault();
            if (jQuery('#pinUnpinIconDialogBox').hasClass('ui-icon-pin-w')) {
                jQuery('#pinUnpinIconDialogBox').removeClass('ui-icon-pin-w').addClass('ui-icon-pin-s');
                sessionStorage.setItem(webShareName + '#PinDialogBox', 'true');
            }
            else {
                jQuery('#pinUnpinIconDialogBox').removeClass('ui-icon-pin-s').addClass('ui-icon-pin-w');
                sessionStorage.setItem(webShareName + '#PinDialogBox', 'false');
            }
        });


        //add Close button at right top corner
        var closeBtn = $jQuery("<a href=\"javascript:void(0);\" class=\"ui-corner-all\" role=\"button\"><span class=\"ui-icon ui-icon-closethick\">close</span></a>");
        closeBtn.css({ "right": "0", "margin": "0.4em 0.4em 0 0", "cursor": "pointer", zIndex: 1004, "padding": "7px 7px", "position": "absolute" });
        closeBtn.hover(function () { $jQuery(this).addClass("ui-state-hover"); }, function () { $jQuery(this).removeClass("ui-state-hover"); });
        closeBtn.click(function (e) {
            e.preventDefault();
            hide_search_dailogBox();
        });


        //add maximize button
        showSearchResultBtn = $jQuery("<a id=\"showSearchResultBtn\" href=\"javascript:void(0);\"></a>");
        showSearchResultBtn.click(function (e) {
            if (showSearchResultBtn.is(":visible")) {
                if (showSearchResultBtn.hasClass("icon-btn-expand")) {
                    show_search_dailogBox();
                } else {
                    hide_search_dailogBox();
                }
            }
        });

        jQuery("ul.tabs", jDialogBox).append(closeBtn).css({ "padding-right": "22px" });

        jQuery("ul.tabs", jDialogBox).append(pinUnpinBtn).css({ "padding-right": "22px" });

        $jQuery(".topicons").append($jQuery("<span>").append(showSearchResultBtn));

        //add draggable and resizable div on page body
        jDialogBox.css({
            "zIndex": 1003, top: $jQuery("#filter").position().top, right: "0px",
            left: parseFloat($jQuery(window).width() - $jQuery(".dialogbox").width() - 25) + "px"
        });

        jDialogBox.find(".ui-resizable-se").css({ zIndex: 1005 });

        //on escape hide div
        var handler = function (event) {
            if (event.keyCode == 27) {
                if (sessionStorage.getItem(webShareName + '#PinDialogBox') == 'false') {
                    hide_search_dailogBox();
                }
            }
        };

        $jQuery(document).on("keydown", handler);
        $jQuery("#filter")[0].contentWindow.onkeyup = handler;

        $jQuery("a.listlnk").live("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            doMenuClick(this.href);
            if (sessionStorage.getItem(webShareName + '#PinDialogBox') == 'false') {
                hide_search_dailogBox();
            }
        });
    }

    var tabTitle = data.TabTitle;

    if (IsTabExist(tabTitle)) {
        remove_tab(tabTitle);
    }

    var count = jTabs.attr("tabCount") ? parseInt(jTabs.attr("tabCount")) : 1;
    add_tab(count, tabTitle, data);
    AddRefreshButton(tabTitle, ajaxSettings);
    jTabs.attr("tabCount", count + 1)

    if (typeof data.columnset == "undefined") {
        //loading the first link in the filter
        LoadSearchResultFirstLink(data);
    }

    show_search_dailogBox();
    if (typeof data.SearchResult != "undefined" && data.SearchResult.length == 1 && ajaxSettings != false && ajaxSettings != "GlobalSearch") {
        setTimeout(function () {
            if (sessionStorage.getItem('#PinDialogBox') == 'false') {
                hide_search_dailogBox()
            }
        }, 1000);;
    }
};

//loading the first link in the filter
function LoadSearchResultFirstLink(data) {
    if (typeof data.SearchResult != "undefined" && data.SearchResult.length > 0) {
        doMenuClick("../" + data.iFrameUrl + data.SearchResult[0][1]);
    }
    else if (typeof data.SearchResult == "undefined" && typeof data.iFrameUrl != "undefined" && data.iFrameUrl) {
        //Default open page as Add a New Entry
        doMenuClick("../" + data.iFrameUrl);
    }
}

function IsTabExist(tabTitle) {
    var isExist = false;
    if (jTabs) {
        jTabs.find("UL.tabs li").each(function(ind, element) {
            if ($jQuery(this).find("a").html() == tabTitle) {
                isExist = true;
            }
        });
    }
    return isExist;
}

var add_tab = function(count, name, data) {

    jTabs.tabs("add", "#tabs-" + count, name);

    var searchResult = $jQuery("div#tabs-" + count, jTabs);

    var oTable = $jQuery("<table id='dataTable" + count + "' style='width: 100%' class='display'></table>");
    searchResult.append(oTable);

    jTabs.tabs("select", jTabs.find("UL.tabs li").length - 1);

    if (typeof data.SearchResult != "undefined" && data.SearchResult.length > 0) {
        for (var i = 0; i < data.SearchResult.length; i++) {
            var a = "";
            if (typeof data.columnset != "undefined") {
                //a = "<a href='" + data.iFrameUrl.replace(/#hmy#/g, data.SearchResult[i][0]) + "' class='listlnk' target='filter' >" + data.SearchResult[i][1] + "</a>";
                //a = "<a href='" + data.SearchResult[i][0] + "' class='listlnk' target='filter' >" + a + "</a>";
                //data.SearchResult[i][1] = a;
            } else {
                a = GetEllipsedString(data.SearchResult[i][0], 50);
                a = "<a href='" + "../" + data.iFrameUrl + data.SearchResult[i][1] + "' class='listlnk'  target='filter'  title='" + data.SearchResult[i][0] + "'>" + a + "</a>";
                data.SearchResult[i][0] = a;
            }
            for (var j = 2; j < data.SearchResult[i].length; j++) {
                data.SearchResult[i][j] = GetEllipsedString(data.SearchResult[i][j], 50);
            }
        }
    }

	var TranslatedCode = "Code"
	var CultureCookie = GetSubCookie("Culture", "LanguageCode")
	
	if (CultureCookie == "zh-CN") {
		TranslatedCode = "代码"
	}
	
    var aoColumns = [];
    if (typeof data.columnset != "undefined" && data.columnset.length > 0) {
        //columns for site search result
        aoColumns.push({
            "sTitle": "hmy",
            "sName": "hmy",
            "bVisible": false
        });
        for (var i = 0; i < data.columnset.length; i++) {
            var item = {
                "sTitle": data.columnset[i].sTitle,
                "sName": data.columnset[i].sName,
                "bSortable": data.columnset[i].bSortable,
                "bVisible": data.columnset[i].bVisible
            }
            aoColumns.push(item);
        }

    } else {
        //columns for search result by filter screen
        aoColumns.push({
            "sTitle": TranslatedCode,
            "sName": "",
            "bVisible": true
        });
        aoColumns.push({
            "sTitle": "hmy",
            "sName": "hmy",
            "bVisible": false
        });
    }

    var reDrawRowsPerPage = function() {
        tabHeight = jQuery('.tabs').css('height').replace ( /[^\d.]/g, '' );
        tabHeight = parseInt(tabHeight);
	jQuery('.dataTables_scrollBody').css('height', jDialogBox.height() -  tabHeight - 170);
    };

	var CultureCookie = GetSubCookie("Culture", "LanguageCode")
	
	if (CultureCookie == "de-DE") {
		var oTableSettings = {
			"sDom": '<"H"<"RBTN">lfr>t<"F"ip>',
			"aoColumns": aoColumns,
			"aaSorting": [], //no initial sorting
			"bJQueryUI": true,
			"sPaginationType": "full_numbers",
			"sScrollY": "152px",
			"bScrollCollapse": false,
			"fnDrawCallback": reDrawRowsPerPage,
			"iDisplayLength": 50,
			"oLanguage": {
				"sEmptyTable":   	"Keine Daten in der Tabelle vorhanden",
				"sInfo":         	"_START_ bis _END_ von _TOTAL_ Einträgen",
				"sInfoEmpty":    	"0 bis 0 von 0 Einträgen",
				"sInfoFiltered": 	"(gefiltert von _MAX_ Einträgen)",
				"sInfoPostFix":  	"",
				"sInfoThousands":  	".",
				"sLengthMenu":   	"_MENU_ Einträge anzeigen",
				"sLoadingRecords": 	"Wird geladen...",
				"sProcessing":   	"Bitte warten...",
				"sSearch":       	"Suchen",
				"sZeroRecords":  	"Keine Einträge vorhanden.",
				"oPaginate": {
					"sFirst":    	"Erste",
					"sPrevious": 	"Zurück",
					"sNext":     	"Nächste",
					"sLast":     	"Letzte"
				},
				"oAria": {
					"sSortAscending":  ": aktivieren, um Spalte aufsteigend zu sortieren",
					"sSortDescending": ": aktivieren, um Spalte absteigend zu sortieren"
				}	        	
			}
		}
	} 
	else if (CultureCookie == "zh-CN") {
		var oTableSettings = {
			"sDom": '<"H"<"RBTN">lfr>t<"F"ip>',
			"aoColumns": aoColumns,
			"aaSorting": [], //no initial sorting
			"bJQueryUI": true,
			"sPaginationType": "full_numbers",
			"sScrollY": "152px",
			"bScrollCollapse": false,
			"fnDrawCallback": reDrawRowsPerPage,
			"iDisplayLength": 50,
			"oLanguage": {
			"sProcessing":   "处理中...",
			"sLengthMenu":   "显示 _MENU_ 项结果",
			"sZeroRecords":  "没有匹配结果",
			"sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
			"sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
			"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
			"sInfoPostFix":  "",
			"sSearch":       "搜索:",
			"sUrl":          "",
			"sEmptyTable":     "表中数据为空",
			"sLoadingRecords": "载入中...",
			"sInfoThousands":  ",",
			"oPaginate": {
				"sFirst":    "首页",
				"sPrevious": "上页",
				"sNext":     "下页",
				"sLast":     "末页"
			},
			"oAria": {
				"sSortAscending":  ": 以升序排列此列",
				"sSortDescending": ": 以降序排列此列"
				}	        	
			}
		}
	} 
	else {	
		var oTableSettings = {
			"sDom": '<"H"<"RBTN">lfr>t<"F"ip>',
			"aoColumns": aoColumns,
			"aaSorting": [], //no initial sorting
			"bJQueryUI": true,
			"sPaginationType": "full_numbers",
			"sScrollY": "152px",
			"bScrollCollapse": false,
			"fnDrawCallback": reDrawRowsPerPage
		}
	};

	
		
    oTable.dataTable(oTableSettings);

    
    if (data.SearchResult) //Has search result?
        oTable.fnAddData(data.SearchResult);

    if (typeof data.columnset == "undefined") {
        adjustColumnSizing();
    }

};

var AddRefreshButton = function(name, ajaxSettings) {
    // Add Refresh Button to reload dataTable
    var refreshBtn = $jQuery("<button/>");
    refreshBtn.button({
        text: false,
        icons: {
            primary: "ui-icon-arrowrefresh-1-w"
        }
    }).css({ height: "2.3em" });


if (ajaxSettings !=  "GlobalSearch") 
				{
    ajaxSettings = $jQuery.extend(ajaxSettings, {
        type: 'POST',
        success: function(data) {
 
            if (typeof data == "string")
                data = $jQuery.evalJSON(data);
		            data.iFrameUrl = data.iFrameUrl.replace("../", "");
		            update_tab(name, data);
        }
    });
}
    refreshBtn.click(function(e) {
    	try {
		    	if (ajaxSettings ==  "GlobalSearch") 
						{
							GlobalSearch($jQuery("#txtSiteSearch").val(), $jQuery)
						}
						else{        $jQuery.ajax(ajaxSettings);}
				}
      catch (err) {
            $jQuery.ajax(ajaxSettings);
           }
    });


    $jQuery(".RBTN").append(refreshBtn).css({ "float": "left", paddingRight: "5px", "cursor": "pointer !important" }).removeClass("RBTN");
}

var update_tab = function(name, data) {

    var count = 0;
    jTabs.find("UL.tabs li").each(function(ind, element) {
        if ($jQuery(this).find("a").html() == name) {
            var divID = $jQuery("a", this).attr("href");
            count = parseInt(divID.replace("#tabs-", ""));
        }
    });

    if (count > 0) {
        jTabs.tabs('select', count - 1);

        var searchResult = $jQuery("div#ui-tabs-" + count, jTabs);

        var oTable = $jQuery('#dataTable' + count).dataTable();
        oTable.fnClearTable();

        if (typeof data.SearchResult != "undefined" && data.SearchResult.length > 0) {
            for (var i = 0; i < data.SearchResult.length; i++) {
                var a = "";
                if (typeof data.columnset != "undefined") {
                    //a = "<a href='" + data.iFrameUrl.replace(/#hmy#/g, data.SearchResult[i][0]) + "' class='listlnk'  target='filter' >" + data.SearchResult[i][1] + "</a>";
                    a = "<a href='" + data.SearchResult[i][0] + "' class='listlnk' target='filter' >" + data.SearchResult[i][1] + "</a>";
                    data.SearchResult[i][1] = a;
                } else {
                    a = "<a href='" + "../" + data.iFrameUrl + data.SearchResult[i][1] + "' class='listlnk'  target='filter' >" + data.SearchResult[i][0] + "</a>";
                    data.SearchResult[i][0] = a;
                }
            }
            oTable.fnAddData(data.SearchResult);
        }
    }

};

var remove_tab = function(tabTitle) {
    if (jTabs) {
        jTabs.find("UL.tabs li").each(function(ind, element) {
            if ($jQuery(this).find("a").html() == tabTitle) {
                var tabDivId = $jQuery(this).find("a").attr("href");
                $jQuery(tabDivId).find("table.display").remove();
                jTabs.tabs("remove", ind);
            }
        });
    }
}


var remove_all_tab = function() {
    if (jTabs) {
        var length = jTabs.find("UL.tabs li").size();
        while (length) {
            var tabDivId = jTabs.find("UL.tabs li:eq(0) a").attr("href");
            $jQuery(tabDivId).find("table.display").remove();
            jTabs.tabs("remove", 0);
            length--;
        }
    }
}

var hide_search_dailogBox = function() {
    if (jDialogBox != null && showSearchResultBtn != null) {
        jDialogBox.fadeOut('fast');
        showSearchResultBtn.addClass("icon-btn-expand").removeClass("icon-btn-collapse");
    }
}

var show_search_dailogBox = function() {
    //jDialogBox.dialog("open");
    if (jDialogBox != null && showSearchResultBtn != null) {
        jDialogBox.fadeIn('fast');
        if (!showSearchResultBtn.is(":visible"))
            showSearchResultBtn.show();
        showSearchResultBtn.addClass("icon-btn-collapse").removeClass("icon-btn-expand");
    }
}

function adjustColumnSizing() {
    //adjust visible datatable columnsizing
    var table = jQuery.fn.dataTable.fnTables(true);
    if (table.length > 0) {
        jQuery(table).dataTable().fnAdjustColumnSizing();
    }
}

function GetEllipsedString(sValue, maxLength) {
    if (sValue && sValue.length > maxLength) {
        sValue = sValue.substr(0, maxLength) + "...";
    }
    return sValue;
}

// This function will add an new tab or modify existing tab for Search result from given url
function AddSearchResultTabByURL(jsonURL, postData) {
    (function($) {
        $.ajax({
            type: 'POST',
            url: jsonURL,
            data: postData,
            dataType: "html",
            success: function(data) {
                try {
                    data = $.evalJSON(data);
                    if (typeof data.msgText != "undefined") {
                        showMessageFromJsonResult(data);
                    } else {
                        window.parent.AddTab(data, { url: jsonURL, data: postData });

                        var prefixURL = "";
                        var urlStartWith = "";
                        var pathName = window.location.pathname;
                        if (typeof data.iFrameUrl != "undefined") {
                            var regExp = new RegExp("^/([^/]+)/");
                            var webShare = (regExp.test(location.pathname)) ? "/" + RegExp.$1 + "/" : "";
                            if (webShare != "") {
                                pathName = pathName.substr(pathName.indexOf(webShare) + webShare.length);
                                if (pathName.indexOf('/') > -1)
                                    prefixURL = "../";
                            }
                            prefixURL += data.iFrameUrl;
                        }

                        if (typeof data.SearchResult != "undefined" && data.SearchResult.length > 0) {
                            window.parent.doMenuClick(prefixURL + data.SearchResult[0][1]);
                        }
                        else if (typeof data.SearchResult == "undefined" && typeof data.iFrameUrl != "undefined" && data.iFrameUrl) {
                            //Default open page as Add a New Entry
                            window.parent.doMenuClick(prefixURL);
                        }
                    }
                }
                catch (err) {
                    $(".resultResponseContainer").remove();
                    var dc = $("<div class='resultResponseContainer'/>").append(data);
                    $("body").append(dc);
                    //                    else {
                    //                        $("body", window.parent.document.getElementById("filter").contentWindow.document).html(data);
                    //                    }
                }
            },
            error: function(response) {
                alert(response);
            }
        });
    })(jQuery);
}

function AdjustFunctionLinks($, iframe) {

    var ConvertFunctionLinksToDropdown = true;
		var functiontop =	".functiontop";
		var FunctionClass;
		
		if ($(iframe).find('.FUNCTIONTOP').length) {
			functiontop = '.FUNCTIONTOP';
		}
		
    if ($(iframe).find(functiontop).length) {

        var tabDiv = $(iframe).find("table.TitleBar:eq(0)").parent();

        $(iframe).find(functiontop).each(function(index, element) {
						
				FunctionClass = $(element).attr('class');

				ConvertFunctionLinksToDropdown = true;
					
			  if (FunctionClass.indexOf('legacyfunctionlinks') > 0) {
							ConvertFunctionLinksToDropdown = false;
				}
	
				if (ConvertFunctionLinksToDropdown) {	

            var expandCollapseText = $(element).text();

            if (MoveFunDataOrReportLinks(expandCollapseText)) {

                //get function/data/report link list Data Container ID
                var LinkListID = $(element).closest("div").attr("id");
                var LinkListContainer = null;
                if (typeof LinkListID != "undefined") {
                    LinkListID = LinkListID.replace("LinkList_HeaderDiv", "") + "LinkList";
                    LinkListContainer = $("#" + LinkListID + "_DataGridContainer");
                } else {
                    LinkListContainer = $(element).closest("table");
                }

                if (!LinkListContainer.size()) return;

                LinkListContainer.hide();

                var insertAfterElement = tabDiv.find("td.TitleBar span");
                if (!insertAfterElement.size()) {
                    insertAfterElement = $("div.tab table td.tab_active");
                }

                var fnListDiv = CreateFunctionLinkListDiv($, expandCollapseText, insertAfterElement, LinkListContainer);
                LinkListContainer.remove();
            }
           }
        });
    }
}
var currOpenfnListTimeOutID;
function CreateFunctionLinkListDiv($, functionListButtonText, insertAfterElement, LinkListContainer) {

    var totalNoOfLinks = $("td.FunctionLink a, td.functionlink a", LinkListContainer).size();
    var fnBtn = $("<div class=\"secondary-btn\" ><a href=\"#\">" + functionListButtonText + "</a></div><span style=\"float: left;\">&nbsp;</span>");
    var fnBtnContainerDIV = $(".fnBtnContainerDIV");

    if (!fnBtnContainerDIV.size()) {
        //add function button div
        fnBtnContainerDIV = $("<div class=\"fnBtnContainerDIV\" />");
        var leftPosition = insertAfterElement.size() ? (insertAfterElement[0].offsetWidth + (insertAfterElement[0].offsetLeft * 2) + 20) : 150;
        fnBtnContainerDIV.css({ position: "absolute", top: 4, left: leftPosition, zIndex: 9998 });
        $("body").append(fnBtnContainerDIV);
    }


    if (totalNoOfLinks > 0) {

        fnBtnContainerDIV.append(fnBtn);

        var fnList = $("<div class=\"secondary-dropdown\" />").hide().css({ position: "absolute", zIndex: 9998 });
        fnBtnContainerDIV.append(fnList);

        fnBtn.click(__bind(function(e) {
            e.preventDefault();
            var isFunctionDivOpen = this[0].is(":visible");
            $(".secondary-dropdown").hide();
            isFunctionDivOpen ? this[0].hide() : this[0].show();
            isFunctionDivOpen ? this[1].addClass("activesecondary") : this[1].removeClass("activesecondary");
            this[0].css({ top: this[1].position().top + this[1].outerHeight(), left: this[1].position().left });
            if (typeof CheckUserBrowserAgnostic != "undefined" && CheckUserBrowserAgnostic()) {
                $("<div id='functionDivCover' style='width: " + $(window).width() + "; height: " + $(window).height() + "; background: transparent; z-index: 200; position: absolute; left: 0px; top: 0px;'/>").appendTo($("body")).mouseover(function (e) {
                    setTimeout(__bind(HideFunctionList, [fnList, fnBtn]), 10);
                });
                window.parent.jQuery(window.parent.document).mouseover(__bind(function () {

                    setTimeout(__bind(this[0], [this[1], this[2]]), 10);
                }, [HideFunctionList, fnList, fnBtn]));
            }
        }, [fnList, fnBtn])).mouseover(function (e) {
            clearTimeout(currOpenfnListTimeOutID);
        }).mouseleave(function(e) {
            currOpenfnListTimeOutID = setTimeout(__bind(HideFunctionList, [fnList, fnBtn]), 1000);
        });

        fnList.mouseover(function(e) {
            clearTimeout(currOpenfnListTimeOutID);
        }).mouseleave(function(e) {
            currOpenfnListTimeOutID = setTimeout(__bind(HideFunctionList, [fnList, fnBtn]), 1000);
        });

        AddLinksToFunctionList($, fnList, LinkListContainer);

    }

}

function HideFunctionList() {
    clearTimeout(currOpenfnListTimeOutID);
    this[0].hide();
    this[1].removeClass("activesecondary");
    if (typeof CheckUserBrowserAgnostic != "undefined" && CheckUserBrowserAgnostic())
        jQuery("div#functionDivCover").remove();
}

function AddLinksToFunctionList($, fnList, fnTable) {
    var ul;
    var maxNoOfLinksPerColumn = 6;
    var maxNoOfColumns = 4;
    var i = 0;
    var totalNoOfLinks = $("td.FunctionLink a, td.functionlink a", fnTable).size();
    //first check if no of columns is more than maxNoOfColumns then fix maxColumn = maxNoOfColumns
    if (totalNoOfLinks / maxNoOfLinksPerColumn > maxNoOfColumns) {
        maxNoOfLinksPerColumn = totalNoOfLinks / maxNoOfColumns;
    }

    $("td.FunctionLink a, td.functionlink a", fnTable).each(function(index, element) {
        if (i == 0) {
            ul = $("<ul></ul>");
            fnList.append(ul);
        }
        var li = $("<li></li>");
        li.append($(element).clone());

        if (typeof CheckUserBrowserAgnostic != "undefined" && CheckUserBrowserAgnostic()) {
            //javascript:OpenNewWindow('/706689/iData.ASP?WCI=begin&Action=D&iType=88&iFileType=4&hFileRcd=2535');
            var href = $(li).find("a").attr("href");
            if (href.toLowerCase().search("javascript:opennewwindow") > -1) {
                href = href.replace("javascript:OpenNewWindow('", "");
                href = href.replace(";", "");
                href = href.replace("')", "");

                $(li).find("a").attr("href", href);

                $(li).find("a").click(function(e) {
                    OpenNewWindowInDialogBox($(this).attr("href"), $(this).text());
                    e.preventDefault();
                    return false;
                });
            }
        }
        ul.append(li);
        i++;
        if (maxNoOfLinksPerColumn <= i)
            i = 0;
    });

    adjustFunctionListWidth($, fnList);
}

function adjustFunctionListWidth($, fnList) {
    var fnListWidth = 0;
    fnList.css({ top: -1000 }).show();
    fnList.find("ul").each(function(ind, ulElement) {
        fnListWidth += parseInt($(ulElement).innerWidth());
    });
    fnList.hide();
    fnList.width(fnListWidth + ($.browser.msie ? 20 : 10));
}
function MoveFunDataOrReportLinks(expandCollapseText) {
    if (expandCollapseText.toLowerCase() == "Leasing Steps".toLowerCase()) {
        return false;
    }
    if (expandCollapseText.toLowerCase() == "Qualification Steps".toLowerCase()) {
        return false;
    }
    if (expandCollapseText.toLowerCase() == "Segment Mapping".toLowerCase()) {
        return false;
    }
    return true;
}
function ReAlignJumpToBox($, iframe) {

    //adjust search div
    var searchDiv = $(iframe).find("input[id*='Bar_JumpBox']:eq(0)").closest("div");
    if (searchDiv.length) {
    	if (CheckUserBrowserAgnostic()){searchDiv.css({ top: '0px', right: "10px" });}
    	else {
    		if ($.browser.msie) {
    			searchDiv.css({ top: '2px', right: "10px" });
    		}
    		else{
    			searchDiv.css({ top: '0px', right: "10px" });
    		}
    	} 
        searchDiv.find("table").css("width", "");
        searchDiv.find("span").css("margin-left", "");
        searchDiv.find("table").css("vertical-align","middle");
        searchDiv.find("span").css("vertical-align","middle");
        searchDiv.find("input").css("vertical-align","middle");
    }

    var tdTitleBar = $(iframe).find("td.TitleBar");
    if (tdTitleBar.length) {
        var span = $("span", tdTitleBar).eq(0);
        if (span.is(":empty")) {
            span.append("&nbsp;");
        }
    }

}

function SetIframeChildrensTopPosition($, top) {
    var relElements = [];
    var relTop = [];
    $("form:eq(0)").children().each(function(ind, element) {
        var elementCSSTop = parseFloat($(element).css("top"));
        if (isNaN(elementCSSTop) || elementCSSTop == 0)
            elementCSSTop = parseFloat($(element).offset().top);

        if ($(element).css("position") == "absolute") {
            if (!$(element).attr("oTop")) {
                $(element).attr("oTop", elementCSSTop);
                $(element).css({ top: (elementCSSTop + top) + "px" });
            }
            else {
                $(element).css({ top: (parseFloat($(element).attr("oTop")) + (top > 0 ? top : 0)) + "px" });
            }
        } else if ($(element).attr("id") != undefined) {
            $(element).css({ top: (elementCSSTop + top) + "px" });
            relElements.push(element);
            relTop.push(elementCSSTop + top);
        }
    });

    //added absolute later; cause if we set top with postion as relative; it resets the top to zero.
    for (var i = 0; i < relElements.length; i++) {
        $(relElements[i]).css({ "position": "absolute" });
        if (!$(relElements[i]).attr("oTop")) {
            $(relElements[i]).attr("oTop", parseFloat(relTop[i]) - top);
            $(relElements[i]).css({ "top": parseFloat(relTop[i]) + "px" });
        }
    }

    $(".functionlinksdiv, table.TitleBar").css({ top: '' });
    if ($("#TitleBar_JumpBox").length)
        $(".functionlinksdiv").next().css({ top: '0px' });
}

function ReSetTabPosition() {

    (function($) {
        var tabStrip = $(".Tab_Strip[style*='position:absolute']");
        if (tabStrip.css("left") == "0px") {
            var maxHeight = 0;
            $("form:eq(0)").children().each(function(ind, element) {
                if ($(element).has("style[position='absolute']") && $(element).is(":visible") && !$(element).hasClass("TabBody")) {
                    var TopPosition = $(element).position().top;
                    if (maxHeight < $(element).height() + TopPosition)
                        maxHeight = $(element).height() + TopPosition;
                } else if ($(element).has("style[position='absolute']") && $(element).is(":visible") && $(element).hasClass("TabBody")) {
                    if ($(element).children().length) {
                        $(element).children().eq(0).css({ "padding-bottom": "20px" });
                    }
                }
            });

            if (maxHeight > 0) {
                tabStrip.css("top", maxHeight + 30);
            }
        }
    })(jQuery)
}

function DoLookupListAutoCompleteUrl(url, fieldname) {
    var ii = 0;
    var sValue = "";
    var ss = "";
    fieldname = trim(fieldname);

    /* do "URLenocding" of plus (+) sign that the JavaScript function escape() neglects.
    This becomes a problem if the select statement passed contains a plus sign */
    var re = new RegExp("\\+", "g");
    url = url.replace(re, '%2B');

    var ij = document.forms[0].elements.length;
    if (ij > 200) { ij = 200 }
    var bChangedSave = 0;
    //if the field is disabled don't show the list
    if (document.forms[0].elements[fieldname].disabled) { return }
    s1 = GetToken("Parent1", url)
    s2 = GetToken("Parent2", url)
    s3 = GetToken("Parent3", url)
    s4 = GetToken("Parent4", url)
    s5 = GetToken("Parent1Handle", url)
    s6 = GetToken("Parent2Handle", url)
    s7 = "select"

    if (typeof (document.forms[0].elements["BSAVE"]) != "undefined") {
        if (document.forms[0].elements["BSAVE"].value == "0") {
            bChangedSave = 1
            document.forms[0].elements["BSAVE"].value == "1"
        }
    }

    //note that we don't send values with a #, because the DLL won't get anything after the first #!
    //we just send the first 250 chars, then we'll also send special Parentx tokens
    //don't send Parentx tokens in for loop

    for (ii = 0; ii < ij; ii++) {
        if (typeof (document.forms[0].elements["select"]) != "undefined") {
            if (document.forms[0].elements[ii].value != "" && document.forms[0].elements[ii].value.length < 60 && document.forms[0].elements[ii].value.indexOf("#") == -1) {
                var sElementName
                sElementName = document.forms[0].elements[ii].name
                if (sElementName != "" && sElementName != s1 && sElementName != s2 && sElementName != s3 && sElementName != s4
			&& sElementName != s5 && sElementName != s6 && sElementName != s7) {
                    /* tr46040: Make sure that values containing special characters like & gets escaped */
                    /* see encoding below */
                    var tagName
                    tagName = document.forms[0].elements[ii].tagName
                    if (tagName != null) tagName = tagName.toUpperCase();
                    if (tagName == "INPUT" || tagName == "SELECT") {
                        sValue = sValue + "&" + sElementName + "=" + document.forms[0].elements[ii].value;
                    }
                }
            }
        }
        if (sValue.length > 250) { break }
    }


    url = url + sValue;
    //get special parent tags
    var parentTags = ""
    if (s1 != null) { parentTags = parentTags + "&" + s1 + "=" + document.forms[0].elements[s1].value; }
    if (s2 != null) { parentTags = parentTags + "&" + s2 + "=" + document.forms[0].elements[s2].value; }
    if (s3 != null) { parentTags = parentTags + "&" + s3 + "=" + document.forms[0].elements[s3].value; }
    if (s4 != null) { parentTags = parentTags + "&" + s4 + "=" + document.forms[0].elements[s4].value; }
    if (s5 != null) { parentTags = parentTags + "&" + s5 + "=" + document.forms[0].elements[s5].value; }
    if (s6 != null) { parentTags = parentTags + "&" + s6 + "=" + document.forms[0].elements[s6].value; }
    if (parentTags != "") {
        url = url + parentTags
    }

    if (typeof (document.forms[0].elements["select"]) != "undefined") {
        var sSelect = document.forms[0].elements["select"].value
        url = url + "&select=" + sSelect;
    }

    //    newWindow = window.open(GetBlankPage(), 'newWin', 'toolbar=no,resizable=yes,location=no,scrollbars=1,height=30,width=150,left=0,top=0,alwaysraised=yes');
    //    waiting = '<html><head><title>Yardi Lookup</title><body bgcolor=#CCCCCC><center>'
    //    waiting = waiting + '<font size=-1><p>Retrieving Records...</body></html>';
    /*
    //I took out the following becuase it was too tricky to figure out where to load the IMG from

    if (bsub == "-1") {
    waiting = waiting + '<img src="../images/computer_working.gif"><font size=-1><p>Retrieving Records...</body></html>';
    }
    else {
    waiting = waiting + '<img src="../images/computer_working.gif"><font size=-1><p>Retrieving Records...</body></html>';
    }
    */
    //    newWindow.document.write(waiting)
    url = url + '&data=' + document.forms[0].elements[fieldname].value;
    var i = url.indexOf("?")
    if (i > 0) {
        var p1, p2
        p1 = url.substring(0, i + 1)
        p2 = url.substr(i + 1)
        re.compile("\\<", "g")
        p2 = p2.replace(re, '')
        re.compile("\\>", "g")
        p2 = p2.replace(re, '')
        url = p1 + encodeURI(p2)
    }

    return url;

}

function RemoveHorizontalScrollFromDiv() {
    (function($) {
        $("div").each(function(index, divElement) {
            //check div has scrollbar            
            if (divElement.offsetWidth > divElement.clientWidth && typeof divElement.style.width != "undefined" && divElement.style.width.search("px") > -1) {
                //resize div
                var scrollbarWidth = divElement.scrollWidth - divElement.clientWidth;
                var adjustWidth = divElement.offsetWidth - divElement.scrollWidth;
                var newDivWidth = divElement.scrollWidth + scrollbarWidth + adjustWidth;
                if (!isNaN(newDivWidth)) {
                    divElement.style.width = newDivWidth;
                }
            }
        });
    })(jQuery);
}

/**
* jQuery JSON Plugin
* version: 2.3 (2011-09-17)
*
* This document is licensed as free software under the terms of the
* MIT License: http://www.opensource.org/licenses/mit-license.php
*
* Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
* website's http://www.json.org/json2.js, which proclaims:
* "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
* I uphold.
*
* It is also influenced heavily by MochiKit's serializeJSON, which is
* copyrighted 2005 by Bob Ippolito.
*/

(function($) {

    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
		meta = {
		    '\b': '\\b',
		    '\t': '\\t',
		    '\n': '\\n',
		    '\f': '\\f',
		    '\r': '\\r',
		    '"': '\\"',
		    '\\': '\\\\'
		};

    /**
    * jQuery.toJSON
    * Converts the given argument into a JSON respresentation.
    *
    * @param o {Mixed} The json-serializble *thing* to be converted
    *
    * If an object has a toJSON prototype, that will be used to get the representation.
    * Non-integer/string keys are skipped in the object, as are keys that point to a
    * function.
    *
    */
    $.toJSON = typeof JSON === 'object' && JSON.stringify
		? JSON.stringify
		: function(o) {

		    if (o === null) {
		        return 'null';
		    }

		    var type = typeof o;

		    if (type === 'undefined') {
		        return undefined;
		    }
		    if (type === 'number' || type === 'boolean') {
		        return '' + o;
		    }
		    if (type === 'string') {
		        return $.quoteString(o);
		    }
		    if (type === 'object') {
		        if (typeof o.toJSON === 'function') {
		            return $.toJSON(o.toJSON());
		        }
		        if (o.constructor === Date) {
		            var month = o.getUTCMonth() + 1,
					day = o.getUTCDate(),
					year = o.getUTCFullYear(),
					hours = o.getUTCHours(),
					minutes = o.getUTCMinutes(),
					seconds = o.getUTCSeconds(),
					milli = o.getUTCMilliseconds();

		            if (month < 10) {
		                month = '0' + month;
		            }
		            if (day < 10) {
		                day = '0' + day;
		            }
		            if (hours < 10) {
		                hours = '0' + hours;
		            }
		            if (minutes < 10) {
		                minutes = '0' + minutes;
		            }
		            if (seconds < 10) {
		                seconds = '0' + seconds;
		            }
		            if (milli < 100) {
		                milli = '0' + milli;
		            }
		            if (milli < 10) {
		                milli = '0' + milli;
		            }
		            return '"' + year + '-' + month + '-' + day + 'T' +
					hours + ':' + minutes + ':' + seconds +
					'.' + milli + 'Z"';
		        }
		        if (o.constructor === Array) {
		            var ret = [];
		            for (var i = 0; i < o.length; i++) {
		                ret.push($.toJSON(o[i]) || 'null');
		            }
		            return '[' + ret.join(',') + ']';
		        }
		        var name,
				val,
				pairs = [];
		        for (var k in o) {
		            type = typeof k;
		            if (type === 'number') {
		                name = '"' + k + '"';
		            } else if (type === 'string') {
		                name = $.quoteString(k);
		            } else {
		                // Keys must be numerical or string. Skip others
		                continue;
		            }
		            type = typeof o[k];

		            if (type === 'function' || type === 'undefined') {
		                // Invalid values like these return undefined
		                // from toJSON, however those object members
		                // shouldn't be included in the JSON string at all.
		                continue;
		            }
		            val = $.toJSON(o[k]);
		            pairs.push(name + ':' + val);
		        }
		        return '{' + pairs.join(',') + '}';
		    }
		};

    /**
    * jQuery.evalJSON
    * Evaluates a given piece of json source.
    *
    * @param src {String}
    */
    $.evalJSON = typeof JSON === 'object' && JSON.parse
		? JSON.parse
		: function(src) {
		    return eval('(' + src + ')');
		};

    /**
    * jQuery.secureEvalJSON
    * Evals JSON in a way that is *more* secure.
    *
    * @param src {String}
    */
    $.secureEvalJSON = typeof JSON === 'object' && JSON.parse
		? JSON.parse
		: function(src) {

		    var filtered =
			src
			.replace(/\\["\\\/bfnrtu]/g, '@')
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
			.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

		    if (/^[\],:{}\s]*$/.test(filtered)) {
		        return eval('(' + src + ')');
		    } else {
		        throw new SyntaxError('Error parsing JSON, source is not valid.');
		    }
		};

    /**
    * jQuery.quoteString
    * Returns a string-repr of a string, escaping quotes intelligently.
    * Mostly a support function for toJSON.
    * Examples:
    * >>> jQuery.quoteString('apple')
    * "apple"
    *
    * >>> jQuery.quoteString('"Where are we going?", she asked.')
    * "\"Where are we going?\", she asked."
    */
    $.quoteString = function(string) {
        if (string.match(escapeable)) {
            return '"' + string.replace(escapeable, function(a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };

})(jQuery);

//Cafe NoticePeak messages
(function($) {
    //version 2.0 with clearing of existing of notices

    $.showMessage = function(options) {
        var msgClass = 'ui-show-message';
        var settings = {
            'text': 'Success!',
            'position': 'top',
            'type': 'success',
            'time': 60000,
            'slideTime': 500,
            'backgroundColor': '',
            'outlineColor': '',
            'width': 210,
            'bindTo': '',
            CallBeforeShow: null,
            CallAfterClose: null
        };
        if (options) {
            settings = $.extend(settings, options);
        }

        msgClass += (settings.position == 'top') ? '-top' : '-bottom';
        if (settings.bindTo != '') {
            $(settings.bindTo).find('.' + msgClass).remove();
        } else {
            $('body > .' + msgClass).remove();
        }

        var msgHtml = $('<div class="' + msgClass + '"></div>');

        var objCss = {
            'background-color': '#D3D866',
            'color': '#000',
            'border-left': '1px solid #BBC234',
            'border-right': '1px solid #BBC234',
            'display': 'none',
            'line-height': '14px',
            'margin': '0 0 0 0',
            'padding': '10px 30px',
            'position': 'fixed',
            'text-align': 'center',
            'vertical-align': 'baseline',
            'width': settings.width + 'px',
            'word-wrap': 'break-word',
            'z-index': '9999',
            'cursor': 'pointer'
        }
        var objCssTop = {
            'border-bottom': '1px solid #BBC234',
            'border-bottom-left-radius': '6px',
            'border-bottom-right-radius': '6px',
            '-moz-border-radius-bottomleft': '6px',
            '-moz-border-radius-bottomright': '6px',
            '-webkit-border-bottom-left-radius': '6px',
            '-webkit-border-bottom-right-radius': '6px',
            'border-bottom-color': '1px solid #BCC14C',
            'top': '0px'
        }
        var objCssBottom = {
            'border-top': '1px solid #BBC234',
            'border-top-left-radius': '6px',
            'border-top-right-radius': '6px',
            '-moz-border-radius-topleft': '6px',
            '-moz-border-radius-topright': '6px',
            '-webkit-border-top-left-radius': '6px',
            '-webkit-border-top-right-radius': '6px',
            'border-top-color': '1px solid #BCC14C',
            'bottom': '0px'
        }

        msgHtml.css(objCss);

        msgHtml.html(settings.text);

        if (settings.position == 'top') {
            msgHtml.css(objCssTop);
            if ($.browser.msie && ($.browser.version == 6.0 || $.browser.version == 7.0)) {
                msgHtml.css('position', 'absolute');
                msgHtml.css('top', 'expression(eval(document.body.scrollTop))');
            }
        } else {
            msgHtml.css(objCssBottom);
            if ($.browser.msie && ($.browser.version == 6.0 || $.browser.version == 7.0)) {
                msgHtml.css('position', 'absolute');
                msgHtml.css('bottom', 'expression(eval(document.body.scrollBottom))');
            }
        }

        if (settings.type == 'error') {
            msgHtml.css('background', '#CC3300');
        }
        if (settings.type == 'warning') {
            msgHtml.css('background', '#FFFF00');
        }
        if (settings.type == 'success') {
            msgHtml.css('background', '#D3D866');
        }
        if (settings.backgroundColor != '') {
            msgHtml.css('background-color', settings.backgroundColor);
        }
        if (settings.outlineColor != '') {
            msgHtml.css('outline', '1px solid ' + settings.outlineColor);
        }

        if (settings.bindTo == '') {
            $('body').prepend(msgHtml);
        } else {
            msgHtml.css('position', 'absolute');
            msgHtml.css('z-index', 'inherit');
            $(settings.bindTo).append(msgHtml);
        }

        if (settings.CallBeforeShow == null) {
            settings.CallBeforeShow = function() {
            		$(settings.myDocument).find("input[type='submit']:disabled").addClass("disabled-on-render");
                $(settings.myDocument).find("input[type='submit'],button[id*='_Button']").attr("disabled", "true");
                return true;
            }
        }
        if (settings.CallAfterClose == null) {
            settings.CallAfterClose = function() {
                $(settings.myDocument).find("input[type='submit'],button[id*='_Button']").removeAttr("disabled");
                $(settings.myDocument).find(".disabled-on-render").attr("disabled", "true");
            }
        }

        if (settings.CallBeforeShow()) {
            $('.' + msgClass).slideDown(settings.slideTime).delay(settings.time).slideUp(settings.slideTime, function() {
                if (settings.CallAfterClose != null && settings.CallAfterClose() == true) {
                    $('.' + msgClass).remove();
                    $(settings.myDocument).find(".disabled-on-render").attr("disabled", "true");
                }
            });
        }
	
        $('.' + msgClass).click(function() {
            /*if (settings.CallAfterClose != null) {
            settings.CallAfterClose();
            }*/
            $(settings.myDocument && typeof settings.myDocument.body != "unknown" ? settings.myDocument : document).find("input[type='submit'],button[id*='_Button']").removeAttr("disabled");
            $('.' + msgClass).remove();
            $(settings.myDocument).find(".disabled-on-render").attr("disabled", "true");
			$(settings.myDocument).off("keydown", HideMessage); //unbind document keydown after message hide
        });

		var btnClose  = $("<span class='ui-icon ui-icon-close'>X</span>");
		btnClose.css({ position: 'absolute', top : 7, right: 7 }).click(function(e){ $('.' + msgClass).trigger("click"); });
		btnClose.appendTo(msgHtml);
        msgHtml.centerTop();
		
		/* Hide Message on keypress */
		var keyupNPTimer =0;		
		$(settings.myDocument).off("keydown", HideMessage);
		$(settings.myDocument).on("keydown", HideMessage);		
		function HideMessage(){			
			if(keyupNPTimer == 0){
				keyupNPTimer = setTimeout(function(){
					if($(".ui-show-message-top").size()){
						$(".ui-show-message-top").trigger("click");
					}
					//$(settings.myDocument).off("keydown", HideMessage);
				}, 10);
			}
		}
		/* End of Hide Message on keypress or textbox*/
		
    };
})(jQuery);

/*!
* jQuery Cookie Plugin
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2011, Klaus Hartl
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/GPL-2.0
*/
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

/*set element at center of screen*/
(function($) {
    $.fn.centerTop = function() {
        this.css("position", "absolute");
        this.css("top", "0px");
        this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    }

    jQuery.fn.center = function() {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    }

})(jQuery);
/*end of set element at center of screen*/


(function($) {
    if ($.fn.dataTableExt === undefined) {
        $.getJsScript("jquery.dataTables.min.js", function(data) {
            fnSetDataTableFilteringDelay($);
        });
    } else {
        fnSetDataTableFilteringDelay($);
    }
})(jQuery);

function fnSetDataTableFilteringDelay($) {
    $.fn.dataTableExt.oApi.fnSetFilteringDelay = function(oSettings, iDelay) {
        var _that = this;

        if (iDelay === undefined) {
            iDelay = 250;
        }

        this.each(function(i) {
            $.fn.dataTableExt.iApiIndex = i;
            var 
            $this = this,
            oTimerId = null,
            sPreviousSearch = null,
            anControl = $('input', _that.fnSettings().aanFeatures.f);

            anControl.unbind('keyup').bind('keyup', function() {
                var $$this = $this;

                if (sPreviousSearch === null || sPreviousSearch != anControl.val()) {
                    window.clearTimeout(oTimerId);
                    sPreviousSearch = anControl.val();
                    oTimerId = window.setTimeout(function() {
                        $.fn.dataTableExt.iApiIndex = i;
                        _that.fnFilter(anControl.val());
                    }, iDelay);
                }
            });

            return this;
        });
        return this;
    };
}

function fn_Add_DT_RefreshButton($) {

    var DT_RefreshButton = function(oDTSettings) {
        oDTSettings.aoDrawCallback.push({
            "fn": function(oSettings) {
                var refreshBtn = $("<button/>");
                refreshBtn.text("hi");
                return refreshBtn;
            },
            "sName": "RefreshButton"
        });
    };

    $.fn.dataTableExt.aoFeatures.push({
        "fnInit": function(oSettings) {
            new DT_RefreshButton(oSettings);
        },
        "cFeature": "R",
        "sFeature": "RefreshButton"
    });
}

function alertDialogBox(msg, AlertAction) {
    if (!$) { $ = window.jQuery; }

    $(function () {
        var d = $('<div id="DivMsg" style="top:0px; left:0px; word-wrap:break-word" title=""></div>');
        $("body").append(d);

        $("#DivMsg").text(msg);

        $("#DivMsg").dialog({
            modal: true,
            buttons: {
                Ok: function () {
                    eval(AlertAction);
                    $jQuery(this).dialog("close");
                }
            },
            width: 500
        });
        
        $(".ui-dialog").css('top', '100px');
    });
}

// Overriding the alert function and showing the notice peack.
function alert(msg) {
    var myDocument = document;
    var jq = getParentWindow();
	if (GetSubCookie("Culture", "Translate") == "1") {
		msg = TranslateThis(msg);
	}	
	
    if (!jq) { jq = window.jQuery; }
    (function($) {
        $.showMessage({ text: msg, type: "warning", myDocument: myDocument });
    })(jq);
}
// Basically a copy of alert and only being called from alertwithtranslation because we don't want to translate the translation
function alert1(msg) {
    var myDocument = document;
    var jq = getParentWindow();
	
    if (!jq) { jq = window.jQuery; }
    (function($) {
        $.showMessage({ text: msg, type: "warning", myDocument: myDocument });
    })(jq);
}

function alertwithtranslation(msg){
		var ShareURL;
 				var prefixURL = "";
        var pathName = window.location.pathname;
        var regExp = new RegExp("^/([^/]+)/");
        var webShare = (regExp.test(location.pathname)) ? "/" + RegExp.$1 + "/" : "";
        if (webShare != "") {
		pathName = pathName.substr(pathName.indexOf(webShare) + webShare.length);
	        if (pathName.indexOf('/') > -1)
        	{
               		prefixURL =  "../";
	        }
        }
        ShareURL = prefixURL + "pages/SysTranslation.ashx?Text=" + msg;
        
     	jQuery.ajax(
            {
                type: "GET",
                url: ShareURL,
                data: {},
                success: function (data) {
                		HideLoading();
                    var msg=''+data;
                    alert1(msg);
                },
                dataType: "text"
            }

           );
   
   }


function getParentWindow() {
    var notFound = true;
    var jq = "window";
    var i = 0;
    while (notFound && i < 10) {
        if (eval(jq).location.pathname.toLowerCase().search('menu.aspx') > -1) { notFound = false; }
        jq = jq + ".parent";
        i++;
    }
    if (i == 10)
        jq = "window";
    else
        jq = jq.substr(0, jq.length - ".parent".length);
    return eval(jq + ".jQuery");
}

function showMessageFromJsonResult(data) {
    (function($) {
        var settings = {
            text: data.msgText,
            width: 210,
            type: typeof data.msgType != "undefined" ? data.msgType : "success",
            myDocument: document
        };

        if (typeof data.requiredconfirm != "undefined") {
            var bConfirm = confirm(data.msgText)
            if (bConfirm) { document.getElementById("filter").contentWindow.location.href = "../" + data.URL; }
            else { history.back(); }
        }
        else if (typeof data.jumpToPrevPage != "undefined") {
            $.showMessage($.extend(settings, {
                CallAfterClose: function() {
                    history.back();
                }
            }));
        }
        else if (typeof data.URL != "undefined") {
            $.showMessage($.extend(settings, {
                CallAfterClose: function() {
                    location.href = data.URL;
                }
            }));
        }
        else {
            $.showMessage(settings);
        }
    })(jQuery);
}

function AssignHotkeysForCopyPastAspxPageValues($) {

    var pathname = window.location.pathname;
    var disable_in_input = true;
    var copyArr = new Array();
    //Ctrl+C and Ctrl+V only works for .aspx page and pages must be in editmode
    if ($("#PageMode").size() && pathname.toLowerCase().search(".aspx") > -1) {
        var pageMode = $("#PageMode").val();
        var arr = pathname.split('/');
        var pagename = "";
        if (arr.length > 0) {
            pagename = arr[arr.length - 1];
        }
        var iFrameDoc = window.parent.document;
        function funcOnCopy() {
            //searilize-form into json format
            var jsonString = "";
            copyArr = new Array();
            copyInputsValueInArray(":input:not(input[type=hidden])");
            copyInputsValueInArray(":checkbox");
            copyInputsValueInArray(":radio");
            setValue(pagename, copyArr);
        }
        function funcOnPaste() {
            //deserialize form content into json format
            var arr = getValue(pagename);
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var element = document.getElementsByName(arr[i].name);
                    if (element.length) {
                        element = element[0];
                        if (element.type.toUpperCase() == "CHECKBOX" || element.type.toUpperCase() == "RADIO") {
                            if (arr[i].value) element.checked = true;
                            else element.checked = "";
                        } else {
                            element.value = arr[i].value;
                        }
                    }
                    //$("input[name='" + jsonObj[i].name + "']").val(jsonObj[i].value);
                }
            }
        }
        // copy all textbox, select, checkbox and radiobutton values , exclude from grid
        function copyInputsValueInArray(selector) {
            var tempArr = $(selector).serializeArray();
            for (var i = 0; i < tempArr.length; i++) {
                var elementName = tempArr[i].name;
                if (elementName.toLowerCase().search("datatable:row") == -1) { // exclude if grid element
                    copyArr.push(tempArr[i]);
                }
            }
        }
        function setValue(objKey, objValue) {
            if (!iFrameDoc.myClipBoardArray)
                iFrameDoc.myClipBoardArray = new Array();
            iFrameDoc.myClipBoardArray[objKey] = objValue;
        }
        function getValue(objKey) {
            if (!iFrameDoc.myClipBoardArray)
                return null;
            return iFrameDoc.myClipBoardArray[objKey];
        }
        $(document).bind("keydown", function(e) {
            e = e || window.event;

            if (disable_in_input) { //Don't enable shortcut keys in Input, Textarea fields
                var element;
                if (e.target) element = e.target;
                else if (e.srcElement) element = e.srcElement;
                if (element.nodeType == 3) element = element.parentNode;

                if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
            }

            //Find Which key is pressed
            var code = "";
            var propagate = true;
            if (e.keyCode) code = e.keyCode;
            else if (e.which) code = e.which;
            var character = String.fromCharCode(code).toLowerCase();
            var modifiers = {
                ctrl: { wanted: false, pressed: false }
            };
            if (e.ctrlKey) {
                modifiers.ctrl.pressed = true;
                modifiers.ctrl.wanted = true;
                if (character == "c" && pageMode == "EDIT") {
                    //avoid custome copy if any item is selected for copying
                    var str = "";
                    if (document.getSelection) {
                        str = document.getSelection();
                    } else if (document.selection && document.selection.createRange) {
                        range = document.selection.createRange();
                        str = range.text;
                    }
                    if (str != "") return true;

                    propagate = false;
                    funcOnCopy();
                } else if (character == "v" && pageMode == "NEW") {
                    propagate = false;
                    funcOnPaste();
                }
            }
            if (!propagate) {
                //e.cancelBubble is supported by IE - this will kill the bubbling process.
                e.cancelBubble = true;
                e.returnValue = false;

                //e.stopPropagation works in Firefox.
                if (e.stopPropagation) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                return false;
            }
            return true;
        });
    }
}

function setFCTGridAlignment($) {

    var FCTHeaderContainerTables = $("table[id*='_FCTHeaderContainerTable']");

    FCTHeaderContainerTables.each(function(ind, FCTHeaderTable) {
        var DGC = FCTHeaderTable.parentNode;
        var GridID = DGC.id.replace("_DataGridContainer", "");

        //        $("#" + GridID + "_FCTDataContainerTable tbody tr td").eq(0).attr("valign", "top");
        $(DGC).find("div").css({ "border": "" });
        //        $(DGC).find("table").attr("cellpadding", "0").attr("border", 1).css({ "table-layout": "fixed", "border-collapse": "collapse" });
        //        //if($.browser.msie){
        //        //$(DGC).find("table").attr("cellspacing", "0");
        //        //}
        //        $(DGC).children().attr("border", 0);

        var FCTDataDiv2Width = $("#" + GridID + "_FCTDataDiv2").width();
        //to align with header div (for IE) due to border collapse issue
        var dataDiv2 = document.getElementById(GridID + "_FCTDataDiv2");
        var DataTable2 = document.getElementById(GridID + "_DataTable2");
        var vHeight = dataDiv2.scrollHeight - dataDiv2.clientHeight;
        if (vHeight > 0) {
            if (dataDiv2.scrollWidth > dataDiv2.clientWidth) {
                $("#" + GridID + "_FCTDataDiv2").width(FCTDataDiv2Width + 17);
            } else if (DataTable2 && DataTable2.rows.length > 0 && dataDiv2.scrollWidth > DataTable2.scrollWidth) {
                FCTDataDiv2Width = DataTable2.scrollWidth + 2;
                $("#" + GridID + "_FCTDataDiv2").width(DataTable2.scrollWidth + 17);
            }
        }
        //end for header align
        $("#" + GridID + "_FCTHeaderDiv2").width(FCTDataDiv2Width);

        //        if ($.browser.webkit)
        //            $("#" + GridID + "_DataTable1, #" + GridID + "_DataTable2").css("border-color", '');

        //        if ($.browser.safari) {
        //            //$("#HeaderGrid_DataGridContainer table, #iterGrid_DataGridContainer table").css({ "table-layout": "" });
        //            $("#" + GridID + "_DataGridContainer table").css({ "table-layout": "" });
        //        }

        var HeaderTable1 = document.getElementById(GridID + "_FCTHeaderTable1")
        var HeaderTable2 = document.getElementById(GridID + "_FCTHeaderTable2")

        if (HeaderTable1.offsetHeight > HeaderTable2.offsetHeight) {
            HeaderTable2.style.height = HeaderTable1.offsetHeight;
        }
        else {
            HeaderTable1.style.height = HeaderTable2.offsetHeight;
        }
        
        var Table1 = jQuery('#' + GridID + '_DataTable1');
        var Table2 = jQuery('#' + GridID + '_DataTable2');
        var maxRowHeight;
        var thisRow;
        var i = 0;
        var dg1RowId;
        var dg2RowId;
        var dg1RowHeight;
        var dg2RowHeight;


        jQuery('#' + GridID + '_DataTable1 > tbody  > tr').each(function () {
            dg1RowId = '#' + GridID + '_DataTable1' + '_row' + i;
            dg2RowId = '#' + GridID + '_DataTable2' + '_row' + i;

            dg1RowHeight = getRowHeight(dg1RowId);
            dg2RowHeight = getRowHeight(dg2RowId);

            if (dg1RowHeight >= dg2RowHeight) {
                maxRowHeight = dg1RowHeight;
                setRowHeight(dg2RowId, maxRowHeight);
            }
            else {
                maxRowHeight = dg2RowHeight;
                setRowHeight(dg1RowId, maxRowHeight);
            }

            

            i = i + 1;
        });
        
    });

}

function getRowHeight(thisRow){
	return jQuery(thisRow).height();
}
							
function setRowHeight(thisRow, maxRowHeight){ 	  						
	jQuery(thisRow).height(maxRowHeight);
}

function SetBase64Values() {
 		var textareaobjects;
 		textareaobjects = jQuery('form textarea[base64encodeonpost="true"]');
    jQuery.each( textareaobjects, function( key, value ) {
    			var idoftextarea =	value.id;
    			var valueoftextarea = jQuery('form #' + idoftextarea).val();
    			jQuery('form #' + idoftextarea).val(Base64Encode(valueoftextarea));
		});
	}
	
function ResetBase64Values() {
 		var textareaobjects;
 		textareaobjects = jQuery('form textarea[base64encodeonpost="true"]');
    jQuery.each( textareaobjects, function( key, value ) {
    			var idoftextarea =	value.id;
    			var valueoftextarea = jQuery('form #' + idoftextarea).val();
    			if (IsBase64Encoded(valueoftextarea)){
    				jQuery('form #' + idoftextarea).val(Base64Decode(valueoftextarea));
    			}
		});
	}
	
function Base64Encode(value) {
            var EncodedString;
            EncodedString = jQuery.base64Encode(value);
            return EncodedString;
        }

function Base64Decode(value) {
            var DecodedString;
            DecodedString = jQuery.base64Decode(value);
            return DecodedString;
        }
        
function IsBase64Encoded(value) {
	var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");

		if (base64Matcher.test(value)) {
    return true;
		} 
	else {
    return false;
	}
}

(function($){
		
		var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		
		var uTF8Encode = function(string) {
			string = string.replace(/\x0d\x0a/g, "\x0a");
			var output = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					output += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					output += String.fromCharCode((c >> 6) | 192);
					output += String.fromCharCode((c & 63) | 128);
				} else {
					output += String.fromCharCode((c >> 12) | 224);
					output += String.fromCharCode(((c >> 6) & 63) | 128);
					output += String.fromCharCode((c & 63) | 128);
				}
			}
			return output;
		};
		
		var uTF8Decode = function(input) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while ( i < input.length ) {
				c = input.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if ((c > 191) && (c < 224)) {
					c2 = input.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = input.charCodeAt(i+1);
					c3 = input.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
		
		$.extend({
			base64Encode: function(input) {
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
				input = uTF8Encode(input);
				while (i < input.length) {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}
					output = output + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
				}
				return output;
			},
			base64Decode: function(input) {
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				while (i < input.length) {
					enc1 = keyString.indexOf(input.charAt(i++));
					enc2 = keyString.indexOf(input.charAt(i++));
					enc3 = keyString.indexOf(input.charAt(i++));
					enc4 = keyString.indexOf(input.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					output = output + String.fromCharCode(chr1);
					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}
				}
				output = uTF8Decode(output);
				return output;
			}
		});
	})(jQuery);
	
function getPageName() {
    var url = window.location.pathname;
    var index = url.lastIndexOf("/") + 1;
    var filenameWithExtension = url.substr(index);
    var filename = filenameWithExtension.split(".")[0];
    return filename;
}

function CallServerForTranslation(mytext) {
    var prefixURL = "";
    var pathName = window.location.pathname;
    var regExp = new RegExp("^/([^/]+)/");
    var webShare = (regExp.test(location.pathname)) ? "/" + RegExp.$1 + "/" : "";
    if (webShare != "") {
        pathName = pathName.substr(pathName.indexOf(webShare) + webShare.length);
        if (pathName.indexOf('/') > -1)
        {
            prefixURL =  "../";
        }
    }

    var webMethodUrl = prefixURL + "pages/SysTranslation.ashx?Text=" + mytext;
    //async: false changed to true by messi
    return jQuery.ajax({
        type: "GET",
        url: webMethodUrl,
        async: false,
        data: {},
        dataType: "text",
        success: function (data) {
        },
        error: function () {
            alert("Some error occured with translation. Please contact Yardi System Administrator.");
        }
    });
          
}

function TranslateThis(mytext) {
  var translatedText;
  CallServerForTranslation(mytext).done(function (data) {
        translatedText = data;
    });
  return translatedText;
}
