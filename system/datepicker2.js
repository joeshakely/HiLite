//<!-- Original:  Kedar R. Bhave (softricks@hotmail.com) -->
//<!-- Web Site:  http://www.softricks.com -->
var weekend = [0,6];
var weekendColor = "#ffffff";
var fontface = "Tahoma";
var fontsize = 2;
var gNow = new Date();
var ggWinCal;
var vNewWin;

Calendar.Months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

// Non-Leap year Month days..
Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Calendar(p_item, p_WinCal, p_month, p_year, p_format) {
	if ((p_month == null) && (p_year == null))	return;

	if (p_WinCal == null)
		this.gWinCal = ggWinCal;
	else
		this.gWinCal = p_WinCal;
	
	if (p_month == null) {
		this.gMonthName = null;
		this.gMonth = null;
		this.gYearly = true;
	} else {
		this.gMonthName = Calendar.get_month(p_month);
		this.gMonth = new Number(p_month);
		this.gYearly = false;
	}

	this.gYear = p_year;
	this.gFormat = p_format;
	this.gBGColor = "white";
	this.gFGColor = "black";
	this.gTextColor = "black";
	this.gHeaderColor = "black";
	this.gReturnItem = p_item;
}

Calendar.get_month = Calendar_get_month;
Calendar.get_daysofmonth = Calendar_get_daysofmonth;
Calendar.calc_month_year = Calendar_calc_month_year;

function Calendar_get_month(monthNo) {
	return Calendar.Months[monthNo];
}

