/*
Validation and formatting relies on these cookies:
==================================================
Culture.TimeFormat			for time
Culture.DateFormat			for dates
Culture.MonthYearFormat		for MonthYear
Culture.Currency			for Currency/Money
Culture.DecimalSeperator	for Decimals
Culture.ThousandsSeperator	for Integers/Decimals
.
.
.
More to follow
*/



/* ******************************************************** */
/*            Time validation and formatting                */
/* ******************************************************** */

function GetTimeFormat() {
    /* Return the time format string stored in the cookie TimeFormat */

    var sTimeFormat = GetSubCookie("Culture", "TimeFormat");

    if (sTimeFormat == null) {
        sTimeFormat = "";
    }

	if (sTimeFormat == "HH:mm") {
		var re = new RegExp("(H{1,2}|m{1,2}|tt)", "g");
		sTimeFormat = sTimeFormat.replace(re, "{$1}");

		return (sTimeFormat == "") ? "{HH}:{mm}" : sTimeFormat;	
	}
	else {
		 var re = new RegExp("(h{1,2}|m{1,2}|tt)", "g");
    		 sTimeFormat = sTimeFormat.replace(re, "{$1}");

    		 return (sTimeFormat == "") ? "{h}:{mm}{tt}" : sTimeFormat;
	}
}

function TimeFormatToRegExPattern(sTimeFormat) {
    /* Replace a time format (as it is returned from function GetTimeFormat) into a RegEx pattern
    If sTimeFormat is "{h}:{mm}{tt}", this function will return "(\\d{1,2}):(\\d{1,2})(AM|PM)",
    which can be used to instantiate a new RegEx object.
    */

    var re = new RegExp("\\{h{1,2}\\}", "i");
    sTimeFormat = sTimeFormat.replace(re, "(\\d{1,2})");

    re = new RegExp("\\{m{1,2}\\}", "i");
    sTimeFormat = sTimeFormat.replace(re, "(\\d{1,2})");

    re = new RegExp("\\{tt\\}", "i");
    return sTimeFormat.replace(re, "(AM|PM)");
}


function TimeFormatToRegExReplacement(sTimeFormat) {
    /* Replace a time format (as it is returned from function GetTimeFormat) into a RegEx replacement string
    If sTimeFormat is "{h}:{mm}{tt}", this function will return "<hours>{h}</hours>:<minutes>{mm}</minutes><amPm>{tt}</amPm>",
    which can be used in "someString.replace(re, ourReturnValue)"
    */

    var re = new RegExp("(\\{h{1,2}\\})", "i");
    sTimeFormat = sTimeFormat.replace(re, "<hours>$1</hours>");

    re = new RegExp("(\\{m{1,2}\\})", "i");
    sTimeFormat = sTimeFormat.replace(re, "<minutes>$1</minutes>");

    re = new RegExp("\\{tt\\}", "i");
    sTimeFormat = sTimeFormat.replace(re, "<amPm>{tt}</amPm>");

    for (var i = 1; i <= 3; i++) {
        re = new RegExp("\\{[hmt]{1,2}\\}", "i");
        sTimeFormat = sTimeFormat.replace(re, "\$" + i);
    }

    return sTimeFormat;
}


function GetHourMinuteAmPm(sTime) {
    /* Given a string, try to find a match that contains hours, minutes and AM/PM.
    Return an array: arrayTime["hours"], arrayTime["minutes"] and arrayTime["AmPm"]. Return null if no match is found.
    */

    var dHours = 0;
    var dMinutes = 0;
    var sAmPm = "";
    var arrayTime = new Array(3);

    /* First check if we match the users selected time format */
    var sTimeFormat = GetTimeFormat();
    var sTimeFormatRegExPattern = TimeFormatToRegExPattern(sTimeFormat);
    var sTimeFormatRegExReplacement = TimeFormatToRegExReplacement(sTimeFormat);

    var re = new RegExp("^" + sTimeFormatRegExPattern + "$", "i");

    if (!re.test(sTime)) {
        /* No match. Try matching more generic time formats as specified above. */
        re = new RegExp("^(\\d{1,2}):?(\\d{2})?\\s*(AM|PM)?$", "i");

        if (!re.test(sTime)) {
            /* Still no match, so user must have entered invalid format. */
            return null;
        }

        arrayTime["hours"] = parseInt(RegExp.$1, 10);
        arrayTime["minutes"] = parseInt((RegExp.$2 == "") ? "0" : RegExp.$2, 10);
        arrayTime["AmPm"] = RegExp.$3;
    }
    else {
        sTime = sTime.replace(re, sTimeFormatRegExReplacement);

        re = new RegExp("<hours>(\\d{1,2})</hours>", "i");
        arrayTime["hours"] = (re.test(sTime)) ? parseInt(RegExp.$1, 10) : -1;

        re = new RegExp("<minutes>(\\d{1,2})</minutes>", "i");
        arrayTime["minutes"] = (re.test(sTime)) ? parseInt(RegExp.$1, 10) : -1;

        re = new RegExp("<amPm>(AM|PM)</amPm>", "i");
        arrayTime["AmPm"] = (re.test(sTime)) ? RegExp.$1 : "";

        if (((arrayTime["AmPm"]).toUpperCase() == "PM") && (arrayTime["hours"] > 12)) {
            arrayTime["hours"] += 12;
        }

        if (arrayTime["hours"] >= 24) {
            /* back to midnight */
            arrayTime["hours"] = 0;
        }
    }

    return arrayTime;
}


