/* ********************** BEGIN fct.js ********************** * 
* fct.js - contains all JavaScript necessary to use Frozen Cell
* Tables among other things (see the last two paragraphs below).
*
* A Frozen Cell Table has a scrollable center section
* with rows and columns at its edges that are frozen in one or
* more directions.  All frozen cell table functionality is
* governed by the FCT JavaScript class and all related global
* symbols are a) prefixed with FCT_ as in FCT_foo() or 
* b) accessible as class members as in FCT.foo.  This prefixing
* allows the FCT library to "play nicely with others".  Also of
* note, the library prevents itself from being included in a page
* multiple times thereby eliminating the possiblity that such
* a situation could arise unexpectedly (perhaps as the result of
* dynamically generated portions of the page both including the 
* script).
*
* There are two typical uses of the FCT library.
* 1) Convert an existing, vanilla HTML Table into an FCT with
*    only several additional lines of code.  (The author considers
*    this the most notable functionality.) or
* 2) Construct the FCT html structure by hand and use the FCT
*    class to automatically size everything and handle the 
*    scrolling.
*
* The conversion process is fully documented in the FCT-HOWTO
* documentation, however, this can be considered a crash course.
* To convert an existing table of id="foo" to an FCT with one 
* frozen row on top, two frozen rows on the bottom, three frozen
* columns on the left, and four frozen columns on the right one 
* would take the following steps.
*   1) Set the FCT_SYSPATH variable to the path from the current
*      directory to the fct.css file.  For instance, if the fct.css
*      file could be linked in a url from the current page with the
*      path ../system/fct.css one would include a <script> tag like:
*      <script type='text/javascript'>var FCT_SYSPATH = '../system/';</script>
*      
*   2) Include the fct.js file into the page with a <script> tag.
*      i.e. <script type='text/javascript' src='../system/fct.js'></script>
*
*   3) Immediately before the table in question, place a <script>
*      tag similar to the following:
*      <script type="text/javascript">
*        attachEventHandler(window, 'onload', function() { 
*          FCT.convert("foo", 
*                      1, 
*                      3,
*                      null,
*                      2,
*                      4
*          ); 
*        } ); //pass a closure to attachEvent for it to call onload
*      </script>
*
* The arguments to FCT.convert() are:
*   1) string name of the table to convert
*   2) # of frozen rows on top
*   3) # of frozen cols on left
*   4) reference to an FCTConstraints object [OPTIONAL]
*   5) # of frozen rows on bottom [OPTIONAL]
*   6) # of frozen cols on right [OPTIONAL]
*
* For more indepth treatment see the FCT-HOWTO.
*
* This file, along with fct.css, constitute all that is needed to use 
* the Yardi FCT feature in your existing HTML pages.  This file
* consolidates several original source files: xbLibrary.js,
* xbDOM.js, xbStyle.js, ua.js, and fct_i.js.
*
* The code from fct_i.js is Copyright (c) 2003 Yardi Systems, Inc. 
* and subject to the applicable Yardi ELUA.  The code from all of 
* the other files mentioned above was originally obtained from 
* http://devedge.netscape.com/toolbox/examples/2002/xb/ and is 
* licensed under the MPL version 1.1.  The code from any given file
* foo.js is denoted by comments containing the strings "BEGIN foo.js"
* and "END foo.js".  Each section of code also includes an applicable
* license block.
* ********************************************************** */

