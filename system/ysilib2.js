function GetIdArray(sID) {
    var obj1 = document.all.item(sID)
    var obj2 = new Array(0);
    if (obj1 == null) { return }
    if (typeof (obj1.length) != "undefined") {
        return obj1
    }
    else {
        obj2[0] = obj1
        return obj2
    }
}


function TabClick4Aspx(tabClicked, target) {
    if (tabClicked == null) { return }

    var j = tabClicked.id.indexOf("_");
    var TabStripName = tabClicked.id.substring(0, j);
    var oldTab = null;

    if (document.getElementById(TabStripName + "_ActiveCell").value != "") {
        oldTab = document.getElementById(document.getElementById(TabStripName + "_ActiveCell").value);
    }

    if (oldTab != null) {
        oldTab.className = "tab_Left";
    }

    tabClicked.className = "tab_Active";

    var tabDiv = document.getElementById(TabStripName + '_' + TabStripName);
    var top = parseInt(tabDiv.offsetTop) + tabDiv.offsetHeight + 3;

    var divs = document.body.getElementsByTagName("DIV");

    for (var i = 0; i < divs.length; i++) {
        if (divs[i].className == "TabBody") {
            if (divs[i].id == target) {
                divs[i].style.visibility = "visible";
                divs[i].style.top = top;
            }
            else {
                // This is to get around an apparent bug.  If we don't have this line,
                // then a ghost frame of the hidden tables shows up on the visible div.
                divs[i].style.top = top;
                divs[i].style.visibility = "inherit";
                divs[i].style.visibility = "hidden"
            }
        }
    }

    document.getElementById(TabStripName + "_ActiveCell").value = tabClicked.id;

    //    if (target)
    //        SetDataDivWidth(target);
}


function GetParentByTag(obj, tagName) {
    do {
        if (obj.parentNode == null) { return; }
        if (obj.parentNode.tagName == tagName) { return obj.parentNode }
        obj = obj.parentNode
    }
    while (true);
}

function SyncScroll(DataDiv, HeaderDiv) {
    HeaderDiv.scrollLeft = DataDiv.scrollLeft
}

function gotChange2(obj) {
    // Keep track of any controls that have changed.
    // If obj has already changed, then return.


    if (obj != undefined) { obj.isChanged = "true"; }
    if (document.all("BDATACHANGED"))
        document.all("BDATACHANGED").value = 1;

}

function EnableButton(TheButton) {
    if (TheButton != null && TheButton.type == "button") {
        TheButton.disabled = false;
    }
}

function DisableButton(TheButton) {
    if (TheButton != null && TheButton.type == "button") {
        TheButton.disabled = true;
    }
}

function SaveClick(ClickedButton) {
    // Handles save button click.
    document.body.style.cursor = "wait";
    DisableButton(ClickedButton);
    ProgressbarShow();
    window.parent.clearMessage = false;
    var ChangedControl = document.getElementById("ChangedControlIDCollection");

    if (!ValidateForm()) { document.body.style.cursor = "auto"; EnableButton(ClickedButton); ProgressbarHide(); return false };
    if (DirtyForm()) { document.body.style.cursor = "auto"; EnableButton(ClickedButton); ProgressbarHide(); return false };
    document.getElementById("RequestAction").value = "Save";
    document.getElementById("BSAVE").value = 1;

    if (document.getElementById("__EVENTTARGET") != null) { document.getElementById("__EVENTTARGET").value = ""; }
    if (document.getElementById("__EVENTARGUMENT") != null) { document.getElementById("__EVENTARGUMENT").value = ""; }

 	 SetBase64Values();
   document.forms[0].submit();
}

function EditClick() {
    // Handles edit button click.
    document.getElementById("RequestAction").value = "Edit";
    document.getElementById("BSAVE").value = 1;

    if (document.getElementById("__EVENTTARGET") != null) { document.getElementById("__EVENTTARGET").value = ""; }
    if (document.getElementById("__EVENTARGUMENT") != null) { document.getElementById("__EVENTARGUMENT").value = ""; }
    SetBase64Values();
    document.forms[0].submit();
}

function ValidateForm() {
    // Does all client-side validation.
    if (!FT_FinalTest()) { return false };
    return true;
}


function WorkFlowValidateForm(clickedLink) {
    /* If user clciked a link on a workflow linked list, compare the current step (index) and the clicked index.
    Only validate required fields in the user steps forward in the workflow or stays on the same page. */

    var re = new RegExp("^([^_]+).+_row(\\d+)$", "i");
    var clickedIndex;
    var currentStep;
    var currentIndex;

    try {
        /* get clickedLink's ID in function/data/report links */
        var rowId = clickedLink.id.replace(/:Value_anchor/i, "").replace(/:/g, "_");
        if (re.test(rowId)) {
            /* get the workflows name and the clicked rows index */
            clickedIndex = parseInt(RegExp.$2, 10);
            currentStep = document.getElementById(RegExp.$1 + "_CurrentStep");
            currentIndex = parseInt(currentStep.value, 10);
        }
        else { return false; }

        /* we only want to proceed with validation of required fields if the user steps forward in the workflow or stays on the same page */
        if (clickedIndex < currentIndex) { return true; }
    }
    catch (any) {
        return false;
    }

    return ValidateForm();
}


function DirtyForm() {
    // Checks to see if this form has already been saved 
    // (i.e. user clicked save then click the back button)
    return false;
}

function Lookup2(AssemblyName, ClassName, CodeTarget, DescriptionTarget, MultiSelect, IsMoreButtonClick) {

    var URL = ""
    var obj = document.all(CodeTarget)
    var s

    if (document.all["WEBSHARENAME"])
        URL = document.all["WEBSHARENAME"].value
    else if (document.getElementById("WEBSHARENAME"))
        URL = document.getElementById("WEBSHARENAME").value

    URL += "/pages/Lookup.aspx?"
    URL += "AssemblyName=" + AssemblyName
    URL += "&ClassName=" + ClassName
    URL += "&MultiSelect=" + MultiSelect
    URL += "&CodeTarget=" + CodeTarget
    URL += "&DescriptionTarget=" + DescriptionTarget
    if (IsMoreButtonClick == "-1") { URL += "&CodeTargetValue=" + obj.value }


    // If any parents are supplied, add them to the URL.  Ignore
    // errors here because there might not be any.
    try {
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
                URL += "&" + parentTypesArray[i] + "=" + encodeURIComponent(s)
            }
        }
    }
    catch (any) { }

    //var title = obj != null && obj.previousSibling != null ? obj.previousSibling.innerHTML : "";
    var title = obj != null && typeof obj.getAttribute("LLTitle") != "undefined" ? obj.getAttribute("LLTitle") : "";
    OpenLookup2PopupWindow(URL, title)
}

function MailTo(obj) {

    location.href = "mailto:" + obj.value
}


/*
The following 6 functions are related to a SingleSelect or MultiSelct
data grid.
*/
var ShiftKeyPressed = false
var RowWithShiftKeyPressed = -1
var RowColors = new Array();
var PreviousSelectedSingleRow;

function CollapseArray(myArray) {
    myArray = removeDuplicatesFromArray(myArray);
    var s = new String();
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i] != null && myArray[i] != "") {
            s += myArray[i] + "^";
        }
    }

    return s.substr(0, s.length - 1);
}

function removeDuplicatesFromArray(arr) {
    var i,
      len = arr.length,
      out = [],
      obj = {};

    for (i = 0; i < len; i++) {
        obj[arr[i]] = 0;
    }
    for (i in obj) {
        out.push(i);
    }
    return out;
}

function AddCodeToCollection(row) {
    if (!row) return;

    if (document.getElementById("SavedSelection_TextBox") == null) { return; }

    var SelectedCodes = document.getElementById("SavedSelection_TextBox").value.split("^");
    //SelectedCodes.push(trim(row.cells[1].innerHTML.replace(/(&nbsp;)*/g, "")));
    SelectedCodes.push(trim(row.cells[1].innerHTML.replace(/(&nbsp;)*/g, "").replace(/(amp;)*/g, "")));
    document.getElementById("SavedSelection_TextBox").value = CollapseArray(SelectedCodes);

    if (row.cells.length > 2) {
        var SelectedDescriptions = document.getElementById("SavedDescription_TextBox").value.split("^");
        SelectedDescriptions.push(trim(row.cells[2].innerHTML.replace(/(&nbsp;)*/g, "")));
        document.getElementById("SavedDescription_TextBox").value = CollapseArray(SelectedDescriptions);
    }
}

function RemoveCodeFromCollection(row) {
    if (document.getElementById("SavedSelection_TextBox") == null) { return; }

    var SelectedCodes = document.getElementById("SavedSelection_TextBox").value.split("^");
    for (var i = 0; i < SelectedCodes.length; i++) {
        if (SelectedCodes[i] == trim(row.cells[1].innerHTML.replace(/(&nbsp;)*/g, "").replace(/(amp;)*/g, ""))) {
            SelectedCodes[i] = "";
            document.getElementById("SavedSelection_TextBox").value = CollapseArray(SelectedCodes);
            break;
        }
    }

    var SelectedDescriptions = document.getElementById("SavedDescription_TextBox").value.split("^");
    for (var i = 0; i < SelectedCodes.length; i++) {
        if (row.cells.length > 2 && SelectedDescriptions[i] == trim(row.cells[2].innerHTML.replace(/(&nbsp;)*/g, ""))) {
            SelectedDescriptions[i] = "";
            document.getElementById("SavedDescription_TextBox").value = CollapseArray(SelectedDescriptions);
            break;
        }
    }
}

function SaveRowColor(row) {
    if (RowColors[row.id] == null) {
        RowColors[row.id] = row.currentStyle ? row.currentStyle.backgroundColor : row.style ? row.style.backgroundColor : '';
    }
}

function GetRowColor(row) {
    return RowColors[row.id];
}

function getHexBackgroundColor(rgb) {
    var rgbColorCode = rgb;
    rgb = rgbColorCode.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgb == null)
        rgb = rgbColorCode.match(/^rgba\((\d+),\s*(\d+),\s*(\d+)\,\s*(\d+)\)$/);
    if (rgb == null)
        return rgbColorCode;
    function hex(x) { return ("0" + parseInt(x).toString(16)).slice(-2); }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

var LIGHT_GREEN = "#bdd2d2"

