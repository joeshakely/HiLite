/*---------------------------------------------------------------------------------------------------------
Yardi Common JavaScript Library
Copyright 1999-2000 (c) Yardi Systems, Inc.

[1] MaskAcct - formats text with the acct mask (i.e. 4500 -> 4500-0000)
[2] Find - find an element in a list
[3] Error - displays an error
[4] Empty - checks if string is empty
[5] ValidLength - checks is string is of a valid length
[6] ValidInt - checks if number is a valid integer
[7] ValidCurrency - checks if number is a valid currency
[8] ValidateDate - checks if object is valid date
[9] ValidPhone - checks if string is valid phone number
[12] ValidMinMax - checks if number is between two values
[13] ValidYesNo - checks if string is = yes or no
[14] WriteMenu - generalized menu writing function
[15] Nav0 - Specifies submit action depending on type of form
[16] GotChange - set bDataChanged = true
[20] MenuWindow - Create a test window
[21] SetCookie - Sets a cookie
[22] GetCookie - Returns a cookie
[23] Find2 - find text in a listbox after the '-'
[25] GetAppName - This function gets the name of the directory imediatly above the current htm file.
[26] UpdateHeader - accumulates amount in target with amount from source - peculiar to batches and movein.
[27] listWindow - puts a list of objects(tenant, prop, etc) in a seperate window
[28] PromptAmount - on double click of amount paid box, puts in amount from amount owed box - peculiar to batches.
[29] EditWindow - puts data from batch receipt screen into a new window for editing - peculiar to batches.
[30] FormatNumber - formats a number with the mask (i.e. 100 -> 100.00)
[31] NonBlank - input box may not be blank
[32] parseNum - strips commas out, executes parseFloat
[33] gotFocus - no op for now
[34] QueryIf - container for call on QueryIf2; for navigation purposes
[35] FT_FinalTest - checks for mandatory fields on sys generated filters
[36] Hand / Help - Changes cursor to a Hand or ? when table cell or image is moused over.
[37] Help for filter screen
[38] OPT_Update - updates boxes on Options screen
[39] SayStates - says the option statements for a state <SELECT
[40] ValidMintMaxt - checks if number is a valid integer & checks if number is between two values MDM000330
[41] MoveIt - moves elements from one list box to an other
[42] CompressIt - Takes out blank elements from a list box
[43] QueryIf2 - this procedure should be in all forms for which you want
the user to be prompted if they want to save a form
the one in here is to prevent errors when the current form
(for what ever reason) doesn't have a QueryIf2
[44] SetFocusOnFirstField - Sets focus(cursor) on the first field of the form (if that field exists)
[45] FormatNumber2 - truncates extra digits from numbers
[46] Round - rounds numbers to 2 digits.
[47] bDelete - Ask the confirmation for delete
[48] Trims spaces before and after string. Usage just as in VB: trim(var.value),
[49] FormatPhoneNum - guess
[50] PageBreak - printer page break
[51] GetToken - Get the specified param (sToken) from string (sURL)
[52] MaxDay - returns max day for given month/year
[53] PromptEndDate - given date and term, return end date (for leases)
[54] ValidateTime - validates time in hh:mm format
[55] CurrentDate - returns string of current date
[56] CurrentTime - returns string of current time
[57] DateAfter - checks if date1 is after date2
[58] QueryString1 - search for a specific name on the Query or Hash strings of the page's URL and return the value.
[59] OpenWindow2 - called by OpenWindow
[60] OpenWindow - opens a new window, used by form like resident/lease charges
[61] GetStyleSheet - gets the stylesheet name from the cookie and writes a string that includes the name.
[62] Filter - shows filter for object that's on screen, if appropriate
[63] ActiveMenu - Menubar uses this script to check if data on a present form has changed before redirecting.
[64] ExitForm - Checks to make sure to save if data has changed.
[65] TabTo - Forms with tabs use this to navigate
[66] ValidFloat - Similar to ValidCurrency, but allow user to specify number of digits to the right of the decimal.
[67] userList - call ysilist with a 'select' and optional property code and/or optional account code
[68] unMaskAcct = strip '-' or '.' out of account field for passing account code to userlist
[69] Get_Real_Asp_Name = returns ASP name for given iType, for filter button purposes
[71] ClearFilterPrompt = clears out propmt field if user blanks out code field
[72] ValidYear - checks if object is valid year, between 1875 and 2199
[73] ValidateSSN - Checks to see if there are the right amount of numbers. It will allow for 2 dashes (just about anywhere but only 2). A "t" or "T" is allowed at the first character for "temporary" SSN's.
[74] ValidateSSN2 - Test SSN for valid characters, the right amount of numbers and formats with dashes. Will allow HUD temporary, HUD psudo and EIN numbers
[75] StripDashesFmSSN - Strips dashes from SSN but leaves one dash if an EIN
[76] ValidateEmail - Validates email addresses.
[77] isValidMoneyFormat - Test if a string is a valid number like 123.12 or -1,234,567.12
[78] nameWindow - forms in frame[2] determine that name of the parent window.
[79] Prompt Term - given 2 dates, returns the month diff
[80] DaysDiff - given 2 dates, returns days diff
[81] show_clock -
[82] isValidInteger - Test if a string is a valid number like 123 or -1,234,567
[83] parseInteger - strips commas (or rather thousand separators) out, executes parseInt
[84] formatInteger - formats a number with the mask (i.e. 100 -> 100.00)
[85] validInteger - checks if number in a field on the form is a valid integer between a min and a max value and formats the number with thousand separators
[86] MaskCateg - formats text with the categ mask (i.e. 110500 -> 1105-00)
[87] addNewNode2Menu - Every time a new record is added this function will added to the nod/tree
[88] ShowMemo - pops up a window of uniform size for memos
[89] getSelectedValue - This function takes a <select> object as input and returns a string holding the selected value
[90] ShowMemo2 - same as ShowMemo but goes directly to memo
[91] ShowMemo3 - same as ShowMemo but goes directly to memo and is for Prospect Contacts
[92] ShowMemo4 - same as ShowMemo but can be called from an ASP page. (needed the ../ in front of iData)
[93] FormatNumberRounded - This function extends function FormatNumber by first rounding the value in numObj
[94] FormatNumber2Rounded - This function extends function FormatNumber2 by first rounding the value in sTest
[95] OpenWindowAsp - Same as OpenWindow but changed location of data.htm due to call from asp
[96] DateAdd(startDate, numDays, numMonths, numYears) - add or subtract days/months/years -ve value will do subtraction
[97] YearAdd(startDate, numYears) - add or subtract years -ve numyears will do subtraction
[98] MonthAdd(startDate, numMonths) - add or subtract months -ve numMonths will do subtraction
[99] DayAdd(startDate, numDays) - add or subtract days -ve numDays will do subtraction
[100] trim function for the built-in JavaScript String object
[101] GoToErrorTab - This function reutrns the user to the the tab where a required field was not completed.
[104] TabClick - For ASP pages with a tabstrip on, when a tab is clicked, hide the div corresponding to the old tab and display the div corresponding to the new tab
[105] AutoSizeWindow - will size a window to the right size based upon it's content.
[106] GetBlankPage - returns the path to /system/blank.htm use with window.open(GetBlankPage,... to prevent secure/nonsecure warnings over SSL (https) connections
[107] GetURL - XmlHTTP based function used by Senior Housing
[108] GetURLXML - XmlHTTP based function used by Senior Housing
[109] Attach Event Handler for IE/ Firefox etc.. browser
[110] Dynamically loading an external JavaScript or CSS file
[112] getElementsWithSameId(elmId, elmType) - This function returns array of all elements with same id
[113] rgbTohex(rgb) - This function convert rgb color to hex
[114] checKKMB
[115] FireEvent - Fire event for browser other than IE
[116] getActiveXObject - Get ActiveX object for all browsers
[117] loadXMLString - Load XML in XML document using DOM Parser
[118] GetString - Get string value from  XMLNode
[119] GetNumber - Get number value from  XMLNode
[120] XmlDateFormat - Get date value from  XMLNode
[121] SetNumericValue - set numeric value
[121] SetValue - set value other than number
[130] removeEventHandler - remove attached handlers 
-----------------------------------------------------------------------------------------------------------*/

//[1]
function MaskAcct(obj, acctlen, acctmask, seperator) {
    /*obj is text box.  obj might have a .isRequired property
    acctlen is length of acct mask not including seperators
    acctmask is the mask (i.e. ????-????)
    seperator is a '-'  or a '.'
    acct masks can have a '-' or a '.' as seperators, but not both
    and may have multiple seperators or no seperators*/


    var sout = "";        // output value
    var idashloc = 0;
    var ss = new String(obj.value);   //converts object to string
    var ilen = ss.length;
    var iSepCount = 0;
    var sTemp = "";


    // check for required field
    if (obj.getAttribute && typeof (obj.getAttribute("isRequired")) == "undefined")
    { obj.getAttribute("isRequired") = false; } // default not required

    if (ss == "") {
        if (obj.getAttribute && obj.getAttribute("isRequired")) { return errorwithtranslation(obj, 'Acct number required') }
    }
    if (ss == "") { return true; }

    //remove seperators from input
    for (i = 0; i <= acctlen; i++) {
        idashloc = ss.indexOf(seperator);
        if (idashloc <= 0) { break; }
        ss = ss.substring(0, idashloc) + ss.substring(idashloc + 1, ss.length);
    }

    //count number of seperators in acctmask
    sTemp = acctmask
    for (i = 0; i <= acctlen; i++) {
        idashloc = sTemp.indexOf(seperator)
        if (idashloc <= 0) { break; }
        sTemp = sTemp.substring(idashloc + 1, sTemp.length)
        iSepCount = iSepCount + 1
    }

    //add zeros to input if input.length <> acctlen
    if (ss.length != acctlen.length) {
        for (i = ss.length; i < acctlen; i++) {
            ss = ss + "0";
        }
    }

    //now, mask it
    i = 0
    idashloc = -1
    while (i < iSepCount) {
        idashloc = acctmask.indexOf(seperator, idashloc + 1)
        if (idashloc <= 0) { break; }
        ss = ss.substring(0, idashloc) + seperator + ss.substring(idashloc, ss.length + 1);
        i += 1
    }


    obj.value = ss;

    return true;
}

//[2]
// Find an element in the list
// Arguments: 1) the select list, 2) the textbox
function Find(list, text) {

    // find the first matching
    if (text.value.length > 0) {
        for (var i = 0; i < list.length; i++) {
            if (list.item(i).text.substr(0, text.value.length).toUpperCase() == text.value.toUpperCase()) {
                list.options[i].selected = true;
                return true;
            }
        }
    }
    return false;
}


//[3]
function error(elem, text, bSelect) {
    // display the first error
    var ss;

    if (typeof (text) == "undefined") { window.alert("Undefined error."); this.select() }
    window.alert(text);
    if (typeof (elem) == "undefined") { return }
    if (elem == "n") { return }
    if (elem.disabled == true) { return }
    if (bSelect != "false") {
        if (bSelect != "combo") {
            window.setTimeout("errorSetFocus('" + elem.name + "')", 30);
        }
    };
    errorfound = true;
}

//To Display Errors with Translation
function errorwithtranslation(elem, text, bSelect){
	var ShareURL;
 	var prefixURL = "";
	
		if (GetSubCookie("Culture", "Translate") != "1") {
			error(elem, text, bSelect);
			return;
		}
	
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
        ShareURL = prefixURL + "pages/SysTranslation.ashx?Text=" + text;
     	jQuery.ajax(
        {
                type: "GET",
                url: ShareURL,
                data: {},
                success: function (data) {
		    HideLoading();
                    var msg=''+data;
                    error(elem, msg, bSelect);
                },
                dataType: "text"
        }

	);
   
}

//Return a translated label
function SetLabelInnerHTMLWithTranslation(elem, text, bSelect){
	var ShareURL;
 	var prefixURL = "";
	
	
		if (GetSubCookie("Culture", "Translate") != "1") {
			elem.innerHTML = text;
			return
		}
	
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
        ShareURL = prefixURL + "pages/SysTranslation.ashx?Text=" + text;
		//alert(ShareURL)
     	jQuery.ajax(
        {
                type: "GET",
                url: ShareURL,
                data: {},
                success: function (data) {
		    HideLoading();
                    var msg=''+data;
                    SetLabelInnerHTML(elem, msg, bSelect);
                },
                dataType: "text"
        }

	);
	elem.innerHTML = text;
	return;
}


function SetLabelInnerHTML(elem, text, bSelect) {
    // display the first error
    var ss;
	
	elem.innerHTML = text

}

//A helper function for the error function.
function errorSetFocus(id) {
    try {
        document.forms[0].elements[id].focus();
        document.forms[0].elements[id].select();
    } catch (e) {
    }
}

//[4]
function Empty(num) {
    if (num == "") return true;
    num = num.toString(); 	/* ensure variable num is of datatype string before we use string routines */
    for (var i = 0; (i < num.length); i++) {
        if (num.charAt(i) == " ") continue;
        else return false;
    }
    return true;
}

//[5]
function ValidLength(item, maxlen) {
    if (Empty(item.value)) return true;
    return (item.value.length <= maxlen);
}

//[6]
function ValidInt(numObj) {
    var sTest = numObj.value;
    var sGUID = GetCookie("bEuroNum");
    var sPattern;
    var bTemp = false;

    /* check for numbers like 123 */
    var re = new RegExp("^(-\\d)?\\d*$");
    bTemp = (re.test(sTest)) ? true : bTemp;

    /* check for numbers like 1,234 and -123,456,789 */
    sPattern = (sGUID == "true") ? "^-?\\d{1,3}(\\.\\d{3})*$" : "^-?\\d{1,3}(\\,\\d{3})*$";
    re.compile(sPattern);
    bTemp = (re.test(sTest)) ? true : bTemp;
    if (!bTemp) {
        errorwithtranslation(numObj, "Invalid number");
    }
    return bTemp;
}

//[7]
function ValidCurrency(numObj, iMin, iMax) {
    var sTest = numObj.value;
    iMin = (iMin == null) ? -100000000000 : iMin;
    iMax = (iMax == null) ? 100000000000 : iMax;

    /* test if number is valid currency format */
    if (Empty(sTest)) { return true; }
    if (!isValidMoneyFormat(sTest, 2)) {
        errorwithtranslation(numObj, "Invalid number.");
        if (typeof event != "undefined" && event != null)
            event.returnValue = false;
        else {
            setTimeout(function() { numObj.focus(); numObj.select(); }, 10);
        }
        return false;
    }

    /* get number back as US format without thousand separator */
    sTest = parseNum(numObj, 2);

    /* test if number is within min and max limits */
    if (!ValidMinMax(sTest, iMin, iMax)) {
        errorwithtranslation(numObj, "Invalid number.");
        if (typeof event != "undefined")
            event.returnValue = false;
        else {
            setTimeout(function() { numObj.focus(); numObj.select(); }, 10);
        }
        return false;
    }

    numObj.value = sTest;
    FormatNumber(numObj);
    return true;
}