if (typeof (FCT_JS) == 'undefined') {
    FCT_JS = 0.1; 			//Used for conditional inclusion
    DEBUG = 0;
    if (typeof (FCT_SYSPATH) == 'undefined') FCT_SYSPATH = './system/';

    //include our CSS file
    document.writeln('<link rel="stylesheet" type="text/css" href="' + FCT_SYSPATH + 'fct.css">');

    /* ********************** BEGIN xbLibrary.js ********************** */

    /* ***** BEGIN LICENSE BLOCK *****
    * Version: MPL 1.1/GPL 2.0/LGPL 2.1
    *
    * The contents of this file are subject to the Mozilla Public License Version
    * 1.1 (the "License"); you may not use this file except in compliance with
    * the License. You may obtain a copy of the License at
    * http://www.mozilla.org/MPL/
    *
    * Software distributed under the License is distributed on an "AS IS" basis,
    * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
    * for the specific language governing rights and limitations under the
    * License.
    *
    * The Original Code is Bob Clary code.
    *
    * The Initial Developer of the Original Code is
    * Bob Clary.
    * Portions created by the Initial Developer are Copyright (C) 2000
    * the Initial Developer. All Rights Reserved.
    *
    * Contributor(s): Bob Clary <bc@bclary.com>
    *
    * ***** END LICENSE BLOCK ***** */

    if (!document.getElementById || navigator.userAgent.indexOf('Opera') != -1) {
        // assign error handler for downlevel browsers
        // Note until Opera improves it's overall support
        // for JavaScript and the DOM, it must be considered downlevel

        window.onerror = defaultOnError;

        function defaultOnError(msg, url, line) {
            // handle bug in NS6.1, N6.2
            // where an Event is passed to error handlers
            if (typeof (msg) != 'string') {
                msg = 'unknown error';
            }
            if (typeof (url) != 'string') {
                url = document.location;
            }

            alert('An error has occurred at ' + url + ', line ' + line + ': ' + msg);
        }
    }

    function xbLibrary(path) {
        if (path.charAt(path.length - 1) == '/') {
            path = path.substr(0, path.length - 1)
        }
        this.path = path;
    }

    // dynamically loaded scripts
    //
    // it is an error to reference anything from the dynamically loaded file inside the
    // same script block.  This means that a file can not check its dependencies and
    // load the files for it's own use.  someone else must do this.  

    xbLibrary.prototype.loadScript =
	function(scriptName) {
	    document.write('<script language="javascript" src="' + this.path + '/' + scriptName + '"><\/script>');
	};

    // default xbLibrary

    //xblibrary = new xbLibrary('./scripts/xbstyle/');

    /* ********************** END xbLibrary.js ********************** */

    if (typeof (xblibrary) == 'undefined') xblibrary = new xbLibrary(FCT_SYSPATH);

    /* ********************** BEGIN xbDOM.js ********************** */

    /* ***** BEGIN LICENSE BLOCK *****
    * Version: MPL 1.1/GPL 2.0/LGPL 2.1
    *
    * The contents of this file are subject to the Mozilla Public License Version
    * 1.1 (the "License"); you may not use this file except in compliance with
    * the License. You may obtain a copy of the License at
    * http://www.mozilla.org/MPL/
    *
    * Software distributed under the License is distributed on an "AS IS" basis,
    * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
    * for the specific language governing rights and limitations under the
    * License.
    *
    * The Original Code is Netscape code.
    *
    * The Initial Developer of the Original Code is
    * Netscape Corporation.
    * Portions created by the Initial Developer are Copyright (C) 2001
    * the Initial Developer. All Rights Reserved.
    *
    * Contributor(s): Bob Clary <bclary@netscape.com>
    *
    * ***** END LICENSE BLOCK ***** */

    function xbToInt(s) {
        var i = parseInt(s, 10);
        if (isNaN(i))
            i = 0;

        return i;
    }

    function xbGetWindowWidth(windowRef) {
        var width = 0;

        if (!windowRef) {
            windowRef = window;
        }

        if (typeof (windowRef.innerWidth) == 'number') {
            width = windowRef.innerWidth;
        }
        else if (windowRef.document.body && typeof (windowRef.document.body.clientWidth) == 'number') {
            width = windowRef.document.body.clientWidth;
        }

        return width;
    }

    function xbGetWindowHeight(windowRef) {
        var height = 0;

        if (!windowRef) {
            windowRef = window;
        }

        if (typeof (windowRef.innerWidth) == 'number') {
            height = windowRef.innerHeight;
        }
        else if (windowRef.document.body && typeof (windowRef.document.body.clientWidth) == 'number') {
            height = windowRef.document.body.clientHeight;
        }
        return height;
    }

    function xbGetElementsByNameAndType(name, type, windowRef) {
        if (!windowRef)
            windowRef = window;

        var elmlist = new Array();

        xbFindElementsByNameAndType(windowRef.document, name, type, elmlist);

        return elmlist;
    }

    function xbFindElementsByNameAndType(doc, name, type, elmlist) {
        var i;
        var subdoc;

        for (i = 0; i < doc[type].length; ++i) {
            if (doc[type][i].name && name == doc[type][i].name) {
                elmlist[elmlist.length] = doc[type][i];
            }
        }

        if (doc.layers) {
            for (i = 0; i < doc.layers.length; ++i) {
                subdoc = doc.layers[i].document;
                xbFindElementsByNameAndType(subdoc, name, type, elmlist);
            }
        }
    }

    if (document.layers) {
        nav4FindLayer =
	  function(doc, id) {
	      var i;
	      var subdoc;
	      var obj;

	      for (i = 0; i < doc.layers.length; ++i) {
	          if (doc.layers[i].id && id == doc.layers[i].id)
	              return doc.layers[i];

	          subdoc = doc.layers[i].document;
	          obj = nav4FindLayer(subdoc, id);
	          if (obj != null)
	              return obj;
	      }
	      return null;
	  }

        nav4FindElementsByName =
	  function(doc, name, elmlist) {
	      var i;
	      var j;
	      var subdoc;

	      for (i = 0; i < doc.images.length; ++i) {
	          if (doc.images[i].name && name == doc.images[i].name) {
	              elmlist[elmlist.length] = doc.images[i];
	          }
	      }

	      for (i = 0; i < doc.forms.length; ++i) {
	          for (j = 0; j < doc.forms[i].elements.length; j++) {
	              if (doc.forms[i].elements[j].name && name == doc.forms[i].elements[j].name) {
	                  elmlist[elmlist.length] = doc.forms[i].elements[j];
	              }
	          }

	          if (doc.forms[i].name && name == doc.forms[i].name) {
	              elmlist[elmlist.length] = doc.forms[i];
	          }
	      }

	      for (i = 0; i < doc.anchors.length; ++i) {
	          if (doc.anchors[i].name && name == doc.anchors[i].name) {
	              elmlist[elmlist.length] = doc.anchors[i];
	          }
	      }

	      for (i = 0; i < doc.links.length; ++i) {
	          if (doc.links[i].name && name == doc.links[i].name) {
	              elmlist[elmlist.length] = doc.links[i];
	          }
	      }

	      for (i = 0; i < doc.applets.length; ++i) {
	          if (doc.applets[i].name && name == doc.applets[i].name) {
	              elmlist[elmlist.length] = doc.applets[i];
	          }
	      }

	      for (i = 0; i < doc.embeds.length; ++i) {
	          if (doc.embeds[i].name && name == doc.embeds[i].name) {
	              elmlist[elmlist.length] = doc.embeds[i];
	          }
	      }

	      for (i = 0; i < doc.layers.length; ++i) {
	          if (doc.layers[i].name && name == doc.layers[i].name) {
	              elmlist[elmlist.length] = doc.layers[i];
	          }

	          subdoc = doc.layers[i].document;
	          nav4FindElementsByName(subdoc, name, elmlist);
	      }
	  }

        xbGetElementById = function(id, windowRef) {
            if (!windowRef)
                windowRef = window;

            return nav4FindLayer(windowRef.document, id);
        };

        xbGetElementsByName = function(name, windowRef) {
            if (!windowRef)
                windowRef = window;

            var elmlist = new Array();

            nav4FindElementsByName(windowRef.document, name, elmlist);

            return elmlist;
        };

    }
    else if (document.all) {
        xbGetElementById =
	  function(id, windowRef) {
	      if (!windowRef) {
	          windowRef = window;
	      }
	      var elm = windowRef.document.all[id];
	      if (!elm) {
	          elm = null;
	      }
	      return elm;
	  };

        xbGetElementsByName = function(name, windowRef) {
            if (!windowRef)
                windowRef = window;

            var i;
            var idnamelist = windowRef.document.all[name];
            var elmlist = new Array();

            if (!idnamelist.length || idnamelist.name == name) {
                if (idnamelist)
                    elmlist[elmlist.length] = idnamelist;
            }
            else {
                for (i = 0; i < idnamelist.length; i++) {
                    if (idnamelist[i].name == name)
                        elmlist[elmlist.length] = idnamelist[i];
                }
            }

            return elmlist;
        }

    }
    else if (document.getElementById) {
        xbGetElementById =
	  function(id, windowRef) {
	      if (!windowRef) {
	          windowRef = window;
	      }
	      return windowRef.document.getElementById(id);
	  };

        xbGetElementsByName =
	  function(name, windowRef) {
	      if (!windowRef) {
	          windowRef = window;
	      }
	      return windowRef.document.getElementsByName(name);
	  };
    }
    else {
        xbGetElementById =
	  function(id, windowRef) {
	      return null;
	  };

        xbGetElementsByName =
	  function(name, windowRef) {
	      return new Array();
	  };
    }

    function xbGetPageScrollX(windowRef) {
        if (!windowRef) {
            windowRef = window;
        }

        if (typeof (windowRef.pageXOffset) == 'number') {
            return windowRef.pageXOffset;
        }

        if (typeof (windowRef.document.body && windowRef.document.body.scrollLeft) == 'number') {
            return windowRef.document.body.scrollLeft;
        }

        return 0;
    }

    function xbGetPageScrollY(windowRef) {
        if (!windowRef) {
            windowRef = window;
        }

        if (typeof (windowRef.pageYOffset) == 'number') {
            return windowRef.pageYOffset;
        }

        if (typeof (windowRef.document.body && windowRef.document.body.scrollTop) == 'number') {
            return windowRef.document.body.scrollTop;
        }

        return 0;
    }

    if (document.layers) {
        xbSetInnerHTML =
	  function(element, str) {
	      element.document.write(str);
	      element.document.close();
	  };
    }
    else {
        xbSetInnerHTML = function(element, str) {
            if (typeof (element.innerHTML) != 'undefined') {
                element.innerHTML = str;
            }
        };
    }

    /* ********************** END xbDOM.js ********************** */

    /* ********************** BEGIN xbDebug.js ********************** */

    /* ***** BEGIN LICENSE BLOCK *****
    * Version: MPL 1.1/GPL 2.0/LGPL 2.1
    *
    * The contents of this file are subject to the Mozilla Public License Version
    * 1.1 (the "License"); you may not use this file except in compliance with
    * the License. You may obtain a copy of the License at
    * http://www.mozilla.org/MPL/
    *
    * Software distributed under the License is distributed on an "AS IS" basis,
    * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
    * for the specific language governing rights and limitations under the
    * License.
    *
    * The Original Code is Netscape code.
    *
    * The Initial Developer of the Original Code is
    * Netscape Corporation.
    * Portions created by the Initial Developer are Copyright (C) 2001
    * the Initial Developer. All Rights Reserved.
    *
    * Contributor(s): Bob Clary <bclary@netscape.com>
    *
    * ***** END LICENSE BLOCK ***** */

    /*
    ChangeLog:
	
	2002-02-25: bclary - modified xbDebugTraceOject to make sure 
    that original versions of wrapped functions were not
    rewrapped. This had caused an infinite loop in IE.
	
	2002-02-07: bclary - modified xbDebug.prototype.close to not null
    the debug window reference. This can cause problems with
    Internet Explorer if the page is refreshed. These issues will
    be addressed at a later date.
    */

    function xbDebug() {
        this.on = false;
        this.stack = new Array();
        this.debugwindow = null;
        this.execprofile = new Object();
    }

    xbDebug.prototype.push = function() {
        this.stack[this.stack.length] = this.on;
        this.on = true;
    }

    xbDebug.prototype.pop = function() {
        this.on = this.stack[this.stack.length - 1];
        --this.stack.length;
    }

    xbDebug.prototype.open = function() {
        if (this.debugwindow && !this.debugwindow.closed)
            this.close();

        this.debugwindow = window.open(GetBlankPage(), 'DEBUGWINDOW', 'height=400,width=600,resizable=yes,scrollbars=yes');
        this.debugwindow.moveTo(0, 0);
        window.focus();

        this.debugwindow.document.write('<html><head><title>xbDebug Window</title></head><body><h3>Javascript Debug Window</h3></body></html>');
    }

    xbDebug.prototype.close = function() {
        if (!this.debugwindow)
            return;

        if (!this.debugwindow.closed)
            this.debugwindow.close();

        // bc 2002-02-07, other windows may still hold a reference to this: this.debugwindow = null;
    }

    xbDebug.prototype.dump = function(msg) {
        if (!this.on)
            return;

        if (!this.debugwindow || this.debugwindow.closed)
            this.open();

        this.debugwindow.document.write(msg + '<br>');

        return;
    }

    var xbDEBUG = new xbDebug();

    window.onunload = function() { xbDEBUG.close(); }

    function xbDebugGetFunctionName(funcref) {

        if (!funcref) {
            return '';
        }

        if (funcref.name)
            return funcref.name;

        var name = funcref + '';
        name = name.substring(name.indexOf(' ') + 1, name.indexOf('('));
        funcref.name = name;

        if (!name) alert('name not defined');
        return name;
    }


    // emulate functionref.apply for IE mac and IE win < 5.5
    function xbDebugApplyFunction(funcname, funcref, thisref, argumentsref) {
        var rv;

        if (!funcref) {
            alert('xbDebugApplyFunction: funcref is null');
        }

        if (typeof (funcref.apply) != 'undefined')
            return funcref.apply(thisref, argumentsref);

        var applyexpr = 'thisref.xbDebug_orig_' + funcname + '(';
        var i;

        for (i = 0; i < argumentsref.length; i++) {
            applyexpr += 'argumentsref[' + i + '],';
        }

        if (argumentsref.length > 0) {
            applyexpr = applyexpr.substring(0, applyexpr.length - 1);
        }

        applyexpr += ')';

        return eval(applyexpr);
    }

    function xbDebugCreateFunctionWrapper(scopename, funcname, precall, postcall) {
        var wrappedfunc;
        var scopeobject = eval(scopename);
        var funcref = scopeobject[funcname];

        scopeobject['xbDebug_orig_' + funcname] = funcref;

        wrappedfunc = function() {
            var rv;

            precall(scopename, funcname, arguments);
            rv = xbDebugApplyFunction(funcname, funcref, scopeobject, arguments);
            postcall(scopename, funcname, arguments, rv);
            return rv;
        };

        if (typeof (funcref.constructor) != 'undefined')
            wrappedfunc.constructor = funcref.constuctor;

        if (typeof (funcref.prototype) != 'undefined')
            wrappedfunc.prototype = funcref.prototype;

        scopeobject[funcname] = wrappedfunc;
    }

    function xbDebugCreateMethodWrapper(contextname, classname, methodname, precall, postcall) {
        var context = eval(contextname);
        var methodref = context[classname].prototype[methodname];

        context[classname].prototype['xbDebug_orig_' + methodname] = methodref;

        var wrappedmethod = function() {
            var rv;
            // eval 'this' at method run time to pick up reference to the object's instance
            var thisref = eval('this');
            // eval 'arguments' at method run time to pick up method's arguments
            var argsref = arguments;

            precall(contextname + '.' + classname, methodname, argsref);
            rv = xbDebugApplyFunction(methodname, methodref, thisref, argsref);
            postcall(contextname + '.' + classname, methodname, argsref, rv);
            return rv;
        };

        return wrappedmethod;
    }

    function xbDebugPersistToString(obj) {
        var s = '';

        if (obj == null)
            return 'null';

        switch (typeof (obj)) {
            case 'number':
                return obj;
            case 'string':
                return '"' + obj + '"';
            case 'undefined':
                return 'undefined';
            case 'boolean':
                return obj + '';
        }

        if (obj.constructor)
            return '[' + xbDebugGetFunctionName(obj.constructor) + ']';

        return null;
    }

    function xbDebugTraceBefore(scopename, funcname, funcarguments) {
        var i;
        var s = '';
        var execprofile = xbDEBUG.execprofile[scopename + '.' + funcname];
        if (!execprofile)
            execprofile = xbDEBUG.execprofile[scopename + '.' + funcname] = { started: 0, time: 0, count: 0 };

        for (i = 0; i < funcarguments.length; i++) {
            s += xbDebugPersistToString(funcarguments[i]);
            if (i < funcarguments.length - 1)
                s += ', ';
        }

        xbDEBUG.dump('enter ' + scopename + '.' + funcname + '(' + s + ')');
        execprofile.started = (new Date()).getTime();
    }

    function xbDebugTraceAfter(scopename, funcname, funcarguments, rv) {
        var i;
        var s = '';
        var execprofile = xbDEBUG.execprofile[scopename + '.' + funcname];
        if (!execprofile)
            xbDEBUG.dump('xbDebugTraceAfter: execprofile not created for ' + scopename + '.' + funcname);
        else if (execprofile.started == 0)
            xbDEBUG.dump('xbDebugTraceAfter: execprofile.started == 0 for ' + scopename + '.' + funcname);
        else {
            execprofile.time += (new Date()).getTime() - execprofile.started;
            execprofile.count++;
            execprofile.started = 0;
        }

        for (i = 0; i < funcarguments.length; i++) {
            s += xbDebugPersistToString(funcarguments[i]);
            if (i < funcarguments.length - 1)
                s += ', ';
        }

        xbDEBUG.dump('exit  ' + scopename + '.' + funcname + '(' + s + ')==' + xbDebugPersistToString(rv));
    }

    function xbDebugTraceFunction(scopename, funcname) {
        xbDebugCreateFunctionWrapper(scopename, funcname, xbDebugTraceBefore, xbDebugTraceAfter);
    }

    function xbDebugTraceObject(contextname, classname) {
        var classref = eval(contextname + '.' + classname);
        var p;
        var sp;

        if (!classref || !classref.prototype)
            return;

        for (p in classref.prototype) {
            sp = p + '';
            if (typeof (classref.prototype[sp]) == 'function' && (sp).indexOf('xbDebug_orig') == -1) {
                classref.prototype[sp] = xbDebugCreateMethodWrapper(contextname, classname, sp, xbDebugTraceBefore, xbDebugTraceAfter);
            }
        }
    }

    function xbDebugDumpProfile() {
        var p;
        var execprofile;
        var avg;

        for (p in xbDEBUG.execprofile) {
            execprofile = xbDEBUG.execprofile[p];
            avg = Math.round(100 * execprofile.time / execprofile.count) / 100;
            xbDEBUG.dump('Execution profile ' + p + ' called ' + execprofile.count + ' times. Total time=' + execprofile.time + 'ms. Avg Time=' + avg + 'ms.');
        }
    }

    /* ********************** END xbDebug.js ********************** */

    /* ********************** BEGIN xbStyle.js ********************** */

    /* ***** BEGIN LICENSE BLOCK *****
    * Version: MPL 1.1/GPL 2.0/LGPL 2.1
    *
    * The contents of this file are subject to the Mozilla Public License Version
    * 1.1 (the "License"); you may not use this file except in compliance with
    * the License. You may obtain a copy of the License at
    * http://www.mozilla.org/MPL/
    *
    * Software distributed under the License is distributed on an "AS IS" basis,
    * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
    * for the specific language governing rights and limitations under the
    * License.
    *
    * The Original Code is Netscape code.
    *
    * The Initial Developer of the Original Code is
    * Netscape Corporation.
    * Portions created by the Initial Developer are Copyright (C) 2001
    * the Initial Developer. All Rights Reserved.
    *
    * Contributor(s): Bob Clary <bclary@netscape.com>
    *
    * ***** END LICENSE BLOCK ***** */

    function xbStyleNotSupported() { }

    function xbStyleNotSupportStringValue(propname) { xbDEBUG.dump(propname + ' is not supported in this browser'); return ''; };

    /////////////////////////////////////////////////////////////
    // xbClipRect

    function xbClipRect(a1, a2, a3, a4) {
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.left = 0;

        if (typeof (a1) == 'string') {
            var val;
            var ca;
            var i;

            if (a1.indexOf('rect(') == 0) {
                // I would have preferred [0-9]+[a-zA-Z]+ for a regexp
                // but NN4 returns null for that. 
                ca = a1.substring(5, a1.length - 1).match(/-?[0-9a-zA-Z]+/g);
                for (i = 0; i < 4; ++i) {
                    val = xbToInt(ca[i]);
                    if (val != 0 && ca[i].indexOf('px') == -1) {
                        xbDEBUG.dump('xbClipRect: A clipping region ' + a1 + ' was detected that did not use pixels as units.  Click Ok to continue, Cancel to Abort');
                        return;
                    }
                    ca[i] = val;
                }
                this.top = ca[0];
                this.right = ca[1];
                this.bottom = ca[2];
                this.left = ca[3];
            }
        }
        else if (typeof (a1) == 'number' && typeof (a2) == 'number' && typeof (a3) == 'number' && typeof (a4) == 'number') {
            this.top = a1;
            this.right = a2;
            this.bottom = a3;
            this.left = a4;
        }
    }

    xbClipRect.prototype.top = 0;
    xbClipRect.prototype.right = 0;
    xbClipRect.prototype.bottom = 0;
    xbClipRect.prototype.left = 0;


    function xbClipRectGetWidth() {
        return this.right - this.left;
    }
    xbClipRect.prototype.getWidth = xbClipRectGetWidth;

    function xbClipRectSetWidth(width) {
        this.right = this.left + width;
    }
    xbClipRect.prototype.setWidth = xbClipRectSetWidth;

    function xbClipRectGetHeight() {
        return this.bottom - this.top;
    }
    xbClipRect.prototype.getHeight = xbClipRectGetHeight;

    function xbClipRectSetHeight(height) {
        this.bottom = this.top + height;
    }
    xbClipRect.prototype.setHeight = xbClipRectSetHeight;

    function xbClipRectToString() {
        return 'rect(' + this.top + 'px ' + this.right + 'px ' + this.bottom + 'px ' + this.left + 'px )';
    }
    xbClipRect.prototype.toString = xbClipRectToString;

    /////////////////////////////////////////////////////////////
    // xbStyle
    //
    // Note Opera violates the standard by cascading the effective values
    // into the HTMLElement.style object. We can use IE's HTMLElement.currentStyle
    // to get the effective values. In Gecko we will use the W3 DOM Style Standard getComputedStyle

    function xbStyle(obj, win, position) {
        if (typeof (obj) == 'object' && typeof (obj.style) != 'undefined')
            this.styleObj = obj.style;
        else if (document.layers) // NN4
        {
            if (typeof (position) == 'undefined')
                position = '';

            this.styleObj = obj;
            this.styleObj.position = position;
        }
        this.object = obj;
        this.window = win ? win : window;
    }

    xbStyle.prototype.styleObj = null;
    xbStyle.prototype.object = null;

    /////////////////////////////////////////////////////////////
    // xbStyle.getEffectiveValue()
    // note that xbStyle's constructor uses the currentStyle object 
    // for IE5+ and that Opera's style object contains computed values
    // already. Netscape Navigator's layer object also contains the 
    // computed values as well. Note that IE4 will not return the 
    // computed values.

    function xbStyleGetEffectiveValue(propname) {
        var value = null;

        if (this.window.document.defaultView && this.window.document.defaultView.getComputedStyle) {
            // W3
            // Note that propname is the name of the property in the CSS Style
            // Object. However the W3 method getPropertyValue takes the actual
            // property name from the CSS Style rule, i.e., propname is 
            // 'backgroundColor' but getPropertyValue expects 'background-color'.

            var capIndex;
            var cappropname = propname;

            while ((capIndex = cappropname.search(/[A-Z]/)) != -1) {
                if (capIndex != -1) {
                    cappropname = cappropname.substring(0, capIndex) + '-' + cappropname.substring(capIndex, capIndex + 1).toLowerCase() + cappropname.substr(capIndex + 1);
                }
            }

            value = this.window.document.defaultView.getComputedStyle(this.object, '').getPropertyValue(cappropname);

            // xxxHack for Gecko:
            if (!value && this.styleObj[propname]) {
                value = this.styleObj[propname];
            }
        }
        else if (typeof (this.styleObj[propname]) == 'undefined') {
            value = xbStyleNotSupportStringValue(propname);
        }
        else if (typeof (this.object.currentStyle) != 'undefined') {
            // IE5+
            value = this.object.currentStyle[propname];
            if (!value) {
                value = this.styleObj[propname];
            }

            if (propname == 'clip' && !value) {
                // clip is not stored in IE5/6 handle separately
                value = 'rect(' + this.object.currentStyle.clipTop + ', ' + this.object.currentStyle.clipRight + ', ' + this.object.currentStyle.clipBottom + ', ' + this.object.currentStyle.clipLeft + ')';
            }
        }
        else {
            // IE4+, Opera, NN4
            value = this.styleObj[propname];
        }

        return value;
    }

    /////////////////////////////////////////////////////////////////////////////
    // xbStyle.moveAbove()

    function xbStyleMoveAbove(cont) {
        this.setzIndex(cont.getzIndex() + 1);
    }

    /////////////////////////////////////////////////////////////////////////////
    // xbStyle.moveBelow()

    function xbStyleMoveBelow(cont) {
        var zindex = cont.getzIndex() - 1;

        this.setzIndex(zindex);
    }

    /////////////////////////////////////////////////////////////////////////////
    // xbStyle.moveBy()

    function xbStyleMoveBy(deltaX, deltaY) {
        this.moveTo(this.getLeft() + deltaX, this.getTop() + deltaY);
    }

    /////////////////////////////////////////////////////////////////////////////
    // xbStyle.moveTo()

    function xbStyleMoveTo(x, y) {
        this.setLeft(x);
        this.setTop(y);
    }

    /////////////////////////////////////////////////////////////////////////////
    // xbStyle.moveToAbsolute()

    function xbStyleMoveToAbsolute(x, y) {
        this.setPageX(x);
        this.setPageY(y);
    }

    /////////////////////////////////////////////////////////////////////////////
    // xbStyle.resizeBy()

    function xbStyleResizeBy(deltaX, deltaY) {
        this.setWidth(this.getWidth() + deltaX);
        this.setHeight(this.getHeight() + deltaY);
    }

    /////////////////////////////////////////////////////////////////////////////
    // xbStyle.resizeTo()

    function xbStyleResizeTo(x, y) {
        this.setWidth(x);
        this.setHeight(y);
    }

    ////////////////////////////////////////////////////////////////////////

    xbStyle.prototype.getEffectiveValue = xbStyleGetEffectiveValue;
    xbStyle.prototype.moveAbove = xbStyleMoveAbove;
    xbStyle.prototype.moveBelow = xbStyleMoveBelow;
    xbStyle.prototype.moveBy = xbStyleMoveBy;
    xbStyle.prototype.moveTo = xbStyleMoveTo;
    xbStyle.prototype.moveToAbsolute = xbStyleMoveToAbsolute;
    xbStyle.prototype.resizeBy = xbStyleResizeBy;
    xbStyle.prototype.resizeTo = xbStyleResizeTo;

    if (document.all || document.getElementsByName) {
        /* ********************** BEGIN xbStyle-css.js ********************** */

        /* ***** BEGIN LICENSE BLOCK *****
        * Version: MPL 1.1/GPL 2.0/LGPL 2.1
        *
        * The contents of this file are subject to the Mozilla Public License Version
        * 1.1 (the "License"); you may not use this file except in compliance with
        * the License. You may obtain a copy of the License at
        * http://www.mozilla.org/MPL/
        *
        * Software distributed under the License is distributed on an "AS IS" basis,
        * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
        * for the specific language governing rights and limitations under the
        * License.
        *
        * The Original Code is Netscape code.
        *
        * The Initial Developer of the Original Code is
        * Netscape Corporation.
        * Portions created by the Initial Developer are Copyright (C) 2001
        * the Initial Developer. All Rights Reserved.
        *
        * Contributor(s): Bob Clary <bclary@netscape.com>
        *
        * ***** END LICENSE BLOCK ***** */

        // xbStyle.getClip()

        function cssStyleGetClip() {
            var clip = this.getEffectiveValue('clip');

            // hack opera
            if (clip == 'rect()')
                clip = '';

            if (clip == '' || clip == 'auto') {
                clip = 'rect(0px, ' + this.getWidth() + 'px, ' + this.getHeight() + 'px, 0px)';
            }
            else {
                clip = clip.replace(/px /g, 'px, ');
            }

            return clip;
        }

        // xbStyle.setClip()

        function cssStyleSetClip(sClipString) {
            this.styleObj.clip = sClipString;
        }

        // xbStyle.getClipTop()

        function cssStyleGetClipTop() {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            return rect.top;
        }

        // xbStyle.setClipTop()

        function cssStyleSetClipTop(top) {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            rect.top = top;
            this.styleObj.clip = rect.toString();
        }

        // xbStyle.getClipRight()

        function cssStyleGetClipRight() {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            return rect.right;
        }

        // xbStyle.setClipRight()

        function cssStyleSetClipRight(right) {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            rect.right = right;
            this.styleObj.clip = rect.toString();
        }

        // xbStyle.getClipBottom()

        function cssStyleGetClipBottom() {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            return rect.bottom;
        }

        // xbStyle.setClipBottom()

        function cssStyleSetClipBottom(bottom) {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            rect.bottom = bottom;
            this.styleObj.clip = rect.toString();
        }

        // xbStyle.getClipLeft()

        function cssStyleGetClipLeft() {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            return rect.left;
        }

        // xbStyle.setClipLeft()

        function cssStyleSetClipLeft(left) {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            rect.left = left;
            this.styleObj.clip = rect.toString();
        }

        // xbStyle.getClipWidth()

        function cssStyleGetClipWidth() {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            return rect.getWidth();
        }

        // xbStyle.setClipWidth()

        function cssStyleSetClipWidth(width) {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            rect.setWidth(width);
            this.styleObj.clip = rect.toString();
        }

        // xbStyle.getClipHeight()

        function cssStyleGetClipHeight() {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            return rect.getHeight();
        }

        // xbStyle.setClipHeight()

        function cssStyleSetClipHeight(height) {
            var clip = this.getClip();
            var rect = new xbClipRect(clip);
            rect.setHeight(height);
            this.styleObj.clip = rect.toString();
        }

        // the CSS attributes left,top are for absolutely positioned elements
        // measured relative to the containing element.  for relatively positioned
        // elements, left,top are measured from the element's normal inline position.
        // getLeft(), setLeft() operate on this type of coordinate.
        //
        // to allow dynamic positioning the getOffsetXXX and setOffsetXXX methods are
        // defined to return and set the position of either an absolutely or relatively
        // positioned element relative to the containing element.
        //
        //

        // xbStyle.getLeft()

        function cssStyleGetLeft() {
            var left = this.getEffectiveValue('left');
            if (typeof (left) == 'number')
                return left;

            if (left != '' && left.indexOf('px') == -1) {
                xbDEBUG.dump('xbStyle.getLeft: Element ID=' + this.object.id + ' does not use pixels as units. left=' + left + ' Click Ok to continue, Cancel to Abort');
                return 0;
            }

            if (top == 'auto' && this.object && typeof (this.object.offsetTop) == 'number') {
                left = this.object.offsetTop + 'px';
            }

            if (left == '')
                left = '0px';

            return xbToInt(left);
        }

        // xbStyle.setLeft()

        function cssStyleSetLeft(left) {
            if (typeof (this.styleObj.left) == 'number')
                this.styleObj.left = left;
            else
                this.styleObj.left = left + 'px';
        }

        // xbStyle.getTop()

        function cssStyleGetTop() {
            var top = this.getEffectiveValue('top');
            if (typeof (top) == 'number')
                return top;

            if (top != '' && top.indexOf('px') == -1) {
                xbDEBUG.dump('xbStyle.getTop: Element ID=' + this.object.id + ' does not use pixels as units. top=' + top + ' Click Ok to continue, Cancel to Abort');
                return 0;
            }

            if (top == 'auto' && this.object && typeof (this.object.offsetTop) == 'number') {
                top = this.object.offsetTop + 'px';
            }

            if (top == '')
                top = '0px';

            return xbToInt(top);
        }

        // xbStyle.setTop()

        function cssStyleSetTop(top) {
            if (typeof (this.styleObj.top) == 'number')
                this.styleObj.top = top;
            else
                this.styleObj.top = top + 'px';
        }

        // xbStyle.getPageX()

        function cssStyleGetPageX() {
            var x = 0;
            var elm = this.object;
            var elmstyle;
            var position;

            //xxxHack: Due to limitations in Gecko's (0.9.6) ability to determine the 
            // effective position attribute , attempt to use offsetXXX

            if (typeof (elm.offsetLeft) == 'number') {
                while (elm) {
                    x += elm.offsetLeft;
                    elm = elm.offsetParent;
                }
            }
            else {
                while (elm) {
                    if (elm.style) {
                        elmstyle = new xbStyle(elm);
                        position = elmstyle.getEffectiveValue('position');
                        if (position != '' && position != 'static')
                            x += elmstyle.getLeft();
                    }
                    elm = elm.parentNode;
                }
            }

            return x;
        }

        // xbStyle.setPageX()

        function cssStyleSetPageX(x) {
            var xParent = 0;
            var elm = this.object.parentNode;
            var elmstyle;
            var position;

            //xxxHack: Due to limitations in Gecko's (0.9.6) ability to determine the 
            // effective position attribute , attempt to use offsetXXX

            if (elm && typeof (elm.offsetLeft) == 'number') {
                while (elm) {
                    xParent += elm.offsetLeft;
                    elm = elm.offsetParent;
                }
            }
            else {
                while (elm) {
                    if (elm.style) {
                        elmstyle = new xbStyle(elm);
                        position = elmstyle.getEffectiveValue('position');
                        if (position != '' && position != 'static')
                            xParent += elmstyle.getLeft();
                    }
                    elm = elm.parentNode;
                }
            }

            x -= xParent;

            this.setLeft(x);
        }

        // xbStyle.getPageY()

        function cssStyleGetPageY() {
            var y = 0;
            var elm = this.object;
            var elmstyle;
            var position;

            //xxxHack: Due to limitations in Gecko's (0.9.6) ability to determine the 
            // effective position attribute , attempt to use offsetXXX

            if (typeof (elm.offsetTop) == 'number') {
                while (elm) {
                    y += elm.offsetTop;
                    elm = elm.offsetParent;
                }
            }
            else {
                while (elm) {
                    if (elm.style) {
                        elmstyle = new xbStyle(elm);
                        position = elmstyle.getEffectiveValue('position');
                        if (position != '' && position != 'static')
                            y += elmstyle.getTop();
                    }
                    elm = elm.parentNode;
                }
            }

            return y;
        }

        // xbStyle.setPageY()

        function cssStyleSetPageY(y) {
            var yParent = 0;
            var elm = this.object.parentNode;
            var elmstyle;
            var position;

            //xxxHack: Due to limitations in Gecko's (0.9.6) ability to determine the 
            // effective position attribute , attempt to use offsetXXX

            if (elm && typeof (elm.offsetTop) == 'number') {
                while (elm) {
                    yParent += elm.offsetTop;
                    elm = elm.offsetParent;
                }
            }
            else {
                while (elm) {
                    if (elm.style) {
                        elmstyle = new xbStyle(elm);
                        position = elmstyle.getEffectiveValue('position');
                        if (position != '' && position != 'static')
                            yParent += elmstyle.getTop();
                    }
                    elm = elm.parentNode;
                }
            }

            y -= yParent;

            this.setTop(y);
        }

        // xbStyle.getHeight()

        function cssStyleGetHeight() {
            var display = this.getEffectiveValue('display');
            var height = this.getEffectiveValue('height');

            if (typeof (height) == 'number') {
                // Opera
                return height;
            }

            if (height == '' || height == 'auto' || height.indexOf('%') != -1) {
                if (typeof (this.object.offsetHeight) == 'number') {
                    height = this.object.offsetHeight + 'px';
                }
                else if (typeof (this.object.scrollHeight) == 'number') {
                    height = this.object.scrollHeight + 'px';
                }
            }

            if (height.indexOf('px') == -1) {
                xbDEBUG.dump('xbStyle.getHeight: Element ID=' + this.object.id + ' does not use pixels as units. height=' + height + ' Click Ok to continue, Cancel to Abort');
                return 0;
            }

            height = xbToInt(height);

            return height;
        }

        // xbStyle.setHeight()

        function cssStyleSetHeight(height) {
            if (height < 0) height = 0; //sanity check

            if (typeof (this.styleObj.height) == 'number')
                this.styleObj.height = height;
            else
                this.styleObj.height = height + 'px';
        }

        // xbStyle.getWidth()

        function cssStyleGetWidth() {
            var display = this.getEffectiveValue('display');
            var width = this.getEffectiveValue('width');

            if (typeof (width) == 'number') {
                // note Opera 6 has a bug in width and offsetWidth where 
                // it returns the page width. Use clientWidth instead.
                if (navigator.userAgent.indexOf('Opera') != -1)
                    return this.object.clientWidth;
                else
                    return width;
            }

            if (width == '' || width == 'auto' || width.indexOf('%') != -1) {
                if (typeof (this.object.offsetWidth) == 'number') {
                    width = this.object.offsetWidth + 'px';
                }
                else if (typeof (this.object.scrollHeight) == 'number') {
                    width = this.object.scrollWidth + 'px';
                }
            }

            if (width.indexOf('px') == -1) {
                xbDEBUG.dump('xbStyle.getWidth: Element ID=' + this.object.id + ' does not use pixels as units. width=' + width + ' Click Ok to continue, Cancel to Abort');
                return 0;
            }

            width = xbToInt(width);

            return width;
        }

        // xbStyle.setWidth()

        function cssStyleSetWidth(width) {
            if (width < 0 || width == undefined) width = 0; // sanity check

            if (typeof (this.styleObj.width) == 'number')
                this.styleObj.width = width;
            else
                this.styleObj.width = width + 'px';
        }

        // xbStyle.getVisibility()

        function cssStyleGetVisibility() {
            return this.getEffectiveValue('visibility');
        }

        // xbStyle.setVisibility()

        function cssStyleSetVisibility(visibility) {
            this.styleObj.visibility = visibility;
        }

        // xbStyle.getzIndex()

        function cssStyleGetzIndex() {
            return xbToInt(this.getEffectiveValue('zIndex'));
        }

        // xbStyle.setzIndex()

        function cssStyleSetzIndex(zIndex) {
            this.styleObj.zIndex = zIndex;
        }

        // xbStyle.getBackgroundColor()

        function cssStyleGetBackgroundColor() {
            return this.getEffectiveValue('backgroundColor');
        }

        // xbStyle.setBackgroundColor()

        function cssStyleSetBackgroundColor(color) {
            this.styleObj.backgroundColor = color;
        }

        // xbStyle.getColor()

        function cssStyleGetColor() {
            return this.getEffectiveValue('color');
        }

        // xbStyle.setColor()

        function cssStyleSetColor(color) {
            this.styleObj.color = color;
        }

        // xbStyle.moveAbove()

        function xbStyleMoveAbove(cont) {
            this.setzIndex(cont.getzIndex() + 1);
        }

        // xbStyle.moveBelow()

        function xbStyleMoveBelow(cont) {
            var zindex = cont.getzIndex() - 1;

            this.setzIndex(zindex);
        }

        // xbStyle.moveBy()

        function xbStyleMoveBy(deltaX, deltaY) {
            this.moveTo(this.getLeft() + deltaX, this.getTop() + deltaY);
        }

        // xbStyle.moveTo()

        function xbStyleMoveTo(x, y) {
            this.setLeft(x);
            this.setTop(y);
        }

        // xbStyle.moveToAbsolute()

        function xbStyleMoveToAbsolute(x, y) {
            this.setPageX(x);
            this.setPageY(y);
        }

        // xbStyle.resizeBy()

        function xbStyleResizeBy(deltaX, deltaY) {
            this.setWidth(this.getWidth() + deltaX);
            this.setHeight(this.getHeight() + deltaY);
        }

        // xbStyle.resizeTo()

        function xbStyleResizeTo(x, y) {
            this.setWidth(x);
            this.setHeight(y);
        }

        // xbStyle.setInnerHTML()

        function xbSetInnerHTML(str) {
            if (typeof (this.object.innerHTML) != 'undefined')
                this.object.innerHTML = str;
        }


        // Extensions to xbStyle that are not supported by Netscape Navigator 4
        // but that provide cross browser implementations of properties for 
        // Mozilla, Gecko, Netscape 6.x and Opera

        // xbStyle.getBorderTopWidth()

        function cssStyleGetBorderTopWidth() {
            return xbToInt(this.getEffectiveValue('borderTopWidth'));
        }

        // xbStyle.getBorderRightWidth()

        function cssStyleGetBorderRightWidth() {
            return xbToInt(this.getEffectiveValue('borderRightWidth'));
        }

        // xbStyle.getBorderBottomWidth()

        function cssStyleGetBorderBottomWidth() {
            return xbToInt(this.getEffectiveValue('borderBottomWidth'));
        }

        // xbStyle.getBorderLeftWidth()

        function cssStyleGetBorderLeftWidth() {
            return xbToInt(this.getEffectiveValue('borderLeftWidth'));
        }

        // xbStyle.getMarginTop()

        function cssStyleGetMarginTop() {
            return xbToInt(this.getEffectiveValue('marginTop'));
        }

        // xbStyle.getMarginRight()

        function cssStyleGetMarginRight() {
            return xbToInt(this.getEffectiveValue('marginRight'));
        }

        // xbStyle.getMarginBottom()

        function cssStyleGetMarginBottom() {
            return xbToInt(this.getEffectiveValue('marginBottom'));
        }

        // xbStyle.getMarginLeft()

        function cssStyleGetMarginLeft() {
            return xbToInt(this.getEffectiveValue('marginLeft'));
        }

        // xbStyle.getPaddingTop()

        function cssStyleGetPaddingTop() {
            return xbToInt(this.getEffectiveValue('paddingTop'));
        }

        // xbStyle.getPaddingRight()

        function cssStyleGetPaddingRight() {
            return xbToInt(this.getEffectiveValue('paddingRight'));
        }

        // xbStyle.getPaddingBottom()

        function cssStyleGetPaddingBottom() {
            return xbToInt(this.getEffectiveValue('paddingBottom'));
        }

        // xbStyle.getPaddingLeft()

        function cssStyleGetPaddingLeft() {
            return xbToInt(this.getEffectiveValue('paddingLeft'));
        }

        // xbStyle.getClientWidth()

        function cssStyleGetClientWidth() {
            return this.getWidth() + this.getPaddingLeft() + this.getPaddingRight();
            /*
            if (typeof(this.object.clientWidth) == 'number')
            return this.object.clientWidth;
		
		  return null;
            */
        }

        // xbStyle.getClientHeight()

        function cssStyleGetClientHeight() {
            return this.getHeight() + this.getPaddingTop() + this.getPaddingBottom();
            /*
            if (typeof(this.object.clientHeight) == 'number')
            return this.object.clientHeight;
		
		  return null;
            */
        }

        xbStyle.prototype.getClip = cssStyleGetClip;
        xbStyle.prototype.setClip = cssStyleSetClip;
        xbStyle.prototype.getClipTop = cssStyleGetClipTop;
        xbStyle.prototype.setClipTop = cssStyleSetClipTop;
        xbStyle.prototype.getClipRight = cssStyleGetClipRight;
        xbStyle.prototype.setClipRight = cssStyleSetClipRight;
        xbStyle.prototype.getClipBottom = cssStyleGetClipBottom;
        xbStyle.prototype.setClipBottom = cssStyleSetClipBottom;
        xbStyle.prototype.getClipLeft = cssStyleGetClipLeft;
        xbStyle.prototype.setClipLeft = cssStyleSetClipLeft;
        xbStyle.prototype.getClipWidth = cssStyleGetClipWidth;
        xbStyle.prototype.setClipWidth = cssStyleSetClipWidth;
        xbStyle.prototype.getClipHeight = cssStyleGetClipHeight;
        xbStyle.prototype.setClipHeight = cssStyleSetClipHeight;
        xbStyle.prototype.getLeft = cssStyleGetLeft;
        xbStyle.prototype.setLeft = cssStyleSetLeft;
        xbStyle.prototype.getTop = cssStyleGetTop;
        xbStyle.prototype.setTop = cssStyleSetTop;
        xbStyle.prototype.getPageX = cssStyleGetPageX;
        xbStyle.prototype.setPageX = cssStyleSetPageX;
        xbStyle.prototype.getPageY = cssStyleGetPageY;
        xbStyle.prototype.setPageY = cssStyleSetPageY;
        xbStyle.prototype.getVisibility = cssStyleGetVisibility;
        xbStyle.prototype.setVisibility = cssStyleSetVisibility;
        xbStyle.prototype.getzIndex = cssStyleGetzIndex;
        xbStyle.prototype.setzIndex = cssStyleSetzIndex;
        xbStyle.prototype.getHeight = cssStyleGetHeight;
        xbStyle.prototype.setHeight = cssStyleSetHeight;
        xbStyle.prototype.getWidth = cssStyleGetWidth;
        xbStyle.prototype.setWidth = cssStyleSetWidth;
        xbStyle.prototype.getBackgroundColor = cssStyleGetBackgroundColor;
        xbStyle.prototype.setBackgroundColor = cssStyleSetBackgroundColor;
        xbStyle.prototype.getColor = cssStyleGetColor;
        xbStyle.prototype.setColor = cssStyleSetColor;
        xbStyle.prototype.setInnerHTML = xbSetInnerHTML;
        xbStyle.prototype.getBorderTopWidth = cssStyleGetBorderTopWidth;
        xbStyle.prototype.getBorderRightWidth = cssStyleGetBorderRightWidth;
        xbStyle.prototype.getBorderBottomWidth = cssStyleGetBorderBottomWidth;
        xbStyle.prototype.getBorderLeftWidth = cssStyleGetBorderLeftWidth;
        xbStyle.prototype.getMarginLeft = cssStyleGetMarginLeft;
        xbStyle.prototype.getMarginTop = cssStyleGetMarginTop;
        xbStyle.prototype.getMarginRight = cssStyleGetMarginRight;
        xbStyle.prototype.getMarginBottom = cssStyleGetMarginBottom;
        xbStyle.prototype.getMarginLeft = cssStyleGetMarginLeft;
        xbStyle.prototype.getPaddingTop = cssStyleGetPaddingTop;
        xbStyle.prototype.getPaddingRight = cssStyleGetPaddingRight;
        xbStyle.prototype.getPaddingBottom = cssStyleGetPaddingBottom;
        xbStyle.prototype.getPaddingLeft = cssStyleGetPaddingLeft;
        xbStyle.prototype.getClientWidth = cssStyleGetClientWidth;
        xbStyle.prototype.getClientHeight = cssStyleGetClientHeight;


        /* ********************** END xbStyle-css.js ********************** */
    }
    else if (document.layers) {
        /* ********************** BEGIN xbStyle-nn4.js ********************** */

        /* ***** BEGIN LICENSE BLOCK *****
        * Version: MPL 1.1/GPL 2.0/LGPL 2.1
        *
        * The contents of this file are subject to the Mozilla Public License Version
        * 1.1 (the "License"); you may not use this file except in compliance with
        * the License. You may obtain a copy of the License at
        * http://www.mozilla.org/MPL/
        *
        * Software distributed under the License is distributed on an "AS IS" basis,
        * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
        * for the specific language governing rights and limitations under the
        * License.
        *
        * The Original Code is Netscape code.
        *
        * The Initial Developer of the Original Code is
        * Netscape Corporation.
        * Portions created by the Initial Developer are Copyright (C) 2001
        * the Initial Developer. All Rights Reserved.
        *
        * Contributor(s): Bob Clary <bclary@netscape.com>
        *
        * ***** END LICENSE BLOCK ***** */

        /////////////////////////////////////////////////////////////
        // xbStyle.getClip()

        function nsxbStyleGetClip() {
            var clip = this.styleObj.clip;
            var rect = new xbClipRect(clip.top, clip.right, clip.bottom, clip.left);
            return rect.toString();
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.setClip()

        function nsxbStyleSetClip(sClipString) {
            var rect = new xbClipRect(sClipString);
            this.styleObj.clip.top = rect.top;
            this.styleObj.clip.right = rect.right;
            this.styleObj.clip.bottom = rect.bottom;
            this.styleObj.clip.left = rect.left;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.getClipTop()

        function nsxbStyleGetClipTop() {
            return this.styleObj.clip.top;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.setClipTop()

        function nsxbStyleSetClipTop(top) {
            return this.styleObj.clip.top = top;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.getClipRight()

        function nsxbStyleGetClipRight() {
            return this.styleObj.clip.right;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.setClipRight()

        function nsxbStyleSetClipRight(right) {
            return this.styleObj.clip.right = right;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.getClipBottom()

        function nsxbStyleGetClipBottom() {
            return this.styleObj.clip.bottom;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.setClipBottom()

        function nsxbStyleSetClipBottom(bottom) {
            return this.styleObj.clip.bottom = bottom;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.getClipLeft()

        function nsxbStyleGetClipLeft() {
            return this.styleObj.clip.left;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.setClipLeft()

        function nsxbStyleSetClipLeft(left) {
            return this.styleObj.clip.left = left;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.getClipWidth()

        function nsxbStyleGetClipWidth() {
            return this.styleObj.clip.width;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.setClipWidth()

        function nsxbStyleSetClipWidth(width) {
            return this.styleObj.clip.width = width;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.getClipHeight()

        function nsxbStyleGetClipHeight() {
            return this.styleObj.clip.height;
        }

        /////////////////////////////////////////////////////////////
        // xbStyle.setClipHeight()

        function nsxbStyleSetClipHeight(height) {
            return this.styleObj.clip.height = height;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.getLeft()

        function nsxbStyleGetLeft() {
            return this.styleObj.left;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.setLeft()

        function nsxbStyleSetLeft(left) {
            this.styleObj.left = left;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.getTop()

        function nsxbStyleGetTop() {
            return this.styleObj.top;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.setTop()

        function nsxbStyleSetTop(top) {
            this.styleObj.top = top;
        }


        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.getPageX()

        function nsxbStyleGetPageX() {
            return this.styleObj.pageX;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.setPageX()

        function nsxbStyleSetPageX(x) {
            this.styleObj.x = this.styleObj.x + x - this.styleObj.pageX;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.getPageY()


        function nsxbStyleGetPageY() {
            return this.styleObj.pageY;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.setPageY()

        function nsxbStyleSetPageY(y) {
            this.styleObj.y = this.styleObj.y + y - this.styleObj.pageY;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.getHeight()

        function nsxbStyleGetHeight() {
            //if (this.styleObj.document && this.styleObj.document.height)
            //  return this.styleObj.document.height;

            return this.styleObj.clip.height;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.setHeight()

        function nsxbStyleSetHeight(height) {
            this.styleObj.clip.height = height;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.getWidth()

        function nsxbStyleGetWidth() {
            //if (this.styleObj.document && this.styleObj.document.width)
            //  return this.styleObj.document.width;

            return this.styleObj.clip.width;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.setWidth()

        // netscape will not dynamically change the width of a 
        // layer. It will only happen upon a refresh.
        function nsxbStyleSetWidth(width) {
            this.styleObj.clip.width = width;
        }

        /////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.getVisibility()

        function nsxbStyleGetVisibility() {
            switch (this.styleObj.visibility) {
                case 'hide':
                    return 'hidden';
                case 'show':
                    return 'visible';
            }
            return '';
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.setVisibility()

        function nsxbStyleSetVisibility(visibility) {
            switch (visibility) {
                case 'hidden':
                    visibility = 'hide';
                    break;
                case 'visible':
                    visibility = 'show';
                    break;
                case 'inherit':
                    break;
                default:
                    visibility = 'show';
                    break;
            }
            this.styleObj.visibility = visibility;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.getzIndex()

        function nsxbStyleGetzIndex() {
            return this.styleObj.zIndex;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.setzIndex()

        function nsxbStyleSetzIndex(zIndex) {
            this.styleObj.zIndex = zIndex;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.getBackgroundColor()

        function nsxbStyleGetBackgroundColor() {
            return this.styleObj.bgColor;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.setBackgroundColor()

        function nsxbStyleSetBackgroundColor(color) {
            if (color) {
                this.styleObj.bgColor = color;
                this.object.document.bgColor = color;
                this.resizeTo(this.getWidth(), this.getHeight());
            }
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.getColor()

        function nsxbStyleGetColor() {
            return '#ffffff';
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.setColor()

        function nsxbStyleSetColor(color) {
            this.object.document.fgColor = color;
        }


        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.moveAbove()

        function xbStyleMoveAbove(cont) {
            this.setzIndex(cont.getzIndex() + 1);
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.moveBelow()

        function xbStyleMoveBelow(cont) {
            var zindex = cont.getzIndex() - 1;

            this.setzIndex(zindex);
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.moveBy()

        function xbStyleMoveBy(deltaX, deltaY) {
            this.moveTo(this.getLeft() + deltaX, this.getTop() + deltaY);
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.moveTo()

        function xbStyleMoveTo(x, y) {
            this.setLeft(x);
            this.setTop(y);
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.moveToAbsolute()

        function xbStyleMoveToAbsolute(x, y) {
            this.setPageX(x);
            this.setPageY(y);
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.resizeBy()

        function xbStyleResizeBy(deltaX, deltaY) {
            this.setWidth(this.getWidth() + deltaX);
            this.setHeight(this.getHeight() + deltaY);
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.resizeTo()

        function xbStyleResizeTo(x, y) {
            this.setWidth(x);
            this.setHeight(y);
        }

        ////////////////////////////////////////////////////////////////////////
        // Navigator 4.x resizing...

        function nsxbStyleOnresize() {
            if (saveInnerWidth != xbGetWindowWidth() || saveInnerHeight != xbGetWindowHeight())
                location.reload();

            return false;
        }

        /////////////////////////////////////////////////////////////////////////////
        // xbStyle.setInnerHTML()

        function nsxbSetInnerHTML(str) {
            this.object.document.open('text/html');
            this.object.document.write(str);
            this.object.document.close();
        }

        xbStyle.prototype.getClip = nsxbStyleGetClip;
        xbStyle.prototype.setClip = nsxbStyleSetClip;
        xbStyle.prototype.getClipTop = nsxbStyleGetClipTop;
        xbStyle.prototype.setClipTop = nsxbStyleSetClipTop;
        xbStyle.prototype.getClipRight = nsxbStyleGetClipRight;
        xbStyle.prototype.setClipRight = nsxbStyleSetClipRight;
        xbStyle.prototype.getClipBottom = nsxbStyleGetClipBottom;
        xbStyle.prototype.setClipBottom = nsxbStyleSetClipBottom;
        xbStyle.prototype.getClipLeft = nsxbStyleGetClipLeft;
        xbStyle.prototype.setClipLeft = nsxbStyleSetClipLeft;
        xbStyle.prototype.getClipWidth = nsxbStyleGetClipWidth;
        xbStyle.prototype.setClipWidth = nsxbStyleSetClipWidth;
        xbStyle.prototype.getClipHeight = nsxbStyleGetClipHeight;
        xbStyle.prototype.setClipHeight = nsxbStyleSetClipHeight;
        xbStyle.prototype.getLeft = nsxbStyleGetLeft;
        xbStyle.prototype.setLeft = nsxbStyleSetLeft;
        xbStyle.prototype.getTop = nsxbStyleGetTop;
        xbStyle.prototype.setTop = nsxbStyleSetTop;
        xbStyle.prototype.getPageX = nsxbStyleGetPageX;
        xbStyle.prototype.setPageX = nsxbStyleSetPageX;
        xbStyle.prototype.getPageY = nsxbStyleGetPageY;
        xbStyle.prototype.setPageY = nsxbStyleSetPageY;
        xbStyle.prototype.getVisibility = nsxbStyleGetVisibility;
        xbStyle.prototype.setVisibility = nsxbStyleSetVisibility;
        xbStyle.prototype.getzIndex = nsxbStyleGetzIndex;
        xbStyle.prototype.setzIndex = nsxbStyleSetzIndex;
        xbStyle.prototype.getHeight = nsxbStyleGetHeight;
        xbStyle.prototype.setHeight = nsxbStyleSetHeight;
        xbStyle.prototype.getWidth = nsxbStyleGetWidth;
        xbStyle.prototype.setWidth = nsxbStyleSetWidth;
        xbStyle.prototype.getBackgroundColor = nsxbStyleGetBackgroundColor;
        xbStyle.prototype.setBackgroundColor = nsxbStyleSetBackgroundColor;
        xbStyle.prototype.getColor = nsxbStyleGetColor;
        xbStyle.prototype.setColor = nsxbStyleSetColor;
        xbStyle.prototype.setInnerHTML = nsxbSetInnerHTML;
        xbStyle.prototype.getBorderTopWidth = xbStyleNotSupported;
        xbStyle.prototype.getBorderRightWidth = xbStyleNotSupported;
        xbStyle.prototype.getBorderBottomWidth = xbStyleNotSupported;
        xbStyle.prototype.getBorderLeftWidth = xbStyleNotSupported;
        xbStyle.prototype.getMarginLeft = xbStyleNotSupported;
        xbStyle.prototype.getMarginTop = xbStyleNotSupported;
        xbStyle.prototype.getMarginRight = xbStyleNotSupported;
        xbStyle.prototype.getMarginBottom = xbStyleNotSupported;
        xbStyle.prototype.getMarginLeft = xbStyleNotSupported;
        xbStyle.prototype.getPaddingTop = xbStyleNotSupported;
        xbStyle.prototype.getPaddingRight = xbStyleNotSupported;
        xbStyle.prototype.getPaddingBottom = xbStyleNotSupported;
        xbStyle.prototype.getPaddingLeft = xbStyleNotSupported;
        xbStyle.prototype.getClientWidth = xbStyleNotSupported;
        xbStyle.prototype.getClientHeight = xbStyleNotSupported;

        window.saveInnerWidth = window.innerWidth;
        window.saveInnerHeight = window.innerHeight;

        window.onresize = nsxbStyleOnresize;


        /* ********************** END xbStyle-nn4.js ********************** */
    }
    else {
        /* ********************** BEGIN xbStyle-not-supported.js ********************** */

        /* ***** BEGIN LICENSE BLOCK *****
        * Version: MPL 1.1/GPL 2.0/LGPL 2.1
        *
        * The contents of this file are subject to the Mozilla Public License Version
        * 1.1 (the "License"); you may not use this file except in compliance with
        * the License. You may obtain a copy of the License at
        * http://www.mozilla.org/MPL/
        *
        * Software distributed under the License is distributed on an "AS IS" basis,
        * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
        * for the specific language governing rights and limitations under the
        * License.
        *
        * The Original Code is Netscape code.
        *
        * The Initial Developer of the Original Code is
        * Netscape Corporation.
        * Portions created by the Initial Developer are Copyright (C) 2001
        * the Initial Developer. All Rights Reserved.
        *
        * Contributor(s): Bob Clary <bclary@netscape.com>
        *
        * ***** END LICENSE BLOCK ***** */

        xbStyle.prototype.toString = xbStyleNotSupported;
        xbStyle.prototype.getClip = xbStyleNotSupported;
        xbStyle.prototype.setClip = xbStyleNotSupported;
        xbStyle.prototype.getClipTop = xbStyleNotSupported;
        xbStyle.prototype.setClipTop = xbStyleNotSupported;
        xbStyle.prototype.getClipRight = xbStyleNotSupported;
        xbStyle.prototype.setClipRight = xbStyleNotSupported;
        xbStyle.prototype.getClipBottom = xbStyleNotSupported;
        xbStyle.prototype.setClipBottom = xbStyleNotSupported;
        xbStyle.prototype.getClipLeft = xbStyleNotSupported;
        xbStyle.prototype.setClipLeft = xbStyleNotSupported;
        xbStyle.prototype.getClipWidth = xbStyleNotSupported;
        xbStyle.prototype.setClipWidth = xbStyleNotSupported;
        xbStyle.prototype.getClipHeight = xbStyleNotSupported;
        xbStyle.prototype.setClipHeight = xbStyleNotSupported;
        xbStyle.prototype.getLeft = xbStyleNotSupported;
        xbStyle.prototype.setLeft = xbStyleNotSupported;
        xbStyle.prototype.getTop = xbStyleNotSupported;
        xbStyle.prototype.setTop = xbStyleNotSupported;
        xbStyle.prototype.getVisibility = xbStyleNotSupported;
        xbStyle.prototype.setVisibility = xbStyleNotSupported;
        xbStyle.prototype.getzIndex = xbStyleNotSupported;
        xbStyle.prototype.setzIndex = xbStyleNotSupported;
        xbStyle.prototype.getHeight = xbStyleNotSupported;
        xbStyle.prototype.setHeight = xbStyleNotSupported;
        xbStyle.prototype.getWidth = xbStyleNotSupported;
        xbStyle.prototype.setWidth = xbStyleNotSupported;
        xbStyle.prototype.getBackgroundColor = xbStyleNotSupported;
        xbStyle.prototype.setBackgroundColor = xbStyleNotSupported;
        xbStyle.prototype.getColor = xbStyleNotSupported;
        xbStyle.prototype.setColor = xbStyleNotSupported;
        xbStyle.prototype.setInnerHTML = xbStyleNotSupported;
        xbStyle.prototype.getBorderTopWidth = xbStyleNotSupported;
        xbStyle.prototype.getBorderRightWidth = xbStyleNotSupported;
        xbStyle.prototype.getBorderBottomWidth = xbStyleNotSupported;
        xbStyle.prototype.getBorderLeftWidth = xbStyleNotSupported;
        xbStyle.prototype.getMarginLeft = xbStyleNotSupported;
        xbStyle.prototype.getMarginTop = xbStyleNotSupported;
        xbStyle.prototype.getMarginRight = xbStyleNotSupported;
        xbStyle.prototype.getMarginBottom = xbStyleNotSupported;
        xbStyle.prototype.getMarginLeft = xbStyleNotSupported;
        xbStyle.prototype.getPaddingTop = xbStyleNotSupported;
        xbStyle.prototype.getPaddingRight = xbStyleNotSupported;
        xbStyle.prototype.getPaddingBottom = xbStyleNotSupported;
        xbStyle.prototype.getPaddingLeft = xbStyleNotSupported;
        xbStyle.prototype.getClientWidth = xbStyleNotSupported;
        xbStyle.prototype.getClientHeight = xbStyleNotSupported;


        /* ********************** END xbStyle-not-supported.js ********************** */
    }

    /* ********************** END xbStyle.js ********************** */

    /* ********************** BEGIN ua.js ********************** */

    /* ***** BEGIN LICENSE BLOCK *****
    * Version: MPL 1.1/GPL 2.0/LGPL 2.1
    *
    * The contents of this file are subject to the Mozilla Public License Version
    * 1.1 (the "License"); you may not use this file except in compliance with
    * the License. You may obtain a copy of the License at
    * http://www.mozilla.org/MPL/
    *
    * Software distributed under the License is distributed on an "AS IS" basis,
    * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
    * for the specific language governing rights and limitations under the
    * License.
    *
    * The Original Code is Netscape code.
    *
    * The Initial Developer of the Original Code is
    * Netscape Corporation.
    * Portions created by the Initial Developer are Copyright (C) 2001
    * the Initial Developer. All Rights Reserved.
    *
    * Contributor(s): Bob Clary <bclary@netscape.com>
    *
    * ***** END LICENSE BLOCK ***** */

    function xbDetectBrowser() {
        var oldOnError = window.onerror;
        var element = null;

        window.onerror = null;

        // work around bug in xpcdom Mozilla 0.9.1
        window.saveNavigator = window.navigator;

        navigator.OS = '';
        navigator.version = parseFloat(navigator.appVersion);
        navigator.org = '';
        navigator.family = '';

        var platform;
        if (typeof (window.navigator.platform) != 'undefined') {
            platform = window.navigator.platform.toLowerCase();
            if (platform.indexOf('win') != -1)
                navigator.OS = 'win';
            else if (platform.indexOf('mac') != -1)
                navigator.OS = 'mac';
            else if (platform.indexOf('unix') != -1 || platform.indexOf('linux') != -1 || platform.indexOf('sun') != -1)
                navigator.OS = 'nix';
        }

        var i = 0;
        var ua = window.navigator.userAgent.toLowerCase();

        if (ua.indexOf('opera') != -1) {
            i = ua.indexOf('opera');
            navigator.family = 'opera';
            navigator.org = 'opera';
            navigator.version = parseFloat('0' + ua.substr(i + 6), 10);
        }
        else if ((i = ua.indexOf('msie')) != -1) {
            navigator.org = 'microsoft';
            navigator.version = parseFloat('0' + ua.substr(i + 5), 10);

            if (navigator.version < 4)
                navigator.family = 'ie3';
            else
                navigator.family = 'ie4'
        }
        else if (ua.indexOf('gecko') != -1) {
            navigator.family = 'gecko';
            var rvStart = ua.indexOf('rv:');
            var rvEnd = ua.indexOf(')', rvStart);
            var rv = ua.substring(rvStart + 3, rvEnd);
            var rvParts = rv.split('.');
            var rvValue = 0;
            var exp = 1;

            for (var i = 0; i < rvParts.length; i++) {
                var val = parseInt(rvParts[i]);
                rvValue += val / exp;
                exp *= 100;
            }
            navigator.version = rvValue;

            if (ua.indexOf('netscape') != -1)
                navigator.org = 'netscape';
            else if (ua.indexOf('compuserve') != -1)
                navigator.org = 'compuserve';
            else
                navigator.org = 'mozilla';
        }
        else if ((ua.indexOf('mozilla') != -1) && (ua.indexOf('spoofer') == -1) && (ua.indexOf('compatible') == -1) && (ua.indexOf('opera') == -1) && (ua.indexOf('webtv') == -1) && (ua.indexOf('hotjava') == -1)) {
            var is_major = parseFloat(navigator.appVersion);

            if (is_major < 4)
                navigator.version = is_major;
            else {
                i = ua.lastIndexOf('/')
                navigator.version = parseFloat('0' + ua.substr(i + 1), 10);
            }
            navigator.org = 'netscape';
            navigator.family = 'nn' + parseInt(navigator.appVersion);
        }
        else if ((i = ua.indexOf('aol')) != -1) {
            // aol
            navigator.family = 'aol';
            navigator.org = 'aol';
            navigator.version = parseFloat('0' + ua.substr(i + 4), 10);
        }
        else if ((i = ua.indexOf('hotjava')) != -1) {
            // hotjava
            navigator.family = 'hotjava';
            navigator.org = 'sun';
            navigator.version = parseFloat(navigator.appVersion);
        }

        window.onerror = oldOnError;
    }

    xbDetectBrowser();


    /* ********************** END ua.js ********************** */

    /* ********************** BEGIN fct_i.js ********************** */
    //FIXME: get legal to approve license
    /* ***** BEGIN LICENSE BLOCK *****
    * Version: Yardi ELUA
    *
    * The contents of this file are subject to the Yardi Systems, Inc.
    * End User License Agreement (the "License"); you may not use 
    * this file except in compliance with the License. You may obtain 
    * a copy of the License at http://FIXME
    *
    * All code is (c) 2004 Yardi Systems, Inc.  All Rights Reserved.
    *
    * ***** END LICENSE BLOCK ***** */


    /* **************************************************************************
    * FCTConstraints(x-layout, y-layout, x-values, y-values) - creates a new 
    *	FCTConstraints object with the specified layout styles for the x and y 
    *	layouts.  The optional values objects specify values required for the
    *	layout scheme specified as defined below.  The possible layout modes work
    *	as follows:
    *
    *	FCT.TABLE_LAYOUT - the FCT will be layed out similar to a normal
    *	HTML <table> element.  Namely, it will be expanded to fit its content.
    *	However, unlike the layout of a <table> element, FCT.TABLE_LAYOUT mode
    *	can be instructed to bound the final size of the table by a minimum and
    *	maximum pixel value via the x-values or y-values objects described below.
    *
    *	FCT.PIXEL_LAYOUT - This has the same effect as <table width="W"> or 
    *	<table style="width: Wpx;"> where W is a natural number.  Namely, this
    *	layout mode causes the FCT to be the specified size in pixels in the 
    *	specified direction.
    *
    *	FCT.PERCENTAGE_LAYOUT - **WARNING**: Because of bugs in IE, this mode can 
    *	only be used with the FCT_convert() function.  This mode causes the FCT to
    *	be sized like a <div> with a percentage length specified for the height or
    *	width.  In short, the FCT will be the specified percentage of the length of
    *	its containing element.  This mode bounds the resulting length by the maximum
    *	and minimum values specified in the x-values and y-values objects if any.
    *
    *	FCT.ROWCOL_LAYOUT - causes the FCT to display the specified number of rows
    *	or columns, the final size of the FCT being bounded by the maximum
    *	and minimum values specified in the x-values and y-values objects if any.
    *
    *	x-layout (REQUIRED):
    *		Type of horizontal layout for the associated FCT specified as one
    *		of FCT.TABLE_LAYOUT, FCT.PIXEL_LAYOUT, FCT.PERCENTAGE_LAYOUT, or 
    *		FCT.ROWCOL_LAYOUT.  The layout types work as specified above.
    *
    *	y-layout (REQUIRED):
    *		The vertical counterpart to x-layout.  Currently FCT.PERCENTAGE_LAYOUT
    *		is not supported by FCTConstraints.  Well, that's a lie... it is supported
    *		however it is explicitly forbidden in FCTConstraints_isValid() because its
    *		effects are not intuitive (see http://www.w3.org/TR/CSS21/visudet.html#propdef-height).
    *		IF YOU KNOW WHAT YOU ARE DOING, you can remove the exclusion in isValid()... YMMV.
    *
    *	x-values, y-values (OPTIONAL DEPENDING ON LAYOUT MODE):
    *		Anonymous objects with up to three meaningful attributes.  Whether these
    *		parameters are required or not is dependent on the layout mode.
    *		Also, the interpretation of their attributes may differ by mode, see below.
    *		In any case, the *-values object may be specified similar to the following:
    *		{ len: 22, max: 100, min: 10 }
    *		.len is the specified length, .max is the maximum bound, .min is the minimum 
    *		bound.  This syntax should feel vaguely familiar to anyone versed in C.
    *
    *	Requirement characteristics and interpretation of the values objects:
    *	
    *	FCT.TABLE_LAYOUT mode: values object OPTIONAL
    *		o min: OPTIONAL minimum length in pixels allowable, not specified or -1 is 
    *		  equivalent to no minimum length
    *		o max: OPTIONAL maximum length in pixels allowable, not specified or -1 is 
    *		  equivalent to no maximum length
    *
    *	FCT.PIXEL_LAYOUT mode: values object REQUIRED
    *		o len: REQUIRED desired length in pixels.
    *
    *	FCT.PERCENTAGE_LAYOUT mode: values object REQUIRED
    *		o len: REQUIRED desired length as a percentage (final pixel value will be 
    *		  bounded by min and max if they have been specified).  BEWARE: FCT does 
    *		  not directly support this layout style, it is just specified as an FCT 
    *		  class variable for ease of use with FCT_convert().
    *		o min: OPTIONAL minimum length in pixels allowable, not specified or -1 is 
    *		  equivalent to no minimum length
    *		o max: OPTIONAL maximum length in pixels allowable, not specified or -1 is 
    *		  equivalent to no maximum length
    *
    *	FCT.ROWCOL_LAYOUT mode: values object REQUIRED
    *		o len: REQUIRED desired number of rows or columns visible (including the 
    *		 header rows).  Final pixel value will be bounded by min and max (of course).
    *		o min: OPTIONAL minimum length in pixels allowable, not specified or -1 is 
    *		  equivalent to no minimum length
    *		o max: OPTIONAL maximum length in pixels allowable, not specified or -1 is 
    *		  equivalent to no maximum length
    *
    * ************************************************************************** */
    function FCTConstraints(xlayout, ylayout, xvals, yvals) {
        //initialize instance variables to default vals
        this.xlayout = FCT.INVALID_LAYOUT;
        this.xmin = -1;
        this.xmax = -1;
        this.xlen = -1;
        this.ylayout = FCT.INVALID_LAYOUT;
        this.ymin = -1;
        this.ymax = -1;
        this.ylen = -1;

        if (xlayout != null
		&& FCT.INVALID_LAYOUT < xlayout
		&& xlayout <= FCT.ROWCOL_LAYOUT) {
            this.xlayout = xlayout;

            if (xvals != null) {
                if (xvals.min >= -1)
                    this.xmin = xvals.min;
                if (xvals.max >= -1)
                    this.xmax = xvals.max;
                if (xlayout != FCT.TABLE_LAYOUT && xvals.len > 0)
                    this.xlen = xvals.len;
            }
        }

        if (ylayout != null
		&& FCT.INVALID_LAYOUT < ylayout
		&& ylayout <= FCT.ROWCOL_LAYOUT) {
            this.ylayout = ylayout;

            if (yvals != null) {
                if (yvals.min >= -1)
                    this.ymin = yvals.min;
                if (yvals.max >= -1)
                    this.ymax = yvals.max;
                if (ylayout != FCT.TABLE_LAYOUT && yvals.len > 0)
                    this.ylen = yvals.len;
            }
        }

        if (this.xmax < this.xmin) this.xmax = this.xmin;
        if (this.ymax < this.ymin) this.ymax = this.ymin;
    }

    /* **************************************************************************
    * FCTConstraints.isValid() - verifies that all the values fed to this
    * 	FCTConstraints object are valid for constructing an FCT.  If it returns
    *	true, we're ready to go.
    * ************************************************************************** */
    function FCTConstraints_isValid() {
        if (FCT.INVALID_LAYOUT < this.xlayout
		&& this.xlayout <= FCT.ROWCOL_LAYOUT
		&& FCT.INVALID_LAYOUT < this.ylayout
		&& this.ylayout <= FCT.ROWCOL_LAYOUT
		&& (this.xlayout == FCT.TABLE_LAYOUT || this.xlen > 0)
		&& (this.ylayout == FCT.TABLE_LAYOUT || this.ylen > 0)
		&& this.xmin >= -1 && this.ymin >= -1
		&& this.xmax >= this.xmin && this.ymax >= this.ymin
		&& this.ylayout != FCT.PERCENTAGE_LAYOUT) //percentage layouts only work as expected when certain caveats are met: see (http://www.w3.org/TR/CSS21/visudet.html#propdef-height)
            return true;
        else
            return false;
    }
    FCTConstraints.prototype.isValid = FCTConstraints_isValid;

    /* **************************************************************************
    * FCT(inst, constraints, debug) - instantiates an FCT object from components
    *   already on page.  Properly sizes all of the necessary parts.
    *
    *	inst - 'instance string' for the FCT table.  If my tableContainer had
    *		id='tableContainer_mine', my instance string would be '_mine'.
    *	constraints - FCTConstraints object specifying the horizontal and vertical
    *		layout modes for the FCT.
    *	debug - optional boolean value indicating whether or not debugging output
    *		should be generated.
    *   TODO: consolidate conversion functionality into FCT().
    * ************************************************************************** */
    function FCT(inst, constraints, debug) {
        var properties = [
			 { name: 'tc', idstr: 'tableContainer' }
			, { name: 'nwc', idstr: 'nwHeadingsContainer' }
			, { name: 'nc', idstr: 'nHeadingsContainer' }
			, { name: 'nec', idstr: 'neHeadingsContainer' }
			, { name: 'wc', idstr: 'wHeadingsContainer' }
			, { name: 'mc', idstr: 'mainContainer' }
			, { name: 'ec', idstr: 'eHeadingsContainer' }
			, { name: 'swc', idstr: 'swHeadingsContainer' }
			, { name: 'sc', idstr: 'sHeadingsContainer' }
			, { name: 'sec', idstr: 'seHeadingsContainer' }

			, { name: 'nwh', idstr: 'nwHeadings' }
			, { name: 'nh', idstr: 'nHeadings' }
			, { name: 'neh', idstr: 'neHeadings' }
			, { name: 'wh', idstr: 'wHeadings' }
			, { name: 'm', idstr: 'main' }
			, { name: 'eh', idstr: 'eHeadings' }
			, { name: 'swh', idstr: 'swHeadings' }
			, { name: 'sh', idstr: 'sHeadings' }
			, { name: 'seh', idstr: 'seHeadings' }


			, { name: 'nwt', idstr: 'nwHeadingsTable' }
			, { name: 'nt', idstr: 'nHeadingsTable' }
			, { name: 'net', idstr: 'neHeadingsTable' }
			, { name: 'wt', idstr: 'wHeadingsTable' }
			, { name: 'mt', idstr: 'mainTable' }
			, { name: 'et', idstr: 'eHeadingsTable' }
			, { name: 'swt', idstr: 'swHeadingsTable' }
			, { name: 'st', idstr: 'sHeadingsTable' }
			, { name: 'set', idstr: 'seHeadingsTable' }
		];

        if (constraints == null
		|| !constraints.isValid()
		|| constraints.xlayout == FCT.PERCENTAGE_LAYOUT
		|| constraints.ylayout == FCT.PERCENTAGE_LAYOUT) throw "FCT(): constraints is not a valid FCTConstraints object";

        this.debug = debug != null ? debug : false;

        for (var i = 0; i < properties.length; i++) {
            eval('this.' + properties[i].name + ' = document.getElementById("'
				+ properties[i].idstr + '" + inst);');

            if (eval('this.' + properties[i].name) == null) {
                var s = "FCT(): Property " + properties[i].idstr + " resulted in null property value!";
                if (this.debug) alert(s);
                throw (s);
            }

            eval('this.' + properties[i].name + 'Style = new xbStyle(this.' + properties[i].name + ');');
        }

        this.constraints = constraints;

    }

    /* ******************************************************* *
    * FCT_handleScroll() - scrolling handler.  Scrolls north,
    *	south, east, and west containers when the mainContainer
    *	receives a scroll event.
    * ******************************************************* */
    function FCT_handleScroll() {
        this.nh.style.left = -this.mc.scrollLeft;
        this.sh.style.left = -this.mc.scrollLeft;
        this.wh.style.top = -this.mc.scrollTop;
        this.eh.style.top = -this.mc.scrollTop;
    }
    FCT.prototype.handleScroll = FCT_handleScroll;

    /* ******************************************************* *
    * FCT_handleEvent(evt) - Attempt at a slightly more generic
    *	event handler... IE doesn't support it correctly.
    * ******************************************************* */
    function FCT_handleEvent(evt) {
        if (evt.type == 'scroll' && evt.target == this.mc)
            this.handleScroll();
    }
    FCT.prototype.handleEvent = FCT_handleEvent;

    /* **************************************************************************
    * FCT_resizeCells() - resizes the cells in the various tables of the FCT
    *	such that all rows and columns line up correctly.  This function uses
    *	a considerable number of local variables in the interest of reducing
    *	the overall number of lines of code.  More importantly, this function
    *	has been optimized to accomplish its task with a maximum of 6C + 6R cell
    *	visits where C is the number of frozen columns in the FCT and R is the 
    *	number of frozen rows.
    *
    *	It works like this.  Local variables are initialized.  FCT_calcMaxSizes()
    *	visits each row and column of each of the 9 possible tables once to 
    *	determine the appropriate maximum sizes.  Then, FCT_resizeTable() visits
    *	each row and column of each of the 9 possible tables once to resize the
    *	first cell in each to the appropriate dimension.
    *
    *	This function assumes the rectangular nature of all tables examined.
    * ************************************************************************** */
    function FCT_resizeCells() {
        var nwt = this.nwt, nt = this.nt, net = this.net;
        var wt = this.wt, ct = this.mt, et = this.et;
        var swt = this.swt, st = this.st, set = this.set;
        var i, j, colwidth, rowheight;
        var maxH, maxW; 		//maxH = maxRowHeight, maxW = maxRowWidth
        var nrows, ncols; 		//the number of rows and cols we're dealing with
        var rows, cols;
        var nwtRows = FCT_numRows(nwt);
        var nwtCols = FCT_numCols(nwt);
        var ntRows = FCT_numRows(nt);
        var ntCols = FCT_numCols(nt);
        var netRows = FCT_numRows(net);
        var netCols = FCT_numCols(net);
        var wtRows = FCT_numRows(wt);
        var wtCols = FCT_numCols(wt);
        var ctRows = FCT_numRows(ct);
        var ctCols = FCT_numCols(ct);
        var etRows = FCT_numRows(et);
        var etCols = FCT_numCols(et);
        var swtRows = FCT_numRows(swt);
        var swtCols = FCT_numCols(swt);
        var stRows = FCT_numRows(st);
        var stCols = FCT_numCols(st);
        var setRows = FCT_numRows(set);
        var setCols = FCT_numCols(set);

        if (this.debug) {
            alert("nwc.style.display == " + this.nwc.style.display);
            alert("nc.style.display == " + this.nc.style.display);
            alert("wc.style.display == " + this.wc.style.display);
            alert("mc.style.display == " + this.mc.style.display);
            alert("nwc == " + nwc);
        }

        //initialize nrows and ncolumns
        nrows = nt.rows.length + ct.rows.length + st.rows.length;
        ncols = (wt.rows.length > 0 ? wt.rows[0].cells.length : 0)
			+ ct.rows[0].cells.length
			+ (et.rows.length > 0 ? et.rows[0].cells.length : 0);

        //initialize maximum arrays
        maxH = new Array(nrows);
        for (i = 0; i < nrows; ++i)
            maxH[i] = -1;

        maxW = new Array(ncols);
        for (i = 0; i < ncols; ++i)
            maxW[i] = -1;

        //populate maximum arrays by table (visiting each cell once)
        FCT_calcMaxSizes(nwt, maxH, maxW, 0, 0);
        FCT_calcMaxSizes(nt, maxH, maxW, 0, nwtCols);
        FCT_calcMaxSizes(net, maxH, maxW, 0, nwtCols + ntCols);

        FCT_calcMaxSizes(wt, maxH, maxW, nwtRows, 0);
        FCT_calcMaxSizes(ct, maxH, maxW, ntRows, wtCols);
        FCT_calcMaxSizes(et, maxH, maxW, netRows, wtCols + ctCols);

        FCT_calcMaxSizes(swt, maxH, maxW, nwtRows + wtRows, 0);
        FCT_calcMaxSizes(st, maxH, maxW, ntRows + ctRows, swtCols);
        FCT_calcMaxSizes(set, maxH, maxW, netRows + etRows, swtCols + stCols);

        //now that we have the max lengths resize each cell... resize them with a second visit
        FCT_resizeTable(nwt, maxH, maxW, 0, 0);
        FCT_resizeTable(nt, maxH, maxW, 0, nwtCols);
        FCT_resizeTable(net, maxH, maxW, 0, nwtCols + ntCols);

        FCT_resizeTable(wt, maxH, maxW, nwtRows, 0);
        FCT_resizeTable(ct, maxH, maxW, ntRows, wtCols);
        FCT_resizeTable(et, maxH, maxW, netRows, wtCols + ctCols);

        FCT_resizeTable(swt, maxH, maxW, nwtRows + wtRows, 0);
        FCT_resizeTable(st, maxH, maxW, ntRows + ctRows, swtCols);
        FCT_resizeTable(set, maxH, maxW, netRows + etRows, swtCols + stCols);
    }
    FCT.prototype.resizeCells = FCT_resizeCells;

    /* **************************************************************************
    * FCT_calcMaxSizes(t, hary, wary, hoff, woff) - helper function to 
    *	FCT_resizeCells().  Visits every row and column of table t entering the
    *	maximum of the row/columns size and the size specified in the hary/wary
    *	array at offset hoff/woff into hary/wary at the same location.
    *
    *	This function assumes the rectangular nature of all tables examined.
    * ************************************************************************** */
    function FCT_calcMaxSizes(t, hary, wary, hoff, woff) {
        if (t == null || hoff < 0 || woff < 0) return false;
        if (!hary) hary = new Array;
        if (!wary) wary = new Array;

        var r = FCT_numRows(t);
        var c = FCT_numCols(t);

        //if we have at lest one column, begin checking
        if (c > 0)
            for (var i = 0; i < r; ++i) //find the max-height of every row
            hary[i + hoff] = FCT_max(hary[i + hoff], t.rows[i].cells[0].clientHeight);
        else
            return false;

        for (var j = 0; j < c; ++j) //find the max width of every col
            wary[j + woff] = FCT_max(wary[j + woff], FCT_getWidth(t.rows[0].cells[j].firstChild));

        return true;
    }

    /* **************************************************************************
    * FCT_resizeTable(t, hary, wary, hoff, woff) - helper function to 
    *	FCT_resizeCells().  Visits every row/column of table t setting the first
    *	cell's height/width to the value found in hary/wary at the offset hoff/woff.
    *
    *	This function assumes the rectangular nature of all tables examined.
    *	Also assumes that the first child is a <div> wrapping all other content
    *	this is ensured by FCT_convert().
    * ************************************************************************** */
    function FCT_resizeTable(t, hary, wary, hoff, woff) {
        if (t == null || hary == null || wary == null
			|| hoff < 0 || woff < 0
			|| hoff >= hary.length || woff >= wary.length) return false;

        var r = FCT_numRows(t);
        var c = FCT_numCols(t);

        if (c <= 0) return false; //no use in resizing an empty table

        for (var j = 0; j < c; ++j)
            FCT_setWidth(t.rows[0].cells[j].firstChild, wary[j + woff]);

        for (var i = 0; i < r; ++i)
            FCT_setHeight(t.rows[i].cells[0].firstChild, hary[i + hoff]);

        return true;
    }

    /* **************************************************************************
    * FCT_getWidth(o) - width determining wrapper function.  Equivalent to:
    *	new xbStyle(o).getWidth() iff xbStyle() implemented a caching object store
    *	that would onlly allow one xbStyle object to be created per object.  Since
    *	it doesn't, we cache it ourselves.
    * ************************************************************************** */
    function FCT_getWidth(o) {
        if (!o.FCTso) o.FCTso = new xbStyle(o);

        return o.FCTso.getWidth();
    }

    /* **************************************************************************
    * FCT_setWidth(o, w) - width setting wrapper function.  Equivalent to:
    *	new xbStyle(o).setWidth(w) iff xbStyle() implemented a caching object store
    *	that would onlly allow one xbStyle object to be created per object.  Since
    *	it doesn't, we cache it ourselves.
    * ************************************************************************** */
    function FCT_setWidth(o, w) {
        if (!o.FCTso) o.FCTso = new xbStyle(o);

        return o.FCTso.setWidth(w);
    }

    /* **************************************************************************
    * FCT_getHeight(o) - height determining wrapper function.  Equivalent to:
    *	new xbStyle(o).getHeight() iff xbStyle() implemented a caching object store
    *	that would onlly allow one xbStyle object to be created per object.  Since
    *	it doesn't, we cache it ourselves.
    * ************************************************************************** */
    function FCT_getHeight(o) {
        if (!o.FCTso) o.FCTso = new xbStyle(o);

        return o.FCTso.getHeight();
    }

    /* **************************************************************************
    * FCT_setHeight(o, h) - height setting wrapper function.  Equivalent to:
    *	new xbStyle(o).setHeight(h) iff xbStyle() implemented a caching object store
    *	that would onlly allow one xbStyle object to be created per object.  Since
    *	it doesn't, we cache it ourselves.
    * ************************************************************************** */
    function FCT_setHeight(o, h) {
        if (!o.FCTso) o.FCTso = new xbStyle(o);

        return o.FCTso.setHeight(h);
    }

    /* **************************************************************************
    * FCT_numRows(t) - returns the number of rows in t.
    *	Because IE doesn't support DOM inheritance, we have to implement this
    *	as a function instead of as a prototype method of HTMLTableElement.
    *	DOM 2 support my foot!
    * ************************************************************************** */
    function FCT_numRows(t) {
        if (t != null) return t.rows.length;
        else return 0;
    }

    /* **************************************************************************
    * FCT_numCols(t) - returns the number of cols in t, assuming that all rows
    *	have the same number of columns.  Basically, this is a convenience function
    *	to figure out the number of columns in the first row iff there is such a row.
    *	If there is a possibility of there being a different number of cols in any
    *	given row, take this function to mean strictly "numColsInFirstRow()".
    *
    *	Because IE doesn't support DOM inheritance, we have to implement this
    *	as a function instead of as a prototype method of HTMLTableElement.
    *	DOM 2 support my foot!
    * ************************************************************************** */
    function FCT_numCols(t) {
        if (t != null && t.rows.length > 0) return t.rows[0].cells.length;
        else return 0;
    }

    /* **************************************************************************
    * FCT_max(...) - Takes any number of arguments.  Returns the maximum.
    * ************************************************************************** */
    function FCT_max() {
        if (arguments.length == 0) return 0;

        var maximum = arguments[0];
        for (var i = 1; i < arguments.length; i++)
            if (arguments[i] > maximum) maximum = arguments[i];

        return maximum;
    }
    FCT.prototype.max = FCT_max;

    /* **************************************************************************
    * FCT_min(...) - Takes any number of arguments.  Returns the minimum.
    * ************************************************************************** */
    function FCT_min() {
        if (arguments.length == 0) return 0;

        var minimum = arguments[0];
        for (var i = 1; i < arguments.length; i++)
            if (arguments[i] < minimum) minimum = arguments[i];

        return minimum;
    }
    FCT.prototype.min = FCT_min;

    /* **************************************************************************
    * FCT_checkColumnWidths(t1, t2) - legacy function.  Still around because it
    *	is referenced by the debugging code and might prove useful.  Ensures that
    *	the corresponding columns between t1 and t2 are the same width.
    * ************************************************************************** */
    function FCT_checkColumnWidths(t1, t2) {
        var width1, width2;

        if (!this.debug) return;

        for (var j = 0; j < t1.rows.item(0).cells.length; j++) {
            if ((width1 = FCT_getWidth(t1.rows.item(0).cells.item(j))) != (width2 = FCT_getWidth(t2.rows.item(0).cells.item(j)))) {
                alert("t1[0][" + j + "].width = " + width1 + "\nt2[0][" + j + "].width = " + width2)
                return;
            }
        }
    }
    FCT.prototype.checkColumnWidths = FCT_checkColumnWidths;

    /* **************************************************************************
    * FCT_init() - called onLoad as an instance method.  Performs all the real 
    *	work of getting everything in the FCT lined up properly.
    * ************************************************************************** */
    function FCT_init() {
        var tableContainer = this.tc;
        var tableContainerStyle = this.tcStyle;

        var mainContainer = this.mc;
        var mainContainerStyle = this.mcStyle;
        var mainTable = this.mt;
        var mainTableStyle = this.mtStyle;

        var nwHeadingsContainer = this.nwc;
        var nwHeadingsContainerStyle = this.nwcStyle;
        var nwHeadingsTable = this.nwt;
        var nwHeadingsTableStyle = this.nwtStyle;

        var nHeadingsContainer = this.nc;
        var nHeadingsContainerStyle = this.ncStyle;
        var nHeadingsTable = this.nt;
        var nHeadingsTableStyle = this.ntStyle;

        var wHeadingsContainer = this.wc;
        var wHeadingsContainerStyle = this.wcStyle;
        var wHeadingsTable = this.wt;
        var wHeadingsTableStyle = this.wtStyle;

        //make all the table rows/cols the correct sizes
        this.resizeCells();

        //Ensure wHeadingsContainer, nwHeadingsContainer, and swHeadingsContainer are wide enough to display frozen cells
        var maxwidth = FCT_max(wHeadingsTableStyle.getWidth(), nwHeadingsTableStyle.getWidth(), this.swtStyle.getWidth());
        wHeadingsContainerStyle.setWidth(maxwidth);
        nwHeadingsContainerStyle.setWidth(maxwidth);
        this.swcStyle.setWidth(maxwidth);

        //Ensure eHeadingsContainer, neHeadingsContainer, and seHeadingsContainer are wide enough to display frozen cells
        maxwidth = FCT_max(this.etStyle.getWidth(), this.netStyle.getWidth(), this.setStyle.getWidth());
        this.ecStyle.setWidth(maxwidth);
        this.necStyle.setWidth(maxwidth);
        this.secStyle.setWidth(maxwidth);

        //Ensure nHeadingsContainer, nwHeadingsContainer, and neHeadingsContainer are high enough to display frozen cells
        var maxheight = this.max(nHeadingsTableStyle.getHeight(), nwHeadingsTableStyle.getHeight(), this.netStyle.getHeight());
        nHeadingsContainerStyle.setHeight(maxheight);
        nwHeadingsContainerStyle.setHeight(maxheight);
        this.necStyle.setHeight(maxheight);

        //Ensure sHeadingsContainer, swHeadingsContainer, and seHeadingsContainer are high enough to display frozen cells
        maxheight = this.max(this.swtStyle.getHeight(), this.stStyle.getHeight(), this.setStyle.getHeight());
        this.swcStyle.setHeight(maxheight);
        this.scStyle.setHeight(maxheight);
        this.secStyle.setHeight(maxheight);


        //determine and set height and width of mainContainer and tableContainer
        var totalHeight, totalWidth;
        var totalHeightAdjusted = false;
        var totalWidthAdjusted = false;

        //FCT_resizeUnfrozenComponents() is a function for two reasons:
        //  1) So that it can be profiled.
        //  2) So that we don't have to duplicate the code when we have to
        //     call it a second time to get thing to work correctly in IE.
        function FCT_resizeUnfrozenComponents() {
            totalHeightAdjusted = false;
            totalWidthAdjusted = false;

            //Determine the total size of the extra, unasked for, 3px margins
            //that IE quirks mode will place between our tables horizontally.
            var ieOffset = 0;
            if (wHeadingsContainer.style.display != 'none') ieOffset += 3;
            if (this.ec.style.display != 'none') ieOffset += 3;


            if (this.constraints.ylayout == FCT.PIXEL_LAYOUT)
                totalHeight = this.constraints.ylen;
            else if (this.constraints.ylayout == FCT.ROWCOL_LAYOUT
				&& this.constraints.ylen <= nHeadingsTable.rows.length) //the last row to show is in nHeadingsTable
                totalHeight = nHeadingsContainer.offsetTop
            //+ nHeadings.offsetTop
						+ nHeadingsTable.offsetTop
						+ nHeadingsTable.rows[this.constraints.ylen - 1].cells[0].offsetTop
						+ nHeadingsTable.rows[this.constraints.ylen - 1].cells[0].offsetHeight
						+ FCT.SCROLLBAR_WIDTH;
            else if (this.constraints.ylayout == FCT.ROWCOL_LAYOUT
				&& this.constraints.ylen - this.nt.rows.length <= this.st.rows.length) //last row is in sHeadingsTable
                totalHeight = this.nc.offsetTop
						+ this.nc.offsetHeight
            // + this.sc.offsetTop -- this would end up showing the whole table
						+ this.sh.offsetTop
						+ this.st.offsetTop
						+ this.st.rows[this.constraints.ylen - this.nt.rows.length - 1].cells[0].offsetTop
						+ this.st.rows[this.constraints.ylen - this.nt.rows.length - 1].cells[0].offsetHeight
						+ FCT.SCROLLBAR_WIDTH;
            else if (this.constraints.ylayout == FCT.ROWCOL_LAYOUT
				&& this.constraints.ylen - nHeadingsTable.rows.length - this.st.rows.length <= mainTable.rows.length)  //mainTable has enough rows
                totalHeight = mainContainer.offsetTop
            //+ main.offsetTop
						+ mainTable.offsetTop
						+ mainTable.rows[this.constraints.ylen - nHeadingsTable.rows.length - this.st.rows.length - 1].cells[0].offsetTop
						+ mainTable.rows[this.constraints.ylen - nHeadingsTable.rows.length - this.st.rows.length - 1].cells[0].offsetHeight
            // + this.sc.offsetTop -- this would end up showing the whole table
						+ this.sc.offsetHeight
						+ FCT.SCROLLBAR_WIDTH;
            else { // FCT.TABLE_LAYOUT or FCT.ROWCOL_LAYOUT but not enough rows, size to fit all content
                //currently ignores margins/padding as they should be 0px.
                totalHeight = this.nc.offsetTop
					+ this.nt.offsetHeight
					+ this.mt.offsetHeight
					+ this.st.offsetHeight;

                if (this.constraints.xlayout != FCT.TABLE_LAYOUT || this.constraints.ylayout != FCT.TABLE_LAYOUT)
                    totalHeight += FCT.SCROLLBAR_WIDTH;          //prevent unwanted scrollbars
            }

            if (this.constraints.ymin >= 0 && totalHeight < this.constraints.ymin) {
                totalHeight = this.constraints.ymin;
                totalHeightAdjusted = true;
            }

            if (this.constraints.ymax >= 0 && totalHeight > this.constraints.ymax) {
                totalHeight = this.constraints.ymax;
                totalHeightAdjusted = true;
            }

            var wHeadingsCols = 0;
            var mainCols = 0;
            var eHeadingsCols = 0;
            if (wHeadingsTable.rows.length > 0) wHeadingsCols = wHeadingsTable.rows[0].cells.length;
            if (mainTable.rows.length > 0) mainCols = mainTable.rows[0].cells.length;
            if (this.et.rows.length > 0) eHeadingsCols = this.et.rows[0].cells.length;

            if (this.constraints.xlayout == FCT.PIXEL_LAYOUT)
                totalWidth = this.constraints.xlen;
            else if (this.constraints.xlayout == FCT.ROWCOL_LAYOUT
				&& this.constraints.xlen <= wHeadingsCols)  //the last col to show is in wHeadingsTable
                totalWidth = wHeadingsContainer.offsetLeft
            //+ wHeadings.offsetLeft 
					+ wHeadingsTable.offsetLeft
					+ wHeadingsTable.rows[0].cells[this.constraints.xlen - 1].offsetLeft
					+ wHeadingsTable.rows[0].cells[this.constraints.xlen - 1].offsetWidth;
            else if (this.constraints.xlayout == FCT.ROWCOL_LAYOUT
				&& this.constraints.xlen - wHeadingsCols <= eHeadingsCols) //last col to show is in eHeadingsTable

                totalWidth = this.wc.offsetLeft
					+ this.wc.offsetWidth
            //+ this.ec.offsetLeft -- this would end up showing the whole table
					+ this.eh.offsetLeft
					+ this.et.offsetLeft
					+ this.et.rows[0].cells[this.constraints.xlen - wHeadingsCols - 1].offsetLeft
					+ this.et.rows[0].cells[this.constraints.xlen - wHeadingsCols - 1].offsetWidth
					+ FCT.SCROLLBAR_WIDTH;
            else if (this.constraints.xlayout == FCT.ROWCOL_LAYOUT
				&& this.constraints.xlen - wHeadingsCols - eHeadingsCols <= mainCols)  //mainTable has enough cols

                totalWidth = mainContainer.offsetLeft
            //+ main.offsetLeft 
					+ mainTable.offsetLeft
					+ mainTable.rows[0].cells[this.constraints.xlen - wHeadingsCols - eHeadingsCols - 1].offsetLeft
					+ mainTable.rows[0].cells[this.constraints.xlen - wHeadingsCols - eHeadingsCols - 1].offsetWidth
            //+ this.ec.offsetLeft -- this would end up showing the whole table
					+ this.ec.offsetWidth
					+ FCT.SCROLLBAR_WIDTH;
            else // FCT.TABLE_LAYOUT or FCT.ROWCOL_LAYOUT but not enough cols, size to fit all content
            {
                //currently ignores margins/padding as they should be 0px.
                totalWidth = this.wc.offsetLeft
					+ this.wt.offsetWidth
					+ this.et.offsetWidth
					+ this.mt.offsetWidth
					+ ieOffset; // to keep mc from scrolling

                if (this.constraints.xlayout != FCT.TABLE_LAYOUT || this.constraints.ylayout != FCT.TABLE_LAYOUT) {
                    totalWidth += FCT.SCROLLBAR_WIDTH;          //prevent unwanted scrollbars
                    if (navigator.family == 'ie4' && navigator.version < 9) totalWidth += mainCols; //voyagerX fix for Internet Explorer					
                }
            }



            if (this.constraints.xmin >= 0 && totalWidth < this.constraints.xmin) {
                totalWidth = this.constraints.xmin;
                totalWidthAdjusted = true;
            }

            if (this.constraints.xmax >= 0 && totalWidth > this.constraints.xmax) {
                totalWidth = this.constraints.xmax;
                totalWidthAdjusted = true;
            }

            if (this.constraints.xlayout == FCT.TABLE_LAYOUT
			&& this.constraints.ylayout == FCT.TABLE_LAYOUT
			&& !totalHeightAdjusted
			&& !totalWidthAdjusted) //main container will be big enough to hold content, ensure no scrollbars
                mainContainer.style.overflow = 'hidden';

            //WE NOW HAVE totalWidth and totalHeight set to the correct values.  Size accordingly.
            //FIXME: what about margins?
            mainContainerStyle.setHeight(totalHeight - nHeadingsContainerStyle.getHeight() - this.scStyle.getHeight());
            mainContainerStyle.setWidth(totalWidth - wHeadingsContainerStyle.getWidth() - this.ecStyle.getWidth() - ieOffset);

            tableContainerStyle.setHeight(totalHeight);
            tableContainerStyle.setWidth(totalWidth);

            //initialize nHeadingsContainer.width to mainContainer.width... sHeadingsContainer too
            nHeadingsContainerStyle.setWidth(mainContainerStyle.getWidth());
            this.scStyle.setWidth(this.mcStyle.getWidth());

            //initialize wHeadingsContainer.height to mainContainer.height... eHeadingsContainer too
            wHeadingsContainerStyle.setHeight(mainContainerStyle.getHeight());
            this.ecStyle.setHeight(this.mcStyle.getHeight());
        }
        FCT.prototype.resizeUnfrozenComponents = FCT_resizeUnfrozenComponents;

        this.resizeUnfrozenComponents();

        //FIXME: TOTAL KLUGE Duplicate the above lines in order to work
        // around IE's problems calculating the correct width until all of
        // the things have been sized.  Basically, we calculate totalWidth and
        // totalHeight for a ROWCOL_LAYOUT.  We need to know what size things will
        // be before we size them, but after we size them, the same calculations now
        // produce a different result... perhaps it would be better to keep resizing until
        // they converge or something.
        this.resizeUnfrozenComponents();

        if (this.debug) {
            mainContainer.style.border = "1px dashed green";
            nwHeadingsContainer.style.border = "1px solid teal";
            nHeadingsContainer.style.border = "1px dashed blue";
            wHeadingsContainer.style.border = "1px dashed red";

            alert("tableContainerStyle.getWidth() = " + tableContainerStyle.getWidth() +
				"\nwHeadingsContainerStyle.getWidth() = " + wHeadingsContainerStyle.getWidth() +
				"\nmainContainerStyle.getWidth() = " + mainContainerStyle.getWidth()
			);
            alert("tableContainerStyle.getHeight() = " + tableContainerStyle.getHeight() +
				"\nnHeadingsContainerStyle.getHeight() = " + nHeadingsContainerStyle.getHeight() +
				"\nmainContainerStyle.getHeight() = " + mainContainerStyle.getHeight()
			);

            this.checkColumnWidths(wHeadingsTable, nwHeadingsTable);
        }

        FCT_correctValign();

        /* ****************************************************************************************
        * If we're dealing with an IE version, when using a %-based layout
        * the main and nHeadings tables wouldn't line up properly unless we fired 
        * off an alert() at one specific line... very strange stuff.  Apparently this is 
        * related to IE 6's quirks mode.  It goes away in standards compliant 
        * mode, but we can't trigger standards compliant mode without messing up 
        * even more important Voyager behavior. (BAD SITUATION)
        *
        * If the navigator family is determined to be 'ie4' by ua.js (we do an extra sanity check
        * by checking document.all), we set the wHeadingsContainer's display to 'block'. It's
        * already a block element by the standard's definition, but apparently IE doesn't catch
        * on.  By explicitly setting it, it pushes the mainContainer over to the correct position.
        *
        * This workaround was inspired by Aaron Boodman's IE CSS workaround for A List Apart
        * (see: http://diveintomark.org/archives/2002/09/03/ie_6_workaround_discovered ).
        * ****************************************************************************************
        */
        if (navigator.family == 'ie4' && document.all) wHeadingsContainer.style.display = 'block';

    }
    FCT.prototype.init = FCT_init;

    /* **************************************************************************
    * FCT_convert(tid, fny, fnx, constraints, fsy, fsx) - converts a standard
    *	HTML <table> into an FCT.  Quite possibly the most useful of all available
    *	FCT methods.  Mind the caveats: 1) the <table> must have the same number of
    *	columns in each row, 2) <thead>'s, <tfoot>'s, and multiple <tbody>'s have not
    *	been tested and probably won't work.  On to the parameters:
    *
    *	tid - REQUIRED string id of the table to convert
    *	fny - REQUIRED # of frozen rows on top (no frozen north rows -> fny = 0)
    *	fnx - REQUIRED # of frozen cols on left (no frozen west cols -> fnx = 0)
    *	constraints - OPTIONAL FCTConstraints object specifying x and y layout modes
    *	fsy - OPTIONAL # of frozen rows on bottom (no frozen south rows -> fsy = 0)
    *		By default fsy is set to 0.
    *	fsx - OPTIONAL # of frozen cols on right (no frozen east cols -> fsx = 0)
    *		By default fsx is set to 0.
    *
    *	FCT_convert() takes your original table, attempts to deduce the correct
    *	layout mode based on the html (unless a FCTConstraints object is specified).
    *	It splits apart the <table> into the necessary DOM structure for the FCT() object
    *	to interact with.  It then instantiates an FCT object and calls the FCT.init()
    *	method on it to do the sizing.  With all current optimizations, the converstion
    *	and sizing increases page render time by 460% on average.  No need to fret though,
    *	unless the page is exceptionally large, the increased render time shouldn't be a
    *	problem.  Since the overhead of converting a regular <table> is so minimal in
    *	terms of programmer time (see the top of this file or the HOWTO) it should be
    *	easy to test your solution with and without FCT and decide whether or not it
    *	suits your purposes.
    * ************************************************************************** */
    function FCT_convert(tid, fny, fnx, constraints, fsy, fsx) {
        var tableWidth, tableHeight;

        if (typeof (FCT.instances) == 'undefined') FCT.instances = {}; // used to hold all created FCT objs
        var myInst = tid;

        if (tid == null) { //tid is REQUIRED
            if (DEBUG) alert("tid: " + tid + " is not present in the document!");
            return false;
        }

        //get a reference to the original table
        var table = document.getElementById(tid);
        if (table == null) return false;
        var tableStyle = new xbStyle(table);

        //verify that the frozen values are in the appropriate range
        if (fny < 0 || fnx < 0 || fny > table.rows.length - 1 || fnx > table.rows.item(0).cells.length - 1) {
            if (DEBUG) alert("NW unfrozen coordinate (" + fny + "," + fnx + ") is out of range!");
            return false;
        }

        if (fsy == null || fsy <= 0) // null or <= 0 -> not frozen in the south
            fsy = table.rows.length - 1; // init to last row of the table
        else if (fsy <= table.rows.length - fny) // fsy is between 1 and # of rows left after freezing north
            fsy = table.rows.length - fsy - 1; // convert fsy to index of last unfrozen row
        else // complain about error
        {
            if (DEBUG) alert("fsy out of range!  fsy specifies more frozen rows than are available!");
            return false;
        }

        if (fsx == null || fsx <= 0) // null or <= 0 -> not frozen in the east
            fsx = table.rows[0].cells.length - 1; // init to last column of the table
        else if (fsx <= table.rows[0].cells.length - fnx) // fsx is between 1 and the # of cols left after freezing west
            fsx = table.rows[0].cells.length - fsx - 1; // convert fsx to index of last unfrozen col
        else // complain about error
        {
            if (DEBUG) alert("fsx out of range!  fsx specifies more frozen columns than are available!");
            return false;
        }

        if (constraints == null) { //If they called without constraints, try to do the RightThing(tm)
            var xlayout = FCT.INVALID_LAYOUT;
            var ylayout = FCT.INVALID_LAYOUT;
            var xvals = null;
            var yvals = null;

            //Determine appropriate xlayout.  xbStyle is smart enough to report pixel based widths
            //for elements that have been sized with a percentage value.  We want to support using
            //percentage values in the hopes that we can get <table>-like behavior.  Thus:
            tableWidth = tableStyle.getEffectiveValue('width'); 		   //get user specified value
            if (tableWidth == '' || tableWidth == 'auto') xlayout = FCT.TABLE_LAYOUT;   //go <table> style
            else if (tableWidth.indexOf('%') == -1) {			 	   //% not specified, get pixel value
                xlayout = FCT.PIXEL_LAYOUT;
                xvals = { len: tableStyle.getWidth() };
            } else {					   			   //% specified, defer actual work till later
                xlayout = FCT.PERCENTAGE_LAYOUT;
                xvals = { len: parseInt(tableWidth) };
            }

            //Do the same rigamarole for the tableHeight
            tableHeight = tableStyle.getEffectiveValue('height'); 	   //get user specified val if any
            if (tableHeight == '' || tableHeight == 'auto') ylayout = FCT.TABLE_LAYOUT; //have init() size automatically
            else if (tableHeight.indexOf('%') == -1) {				   //% not specified, get pixel value
                ylayout = FCT.PIXEL_LAYOUT;
                yvals = { len: tableStyle.getHeight() };
            } else {					   			   //% specified, forget it, use TABLE_LAYOUT since we aren't supporting a percent height right now
                ylayout = FCT.TABLE_LAYOUT;
            }

            constraints = new FCTConstraints(xlayout, ylayout, xvals, yvals);
        }

        if (DEBUG) alert("constraints.xlayout = " + FCT.layoutAsString(constraints.xlayout) + "\n"
			+ "\tmin: " + constraints.xmin + "\n"
			+ "\tmax: " + constraints.xmax + "\n"
			+ "\tlen: " + constraints.xlen + "\n"
			+ "constraints.ylayout = " + FCT.layoutAsString(constraints.ylayout) + "\n"
			+ "\tmin: " + constraints.ymin + "\n"
			+ "\tmax: " + constraints.ymax + "\n"
			+ "\tlen: " + constraints.ylen + "\n");



        if (!constraints.isValid()) { //we really should have valid constraints by now
            if (DEBUG) alert("Invalid Constraints!");
            return false;
        }


        //Build all of our new fabulous replacement objects
        var tableContainer = FCT_newEmptyDiv();
        tableContainer.id = 'tableContainer_' + tid;
        tableContainer.className = 'FCTcontainer';

        var nwHeadingsContainer = FCT_newEmptyDiv();
        nwHeadingsContainer.id = 'nwHeadingsContainer_' + tid;
        nwHeadingsContainer.className = 'FCTnwHeadingsContainer';

        var nwHeadings = FCT_newEmptyDiv();
        nwHeadings.id = 'nwHeadings_' + tid;
        nwHeadings.className = 'FCTnwHeadings';

        var nwHeadingsTable = table.cloneNode(false); //get a new table with all the desired attribs cheaply.
        nwHeadingsTable.removeAttribute('width'); 	//nuke user specified width
        nwHeadingsTable.removeAttribute('height'); 	//nuke user specified height
        nwHeadingsTable.style.width = ''; 			//nuke user specified width
        nwHeadingsTable.style.height = ''; 			//nuke user specified height
        nwHeadingsTable.id = 'nwHeadingsTable_' + tid;
        nwHeadingsTable.className = 'FCTnwHeadingsTable';

        var nHeadingsContainer = FCT_newEmptyDiv();
        nHeadingsContainer.id = 'nHeadingsContainer_' + tid;
        nHeadingsContainer.className = 'FCTnHeadingsContainer';

        var nHeadings = FCT_newEmptyDiv();
        nHeadings.id = 'nHeadings_' + tid;
        nHeadings.className = 'FCTnHeadings';

        var nHeadingsTable = table.cloneNode(false);
        nHeadingsTable.removeAttribute('width'); 	//nuke user specified width
        nHeadingsTable.removeAttribute('height'); 	//nuke user specified height
        nHeadingsTable.style.width = ''; 			//nuke user specified width
        nHeadingsTable.style.height = ''; 			//nuke user specified height
        nHeadingsTable.id = 'nHeadingsTable_' + tid;
        nHeadingsTable.className = 'FCTnHeadingsTable';

        var neHeadingsContainer = FCT_newEmptyDiv();
        neHeadingsContainer.id = 'neHeadingsContainer_' + tid;
        neHeadingsContainer.className = 'FCTneHeadingsContainer';

        var neHeadings = FCT_newEmptyDiv();
        neHeadings.id = 'neHeadings_' + tid;
        neHeadings.className = 'FCTneHeadings';

        var neHeadingsTable = table.cloneNode(false);
        neHeadingsTable.removeAttribute('width'); 	//nuke user specified width
        neHeadingsTable.removeAttribute('height'); 	//nuke user specified height
        neHeadingsTable.style.width = ''; 			//nuke user specified width
        neHeadingsTable.style.height = ''; 			//nuke user specified height
        neHeadingsTable.id = 'neHeadingsTable_' + tid;
        neHeadingsTable.className = 'FCTneHeadingsTable';

        var wHeadingsContainer = FCT_newEmptyDiv();
        wHeadingsContainer.id = 'wHeadingsContainer_' + tid;
        wHeadingsContainer.className = 'FCTwHeadingsContainer';

        var wHeadings = FCT_newEmptyDiv();
        wHeadings.id = 'wHeadings_' + tid;
        wHeadings.className = 'FCTwHeadings';

        var wHeadingsTable = table.cloneNode(false);
        wHeadingsTable.removeAttribute('width'); 	//nuke user specified width
        wHeadingsTable.removeAttribute('height'); 	//nuke user specified height
        wHeadingsTable.style.width = ''; 			//nuke user specified width
        wHeadingsTable.style.height = ''; 			//nuke user specified height
        wHeadingsTable.id = 'wHeadingsTable_' + tid;
        wHeadingsTable.className = 'FCTwHeadingsTable';

        var mainContainer = FCT_newEmptyDiv();
        mainContainer.id = 'mainContainer_' + tid;
        mainContainer.className = 'FCTmainContainer';
        //register our fct to receive scroll events //FIXME: should this be moved into FCT()???
        mainContainer.onscroll = function() { FCT.instances[myInst].handleScroll(); }

        var main = FCT_newEmptyDiv();
        main.id = 'main_' + tid;
        main.className = 'FCTmain';

        var mainTable = table; 				//"table" will become our mainTable, don't clone stuff we don't need to move
        mainTable.removeAttribute('width'); 	//nuke user specified width
        mainTable.removeAttribute('height'); 	//nuke user specified height
        mainTable.style.width = ''; 			//nuke user specified width
        mainTable.style.height = ''; 			//nuke user specified height
        mainTable.id = 'mainTable_' + tid;
        mainTable.className = 'FCTmainTable';

        var eHeadingsContainer = FCT_newEmptyDiv();
        eHeadingsContainer.id = 'eHeadingsContainer_' + tid;
        eHeadingsContainer.className = 'FCTeHeadingsContainer';

        var eHeadings = FCT_newEmptyDiv();
        eHeadings.id = 'eHeadings_' + tid;
        eHeadings.className = 'FCTeHeadings';

        var eHeadingsTable = table.cloneNode(false);
        eHeadingsTable.removeAttribute('width'); 	//nuke user specified width
        eHeadingsTable.removeAttribute('height'); 	//nuke user specified height
        eHeadingsTable.style.width = ''; 			//nuke user specified width
        eHeadingsTable.style.height = ''; 			//nuke user specified height
        eHeadingsTable.id = 'eHeadingsTable_' + tid;
        eHeadingsTable.className = 'FCTeHeadingsTable';

        var swHeadingsContainer = FCT_newEmptyDiv();
        swHeadingsContainer.id = 'swHeadingsContainer_' + tid;
        swHeadingsContainer.className = 'FCTswHeadingsContainer';

        var swHeadings = FCT_newEmptyDiv();
        swHeadings.id = 'swHeadings_' + tid;
        swHeadings.className = 'FCTswHeadings';

        var swHeadingsTable = table.cloneNode(false);
        swHeadingsTable.removeAttribute('width'); 	//nuke user specified width
        swHeadingsTable.removeAttribute('height'); 	//nuke user specified height
        swHeadingsTable.style.width = ''; 			//nuke user specified width
        swHeadingsTable.style.height = ''; 			//nuke user specified height
        swHeadingsTable.id = 'swHeadingsTable_' + tid;
        swHeadingsTable.className = 'FCTswHeadingsTable';

        var sHeadingsContainer = FCT_newEmptyDiv();
        sHeadingsContainer.id = 'sHeadingsContainer_' + tid;
        sHeadingsContainer.className = 'FCTsHeadingsContainer';

        var sHeadings = FCT_newEmptyDiv();
        sHeadings.id = 'sHeadings_' + tid;
        sHeadings.className = 'FCTsHeadings';

        var sHeadingsTable = table.cloneNode(false);
        sHeadingsTable.removeAttribute('width'); 	//nuke user specified width
        sHeadingsTable.removeAttribute('height'); 	//nuke user specified height
        sHeadingsTable.style.width = ''; 			//nuke user specified width
        sHeadingsTable.style.height = ''; 			//nuke user specified height
        sHeadingsTable.id = 'sHeadingsTable_' + tid;
        sHeadingsTable.className = 'FCTsHeadingsTable';

        var seHeadingsContainer = FCT_newEmptyDiv();
        seHeadingsContainer.id = 'seHeadingsContainer_' + tid;
        seHeadingsContainer.className = 'FCTseHeadingsContainer';

        var seHeadings = FCT_newEmptyDiv();
        seHeadings.id = 'seHeadings_' + tid;
        seHeadings.className = 'FCTseHeadings';

        var seHeadingsTable = table.cloneNode(false);
        seHeadingsTable.removeAttribute('width'); 	//nuke user specified width
        seHeadingsTable.removeAttribute('height'); 	//nuke user specified height
        seHeadingsTable.style.width = ''; 			//nuke user specified width
        seHeadingsTable.style.height = ''; 			//nuke user specified height
        seHeadingsTable.id = 'seHeadingsTable_' + tid;
        seHeadingsTable.className = 'FCTseHeadingsTable';

        // The following code aims to optimize the moving of cells from the initial table to
        // the appropriate new FCT table.  It moves all cells in frozen columns one by one
        // to the appropriate table.  At this point (now that all cells in frozen columns are gone)
        // frozen rows can be moved an entire row at a time into the appropriate frozen table.
        // All non-frozen cells are left in the initial table which will become the main table, avoiding a move.
        // For efficiency, this assumes that moving the data to frozen tables is less costly than
        // moving the data in the unfrozen portion.  For most uses, this assumption should hold
        // except in the rare case where someone wants more frozen cells than unfrozen cells.

        //FCT_moveCells() - function for profiling purposes
        function FCT_moveCells() { //move all cells to the proper location

            //move all cells in left frozen area to left frozen tables
            //visits columns from left to right taking advantage of FCT_moveCellToTable()s side effects
            for (var x = 0; x < fnx; ++x) {
                for (var y = 0; y < table.rows.length; ++y) {
                    if (y >= fny && y <= fsy) //w table
                        FCT_moveCellToTable(wHeadingsTable, y - fny, table, y, 0);
                    else if (y < fny) //nw table
                        FCT_moveCellToTable(nwHeadingsTable, y, table, y, 0);
                    else //sw table
                        FCT_moveCellToTable(swHeadingsTable, y - fsy - 1, table, y, 0);
                }
            }

            //move all cells in right frozen area to right frozen tables
            //Always moves first column after the last unfrozen one
            //this effectively visits columns from left to right taking 
            //advantage of FCT_moveCellToTable()s side effects
            while (fsx - fnx < FCT_numCols(table) - 1) {
                for (var y = 0; y < table.rows.length; ++y) {
                    if (y >= fny && y <= fsy) //e table
                        FCT_moveCellToTable(eHeadingsTable, y - fny, table, y, fsx - fnx + 1);
                    else if (y < fny) //ne table
                        FCT_moveCellToTable(neHeadingsTable, y, table, y, fsx - fnx + 1);
                    else //se table
                        FCT_moveCellToTable(seHeadingsTable, y - fsy - 1, table, y, fsx - fnx + 1);
                }
            }

            //now that all of the cells are out of the way, we may move
            //entire rows into the n and s tables

            //move all rows in the central northern frozen area to the n table
            for (var y = 0; y < fny; ++y)
                FCT_moveRowToTable(nHeadingsTable, table, 0);

            //move all rows in the south central frozen area to the s table
            for (var ffy = fsy - fny + 1, y = ffy, rows = FCT_numRows(table); y < rows; ++y)
                FCT_moveRowToTable(sHeadingsTable, table, ffy);
        }
        FCT_moveCells();

        //<div> wrap all critical un-moved cells (1st cell in each row/column)
        var rows = FCT_numRows(mainTable);
        var cols = FCT_numCols(mainTable);

        if (cols > 0) {
            //valign wrap cell (0,0)
            if (mainTable.rows[0].cells[0].vAlign == 'center' || mainTable.rows[0].cells[0].tagName == 'TH')
                FCT_valignWrap(mainTable.rows[0].cells[0]);

            for (var j = 0; j < cols; ++j) // wrap all cells in the first row
                FCT_divWrap(mainTable.rows[0].cells[j]);

            for (var i = 1; i < rows; ++i) //wrap all cells in the first col
            {
                if (mainTable.rows[i].cells[0].vAlign == 'center' || mainTable.rows[i].cells[0].tagName == 'TH')
                    FCT_valignWrap(mainTable.rows[i].cells[0]);

                FCT_divWrap(mainTable.rows[i].cells[0]);
            }

            //mangle id's of all unmoved rows
            for (var i = 0; i < rows; ++i)
                if (mainTable.rows[i].id != '')
                mainTable.rows[i].id = 'mainTableRow_' + mainTable.rows[i].id;
        }

        //hide all tables that have no cells
        if (nwHeadingsTable.rows.length == 0) nwHeadingsContainer.style.display = 'none';
        if (nHeadingsTable.rows.length == 0) nHeadingsContainer.style.display = 'none';
        if (neHeadingsTable.rows.length == 0) neHeadingsContainer.style.display = 'none';
        if (wHeadingsTable.rows.length == 0) wHeadingsContainer.style.display = 'none';
        if (mainTable.rows.length == 0) mainContainer.style.display = 'none';
        if (eHeadingsTable.rows.length == 0) eHeadingsContainer.style.display = 'none';
        if (swHeadingsTable.rows.length == 0) swHeadingsContainer.style.display = 'none';
        if (sHeadingsTable.rows.length == 0) sHeadingsContainer.style.display = 'none';
        if (seHeadingsTable.rows.length == 0) seHeadingsContainer.style.display = 'none';

        //construct our FCT DOM structure
        /*
        tableContainer
        |
        |-- nwHeadingsContainer
        |   |
        |   \-- nwHeadings
        |       |
        |       \-- nwHeadingsTable
        |
        |-- neHeadingsContainer
        |   |
        |   \-- neHeadings
        |       |
        |       \-- neHeadingsTable
        |
        |-- nHeadingsContainer
        |   |
        |   \-- nHeadings
        |       |
        |       \-- nHeadingsTable
        |
        |-- wHeadingsContainer
        |   |
        |   \-- wHeadings
        |       |
        |       \-- wHeadingsTable
        |
        |-- eHeadingsContainer
        |   |
        |   \-- eHeadings
        |       |
        |       \-- eHeadingsTable
        |
        |-- mainContainer
        |   |
        |   \-- main
        |       |
        |       \-- mainTable
        |
        |-- swHeadingsContainer
        |   |
        |   \-- swHeadings
        |       |
        |       \-- swHeadingsTable
        |
        |-- seHeadingsContainer
        |   |
        |   \-- seHeadings
        |       |
        |       \-- seHeadingsTable
        |
        \-- sHeadingsContainer
        |
        \-- sHeadings
        |
        \-- sHeadingsTable
			 
			 
        */

        //FCT_buildDOMStructure() - converted to function for profiling
        function FCT_buildDOMStructure() { //Build the FCT DOM structure
            nwHeadings.appendChild(nwHeadingsTable);
            nwHeadingsContainer.appendChild(nwHeadings);
            tableContainer.appendChild(nwHeadingsContainer);

            neHeadings.appendChild(neHeadingsTable);
            neHeadingsContainer.appendChild(neHeadings);
            tableContainer.appendChild(neHeadingsContainer);

            nHeadings.appendChild(nHeadingsTable);
            nHeadingsContainer.appendChild(nHeadings);
            tableContainer.appendChild(nHeadingsContainer);

            wHeadings.appendChild(wHeadingsTable);
            wHeadingsContainer.appendChild(wHeadings);
            tableContainer.appendChild(wHeadingsContainer);

            eHeadings.appendChild(eHeadingsTable);
            eHeadingsContainer.appendChild(eHeadings);
            tableContainer.appendChild(eHeadingsContainer);

            //main.appendChild(mainTable); //delay this since we're using 'table' is our 'mainTable'
            mainContainer.appendChild(main);
            tableContainer.appendChild(mainContainer);

            swHeadings.appendChild(swHeadingsTable);
            swHeadingsContainer.appendChild(swHeadings);
            tableContainer.appendChild(swHeadingsContainer);

            seHeadings.appendChild(seHeadingsTable);
            seHeadingsContainer.appendChild(seHeadings);
            tableContainer.appendChild(seHeadingsContainer);

            sHeadings.appendChild(sHeadingsTable);
            sHeadingsContainer.appendChild(sHeadings);
            tableContainer.appendChild(sHeadingsContainer);
        }
        FCT_buildDOMStructure();

        //replace the original table with our new happy slappy one
        //However we must watch out if the width is a percentage.
        //In that case, when we put the new table in, it is possible (in IE at least)
        //that when FCT.init() tries to get the correct value for the pixel width of tableContainer
        //it will get the wrong value.  The value returned will be the value of the tableContainer
        //sized large enough to show everything despite our setting the width smaller.
        //Therefore, insert a new empty div (which should fill up to 100% since it's block level).
        //Then, if the tableWidth is a percentage, use the width of this empty 100% div * the percentage
        //to find out the real width in pixels that we want.  Only after this should we add the 
        //tableContainer to the DOM tree and go into init().
        var tableParent = table.parentNode;
        var newDiv = FCT_newEmptyDiv();
        main.appendChild(tableParent.replaceChild(newDiv, table)); //replace table with newDiv and add table to our DOM structure

        //if a percent layout was used, convert to pixel based
        if (constraints.xlayout == FCT.PERCENTAGE_LAYOUT) {
            constraints.xlen = new xbStyle(tableParent).getWidth() * parseFloat(constraints.xlen) / 100.0; //determine pixel width without tableContainer's inner content messing up the reslts
            constraints.xlayout = FCT.PIXEL_LAYOUT;
        }

        if (constraints.ylayout == FCT.PERCENTAGE_LAYOUT) {
            constraints.ylen = new xbStyle(tableParent).getHeight() * parseFloat(constraints.ylen) / 100.0; //determine pixel height without tableContainer's inner content messing up the reslts
            constraints.ylayout = FCT.PIXEL_LAYOUT;
        }

        tableParent.replaceChild(tableContainer, newDiv);

        //instantiate our FCT
        FCT.instances[myInst] = new FCT('_' + tid, constraints, false);
        FCT.instances[myInst].init();
    }
    FCT.convert = FCT_convert;

    /* ****************************************************************************** *
    * FCT_moveChildren(src, target) - MOVES the children of src to target... no copy
    *	overhead, a "for reals" move.
    * ****************************************************************************** */
    function FCT_moveChildren(src, target) {
        if (src == null || target == null) return;

        for (var child = src.firstChild; child != null; child = src.firstChild)
            target.appendChild(src.removeChild(child));
    }

    /* ****************************************************************************** *
    * FCT_moveCellToTable(to, trow, from, frow, fcol) - Moves from.rows[frow].cells[fcol]
    *   to to.rows[trow] (creating the trow'th row by doing a shallow clone of the 
    *   corresponding row in from if needed).  divWrap()s the cell if it's in the 
    *   first row of to, or the first column of it's row.  Boolean return 
    *   value indicates success or failure.  "corresponding" is defined as the row 
    *   that is the same offset from frow is it is from trow.  i.e.  If the row being 
    *   inserted is two above trow, the row frow - 2 will be cloned (unless it is out of
    *   from's range in which case frow will be substituted).
    * ****************************************************************************** */
    function FCT_moveCellToTable(to, trow, from, frow, fcol) {
        if (frow >= FCT_numRows(from)) return false;

        //We need to access rows[frow].cells.length directly instead of using
        //FCT_numCols() because the table is in an inconsistent state since we're
        //moving cells around.
        if (fcol >= from.rows[frow].cells.length) return false;

        //clone a new row from 'corresponding' row in from (to keep attributes)
        for (var src = frow - (trow - to.rows.length), insertedRow = null, clonedRow = null;
			to.rows.length <= trow;
			++src) {
            insertedRow = to.insertRow(-1); //insert new row so we can replace it
            //clone 'corresponding' row from old table, attempt to match up assuming from is larger than
            //to, if wrong, just clone frow
            clonedRow = from.rows[(src >= 0 && src < from.rows.length ? src : frow)].cloneNode(false);
            clonedRow.removeAttribute('width'); 	//nuke user specified width
            clonedRow.style.width = ''; 			//nuke user specified width
            if (clonedRow.id != '') clonedRow.id = to.id.replace(/_.*$/, 'Row_' + clonedRow.id); //mangle id
            to.tBodies[0].replaceChild(clonedRow, insertedRow);
        }

        var cell = to.rows[trow].appendChild(from.rows[frow].removeChild(from.rows[frow].cells[fcol]));

        if (trow == 0 || to.rows[trow].cells.length == 1)  //cell appended to first row or first cell in trow
        {
            if (to.rows[trow].cells.length == 1 && (cell.vAlign == 'center' || cell.tagName == 'TH'))
                FCT_valignWrap(cell);

            FCT_divWrap(cell);
        }

        return true;
    }

    /* ****************************************************************************** *
    * FCT_moveRowToTable(to, from, frow) - removes from.rows[frow] and appends it to
    *   to.  It also divWrap()s all cells in the first row, and the first column in each
    *   subsequent row.  Boolean return value indicates success or failure.
    * ****************************************************************************** */
    function FCT_moveRowToTable(to, from, frow) {
        if (frow >= from.rows.length) return false;

        if (from.rows[frow].id != '') //mangle id of frow
            from.rows[frow].id = to.id.replace(/_.*$/, 'Row_' + from.rows[frow].id);

        //the implicit <tbody> handled by insertRow(-1).
        var newRow = to.insertRow(-1);
        to.tBodies[0].replaceChild(from.tBodies[0].removeChild(from.rows[frow]), newRow);

        if (to.rows.length == 1) //divWrap() all columns in first row
            for (var i = 0; i < to.rows[0].cells.length; ++i) {
            if (i == 0 && (to.rows[0].cells[i].vAlign == 'center' || to.rows[0].cells[i].tagName == 'TH'))
                FCT_valignWrap(to.rows[0].cells[i]);

            FCT_divWrap(to.rows[0].cells[i]);
        }
        else //divWrap() first column of all subsequent rows
        {
            if (to.rows[0].cells[i].vAlign == 'center' || to.rows[0].cells[i].tagName == 'TH')
                FCT_valignWrap(to.rows[0].cells[i]);

            FCT_divWrap(to.rows[to.rows.length - 1].cells[0]);
        }

        return true;
    }

    /* ****************************************************************************** *
    * FCT_divWrap(node) - wraps all children of node in a newly created <div>.
    *	Creates a new <div> element.  Moves all children from node to
    *   the new div.  Makes the new div the firstChild of node.  Boolean return value 
    *   indicates success or failure.
    * ****************************************************************************** */
    function FCT_divWrap(node) {
        if (node == null) return false;

        var newDiv = FCT_newEmptyDiv();
        newDiv.className = 'FCTdivWrapper';
        FCT_moveChildren(node, newDiv);
        node.appendChild(newDiv);

        return true;
    }

    /* ****************************************************************************** *
    * FCT_valignWrap(node) - wraps all children of node in a newly created <div> of
    * 	class 'FCTvalignWrapper' so that vAlign attributes can be mimiced
    *	Creates a new <div> element.  Moves all children from node to
    *   the new div.  Makes the new div the firstChild of node.  Boolean return value 
    *   indicates success or failure.
    * ****************************************************************************** */
    function FCT_valignWrap(node) {
        if (node == null) return false;

        var newDiv = FCT_newEmptyDiv();
        newDiv.className = 'FCTvalignWrapper';
        FCT_moveChildren(node, newDiv);
        node.appendChild(newDiv);

        return true;
    }

    /* ****************************************************************************** *
    * FCT_correctValign() - searches out all div elements with a class of 
    *	'FCTvalignWrapper', i.e. those created by FCT_valignWrap() and attempts to
    *	position them in the center of their cell vertically.
    * ****************************************************************************** */
    function FCT_correctValign() {
        var divs = document.getElementsByTagName('div');

        for (var i = 0; i < divs.length; ++i)
            if (divs[i].className == 'FCTvalignWrapper')
            divs[i].style.marginTop = Math.round((divs[i].parentNode.offsetHeight - divs[i].offsetHeight) / 2) + 'px';
    }

    /* ****************************************************************************** *
    * FCT_newEmptyDiv() - creates new empty <div> elements with no explicit attributes
    *	set by cloning a global one.  Some benchmarking performed indicated that cloning
    *	was about 45% faster than document.createElement('div')... hence the introduction
    *	of this code.  I'm not sure just how much faster a function call + a clone is 
    *	over a document.createElement however, as we've attempted to minimize div-wrapping
    *	this is no longer that much of an issue.
    * ****************************************************************************** */
    function FCT_newEmptyDiv() {
        return FCT_EMPTY_DIV.cloneNode(false);
    }

    /* ****************************************************************************** *
    * FCT_layoutAsString(num) - takes a layout constant, returns its string name
    *	(think error reporting).
    * ****************************************************************************** */
    function FCT_layoutAsString(num) {
        switch (num) {
            case FCT.TABLE_LAYOUT:
                return "FCT.TABLE_LAYOUT";
            case FCT.PIXEL_LAYOUT:
                return "FCT.PIXEL_LAYOUT";
            case FCT.ROWCOL_LAYOUT:
                return "FCT.ROWCOL_LAYOUT";
            case FCT.PERCENTAGE_LAYOUT:
                return "FCT.PERCENTAGE_LAYOUT";
            default:
                return "FCT.INVALID_LAYOUT";
        }
    }
    FCT.layoutAsString = FCT_layoutAsString;

    /* ****************************************************************************** *
    * FCT_parseLayout(str) - the inverse of FCT_layoutAsString(num).  Takes a string
    *	and returns the numerical constant associated with that layout.
    * ****************************************************************************** */
    function FCT_parseLayout(str) {
        switch (str) {
            case "FCT.TABLE_LAYOUT":
                return FCT.TABLE_LAYOUT;
            case "FCT.PIXEL_LAYOUT":
                return FCT.PIXEL_LAYOUT;
            case "FCT.ROWCOL_LAYOUT":
                return FCT.ROWCOL_LAYOUT;
            case "FCT.PERCENTAGE_LAYOUT":
                return FCT.PERCENTAGE_LAYOUT;
            default:
                return FCT.INVALID_LAYOUT;
        }
    }
    FCT.parseLayout = FCT_parseLayout;

    /* ********************** FCT CONSTANTS ********************** */

    // FCT Layout Constants - tell FCT how to lay itself out, used in 
    //	conjunction with the FCTConstraints class.
    FCT.INVALID_LAYOUT = 0; //layout is not a valid value
    FCT.TABLE_LAYOUT = 1; //table-style layout used, aka "natural size", respects min & max however
    FCT.PIXEL_LAYOUT = 2; //pixel based layout
    FCT.PERCENTAGE_LAYOUT = 3; //NOT IMPLEMENTED BY FCT - FOR USE BY HELPER FUNCTIONS THAT DO CONVERSTIONS INTO PIXEL_LAYOUT FOR FCT like FCT_convert()
    FCT.ROWCOL_LAYOUT = 4; //determines the size of the FCT by trying to show the number of rows or columns specified, size is bounded by min & max.


    // FCT.SCROLLBAR_WIDTH - the effective width of scrollbars in the
    //	current browser.
    if (navigator.family == 'ie4' && document.all)	//IE4+ family
        FCT.SCROLLBAR_WIDTH = 17;
    else						//FIXME: haven't measured width in other browsers
        FCT.SCROLLBAR_WIDTH = 18;


    FCT_EMPTY_DIV = document.createElement('div'); //used to clone <div>s instead of creating them (46% faster)

    /* ********************** END fct_i.js ********************** */
}

/* ********************** END fct.js ********************** */