function SetRowSelected(obj) {

    var DataGridID = ""
    var bSingleSelect = false
    var SingleSelectID = ""
    var bSelectRow = true
    var rowNum = obj.getAttribute("rowNum");

    DataGridID = obj.parentNode.parentNode.id
    if (DataGridID.indexOf("_") > -1) {
        i = DataGridID.indexOf("_")
        DataGridID = DataGridID.substring(0, i)
    }
    SingleSelectID = DataGridID + "_SingleSelect"
    if (typeof (document.forms[0].elements[SingleSelectID]) == "undefined") { bSingleSelect = false }
    else { bSingleSelect = (document.forms[0].elements[SingleSelectID].value == "true") }

    var backgroundColor = obj.style.backgroundColor;

    if (backgroundColor.indexOf("#") == -1 && backgroundColor != "")
        backgroundColor = getHexBackgroundColor(backgroundColor);

    bSelectRow = (backgroundColor != LIGHT_GREEN)

    if (bSingleSelect == true) {
        //reset bSelected.
        if (!bSelectRow) { document.forms[0].elements[DataGridID + "_bSelected"].value = "" }
        else {
            bSomethingSelected = (document.forms[0].elements[DataGridID + "_bSelected"].value == "true")
            // Only allow 1 row selected. If another row is selected, clear that row.
            if (bSomethingSelected) {
                PreviousSelectedSingleRow.style.backgroundColor = GetRowColor(PreviousSelectedSingleRow);
            }

            //Remove any values from SavedSelection_TextBox. 
            document.getElementById("SavedSelection_TextBox").value = "";

            // Set bSelected and stach away the row in case the user selects another row and we need to deselect this one.
            document.forms[0].elements[DataGridID + "_bSelected"].value = "true"
            PreviousSelectedSingleRow = obj;
        }
    }
    else {
        if (ShiftKeyPressed == true && RowWithShiftKeyPressed > -1) {
            if (document.selection) { document.selection.empty() }
            else if (window.getSelection) { window.getSelection().removeAllRanges() }
            if (RowWithShiftKeyPressed > GetRowNumber(rowNum)) {
                for (i = GetRowNumber(rowNum); i <= RowWithShiftKeyPressed; i++) {
                    var row;
                    row = obj.parentNode.parentNode.rows[i];
                    SaveRowColor(row);
                    AddCodeToCollection(row);
                    row.cells[0].childNodes[0].checked = true;
                    row.style.backgroundColor = LIGHT_GREEN;
                }
            }
            else {
                for (i = RowWithShiftKeyPressed; i <= GetRowNumber(rowNum); i++) {
                    var row;
                    row = obj.parentNode.parentNode.rows[i];
                    SaveRowColor(row);
                    AddCodeToCollection(row);
                    row.cells[0].childNodes[0].checked = true;
                    row.style.backgroundColor = LIGHT_GREEN;
                }
            }
        }
        else { RowWithShiftKeyPressed = GetRowNumber(rowNum) }
    }

    if (bSelectRow) {
        SaveRowColor(obj);
        AddCodeToCollection(obj);
        obj.style.backgroundColor = LIGHT_GREEN
    }
    else {
        obj.style.backgroundColor = GetRowColor(obj);
        if (obj.cells[0].childNodes[0].checked)
            obj.cells[0].childNodes[0].checked = false;
        RemoveCodeFromCollection(obj);
    }

    if (document.selection) { document.selection.empty() }
    else if (window.getSelection) { window.getSelection().removeAllRanges() }
}

function GetRowNumber(rowString) {
    return (rowString != undefined ? parseInt(rowString.substring(3, rowString.length), 10) : 0);
}

function SetShiftKeyPressed(e) {
    var pressed; if (!e) var e = window.event; if (e.keyCode) pressed = e.keyCode; else if (e.which) pressed = e.which;
    if (pressed == 16) { ShiftKeyPressed = true }
}

function ClearShiftKeyPressed(e) {
    var pressed; if (!e) var e = window.event; if (e.keyCode) pressed = e.keyCode; else if (e.which) pressed = e.which;
    if (pressed == 16) { ShiftKeyPressed = false }
}

function ToggleSelectAll(GridID) {
    var Table = document.getElementById(GridID + "_DataTable")


    ss = document.activeElement.innerHTML
    if (ss == "Select All") {
        document.activeElement.innerHTML = "Clear All"
        for (i = 0; i <= Table.rows.length - 1; i++) {
            SaveRowColor(Table.rows(i));
            AddCodeToCollection(Table.rows(i));
            Table.rows(i).style.backgroundColor = LIGHT_GREEN
        }
    }
    else {
        document.activeElement.innerHTML = "Select All"
        for (i = 0; i <= Table.rows.length - 1; i++) {
            Table.rows(i).style.backgroundColor = GetRowColor(Table.rows(i));
            RemoveCodeFromCollection(Table.rows(i));
        }
    }


}

function LookupSelectAll(GridID) {

    var Table = document.getElementById(GridID)

    for (i = 1; i <= Table.rows.length - 1; i++) {
        SaveRowColor(Table.rows[i]);
        AddCodeToCollection(Table.rows[i]);
        Table.rows[i].style.backgroundColor = LIGHT_GREEN
    }
}

function LookupClearAll(GridID) {
    var Table = document.getElementById(GridID)
    for (i = 1; i <= Table.rows.length - 1; i++) {
        Table.rows[i].style.backgroundColor = GetRowColor(Table.rows[i]);
        RemoveCodeFromCollection(Table.rows[i]);
    }
}

function GetCell(obj, index) {
    // Given a cell of a row and an index to find (zero relative)
    // will reutrn the given cell index from the same row.

    row = GetParentByTag(obj, "TR")
    return row.cells[index]

}

function GetParam(obj, param) {
    // Given a control in a row (obj), will return
    // a control whose name ends in param that lives in the 
    // same row.  This function assumes that the html table
    // was created by a ysiDataGrid.

    if (obj.tagName == "TR") { Row = obj }
    else {
        Row = GetParentByTag(obj, "TR")
    }
    ControlID = Row.id + "_" + param
    Control = document.getElementById(ControlID)
    return Control


}

function MessageHandlerSelect(obj) {
    try {
        obj.focus();
        obj.select();
    }
    catch (any) { }

}

function ResetSelection() {
    var bSingleSelect = false
    if (typeof (document.forms[0].elements["LookupGrid_SingleSelect"]) == "undefined") { bSingleSelect = false }
    else { bSingleSelect = (document.forms[0].elements["LookupGrid_SingleSelect"].value == "true") }

    if (document.getElementById("SavedSelection_TextBox").value != "") {
        var SelectedCodes = document.getElementById("SavedSelection_TextBox").value.split("^");
        var DataTable = document.getElementById("LookupGrid");

        for (var i = 0; i < DataTable.rows.length; i++) {
            for (var j = 0; j < SelectedCodes.length; j++) {
                if (SelectedCodes[j] == DataTable.rows[i].childNodes[1].innerText) {
                    SaveRowColor(DataTable.rows[i]);
                    DataTable.rows[i].style.backgroundColor = LIGHT_GREEN;
                    if (bSingleSelect == true && SelectedCodes.length == 1) {
                        document.forms[0].elements["LookupGrid_bSelected"].value = "true";
                        PreviousSelectedSingleRow = DataTable.rows[i];
                    }
                    break;
                }
            }
        }
    }
}

function ShowSelection(row) {
    var TargetID
    var Target
    var CodeValue = ""
    var DescriptionValue = ""
    var SelectedCount = 0

    CodeValue = document.getElementById("SavedSelection_TextBox").value;
    if (CodeValue == "") {
        AddCodeToCollection(row);
        CodeValue = document.getElementById("SavedSelection_TextBox").value;
    }

    /* Strip out illegal spaces (basically before and after a code) */
    CodeValue = trim(CodeValue.replace(/\s?\^\s?/g, "^"));

    DescriptionValue = document.getElementById("SavedDescription_TextBox").value;
    /* Strip out illegal spaces (basically before and after a description) */
    DescriptionValue = trim(DescriptionValue.replace(/\s?\^\s?/g, "^"));

    // Don't prompt description if multi-select.
    if (CodeValue.indexOf("^") > 0) { DescriptionValue = "" }

    // Set Code and Description values (optionally).
    TargetID = document.getElementById("CodeTarget").value
    if (TargetID != "") {

        Target = window.parent.document.all(TargetID);
        Target.value = CodeValue;
        if ((typeof Target.focus !== "undefined") && (Target.clientWidth > 0)) Target.focus();
        window.parent.gotChange2(Target);

        if (Target.fireEvent) {
            Target.fireEvent("onChange");
        }
        else if (Target.dispatchEvent) {
            var evt = document.createEvent('HTMLEvents');
            var args = Target.getAttribute("onchange");
            evt.initEvent('change', false, true);
            Target.dispatchEvent(evt);
        }
    }

    TargetID = document.getElementById("DescriptionTarget").value;
    if (TargetID != "") {
        Target = window.parent.document.all(TargetID);        
        if (Target != null 
        && document.getElementById("CodeTarget") 
        && TargetID.toLowerCase() != document.getElementById("CodeTarget").value.toLowerCase()) {
            if (Target.nodeName == "SPAN")
                Target.innerHTML = DescriptionValue;
            else if (Target.nodeName == "INPUT")
                Target.value = DescriptionValue;
        }
    }

    window.parent.jQuery(".listWindow").dialog("close");
}

function GetTotal(obj) {
    // Given a cell from a table that contains an INPUT text box, will return the 
    // total for that column.

    table = GetParentByTag(obj, "TABLE")
    row = GetParentByTag(obj, "TR")
    columnNum = -1
    for (i = 0; i < row.cells.length; i++) {
        if (obj.id == row.cells[i].childNodes[0].id) {
            columnNum = i
            break;
        }
    }
    if (columnNum == -1) { return 0 }

    gridTotal = 0
    for (i = 0; i < table.rows.length; i++) {
        gridTotal += parseNum(table.rows[i].cells[columnNum].childNodes[0])
    }
    return gridTotal


}



function GetLinkParam(name) {

	if (BrowserDetect.browser != "MSIE") {
		Row = GetParentByTag(event.currentTarget, "TR")
	}
	else {
		Row = GetParentByTag(document.activeElement, "TR")
	}
    return GetParam(Row, name)


}


function LeftPad(sToBePadded, sPad, dFinalLength) {
    var sTemp = "";
    for (i = 0; i < dFinalLength - sToBePadded.length; i++) {
        sTemp += sPad.toString();
    }

    return sTemp.concat(sToBePadded);
}

function Redirect(URL) {
    document.location.href = URL
}

function SetInitialFocus(obj) {
    // If the page failed to load, we'll still call this, 
    // so make sure it's not null.
    if (obj == null) { return }

    try {
        if (obj.isDisabled) { return; }

        obj.focus()
        if (obj.tagName == "SELECT") { return }
        // We do this create range business because in certain conditions (I don't really know why), the
        // text box will have the focus, but the user won't see the cursor.
        //var o = obj.createTextRange()
        //o.moveEnd("character", -(obj.value.length))
        //o.select()
        jQuery("#" + obj.id).select().focus();

    }
    catch (any) { }
}

