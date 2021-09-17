
/*
    Whenever a feature is added to YsiNetClient.dll, 
    the coresponding page that excersises it should 
    use the functions bellow to check if the general 
    conditions for running YsiNetClient.dll are met.
    
    Example:
    --------
    <script language="javascript" type="text/javascript">
      function local_load()
      {  
        if (EnsureNetClient(myNetClient, "forms")) // will display yCLRManager Window if fails
        {                                              
            try
            {              
                // Try to use the functionality, provided by ysiNetClient.dll
                myNetClient.LaunchExcelMacro(location.href, 
                                            document.cookie, 
                                            document.all('xlsFileName').value,
                                            document.all('csvFileName').value);
            }
            catch (any) 
            {  
                // The function in ysiNetClient.dll must always assure that it catches 
                // all the exceptions and performs the appropriate error handling.
                // Therefore if we arrive here - it means that the ysiNetClient.dll 
                // decided to explicitelly throw an exception to indicate that it 
                // cannot offer appropriate handling.
                // At this moment the calling javascript code might again 
                // display the yCLRManager window.
           
                yCLRManagerWindow = CallCLRManager("forms"); 
                
                // Limit the error message to the first 300 characters
                if (any.description.length <= 300)               
                    alert(any.description);
                else
                    alert(any.description.substring(0, 300));
                
                history.back();
                return;
            }
        }
      }    
    </script>
*/


function EnsureNetClient(instance, forms_dir)
{
    if (!dryTest(instance)) 
    {
        CallCLRManager(forms_dir);
        return false;
    } 
    else
        return true;
}


function dryTest(NetClientInstance)
{         
    var challange = "Hello World";
    try {return (NetClientInstance.HelloWorld() == challange);} 
    catch(any) {return false;}         
}


function CallCLRManager(forms_dir)
{    
	parent.document.location.href = forms_dir + "/yClrManager.htm"
}

function IsNetClientEnabled(NetClientInstance) {
	return dryTest(NetClientInstance)	
}

function createNetClientOverlay(objDoc) {
    if (objDoc.getElementById("NetClientOverlay") == null) {
        var dvOverlay = objDoc.createElement("div");
        dvOverlay.setAttribute("id", "NetClientOverlay");

        dvOverlay.style.backgroundColor = "#ece9d8";
        dvOverlay.style.textJustify = "auto";
        dvOverlay.style.verticalAlign = "baseline";
        dvOverlay.style.textAlign = "center";
        dvOverlay.style.display = "none";
        dvOverlay.style.position = "absolute";

        var p = objDoc.createElement("p");

        p.style.border = "solid 1px #000000";
        p.style.padding = "10px";
        p.style.width = "210px";
        p.style.top = "200px";
        p.style.font = "10pt verdana,arial";
        p.style.textAlign = "center";
        p.style.position = "relative";
        p.style.backgroundColor = "#ffffff";
        
        p.innerHTML = "Your report is hidden while you make menu choices.<br><br>It will return when you close the menu.";
        dvOverlay.appendChild(p);
        objDoc.appendChild(dvOverlay);
    }
}

function deleteNetClientOverlay(objDoc) {
    if (objDoc.getElementById("NetClientOverlay") != null) {
        objDoc.getElementById("NetClientOverlay").style.display = "none";
    }
}

function ShowNetClient(bShow) {
    try {
        var objDoc = filter.document;
        var netClient = objDoc.getElementById("myNetClient");
        var netClientHeight = netClient.clientHeight;
        if (netClient != null && netClientHeight > 1) {
            netClient.style.visibility = bShow ? "visible" : "hidden";

            if (!bShow) {
                createNetClientOverlay(objDoc);
                var msg = objDoc.getElementById("NetClientOverlay");
                msg.style.display = !bShow ? "inline" : "none";
                msg.style.width = netClient.clientWidth;
                msg.style.height = netClient.clientHeight;
            }
            else {
                deleteNetClientOverlay(objDoc);
            }
        }
        else {
            return;
        }
    }
    catch (any) {
    }
}