//[8]
function ValidateDate(obj)
/*  if optional property .isDay is true, input must be:
mm/dd/yy
mm/dd/yyyy
m/d/yy
m/d/yyyy
mm/d/yy
mm/d/yyyy
m/dd/yy
m/dd/yyyy
mmddyy
mmddyyyy
otherwise, input must be:
mm/yy
mm/yyyy
yyyy/mm
m/yy
m/yyyy
yyyy/m
mmyy
mmyyyy
yyyymm
"/" is the only valid seperator
These are the only known valid inputs. Others might work
but don't count on it (isn't this enough?)
*/
{
    var ilen;
    var sout;
    var yy, mm, dd;
    var tmp;
    var inumsep;
    var imonth, iyear, iday;
    var serr;
    var isep1, isep2;  //holds position of "/"
    var imstart, imlen;
    var idstart, idlen;
    var iystart, iylen;
    var bJapan

    var ss = new String(obj.value);
    var d = new Date();
    var m = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var window = 50;  //year cutoff when yy is passed in (i.e. 49 = 2049, 50 = 1950)

    var sGUID = GetCookie("bEuroDate");
    var sJAPAN = GetCookie("bJapanDate");
	var sDateFormat = GetDateFormat();
	
	
	
    if (sGUID == "true") { bEuro = true }
    else { bEuro = false }

    if (sJAPAN == "true") { bJapan = true }


    ilen = ss.length;
    iday = 0;  //in case is never gets set below

    // check for required field

    if (obj.getAttribute("isRequired") == null || typeof (obj.getAttribute("isRequired")) == "undefined") {
        obj.setAttribute("isRequired", false);   // default not required
    }



    if (ilen == 0) { return true; }

    // check for .isDay
    if (obj.getAttribute("isDay") == null || typeof (obj.getAttribute("isDay")) == "undefined") {
        obj.setAttribute("isDay", false);      // default to not expecting days - month & year only

    }

    //set error message
    if (bEuro == false) {
        if (obj.getAttribute("isDay").toString().toLowerCase() == "true") { serr = "Expecting date in mm/dd/yyyy format." }
        else { serr = "Expecting date in mm/yyyy format." }
    }
    else {
        if (obj.getAttribute("isDay").toString().toLowerCase() == "true") { serr = "Expecting date in dd/mm/yyyy format." }
        else { serr = "Expecting date in mm/yyyy format." }
    }

    if (bJapan == true) {
        if (obj.getAttribute("isDay").toString().toLowerCase() == "true") { serr = "Expecting date in yyyy/mm/dd format." }
        else { serr = "Expecting date in yyyy/mm format." }
    }


    // all chars must be numeric or "/"
    inumsep = 0
	var dtSeparator = '/';
	if ((sDateFormat == '{dd}.{MM}.{yyyy}') && (obj.getAttribute("isDay").toString().toLowerCase() == "true")) {
		dtSeparator = '.';
	}
	
    for (var i = 0; i < ilen; i++) {
        tmp = ss.charAt(i);
        if (tmp == dtSeparator) {
            inumsep = inumsep + 1;
            if (inumsep == 1) { isep1 = i }
            else if (inumsep == 2) { isep2 = i }
        }
    }

    //check for valid number of "/"
    if (obj.getAttribute("isDay").toString().toLowerCase() == "true" && inumsep > 2) { error(obj, serr); return false; }
    else if (!obj.getAttribute("isDay") && inumsep > 1) { errorwithtranslation(obj, serr); return false; }

    if (bJapan != true) {
        //check for valid placement of "/"
        if (inumsep > 0) {
            if (isep1 != 1 && isep1 != 2 && isep1 != 5) { error(obj, serr); return false; }
        }
        if (inumsep > 1) {
            if (isep2 != 3 && isep2 != 4 && isep2 != 5) { error(obj, serr); return false; }
        }
    }
    else {
        //check for valid placement of "/"
        if (inumsep > 0) {
            if (isep1 != 2 && isep1 != 4) { error(obj, serr); return false; }
        }
        if (inumsep > 1) {
            if (isep2 != 4 && isep2 != 5 && isep2 != 6 && isep2 != 7) { error(obj, serr); return false; }
        }
    }


    //set start and length of month, day and year
    if (inumsep == 0) {
        if (ilen == 4) {
            imstart = 0; imlen = 2;
            iystart = 2; iylen = 2;
            if (bJapan == true) {
                iystart = 0; iylen = 2;
                imstart = 2; imlen = 2;
            }
        }
        else if (ilen == 6 && obj.getAttribute("isDay").toString().toLowerCase() == "true") {
            imstart = 0; imlen = 2;
            idstart = 2; idlen = 2;
            iystart = 4; iylen = 2;
            if (bJapan == true) {
                iystart = 0; iylen = 4;
                imstart = 4; imlen = 2;
                idstart = 6; idlen = 2;
            }
        }
        else if (ilen == 6 && obj.getAttribute("isDay").toString().toLowerCase() == "false") {
            imstart = 0; imlen = 2;
            iystart = 2; iylen = 4;
            if (bJapan == true) {
                iystart = 0; iylen = 4;
                imstart = 4; imlen = 2;
            }
        }
        else if (ilen == 8) {
            imstart = 0; imlen = 2;
            idstart = 2; idlen = 2;
            iystart = 4; iylen = 4;
            if (bJapan == true) {
                iystart = 0; iylen = 4;
                imstart = 4; imlen = 2;
                idstart = 6; idlen = 2;
            }
        }
    }
    else if (inumsep == 1) {
        imstart = 0; imlen = isep1;
        iystart = isep1 + 1; iylen = ilen - isep1 - 1;
        if (bJapan == true) {
            iystart = 0; iylen = isep1;
            imstart = isep1 + 1; imlen = ilen - isep1 - 1;
        }
    }
    else if (inumsep == 2) {
        imstart = 0; imlen = isep1;
        idstart = isep1 + 1; idlen = isep2 - isep1 - 1;
        iystart = isep2 + 1; iylen = ilen - isep2 - 1;
        if (bJapan == true) {
            iystart = 0; imlen = isep1;
            imstart = isep1 + 1; idlen = isep2 - isep1 - 1;
            idstart = isep2 + 1; iylen = ilen - isep2 - 1;
        }
    }

    if (obj.getAttribute("isDay").toString().toLowerCase() == "true") {
        if (bEuro == true && obj.getAttribute("isDay").toString().toLowerCase() == "true") {
            //switch it all around
            ii = imstart;
            ij = imlen;
            imstart = idstart;
            imlen = idlen;
            idstart = ii;
            idlen = ij;
        }
        if (sDateFormat == '{dd}.{MM}.{yyyy}' && obj.getAttribute("isDay").toString().toLowerCase() == "true") {
            //switch it all around
            ii = imstart;
            ij = imlen;
            imstart = idstart;
            imlen = idlen;
            idstart = ii;
            idlen = ij;
		}
    }

    if (obj.getAttribute("isDay").toString().toLowerCase() == "true") {
        if (bJapan == true && obj.getAttribute("isDay").toString().toLowerCase() == "true") {
            //switch it all around
            if (inumsep == 2) {
                iystart = 0; iylen = isep1;
                imstart = isep1 + 1; imlen = isep2 - isep1 - 1;
                idstart = isep2 + 1; idlen = ilen - isep2 - 1;
            }
        }
    }


    imonth = parseInt(ss.substr(imstart, imlen), 10);  //10 param sets to base 10 (default is 8!)
    //without it, "08" and "09" returned 0
    iyear = parseInt(ss.substr(iystart, iylen), 10);
    if (obj.getAttribute("isDay").toString().toLowerCase() == "true") { iday = parseInt(ss.substr(idstart, idlen), 10) }

    if (isNaN(imonth) || isNaN(iyear) || isNaN(iday)) { error(obj, serr); return false; }

    if (obj.getAttribute("isDay").toString().toLowerCase() == "true") { serr = "Date out of range." } else { serr = "Expecting date in mm/yy format." }
    if (iylen != 4 && iylen != 2) { error(obj, serr); return false; }
    if (imlen != 1 && imlen != 2) { error(obj, serr); return false; }
    if (obj.getAttribute("isDay").toString().toLowerCase() == "true") {
        if (idlen != 1 && idlen != 2) { error(obj, serr); return false; }
    }

    if (imonth < 1 || imonth > 12) { error(obj, serr); return false; }
    if (iylen == 4 && (iyear < 1875 || iyear > 2199)) { error(obj, serr); return false; }
    //SA052802  change year range lower limit from 1900 to 1875 for affordable tenants birthdates
    //MRB	      change year range upper limit from 2100 to 2199 for leases in good old England
    if (iylen == 2 && (iyear < 0 || iyear > 99)) { error(obj, serr); return false; }
    if ((obj.getAttribute("isDay").toString().toLowerCase() == "true") && (iday < 1 || iday > 31)) { error(obj, serr); return false; }




    mm = imonth;
    mm = mm > 9 ? mm : "0" + mm.toString();
    dd = iday;
    dd = dd > 9 ? dd : "0" + dd.toString();
    yy = iyear;
    yy = yy > 9 ? yy : "0" + yy.toString();

    if (iyear < 1000) {
        if (parseInt(yy) < window) { yy = "20" + yy }
        else { yy = "19" + yy }
        iyear = parseInt(yy)
    }


    //30 days hath November...
    if ((imonth == 1) || (imonth == 3) || (imonth == 5) || (imonth == 7) || (imonth == 8) || (imonth == 10) || (imonth == 12)) {
        if (iday > 31) { error(obj, serr); return false; }
    }
    else if ((imonth == 4) || (imonth == 6) || (imonth == 9) || (imonth == 11)) {
        if (iday > 30) { error(obj, serr); return false; }
    }
    else if (imonth == 2) {
        //leap year, every 4 years, except centuries that are not evenly
        //divisible by 100
        imod = iyear % 4
        imod2 = iyear % 100
        if (imod == 0 && ((imod2 != 0) || (iyear % 400 == 0))) {
            if (iday > 29) { error(obj, serr); return false; }
        }
        else {
            if (iday > 28) { error(obj, serr); return false; }
        }
    }

    if (bEuro == true) {
        if (obj.getAttribute("isDay").toString().toLowerCase() == "true") {
            sout = dd + "/" + mm + "/" + yy;
        }
        else {
            sout = mm + "/" + yy;
        }
    }
    else {
        if (obj.getAttribute("isDay").toString().toLowerCase() == "true") {
            sout = mm + "/" + dd + "/" + yy;
        }
        else {
            sout = mm + "/" + yy;
        }

    }

    if (bJapan == true) {
        if (obj.getAttribute("isDay").toString().toLowerCase() == "true") {
            sout = yy + "/" + mm + "/" + dd;
        }
        else {
            sout = yyyy + "/" + mm;
        }
    }
	
	if (obj.getAttribute("isDay").toString().toLowerCase() == "true") {
		if (sDateFormat == '{dd}.{MM}.{yyyy}') {
			sout = dd + "." + mm + "." + yy;
		}
	}



    obj.value = sout;
    return true;
}


//[9]
function ValidPhone(num) {
    return true;  // todo
    if (Empty(num)) return true;
    for (var i = 0; (i < num.length); i++) {
        if (num.charAt(i) == " ") continue;
        if ((num.charAt(i) >= "0") && (num.charAt(i) <= "9")) continue;
        return false;
    }
    return true;
}

//[12]
function ValidMinMax(num, mini, maxi) {

    if (Empty(num)) { return true; }
    return ((num >= mini) && (num <= maxi))
}

//[13]
function ValidYesNo(num) {
    if (Empty(num)) return true;
    if ((num == "Yes") || (num == "No")) return true;
    return false
}



//[14]
// generalized menu write function
//Menu background elements
function bgcolorin(elem, name) {

    elem.style.backgroundColor = GetStyle("SPAN.tree_line_highlight", "background-Color")
    elem.style.cursor = "pointer"
}
function bgcolorout(elem) {
    elem.style.backgroundColor = GetStyle("SPAN.tree_line", "background-Color")
}
function bgcolorclick(elem) {
    elem.style.backgroundColor = GetStyle("SPAN.tree_line", "background-Color")
}

function bgcolorup(path) {
    parent.filter.window.document.location.href = "iData.asp?WCI=begin&action=FILTER&select=" + path;
}


//[15]
function nav0(theValue, AppName) {
    // Specifies submit action depending on type of form
    // E==Form, F==Filter
    // 1 = new
    // 2 = save
    //3 = jump to
    var bdata = 0;
    var errorfound = false
    var ss = "";
    if (theValue == 2 || theValue == 15) {
        if (typeof (document.forms[0].sJump) != "undefined") { document.forms[0].sJump.value = "" }
        if (!FT_FinalTest()) { return false };
        if (typeof (document.forms[0].BSAVE) != "undefined") {
            document.forms[0].BSAVE.value = "1"
        }
    }
    else {
        //if new or jump to, we create our version of the built in window that ExitForm will display
        //because if they say they don't want to save data, we need to set BDATACHANGED = 0
        //otherwise, the DLL will save their data.
        if (typeof (document.forms[0].BDATACHANGED) != "undefined") {
            bdata = document.forms[0].BDATACHANGED.value
            if (bdata == 1) {
                ss = "You are about to navigate away from this page?"
                ss = ss + String.fromCharCode(10, 13)
                ss = ss + String.fromCharCode(10, 13)
                ss = ss + "Your data has NOT been saved!"
                ss = ss + String.fromCharCode(10, 13)
                ss = ss + String.fromCharCode(10, 13)
                ss = ss + "Press OK to continue, or Cancel to stay on the current page."
                errorfound = (confirm(ss));
                if (!errorfound) {
                    return false;
                }
                else {
                    if (typeof (document.forms[0].BSAVE) != "undefined") {
                        document.forms[0].BDATACHANGED.value = "0"
                        document.forms[0].BSAVE.value = "1"
                    }
                }
            }
        }
    }

    if ((typeof (document.forms[0].DONTSAVE) != "undefined") && (document.forms[0].DONTSAVE.value != "0")) {
        document.forms[0].BDATACHANGED.value = "0";
        window.alert("Form will not be saved");
    }

    if (theValue != 3) {
        if (typeof (document.forms[0].BPOSTED) != "undefined") {
            if (document.forms[0].BPOSTED.value != "0") {
                window.alert("This page has already been sent.");
                parent.location.href = "pages/Menu.aspx";
            }
            else {
                document.forms[0].BPOSTED.value = "-1";
            }
        }
    }


    if (AppName == "iVista") { return errorfound; }
    if (theValue == 2) { theValue = 0 }   //reset to 0 (display)
    document.forms[0].IFUNCTION.value = theValue;
    document.forms[0].ACTION.value = "E";
    if (theValue == 11) { document.forms[0].ACTION.value = "F"; }
    if (theValue == 15) { document.forms[0].BDATACHANGED.value = "0"; }
    if (typeof (document.forms[0].BSAVECLICK) != "undefined") {
        if (document.forms[0].BSAVECLICK.value != "1") {
            document.forms[0].BSAVECLICK.value = "1";
        }
        else {
            return true;
        }
    }
    if (typeof (document.forms[0].MODAL) != "undefined") {
        if (document.forms[0].MODAL.value == "-1") // in a modal window, so close and go back to opener window
        {
            ss = parseInt(document.forms[0].elements["ORIGTRAN"].value) + 2 // this is new trans just saved
            document.forms[0].submit();
            //document.forms[0].elements["BDATACHANGED"].value = "0"
            //Window.opener.location.href = receipt.SMOD.value + ".ASP?WCI=begin&Action=D&iType=15&hTran=" + ss
            //Window.close();
            return;
        }
        else
            document.forms[0].submit();
    }
    else
        document.forms[0].submit();
}


//[16]
function gotChange() {

    document.forms[0].BDATACHANGED.value = "1";
}

//[20]
// Create a test window
function MenuWindow(url) {
    return window.open(url, 'newWin', 'toolbar=no,resizable=yes,location=no,scrollbars=no,width=370,height=300,name=test')
}

//[21]
// Create a cookie with the specified name and value.
function SetCookie(sName, sValue) {
    //  document.cookie = sName + "=" + escape(sValue) + ";";
    var d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    document.cookie = sName + "=" + escape(sValue) + ";" + "expires=" + d;
}

//[22]
// Get the specified cookie
function GetCookie(sCookie) {
    // cookies are separated by semicolons
    var aCookie = document.cookie.split(";");
    for (var i = 0; i < aCookie.length; i++) {
        // a name/value pair (a crumb) is separated by an equal sign
        var aCrumb = aCookie[i].split("=");
        if (sCookie.replace(" ", "") == unescape(aCrumb[0].replace(" ", "")))
            return unescape(aCrumb[1]);
    }

    return null;
}


//[23]
// find text in a listbox after the '-'
function Find2(list, text) {
    // find the first matching
    if (text.value.length > 0) {
        for (var i = 0; i < list.length; i++) {
            if (list.item(i).text.toUpperCase().indexOf(text.value.toUpperCase()) > 0) {
                list.options[i].selected = true;
                return true;
            }
        }
    }
    return false;
}


//[25]
// This function gets the name of the directory imediatly above the current htm file.
function GetAppName() {
    var temp;

    temp = window.location.href;
    temp = temp.substr(0, temp.lastIndexOf("/"));
    temp = temp.substr(temp.lastIndexOf("/") + 1);

    return temp;
}