function GridOnResize(GridName) {

    var DataDiv = document.getElementById(GridName + "_DataDiv")
    var HeaderDiv = document.getElementById(GridName + "_HeaderDiv")
    var HeaderTable = document.getElementById(GridName + "_HeaderTable")
    var DataTable = document.getElementById(GridName + "_DataTable")
    var TotalsDiv = document.getElementById(GridName + "_TotalsDiv")
    var newWidth;

    // Width of the grid if it was fully extended.
    var fullWidth = DataTable.scrollWidth

    // This is an empty grid, so don't do anything.
    if (fullWidth == 0) { return }

    // Width of the grid currently.
    var curWidth = DataDiv.style.posWidth
    if (curWidth == undefined) {
        curWidth = DataDiv.clientWidth;
    }

	// Width of the page.
	var pageWidth;
    pageWidth = CheckUserBrowserAgnostic() ? window.screen.availWidth :  document.body.clientWidth;

    // Get the difference betwen the page width and the grid width.  This number
    // could be pos or neg.  Add 50 as a buffer.
    if (BrowserDetect.OS == "iPad" && BrowserDetect.browser == "Safari") {
    		var spaceWidth = 0	
    }
    else	{
    		var spaceWidth = pageWidth - curWidth - 50	
    }

    if (curWidth + spaceWidth == fullWidth) {
        // We've got exactly enough room.
        newWidth = fullWidth
    }
    else if (curWidth + spaceWidth > fullWidth) {
        // We've got room too much room.  Increase the size of the grid.  Add 19 for the vert scroll bar. 
        // If there's not vert scroll bar, this will get subtracted later.
        newWidth = fullWidth + 19;
       
    }
    else if (curWidth + spaceWidth < fullWidth) {
        // We don't have enough room to show the whole grid.  Take up what's available.
        newWidth = curWidth + spaceWidth
    }

    DataDiv.style.width = newWidth
    HeaderDiv.style.width = newWidth
    if (TotalsDiv != null) { TotalsDiv.style.width = newWidth; }

    var gridTop = TrueOffset(DataDiv) - 50

    // get the available height of the page
    var availHeight = document.body.clientHeight
    // get the vertical scroll position.  This is the scroll bar position of the page itself.  The further down it's scrolled,
    // the more room our grid has.
    var scrollTop = document.body.scrollTop - 50
    // get the tallest possible grid height.  Leave a 20px or 50px border on the bottom.    
    var heightOffset = 0
    if (TotalsDiv == null) { heightOffset = 20 }
    else { heightOffset = 50 }
    var gridHeight = availHeight - heightOffset - gridTop + scrollTop


    // if the tallest grid is too tall, then reduce the size to what the TABLE object needs to 
    // display without a scroll bar.  Without this check, the horizontal scroll bar would be
    // too low in relation to the TABLE.  

    // Also, show or hide the bottom border of the table.  We want it to show if there's a vert scroll 
    // bar, but not show if there isn't.  And never show it if there's DivTotals.
    if (gridHeight > DataTable.clientHeight) { DataDiv.style.borderBottom = "" }
    else if (TotalsDiv == null) { DataTable.style.border = "solid 1px #BEBEBE" }

    if (gridHeight > DataTable.clientHeight) {
        if (TotalsDiv == null) { gridHeight = DataTable.clientHeight + 20 }
        else { gridHeight = DataTable.clientHeight + 3 }
    }

    if (DataDiv.parentNode.align.toLowerCase() == "center") {
        HeaderDiv.style.left = '';
    }

    // If the grid is taller than the avail height, then don't shrink it beyond 40px.  If the
    // grid is shorter than the avail height, set it so it will display the whole grid.
    if (gridHeight > 100 || gridHeight > DataDiv.scrollHeight) { DataDiv.style.height = gridHeight; }

    // if the table is displayed without a scroll bar, and the HeaderDiv has a space for the scroll bar (i.e.
    // it's widith is 16px less), then extend the HeaderDiv width by 16.
    if (DataDiv.scrollHeight <= DataDiv.clientHeight && DataDiv.style.posWidth - HeaderDiv.style.posWidth == 16) {
        HeaderDiv.style.width = HeaderDiv.style.posWidth + 16
        if (TotalsDiv != null) { TotalsDiv.style.width = TotalsDiv.style.posWidth + 16 }
    }
    // If there's no offset, and a scroll bar is displaying, then subtract the offset.
    else if (DataDiv.scrollHeight > DataDiv.clientHeight && DataDiv.style.posWidth == HeaderDiv.style.posWidth) {
        if (BrowserDetect.browser == "Firefox") {
            DataDiv.style.width = DataDiv.style.posWidth + 16;
        }
        HeaderDiv.style.width = parseInt(HeaderDiv.style.width.replace("px", "")) - ( CheckUserBrowserAgnostic() ? 0: 16 );
        if (TotalsDiv != null) { TotalsDiv.style.width = parseInt(TotalsDiv.style.width.replace("px", "")) - ( CheckUserBrowserAgnostic() ? 0 : 16 ) }
        if (DataDiv.parentNode.align.toLowerCase() == "center") {
            HeaderDiv.style.left = -8;
        }
    }

    if (DataTable.rows.length == 0) {
        var widthDiff = HeaderTable.offsetWidth - HeaderDiv.offsetWidth;
        if (widthDiff > 0 && widthDiff < 16) {
            HeaderDiv.style.width = HeaderTable.offsetWidth;
            if (TotalsDiv != null) { TotalsDiv.style.width = HeaderTable.offsetWidth; }
        }
    }

    //Added to ensure that auto-resize works correctly on all browsers.
    DataDiv.style.maxHeight = '';
}

function TrueOffset(obj) {
    var offset = 0

    do {
        offset += obj.offsetTop
        if (obj.offsetParent == null) { return offset; }
        obj = obj.offsetParent
    }
    while (true);

}

function GridOnLoad(GridName) {
    DataDiv = document.getElementById(GridName + "_DataDiv")
    HeaderDiv = document.getElementById(GridName + "_HeaderDiv")
    DataTable = document.getElementById(GridName + "_DataTable")
    HeaderTable = document.getElementById(GridName + "_HeaderTable")
    ContainerDiv = document.getElementById(GridName + "_DataGridContainer")

    if (DataDiv && HeaderDiv && DataTable && HeaderTable && ContainerDiv) {
		DataDiv.className = DataDiv.className + " IPADscrollbar";
        TabDiv = ContainerDiv.parentNode
        if (typeof TabDiv.className != "undefined" && TabDiv.className.toLowerCase() != "tabbody") {
            //find closest TabDiv having Class="TabBody"
            var maxCheck = 0;
            while (maxCheck < 10 && typeof TabDiv.className != "undefined" && TabDiv.className.toLowerCase() != "TabBody".toLowerCase()) {
                TabDiv = TabDiv.parentNode;
                maxCheck++;
            }
        }

        var tabVisiblity = "";
        if (TabDiv && TabDiv.style) {
	        tabVisiblity = TabDiv.style.visibility;			
            TabDiv.style.display = '';
            TabDiv.style.visibility = '';
        }

        //TabDiv.style.zIndex = -1

        DataDiv.style.border = "none";
        DataDiv.style.zIndex = 1;

        //remove horizontal scrollbar from dataDiv
        var scrollbarWidth = DataDiv.scrollWidth - DataDiv.clientWidth;
        if (scrollbarWidth) {
            //if (BrowserDetect.browser == "Firefox") {
            DataDiv.style.width = DataDiv.offsetWidth + scrollbarWidth;
            //}
        } else if (DataTable.scrollWidth > 0 && DataDiv.scrollWidth > DataTable.scrollWidth) {
            DataDiv.style.width = DataTable.scrollWidth + (DataDiv.scrollHeight > DataDiv.clientHeight ? 16 : 0) + 2;
        }

        //set HeaderDiv Width
        if (DataDiv.clientWidth > 0 && HeaderDiv.clientWidth < DataDiv.clientWidth) {
            HeaderDiv.style.width = DataDiv.clientWidth;
        }

        if (BrowserDetect.browser != "MSIE") {
            //adjust TotalsDiv Height to remove blank space
            var TotalsDiv = document.getElementById(GridName + "_TotalsDiv");
            if (TotalsDiv) {
                var TotalsTable = TotalsDiv.getElementsByTagName("table")[0];
                if (TotalsTable.scrollHeight < TotalsDiv.clientHeight) {
                    TotalsDiv.style.height = '';
                }
            }
        }

        if (DataDiv.parentNode.align.toLowerCase() == "center" && DataDiv.scrollHeight - DataDiv.clientHeight) {
            HeaderDiv.style.left = -8;
        }
        
        //set datatable border color
        var borderColor;
        if (HeaderTable.currentStyle) {
            borderColor = HeaderTable.currentStyle.borderTopColor;
            DataTable.style.borderColor = borderColor;
        }
        else if (window.getComputedStyle) {
            borderColor = document.defaultView.getComputedStyle(HeaderTable, null).getPropertyValue("border-top-color");
            borderColor = rgbTohex(borderColor)
            DataTable.style.setProperty("border-color", borderColor, "important");
        }

        ContainerDiv.style.zIndex = 1;

        if (DataTable.rows.length == 0 && HeaderTable.offsetWidth > 0) {
            HeaderDiv.style.width = HeaderTable.offsetWidth; //assumed if grid have not set to AutoExpand, if AutoExpand header width will be reset by GridOnResize
        } else if (DataDiv.offsetHeight < DataTable.offsetHeight) {
            DataDiv.style.borderBottomWidth = 1;
            DataDiv.style.borderBottomStyle = 'solid';
            DataDiv.style.borderBottomColor = borderColor;
        }

        if (TabDiv && TabDiv.style) {
            TabDiv.style.display = tabVisiblity == "hidden" ? "none" : "";
            TabDiv.style.visibility = tabVisiblity;
        }
        // We set the borderColor to white on the server so you don't see a ghost frame of the table.
        // Set it to LightGrey here.

        // HeaderTable and DataTable might be NULL if there's no data.
        //if (DataTable != null) {DataTable.borderColor="LightGrey"}
        //if (HeaderTable != null) {HeaderTable.borderColor="LightGrey"}       
        
      					
	if(BrowserDetect.browser == "MSIE" && BrowserDetect.version == 9) {
		DataDiv.style.height = DataDiv.style.maxHeight;
		DataDiv.style.Width = DataTable.scrollWidth + (DataDiv.scrollHeight > DataDiv.clientHeight ? 16 : 0) + 2
	}
					
	if(BrowserDetect.browser == "MSIE" && BrowserDetect.version == 8) {
		var tWidth;
		tWidth = 0;
		tWidth = jQuery('#' + DataDiv.id).width();
		tWidth = tWidth + 1;
		jQuery('#' + DataDiv.id).width(tWidth);
	}
    }
}

function ToggleVisibility(obj) {

    try {
        if (obj.style.visibility == "hidden") { obj.style.visibility = "visible" }
        else { obj.style.visibility = "hidden" }
    }
    catch (any) { }
}

function show_clock(Dest) {
    newWindow = window.open(GetBlankPage(), 'Clock', 'width=420,height=140,status=no,resizable=no,top=225,left=175');
    newWindow.location = '../time.asp?Dest=' + Dest;
    if (typeof newWindow != 'unknown') {
        newWindow.focus();
    }
}



function DisplayMenu(sender) {
    //whichDiv = event.srcElement;
    sender.style.leftPos += 10;

    (function($) {
        var d;

        if (!$.browser.msie) {
            $(sender).closest("table").css({ 'z-index': '' });
            d = $('<div class="menuOverLay" style="position:fixed;width:100%;top:0px;z-index: 1;display:inline-block; left:0px;height:' + $(window).height() + 'px"></div>');
            d.click(function(e) { $(sender).hide(); $(".menuOverLay").remove(); });
        }
        $(sender).css("visibility", "");
        $(sender).show();

        $(sender).children().each(function(ind, menuItem) {
            // $(menuItem).unbind("mouseover").unbind("mouseout").unbind("click");
            $(menuItem).click(function(e) {
                ClickMenu(this);
            });
            $(menuItem).mouseover(function(e) {
                $(this).toggleClass("HighlightItem");
            }).mouseout(function(e) {
                $(this).toggleClass("HighlightItem");
            });
        });

        $(sender).css({ 'width': '', 'display': 'inline-block' });
        if (d)
            $(sender).after(d);
    })(jQuery);
    sender.onclick = null;
}

function SwitchMenu() {
    return;
    srcElement = event.srcElement;
    if (srcElement.className == "MenuItem") {
        srcElement.className = "HighlightItem";
        document.forms[0].style.cursor = "hand";
    } else if (srcElement.className == "HighlightItem") {
        srcElement.className = "MenuItem";
        document.forms[0].style.cursor = "auto";
    }
}
function ClickMenu(sender) {
    if (typeof sender.releaseCapture != "undefined") {
        sender.releaseCapture();
        //        sender.style.display = "none";
    }
    eval(sender.getAttribute("eventArgs"));
}

function DefaultCursor(obj) {

    obj.style.cursor = "auto";
}

function ExecTabClick(tabClicked, PageID, ElemID, sQuery) {

    var tabs;
    var i;
    var parent;

    if (tabClicked == null) { return }
    parent = tabClicked.parentNode
    tabs = parent.childNodes

    for (i = 0; i < tabs.length; i++) {
        if (tabs[i].id == tabClicked.id) { tabs[i].className = "tab_Active" }
        else if (tabs[i].className == "tab_Active") { tabs[i].className = "tab_Left" }
    }
    document.frames("frame_" + ElemID).location.href = "Execform.aspx?ID=" + PageID + sQuery;
}

function ConfirmAndRedirect(message, sURL) {
    bConfirm = (confirm(message));
    if (!bConfirm) return false;
    else {
        Redirect(sURL);
    }
}

//[22]
// Get the specified cookie
function GetSubCookie(sCookie, sSubKey) {

    // get an array of cookies.
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        // if this is the cookie we're looking for.
        if (trim(cookies[i]).indexOf(sCookie) == 0) {
            // now get an array of sub cookies.  At this point, the 
            // cookie will look like: "MyCookie=SubCookieA=1&SubCookieB=2"
            var subCookies = cookies[i].replace(sCookie + "=", "").split("&");
            for (var j = 0; j < subCookies.length; j++) {
                if (trim(subCookies[j].split("=")[0]) == trim(sSubKey)) {
                    return subCookies[j].split("=")[1].replace(/comma/g, ",");
                }
            }
        }
    }

    return null;
}