function IsValidTime(sTime) {
    /* Given a string, validate if the string holds a valid time.
    Return true if time is valid format and within the 24-hour clock. Otherwise return false.
	   
    Valid formats are:
    The format stored in the db for this user. Ex: "h:mm tt"
    1am
    112am
    1:12am
    01am
    0112am
    01:12am
    0112	(Military)
    1312	(Military)
    */

    var arrayTime = GetHourMinuteAmPm(sTime);
    if (arrayTime == null) {
        return false;
    }

    /* are we running 12 or 24 hour clock? */
    var dMaxHour = (arrayTime["AmPm"] == "") ? 23 : 12;
    var dMinHour = (arrayTime["AmPm"] == "") ? 0 : 1;

    if (!ValidMinMax(arrayTime["hours"], dMinHour, dMaxHour)) { return false; }
    if (!ValidMinMax(arrayTime["minutes"], 0, 59)) { return false; }

    return true;
}


function FormatTime2(myDate) {
    /* Given a date object return a string with hours, minutes and maybe AM/PM, formatted as stored in the db for this user. Ex: "h:mm tt"
    */
    if (myDate == null) { return "" }

    var dtFormat = new Date(myDate);
    if (isNaN(dtFormat)) { return "" }

    var dHours = dtFormat.getHours()
    var dMinutes = dtFormat.getMinutes()
    var sAmPm

    if (dHours < 12) { sAmPm = "AM"; } else { sAmPm = "PM"; }

    var sTimeFormat = GetTimeFormat();

    if (sTimeFormat.match("tt")) {
        
        if (dHours > 12) {
            sAmPm = "PM";
            dHours -= 12;
        }

        if (dHours == 0) {
            sAmPm = "AM";
            dHours = 12;
        }
        
      sTimeFormat = sTimeFormat.replace("{h}", dHours);
    	sTimeFormat = sTimeFormat.replace("{hh}", LeftPad(dHours.toString(), "0", 2));
    	sTimeFormat = sTimeFormat.replace("{m}", dMinutes);
    	sTimeFormat = sTimeFormat.replace("{mm}", LeftPad(dMinutes.toString(), "0", 2));
    	sTimeFormat = sTimeFormat.replace("{tt}", sAmPm);
    }
    else {
	    sTimeFormat = sTimeFormat.replace("{h}", LeftPad((arrayTime["hours"]).toString(), "0", 2));
	    sTimeFormat = sTimeFormat.replace("{HH}", LeftPad((arrayTime["hours"]).toString(), "0", 2));
	    sTimeFormat = sTimeFormat.replace("{m}", arrayTime["minutes"]);
	    sTimeFormat = sTimeFormat.replace("{mm}", LeftPad((arrayTime["minutes"]).toString(), "0", 2));
	    sTimeFormat = sTimeFormat.replace("{tt}", "");
    }

  
    return sTimeFormat;
}


function FormatTime(sTime) {
    /* Given a string that holds a valid time (has to be validated by function IsValidTime or other).
    Return a string with hours, minutes and maybe AM/PM, formatted as stored in the db for this user. Ex: "h:mm tt"
    */
    var arrayTime = GetHourMinuteAmPm(sTime);
    if (arrayTime == null) {
        return false;
    }

    if (((arrayTime["AmPm"]).toUpperCase() == "PM") && (arrayTime["hours"] < 12)) {
        arrayTime["hours"] += 12;
    }

    if (((arrayTime["AmPm"]).toUpperCase() == "AM") && (arrayTime["hours"] >= 12)) {
        /* back to midnight */
        arrayTime["hours"] = 0;
    }

    arrayTime["AmPm"] = (arrayTime["AmPm"] != "") ? (arrayTime["AmPm"]).toUpperCase() : (arrayTime["hours"] >= 12) ? "PM" : "AM";

    var sTimeFormat = GetTimeFormat();

   if (sTimeFormat.match("{tt}")) {
        
        if (arrayTime["hours"] > 12) {
            arrayTime["AmPm"] = "PM";
            arrayTime["hours"] -= 12;
        }

        if (arrayTime["hours"] == 0) {
            arrayTime["AmPm"] = "AM";
            arrayTime["hours"] = 12;
        }
	
	sTimeFormat = sTimeFormat.replace("{h}", arrayTime["hours"]);
    	sTimeFormat = sTimeFormat.replace("{hh}", LeftPad((arrayTime["hours"]).toString(), "0", 2));
    	sTimeFormat = sTimeFormat.replace("{m}", arrayTime["minutes"]);
   	sTimeFormat = sTimeFormat.replace("{mm}", LeftPad((arrayTime["minutes"]).toString(), "0", 2));
    	sTimeFormat = sTimeFormat.replace("{tt}", arrayTime["AmPm"]);
    
    }
    else {
	    sTimeFormat = sTimeFormat.replace("{h}", LeftPad((arrayTime["hours"]).toString(), "0", 2));
	    sTimeFormat = sTimeFormat.replace("{HH}", LeftPad((arrayTime["hours"]).toString(), "0", 2));
	    sTimeFormat = sTimeFormat.replace("{m}", arrayTime["minutes"]);
	    sTimeFormat = sTimeFormat.replace("{mm}", LeftPad((arrayTime["minutes"]).toString(), "0", 2));
	    sTimeFormat = sTimeFormat.replace("{tt}", "");
    }

    return sTimeFormat;
}