//[27]
function listWindow(url, fieldname, bsub) {

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

    //    newWindow.location = url
    //    if (typeof newWindow != 'unknown') {
    //        newWindow.focus();
    //    }

    OpenLookupListInDialogBox(url, GetToken("label", url) != null ? GetToken("label", url) : (fieldname ? fieldname : ""), "");

    if (bChangedSave == 1) {
        document.forms[0].elements["BSAVE"].value == "0"
    }

}


//[30]
function FormatNumber(numObj) {
    /* called from ValidateCurrency
    2100    -> 2,100.00
    2100.   -> 2,100.00
    2100.1  -> 2,100.10
    2100.10 -> 2,100.10

	   This function always assume an US number format (. dot as decimal separator) as input
    */

    var sTemp = numObj.value;
    var sNoDecimals = GetCookie("bNoDecimals");

    var sDigits = "00";

    /* strip thousand separators */
    var re = new RegExp("\\,", "g");
    sTemp = sTemp.replace(re, "");

    /* test for decimal part */
    re.compile("^(-?\\d*)\\.(\\d{0,2})");
    if (re.test(sTemp)) {
        sTemp = ((RegExp.$1 == "-") || (RegExp.$1 == "")) ? RegExp.$1 + "0" : RegExp.$1;
        sDigits = (RegExp.$2 + sDigits).substr(0, 2);
    }

    var sGUID = GetCookie("bEuroNum");
    var sThousandSep = (sGUID == "true") ? "." : ",";
    var sFractionSep = (sGUID == "true") ? "," : ".";

    /* put in thousand separators */
    re.compile("(-?\\d+)(\\d{3})");
    while (re.test(sTemp)) {
        sTemp = sTemp.replace(re, "$1" + sThousandSep + "$2");
    }

    /* put everything together again */
    if (sNoDecimals == "true") { sDigits = ""; sFractionSep = ""; }
    numObj.value = sTemp + sFractionSep + sDigits;

    return;
}

//[31]
function NonBlank(obj) {
    if (obj.value == "") { errorwithtranslation(obj, "Field may not be left blank"); return true; }
}

//[32]
function parseNum(numObj, iDigits) {
    /* strips commas out of numbers, does a parseFloat on it. */

    var sTemp = numObj.value;
    iDigits = (iDigits == null) ? 2 : iDigits;

    if ((!isValidMoneyFormat(sTemp, iDigits)) || (sTemp == "")) {
        /* NOTE that "return false;" actually is the same as "return 0;" */
        return false;
    }

    var sGUID = GetCookie("bEuroNum");
    var sThousandSep = (sGUID == "true") ? "\\." : ",";
    var re = new RegExp(sThousandSep, "g");
    sTemp = sTemp.replace(re, "");

    /* special considerations for european numbers */
    sTemp = (sGUID == "true") ? sTemp.replace(",", ".") : sTemp;

    return parseFloat(sTemp);
}

//[33]
function gotFocus(theObject) {

}

//[34]
function QueryIf(ref) {

    parent.frames[1].QueryIf2(ref);
    return false;

}


//[35]
function FT_FinalTest() {
    var bSkip = document.getElementById("bSkipFT_FinalTest")
    if (!(bSkip == null) && bSkip.value == -1) { return true }
    var InputCollection = document.getElementsByTagName("INPUT")

    for (i = 0; i < InputCollection.length; i++) {

        if (InputCollection[i].getAttribute("mandatory") == "true" && trim(InputCollection[i].value) == "" && InputCollection[i].style.visibility != "hidden") {
            errorwithtranslation(InputCollection[i], 'Field may not be blank'); return false;
        }
    }

    var SelectCollection = document.getElementsByTagName("SELECT")
    for (i = 0; i < SelectCollection.length; i++) {
        if (SelectCollection[i].getAttribute("mandatory") == "true") {
            if (SelectCollection[i].type == "select-multiple") {
                var bb = false;
                for (j = 0; j < SelectCollection[i].options.length; j++) {
                    if (SelectCollection[i].options[j].selected == true && SelectCollection[i].options[j].text != "" && SelectCollection[i].style.visibility != "hidden") {
                        bb = true
                        break
                    }
                }
                if (bb == false) { errorwithtranslation(SelectCollection[i], 'Field may not be blank'); return false }
            }
            else {
                var dd = SelectCollection[i];
                /* Check for blank */
                if (dd.options.length > 0 && dd.options[dd.options.selectedIndex].text.trim() == "" && dd.parentNode.style.visibility!="hidden") { errorwithtranslation(SelectCollection[i], 'Field may not be blank'); return false }
            }
        }

        /* Check for invalid selection */
        var dd = SelectCollection[i];
        if ((dd.options.selectedIndex > -1) && (dd.options[dd.options.selectedIndex].value.trim() == "ysiInvalidValue")) {
            error(SelectCollection[i], 'The selected value in the drop down list is invalid. Please select a valid value.');
            return false
        }
    }
    var TextAreaCollection = document.getElementsByTagName("TEXTAREA")

    for (i = 0; i < TextAreaCollection.length; i++) {

        if (TextAreaCollection[i].getAttribute("mandatory") == "true" && TextAreaCollection[i].value == "" && TextAreaCollection[i].style.visibility != "hidden") {
            errorwithtranslation(TextAreaCollection[i], 'Field may not be blank'); return false;
        }
    }
    return true;

}

//[36]
//send "(this)" from function call
function Hand(elem) {
    elem.style.cursor = "pointer";
}


function Help(elem) {
    elem.style.cursor = "help";
}


//[37]
function FilterHelp(parm, link) {
    if (link != "true") {
        newWindow = window.open('fltrhelp.asp?sfile=' + parm + '&link=' + link, 'newWin', 'toolbar=yes,resizable=yes,location=yes,scrollbars=yes,width=450,height=550,name=FltrHelp')

        if (typeof newWindow != 'unknown') { newWindow.focus(); }
    }
    else {
        location.href = "fltrhelp.asp?sfile=" + parm + "&link=" + link
    }
    return newWindow;
}

//Help Function for asp forms and filters that reside in the forms directory
function FormFilterHelp(parm, link) {
    if (link != "true") {
        newWindow = window.open('../fltrhelp.asp?sfile=' + parm + '&link=' + link, 'newWin', 'toolbar=yes,resizable=yes,location=yes,scrollbars=yes,width=450,height=550,name=FltrHelp')

        if (typeof newWindow != 'unknown') { newWindow.focus(); }
    }
    else {
        location.href = "../fltrhelp.asp?sfile=" + parm + "&link=" + link
    }
    return newWindow;
}


function openHelpWindow() {
    help = window.open('../help/wwhelp.htm', '', 'toolbar=yes,resizable=yes,location=no,scrollbars=yes,width=750,height=550,top=0,left=0')
}

function openHelpWindowContext(HelpAlias) {
    help = window.open('../help/wwhelp.htm?context=pmt_usr&topic=' + HelpAlias, '', 'toolbar=yes,resizable=yes,location=no,scrollbars=yes,width=750,height=550,top=0,left=0')
}

//[39]
//Say the state <OPTION statments
//This functions goes between the <SELECT> and </SELECT> statements
function SayStates() {
    var ss;
    var states = new Array(
  "AL>Alabama",
  "AK>Alaska",
  "AB>Alberta",
  "AZ>Arizona",
  "AR>Arkansas",
  "BC>British Columbia",
  "CA>California",
  "CO>Colorado",
  "CT>Connecticut",
  "DE>Delaware",
  "FL>Florida",
  "GA>Georgia",
  "HI>Hawaii",
  "ID>Idaho",
  "IL>Illinois",
  "IN>Indiana",
  "IA>Iowa",
  "KS>Kansas",
  "KY>Kentucky",
  "LA>Louisiana",
  "ME>Maine",
  "MB>Manitoba",
  "MD>Maryland",
  "MA>Massachusetts",
  "MI>Michigan",
  "MN>Minnesota",
  "MS>Mississippi",
  "MO>Missouri",
  "MT>Montana",
  "NE>Nebraska",
  "NV>Nevada",
  "NB>New Brunswick",
  "NF>Newfoundland",
  "NH>New Hampshire",
  "NJ>New Jersey",
  "NM>New Mexico",
  "NY>New York",
  "NC>North Carolina",
  "ND>North Dakota",
  "NT>Northwest Territories",
  "NS>Nova Scotia",
  "OH>Ohio",
  "OK>Oklahoma",
  "ON>Ontario",
  "OR>Oregon",
  "PA>Pennsylvania",
  "PE>Prince Edward Island",
  "PQ>Quebec",
  "RI>Rhode Island",
  "SK>Saskatchewan",
  "SC>South Carolina",
  "SD>South Dakota",
  "TN>Tennessee",
  "TX>Texas",
  "UT>Utah",
  "VT>Vermont",
  "VA>Virginia",
  "WA>Washington",
  "DC>Washington DC",
  "WV>West Virginia",
  "WI>Wisconsin",
  "WY>Wyoming",
  "YT>Yukon Territory");

    document.write("<OPTION selected value=% >North America</OPTION>");
    for (ss in states) {
        document.write("<OPTION value=" + states[ss] + "</OPTION>");
    }
}

//[40]
function ValidMintMaxt(num, mini, maxi) {
    var ss = new String(num.value);   //converts object to string
    var ilen = ss.length;
    {
        for (var i = 0; i < ilen; i++) {
            if ((ss.charAt(i) < "0") || (ss.charAt(i) > "9")) { error(num, "Invalid number"); return false; }
        }

        if (parseInt(ss) < mini || parseInt(ss) > maxi) {
            //alert("Expecting number in range " + mini + " to " + maxi );
            error(num, "Expecting number in range " + mini + " to " + maxi, "false");
            document.forms[0].elements[num.name].focus();
            return false; ;
        }
    }
}

//[41]
function MoveIt(objSource, objTarget) {
    var iSourceLen
    var iTargetLen

    iSourceLen = objSource.length - 1
    iTargetLen = objTarget.length - 1
    for (i = 0; i <= iSourceLen; i++) {
        if (objSource[i].selected == true) {
            for (j = 0; j <= iTargetLen; j++) {
                if (objTarget[j].text == "") {
                    objTarget[j].text = objSource[i].text
                    objTarget[j].value = objSource[i].value
                    objSource[i].text = ""
                    objSource[i].value = ""
                    break
                }
            }
        }
    }
    CompressIt(objSource)
}

//[42]
function CompressIt(obj) {
    //compress the obj array
    var iLen
    var i
    var i2
    var i3

    iLen = obj.length - 1
    i = -1
    do {
        i = i + 1
        if (obj[i].text == "") {
            bNoMore = -1
            for (i2 = i; i2 <= iLen; i2++) {
                if (obj[i2].text != "") {
                    bNoMore = 0
                    for (i3 = 0; i3 <= iLen - 1 - i; i3++) {
                        obj[i + i3].text = obj[i + i3 + 1].text
                        obj[i + i3].value = obj[i + i3 + 1].value
                    }
                    i = -1  //reset loop to first list item
                    break
                }
            }
            if (bNoMore == -1) { return }
        }
    }
    while (i < iLen);
}

//[43]
function QueryIf2(ref, AppName) {
    var bdata = "0";
    var bsaveable = "-1"; //TR26529
    var errorfound = false
    if (typeof (document.forms[0].elements["SAVEABLE"]) != "undefined") {//TR26529
        bsaveable = document.forms[0].elements["SAVEABLE"].value; //TR26529
    } //TR26529
    if (typeof (document.forms[0].elements["BDATACHANGED"]) != "undefined") {
        bdata = document.forms[0].elements["BDATACHANGED"].value;
        if ((bdata == "1") && (bsaveable != "0")) {//if (bdata == "1") {TR26529
            errorfound = (confirm("Do you wish to save changed data ?"));
            if (errorfound) {
                if (AppName == "iVista") { document.forms[0].sAction.value = "Save"; }
                document.forms[0].submit();
                return;
            }
        }
    }
    location.href = ref;
}

//[44]
function SetFocusOnFirstField(txtFormName, txtFirstFieldName) {
    //Set Focus on the First Field on the Form

    if (typeof (eval("document.forms['" + txtFormName + "']." + txtFirstFieldName)) == "undefined") { return; };
    if (eval("document.forms['" + txtFormName + "']." + txtFirstFieldName + '.disabled') == true) { return }
    if (eval("document.forms['" + txtFormName + "']." + txtFirstFieldName)) {
        eval("document.forms['" + txtFormName + "']." + txtFirstFieldName + '.focus()');
    }
}

//[45]
function FormatNumber2(sTest) {
    /*
    2100.0000001    -> 2100.00

	   This function always assume an US number format (. dot as decimal separator) as input
    */

    var iDigits = "00";

    /* test for decimal part */
    var re = new RegExp("(-?[0-9\\,]*)\\.?(\\d*)");
    if (re.test(sTest)) {
        sTest = RegExp.$1;
        iDigits = (RegExp.$2 + iDigits).substr(0, 2);
    }

    var sGUID = GetCookie("bEuroNum");
    var sFractionSep = (sGUID == "true") ? "," : ".";

    /* put everything together again */
    return (sTest + sFractionSep + iDigits);
}






//[46]
function Round(num) {


    return Math.round((num) * 100) / 100

}

//[47]
//Ask the confirmation for delete
function bDelete() {
    bok = (confirm("Are you sure you want to delete this ?"));
    return bok;
}

//[48]
//Trims spaces before and after string. Usage trim(var.value)
function trim(inputStringTrim) {
    fixedTrim = "";
    if (typeof (inputStringTrim) == "undefined" || inputStringTrim == "") { return ""; }
    for (x = 0; x < inputStringTrim.length; x++) {
        ch = inputStringTrim.charAt(x);
        if (ch != " ") break;
    }
    for (y = inputStringTrim.length - 1; y >= 0; y--) {
        ch = inputStringTrim.charAt(y);
        if (ch != " ") break;
    }
    if (x > y)
    { fixedTrim = "" }
    else
    { fixedTrim = inputStringTrim.substr(x, y - x + 1) };
    return fixedTrim;
}

//[49]
function FormatPhoneNum(txtFieldName, PhoneNum) {
    var sPhoneNum = "";
    var sNewPhoneNum = "";
    var sOrigPhoneNum = PhoneNum.value;
	//var sGUID = GetCookie("BINTERNATIONAL");
    //if (sGUID == "true") { return }
		//get the country drop down and region drop down
	var Country = document.getElementById("AddressBlock_Country");
	var Region = document.getElementById("AddressBlock_Region");
	if (typeof (Country) != 'undefined' && Country != null && typeof (Region) != 'undefined' && Region != null) {
        //Set the region drop down based on the country
		Region.value = Country.options[Country.selectedIndex].text;		
	
		//Get the Region value to use in phone format
		var iRegion=Region.options[Region.selectedIndex].text;
		//If region does not equal to US=1 or Canada=2 keep the user entered format, otherwise continue with US style phone format
		if (!(iRegion == 1 || iRegion == 2)){return}
	}
	
    if (Empty(PhoneNum.value)) {
        PhoneNum.value = "";
        return true;
    }
	if (txtFieldName == '') { txtFieldName = PhoneNum.name }
    /* --loop through to get just the numbers and not special characters */
    for (var i = 0; i <= PhoneNum.value.length; i++) {
        if ((PhoneNum.value.charAt(i) >= "0") && (PhoneNum.value.charAt(i) <= "9")) {
            sPhoneNum = sPhoneNum + PhoneNum.value.charAt(i);
        }
    }
    if (sPhoneNum != "") {
        if (sPhoneNum.substring(7, 15) == "") {
            sNewPhoneNum = sPhoneNum.substring(0, 3) + "-" + sPhoneNum.substring(3, 7);
        }
        else {
            sNewPhoneNum = '(' + sPhoneNum.substring(0, 3) + ') ' + sPhoneNum.substring(3, 6) + "-" + sPhoneNum.substring(6, 10);
            if (sPhoneNum.substring(10, 15) != "") { sNewPhoneNum = sNewPhoneNum + " x" + sPhoneNum.substring(10, 15); }
        }
    }
    else  /* Display error message */
    {
        return errorwithtranslation(PhoneNum, "Not a valid Phone Number");
    }

    document.forms[0].elements[txtFieldName].value = sNewPhoneNum;

    if (sOrigPhoneNum != sNewPhoneNum) { gotChange(); }
}