function checkLength(textArea, maxLength) {
    /* Checks the max allowed length of a text area. If too long, truncates the value in the text area */
    if (textArea.value.length > maxLength) {
        textArea.value = textArea.value.substring(0, maxLength);
    }
}



//============================================= Start Progress Bar =========================================================

function createBar() {
    doCreateBar(200, 15, 1, 85, 7, 3, '', 500, 300)
}

function doCreateBar(width, height, borderWidth, speed, blocks, count, action) {

    var N = -1;
    var top = "expression(parentNode.offsetHeight/2);"
    var t = '<div id=progressBarDiv align=center style="width:100%;height:100%;">'
    t += '<span style="font-size:8pt;font-family:Verdana;top;position:relative;top:' + top + '">Please wait.....</span>'
    t += '<DIV class="progressBar" '
    t += 'id="_xpbar' + (++N) + '" '
    t += 'STYLE="visibility:visible; overflow:hidden; width:' + width + 'px; height:' + height + 'px; '
    t += 'border-width:' + borderWidth + 'px; '
    t += 'border-style:solid; '
    t += 'font-size:1px;'
    t += 'POSITION:relative; '
    t += 'top:' + top + '">'




    t += '<span id="blocks' + N + '" style="left:-' + (height * 2 + 1) + 'px; position:absolute; font-size:1px">';

    for (i = 0; i < blocks; i++) {
        t += '<span class="progressBar" style="left:-' + ((height * i) + i) + 'px; font-size:1px; position:absolute; width:' + height + 'px; height:' + height + 'px; '
        t += 'filter:alpha(opacity=' + (100 - i * (100 / blocks)) + ')'
        t += '"></span>';
    }
    t += '</span></div></div>';
    document.write(t);
    var bA = document.getElementById['blocks' + N]
    bA.bar = document.getElementById['_xpbar' + N]
    bA.blocks = blocks;
    bA.N = N;
    bA.width = width;
    bA.height = height;
    bA.speed = speed;
    bA.ctr = 0;
    bA.count = count;
    bA.action = action;
    bA.togglePause = togglePause;
    bA.showBar = function() {
        this.bar.style.visibility = "visible";
    }
    bA.hideBar = function() {
        this.bar.style.visibility = "hidden";
    }
    bA.tid = setInterval('startBar(' + N + ')', speed);
    return bA;
}

function startBar(bn) {
    var t = document.getElementById['blocks' + bn]
    if (parseInt(t.style.left) + t.height + 1 - (t.blocks * t.height + t.blocks) > t.width) {
        t.style.left = -(t.height * 2 + 1) + 'px';
        t.ctr++;
        if (t.ctr >= t.count) {
            eval(t.action);
            t.ctr = 0;
        }
    } else t.style.left = (parseInt(t.style.left) + t.height + 1) + 'px';
}

function togglePause() {
    if (this.tid == 0) {
        this.tid = setInterval('startBar(' + this.N + ')', this.speed);
    } else {
        clearInterval(this.tid);
        this.tid = 0;
    }
}

function togglePause() {
    if (this.tid == 0) {
        this.tid = setInterval('startBar(' + this.N + ')', this.speed);
    } else {
        clearInterval(this.tid);
        this.tid = 0;
    }
}

//============================================= End Progress Bar =========================================================


//============================================= Start "The YSI.NET" Progress Bar ===========================================
function ProgressbarShow(myBarId) {
    var timerElement = document.getElementById("progressbarTimerId");
    if (timerElement == null) {
        timerElement = document.createElement("input");
        timerElement.type = "hidden";
        timerElement.id = "progressbarTimerId";
        timerElement.value = 0;
        document.body.appendChild(timerElement);
    }

    if (timerElement == null || timerElement.value != 0) { /* There's already a progress bar about to show. just exit */return; }

    /* Set the progressbar to show after 6 seconds */
    timerElement.value = setTimeout("ProgressbarShowDiv()", 6000);
    //timerElement.value = setTimeout("showLoading()", 6000);
}


function ProgressbarShowDiv(myBarId) {
    if (myBarId == null || myBarId == "") {
        myBarId = "DefaultProgressbar";
    }

    var myBar = ProgressbarGetDiv(myBarId);
    var myImage = ProgressbarGetImageElement(myBarId);
    if (myBar == null) return;

    var timerElement = document.getElementById("progressbarTimerId");
    if (timerElement != null) { timerElement.value = 0; }

    myBar.style.visibility = "visible";

    myBar.style.top = (Math.round((document.body.offsetHeight - myBar.clientHeight) / 2)) + "px";
    myBar.style.left = (Math.round((document.body.offsetWidth - myBar.clientWidth) / 2)) + "px";

    /* Hack to prevent <select> elements (DropDowns) show through the <div> element */
    var blankHtm = GetBlankPage();
    myBar.insertAdjacentHTML("beforeBegin", '<iframe style="position:absolute;z-index:99998;filter:alpha(opacity=0);" src="' + blankHtm + '" frameBorder="0" scrolling="no" id="' + myBarId + '_hvrShm" />');
    var iframeShim = ProgressbarGetIFrame(myBarId);
    iframeShim.style.top = myBar.style.top;
    iframeShim.style.left = myBar.style.left
    iframeShim.style.width = myBar.offsetWidth;
    iframeShim.style.height = myBar.offsetHeight;

    /* Hack to get the animated gif going again. For some reason it wouldn't run when making the progress bar div visible after being hidden */
    var imageSrc = myImage.src;
    myImage.src = "";
    myImage.src = imageSrc;
}

function ProgressbarHide(myBarId) {
    var timerElement = document.getElementById("progressbarTimerId");
    if (timerElement != null) {
        clearTimeout(timerElement.value);
        timerElement.value = 0;
    }

    //if (typeof HideLoading !== "undefined") HideLoading();
    if (myBarId == null || myBarId == "") {
        myBarId = "DefaultProgressbar";
    }

    var myBar = ProgressbarGetDiv(myBarId);
    if (myBar == null) return;
    myBar.style.visibility = "hidden";

    var myIFrame = ProgressbarGetIFrame(myBarId);
    if (myIFrame != null) {
        /* If the progress bar was never shown (ex. the delayed showing of the progress bar was cancelled before ProgressbarShowDiv() was invoked),
        then myIFrame will be null as ProgressbarShowDiv() adds it to the document */
        myIFrame.style.visibility = "hidden";
    }
}

function ProgressbarMoveTo(myBarId, x, y) {
    var myBar = ProgressbarGetDiv(myBarId);
    if (myBar == null) return;

    myBar.style.top = y + "px";
    myBar.style.left = x + "px";
}

function ProgressbarGetDiv(myBarId) {
    return document.getElementById(myBarId);
}

function ProgressbarGetIFrame(myBarId) {
    return document.getElementById(myBarId + "_hvrShm");
}

function ProgressbarGetImageElement(myBarId) {
    return document.getElementById(myBarId + "_Image");
}

function ProgressbarSetShowProgressBar(myBarId, myBool) {
    if (myBarId == null || myBarId == "") {
        myBarId = "DefaultProgressbar";
    }
    var myBar = ProgressbarGetDiv(myBarId)
    if (myBar == null) {
        ProgressbarShow(myBarId);
        return true;
    }
    myBar.showprogressbar = myBool;
    return true;
}

//============================================= End "The YSI.NET" Progress Bar =============================================



function ysiDoPostBack(eventTarget, eventArgument) {
    /* this function acts as a replacement for .NET's __doPostBack function.
    * Rumor has it that __doPostBack can be overridden in .NET 2.x. If true, this should be replaced when we move to .NET 2.0 */

    var RequestActionControl = document.getElementById("RequestAction");
    if (RequestActionControl != null) {
        RequestActionControl.value = "AutoPostBack";
    }

    var bSave = document.getElementById("BSAVE");
    if (bSave != null) {
        bSave.value = 1;
    }

	(function($) {
		$("input.ui-autocomplete-input").each(function() {
			var txtVal = this.value;
			if(txtVal != "" && trim($(this).val()).substr(txtVal.length -1) == "^")
				$(this).val(trim($(this).val()).substr(0, txtVal.length -1));
		});
	})(jQuery)
	
    ProgressbarShow();
	window.parent.clearMessage = false;
	 SetBase64Values();
    return __oldDoPostBack(eventTarget, eventArgument);
}

//when IE encouters a link that doesn't have a href="#", it fires the onbeforeunload event. 
//Then, when you confirm the javascript dialog box we're showing, the page will do the 'real' 
//unload to navigate to the other page, and raise the onbeforeunload event a second time.
var onBeforeUnloadFired = false;
function ResetOnBeforeUnloadFired() {
    onBeforeUnloadFired = false;
}

function ExitForm4ASPX(e) {
    /* version of ysilib.ExitForm for ASPX pages */
    if (!onBeforeUnloadFired && HasDataChanaged()) {
        var leave_message = "Your data has NOT been saved!";
        if (!e) e = window.event;
        if (!e) e = window.parent.document.getElementById("filter").contentWindow.event;
        if (e) {
            onBeforeUnloadFired = true;
            //e.cancelBubble is supported by IE - this will kill the bubbling process.
            e.cancelBubble = true;
            e.returnValue = leave_message;
            //e.stopPropagation works in Firefox.
            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
            window.setTimeout("ResetOnBeforeUnloadFired()", 1000);
        }

        //return works for Chrome and Safari
        return leave_message;
    }

    return;
}

function HasDataChanaged() {
    /* this routine will prompt if user has changed data without saving
    * Caller should set BSAVE = 1 if he wants to bypass this routine */
    var ifilterDocument;
    if (document.getElementById("BDATACHANGED") != null)
        ifilterDocument = document;
    else if (document.getElementById("filter") && document.getElementById("filter").contentWindow.document.getElementById("BDATACHANGED") != null)
        ifilterDocument = document.getElementById("filter").contentWindow.document;
    else
        return;

    //if (ifilterDocument.getElementById("BDATACHANGED") == null) { return }
    if (ifilterDocument.getElementById("BSAVE") != null && ifilterDocument.getElementById("BSAVE").value == "1") {
        ifilterDocument.getElementById("BSAVE").value = "0";
        return;
    }

    try {
        /* put this in try-catch because page might not have finished loading in which case querying document.activeElement result in an 'htmlfile: Unspecified error' */
        if (typeof (ifilterDocument.activeElement.href) != "undefined") {
            if (ifilterDocument.activeElement.href.indexOf("Lookup2") > 0) { return }
            if (ifilterDocument.activeElement.href.indexOf("show_calendar") > 0) { return }
            if (ifilterDocument.activeElement.href.indexOf("OpenNewWindow") > 0) { return }
            if (ifilterDocument.activeElement.href.indexOf("MessageHandlerSelect") > 0) { return }
        }
    }
    catch (any) {
        return;
    }

    /* trigger an onBlur, which will trigger the BDATACHANGED, in case they made a change without leaving the control */
    if (typeof (ifilterDocument.activeElement) != "undefined" && typeof (ifilterDocument.activeElement.name) != "undefined") {
        ifilterDocument.activeElement.blur();
    }

    if (ifilterDocument.getElementById("BDATACHANGED").value == "1") {
        return true;
    }
    return false;
}