function Calendar_get_daysofmonth(monthNo, p_year) {
	/* 
	Check for leap year ..
	1.Years evenly divisible by four are normally leap years, except for... 
	2.Years also evenly divisible by 100 are not leap years, except for... 
	3.Years also evenly divisible by 400 are leap years. 
	*/
	if ((p_year % 4) == 0) {
		if ((p_year % 100) == 0 && (p_year % 400) != 0)
			return Calendar.DOMonth[monthNo];
	
		return Calendar.lDOMonth[monthNo];
	} else
		return Calendar.DOMonth[monthNo];
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
	/* 
	Will return an 1-D array with 1st element being the calculated month 
	and second being the calculated year 
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();	
	if (incr == -1) {
		// B A C K W A R D
		if (p_Month == 0) {
			ret_arr[0] = 11;
			ret_arr[1] = parseInt(p_Year) - 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) - 1;
			ret_arr[1] = parseInt(p_Year);
		}
	} else if (incr == 1) {
		// F O R W A R D
		if (p_Month == 11) {
			ret_arr[0] = 0;
			ret_arr[1] = parseInt(p_Year) + 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) + 1;
			ret_arr[1] = parseInt(p_Year);
		}
	}	
	return ret_arr;
}
// This is for compatibility with Navigator 3, we have to create and discard one object before the prototype object exists.
new Calendar();

Calendar.prototype.getMonthlyCalendarCode = function() {
	var vCode = "";
	var vHeader_Code = "";
	var vData_Code = "";
	
	// Begin Table Drawing code here..
	vCode = vCode + "<TABLE BORDER=0 style=\"border:solid 1px #000000;border-top:0\" width=230 cellpadding=4 cellspacing=0 BGCOLOR=\"#ffffff\">";   //\" is escape double quote
	
	vHeader_Code = this.cal_header();
	vData_Code = this.cal_data();
	vCode = vCode + vHeader_Code + vData_Code;
	
	vCode = vCode + "<tr><td colspan=7 style=\"height:8;font-size:10px;border-top:solid 1px #000000;background-color:#cccccc;padding:2\">&nbsp;</td></tr></TABLE>";
	
	return vCode;
}

Calendar.prototype.show = function() {
	var vCode = "";
	
	this.gWinCal.document.open();

	// Setup the page...
	this.wwrite("<html>");
	var cssPath = "/" + location.pathname.split("/")[1] + "/System/GreyGreenRust.css";
	var headText = "<head><LINK REL=STYLESHEET TYPE=TEXT/CSS HREF=" + cssPath + "><title>Calendar</title>"
	this.wwrite(headText);
	this.wwrite("<style>td.day {font-size:10px;font-face:verdana;background-color:#dddddd;border-bottom:solid 1px #000000}");
	this.wwrite(" a:link {text-decoration:none}");
	this.wwrite("td {font-size:8pt;font-family:verdana}");
	this.wwrite("button {background-color:#FFFFFF;filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#FFFFFF', EndColorStr='#919191');border-width:1px;border-color:black;border-style: solid;font-weight:bold;font-size:8pt;color: #000000;}");	
	
	this.wwrite("</style>");
	this.wwrite("</head>");

	this.wwrite("<body topmargin=0 leftmargin=0>");


	// Show navigation buttons
	var prevMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, -1);
	var prevMM = prevMMYYYY[0];
	var prevYYYY = prevMMYYYY[1];

	var nextMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, 1);
	var nextMM = nextMMYYYY[0];
	var nextYYYY = nextMMYYYY[1];
	
	this.wwrite("<TABLE WIDTH=230 BORDER=0 CELLSPACING=0 CELLPADDING=0 BGCOLOR='gray'>");
	this.wwriteA("<tr><td colspan=7 class=day style=\"filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#919191', EndColorStr='#FFFFFF');font-size:12px;border:solid 1px #000000;border-bottom:0;padding:4;font:bold;text-align:center\">");
	this.wwriteA(this.gMonthName + " " + this.gYear);
	this.wwriteA("</td></tr>");	
	
	this.wwrite("<TR><TD ALIGN=center><BUTTON style='width:40' OnClick=\"" +
		"javascript:window.opener.Build(" + 
		"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) + "', '" + this.gFormat + "'" +
		");" +
		"\"><<<\/button></TD><TD ALIGN=center>");
	this.wwrite("<BUTTON style='width:40' OnClick=\"" +
		"javascript:window.opener.Build(" + 
		"'" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\"><<\/button></TD><TD ALIGN=center>");
		
	var gbNow = new Date()
	var vbNowDay = gbNow.getDate();
	var vbNowMonth = gbNow.getMonth();
	vbNowMonth++;
	var vbNowYear = gbNow.getFullYear();

        var sGUID = GetCookie("bEuroDate");
        var sJAPAN = GetCookie("bJapanDate");
                	
	var vbToday = vbNowMonth + "/" + vbNowDay + "/" + vbNowYear
	if (sGUID == "true") {vbToday = vbNowDay + "/" + vbNowMonth + "/" + vbNowYear};
    	if (sJAPAN == "true") {vbToday = vbNowYear + "/" + vbNowMonth + "/" + vbNowDay};

	
	this.wwrite("<BUTTON style=\"width:70\" onClick=\"" +
		"self.opener.document.all." + this.gReturnItem + 
		".value='" + vbToday + "';self.opener.document.all." + this.gReturnItem + 
		".focus();window.close();\">Today<\/button></TD><TD ALIGN=center>");

	this.wwrite("<BUTTON style='width:40' OnClick=\"" +
		"javascript:window.opener.Build(" + 
		"'" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\">><\/button></TD><TD ALIGN=center>");
	this.wwrite("<BUTTON style='width:40' OnClick=\"" +
		"javascript:window.opener.Build(" + 
		"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) + "', '" + this.gFormat + "'" +
		");" +
		"\">>><\/button></TD></TR></TABLE>");

	// Get the complete calendar code for the month..
	vCode = this.getMonthlyCalendarCode();
	this.wwrite(vCode);

	this.wwrite("</font></body></html>");
	this.gWinCal.document.close();
}



Calendar.prototype.wwrite = function(wtext) {
	this.gWinCal.document.writeln(wtext);
}

Calendar.prototype.wwriteA = function(wtext) {
	this.gWinCal.document.write(wtext);
}

Calendar.prototype.cal_header = function() {
	var vCode = "";
	
	vCode = vCode + "<TR style='border:solid 1px #000000'>";
	vCode = vCode + "<Td WIDTH='14%' class=day >Sun</FONT></TD>";
	vCode = vCode + "<Td WIDTH='14%' class=day >Mon</FONT></TD>";
	vCode = vCode + "<Td WIDTH='14%' class=day >Tue</FONT></TD>";
	vCode = vCode + "<Td WIDTH='14%' class=day >Wed</FONT></TD>";
	vCode = vCode + "<Td WIDTH='14%' class=day >Thu</FONT></TD>";
	vCode = vCode + "<Td WIDTH='14%' class=day >Fri</FONT></TD>";
	vCode = vCode + "<Td WIDTH='16%' class=day >Sat</FONT></TD>";
	vCode = vCode + "</TR>";
	
	return vCode;
}

Calendar.prototype.cal_data = function() {
	var vDate = new Date();
	vDate.setDate(1);
	vDate.setMonth(this.gMonth);
	vDate.setFullYear(this.gYear);

	var vFirstDay=vDate.getDay();
	var vDay=1;
	var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
	var vOnLastDay=0;
	var vCode = "";

	/*
	Get day for the 1st of the requested month/year..
	Place as many blank cells before the 1st day of the month as necessary. 
	*/

	vCode = vCode + "<TR>";
	for (i=0; i<vFirstDay; i++) {
		vCode = vCode + "<TD style=\"text-align:right;background-color:#ffffff\" WIDTH='14%'" + this.write_weekend_string(i) + "><FONT SIZE='2' FACE='" + fontface + "'> </FONT></TD>";
	}

	// Write rest of the 1st week
	for (j=vFirstDay; j<7; j++) {
		vCode = vCode + "<TD style=\"text-align:right\" onMouseover=this.style.backgroundColor='#cccccc' onMouseOut=this.style.backgroundColor='#ffffff' WIDTH='14%' onClick=\"self.opener.document.all." + this.gReturnItem + ".value='" + 
				this.format_data(vDay) + 
				"';self.opener.document.all('" + this.gReturnItem + "').focus();window.close();\">" + 
				this.format_day(vDay) + 
			"</A>" + 
			"</FONT></TD>";
		vDay=vDay + 1;
	}
	vCode = vCode + "</TR>";

	// Write the rest of the weeks
	for (k=2; k<7; k++) {
		vCode = vCode + "<TR>";

		for (j=0; j<7; j++) {
			vCode = vCode + "<TD style=\"text-align:right\" onMouseover=\"this.style.backgroundColor='#cccccc'\" onMouseOut=\"this.style.backgroundColor='#ffffff'\" WIDTH='14%'  onClick=\"self.opener.document.all." + this.gReturnItem + ".value='" + 
					this.format_data(vDay) + 
					"';self.opener.document.all('" + this.gReturnItem + "').focus();window.close();\">" + 
				this.format_day(vDay) + 
				"</A>" + 
				"</FONT></TD>";
			vDay=vDay + 1;

			if (vDay > vLastDay) {
				vOnLastDay = 1;
				break;
			}
		}

		if (j == 6)
			vCode = vCode + "</TR>";
		if (vOnLastDay == 1)
			break;
	}
	
	// Fill up the rest of last week with proper blanks, so that we get proper square blocks
	for (m=1; m<(7-j); m++) {
		if (this.gYearly)
			vCode = vCode + "<TD style=\"text-align:right\" style=\"background-color:#ffffff\" WIDTH='14%'" + this.write_weekend_string(j+m) + 
			"><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'> </FONT></TD>";
		else
			vCode = vCode + "<TD style=\"text-align:right\" style=\"background-color:#ffffff\" WIDTH='14%'" + this.write_weekend_string(j+m) + 
			//"><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'>" + m + "</FONT></TD>";
			"><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'></FONT></TD>";
	}
	
	return vCode;
}