//[50]
// printer page break
function PageBreak() {
    document.write("<p class='pagebreak'>");
}

//[51]
// Get the specified param (sToken) from string (sURL)
function GetToken(sToken, sURL) {

    if (sURL.indexOf("?") > -1) {
        sURL = sURL.substr(sURL.indexOf("?") + 1);
    }
    var aCookie = sURL.split("&");


    for (var i = 0; i < aCookie.length; i++) {
        // a name/value pair (a crumb) is separated by an equal sign
        var aCrumb = aCookie[i].split("=");
        sToken = sToken.toUpperCase();
        aCrumb[0] = aCrumb[0].toUpperCase();
        if (sToken.replace(" ", "") == aCrumb[0].replace(" ", ""))
            return unescape(aCrumb[1]);
    }

    return null;
}

//[52]
function MaxDay(imonth, iyear) {
    //returns max day of month
    if ((imonth == 1) || (imonth == 3) || (imonth == 5) || (imonth == 7) || (imonth == 8) || (imonth == 10) || (imonth == 12))
    { return 31; }
    else if ((imonth == 4) || (imonth == 6) || (imonth == 9) || (imonth == 11))
    { return 30; }
    else if (imonth == 2) {
        //leap year, every 4 years, except centuries that are not evenly
        //divisible by 100
        imod = iyear % 4
        imod2 = iyear % 100
        if (imod == 0 && ((imod2 != 0) || (iyear % 400 == 0)))
        { return 29; }
        else
        { return 28; }
    }
}

//[53]
function PromptEndDate(start, term, obj, type, rounddate) {
    var dt = new Date(start.value)
    var ii = new Number(term.value);    //term in months
    var itype = new Number(type.value);
    var irounddate = new Number(rounddate.value);

    //If you don't set the day to 1 unexpected behavior happens when
    //you add 1 month to for example 1/31. The date will be 3/3 instead of 2/28!

    var month = 0;
    var day = 0;
    var year = 0;

    if (ii == 0) { return }
    if (isNaN(dt)) { return }
    if (dt <= 0) { return }

    ii = dt.getMonth() + ii;

    if (itype == 0) {  	    // None
        day = dt.getDate()
        day = day - 1
    } else if (itype == 1) {  //EOM
        if (dt.getDate() > irounddate) {
            ii = ii + 1   // Bump the month up
        }
        day = 0
    } else {                  //Previous EOM
        day = 0
    };

    dt.setDate(1);
    if (day == 0) {
        dt.setMonth(ii)
    } else {
        dt.setMonth(ii + 1)
    };
    month = dt.getMonth()
    year = dt.getFullYear()
    if (month == 0) { month = 12; year = year - 1 }
    if (day == 0) { day = MaxDay(month, year) }
    if (day > MaxDay(month, year)) { day = MaxDay(month, year) }
    if (month < 10) { month = "0" + month };  //added for YSI.Net validation. 1 Character months were failing.
    if (day < 10) { day = "0" + day }; 			//here too.

    ss = month + "/" + day + "/" + year;
    obj.value = ss;
}
//[54]
function ValidateTime(sTime) {
    var iColon = 0;
    var iBeforeNum = 0;
    var iAfterNum = 0;
    var iFoundColon = 0;
    var sAfterNum = ''
    var sBeforeNum = ''
    var s1 = "";
    var ss = new String(sTime.value);   //converts object to string

    if (Empty(ss)) { return true; }
    if (ss.indexOf(":") == -1) {
        if (ss.length == 3) { ss = ss.substring(0, 1) + ":" + ss.substring(1, 3) }
        else if (ss.length == 4) { ss = ss.substring(0, 2) + ":" + ss.substring(2, 4) }
    }

    for (var i = 0; (i < ss.length); i++) {
        if (ss.charAt(i) == ":") {
            iColon = iColon + 1;
            if (iColon > 1) return error(sTime, "Invalid time.");        // only allow one colon
            if ((i != 1) && (i != 2)) return error(sTime, "Invalid time.");  //colon in correct position
            iFoundColon = 1;
        }
        else {
            s1 = ss.charAt(i)
            s1 = s1.toUpperCase()
            //only allow number or am/pm
            if (s1 >= "0" && s1 <= "9") {
                if (iFoundColon == 1) { iAfterNum = iAfterNum + 1; sAfterNum = sAfterNum + ss.charAt(i) }
                else { iBeforeNum = iBeforeNum + 1; sBeforeNum = sBeforeNum + ss.charAt(i) }
            }
            else if (s1 == "A" || s1 == "P" || s1 == "M" || s1 == " ") { } //OK
            else { return error(sTime, "Invalid time."); }
        }
        //		if (i > 5) return error(sTime, "Invalid time.");
    }
    if (iAfterNum != 2) return error(sTime, "Invalid time.");
    if (iBeforeNum == 1) {
        if ((sBeforeNum >= "1") && (sBeforeNum <= "9")) { }
        else { return error(sTime, "Invalid time."); }
    }
    else {
        if ((sBeforeNum >= "01") && (sBeforeNum <= "12")) { }
        else { return error(sTime, "Invalid time."); }
    }
    if ((sAfterNum >= "0") && (sAfterNum <= "59")) { }
    else { return error(sTime, "Invalid time."); }
    sTime.value = ss
    return true;
}

//[55]
function CurrentDate() {
    var dt = new Date()
    var month = 0;
    var day = 0;
    var year = 0;
    var ss;

    month = dt.getMonth() + 1
    year = dt.getFullYear()
    day = dt.getDate()
    ss = month + "/" + day + "/" + year;
    return ss;

}

//[56]
function CurrentTime() {
    var dt = new Date();
    var hour = 0;
    var minute = 0;
    var ampm;
    var ss;
    var zero = "";

    hour = dt.getHours()
    if (hour > 12) { hour = hour - 12; ampm = " PM" }
    else { ampm = " AM" }
    minute = dt.getMinutes()
    if (minute <= 9) { zero = "0" }
    ss = hour + ":" + zero + minute + ampm
    return ss
}

//[57]
function DateAfter(sdt1, sdt2) {
    //returns true is sdt1 is after sdt2
    var sGUID = GetCookie("bEuroDate");

    if (sGUID == "true") {
        var ss1;
        var ss2;
        ss1 = sdt1.value.substring(3, 5) + '/' + sdt1.value.substring(0, 2) + '/' + sdt1.value.substring(6, 10)
        ss2 = sdt2.value.substring(3, 5) + '/' + sdt2.value.substring(0, 2) + '/' + sdt2.value.substring(6, 10)
        var dt1 = new Date(ss1)
        var dt2 = new Date(ss2)

        if (dt1 >= dt2) {
            return false;
        }
        return true;
    };

    var dt1 = new Date(sdt1.value)
    var dt2 = new Date(sdt2.value)

    if (dt1 >= dt2) { return false; }
    return true;
}
//[58]
function QueryString1(param) {
    var begin, end;
    if (self.location.search.length > 1) {
        begin = self.location.search.indexOf(param) + param.length + 1;
        end = self.location.search.indexOf("&", begin);
        if (end == (-1)) end = self.location.search.length;
        return (self.location.search.substring(begin, end));
    }
    else if (self.location.hash.length > 1) {
        begin = self.location.hash.indexOf(param) + param.length + 1;
        end = self.location.hash.indexOf("&", begin);
        if (end == (-1)) end = self.location.hash.length;
        return (self.location.hash.substring(begin, end));
    }
    else return ("");
}

//[59]
function OpenWindow2(url) {
    try {
        dataWin.focus();
        dataWin.frames[0].location = url;
        window.clearInterval(intervalID);
    } catch (any) {
    }
}

//[60]
function OpenWindow(url, parm) {
    if (CheckUserBrowserAgnostic()) {
        if (typeof OpenNewWindowInDialogBox != "undefined") OpenNewWindowInDialogBox(URL, "");
    } else {
        //use this function for all sub data forms (like resident/lease charges)
        //this function uses setTimeout method to wait 1000 msecs after the window.open command
        //to give the window time to get fully created.
        ss = "";
        bGotError = 0;
        ii = 1;
        ij = 0;
        sparm = "";

        if (typeof (parm) == "undefined") {
            //find the middle of the screen based on height and width
            if (window.screen) {
                var ah = screen.availHeight - 30;
                var aw = screen.availWidth - 10;

                var xc = (aw - 780) / 2;
                var yc = (ah - 425) / 2;

                str = ",left=" + xc + ",screenX=" + xc;
                str = str + ",top=" + yc + ",screenY=" + yc;
            }
            sparm = 'toolbar=no,resizable=yes,location=no,scrollbars=no' + str + ',height=425,width=780,alwaysraised=yes'
        }
        else (sparm = parm)
        //close window if it is open
        if (typeof (dataWin) == "object") { dataWin.close() }
        dataWin = window.open('forms/data.htm', 'dataWin', sparm);
        intervalID = window.setInterval("OpenWindow2('" + url + "')", 250);
    }
}

function OpenWindow3(URL, name, features) {
    if (CheckUserBrowserAgnostic()) {
        if (typeof OpenNewWindowInDialogBox != "undefined") OpenNewWindowInDialogBox(URL, "");
    } else {
        return window.open(URL, name, features);
    }
    return null;
}

//Check User Has BrowserAgnostic Active
function CheckUserBrowserAgnostic() {
    return GetCookie("BrowserAgnostic") == "true";
}

//[61]
function GetStyleSheet() {
    css = "";
    css = GetCookie("StyleSheet")
    if (css != null) {
        css = css + ".css"
    }
    else if (css == null) {
        css = "ysi.css"
    }
    // must include all possible directories that we may be in, instead of sending a parameter every time through.
    line1 = "<LINK REL=STYLESHEET TYPE=TEXT/CSS HREF=" + css + ">"
    line2 = "<LINK REL=STYLESHEET TYPE=TEXT/CSS HREF=SYSTEM/" + css + ">"
    line3 = "<LINK REL=STYLESHEET TYPE=TEXT/CSS HREF=../SYSTEM/" + css + ">"
    document.writeln(line1)
    document.writeln(line2)
    document.writeln(line3)
}

//[62]
function Filter(bInternational) {
    var itype = 0;
    var isubtype = 0;
    var ifunction = 0;
    var res = -1;
    var sref = "";
    var sstatus = "";
    var smod = "";
    var filterlink = "";

    //if (parent.frames.document.location.href.toLowerCase().indexOf("aspx") > 0) {
    var objDoc;
    objDoc = window.parent.document.getElementById("filter").contentWindow.document;
    if (objDoc.location.href.toLowerCase().indexOf("aspx") > 0) {
        // This is a .NET page, so raise a "filter" event.
        objDoc.getElementById("bSaveData").value = "filter";
        objDoc.forms[0].submit();
        return;
    }

    if (typeof (objDoc.forms[0]) == "undefined") { return; }
    if (typeof (objDoc.forms[0].elements["ITYPE"]) == "undefined" && typeof (objDoc.forms[0].elements["FILTERLINK:TextBox"]) == "undefined") { return; }
    if (typeof (objDoc.forms[0].elements["ISUBTYPE"]) != "undefined") { isubtype = objDoc.forms[0].elements["ISUBTYPE"].value }
    if (typeof (objDoc.forms[0].elements["Res"]) != "undefined") { res = objDoc.forms[0].elements["Res"].value }

    //see if we've got entire filter link
    if (typeof (objDoc.forms[0].elements["FILTERLINK:TextBox"]) != "undefined") {
        filterlink = objDoc.forms[0].elements["FILTERLINK:TextBox"].value;
    }
    if (filterlink != "") { objDoc.location.href = filterlink; return; }

    if (typeof (objDoc.forms[0].elements["ITYPE"]) != "undefined") {
        itype = objDoc.forms[0].elements["ITYPE"].value;
    }

    //trans default to ifunction = 2, ignore
    if (itype == 16 || itype == 15 || itype == 26 || itype == 13 || itype == 30 || itype == 191 || itype == 63 || itype == 37) {
        if (ifunction == 2) { ifunction = 0 }
    }
    else {
        if (typeof (objDoc.forms[0].elements["IFUNCTION"]) != "undefined") { ifunction = objDoc.forms[0].elements["IFUNCTION"].value }
    }
    if (itype == 1) {
        if (typeof (objDoc.forms[0].elements["CMBSTATUS"]) != "undefined") { sstatus = objDoc.forms[0].elements["CMBSTATUS"].value }
        if (sstatus == "Applicant" || sstatus == "Canceled" || sstatus == "Wait List" || sstatus == "Denied") {
            itype = 192
        }
    }


    if (itype == 0) { return }
    if (isubtype != 0) { return }
    if (ifunction != 0) { return }


    sref = "../"
    //payables = 30 are shared with iCMW, we need to distiguish it somehow/Galina
    if (itype == 30) { smod = objDoc.forms[0].elements["SMOD"].value; }
    if (smod == "iCMW") { sref = sref + "iCMW.asp" }
    else { sref = sref + Get_Real_Asp_Name(itype) + ".asp" }

    sref = sref + "?WCI=begin&action=f&iType=" + itype
    if (res != -1) { sref = sref + "&Res=" + res }
    if (bInternational) {
        sref = sref.replace("iData.asp", "iData_int.asp");
    }

    try {
        /* Attempt to set BSAVE in order to avoid the ExitForm message to display twice if data was changed on the form.
        That strage behavior started after switching from frame to iFrame */
        if (BrowserDetect.browser == "MSIE")
            objDoc.forms[0].BSAVE.value = "1";
    }
    catch (any) {
    }

    //parent.frames.location.href = sref
    window.parent.document.getElementById("filter").contentWindow.frames.location.href = sref;
}

//[63]
function ActiveMenu(ref, sTarget) {

    if (sTarget == "parent") { parent.location.href = ref }
    else if (sTarget != "parent") { parent.frames[2].location.href = ref }
    return;
    try {
        var i = 0; var bReturn = false; var bSave = true
        if (typeof (parent.frames[2].document[0]) != "undefined") {
            if (typeof (parent.frames[2].document[0].elements["BDATACHANGED"]) == "undefined") { bReturn = true }
            if (typeof (parent.frames[2].document[0].elements["BSAVE"]) == "undefined") { bReturn = true; bSave = false }
            if (typeof (parent.frames[2].document[0].elements["SAVEABLE"]) != "undefined" && parent.frames[2].document[0].elements["SAVEABLE"].value == "0") { bReturn = true }
        }
        else if (typeof (parent.frames[2].document[0]) == "undefined") {
            bReturn = true; bSave = false
        }
        if (bReturn) {
            if (bSave) {
                parent.frames[2].document[0].elements["BSAVE"].value = "1";
            }
            if (sTarget == "parent") { parent.location.href = ref }
            else if (sTarget != "parent") { parent.frames[2].location.href = ref }
        }
        else if (!bReturn) {
            for (var i = 0; i < 15; i++) {
                if (parent.frames[2].document[0].elements[i].type != "hidden" && parent.frames[2].document[0].elements[i].disabled != true) {
                    parent.frames[2].document[0].elements[i].focus()
                    break;
                }
            }
            bdata = parent.frames[2].document[0].elements["BDATACHANGED"].value;
            if (bdata == "1") {
                errorfound = (confirm("Do you wish to save changed data 1 ?"));
                if (errorfound) {
                    parent.frames[2].document[0].elements["BSAVE"].value = "1";
                    parent.frames[2].document.forms[0].submit()
                }
                if (!errorfound) {
                    parent.frames[2].document[0].elements["BSAVE"].value = "1";
                    if (sTarget == "parent") { parent.location.href = ref }
                    else if (sTarget != "parent") { parent.frames[2].location.href = ref }
                }
                return;
            }
            if (sTarget == "parent") { parent.location.href = ref }
            else if (sTarget != "parent") { parent.frames[2].location.href = ref }
        }
    }
    catch (dummy) {
        if (sTarget == "parent") { parent.location.href = ref }
        else if (sTarget != "parent") { parent.frames[2].location.href = ref }
    }
}

//Then, when you confirm the javascript dialog box we're showing, the page will do the 'real' 
//unload to navigate to the other page, and raise the onbeforeunload event a second time.
var onBeforeUnloadFired = false;
function ResetOnBeforeUnloadFired() {
    onBeforeUnloadFired = false;
}