function DoCancel(obj) {
    var bDevMode = (document.getElementById("bDevMode").value == "true")
    // If it's not the main window, always close it.
    // If it's developer mode, then don't close it 

    /* Check if data changed and is unsaved */
    var bDataChanged = document.getElementById("BDATACHANGED");
    bDataChanged = (bDataChanged == null) ? 0 : bDataChanged.value;

    var opener = typeof window.opener != "undefined" ? window.opener : null;
    //if (typeof(parent.document.frames["filter"]) == "undefined" || (bDevMode && opener != null)) {
    if (opener != null && opener.location.href.search("menu.aspx")) {
        // opener shouldn't be nothing here, but just in case...
        if (opener != null) {
            if (opener.document.getElementById('RequestAction') != null) {
                opener.document.getElementById('RequestAction').value = "Refresh";
            }
            SetBase64Values();
            opener.document.forms[0].submit();
        }
        window.close()
        return;
    }
    else {
        opener = window.parent; // if page is open into jquery dialogbox 
        if (opener != null && opener.location.href.search("menu.aspx")) {
            if (opener.document.getElementById('RequestAction') != null) {
                opener.document.getElementById('RequestAction').value = "Refresh";
            }
            SetBase64Values();
            opener.document.forms[0].submit();
            //close jquery ui-dialog box
            if (opener.jQuery) {
                (function($) {
                    $(".ui-dialog-content").dialog("close");
                })(opener.jQuery);
            }
        }
    }


    if ((typeof obj.innerText != "undefined" && obj.innerText == "Close") || (typeof obj.textContent != "undefined" && obj.textContent == "Close") && !bDevMode) {
        // They're not in edit mode, so just go home.
        parent.Home()
    }
    else {
        // Just submit the form.  This will throw away the changes and go back to readonly mode. 
        // Don't check for unsaved data
        document.getElementById("BSAVE").value = 1;
        if (document.getElementById("RequestAction") != null) {
            document.getElementById("RequestAction").value = "Cancel";
        }
        SetBase64Values();
        document.forms[0].submit()
    }
}

function MonthDiff(dtStart, dtEnd) {
    // Receives Dates (NOT objects) and returns the difference in integer. Based on PromptTerm in ysilib.js
    //Only looks at whole months, not part of

    iStartM = dtStart.getMonth() + 1
    iEndM = dtEnd.getMonth() + 1

    iStartY = dtStart.getFullYear();
    iEndY = dtEnd.getFullYear();

    iDiff = ((iEndY - iStartY) * 12) + (iEndM - iStartM);

    if (iDiff < 0) { iDiff = -1; }

    return iDiff;
}

function FilterHelp4Aspx(parm, link) {
    if (link != "true") {
        newWindow = window.open('../fltrhelp.aspx?sfile=' + parm + '&link=' + link, 'newWin', 'toolbar=yes,resizable=yes,location=yes,scrollbars=yes,width=450,height=550,name=FltrHelp')

        if (typeof newWindow != 'unknown') { newWindow.focus(); }
    }
    else {
        location.href = "../fltrhelp.aspx?sfile=" + parm + "&link=" + link
    }
    return newWindow;
}

function CloseMe() {
    if (CheckUserBrowserAgnostic()) {
        if (window.parent != null) {
            if (window.parent.jQuery) { (function($) { $(".ui-dialog-content").dialog("close"); })(window.parent.jQuery); }
        }
        //window.close();
    } else {
        if (opener == null) return;
        window.close();
    }
}

function CloseMeAndRefreshOpener() {
    if (CheckUserBrowserAgnostic()) {
        if (window.parent == null) return;
        if (typeof (window.parent.document.getElementById('RequestAction')) != 'undefined') {
            window.parent.document.getElementById('RequestAction').value = 'Refresh';
            SetBase64Values();
            window.parent.document.forms[0].submit();
        }
        if (window.parent.jQuery) { (function($) { $(".ui-dialog-content").dialog("close"); })(window.parent.jQuery); }
    } else {
        if (window.opener == null) return;
        if (typeof (window.opener.document.all('RequestAction')) != 'undefined') {
           if (window.opener.document.all('RequestAction') != null) { window.opener.document.all('RequestAction').value = 'Refresh';}
            SetBase64Values();
            window.opener.document.forms[0].submit();
        }
        window.close();
    }
}

function CloseMeAndGoHome() {
    var regExp = new RegExp("^/([^/]+)/");
    var webShare = (regExp.test(location.pathname)) ? RegExp.$1 : "";
	var sMenuSet;
	
    if (CheckUserBrowserAgnostic()) {
        if (window.parent == null) {
			//Append "sMenuSet" to href
			if (location.href.search("sMenuSet=")){
				sMenuSet = location.href.substring(location.href.indexOf("sMenuSet"));
			}
            parent.location.href = location.protocol + "//" + location.hostname + "/" + webShare + "/pages/menu.aspx" + (typeof sMenuSet == "undefined" ? "" : "?" + sMenuSet);
            return;
        }
		//Append "sMenuSet" to href
		if (window.parent.location.href.search("sMenuSet=")){
			sMenuSet = window.parent.location.href.substring(window.parent.location.href.indexOf("sMenuSet")) + (typeof sMenuSet == "undefined" ? "" : "?" + sMenuSet);
		}
        window.parent.location.href = location.protocol + "//" + location.hostname + "/" + webShare + "/pages/menu.aspx" + (typeof sMenuSet == "undefined" ? "" : "?" + sMenuSet);
        if (window.parent.jQuery) { (function($) { $(".ui-dialog-content").dialog("close"); })(window.parent.jQuery); }
    } else {
        if (opener == null) {
			//Append "sMenuSet" to href
			if (location.href.search("sMenuSet=")){
				sMenuSet = location.href.substring(location.href.indexOf("sMenuSet"));
			}
            parent.location.href = location.protocol + "//" + location.hostname + "/" + webShare + "/pages/menu.aspx" + (typeof sMenuSet == "undefined" ? "" : "?" + sMenuSet);
            return;
        }
		//Append "sMenuSet" to href
		if (opener.parent.location.href.search("sMenuSet=")){
			sMenuSet = opener.parent.location.href.substring(opener.parent.location.href.indexOf("sMenuSet"));
		}
        opener.parent.location.href = location.protocol + "//" + location.hostname + "/" + webShare + "/pages/menu.aspx" + (typeof sMenuSet == "undefined" ? "" : "?" + sMenuSet);
        window.close();
    }
}

function ProrateCalc() {
    AspWindow = window.open('../functions/Proration_Calc.asp', 'AspWindow', 'toolbar=no,resizable=no,location=no,scrollbars=no,top=10,left=10,height=100,width=400,alwaysraised=yes');
}

// called from menuscript.js TR#68468
function OpenNewWindowVista(URL) {
    if (URL.indexOf("FramesNav.aspx") >= 0) {
        var re = new RegExp("&", "g");
        URL = URL.replace(re, "%26")
    }

    var regExp = new RegExp("^/([^/]+)/");
    var webShare = (regExp.test(location.pathname)) ? "/" + RegExp.$1 + "/" : "";

    var topFrame = (this.top != null) ? this.top : this;

    //var win = window.open("about:blank", "_blank", "toolbar=no,resizable=yes,location=no,scrollbars=yes,height=100,width=100,top=" + topFrame.screenTop + ",left=" + (topFrame.screenLeft + 10))
    var win = window.open(GetBlankPage(), "_blank", "toolbar=no,resizable=yes,location=no,scrollbars=yes,height=600,width=1015,top=50,left=5");
    win.document.open()
    win.document.writeln("<body><img id='imgComputerWorking' src='" + webShare + "images/computer_working.gif'></body>")
    win.document.close()
    win.document.location.href = URL

}


function UpdateGridTotals(obj, validator, numericPrecision) {
    var newValue;
    var orgValue = jQuery('#' + obj.id).attr('orgValue') == undefined ? 0 : jQuery('#' + obj.id).attr('orgValue');

    /* Get the new value as a number (integer or double) */
    switch (validator) {
        case 4: 	/* Currency */
            newValue = IsValidCurrency(obj.value);
            if (newValue == null || isNaN(newValue)) { newValue = 0 }
            break;
        case 5: 	/* Integer */
            newValue = parseInteger(obj);
            if (newValue == false) { newValue = 0 }
            break;
        case 6: 	/* Double */
        case 7: 	/* Decimal */
            newValue = parseNum(obj, numericPrecision);
            if (newValue == false) { newValue = 0 }
            break;
    }

    /* Get our data column name */
    var reDataColName = new RegExp("^(.+)_DataTable_row\\d+_([a-zA-Z\\d]+)$");

    if (!reDataColName.test(obj.id)) {
        return;
    }

    var gridName = RegExp.$1;
    var dataColName = RegExp.$2;

    /* Get Totals span tag */
    var totalsSpanName = gridName + "_DataTable_row_Totals_" + dataColName;
    var totalSpan = document.getElementById(totalsSpanName);

    if (totalSpan != null) {
        var total = 0;

        switch (validator) {
            case 4: 	/* Currency */
                total = IsValidCurrency(totalSpan.innerHTML);
                total = (total - orgValue + newValue).toFixed(2);
                totalSpan.innerHTML = FormatCurrency(total);
                break;
            case 5: 	/* Integer */
                var objTotal = document.createElement('input');
                objTotal.value = totalSpan.innerHTML;
                total = parseInteger(objTotal);
                objTotal.value = total - orgValue + newValue;
                formatInteger(objTotal);
                totalSpan.innerHTML = objTotal.value;
                break;
            case 6: 	/* Double */
            case 7: 	/* Decimal */
                var objTotal = document.createElement('input');
                objTotal.value = totalSpan.innerHTML;
                total = parseNum(objTotal, numericPrecision);
                total = (total - orgValue + newValue).toFixed(numericPrecision);
                totalSpan.innerHTML = FormatDecimal(total, numericPrecision);
                break;
        }
    }

    jQuery('#' + obj.id).attr('orgValue', newValue);
}


var tabLeftMargin = 10;
function TabClick4Aspx2(tabClicked, target) {
    if (tabClicked == null) { return }

    var rowClicked = tabClicked.parentNode;
    if (rowClicked == null) { return }

    var tabStrip = rowClicked.parentNode;
    if (tabStrip == null) { return }

    var tabStripName = tabStrip.id;
    var oldTab = null;

    if (document.getElementById(tabStripName + "_ActiveCell").value != "") {
        oldTab = document.getElementById(document.getElementById(tabStripName + "_ActiveCell").value);
    }

    if (oldTab != null) {
        oldTab.className = "TabStripCell";
    }

    tabClicked.className = "TabStripActiveCell";

    var rowCount = tabStrip.children.length;
    if (rowCount > 1) {
        formatMultiLineTabstrip(tabStrip, rowClicked);
    } else {
        formatSingleLineTabstrip(tabStrip);
    }

    /* hide old tab and make new tab visible */
    var top = parseInt(tabStrip.offsetTop) + tabStrip.offsetHeight + 3;

    var divs = document.body.getElementsByTagName("DIV");

    for (var i = 0; i < divs.length; i++) {
        if (divs[i].className == "TabBody") {
            if (divs[i].id == target) {
                divs[i].style.display = "inline-block";
                divs[i].style.visibility = "visible";
                setActiveTabTop(divs[i], tabStrip);
                document.getElementById(tabStripName + "_ActiveCell").ActiveTabId = divs[i].id
            }
            // Only manipluate the top and visiblity properties if this tab is connected
            // to this tab strip.  This allows for multiple tab strips on one page.
            else if (tabStrip.getAttribute("tabIds") == null || tabStrip.getAttribute("tabIds").indexOf(divs[i].id + "^") >= 0) {
                divs[i].style.top = top;
                // This is to get around an apparent bug.  If we don't have this line,
                // then a ghost frame of the hidden tables shows up on the visible div.
                divs[i].style.visibility = "inherit";
                divs[i].style.visibility = "hidden"
                divs[i].style.display = "none";
            }
        }
    }

    document.getElementById(tabStripName + "_ActiveCell").value = tabClicked.id;

    //    if (target)
    //        SetDataDivWidth(target);

    //var $ = jQuery.noConflict();
    //(function($) {
    jQuery("div[id*='_IconMenu']:visible").hide();
    //})(jQuery);
}