function ValidateTime2(objTime) {
    /* Given an html form element that supposedly holds a time value, check that the time entered is valid and format it according to
    the format stored in the db for the user. Ex: "h:mm tt".
	   
    If time entered is not valid, an "Invalid Time" error msg. is dsiplayed.
    */
    var sTime = new String(trim(objTime.value));

    if (Empty(sTime)) {
        return true;
    }

    if (!IsValidTime(sTime)) {
        return errorwithtranslation(objTime, "Invalid time format.");
    }

    objTime.value = FormatTime(sTime)

    /* Range checking */
    if (typeof (objTime.rangeStartId) != "undefined") {
        // I'm the end date of the range.
        var startTextBox = document.all(objTime.rangeStartId);
        var startDate;
        var endDate;

        if (startTextBox.value != "") { startDate = new Date("01/01/2001 " + startTextBox.value); }
        if (objTime.value != "") { endDate = new Date("01/01/2001 " + objTime.value); }

        // If the dates aren't in order, show error message.
        if (endDate < startDate) { errorwithtranslation(objTime, "End time must be after start time."); objTime.value = startTextBox.value; SetInitialFocus(objTime); return false; }

        // If the start date is blank, set it to the end date.
        else if (isNaN(startDate) || startTextBox.value == "") { startTextBox.value = objTime.value; SetInitialFocus(endTextBox); }

        // If I'm blank, set me to the start date value
        else if (isNaN(endDate)) { objTime.value = startTextBox.value; }
    }
    else if (typeof (objTime.rangeEndId) != "undefined") {
        // I'm the start date of the range.
        var endTextBox = document.all(objTime.rangeEndId);
        var startDate;
        var endDate;

        if (objTime.value != "") { startDate = new Date("01/01/2001 " + objTime.value); }
        if (endTextBox.value != "") { endDate = new Date("01/01/2001 " + endTextBox.value); }

        // If the dates aren't in order, show error message.
        if (startDate > endDate) { errorwithtranslation(objTime, "Start time must be before end time."); objTime.value = ""; SetInitialFocus(objTime); return false; }

        // If the end date is blank, set it to the start date.
        else if (isNaN(endDate)) { endTextBox.value = objTime.value; SetInitialFocus(endTextBox); endTextBox.select(); }

        // If I'm blank, set me to the end date to blank.
        else if (isNaN(startDate)) { endTextBox.value = ""; }
    }

    return true;
}


/* ******************************************************** */
/*            Date validation and formatting                */
/* ******************************************************** */

function GetDateFormat() {
    /* Return the date format string stored in the cookie DateFormat */

    var sDateFormat = GetSubCookie("Culture", "DateFormat");

    if (sDateFormat == null) {
        sDateFormat = "";
    }

    var re = new RegExp("(M{2}|d{2}|y{2,4})", "g");
    sDateFormat = sDateFormat.replace(re, "{$1}");

    return (sDateFormat == "") ? "{MM}/{dd}/{yyyy}" : sDateFormat;
}

function DateFormatToRegExPattern(sDateFormat, bMatchFullPattern) {
    /* Replace a date format (as it is returned from function GetDateFormat) into a RegEx pattern
    If sDateFormat is "{MM}/{dd}/{yyyy}", this function will return "\\d{2})/\\d{2})/\\d{2,4})",
    which can be used to instantiate a new RegEx object.
	   
    If bMatchFullPattern is set and true, we will generate a pattern with both numbers and special (separation) characters
    */

    var re;

    if (bMatchFullPattern == null) {
        bMatchFullPattern = false;
    }

    if (bMatchFullPattern) {
        re = new RegExp("\\{M{2}\\}", "i");
        sDateFormat = sDateFormat.replace(re, "(\\d{1,2})");

        re = new RegExp("\\{d{2}\\}", "i");
        sDateFormat = sDateFormat.replace(re, "(\\d{1,2})");

        re = new RegExp("\\{y{2,4}\\}", "i");
        sDateFormat = sDateFormat.replace(re, "(\\d{2,4})");
    }
    else {
        re = new RegExp("\\{M{1,2}\\}", "i");
        sDateFormat = sDateFormat.replace(re, "(\\d{2})");

        re = new RegExp("\\{d{1,2}\\}", "i");
        sDateFormat = sDateFormat.replace(re, "(\\d{2})");

        re = new RegExp("\\{y{2,4}\\}", "i");
        sDateFormat = sDateFormat.replace(re, "(\\d{2,4})");

        re = new RegExp("([- /])", "ig");
        sDateFormat = sDateFormat.replace(re, "$1?");

		}

    return sDateFormat
}


function DateFormatToRegExReplacement(sDateFormat) {
    /* Replace a date format (as it is returned from function GetDateFormat) into a RegEx replacement string
    If sDateFormat is "{MM}/{dd}/{yyyy}", this function will return "<month>{MM}</month>/<days>{dd}</days>/<year>{yyyy}</year>",
    which can be used in "someString.replace(re, ourReturnValue)"
    */

    var re = new RegExp("(\\{M{2}\\})", "i");
    sDateFormat = sDateFormat.replace(re, "<month>$1</month>");

    re = new RegExp("(\\{d{2}\\})", "i");
    sDateFormat = sDateFormat.replace(re, "<days>$1</days>");

    re = new RegExp("(\\{y{2,4}\\})", "i");
    sDateFormat = sDateFormat.replace(re, "<year>$1</year>");

    for (var i = 1; i <= 3; i++) {
        re = new RegExp("\\{[Mdy]{2,4}\\}", "i");
        sDateFormat = sDateFormat.replace(re, "\$" + i);
    }

    return sDateFormat;
}