//[64]
function ExitForm(event, sForm) {
    //this routine will prompt if user has changed data without saving
    //BSAVE is required form variable.  Caller should set it = 1 if he wants to bypass this routine
    //i.e. if user hits save or if user hits something like prompt charges on detailed receipts.
    //NOTE:  common routine nav0 will set BSAVE = 1.
    //       if user click on a listWindow hRef, we'll do an early return
    //       if user click on a Lookup2 hRef (the YSI.NET version of the lookup), we'll do an early return
    //SAVEABLE is an optional form variable.  This routine will honor it.
    //note that if your link is an href, the unload will happen before you get to set bsave
    if (!onBeforeUnloadFired) {
        onBeforeUnloadFired = true;
        window.setTimeout("ResetOnBeforeUnloadFired()", 1000);
        var ii = 0;
        if (typeof (document.forms[0].elements["BDATACHANGED"]) == "undefined") { return }
        if (typeof (document.forms[0].elements["BSAVE"]) == "undefined") { return }
        if (typeof (document.forms[0].elements["SAVEABLE"]) != "undefined" && document.forms[0].elements["SAVEABLE"].value == "0") { return }
        if (typeof (document.forms[0].elements["BSAVE"]) != "undefined" && document.forms[0].elements["BSAVE"].value == "1") { document.forms[0].elements["BSAVE"].value = "0"; return }
        if (typeof (document.activeElement.href) != "undefined") {
            if (document.activeElement.href.indexOf("listWindow") > 0) { return }
            if (document.activeElement.href.indexOf("Lookup2") > 0) { return }
            if (document.activeElement.href.indexOf("show_calendar") > 0) { return }
            if (document.activeElement.href.indexOf("SpellWindow") > 0) { return }
            if (document.activeElement.href.indexOf("OpenNewWindow") > 0) { return }
        }
        //trigger a onBlur, which will trigger the BDATACHANGED, in case they made a change without leaving the control
        if (typeof (document.activeElement) != "undefined" && typeof (document.activeElement.name) != "undefined") {
            document.activeElement.blur()
        }
        if (document.forms[0].elements["BDATACHANGED"].value == "1") {
            //e.cancelBubble is supported by IE - this will kill the bubbling process.
            event.cancelBubble = true;
            event.returnValue = "Your data has NOT been saved!";
            //e.stopPropagation works in Firefox.
            if (event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
            }
            return "Your data has NOT been saved!";
        }
    }
}

//[65]
function TabTo(TabNumber) {

    if (typeof (document.forms[0].elements["BSAVE"]) != "undefined") { document.forms[0].elements["BSAVE"].value = "1" }
    location.href = "#" + TabNumber

    // ensure that the parent window (menu.asp), is scrolled to the top.
    try { parent.window.scrollTo(0, 0) }
    catch (any) { }

    // TR70312 - BSAVE value need to be reset to 0 after tabbing is completed.
    if (typeof (document.forms[0].elements["BSAVE"]) != "undefined") { document.forms[0].elements["BSAVE"].value = "0" }
}

//[66]
function ValidFloat(numObj, iDigits, iMin, iMax) {



    var sTest = numObj.value;
    sTest = CheckKMB(sTest)
    numObj.value = sTest

    if (iMin == undefined) { iMin = -100000000000 }
    if (iMax == undefined) { iMax = 100000000000 }
    iDigits = (iDigits == null) ? 10 : iDigits;

    var errMsg = "Number must be between " + iMin + " and " + iMax + " and have no more than " + iDigits
    if (iDigits == 1) { errMsg += " digit after the decimal point." }
    else { errMsg += " digits after the decimal point." }

    /* test if number is valid currency format */
    if (Empty(sTest)) { return true; }
    if (!isValidMoneyFormat(sTest, iDigits)) {
        error(numObj, errMsg);
        if (typeof event != "undefined")
            event.returnValue = false;
        else {
            setTimeout(function() { numObj.focus(); numObj.select(); }, 10);
        }
        return false;
    }

    /* get number back as US format without thousand separator */
    sTest = parseNum(numObj, iDigits);


    if (!ValidMinMax(sTest, iMin, iMax)) {
        error(numObj, errMsg);
        if (typeof event != "undefined")
            event.returnValue = false;
        else {
            setTimeout(function() { numObj.focus(); numObj.select(); }, 10);
        }
        return false;
    }

    return true;
}

//[67]
function UserList(selcol, propcode, acctcode, where, aspname, formname) {
    var sSelect = "";
    var sunmask;
    var stemp = "";
    sSelect = document.forms[0].elements[selcol].value;

    i = sSelect.indexOf("[HPROP]")
    if (i > 0) {
        if (typeof (document.forms[0].elements[propcode]) == "undefined") {
            alert("Cannot display list without property");
            return;
        }
    }
    while (i > 0) {
        sSelect = sSelect.substring(0, i) + "(select hmy from property where scode = '" + document.forms[0].elements[propcode].value + "')" + sSelect.substring(i + 7);
        i = sSelect.indexOf("[HPROP]")
    }

    i = sSelect.indexOf("[HACCT]")
    if (i > 0) {
        if (typeof (document.forms[0].elements[acctcode]) != "undefined") {
            stemp = sSelect.substring(0, i)
            stemp += "(select hmy from acct where scode = '" + unMaskAcct(acctcode)
            stemp += "' and hChart = (select hChart from lockout where hprop = (select hmy from property where scode = '" + document.forms[0].elements[propcode].value + "')))" + sSelect.substring(i + 7)
            sSelect = stemp
        }
        else {
            alert("Cannot display list without account");
            return;
        }
    }
    listWindow(trim(aspname) + '.ASP?WCI=begin&action=ysilist&field=' + where + '&select=' + sSelect + '&label=List&framename=' + trim(formname) + '&PromptDesc=0', where)
}
//[68]
function unMaskAcct(acct) {
    var AcctOut = new String(document.forms[0].elements[acct].value)

    j = AcctOut.indexOf(" ")
    if (j < 0)
    { j = AcctOut.length }

    AcctOut = AcctOut.substring(0, j)
    isep = AcctOut.indexOf("-");
    while (isep > 0) {
        AcctOut = AcctOut.substring(0, isep) + AcctOut.substring(isep + 1, AcctOut.length)
        isep = AcctOut.indexOf("-");
    }
    isep = AcctOut.indexOf(".");
    while (isep > 0) {
        AcctOut = AcctOut.substring(0, isep) + AcctOut.substring(isep + 1, AcctOut.length)
        isep = AcctOut.indexOf(".");
    }
    return AcctOut
}

//[69]
function Get_Real_Asp_Name(itype) {
    sref = "iData"
    //debugger
    if (itype == 1) { sref = "iData" }         //tenant
    else if (itype == 2) { sref = "iData" }    //owner
    else if (itype == 3) { sref = "iData" }    //property
    else if (itype == 4) { sref = "iData" }    //unit
    else if (itype == 5) { sref = "iData" }    //vendor
    else if (itype == 7) { sref = "iData" }    //account
    else if (itype == 10) { sref = "iData" }   //unittype
    else if (itype == 13) { sref = "iData" }   //charge
    else if (itype == 14) { sref = "iData" }   //bank
    else if (itype == 15) { sref = "iData" }   //receipt
    else if (itype == 16) { sref = "iData" }   //journal
    else if (itype == 21) { sref = "iData" }   //regular acct
    else if (itype == 22) { sref = "iData" }   //total acct
    else if (itype == 23) { sref = "iData" }   //prospect
    else if (itype == 25) { sref = "iMMW" }    //WO
    else if (itype == 26) { sref = "iMMW" }    //PO
    else if (itype == 27) { sref = "iMMW" }    //stock
    else if (itype == 28) { sref = "iMMW" }    //asset
    else if (itype == 29) { sref = "iMMW" }    //recur wo
    else if (itype == 30) { sref = "iData" }   //payable
    else if (itype == 33) { sref = "iData" }   //cash acct
    else if (itype == 36) { sref = "iData" }   //budget
    else if (itype == 37) { sref = "iData" }   //recur JE
    else if (itype == 63) { sref = "iData" }   //recur pay
    else if (itype == 42) { sref = "iMMW" }    //recur PO
    else if (itype == 65) { sref = "iCMW" }    //Job
    else if (itype == 66) { sref = "iCMW" }    //Change Orders
    else if (itype == 67) { sref = "iCMW" }    //Category
    else if (itype == 68) { sref = "iCMW" }    //regular categ
    else if (itype == 69) { sref = "iCMW" }    //total categ
    else if (itype == 73) { sref = "iData" }   //worksheet
    else if (itype == 74) { sref = "iData" }   //lease charge
    else if (itype == 76) { sref = "iCMW" }    //Job List
    else if (itype == 79) { sref = "iAdmin" }  //employee
    else if (itype == 83) { sref = "iData" }   //sqft
    else if (itype == 88) { sref = "iData" }   //memo
    else if (itype == 91) { sref = "iCMW" }    //Contract
    else if (itype == 93) { sref = "iData" }   //roommate
    else if (itype == 94) { sref = "iCMW" }   //draw worksheet
    else if (itype == 124) { sref = "iCMW" }    //Model
    else if (itype == 127) { sref = "iCMW" }    //Job Cost Adjustment
    else if (itype == 137) { sref = "iCMW" }    //Grant
    else if (itype == 138) { sref = "iCMW" }    //Grant List
    else if (itype == 141) { sref = "iAffordable" }     //hmprop
    else if (itype == 142) { sref = "iAffordable" }     //hmsumm
    else if (itype == 143) { sref = "iAffordable" }     //hmfamily
    else if (itype == 144) { sref = "iAffordable" }     //hmincome
    else if (itype == 163) { sref = "iData" }  //post acct
    else if (itype == 164) { sref = "iData" }  //ar acct
    else if (itype == 165) { sref = "iData" }  //ap acct
    else if (itype == 171) { sref = "iPHA" }   //H8INCOME
    else if (itype == 172) { sref = "iPHA" }   //H8PUBLIC
    else if (itype == 173) { sref = "iPHA" }   //H8CERTIF
    else if (itype == 174) { sref = "iPHA" }   //H8VOUCH
    else if (itype == 175) { sref = "iPHA" }   //H8MODREH
    else if (itype == 176) { sref = "iPHA" }   //H8MANUF
    else if (itype == 177) { sref = "iPHA" }   //H8MUTUAL
    else if (itype == 178) { sref = "iPHA" }   //H8FSS
    else if (itype == 179) { sref = "iPHA" }   //H8SUMM
    else if (itype == 180) { sref = "iPHA" }   //H8FAMILY
    else if (itype == 184) { sref = "iMMW" }   //pur req
    else if (itype == 186) { sref = "iMMW" }   //wo template
    else if (itype == 188) { sref = "iMMW" }   //inventory
    else if (itype == 189) { sref = "iMMW" }   //supplier
    else if (itype == 191) { sref = "iData" }  //check
    else if (itype == 192) { sref = "iData" }   //applicant
    else if (itype == 195) { sref = "iAdmin" }      //EmployeeSkillsRates
    else if (itype == 197) { sref = "iMMW" }   //Receive PO
    else if (itype == 231) { sref = "iAffordable" }  //hmtenant
    else if (itype == 233) { sref = "iAffordable" }  //hmcontract
    else if (itype == 234) { sref = "iAffordable" }  //hmunit
    else if (itype == 238) { sref = "iPHA" }         //H8PARAM
    else if (itype == 239) { sref = "iAffordable" }  //building
    else if (itype == 241) { sref = "iAffordable" }  //letters
    else if (itype == 242) { sref = "iAffordable" }  //correspondent
    else if (itype == 243) { sref = "iPHA" }         //H8STPR
    else if (itype == 244) { sref = "iAffordable" }  //HMTAXCR
    else if (itype == 245) { sref = "iAffordable" }  //HMTAXRULE
    else if (itype == 246) { sref = "iInspect" }     //INSPECTION
    else if (itype == 247) { sref = "iInspect" }     //INSPEMPLOYEE
    else if (itype == 248) { sref = "iInspect" }     //INSPVENDOR
    else if (itype == 249) { sref = "iInspect" }     //INSPUNIT
    else if (itype == 250) { sref = "iInspect" }     //INSPTENANT
    else if (itype == 251) { sref = "iPHA" }         //H8XLETTER
    else if (itype == 252) { sref = "iPHA" }         //H8LETTER
    else if (itype == 253) { sref = "iPHA" }         //H8CORRESPONDENT
    else if (itype == 254) { sref = "iPHA" }         //H8HOMEOWNERSHIP
    else if (itype == 270) { sref = "iPHA" }         //FSSSERVICES
    else if (itype == 271) { sref = "iPHA" }         //FSSGOALS
    else if (itype == 272) { sref = "iPHA" }         //FSSPROVIDERS
    else if (itype == 273) { sref = "iPHA" }         //FSSPROVIDERCONTACTS
    else if (itype == 274) { sref = "iPHA" }         //FSSPROVIDERSERVICES
    else if (itype == 275) { sref = "iPHA" }         //FSSQUESTIONNAIRE
    else if (itype == 276) { sref = "iPHA" }         //FSSQUESTIONRESPONSE
    else if (itype == 277) { sref = "iPHA" }         //FSSNEED
    else if (itype == 278) { sref = "iPHA" }         //FSSCONTRACT
    else if (itype == 279) { sref = "iPHA" }         //FSSASSESSMENTSHEET
    else if (itype == 280) { sref = "iPHA" }         //FSSQTEMPLATE
    else if (itype == 281) { sref = "iPHA" }         //FSSQSESSION
    else if (itype == 285) { sref = "iInspect" }     //IGMSTR
    else if (itype == 286) { sref = "iInspect" }     //IGDET
    else if (itype == 287) { sref = "iInspect" }     //IGTYPEHDR
    else if (itype == 288) { sref = "iInspect" }     //IGLEVELNAMES
    else if (itype == 289) { sref = "iInspect" }     //IGRATING
    else if (itype == 290) { sref = "iInspect" }     //IGRATINGDET
    else if (itype == 291) { sref = "iInspect" }     //IGHELP
    else if (itype == 292) { sref = "iInspect" }     //IGRATINGRESP
    else if (itype == 293) { sref = "iInspect" }     //IGOBSER
    else if (itype == 294) { sref = "iInspect" }     //IGDETAIL
    else if (itype == 295) { sref = "iInspect" }     //IGSUBDET
    else if (itype == 296) { sref = "iPHA" }         //H8FLATRENT
    else if (itype == 297) { sref = "iPHA" }         //H8FLATRENTDET
    else if (itype == 298) { sref = "iPHA" }         //H8PMTSTD
    else if (itype == 299) { sref = "iPHA" }         //H8PMTSTDDET
    else if (itype == 300) { sref = "iAssist" }      //WLINCLIMIT
    else if (itype == 301) { sref = "iAssist" }      //WLINCLIMITDET
    else if (itype == 302) { sref = "iWait" }        //WLPREFERENCE
    else if (itype == 303) { sref = "iWait" }        //WLAPPLIC
    else if (itype == 304) { sref = "iWait" }        //WLAPPLICPREFS
    else if (itype == 305) { sref = "iWait" }        //WLWAITLISTWLAPPLIC
    else if (itype == 306) { sref = "iWait" }        //WLWAITLISTPREFS
    else if (itype == 307) { sref = "iWait" }        //WLWAITLIST
    else if (itype == 308) { sref = "iWait" }        //WLINCLIMITXREF
    else if (itype == 314) { sref = "iPHA" }         //UTLOCALITY
    else if (itype == 315) { sref = "iPHA" }         //UTILSERV
    else if (itype == 316) { sref = "iPHA" }         //UTALLOW
    else if (itype == 317) { sref = "iPHA" }         //UTALLOWDET
    else if (itype == 318) { sref = "iPHA" }         //UTALLOWSUBDET
    else if (itype == 319) { sref = "iPHA" }         //UTRESP
    else if (itype == 320) { sref = "iPHA" }         //UTBUILDINGTYPE
    else if (itype == 321) { sref = "iPHA" }         //H8FAMILYSUMMARY
    else if (itype == 322) { sref = "iPHA" }         //H8FAMILYMEMBERS
    else if (itype == 323) { sref = "iPHA" }         //H8FAMILYINCOME
    else if (itype == 324) { sref = "iPHA" }         //H8FAMILYASSETS
    else if (itype == 325) { sref = "iPHA" }         //H8FAMILYFSS
    else if (itype == 326) { sref = "iPHA" }         //H8FAMILYEXPENSES
    else if (itype == 327) { sref = "iPHA" }         //H8CENSUSTRACT
    else if (itype == 328) { sref = "iPHA" }         //H8CENSUSTRACTDET
    else if (itype == 330) { sref = "iPHA" }         //H8PROP
    else if (itype == 331) { sref = "iPHA" }         //H8UNIT
    else if (itype == 364) { sref = "iWait" }        //WAITLISTSETUP
    else if (itype == 365) { sref = "iWait" }        //WAITLISTGENERATE
    else if (itype == 366) { sref = "iWait" }        //WAITLISTSELECTION
    else if (itype == 10914) { sref = "iAffordable" }   //HM_I_SPLCLM
    else if (itype == 374) { sref = "iPHA" }         //EXUTALLOW
    else if (itype == 375) { sref = "iPHA" }         //EXUTALLOWDET
    else if (itype == 376) { sref = "iPHA" }         //EXUTALLOWSUBDET
    else if (itype == 377) { sref = "iPHA" }         //H8MAXRENT
    else if (itype == 450) { sref = "IPHA" }         //RCHUDFACTOR
    else if (itype == 335) { sref = "iRGI" }         //RGPROP
    else if (itype == 356) { sref = "iRGI" }         //RGUNIT
    else if (itype == 332) { sref = "iRGI" }         //RGSUMM
    else if (itype == 500) { sref = "IPHA" }         //H8PRHABATE
    else if (itype == 566) { sref = "iCMW" }         //CM_APPROVEPAYABLES
    else if (itype == 521) { sref = "iAffordable" }  //HMRENTLIMIT
    else { sref = "iData" }
    return sref
}