function formatMultiLineTabstrip(tabStrip, rowClicked) {
    /* rearrange rows to make row containing the current tab the bottom most and set width for each cell */
    var tabStripName = tabStrip.id;
    var rowCount = tabStrip.children.length;
    var rowIndex = 0;

    while (rowIndex < rowCount) {
        var row = tabStrip.children[rowIndex];
        if (row.className == "TabStripRow") {
            if (row == rowClicked) {
                /* if the row clicked is not the bottom (foremost), we need to move it */
                tabStrip.removeChild(row);
                tabStrip.appendChild(row);
                row.id = tabStripName + "_row_" + (rowCount - 1);
                if (navigator.appName == "Microsoft Internet Explorer") {
                    row.style.top = ((rowCount - 1) * (row.firstChild.clientHeight || row.firstElementChild.offsetHeight) ) + "px";
                }
                else if (navigator.appName != "Microsoft Internet Explorer") {
                    row.style.top = ((rowCount - 1) * row.firstElementChild.offsetHeight) + "px";
                }

                tabStrip.children[rowIndex].id = tabStripName + "_row_" + (rowIndex - 1);
                if (navigator.appName == "Microsoft Internet Explorer") {
                    tabStrip.children[rowIndex].style.top = ((rowIndex - 1) * (row.firstChild.clientHeight || row.firstElementChild.offsetHeight) ) + "px";
                }
                else if (navigator.appName != "Microsoft Internet Explorer") {
                    tabStrip.children[rowIndex].style.top = ((rowIndex - 1) * row.firstElementChild.offsetHeight) + "px";
                }
                ++rowIndex;
            } else {
                row.id = tabStripName + "_row_" + (rowIndex - 1);
                if (navigator.appName == "Microsoft Internet Explorer") {
                    row.style.top = ((rowIndex - 1) * (row.firstChild.clientHeight || row.firstElementChild.offsetHeight) ) + "px";
                }
                else if (navigator.appName != "Microsoft Internet Explorer") {
                    row.style.top = ((rowIndex - 1) * row.firstElementChild.offsetHeight) + "px";
                }
                ++rowIndex;
            }
        }
    }

    /* Format tabs. Set widths */
    var cellWidth = new Array(rowCount);
    var rowWidth = new Array(rowCount);
    var maxRowWidth = 0;
    for (var i = 0; i < rowCount; i++) {
        var row = tabStrip.children[i];
        if (row.className == "TabStripRow") {
            var cellCount = row.children.length;

            cellWidth[i] = new Array(cellCount);
            var runningRowWidth = 0;

            for (var j = 0; j < cellCount; j++) {
                cellWidth[i][j] = (row.children[j].tabWidth > -1) ? parseInt(row.children[j].tabWidth, 10) : row.children[j].offsetWidth + 20;
                runningRowWidth += cellWidth[i][j];
            }

            rowWidth[i] = runningRowWidth;
            if (runningRowWidth > maxRowWidth) { maxRowWidth = runningRowWidth; }
        }
    }

    /* Set cell widths */
    for (var i = 0; i < rowCount; i++) {
        var row = tabStrip.children[i];
        if (row.className == "TabStripRow") {
            var cellCount = row.children.length;

            var remainingRowWidth = maxRowWidth;
            var sortedCellIndexByWidth = sortCellIndexByWidth(cellWidth[i]);

            for (var j = 0; j < cellCount; j++) {
                var avgCellWidth = Math.round(remainingRowWidth / (cellCount - j));
                var cell = row.children[sortedCellIndexByWidth[j]];

                if (cell.tabWidth > -1) {
                    cell.style.width = (cell.tabWidth) + "px";
                } else if (cell.offsetWidth > avgCellWidth) {
                    remainingRowWidth -= cell.offsetWidth;
                    cell.tabWidth = cell.offsetWidth;
                } else {
                    cell.style.width = (avgCellWidth) + "px";
                    cell.tabWidth = avgCellWidth;
                    remainingRowWidth -= avgCellWidth;
                }
            }
        }
    }

    var maxTabsPerRow = tabStrip.maxTabsPerRow;
    /* Set cell lefts and top */
    for (var i = 0; i < rowCount; i++) {
        var row = tabStrip.children[i];
        if (row.className == "TabStripRow") {
            var ind = 0;
            while (row.childNodes[ind].nodeName != "#text" && ind < row.childNodes.length) {
                row.childNodes[ind].style.width = (row.firstChild.tabWidth + (i) * 2) + "px";
                row.childNodes[ind].marginLeft = (tabLeftMargin + 2 * (rowCount - i)) + "px";
                ind++;
                break;
            }
            row.lastChild.style.width = (row.lastChild.tabWidth + (i) * 2) + "px";
            setTabCellPositions(row, maxTabsPerRow, false);
            row.style.height = (row.firstChild.clientHeight + 2) + "px";
            row.style.borderBottom = "";
        }
    }

    if (tabStrip.lastChild != null) {
        tabStrip.lastChild.style.borderBottom = "solid black 1px";
        var tabHeight = parseInt(tabStrip.lastChild.offsetHeight, 10) + parseInt(tabStrip.lastChild.offsetTop, 10) + 5;
        tabStrip.style.height = tabHeight + "px";
    }
}


function formatSingleLineTabstrip(tabStrip) {
    var maxTabsPerRow = tabStrip.maxTabsPerRow;
    /* Set cell lefts and top */
    var row = tabStrip.children[0];
    if (row.className == "TabStripRow") {
        for (var i = 0; i < row.children.length; i++) {
            if (parseInt(row.children[i].tabWidth ? row.children[i].tabWidth : row.children[i].attributes["tabwidth"]) < 0) {
                if (row.children[i].tabWidth)
                    row.children[i].tabWidth = row.children[i].offsetWidth + 10;
                else
                    row.children[i].attributes["tabwidth"] = row.children[i].offsetWidth + 10;
            }
            if (row.children[i].tabWidth) {
                if (row.children[i].tabWidth.toString().indexOf("%") > 0) { row.children[i].style.width = row.children[i].tabWidth; }
                else { row.children[i].style.width = row.children[i].tabWidth + "px"; }
            } else {
                if (row.children[i].attributes["tabwidth"].toString().indexOf("%") > 0) { row.children[i].style.width = row.children[i].attributes["tabwidth"] }
                else { row.children[i].style.width = row.children[i].attributes["tabwidth"] + "px"; }
            }
        }

        get_firstchild(row).style.marginLeft = tabLeftMargin + "px";
        setTabCellPositions(row, maxTabsPerRow, true);
        row.style.height = (navigator.appName.search("Internet Explorer") > -1 ? row.firstChild.clientHeight + 2 : row.firstChild.clientHeight + 1) + "px";
        row.style.borderBottom = "";
    }

    var lastChildElement = get_LastChild(tabStrip);
    if (lastChildElement != null && lastChildElement.style) {
        var tabHeight = 0;
        if (lastChildElement.offsetHeight > 1) {
            tabHeight = parseInt(lastChildElement.offsetHeight, 10) + parseInt(lastChildElement.offsetTop, 10) + 5;
            lastChildElement.style.borderBottom = "solid black 1px";
        } else {
            lastChildElement = get_LastChild(lastChildElement);
            tabHeight = parseInt(lastChildElement.offsetHeight, 10) - 1;
            tabStrip.style.borderBottom = "solid black 1px";
        }
        tabStrip.style.height = tabHeight + "px";
    }
}

//check if the first node is an element node
function get_firstchild(n) {
    x = n.firstChild;
    while (x.nodeType != 1) {
        x = x.nextSibling;
    }
    return x;
}

//check if the last node is an element node
function get_LastChild(n) {
    var x = n.lastChild;

    // noteType == 1 is an element node - keep searching until we find one
    while (x && x.nodeType != 1) {
        x = x.previousSibling;
    }

    // don't allow a non element node to be returned.
    if (x && x.nodeType != 1) {
        x = null;
    }
    return x;
}

function sortCellIndexByWidth(myArray) {
    var sortedArray = new Array(myArray.length);
    for (var i = 0; i < sortedArray.length; i++) {
        sortedArray[i] = myArray[i];
    }
    sortedArray = sortedArray.sort(descSortNumber);
    var sortedIndex = new Array(sortedArray.length);

    for (var i = 0; i < sortedArray.length; i++) {
        for (var j = 0; j < sortedArray.length; j++) {
            if (myArray[i] == sortedArray[j]) {
                if (sortedIndex[j] == null) {
                    sortedIndex[j] = i;
                    break;
                }
            }
        }
    }
    return sortedIndex;
}


function descSortNumber(a, b) {
    return b - a;
}


function setTabCellPositions(tabRow, maxTabs, isSingleRowTab) {
    /* loop over the "cells" in the row */
    for (var i = 1; i < tabRow.children.length; i++) {
        var cell = tabRow.children[i];
        var borderLeftWidth = 0
        if (parseInt(tabRow.children[i - 1].style.borderLeftWidth, 10).value != undefined) { borderLeftWidth = parseInt(tabRow.children[i - 1].style.borderLeftWidth, 10) }
        var positionInPixel = tabRow.children[i - 1].offsetLeft + tabRow.children[i - 1].offsetWidth - borderLeftWidth;

        /* hack for last row that might have less than maxTab tabs */
        if ((!isSingleRowTab) && (i == (tabRow.children.length - 1)) && (i < maxTabs - 1)) {
            positionInPixel -= (maxTabs - tabRow.children.length);
        }

        if (isSingleRowTab) {
            positionInPixel += 2;
        }

        cell.style.left = positionInPixel + "px";
    }
}


function setActiveTabTop(tab, tabStrip) {
    if (tab.style.position == "relative") { tab.style.top = "0px" }
    else if (tab.getAttribute("oTop")) {
        var div = getElementsByClass('functionlinksdiv ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom', 'div');
        if (div[0].style.display != "none")
        //tab.style.top = (parseFloat(document.getElementById("functionlinksdiv3").offsetHeight) + parseFloat(tab.getAttribute("oTop"))) + "px";
            tab.style.top = (parseFloat(div[0].offsetHeight) + parseFloat(tab.getAttribute("oTop"))) + "px";
        else
            tab.style.top = (parseFloat(tab.getAttribute("oTop"))) + "px";
    }
    else {
		var msgheight = 0;
		if(tabStrip.style.position == "relative"){
			var objmsg = document.getElementById("MessageTableContainer");
			msgheight = objmsg != null? objmsg.clientHeight : 0;
		}
        if (parseInt(tab.style.top.replace("px", "")) > 50)
            (tab.style.top = tabStrip.offsetTop + tabStrip.clientHeight + tabStrip.offsetHeight + msgheight + 10 + "px");
        else {
            if (tab.style.top == "") { tab.style.top = "0px" }
            (tab.style.top = (parseInt(tab.style.top.replace("px", "")) + parseInt(tabStrip.style.top.replace("px", "")) + tabStrip.offsetHeight + msgheight + 10) + "px");
            //(tab.style.top = (parseInt(tab.style.top.replace("px", "")) + tabStrip.style.top + 10) + "px");
        }
    }
}