function GetYearMonthDays(sDate) {
    /* Given a string, try to find a match that contains year, month and days.
    Return an array: arrayDate["year"], arrayDate["month"] and arrayDate["days"]. Return null if no match is found.
	   
    Valid formats are:
    The format stored in the db for this user. Ex: "MM/dd/yyyy"  or "dd-MM/2005"  or:
    01212005
    01/21/2005
    012105			:	We will assume 01/21/2005
    01/21/05		:	We will assume 01/21/2005
    */

    var arrayDate = new Array(3);

    /* First check if we match the users selected time format */
    var sDateFormat = GetDateFormat();

	if ((sDateFormat == '{dd}.{MM}.{yyyy}') && (sDate.indexOf(".") == -1)) {
		sDateFormat = sDateFormat.replace(".", "/");
		sDateFormat = sDateFormat.replace(".", "/");
	}
    var re = new RegExp("[^\\d]", "i");
    var sDateFormatRegExPattern = (re.test(sDate)) ? DateFormatToRegExPattern(sDateFormat, true) : DateFormatToRegExPattern(sDateFormat, false);

    var sDateFormatRegExReplacement = DateFormatToRegExReplacement(sDateFormat);

    re = new RegExp("^" + sDateFormatRegExPattern + "$", "i");

    if (!re.test(sDate)) {
        /* No match, so user must have entered invalid format. */
        return null;
    }
    else {
        sDate = sDate.replace(re, sDateFormatRegExReplacement);

        re = new RegExp("<month>(\\d{1,2})</month>", "i");
        arrayDate["month"] = (re.test(sDate)) ? parseInt(RegExp.$1, 10) - 1 : -1;

        re = new RegExp("<days>(\\d{1,2})</days>", "i");
        arrayDate["date"] = (re.test(sDate)) ? parseInt(RegExp.$1, 10) : -1;

        re = new RegExp("<year>(\\d{2,4})</year>", "i");
        arrayDate["year"] = (re.test(sDate)) ? parseInt(RegExp.$1, 10) : -1;
    }

    if (arrayDate["year"] < 1000) {
        /* If the user typed in a two digit year, do some smarts to figure out what year was meant */
        arrayDate["year"] += (arrayDate["year"] >= 80) ? 1900 : 2000;
    }

    return arrayDate;
}


function IsValidDate(sDate) {
    /* Given a string, validate if the string holds a valid date.
    Return a Date object if date is valid format and the display value can be translated into a valid date object. Otherwise return null.
    */

    var arrayDate = GetYearMonthDays(sDate);
    if (arrayDate == null) {
        return null;
    }

    var dtTest = new Date(arrayDate["year"], arrayDate["month"], arrayDate["date"]);

    if (dtTest.getFullYear() != arrayDate["year"]) { return null }
    if (dtTest.getMonth() != arrayDate["month"]) { return null }
    if (dtTest.getDate() != arrayDate["date"]) { return null }

    return dtTest;
}

function FormatDate(myDate) {
    /* Given a Date object return a string with month, date, year, formatted as stored in the db for this user. Ex: "MM/dd/yyyy"  or "dd-MM/yyyy"
    */

    if (myDate == null) { return "" }

    var dtFormat = new Date(myDate);
    if (isNaN(dtFormat)) { return "" }

    var sDateFormat = GetDateFormat();

    sDateFormat = sDateFormat.replace("{MM}", LeftPad((dtFormat.getMonth() + 1).toString(), "0", 2));
    sDateFormat = sDateFormat.replace("{dd}", LeftPad(dtFormat.getDate().toString(), "0", 2));
    sDateFormat = sDateFormat.replace("{yyyy}", dtFormat.getFullYear().toString());

    return sDateFormat;
}


function ValidateDate2(objDate) {
    /* Given an html form element that supposedly holds a date value, check that the time entered is valid and format it according to
    the format stored in the db for the user. Ex: "MM/dd/yyyy".
	   
    If date entered is not valid, an "Invalid Date" error msg. is dsiplayed.
    */

    var sDate = new String(trim(objDate.value));

    if (Empty(sDate)) {
        return true;
    }

    var myDate = IsValidDate(sDate)
    if (myDate == null) {
        return errorwithtranslation(objDate, "Invalid date format");
    }

    objDate.value = FormatDate(myDate);

    /* Range checking */
    if (objDate.getAttribute("rangeStartId") != null && typeof (objDate.getAttribute("rangeStartId")) != "undefined") {
        // I'm the end date of the range.
        var startTextBox = document.all(objDate.getAttribute("rangeStartId"));
        var startDate;
        var endDate;

        if (typeof (startTextBox) != "undefined" && startTextBox.value != "") { startDate = IsValidDate(startTextBox.value); }
        if (objDate.value != "") { endDate = myDate; }

        // If the dates aren't in order, show error message.
        if (endDate < startDate) { errorwithtranslation(objDate, "End date must be after start date."); objDate.value = startTextBox.value; SetInitialFocus(objDate); return false; }

        // If the start date is blank, set it to the end date.
        else if (isNaN(startDate) || startTextBox.value == "") { startTextBox.value = objDate.value; SetInitialFocus(endTextBox); }

        // If I'm blank, set me to the start date value
        else if (isNaN(endDate)) { objDate.value = startTextBox.value; }
    }
    else if (objDate.getAttribute("rangeEndId") != null && typeof (objDate.getAttribute("rangeEndId")) != "undefined") {
        // I'm the start date of the range.
        var endTextBox = document.all(objDate.getAttribute("rangeEndId"));
        var startDate;
        var endDate;

        if (objDate.value != "") { startDate = myDate; }
        if (endTextBox.value != "") { endDate = IsValidDate(endTextBox.value); }

        // If the dates aren't in order, show error message.
        if (startDate > endDate) { errorwithtranslation(objDate, "Start date must be before end date."); objDate.value = ""; SetInitialFocus(objDate); return false; }

        // If the end date is blank, set it to the start date.
        else if (isNaN(endDate)) { endTextBox.value = objDate.value; SetInitialFocus(endTextBox); endTextBox.select(); }

        // If I'm blank, set me to the end date to blank.
        else if (isNaN(startDate)) { endTextBox.value = ""; }
    }

    return true;
}