//[70]
// Get the specified cookie
function GetField(sUrl, sField) {
    //sUrl = "&field1=value1&field2=value2"
    //sField = "field1"

    var aValues = sUrl.split("&");
    for (var i = 0; i < aValues.length; i++) {
        var aField = aValues[i].split("=");
        if (sField.replace(" ", "") == unescape(aField[0].replace(" ", "")))
            return unescape(aField[1]);
    }

    return null;
}

//[71]
function ClearFilterPrompt(obj) {
    var ss;

    ss = 'DESC' + obj.name
    if (typeof (document.forms[0].elements[ss]) != 'undefined') { document.forms[0].elements[ss].value = "" }
}

//[72]
function ValidYear(obj) {
    var ss = new String(obj.value);   //converts object to string
    var ilen = ss.length;
    var iyear;
    var serr = "Invalid Year";
    var min = 1875;
    var max = 2100;
    var window = 50

    if (Empty(obj.value)) { return true; }
    if (ilen != 4 && ilen != 2) {
        error(obj, serr);
        return false;
    }
    for (var i = 0; i < ilen; i++) {
        if ((ss.charAt(i) < "0") || (ss.charAt(i) > "9")) {
            error(num, serr);
            return false;
        }
    }
    iyear = parseInt(ss, 10);
    if (ilen == 2) {
        if (iyear < window) {
            iyear = 2000 + iyear;
        }
        else {
            iyear = 1900 + iyear;
        }
    }
    else if (iyear < min || iyear > max) {
        error(obj, serr);
        return false;
    }
    obj.value = iyear.toString();
    return true;
}

//[73]
// Does not reformat on the browser. Just checks to see if there are the right
// amount of numbers. It will allow for 2 dashes (just about anywhere but only 2).
function ValidateSSN(num) {
    ii = 0;
    newssn = "";
    dashes = 0;
    ssn = num.value;
    if (Empty(ssn)) return "";
    for (var i = 0; (i < ssn.length); i++) {
        if (i != 0) {
            if (((ssn.charAt(i) < "0") || (ssn.charAt(i) > "9")) && (ssn.charAt(i) != "-")) return error(num, "Invalid SSN");
        }
        if (ssn.charAt(i) == "-") {
            dashes = dashes + 1;
            if (dashes > 2) return error(ssn, "Invalid SSN", false);
            if (dashes == 2) {
                newssn = newssn + ssn.substring(ii, i);
                newssn = newssn + ssn.substring(i + 1);
                if (newssn.length != 9) return error(num, "Invalid SSN");
            }
            if (dashes < 2) newssn = newssn + ssn.substring(ii, i);
            ii = i + 1;
        }
    }
    if (newssn != "") ssn = newssn;
    if (ssn.length != 9) return error(num, "Invalid SSN", false);
    return ssn
}


//[74]
//Test SSN for valid characters and the right amount of numbers.
//SSN may be entered as 123-45-6789, 123456789 - Real SSN all digits
//SSN may be entered as A23-45-6789, A23456789 - HUD 58 psudo SSN where the first digit may be capital A - Z
//SSN may be entered as T23-45-6789, T23456789 - temporary SSN where the first digit may be a "T" or "t"
//EIN must be entered as 12-3456789
//Will format SSN with "-"s
//If sTxt is a EIN then function will leave one "-" in the third position
//If sTxt is a SSN then function will leave and/or add two "-" at position 4 and 7

function ValidateSSN2(num) {
    dashes = 0;
    ssn = num.value.toUpperCase();
    if (Empty(ssn)) return "";
    if (((ssn.charAt(0) < "a") || (ssn.charAt(0) > "z")) && ((ssn.charAt(0) < "A") || (ssn.charAt(0) > "Z")) && ((ssn.charAt(0) < "0") || (ssn.charAt(0) > "9"))) {
        return error(num, "Invalid SSN - First character is invalid");
    };
    for (var i = 0; (i < ssn.length); i++) {
        if (i != 0) {
            if (((ssn.charAt(i) < "0") || (ssn.charAt(i) > "9")) && (ssn.charAt(i) != "-")) return error(num, "Invalid SSN - Contains an invalid character");
        };
        if (ssn.charAt(i) == "-") {
            dashes = dashes + 1;
        };
    };
    if (dashes > 2) return error(ssn, "Invalid SSN - Too many dashes", false);
    if (dashes == 1) {
        if ((ssn.charAt(0) < "0") || (ssn.charAt(0) > "9")) {
            return error(num, "Invalid SSN - First character is invalid");
        };

    };
    if (ssn.length != (9 + dashes)) return error(num, "Invalid SSN - Invalid length", false);

    if (ssn.length == 9) {
        ssn = ssn.substring(0, 3) + "-" + ssn.substring(3, 5) + "-" + ssn.substring(5, 9);
    };
    num.value = ssn;
    return ssn;
}

//[75]
function StripDashesFmSSN(ssn) {
    if ((ssn.length == 9) || (ssn.length == 10)) {
        return ssn
    }
    else if (ssn.length == 11) {
        return ssn.substring(0, 3) + ssn.substring(4, 6) + ssn.substring(7, 11)
    }
}


//[76]
function ValidateEmail(email) {
    //Regex for testing invalid email ids
    var reg1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(@\-)|(^\.)|\s/; // invalid

    //OLD UNUSED REGEX
    //var reg2 = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; // valid

    // Regex for supporting new gTLDs
    var reg2 = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([A-Za-z][a-zA-Z0-9\-]{0,61}[A-Za-z]{1})(\]?)$/;

    var str = email.value;
    if (str == "") { return; }
    var emailaddrs = str.split(",");
    for (var i = 0; i < emailaddrs.length; i++) {
        if (!reg1.test(emailaddrs[i]) && reg2.test(emailaddrs[i])) { }
        else {
            alert("\"" + emailaddrs[i] + "\" is an invalid e-mail address.");
            email.focus();
            email.select();
            return false;
        }
    }
}


//[77]
function isValidMoneyFormat(sTest, iDigits) {
    var sGUID = GetCookie("bEuroNum");
    var sPattern;
    var bTemp = false;

    /* check for numbers like 123 and -123.45 */
    sPattern = (sGUID == "true") ? "^-?\\d*\\,?\\d{0," + iDigits + "}$" : "^-?\\d*\\.?\\d{0," + iDigits + "}$";
    var re = new RegExp(sPattern);
    bTemp = (re.test(sTest)) ? true : bTemp;

    /* check for numbers like 1,234 and -123,456,789.01 */
    sPattern = (sGUID == "true") ? "^-?\\d{1,3}(\\.\\d{3})*(\\,\\d{0," + iDigits + "})?$" : "^-?\\d{1,3}(\\,\\d{3})*(\\.\\d{0," + iDigits + "})?$";
    re.compile(sPattern);
    bTemp = (re.test(sTest)) ? true : bTemp;

    /* last check. Special case sTest="-" */
    bTemp = (sTest == "-") ? false : bTemp;

    return bTemp;
}


//[78]

function nameWindow(sName) {
    parent.document.title = 'Yardi Systems, Inc. - ' + sName
    AutoSizeWindow()
}
function unNameWindow() {
	 try{
    	parent.document.title = 'Yardi Systems, Inc.'
    }
   catch (any) {		
    if (any.message.toLowerCase().search("permission denied") > -1 || any.message.toLowerCase().search("invalid calling object") > -1)
    {
     		jQuery("#filter").context.documentElement.title = 'Yardi Systems, Inc.';
    }
   }         
}

//[79]
function PromptTerm(start, end, obj, type) {
    var dtEnd = new Date(end.value)
    var dtStart = new Date(start.value)

    iStartM = dtStart.getMonth() + 1
    iEndM = dtEnd.getMonth() + 1

    iStartY = dtStart.getFullYear()
    iEndY = dtEnd.getFullYear()
    iDiff = ((iEndY - iStartY) * 12) + (iEndM - iStartM) + 1
    if (iDiff <= 0) { error(obj, 'Lease from date must be after lease to date.'); return false; }
    obj.value = iDiff


}


//[80]
function DaysDiff(start, end) {
    var dtFrom = new Date(start.value)
    var dtTo = new Date(end.value)
    return (dtTo - dtFrom) / 86400000  //number of milliseconds in a day...

}


//[81]
function show_clock(Dest) {
    //Dest is where time value goes
    newWindow = window.open(GetBlankPage(), 'Timer', 'width=420,height=140,status=no,resizable=no,top=225,left=175');
    newWindow.location = '../time.asp?Dest=' + Dest;
    if (typeof newWindow != 'unknown') {
        newWindow.focus();
    }
}


//[82]
function isValidInteger(sTest) {
    var sGUID = GetCookie("bEuroNum");
    var sPattern;
    var bTemp = false;

    /* check for numbers like 123 and -123.45 */
    sPattern = (sGUID == "true") ? "^-?\\d*$" : "^-?\\d*$";
    var re = new RegExp(sPattern);
    bTemp = (re.test(sTest)) ? true : bTemp;

    /* check for numbers like 1,234 and -123,456,789.01 */
    sPattern = (sGUID == "true") ? "^-?\\d{1,3}(\\.\\d{3})*$" : "^-?\\d{1,3}(\\,\\d{3})*$";
    re.compile(sPattern);
    bTemp = (re.test(sTest)) ? true : bTemp;

    /* last check. Special case sTest="-" */
    bTemp = (sTest == "-") ? false : bTemp;

    return bTemp;
}


//[83]
function parseInteger(numObj) {
    /* strips commas out of numbers, does a parseInt on it. */

    var sTemp = numObj.value;

    if ((!isValidInteger(sTemp)) || (sTemp == "")) {
        /* NOTE that "return false;" actually is the same as "return 0;" */
        return false;
    }

    var sGUID = GetCookie("bEuroNum");
    var sThousandSep = (sGUID == "true") ? "\\." : ",";
    var re = new RegExp(sThousandSep, "g");
    sTemp = sTemp.replace(re, "");

    return parseInt(sTemp);
}


//[84]
function formatInteger(numObj) {
    /* called from validInteger
    2100    -> 2,100

	   This function always assume an US number format (. dot as decimal separator) as input
    */

    var sTemp = numObj.value;

    /* strip thousand separators */
    var re = new RegExp("\\,", "g");
    sTemp = sTemp.replace(re, "");

    var sGUID = GetCookie("bEuroNum");
    var sThousandSep = (sGUID == "true") ? "." : ",";
    var sFractionSep = (sGUID == "true") ? "," : ".";

    /* put in thousand separators */
    re.compile("(-?\\d+)(\\d{3})");
    while (re.test(sTemp)) {
        sTemp = sTemp.replace(re, "$1" + sThousandSep + "$2");
    }

    /* put everything together again */
    numObj.value = sTemp;

    return;
}


//[85]
function validInteger(numObj, iMin, iMax) {
    var sTest = numObj.value;
    sTest = CheckKMB(sTest)
    numObj.value = sTest
    iMin = (iMin == null) ? -1000000000 : iMin;
    iMax = (iMax == null) ? 1000000000 : iMax;

    /* test if number is valid currency format */
    if (Empty(sTest)) { return true; }
    if (!isValidInteger(sTest)) {
        error(numObj, "Invalid Integer.");
        if (typeof event != "undefined")
            event.returnValue = false;
        else {
            setTimeout(function() { numObj.focus(); numObj.select(); }, 10);
        }
        return false;
    }

    /* get number back as US format without thousand separator */
    sTest = parseInteger(numObj);

    /* test if number is within min and max limits */
    if (!ValidMinMax(sTest, iMin, iMax)) {
        error(numObj, "Expecting number in range " + iMin + " to " + iMax);
        if (typeof event != "undefined")
            event.returnValue = false;
        else {
            setTimeout(function() { numObj.focus(); numObj.select(); }, 10);
        }
        return false;
    }

    numObj.value = sTest;
    formatInteger(numObj);
    return true;
}

//[86]
function MaskCateg(obj, categlen, categmask, seperator) {
    /*obj is text box.  obj might have a .isRequired property
    categlen is length of categ mask not including seperators
    categmask is the mask (i.e. ????-????)
    seperator is a '-'  or a '.'
    categ masks can have a '-' or a '.' as seperators, but not both
    and may have multiple seperators or no seperators*/


    var sout = "";        // output value
    var idashloc = 0;
    var ss = new String(obj.value);   //converts object to string
    var ilen = ss.length;
    var iSepCount = 0;
    var sTemp = "";


    // check for required field
    if (typeof (obj.getAttribute("isRequired")) == "undefined")
    { obj.getAttribute("isRequired") = false; } // default not required

    if (ss == "") {
        if (obj.getAttribute("isRequired")) { return error(obj, 'Categ number required') }
    }
    if (ss == "") { return true; }

    //remove seperators from input
    for (i = 0; i <= categlen; i++) {
        idashloc = ss.indexOf(seperator);
        if (idashloc <= 0) { break; }
        ss = ss.substring(0, idashloc) + ss.substring(idashloc + 1, ss.length);
    }

    //count number of seperators in categmask
    sTemp = categmask
    for (i = 0; i <= categlen; i++) {
        idashloc = sTemp.indexOf(seperator)
        if (idashloc <= 0) { break; }
        sTemp = sTemp.substring(idashloc + 1, sTemp.length)
        iSepCount = iSepCount + 1
    }

    //add zeros to input if input.length <> categlen
    if (ss.length != categlen.length) {
        for (i = ss.length; i < categlen; i++) {
            ss = ss + "0";
        }
    }

    //now, mask it
    i = 0
    idashloc = -1
    while (i < iSepCount) {
        idashloc = categmask.indexOf(seperator, idashloc + 1)
        if (idashloc <= 0) { break; }
        ss = ss.substring(0, idashloc) + seperator + ss.substring(idashloc, ss.length + 1);
        i += 1
    }


    obj.value = ss;

    return true;
}