function getElementsByClass(searchClass, tag) {
    var classElements = new Array();
    var els = document.getElementsByTagName(tag); // use "*" for all <SPAN class=hilite4>elements</SPAN>
    var elsLen = els.length;
    //var pattern = new RegExp("\b"+searchClass+"\b");
    var pattern = new RegExp(searchClass);
    for (i = 0, j = 0; i < elsLen; i++) {
        if (pattern.test(els[i].className)) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

function TabDblClick4Aspx2(tabClicked, target) {
    if (tabClicked == null) { return }

    var rowClicked = tabClicked.parentNode;
    if (rowClicked == null) { return }

    var tabStrip = rowClicked.parentNode;
    if (tabStrip == null) { return }

    if (tabStrip.originalTop == null) {
        /* Grid not prepared for min max. Just exit */
        return;
    }

    var tabStripOriginalTop = parseInt(tabStrip.originalTop, 10);

    var tabStripHeaderPanelName = tabStrip.headerPanel;
    var tabStripHeaderPanel = document.getElementById(tabStripHeaderPanelName);
    if (tabStripHeaderPanel == null) { return }

    var titleElement = document.getElementById("TitleBar_PageTitleBar");

    var tabStripNewTop;
    var offset;
    if (tabStrip.offsetTop == tabStripOriginalTop) {
        /* we're going to maximize the tab */
        tabStripNewTop = titleElement.offsetTop + titleElement.offsetHeight + 25;
        offset = tabStrip.offsetTop - tabStripNewTop;
        tabStripHeaderPanel.style.visibility = "hidden";

    } else {
        /* we're going to restore the tab position */
        tabStripNewTop = tabStripOriginalTop;
        offset = tabStrip.offsetTop - tabStripNewTop;
        tabStripHeaderPanel.style.visibility = "visible";
    }

    /* increase tab heights */
    var activeTab;
    var divs = document.body.getElementsByTagName("DIV");
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].className == "TabBody") {
            if (divs[i].style.visibility == "visible") {
                activeTab = divs[i];
            }
            divs[i].style.height = (divs[i].offsetHeight + offset) + "px";
        }
    }

    tabStrip.style.top = (tabStrip.offsetTop - offset) + "px";
    setActiveTabTop(activeTab, tabStrip);

    if (document.selection) { document.selection.empty() }
}

function IsActiveXSupported() {
  //This seems to work with all the browsers without any exceptions
  //Tested: IE7, I8, IE9, IE10, IE11, Firefox, Chrome
	if (window.ActiveXObject || "ActiveXObject" in window) {
		return true;
	} else {
		return false;
	}
}

function OpenNewWindow(URL) {

    var select = GetToken("select", URL);
    if (select != null && (!IsActiveXSupported) && select.toLowerCase().replace("\\", "/").search("reports/") > -1
            && select.toLowerCase().search("ssrs") == -1
    		&& !DoCrystalReportWarningNotice(true)) {
        return;
    }
    if (URL.indexOf("FramesNav.aspx") >= 0) {
        if (CheckUserBrowserAgnostic()) {
            AddSearchResultTabByURL(URL.substring(URL.toLowerCase().indexOf("redirurl=") + 9) + "&contenttype=json");
            return;
        }
        var re = new RegExp("&", "g");
        URL = URL.replace(re, "%26");
    }

    if (CheckUserBrowserAgnostic()) {
        OpenNewWindowInDialogBox(URL, "");
    } else {

        var regExp = new RegExp("^/([^/]+)/");
        var webShare = (regExp.test(location.pathname)) ? "/" + RegExp.$1 + "/" : "";

        var topFrame = (this.top != null) ? this.top : this;

        var win = window.open(GetBlankPage(), "_blank", "toolbar=no,resizable=yes,location=no,scrollbars=yes,height=100,width=100,top=" + topFrame.screenTop + ",left=" + (topFrame.screenLeft + 10));
        win.document.open()
        win.document.writeln("<body><img id='imgComputerWorking' src='" + webShare + "images/computer_working.gif'></body>")
        win.document.close()

        win.document.location.href = URL
    }
}

function OpenNewWindowInDialogBox(URL, dialogTitle) {

    if (jQuery == null || typeof jQuery == "undefined")
        return;

    if (URL.indexOf("FramesNav.aspx") >= 0) {
        var re = new RegExp("&", "g");
        URL = URL.replace(re, "%26")
    }

    var regExp = new RegExp("^/([^/]+)/");
    var webShare = (regExp.test(location.pathname)) ? "/" + RegExp.$1 + "/" : "";

    // jquery dialogbox
    (function($) {

        //var win = $("<div class='popupwindow'><img id='imgComputerWorking' src='" + webShare + "images/computer_working.gif' /></div>");
        var win = $("<div class='popupwindow IPADscrollbar'></div>");
        win.dialog({ title: dialogTitle, modal: true, autoOpen: true, resizable: false,position:"top", autoResize: false, stack: false, zIndex: 9999,
            open: function(event, ui) {
                var ifrm = $("<iframe id=\"popupiframe\" class=\"listWindow\" scrolling=\"auto\" src=\"" + URL + "\" width=\"100%\" height=\"100%\"  style=\"width: 100%; height: 100%; padding: 0px; margin: 0px;\" frameborder=\"0\" vspace=\"0\" hspace=\"0\"/>");
                win.append(ifrm);

                //ProgressbarShow();

                ifrm.src(URL, function() {

                });

                $("#popupiframe").load(function(e) {

                    if (typeof loadjscssfile == "function") {
                        //load jquery.js
                        var objIframe = document.getElementById("popupiframe").contentWindow.document;
                        loadjscssfile(objIframe, "jquery-ui.css", "css");
                        loadjscssfile(objIframe, "datatable_jui.css", "css");
                        loadjscssfile(objIframe, "jquery.js", "js");
                        loadjscssfile(objIframe, "jquery-ui.js", "js");
                        loadjscssfile(objIframe, "jquery.dataTables.min.js", "js");
                        loadjscssfile(objIframe, "jquery.iframe.js", "js");
                        loadjscssfile(objIframe, "ysiJCommon.js", "js");
                        loadjscssfile(objIframe, "ysilib2.js", "js");
                    }

                    if ($.browser.webkit && $(this.contentWindow.document.body).attr("onbeforeunload")) {
                        var fnBeforeUnload = $(this.contentWindow.document.body).attr("onbeforeunload");
                        fnBeforeUnload = fnBeforeUnload.substr(0, fnBeforeUnload.indexOf("(") > -1 ? fnBeforeUnload.indexOf("(") : fnBeforeUnload.length);
                        //document.getElementById("filter").contentWindow.onbeforeunload = eval(fnBeforeUnload);
                        try {
                            this.contentWindow.onbeforeunload = eval("this.contentWindow." + fnBeforeUnload);
                        } catch (err) {
                            alert(err);
                        }
                    } else {
                        //this.contentWindow.onbeforeunload = getIframeDocument(this).body.onbeforeunload; // IE, Firefox
                    }

                    //this.contentWindow.onunload = ProgressbarShow;
                    //this.contentWindow.onresize = resize_iframe;

                    this.contentWindow.onkeyup = function(event) {
                        if (event.keyCode == 27) {
                            win.dialog("close");
                        }
                    }

                    $(".ui-dialog-titlebar", win.parent()).dblclick(function(e) {
                        if (win.attr("screenMode") != "undefined" && win.attr("screenMode") != "fullscreen") {
                            maximizeDialogBox(win);
                        } else {
                            restoreDialogBox(win);
                        }
                    });

                    ifrm.css({ "top": "0px", "left": "0px", height: '', width: '' });

                    ResizePopupWindowIframeDialogBox();
                });

            },
            close: function(event, ui) {
                //listWindow.dialog("destroy");
                $(".ui-dialog-content, .ui-dialog").remove();
                HideLoading();
                win = null;
            }
        }); //.dialog({ position: ['right', 'top'] });

        win.css({ "padding": "0px" });

        $([document, window]).unbind('.dialog-overlay');

    })(jQuery);

}

function OpenLookup2PopupWindow(URL, title) {
    OpenLookupListInDialogBox(URL, title, "");
}
var minLookupDialogWidth = 550;
function OpenLookupListInDialogBox(URL, title, className) {

    if (URL.indexOf("FramesNav.aspx") >= 0) {
        var re = new RegExp("&", "g");
        URL = URL.replace(re, "%26")
    }

    var regExp = new RegExp("^/([^/]+)/");
    var webShare = (regExp.test(location.pathname)) ? "/" + RegExp.$1 + "/" : "";

    title = title != null ? title.replace(/_/g, " ") : ""

    //check jquery javascript is loaded
    if (jQuery == null || typeof jQuery == "undefined")
        return;

    (function($) {
        if (typeof $.fn.dialog == "undefined") {
            $.getJsScript("jquery-ui.js", function(data, textStatus, jqxhr) {
                OpenLookupListInDialogBox(URL, title, className);
            }, true);
        } else {
            if ($.browser.msie || ($.browser.msie && $.browser.version == 9)) {
                $(".ui-datepicker").addClass("ui-datepicker-ie9-fix").removeAttr("style");
            }
            //ProgressbarShow();
            var ifrm = $("<iframe id=\"popupiframe\" class=\"listWindow\" scrolling=\"auto\" src=\"" + URL + "\" width=\"100%\" height=\"100%\"  style=\"width: 100%; height: 100%; padding: 0px; margin: 0px;\" frameborder=\"0\" vspace=\"0\" hspace=\"0\"/>");
            var modalWindow = ifrm.dialog({
                modal: true, autoOpen: false, resizable: true, autoResize: false, stack: false, zIndex: 9999, minWidth: minLookupDialogWidth,
                title: title, dialogClass: className,
                open: function(event, ui) {
                    ifrm.css({ width: minLookupDialogWidth });
                },
                close: function(event, ui) {
                    ProgressbarHide();
                    modalWindow.dialog("distroy");
                    modalWindow = null;
                    setTimeout(function () {
                        ifrm.parent()[0].parentNode.focus(); ifrm.parent()[0].parentNode.removeChild(ifrm.parent()[0]);
                        if ($.browser.msie || ($.browser.msie && $.browser.version == 9)) { $(".ui-datepicker").removeClass("ui-datepicker-ie9-fix"); }
                    }, 50);
                }
            });

            $("#popupiframe").load(function() {
                //after iframe load
                this.contentWindow.onresize = resize_iframe;

                //on escape close lookup list dialogbox
                var doc = this.contentDocument ? this.contentDocument : this.contentWindow.document;
                var handler = function(e) {
                    var evt = e ? e : this;
                    if (evt.keyCode == 27 && modalWindow) {
                        modalWindow.dialog("close");
                    }
                }
                doc.onkeydown = $.browser.msie ? __bind(handler, window.event) : handler;

                $(".ui-dialog-titlebar", modalWindow.parent()).dblclick(function(e) {
                    if (modalWindow.attr("screenMode") != "undefined" && modalWindow.attr("screenMode") != "fullscreen") {
                        maximizeDialogBox(modalWindow);
                    } else {
                        restoreDialogBox(modalWindow);
                    }
                });

                ifrm.css({ "top": "0px", "left": "0px" });

            });

            modalWindow.dialog("open");
            modalWindow.css({ "padding": "0px" });
            $([document, window]).unbind('.dialog-overlay');
        }
    })(jQuery);
}

function SetLookupTitle(title) {
    (function($) {
        var span = $(".ui-dialog-content.ui-widget-content").prev().find("span.ui-dialog-title");
        if (span.size() && span.html().replace(/&nbsp;/i, "") == "")
            span.html(title);
    })(jQuery);
}

function ResizeLookupListDialogBox() {
    if (jQuery == null || typeof jQuery == "undefined")
        return;
    (function($) {
        var maxDialogHeight = $(window).height() - 50;
        var maxDialogWidth = $(window).width() - 100;
        var ifrm = $("#popupiframe");

        ifrm.contents().find("select").filter(function() { return $(this).height() <= 20; }).css({ 'height': '' });
        var iframeBody = ifrm[0].contentWindow.document.body;
        var iframeHTML = ifrm[0].contentWindow.document.documentElement;
        var maxFormElementHeight = Math.max(iframeBody.scrollHeight, iframeBody.offsetHeight, iframeHTML.clientHeight, iframeHTML.scrollHeight, iframeHTML.offsetHeight);
        //var maxFormElementWidth = Math.max(iframeBody.scrollWidth, iframeBody.offsetWidth, iframeHTML.clientWidth, iframeHTML.scrollWidth, iframeHTML.offsetWidth);
        var maxFormElementWidth = 0;

        ifrm.contents().find("div:visible").each(function(ind, formElement) {
            var elementWidth = $(formElement).width();
            if (elementWidth && elementWidth > maxFormElementWidth) {
                maxFormElementWidth = elementWidth;
            }
        });

        var minHeight = maxDialogHeight;
        var minWidth = maxDialogWidth;

        if (maxFormElementHeight + 80 < maxDialogHeight)
            minHeight = maxFormElementHeight + 80;
        if (maxFormElementWidth + 30 < maxDialogWidth)
            minWidth = maxFormElementWidth + 30;

        var modalDialogBox = $(".ui-dialog-content.ui-widget-content");
        modalDialogBox.dialog("option", "height", minHeight);
        modalDialogBox.dialog("option", "minHeight", minHeight);
        modalDialogBox.dialog("option", "minWidth", minWidth);
        ifrm.parent().css({ "width": minWidth });
        modalDialogBox.dialog("option", "position", "top");
        ifrm.css({ width: "100%" });
        if (typeof window.parent.HideLoading != "undefined") window.parent.HideLoading();

    })(jQuery);
}