/* ******************************************************** */
/*          Month/Year validation and formatting            */
/* ******************************************************** */

function GetMonthYearFormat() {
    /* Return the month/year format string stored in the cookie MonthYearFormat */

    var sMonthYearFormat = GetSubCookie("Culture", "MonthYearFormat");

    if (sMonthYearFormat == null) {
        sMonthYearFormat = "";
    }

    var re = new RegExp("(M{2}|y{2,4})", "g");
    sMonthYearFormat = sMonthYearFormat.replace(re, "{$1}");

    return (sMonthYearFormat == "") ? "{MM}/{yyyy}" : sMonthYearFormat;
}

function MonthYearFormatToRegExPattern(sMonthYearFormat, bMatchFullPattern) {
    /* Replace a month/year format (as it is returned from function GetMonthYearFormat) into a RegEx pattern
    If sMonthYearFormat is "{MM}/{yyyy}", this function will return "(\\d{2})/(\\d{2,4})",
    which can be used to instantiate a new RegEx object.
	   
    If bMatchFullPattern is set and true, we will generate a pattern with both numbers and special (separation) characters
    */

    var re;

    if (bMatchFullPattern == null) {
        bMatchFullPattern = false;
    }

    if (bMatchFullPattern) {
        re = new RegExp("\\{M{2}\\}", "i");
        sMonthYearFormat = sMonthYearFormat.replace(re, "(\\d{1,2})");

        re = new RegExp("\\{y{2,4}\\}", "i");
        sMonthYearFormat = sMonthYearFormat.replace(re, "(\\d{2,4})");
    }
    else {
        re = new RegExp("\\{M{1,2}\\}", "i");
        sMonthYearFormat = sMonthYearFormat.replace(re, "(\\d{2})");

        re = new RegExp("\\{y{2,4}\\}", "i");
        sMonthYearFormat = sMonthYearFormat.replace(re, "(\\d{2,4})");

        re = new RegExp("([- /])", "ig");
        sMonthYearFormat = sMonthYearFormat.replace(re, "$1?");
    }

    return sMonthYearFormat;
}


function MonthYearFormatToRegExReplacement(sMonthYearFormat) {
    /* Replace a month/year format (as it is returned from function GetMonthYearFormat) into a RegEx replacement string
    If sMonthYearFormat is "{MM}/{yyyy}", this function will return "<month>{MM}</month>/<year>{yyyy}</year>",
    which can be used in "someString.replace(re, ourReturnValue)"
    */

    var re = new RegExp("(\\{M{2}\\})", "i");
    sMonthYearFormat = sMonthYearFormat.replace(re, "<month>$1</month>");

    re = new RegExp("(\\{y{2,4}\\})", "i");
    sMonthYearFormat = sMonthYearFormat.replace(re, "<year>$1</year>");

    for (var i = 1; i <= 3; i++) {
        re = new RegExp("\\{[Mdy]{2,4}\\}", "i");
        sMonthYearFormat = sMonthYearFormat.replace(re, "\$" + i);
    }

    return sMonthYearFormat;
}


function GetYearMonth(sMonthYear) {
    /* Given a string, try to find a match that contains year and month
    Return an array: arrayDate["year"], arrayDate["month"] and arrayDate["days"]. Return null if no match is found.
	   
    Valid formats are:
    The format stored in the db for this user. Ex: "MM/yyyy":
    012005
    0105			:	We will assume 01/2005
    */

    var arrayDate = new Array(3);

    /* First check if we match the users selected time format */
    var sMonthYearFormat = GetMonthYearFormat();

    var re = new RegExp("[^\\d]", "i");
    var sMonthYearFormatRegExPattern = (re.test(sMonthYear)) ? MonthYearFormatToRegExPattern(sMonthYearFormat, true) : MonthYearFormatToRegExPattern(sMonthYearFormat, false);

    // var sMonthYearFormatRegExPattern = MonthYearFormatToRegExPattern(sMonthYearFormat);
    var sMonthYearFormatRegExReplacement = MonthYearFormatToRegExReplacement(sMonthYearFormat);

    re = new RegExp("^" + sMonthYearFormatRegExPattern + "$", "i");

    if (!re.test(sMonthYear)) {
        /* No match, so user must have entered invalid format. */
        return null;
    }
    else {
        sMonthYear = sMonthYear.replace(re, sMonthYearFormatRegExReplacement);

        re = new RegExp("<month>(\\d{1,2})</month>", "i");
        arrayDate["month"] = (re.test(sMonthYear)) ? parseInt(RegExp.$1, 10) - 1 : -1;

        re = new RegExp("<year>(\\d{2,4})</year>", "i");
        arrayDate["year"] = (re.test(sMonthYear)) ? parseInt(RegExp.$1, 10) : -1;

        arrayDate["date"] = 1;
    }

    if (arrayDate["year"] < 1000) {
        /* If the user typed in a two digit year, do some smarts to figure out what year was meant */
        arrayDate["year"] += (arrayDate["year"] >= 80) ? 1900 : 2000;
    }

    return arrayDate;
}


function IsValidMonthYear(sMonthYear) {
    /* Given a string, validate if the string holds a valid date.
    Return a Date object if date is valid format and the display value can be translated into a valid date object. Otherwise return null.
    */

    var arrayDate = GetYearMonth(sMonthYear);
    if (arrayDate == null) {
        return null;
    }

    var dtTest = new Date(arrayDate["year"], arrayDate["month"], arrayDate["date"]);

    if (dtTest.getFullYear() != arrayDate["year"]) { return null }
    if (dtTest.getMonth() != arrayDate["month"]) { return null }
    if (dtTest.getDate() != arrayDate["date"]) { return null }

    return dtTest;
}