//[87]
function addNewNode2Menu() {
    if (sNewNodeDesc == '') {
        /* not a new node, so don't try to add anything to the left menu */
        return;
    }
    var sUrl = location.href;
    var sQuery = location.search;

    /* find our sParent for this form */
    var sParent = '';
    var re = /&sParent1=([^&]*)&/gi;
    if (!re.test(sQuery)) {
        /* could not find sParent. Abort the process of adding node */
        sParent = sParent1;
        if (sParent == '') {
            return;
        }
    }
    else {
        sParent = RegExp.$1;
    }

    re.compile("(&|\\?)" + sParent + "=\\d*&", "i");
    if (re.test(sUrl)) {
        sUrl = sUrl.replace(re, "$1" + sParent + "=" + hMy + "&");
    }

    re.compile(sParent + "=\\d+&", 'i');
    if (re.test(sQuery)) {
        sQuery = sQuery.replace(re, sParent + "=\\d+&");
    }
    sQuery = sQuery.replace('?', '');
    sQuery = sQuery.replace('.', '\\.');

    var myFrame = parent.menu;
    var sTemp = myFrame.document.body.outerHTML;

    re.compile("&amp;", 'gi');
    if (re.test(sTemp)) {
        sTemp = sTemp.replace(re, '&');
    }

    re.compile(sQuery, "i");
    if (!re.test(sTemp)) {
        /* left side menu does not contain nodes like the one we have in the right frame, therefore abort. */
        myFrame.document.close();
        myFrame = null;
        return;
    }

    /* get rid of immediate script to execute QueryIf() and load right-hand frame */
    re.compile("[<]Script Language=JavaScript\>\\n\\s*QueryIf\\([^)]*\\);\\n\</script\>", 'i');
    if (re.test(sTemp)) {
        sTemp = RegExp.leftContext + ' ' + RegExp.rightContext;
    }

    re.compile("QueryIf\\(", 'gi');
    if (re.test(sTemp)) {
        sTemp = sTemp.replace(re, 'QueryIfVista(');
    }

    var re2 = /(<td.*height=3.*><img src=['"][^"]*images\/transparent_dot\.gif['"]><input type=HIDDEN name=NavInfo>)/i;
    if (re2.test(sTemp)) {
        sTemp = sTemp.replace(re2, "<td class=tree_line nowrap onMouseOver=bgcolorin(this) onMouseOut=bgcolorout(this) onMouseUp='return QueryIfVista(\"" + sUrl + "\");'>&nbsp;<img src=\"images/leaf.gif\"><A title=\"" + sNewNodeDesc + "\">&nbsp;" + sNewNodeDesc + " </A></td></tr><tr>" + RegExp.$1);

        /* rewrite the left side menu */
        myFrame.document.open();
        myFrame.document.clear();
        myFrame.document.write('<html><head><title>Yardi Systems, Inc. Voyager</title></head>');
        myFrame.document.write(sTemp);
        myFrame.document.write('</html>\n');
    }

    /* the document should be closed, but there seems to be a problem that everything has not been written and downloaded before closing the document, thus it is commented out */
    /*	myFrame.document.close();
    myFrame = null; */

    /* scroll to the buttom of the menu */
    myFrame.scrollTo(0, 9999);

    return;
}

//[88]
function ShowMemo(iFileType, hMy) {
    MemoWindow = window.open('CommonMemo.aspx?&iType=88&iFileType=' + iFileType + '&hFileRcd=' + hMy, 'MemoWindow', 'toolbar=no,scrollbars=no,resizable=yes,location=no,height=600,width=585,left=100,top=100,alwaysraised=yes');
}


//[89]
function getSelectedValue(myDropDown) {
    /* This function takes a <select> object as input and returns a string holding the selected value */

    /* this function is for <select> elements only. And it does not support multiselect */
    if (myDropDown.type != 'select-one') {
        return '';
    }

    return myDropDown.options[myDropDown.selectedIndex].value;
}

//[90]
function ShowMemo2(hMemo) {
    MemoWindow = window.open('CommonMemo.aspx?&iType=88&hMy=' + hMemo, 'MemoWindow', 'toolbar=no,scrollbars=no,resizable=yes,location=no,height=600,width=585,left=80,top=140,alwaysraised=yes');
}

//[91]
//TR# 47444 Not sure why this height is 400 (not original 700, but I will leave) - Changed rest to 600
function ShowMemo3(hMemo, hProspect) {
    MemoWindow = window.open("Prospect2_memo.asp?hMy=" + hMemo + "&hProspect=" + hProspect, 'MemoWindow', 'toolbar=no,scrollbars=no,resizable=yes,location=no,height=400,width=500,left=80,top=140,alwaysraised=yes');
}

//[92]
function ShowMemo4(iFileType, hMy) {
    MemoWindow = window.open('CommonMemo.aspx?&iType=88&iFileType=' + iFileType + '&hFileRcd=' + hMy, 'MemoWindow', 'toolbar=no,scrollbars=no,resizable=yes,location=no,height=700,width=585,left=100,top=100,alwaysraised=yes');
}

//[93]
function FormatNumberRounded(numObj) {
    /*
    This function extends function FormatNumber by first rounding the value in numObj

		ex.:	Original value in numObj.value is 1234.0266
    After call to FormatNumberRounded value in numObj.value is 1,234.03
    */

    numObj.value = Round(numObj.value);

    FormatNumber(numObj);
}

//[94]
function FormatNumber2Rounded(sTest) {
    /*
    This function extends function FormatNumber2 by first rounding the value in sTest

		ex.:	sTest is 1234.0266
    FormatNumber2Rounded returns 1234.03
    */

    var sTemp = Round(sTest);

    return FormatNumber2(sTemp);
}


//[95]
function OpenWindowAsp(url, parm) {
    //This is different than OpenWindow becasue it's called from asp and location of data.htm is different
    ss = "";
    bGotError = 0;
    ii = 1;
    ij = 0;
    sparm = "";

    if (typeof (parm) == "undefined") {
        //find the middle of the screen based on height and width
        if (window.screen) {
            var ah = screen.availHeight - 30;
            var aw = screen.availWidth - 10;

            var xc = (aw - 780) / 2;
            var yc = (ah - 425) / 2;

            str = ",left=" + xc + ",screenX=" + xc;
            str = str + ",top=" + yc + ",screenY=" + yc;
        }
        sparm = 'toolbar=no,resizable=yes,location=no,scrollbars=no' + str + ',height=425,width=780,alwaysraised=yes'
    }
    else (sparm = parm)
    //close window if it is open
    if (typeof (dataWin) == "object") { dataWin.close() }
    dataWin = window.open('data.htm', 'dataWin', sparm);
    window.setTimeout("OpenWindow2('" + url + "')", 1000);
}
//[96] DateAdd(startDate, numDays, numMonths, numYears) - add or subtract days/months/years -ve value will do subtraction
function DateAdd(startDate, numDays, numMonths, numYears) {
    var returnDate = new Date(startDate.getTime());
    var yearsToAdd = numYears;

    var month = parseInt(returnDate.getMonth(), 10) + parseInt(numMonths, 10);

    if (month > 11) {
        yearsToAdd = Math.floor((month + 1) / 12);
        month -= 12 * yearsToAdd;
        yearsToAdd += numYears;
    }
    returnDate.setMonth(month);

    returnDate.setFullYear(parseInt(returnDate.getFullYear(), 10) + parseInt(yearsToAdd, 10));

    returnDate.setTime(returnDate.getTime() + 60000 * 60 * 24 * numDays);

    return returnDate;
}
//[97] YearAdd(startDate, numYears) - add or subtract years -ve numyears will do subtraction
function YearAdd(startDate, numYears) {
    return DateAdd(startDate, 0, 0, numYears);
}
//[98] MonthAdd(startDate, numMonths) - add or subtract months -ve numMonths will do subtraction
function MonthAdd(startDate, numMonths) {
    return DateAdd(startDate, 0, numMonths, 0);
}
//[99] DayAdd(startDate, numDays) - add or subtract days -ve numDays will do subtraction
function DayAdd(startDate, numDays) {
    return DateAdd(startDate, numDays, 0, 0);
}

//[100] trim function for the built-in JavaScript String object
String.prototype.trim = function() {
    return this.replace(/^\s*|\s*$/g, "");
}

//[101] This function reutrns the user to the the tab where a required field was not completed.
function GoToErrorTab() {  //TR#54088
    /**
    This function returns the user to the the tab where a required field was not completed.
    In order to use this function the DIV tag for the tab must have an id assigned to it that matches the
    "myTabStrip_"+id of the corresponding TD in the tabStrip tabTable.  For example:

      <DIV class="TAB2" ...>
    <table id="myTabStrip_tabtable" ...>
    <tr>
    <td class="TAB_START" nowrap="nowrap">&nbsp;</td>
    <td id="myTabStrip_contactsTab" nowrap="nowrap" align="Center" onClick="JavaScript:TabClick(this, 'contactsTab');" class="tab_active2" onMouseOver="Hand(this)">Contacts</td>
    <td id="myTabStrip_schedulingTab" nowrap="nowrap" align="Center" onClick="JavaScript:TabClick(this, 'schedulingTab');" class="tab_right2" onMouseOver="Hand(this)">Scheduling</td>
    <td id="myTabStrip_resultsTab" nowrap="nowrap" align="Center" onClick="JavaScript:TabClick(this, 'resultsTab');" class="tab_right2" onMouseOver="Hand(this)">Results</td>
    <td class="TAB_END" style="width:100%;">&nbsp;<input name="myTabStrip:ActiveCell" id="myTabStrip_ActiveCell" type="hidden"></td>
    </tr>
    </table>
    <DIV id="contactsTab" class="TabBody" ...> ...  </DIV>
    <DIV id="schedulingTab" class="TabBody" ...>  ...  </DIV>
    <DIV id="resultsTab" class="TabBody" ...>  ... </DIV>
    </DIV>
    */

    var parent;
    var requiredElement;
    var gotMatch = false;
    var ii = document.forms[0].elements.length;

    for (i = 0; i < ii; i++) {
        if (document.forms[0].elements[i].mandatory == "true" && document.forms[0].elements[i].value == "") {
            requiredElement = document.forms[0].elements[i]
            parent = requiredElement.parentElement

            while (gotMatch == false) {
                parent = parent.parentElement
                if ((parent.className.toString().toUpperCase() == "TABBODY") || (parent.tagName == "FORM")) {
                    gotMatch = true;
                }
            }
            if (parent.className.toString().toUpperCase() == "TABBODY") {
                TabClick(document.getElementById("myTabStrip_" + parent.id), parent.id);
            }
        }
    }
    return;
}

// [102]  Looks through the current stylesheet for a given rule.
function GetStyle(className, styleProperty) {
    var rules;
    if (BrowserDetect.browser == "MSIE")
        rules = document.styleSheets[0].rules;
    else
        rules = document.styleSheets[0].cssRules;
    for (var i = 0; (i < rules.length); i++) {

        if (rules[i].selectorText.toLowerCase() == className.toLowerCase()) {
            if (BrowserDetect.browser == "MSIE")
                return rules[i].style.getAttribute(styleProperty.replace("-", ""));
            else
                return rgbTohex(rules[i].style.getPropertyValue(styleProperty));
        }
    }


}

// [103]
// Sets the dynamic button styles as a user moves the mouse into a button area.
function SetButtonStyles() {

    var col = document.getElementsByTagName("BUTTON")

    // if there are too many buttons, then just exit.  It takes too long on the client.
    if (col.length > 200) { return }
    for (i = 0; i < col.length; i++) {
        if (col[i].className != "form_button_disabled") {
            attachEventHandler(col[i], "mouseenter", Highlight, false);
            attachEventHandler(col[i], "mouseup", Highlight, false);
            attachEventHandler(col[i], "mousedown", Clicked, false);
            attachEventHandler(col[i], "mouseleave", Leave, false);
            if (col[i].innerText != "") {
                col[i].style.width = col[i].offsetWidth == 0 ? col[i].style.width : col[i].offsetWidth;
                col[i].style.height = col[i].offsetHeight == 0 ? col[i].style.height : col[i].offsetHeight;
            }
            col[i].setAttribute("originalClassName", col[i].className)
        }
    }

    function Highlight(event) {
        var obj = event.srcElement ? event.srcElement : event.target;
        obj.className = "highlight"
    }

    function Clicked(event) {
        var obj = event.srcElement ? event.srcElement : event.target;
        obj.className = "clicked"
    }

    function Leave(event) {
        var obj = event.srcElement ? event.srcElement : event.target;
        obj.className = obj.getAttribute("originalClassName")
    }

}


// [104]
// TabClick - For ASP pages with a tabstrip on, when a tab is clicked, hide the div corresponding to the old tab and display the div corresponding to the new tab
function TabClick(tabClicked, target) {

    var tabs;
    var i;
    var iCount;
    var parent;
    var divs;
    var TabStripName;
    var j;
    var top;
    var left;
    var width;
    var height;


    if (tabClicked == null) { return }
    j = tabClicked.id.indexOf("_")
    TabStripName = tabClicked.id.substring(0, j)
    parent = tabClicked.parentElement
    tabs = parent.childNodes

    for (i = 0; i < tabs.length; i++) {
        if (tabs[i].className == "tab_Active") {
            // Get the tab strip div
            var oDiv = GetParentByTag(tabs[i], "DIV");

            // Get the TOP value from the active DIV.  We used to
            // have the following line, but I don't think we need it anymore.
            // + parseInt(document.getElementById(target).firstChild.style.top)
            top = parseInt(oDiv.offsetTop) + parseInt(oDiv.clientHeight) + 30
        }
        if (tabs[i].id == tabClicked.id) { tabs[i].className = "tab_Active" }
        else if (tabs[i].className == "tab_Active") { tabs[i].className = "tab_Left" }
    }

    divs = document.body.getElementsByTagName("DIV");
    for (i = 0; i < divs.length; i++) {
        if (divs[i].className == "TabBody") {
            if (divs[i].id == target) {
                divs[i].style.display = "inline-block";
                divs[i].style.visibility = "visible"
                divs[i].style.top = top
            }

            else {
                // This is to get around an apparent bug.  If we don't have this line,
                // then a ghost frame of the hidden tables shows up on the visible div.
                divs[i].style.top = top
                divs[i].style.display = "none";
                divs[i].style.visibility = "inherit";
                divs[i].style.visibility = "hidden"
            }
        }
    }
    document.getElementById(TabStripName + "_ActiveCell").value = tabClicked.id;
}

function AutoSizeWindow() {

    // Only size the window if
    // 1.  There's an opener.
    // 2.  The opener is valid.
    // 3.  It hasn't already been sized.


    var bIsFrames = false
    if (parent.document.location.href.indexOf("FramesNav.aspx") >= 0) {
        bIsFrames = true
    }
    
  	if (parent.document.location.href.indexOf("SysUserDataMaster.aspx") >= 0) {
       bIsFrames = true
  		 }
    
    var myWindow = window

    if (bIsFrames) {
        myWindow = parent.window
    }

    if (typeof (myWindow) == "undefined") { return }
    if (myWindow.opener == null) { return }
    if (myWindow.opener.location.href == myWindow.location.href) { return }
    if (myWindow.document.body.clientWidth > 120 && myWindow.document.body.clientHeight > 120) {
        if (document.getElementById("bResizePageOnLoad") == null || document.getElementById("bResizePageOnLoad").value != "true") {
            return;
        }
    }

    /*

    // We no longer move the window, but this might come back someday.

    // Move the window below and to the right of the opener.
    if (typeof(myWindow.opener.opener) != "undefined") {
    // If the opener is a pop-up, then we don't need to subtract the toolbar height.
    // We also don't need to add 30, because screenTop starts at the beginning of the client
    // area, which is right below the window title bar.
    var top = myWindow.opener.screenTop
    }
    else {
    // NOTE: We no longer know the toolbar height, so we go with a hard coded value of 146.
    // If the opener is a pop-up, then we do need to subtract the toolbar height.  We need to
    // add back 30px because the toolbarHeight includes the window title bar.
    //var top = window.opener.screenTop - parseInt(window.opener.document.getElementById("toolbarHeight").value) + 30
    var toolbarHeight = 146
    var top = myWindow.opener.screenTop - toolbarHeight + 30
    }

    var left = myWindow.opener.screenLeft - 220

    // TEMP: We need to figure out how wide the side toolbar is, if there's a toolbar at all.
    // For now, don't move the window at all.
    //window.moveTo(left, top);

*/

    var width = 0
    var height = 0
    var extraWidth = 30
    var extraHeight = BrowserDetect.browser == "MSIE" ? 55 : 62;
    var screenLeft = 0
    var tooWide = false
    var tooTall = false

    // More extra width to account for the side frame and frame border.
    if (bIsFrames) {
        extraWidth = 320
    }


    // Size the screen to be either
    //  1. As big as it needs to be to display without scroll bars
    //  2. As much screen size as we have available.
    // If the user is on a 2 monitor setup and Voyager is on the secondary monitor, then screenLeft
    // might be 1300, but availWidth is only 1280.  In this case, set screen left to the difference.
    var myWinScreenLeft = myWindow.screenLeft ? parseInt(myWindow.screenLeft) : myWindow.screenX;
    var myWinScreenTop = myWindow.screenTop ? parseInt(myWindow.screenTop) : myWindow.screenY;

    if (myWinScreenLeft > screen.availWidth) {
        screenLeft = myWinScreenLeft - screen.availWidth
    }
    else {
        screenLeft = screenLeft
    }

    if ((screen.availWidth - screenLeft) >= document.body.scrollWidth + extraWidth) {
        width = document.body.scrollWidth + extraWidth
    }
    else {
        width = screen.availWidth - screenLeft
        tooWide = true
    }

    if ((screen.availHeight - myWinScreenLeft) >= document.body.scrollHeight + extraHeight) {
        height = document.body.scrollHeight + extraHeight
    }
    else {
        height = parseInt(screen.availHeight) - myWinScreenTop;
        tooTall = true
    }

    // Strange, but true...
    if (tooTall && !tooWide) { width += 20; height += 20 }

    myWindow.moveTo(100, 100);
    // add 100px of padding.
    myWindow.resizeTo(width, height + 100);


    // Scroll to the top/left
    if (bIsFrames) {
        parent.document.body.scrollLeft = 0
        parent.document.body.scrollTop = 0
    }
    else {
        document.body.scrollLeft = 0
        document.body.scrollTop = 0
    }
}

// [106]
// GetBlankPage - returns the path to /system/blank.htm use with window.open(GetBlankPage,... to prevent secure/nonsecure warnings over SSL (https) connections
function GetBlankPage() {
    var blank = "/" + location.pathname.split("/")[1] + '/system/blank.htm';
    return blank;
}

//[107]
// GetURL - XmlHTTP based function used by Senior Housing
function GetURL(URL) {
    var xmlhttp;

    //xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    xmlhttp = getActiveXObject("Msxml2.XMLHTTP")
    if (!xmlhttp) { return; }
    xmlhttp.Open("GET", URL, false);
    xmlhttp.Send();
    return xmlhttp.responseText;
}

//[108]
// GetURLXML - XmlHTTP based function used by Senior Housing
function GetURLXML(URL) {
    var Response, objXml;
    Response = GetURL(URL);

    if (Response != '') {
        //objXml = new ActiveXObject("Msxml2.DOMDocument.4.0");
        objXml = getActiveXObject("Msxml2.DOMDocument.4.0")
        if (!objXml) { return; }
        objXml.loadXML(Response);

        if (objXml)
            return objXml;
    }
}

//[109]
// Attache Event Handler
function attachEventHandler(el, eventType, listener, useCapture) {
    if (el.addEventListener) {
        el.addEventListener(eventType.replace("on", ""), listener, useCapture);
    } else if (el.attachEvent) {
        el.attachEvent(eventType, listener);
    }
}

//[110]
//Dynamically loading an external JavaScript or CSS file
function loadjscssfile(objDocument, filename, filetype) {

    var regExp = new RegExp("^/([^/]+)/");
    var webShare = (regExp.test(location.pathname)) ? "/" + RegExp.$1 + "/" : "";

    //var objIframe = window.frames && window.frameElement ? window.frameElement.contentDocument != null ? window.frameElement.contentDocument : window.frameElement.document : null;
    if (typeof objDocument == "undefined" || objDocument == null)
        return false;

    //check if file already exist don't added again.
    if (checkjscssfileexist(filename, filetype, objDocument))
        return false;

    var filerRef;
    if (filetype == "js") { //if filename is a external JavaScript file
        filerRef = document.createElement('script')
        filerRef.setAttribute("type", "text/javascript")
        filerRef.setAttribute("language", "javascript")
        filerRef.setAttribute("src", webShare + "system/" + filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        filerRef = document.createElement("link")
        filerRef.setAttribute("rel", "stylesheet")
        filerRef.setAttribute("type", "text/css")
        filerRef.setAttribute("href", webShare + "system/" + filename)
    }

    if (typeof filerRef != "undefined") {
        objDocument.getElementsByTagName("head")[0].appendChild(filerRef)
        return true;
    }
    return false;
}

//[111]
// checking has javascript or style sheet file exist into page
function checkjscssfileexist(filename, filetype, objDocument) {
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist from
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
    var allsuspects = objDocument.getElementsByTagName(targetelement)

    var isFound = false;
    if (allsuspects) {
        for (var i = 0; i < allsuspects.length; i++) {
            var item = allsuspects[i];
            if (item && item.getAttribute(targetattr) != null && item.getAttribute(targetattr).toLowerCase().indexOf(filename.toLowerCase()) != -1) {
                isFound = true;
                break;
            }
        }
    }
    return isFound;
}

//[112]
//This function returns array of all elements with same id
function getElementsWithSameId(elmId, elmType) {
    var elmArray = new Array();
    if (elmId != undefined && elmType != undefined) {
        var elm = document.getElementsByTagName(elmType);
        for (var i = 0; i < elm.length; i++) {
            if (elm[i].id == elmId) {
                elmArray.push(elm[i]);
            }
        }
    }
    return elmArray;
}

//[113]
//This function convert rgb color to hex
var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
function rgbTohex(rgb) {
    if (rgb == "") {
        return "";
    }
    else {
        if (rgb.search("rgb") == -1) {
            return rgb;
        }
        else {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
            }
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
    }
}

//114
function CheckKMB(sValue) {
    // check for something like 1.7m
    // k = 1000
    // m = 1,000,000
    // b = 1,000,000,000
    // strip off the char, and then multiply the number by the 
    // appropriate value.

    var sDecimalSep = GetDecimalSeperator(GetCurrencyFormat())
    var sThousandSep = (sDecimalSep == ".") ? "," : ".";

    // check for valid numbers/seperators followed by k, m or b.
    var re = new RegExp("^(-?[" + sDecimalSep + sThousandSep + ".\\d]+)([bmk])$", "i")
    var m = sValue.match(re)

    // if we find a match
    if (m != null) {
        // m[1] is just the number	
        sValue = m[1]

        // strip out the thousands seperators.
        var re = new RegExp("\\" + sThousandSep, "g");
        sValue = sValue.replace(re, "");

        // if decimal sep is a comma, then replace with a period.
        if (sDecimalSep == ",") {
            var re = new RegExp("\\" + sDecimalSep, "g");
            sValue = sValue.replace(re, ".");
        }


        // m[2] is k, m or b.
        switch (m[2].toLowerCase()) {
            case "k":
                sValue = parseFloat(sValue) * 1000
                break;
            case "m":
                sValue = parseFloat(sValue) * 1000000
                break;
            case "b":
                sValue = parseFloat(sValue) * 1000000000
                break;
        }
    }
    return sValue
}

//115
function fireEvent(Target, eventType) {
    if (Target.fireEvent)
        Target.fireEvent(eventType)
    else if (Target.dispatchEvent) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(eventType.replace("on", ""), false, true);
        Target.dispatchEvent(evt);
    }
}


//Browser Detection
var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
	searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                if (navigator.userAgent.indexOf("Trident") != -1)
                  {
                    return "MSIE";
                  }
                else
                  {
                    return data[i].identity;
                  }
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
		{
		    string: navigator.userAgent,
		    subString: "Chrome",
		    identity: "Chrome"
		},
		{ string: navigator.userAgent,
		    subString: "OmniWeb",
		    versionSearch: "OmniWeb/",
		    identity: "OmniWeb"
		},
		{
		    string: navigator.vendor,
		    subString: "Apple",
		    identity: "Safari",
		    versionSearch: "Version"
		},
		{
		    prop: window.opera,
		    identity: "Opera",
		    versionSearch: "Version"
		},
		{
		    string: navigator.vendor,
		    subString: "iCab",
		    identity: "iCab"
		},
		{
		    string: navigator.vendor,
		    subString: "KDE",
		    identity: "Konqueror"
		},
		{
		    string: navigator.userAgent,
		    subString: "Firefox",
		    identity: "Firefox"
		},
		{
		    string: navigator.vendor,
		    subString: "Camino",
		    identity: "Camino"
		},
		{		// for newer Netscapes (6+)
		    string: navigator.userAgent,
		    subString: "Netscape",
		    identity: "Netscape"
		},
		{
		    string: navigator.userAgent,
		    subString: "MSIE",
		    identity: "MSIE",
		    versionSearch: "MSIE"
		},
		{
		    string: navigator.userAgent,
		    subString: "Gecko",
		    identity: "Mozilla",
		    versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
		    string: navigator.userAgent,
		    subString: "Mozilla",
		    identity: "Netscape",
		    versionSearch: "Mozilla"
		}
	],
    dataOS: [
		{
		    string: navigator.platform,
		    subString: "Win",
		    identity: "Windows"
		},
		{
		    string: navigator.platform,
		    subString: "Mac",
		    identity: "Mac"
		},
		{
		    string: navigator.userAgent,
		    subString: "iPhone",
		    identity: "iPhone/iPod"
		},
		{
		    string: navigator.userAgent,
		    subString: "iPad",
		    identity: "iPad"
		},
		{
		    string: navigator.platform,
		    subString: "Linux",
		    identity: "Linux"
		}
	]

};
BrowserDetect.init();