function ResizePopupWindowIframeDialogBox() {
    if (jQuery == null || typeof jQuery == "undefined")
        return;
    (function($) {

        var maxDialogHeight = $(window).height() - 50;
        var maxDialogWidth = $(window).width() - 100;
        var ifrm = $("#popupiframe");

        ifrm.contents().find("select").filter(function() { return $(this).height() <= 20; }).css({ 'height': '' });
        var iframeBody = ifrm[0].contentWindow.document.body;
        var iframeHTML = ifrm[0].contentWindow.document.documentElement;
        var maxFormElementHeight = Math.max(iframeBody.scrollHeight, iframeBody.offsetHeight, iframeHTML.clientHeight, iframeHTML.scrollHeight, iframeHTML.offsetHeight);
        var maxFormElementWidth = Math.max(iframeBody.scrollWidth, iframeBody.offsetWidth, iframeHTML.clientWidth, iframeHTML.scrollWidth, iframeHTML.offsetWidth);

		if (CheckUserBrowserAgnostic()) {
			var minWidth = maxFormElementWidth;
			var minHeight = maxFormElementHeight;
		}
		else{					
			var minHeight = maxDialogHeight;
			var minWidth = maxDialogWidth;

			if (maxFormElementHeight + 80 < maxDialogHeight)
				minHeight = maxFormElementHeight + 80;
			if (maxFormElementWidth + 50 < maxDialogWidth)
				minWidth = maxFormElementWidth + 50;

			if (minWidth < minLookupDialogWidth)
				minWidth = minLookupDialogWidth;
		}
		
        var modalDialogBox = $(".ui-dialog-content.ui-widget-content");

        if (typeof modalDialogBox.attr("isPostBack") == "undefined") {
            modalDialogBox.dialog("option", "width", minWidth);
            modalDialogBox.dialog("option", "height", minHeight);
            modalDialogBox.dialog("option", "position", "top");
            modalDialogBox.attr("isPostBack", true);
        }

        window.parent.parent.HideLoading();

    })(jQuery);
}

//on dialogbox header double click expand dialogbox in full screen
function maximizeDialogBox(maximizeWindow) {
    if (jQuery == null || typeof jQuery == "undefined")
        return;
    (function($) {
        var divDialogBox = $(".ui-dialog.ui-widget.ui-widget-content");
        maximizeWindow.attr("screenmode", "fullscreen");

        //store current possition before do full screen
        SaveDialogBoxPostionAndSize(maximizeWindow);

        var wW = $(window).width(), wH = $(window).height();
        maximizeWindow.dialog("option", "width", wW - 8);
        maximizeWindow.dialog("option", "height", wH - 8);
        maximizeWindow.dialog("option", "position", [0, 0]);
    })(jQuery);
}

//on dialogbox header double click restore dialogbox position and size to previous position and size
function restoreDialogBox(restoreWindow) {
    //restore dialogbox to previous position
    if (restoreWindow.attr("lastWidth") != "undefined") {
        restoreWindow.attr("screenmode", "normal");
        restoreWindow.dialog("option", "width", restoreWindow.attr("lastWidth"));
        restoreWindow.dialog("option", "height", restoreWindow.attr("lastHeight"));
        restoreWindow.dialog("option", "position", [parseFloat(restoreWindow.attr("lastLeft")), parseFloat(restoreWindow.attr("lastTop"))]);
        return true;
    }
    return false;
}

function SaveDialogBoxPostionAndSize(dlgWindow) {
    if (jQuery == null || typeof jQuery == "undefined")
        return;
    (function($) {
        var divDialogBox = $(".ui-dialog.ui-widget.ui-widget-content");
        dlgWindow.attr("lastHeight", divDialogBox.height());
        dlgWindow.attr("lastWidth", divDialogBox.width());
        dlgWindow.attr("lastTop", divDialogBox.position().top);
        dlgWindow.attr("lastLeft", divDialogBox.position().left);

    })(jQuery);
}

function resize_iframe() {
    document.getElementById("popupiframe").style.width = "100%";
    //    if (document.getElementById("popupiframe").contentWindow.jQuery) {
    //        (function($) {
    //            if (typeof (SetIframeChildrensTopPosition) == 'function') {
    //                var funcLnkDiv = $(".functionlinksdiv:visible");
    //                if (funcLnkDiv.length) {
    //                    SetIframeChildrensTopPosition($, funcLnkDiv.height() + 5);
    //                }
    //            }
    //        })(document.getElementById("popupiframe").contentWindow.jQuery);
    //    }
}

//Adujust ysiDataGrid DataDiv width inside ysiTabs On TabChange to remove Horizontal ScrollBar
function SetDataDivWidth(tabClicked) {
    var DataDivs = get_Tab_DataGridContainers(tabClicked);
    for (var i = 0; i < DataDivs.length; i++) {
        GridOnLoad(DataDivs[i]);
    }
}

function get_Tab_DataGridContainers(tabClicked) {
    var divChildren;
    if (document.getElementById(tabClicked) == null) {
        divChildren = new Array();
        divChildren.push(document.getElementById(tabClicked + "_DataGridContainer"));
    }
    else
        divChildren = document.getElementById(tabClicked).getElementsByTagName("DIV");
    var dataGridIds = new Array();
    for (var i = 0; i < divChildren.length; i++) {
        if (divChildren[i] && divChildren[i].id && divChildren[i].id.toLowerCase().search("_datagridcontainer") > -1 && divChildren[i].getAttribute("hasResized") != "true") {
            dataGridIds.push(divChildren[i].id.replace(/_datagridcontainer/i, ""));
        }
    }
    return dataGridIds;
}

function DoCrystalReportWarningNotice(showMsg) {
    var flag = false;
    if (!jQuery.browser.msie) {
        if (!IsCrystalVerCrossBrowserCompatible() && !IsActiveXSupported()) {
            //remove Screen Options from RptOutput dropdownlist
            jQuery("#RptOutput option[value='Screen']").remove();
            if (showMsg) {
                jQuery.showMessage({
                    text: "Crystal reports viewable to screen on Internet Explorer only",
                    width: 350,
                    type: "warning"
                });
            }
        } else {
            flag = true;
        }
    }

    return flag;
}

function IsCrystalVerCrossBrowserCompatible() {
    var iCrystalVer = parseInt(GetCookie("CrystalVersion"));
    return iCrystalVer > 9;
}

function gridKeyDown(evt) {
    var upArrow = 38;
    var downArrow = 40;

    try {
        var obj = evt.target || evt.srcElement; // window.event.srcElement
        var row = GetParentByTag(obj, "TR")
        var rowNum = GetRowNumber(row.getAttribute("rowNum"))
        var newId = ""
        var keyCode = evt.keyCode


        if (keyCode == upArrow) {
            newId = obj.id.replace("_row" + rowNum, "_row" + (rowNum - 1))
        }
        else if (keyCode == downArrow) {
            newId = obj.id.replace("_row" + rowNum, "_row" + (rowNum + 1))
        }
        if (newId != '') { setTimeout("FocusAndSelect('" + newId + "')", 10) };
    }
    catch (any) { }


}

function GridTextAreaKeyPress(evt) {
    var textArea = evt.srcElement || evt.target;
    if (textArea.scrollHeight < 16) {
        textArea.style.height = (textArea.scrollHeight + 5) + "px";
    }
}

function GridTextAreaOnLoad(gridName, colIndex) {
    var grid = document.all(gridName + "_DataTable")
    for (i = 0; i <= grid.rows.length - 1; i++) {
        var textArea = document.all(grid.rows[i].cells[colIndex].childNodes[0].id)
        if (textArea.scrollHeight > 16) {
            textArea.style.height = (textArea.scrollHeight + 5) + "px"
        }
    }
}
function FocusAndSelect(newId) {
    if (typeof document.all(newId) != "undefined" && document.all(newId) != null) {
        document.all(newId).focus()
        document.all(newId).select()
    }
}
var __bind = function(fn, me) { return function() { fn.apply(me, arguments); }; }


function OpenNewWindowOrAddTab(url) {

    if (CheckUserBrowserAgnostic()) {
        AddSearchResultTabByURL(url);
    }
    else {
        var prefixURL = "";
        var urlStartWith = "";
        var pathName = window.location.pathname;
        var regExp = new RegExp("^/([^/]+)/");
        var webShare = (regExp.test(location.pathname)) ? "/" + RegExp.$1 + "/" : "";
        if (webShare != "") {
            pathName = pathName.substr(pathName.indexOf(webShare) + webShare.length);
            if (pathName.indexOf('/') > -1)
                prefixURL = "../";
        }
        url = prefixURL + "pages/FramesNav.aspx?RedirURL=" + (url.substr(0, 3) == "../" ? url : "../" + url);

        var re = new RegExp("&", "g");
        url = url.replace(re, "%26");

        var topFrame = (this.top != null) ? this.top : this;

        var win = window.open(GetBlankPage(), "_blank", "toolbar=no,resizable=yes,location=no,scrollbars=yes,height=100,width=100,top=" + topFrame.screenTop + ",left=" + (topFrame.screenLeft + 10));
        win.document.open()
        win.document.writeln("<body><img id='imgComputerWorking' src='" + webShare + "images/computer_working.gif'></body>")
        win.document.close()

        win.document.location.href = url
    }
}

function checkAll(CallingCheckbox, DatagridID, GridColumnName) {

    var count = 0;
    if (GridColumnName.length == 0) {
        GridColumnName = ':';
    }

    for (var i = 0; i < document.forms[0].elements.length; i++) {
        var e = document.forms[0].elements[i];

        if ((e.name != CallingCheckbox.name) && (e.type == 'checkbox')) {
            var s = e.name;
            var datagridname = GridColumnName + ':CheckBox';
            var re = new RegExp(datagridname, 'g');
            if (s.match(re)) {
                e.checked = CallingCheckbox.checked;
                count = count + 1;
            }
        }
    }
}

function isAllCheckboxsSelected(CallingCheckbox, DatagridID, GridColumnName) {
    var count = 0;
    var totalcheckbox = 0;

    if (GridColumnName.length == 0) {
        GridColumnName = ':';
    }

    for (var i = 0; i < document.forms[0].elements.length; i++) {
        var e = document.forms[0].elements[i];

        if ((e.name != CallingCheckbox.name) && (e.type == 'checkbox')) {
            var s = e.name;
            var datagridname = GridColumnName + ':CheckBox';
            var re = new RegExp(datagridname, 'g');
            if (s.match(re)) {
                totalcheckbox += 1;
                if (e.checked) {
                    count += 1;
                }

            }
        }
    }

    var ele = DatagridID + '_' + CallingCheckbox + '_CheckBox';
    var x = document.getElementById(ele);

    if (totalcheckbox == count) {
        x.checked = true;
    }
    else {
        x.checked = false;
    }
}

function DisableSaveButtonOnClick(ClickedButton) {
    ClickedButton.disabled = true;
    SaveClick(ClickedButton);
}