function FormatMonthYear(myMonthYear) {
    /* Given a Date object return a string with month, date, year, formatted as stored in the db for this user. Ex: "MM/yyyy"
    */

    if (myMonthYear == null) { return "" }

    var dtFormat = new Date(myMonthYear);
    if (isNaN(dtFormat)) { return "" }

    var sMonthYearFormat = GetMonthYearFormat();

    sMonthYearFormat = sMonthYearFormat.replace("{MM}", LeftPad((dtFormat.getMonth() + 1).toString(), "0", 2));
    sMonthYearFormat = sMonthYearFormat.replace("{yyyy}", dtFormat.getFullYear().toString());

    return sMonthYearFormat;
}


function ValidateMonthYear2(objMonthYear) {
    /* Given an html form element that supposedly holds a month/year value, check that the value entered is valid and format it according to
    the format stored in the db for the user. Ex: "MM/yyyy".
	   
    If month/year entered is not valid, an "Invalid month/year format" error msg. is dsiplayed.
    */
    var sMonthYear = new String(trim(objMonthYear.value));

    if (Empty(sMonthYear)) {
        return true;
    }

    var myDate = IsValidMonthYear(sMonthYear)
    if (myDate == null) {
        return errorwithtranslation(objMonthYear, "Invalid month/year format");
    }

    objMonthYear.value = FormatMonthYear(myDate);

    /* Range checking */
    if (typeof (objMonthYear.rangeStartId) != "undefined") {
        // I'm the end date of the range.
        var startTextBox = document.all(objMonthYear.rangeStartId);
        var startDate;
        var endDate;

        if (startTextBox.value != "") { startDate = IsValidMonthYear(startTextBox.value); }
        if (objMonthYear.value != "") { endDate = myDate; }

        // If the dates aren't in order, show error message.
        if (endDate < startDate) { errorwithtranslation(objMonthYear, "End month must be after start month."); objMonthYear.value = startTextBox.value; SetInitialFocus(objMonthYear); return false; }

        // If the start date is blank, set it to the end date.
        else if (isNaN(startDate) || startTextBox.value == "") { startTextBox.value = objMonthYear.value; SetInitialFocus(endTextBox); }

        // If I'm blank, set me to the start date value
        else if (isNaN(endDate)) { objMonthYear.value = startTextBox.value; }
    }
    else if (typeof (objMonthYear.rangeEndId) != "undefined") {
        // I'm the start date of the range.
        var endTextBox = document.all(objMonthYear.rangeEndId);
        var startDate;
        var endDate;

        if (objMonthYear.value != "") { startDate = myDate; }
        if (endTextBox.value != "") { endDate = IsValidMonthYear(endTextBox.value); }

        // If the dates aren't in order, show error message.
        if (startDate > endDate) { errorwithtranslation(objMonthYear, "Start month must be before end month."); objMonthYear.value = ""; SetInitialFocus(objMonthYear); return false; }

        // If the end date is blank, set it to the start date.
        else if (isNaN(endDate)) { endTextBox.value = objMonthYear.value; SetInitialFocus(endTextBox); endTextBox.select(); }

        // If I'm blank, set me to the end date to blank.
        else if (isNaN(startDate)) { endTextBox.value = ""; }
    }

    return true;
}


/* ******************************************************** */
/*           Currency validation and formatting             */
/* ******************************************************** */

function GetCurrencyFormat() {
    /* Return the time format string stored in the cookie CurrencyFormat */

    var sCurrencyFormat = GetSubCookie("Culture", "CurrencyFormat");

    if (sCurrencyFormat == null) {
        sCurrencyFormat = "";
    }

    return (sCurrencyFormat == "") ? "iii,iii,iii,iii,iii,iii.dd" : sCurrencyFormat;
}


function GetDecimalSeperator(sCurrencyFormat) {
    var re = new RegExp("i([^id]+)d", "i");
    return (re.test(sCurrencyFormat)) ? RegExp.$1 : "";
}


function GetDecimalCount(sCurrencyFormat) {
    var re = new RegExp("[^d](d+)$", "i");
    return (re.test(sCurrencyFormat)) ? RegExp.$1.length : 0;
}