// common variables
var $jQuery = typeof jQuery != "undefined" ? jQuery.noConflict() : null;
var jDialogBox = null;
var jTabs = null;

if (GetCookie("BrowserAgnostic") == "true") {
    if (window.opener == null)
        opener = window.parent;
}

// include required js and css file 
if (document.location.pathname.toLowerCase().search(".aspx") == -1 || document.location.pathname.toLowerCase().search("ysientry.aspx") > -1) {
    loadjscssfile(document, "jquery-ui.css", "css");
    loadjscssfile(document, "datatable_jui.css", "css");

    loadjscssfile(document, "ysilib2.js", "js");
    loadjscssfile(document, "ysiValidation.js", "js");
    if (loadjscssfile(document, "jquery.js", "js")) {
        var jQueryTimer = setInterval(function() {
            if (typeof jQuery != "undefined") {
                loadjscssfile(document, "jquery-ui.js", "js");
                loadjscssfile(document, "jquery.dataTables.min.js", "js");
                loadjscssfile(document, "jquery.iframe.js", "js");
                if (typeof skipYSIJCommon == "undefined" || !skipYSIJCommon)
                    loadjscssfile(document, "ysiJCommon.js", "js");
                clearInterval(jQueryTimer);
            }
        }, 100);
    }
}

//[116]
function getActiveXObject(ObjectType) {
    var xmlhttp;
    if (BrowserDetect.browser != "MSIE") {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject(ObjectType);
    }
    return xmlhttp;
}

//[117]
function loadXMLString(txt) {
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(txt, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(txt);
    }
    return xmlDoc;
}

//[118]
function GetString(objXml, tagName) {
    //try {return objXml.getElementsByTagName(tagName).item(0).text;}
    try {
        var childNode = getChildNodes(objXml.getElementsByTagName(tagName).item(0), 0);
        return childNode.nodeValue == null ? "" : childNode.nodeValue;
    }
    //    try { return objXml.getElementsByTagName(tagName).item(0).childNodes[0].nodeValue; }
    catch (any) { return "" }
}

//[119]
function GetNumber(objXml, tagName) {
    //try {return objXml.getElementsByTagName(tagName).item(0).text;}
    try {
        var childNode = getChildNodes(objXml.getElementsByTagName(tagName).item(0), 0);
        return childNode.nodeValue == null ? "" : childNode.nodeValue;
    }
    //        try { return objXml.getElementsByTagName(tagName).item(0).childNodes[0].nodeValue; }
    catch (any) { return 0 }
}

//[120]
function XmlDateFormat(objDate) {
    // returns a date in yyyy-mm-dd format.
    var year = objDate.getFullYear()
    var month = (objDate.getMonth() + 1)
    if (month.toString().length == 1) { month = "0" + month }
    var day = objDate.getDate()
    if (day.toString().length == 1) { day = "0" + day }
    return year + '-' + month + '-' + day
}

//[121]
function SetNumericValue(targetId, value) {
    if (value == "" || value == "0" || value == "0") { return }
    var obj = document.all(targetId)
    if (obj == null) { return }
    if (obj.tagName == "SPAN") { obj.innerHTML = value }
    else { obj.value = value }
}

//[122]
function SetValue(targetId, value) {
    if (value == "") { return }
    var obj = document.all(targetId)
    if (obj == null) { return }
    if (obj.tagName == "SPAN") { obj.innerHTML = value }
    else { obj.value = value }
}

//[123]
function GetDate(objXml, tagName) {
    //var s = objXml.getElementsByTagName(tagName).item(0).text.split("-")
    var s = objXml.getElementsByTagName(tagName).item(0).childNodes[0].nodeValue.split("-");
    var dt = new Date(s[0], s[1], s[2].substr(0, 2))
    return DateAdd(dt, 0, -1, 0)
}

//[124]

function WebServiceURL2(pageName) {
    var baseURL = ""

    if (location.href.toLowerCase().lastIndexOf("filters/") > 0) {
        baseURL = location.href.substring(0, location.href.toLowerCase().lastIndexOf("filters/")).toLowerCase()
    }
    if (location.href.toLowerCase().lastIndexOf("functions/") > 0) {
        baseURL = location.href.substring(0, location.href.toLowerCase().lastIndexOf("functions/")).toLowerCase()
    }
    if (location.href.toLowerCase().lastIndexOf("reports/") > 0) {
        baseURL = location.href.substring(0, location.href.toLowerCase().lastIndexOf("reports/")).toLowerCase()
    }

    if (baseURL == "") {
        baseURL = location.href.substring(0, location.href.toLowerCase().lastIndexOf("/")).toLowerCase()
    }
    else {
        baseURL = baseURL.substring(0, baseURL.lastIndexOf("/"))
    }

    baseURL = baseURL.replace("/pages", "/WebServices") + "/" + pageName
    return baseURL
}

//[125]
function SoapHeader() {
    var s = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
    s += "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\""
    s += " xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\""
    s += " xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
    s += "<soap:Body>"
    return s
}

//[126]
function GetBaseId(obj) {
    // This will get something like "grdDetail_DataTable_row0"
    var cellId = obj.id
    return cellId.substring(0, cellId.lastIndexOf("_"))
}

//[127]
function GetBaseId2(obj) {
    // Used by controls that are lookups.
    var cellId = obj.id
    // This will get something like "grdDetail_DataTable_row0_AcctLookup"
    var baseId = cellId.substring(0, cellId.lastIndexOf("_"))
    // This will get something like "grdDetail_DataTable_row0"
    return baseId.substring(0, baseId.lastIndexOf("_"))
}

//[128]
function CopyPreviousRowValue(evt) {
    var evt = evt || window.event;
    var obj = evt.target || evt.srcElement;
    if (obj.value != "") { return }
    var tr = GetParentByTag(obj, "TR")
    var num = GetRowNumber(tr.getAttribute("rowNum"));
    if (num == 0) { return }
    var prevRowId = obj.id.replace("row" + num, "row" + (num - 1))
    obj.value = document.all(prevRowId).value
}
//[129]
function getChildNodes(obj, inx) {
    inx = inx == undefined ? 0 : inx;
    var childObj = obj;
    var nodeName;
    var iCount = -1;

    for (var i = 0; i < obj.childNodes.length; i++) {
        childObj = obj.childNodes[i];
        nodeName = childObj.nodeName;
        if (nodeName != "#text") {
            iCount = iCount + 1;
        }
        if (iCount == inx)
            break;
    }
    return childObj;
}


//Initiate Reload Parent Page Leftside Navigation Links in 1 to Many Type Pages
//(1 To Many Pages Containing Leftside Navigation List bind with JSON format result
//and load it's content into Right side iframe)
function doParent1ToMLinkRefresh() {
    if (typeof window.parent.refreshLinks != "undefined")
        window.parent.refreshLinks(false);
}

//[130] remove attached handlers
function removeEventHandler(elem,eventType,handler) {
	if (elem.removeEventListener) 
		elem.removeEventListener (eventType,handler,false);
	if (elem.detachEvent)
		elem.detachEvent ('on'+eventType,handler); 
}		 