Calendar.prototype.format_day = function(vday) {
	var vNowDay = gNow.getDate();
	var vNowMonth = gNow.getMonth();
	var vNowYear = gNow.getFullYear();

	if (vday == vNowDay && this.gMonth == vNowMonth && this.gYear == vNowYear)
		return ("<FONT COLOR=\"RED\"><B>" + vday + "</B></FONT>");
	else
		return (vday);
}

Calendar.prototype.write_weekend_string = function(vday) {
	var i;

	// Return special formatting for the weekend day.
	for (i=0; i<weekend.length; i++) {
		if (vday == weekend[i])
			return (" BGCOLOR=\"" + weekendColor + "\"");
	}
	
	return "";
}

Calendar.prototype.format_data = function(p_day) {
	var myDate;
	myDate = new Date(parseInt(this.gYear, 10), parseInt(this.gMonth, 10), parseInt(p_day));
	
	/* use the FormatDate function in ysiValidation.js */
	return FormatDate(myDate);
}

function Build(p_item, p_month, p_year, p_format) {
	var p_WinCal = ggWinCal;
	gCal = new Calendar(p_item, p_WinCal, p_month, p_year, p_format);

	// Customize your Calendar here..
	gCal.gBGColor="white";
	gCal.gLinkColor="black";
	gCal.gTextColor="black";
	gCal.gHeaderColor="=#336699";

	// Choose appropriate show function
	gCal.show();
}

function show_calendar(p_item,p_month,p_year, p_format) {
	/* 
		p_month : 0-11 for Jan-Dec; 12 for All Months.
		p_year	: 4-digit year
		p_format: Date format (mm/dd/yyyy, dd/mm/yy, ...)
		p_item	: Return Item.
	*/
	
	/* if the date text box already has a valid date entered, we'll force the calendar to open with that date selected */
	if (p_item.value != "") {
		var date = IsValidDate(document.getElementById(p_item).value);
		if (date != null) {
			gNow = date;
		}
	}

	if (p_month  == null){p_month = new String(gNow.getMonth());}
	if (p_year == "" || arguments[2] == null){p_year = new String(gNow.getFullYear().toString());}
	if (p_format == null)
		{p_format = "MM/DD/YYYY";}
    	
	vWinCal = window.open(GetBlankPage(), "Calendar", "width=230,height=187,status=no,resizable=no,top=200,left=200");
	//vWinCal = window.open("", "Calendar", "width=230,height=190,status=no,resizable=no,top=" + (window.event.y + 125)+ ",left=" + (window.event.x + 250) );
	vWinCal.opener = self;
	ggWinCal = vWinCal;

	Build(p_item, p_month, p_year, p_format);
}