function IsValidCurrency(sCurrency) {
    /* Given a string, validate that it is in a valid format. If it is, return a number. if not, return null.
	   
    Valid formats are:
    The format stored in the db for this user. Ex: "iii,iii,iii,iii,iii.dd"  or:
    1234
    1234.56		: Note that the correct decimal seperator must be used
    */

    var testCurrency = new String(sCurrency);
    var bValidCurrency = false;

    if (testCurrency.indexOf("-", 0) == 0) {
        testCurrency = testCurrency.substring(1, testCurrency.length - 1);
    }

    /* First check if we match the users selected time format */
    var sCurrencyFormat = GetCurrencyFormat();
    var sDecimalSeperator = GetDecimalSeperator(sCurrencyFormat);
    var iMaxDecimals = GetDecimalCount(sCurrencyFormat);

    var re = new RegExp("\\d", "ig");
    testCurrency = testCurrency.replace(re, "i");

    if (sDecimalSeperator != "") {
        re = new RegExp("(\\" + sDecimalSeperator + ")(i*)i(d*)$");
        while (re.test(testCurrency)) {
            testCurrency = testCurrency.replace(re, "$1$2d$3");
        }

        var iDecimals = GetDecimalCount(testCurrency);

        if (iDecimals < iMaxDecimals && testCurrency.indexOf(sDecimalSeperator) == -1) {
            testCurrency += sDecimalSeperator;
        }

        for (var i = iDecimals; i < iMaxDecimals; i++) {
            testCurrency += "d";
        }
    }

    if (testCurrency == sCurrencyFormat.substring(sCurrencyFormat.length - testCurrency.length, sCurrencyFormat.length)) {
        bValidCurrency = true;
    }

    testCurrency = new String(sCurrency);
    if (sDecimalSeperator != "") {
        re = new RegExp("\\" + sDecimalSeperator);
        testCurrency = testCurrency.replace(re, ".");
    }

    if (!bValidCurrency) {
        re = new RegExp("^-?\\d*\\.\\d{0," + iMaxDecimals + "}$");
        if (re.test(testCurrency)) {
            bValidCurrency = true;
        }

        re = new RegExp("^-?\\d+$");
        if (!bValidCurrency && !re.test(testCurrency)) {
            return null;
        }
    }

    testCurrency = new String(sCurrency);
    if (sDecimalSeperator != "") {
        re = new RegExp("\\" + sDecimalSeperator);
        testCurrency = testCurrency.replace(re, "D");
    }

    re = new RegExp("[^-D\\d]", "g");
    testCurrency = testCurrency.replace(re, "");
    re = new RegExp("D", "g");
    testCurrency = testCurrency.replace(re, ".");

    return parseFloat(testCurrency);
}


function ReverseString(sIn) {
    /* Given a string, return a string where the characters are reversed.
	
	   Ex: sIn = "abcde" return "edcba"
    */
    var sOut = "";

    for (var i = 0; i < sIn.length; i++) {
        sOut = sIn.charAt(i) + sOut;
    }

    return sOut;
}


function FormatCurrency(myCurrency) {
    /* Given a valid number format it according to the currency format stored in the db for the user. Ex: "iii,iii,iii,iii,iii.dd". */
    if (isNaN(myCurrency)) { return myCurrency; }
    var sCurrencyFormat = GetCurrencyFormat();
    var iMaxDecimals = parseInt(GetDecimalCount(sCurrencyFormat));

    myCurrency = (Math.round(myCurrency * Math.pow(10, iMaxDecimals)) / Math.pow(10, iMaxDecimals)).toFixed(iMaxDecimals);
    var sCurrency = new String(myCurrency);
    var sNegative = (sCurrency.indexOf("-") == 0) ? "-" : "";

    sCurrencyFormat = ReverseString(sCurrencyFormat);
    sCurrency = ReverseString(sCurrency);

    var re = new RegExp("[di]");
    for (var i = 0; i < sCurrency.length; i++) {
        if (sCurrency.charAt(i) != ".") {
            sCurrencyFormat = sCurrencyFormat.replace(re, sCurrency.charAt(i));
        }
    }

    re = new RegExp("(\\d)[^\\d]+$");
    sCurrencyFormat = sCurrencyFormat.replace(re, "$1");

    return sNegative + ReverseString(sCurrencyFormat);
}

function FormatDouble(myCurrency, iDecimal) {
    /* Given a valid number format it according to the currency format stored in the db for the user. Ex: "iii,iii,iii,iii,iii.dd". */
    var sCurrencyFormat = GetCurrencyFormat();
    var s = ""
    for (var i = 0; i < iDecimal; i++) {
        s += "d"
    }
    sCurrencyFormat = sCurrencyFormat.replace("dd", s)
    var iMaxDecimals = iDecimal

    myCurrency = (Math.round(myCurrency * Math.pow(10, iMaxDecimals)) / Math.pow(10, iMaxDecimals)).toFixed(iMaxDecimals);
    var sCurrency = new String(myCurrency);
    var sNegative = (sCurrency.indexOf("-") == 0) ? "-" : "";

    sCurrencyFormat = ReverseString(sCurrencyFormat);
    sCurrency = ReverseString(sCurrency);

    var re = new RegExp("[di]");
    for (var i = 0; i < sCurrency.length; i++) {
        if (sCurrency.charAt(i) != ".") {
            sCurrencyFormat = sCurrencyFormat.replace(re, sCurrency.charAt(i));
        }
    }

    re = new RegExp("(\\d)[^\\d]+$");
    sCurrencyFormat = sCurrencyFormat.replace(re, "$1");

    return sNegative + ReverseString(sCurrencyFormat);
}

function ValidateCurrency2(objCurrency, iMin, iMax) {
    /* Given an html form element that supposedly holds a currency value, check that the amount entered is valid and format it according to
    the format stored in the db for the user. Ex: "iii,iii,iii,iii,iii.dd".
	   
    If amount entered is not valid, an error msg. is dsiplayed.
    */
    var sCurrency = new String(trim(objCurrency.value));
    sCurrency = CheckKMB(sCurrency)

    if (Empty(sCurrency)) { return true; }

    var myCurrency = IsValidCurrency(sCurrency);
    if (myCurrency == null) {
        return errorwithtranslation(objCurrency, "Invalid currency format");
    }

    iMin = (iMin == null) ? -1000000000000 : iMin;
    iMax = (iMax == null) ? 1000000000000 : iMax;
    if (!ValidMinMax(myCurrency, iMin, iMax)) {
        return errorwithtranslation(objCurrency, "Expected amount in the range of " + iMin + " to " + iMax);
    }

    objCurrency.value = FormatCurrency(myCurrency);

    /* Range checking */
    if (typeof (objCurrency.rangeStartId) != "undefined") {
        // I'm the end amount of the range.
        var startTextBox = document.all(objCurrency.rangeStartId);
        var startAmount;
        var endAmount;

        if (startTextBox.value != "") { startAmount = IsValidCurrency(startTextBox.value); }
        if (objCurrency.value != "") { endAmount = myCurrency; }

        // If the amounts aren't in order, show error message.
        if (endAmount < startAmount) { errorwithtranslation(objCurrency, "End amount must be greater than start amount."); objCurrency.value = startTextBox.value; SetInitialFocus(objCurrency); return false; }

        // If the amount date is blank, set it to the end amount.
        else if (isNaN(startAmount) || startTextBox.value == "") { startTextBox.value = objCurrency.value; SetInitialFocus(endTextBox); }

        // If I'm blank, set me to the start amount
        else if (isNaN(endAmount)) { objCurrency.value = startTextBox.value; }
    }
    else if (typeof (objCurrency.rangeEndId) != "undefined") {
        // I'm the start amount of the range.
        var endTextBox = document.all(objCurrency.rangeEndId);
        var startAmount;
        var endAmount;

        if (objCurrency.value != "") { startAmount = myCurrency; }
        if (endTextBox.value != "") { endAmount = IsValidCurrency(endTextBox.value); }

        // If the amounts aren't in order, show error message.
        if (startAmount > endAmount) { errorwithtranslation(objCurrency, "Start amount must be less than end amount."); objCurrency.value = ""; SetInitialFocus(objCurrency); return false; }

        // If the end amount is blank, set it to the start amount.
        else if (isNaN(endAmount)) { endTextBox.value = objCurrency.value; SetInitialFocus(endTextBox); endTextBox.select(); }

        // If I'm blank, set me to the end amount to blank.
        else if (isNaN(startAmount)) { endTextBox.value = ""; }
    }

    return true;
}

function FormatDecimal(numObj, numericPrecision) {
    /* 	   
    This function always assume an US number format (. dot as decimal separator) as input
    */

    var sCurrencyFormat = GetCurrencyFormat();
    var sFractionSep = GetDecimalSeperator(sCurrencyFormat)
    var sThousandSep = (sFractionSep == ".") ? "," : ".";
    var sTemp = ""
    sTemp = numObj.toString()

    var sDigits = "";
    for (var i = 0; i < numericPrecision; i++) {
        sDigits = sDigits + "0"
    }

    /* strip thousand separators */
    var re = new RegExp("\\,", "g");
    sTemp = sTemp.replace(re, "");

    /* test for decimal part */
    re.compile("^(-?\\d*)\\.(\\d{0," + numericPrecision + "})");
    if (re.test(sTemp)) {
        sTemp = ((RegExp.$1 == "-") || (RegExp.$1 == "")) ? RegExp.$1 + "0" : RegExp.$1;
        sDigits = (RegExp.$2 + sDigits).substr(0, numericPrecision);
    }

    /* put in thousand separators */
    re.compile("(-?\\d+)(\\d{3})");
    while (re.test(sTemp)) {
        sTemp = sTemp.replace(re, "$1" + sThousandSep + "$2");
    }

    /* put everything together again */
    return sTemp + sFractionSep + sDigits;
}

function DoUTCAdjustmentAndFormat(ControlObject, DateObject, IsSuppressTime) {
    /* 	   
    This function always assume a US date formatted string in the label as input
    */
    if (ControlObject == null) { return }
    if (DateObject == null) { return }

    var dtDate;
    var gmtOffset

    //Step 1 Get date object	
    dtDate = DateObject;

    //Step 2 Find time offset
    gmtOffset = -dtDate.getTimezoneOffset() / 60;

    //Step 3 Add offset to date
    dtDate.setTime(dtDate.getTime() + (gmtOffset * 60 * 60 * 1000));

    //Step 4 Format date and time into user's format
    if (IsSuppressTime == "true") {
        ControlObject.innerText = FormatDate(dtDate);
    }
    else {
        ControlObject.innerText = FormatDate(dtDate) + " " + FormatTime2(dtDate);
    }

}

function SysWarnOnDateRange(objDate,TodaysDate,DaysPast,DaysFuture) {
    var sDate = new String(trim(objDate.value));
		
    if (Empty(sDate)) {
        return true;
    }

    var myDate = IsValidDate(sDate);
    
    if (myDate == null) {
        return errorwithtranslation(objDate, "Invalid date format");
    }

		/* Date entered by the user */
    objDate.value = FormatDate(myDate);
				
		/*Get today's Date by passing today's date variable.*/
    var today = IsValidDate(TodaysDate);

		if (today == null) {
        return errorwithtranslation(TodaysDate, "Invalid date format");
    }
    
		var myDatePast = new Date();
		/* Deduct number of days to get a past date (by passing a negative integer in the variable) */
		myDatePast.setDate(today.getDate() + DaysPast);
		
		var myDateFuture = new Date();
		/* Add number of days to get a future date */
		myDateFuture.setDate(today.getDate() + DaysFuture);
		
		/* Set the Time to min possible value for the date range of past. */
		myDatePast.setHours(0);
		myDatePast.setMinutes(0);
		myDatePast.setSeconds(0);
		myDatePast.setMilliseconds(0);
		
		/* Set the Time to max possible value for the date range in future. */
		myDateFuture.setHours(23);
		myDateFuture.setMinutes(59);
		myDateFuture.setSeconds(59);
		myDateFuture.setMilliseconds(999);

		if (myDate < myDatePast || myDate > myDateFuture){
			errorwithtranslation(objDate,'Warning: The date entered by you '+ FormatDate(myDate) +' is not between ' + FormatDate(myDatePast) + ' and ' + FormatDate(myDateFuture) + ' !',"false");
		}
     return true;
}
