/*
** http://www.hathitrust.org/bib_api
** Code from Columbia University Libraries
** http://clio.cul.columbia.edu
**
** Modified by Yale for local use
**
** Copied from Orbis and used with permission from Yale.
**
** KLS - modified comparison string so works with current API value 'Full view'
** KLS - added bullet and modified label wording to 'HathiTrust'
** KLS - suppressed display of view only link
** KLS - removed prefix and record ID in front of link
** KLS - Added code to turn label row on/off depending on presence of hathi data (works in conjunction with googleBooksAvail.js file)
** KLS - Added code to change top margins depending on content of region
** KLS - Commented out final check for Fullview in order to work with highLight.js
*/

var dataArrivedHathi="false";

function parseResponse(bookInfo) 
{

    // Hide the row until we have something to display
    document.getElementById('hathiRow').style.display = 'none'; 

  var hathiDiv = document.getElementById('hathidata');

  var records = bookInfo.records;
  var items   = bookInfo.items;
  var message = "";
  var recordId = "";
  var url = "";
  var usRightsString = "";

  var spanLinkText = document.createElement('span');
  var spanBullet = document.createElement('span');
  var bullet = "&middot;";

  // Gather up some useful data
  for (i in records) {
    recordId = i;
    url = records[recordId].recordURL;
  }

  for (i in items)
  {
    // only display full text(none, limited, full)
    if (items[i].usRightsString == "Full view") {
    usRightsString ="&middot; HathiTrust";

  var hathiURL = document.createElement("a");
  hathiURL.href = url;
  hathiURL.setAttribute("target","_hathi");  // opens in a new window
  hathiDiv.appendChild(hathiURL);

  spanLinkText.innerHTML = usRightsString;
  hathiURL.appendChild(spanLinkText);

  // now display row
  document.getElementById('fulltext_label').style.display = '';
  document.getElementById('hathiRow').style.display = '';
  document.getElementById('hathiBooks').style.display = '';
  //document.getElementById('data').style.paddingTop = '20px';
    }
   
//    if (items[i].usRightsString != "Full view") {
//  document.getElementById('fulltext_label').style.display = 'none';
//  document.getElementById('hathiRow').style.display = 'none';
//  document.getElementById('hathiBooks').style.display = 'none';
//  document.getElementById('about').style.marginTop = '10px';
//  
//	}
 }

}

function hathiBookSearch()
{
   // Delete any previous JavaScript Object Notation queries.
   var jsonScript = document.getElementById("hathiScript");
   if (jsonScript) {
      jsonScript.parentNode.removeChild(jsonScript);
   }
   
   // Pluck out our data elements, search appropriately
   // isbn and issn do not appear in the same record so a single handler is possible
   if(document.getElementById('hisbn'))
       {
	   doBookScriptsHathi('hisbn','isnHandlerHathi');
       }
   else if(document.getElementById('hissn'))
       {
	   doBookScriptsHathi('hissn','isnHandlerHathi');
       }
   else if(document.getElementById('hoclc'))
       {
	   doBookScriptsHathi('hoclc','oclcHandlerHathi');
       }
   else if(document.getElementById('hlccn'))
       {
	   doBookScriptsHathi('hlccn','lccnHandlerHathi');
       }

}

function doBookScriptsHathi(bibKey,handler)
{

    // Add a script element with the src as the user's Hathi API query.
    // the callback funtion is also specified as a URI argument.
    var lookupURL = "https://catalog.hathitrust.org/api/volumes/brief/" + 
                   escape(document.getElementById(bibKey).value) + 
                   ".json?callback=" + handler;
    var scriptElement = document.createElement("script");
    scriptElement.setAttribute("id", "hathiScript");
    scriptElement.setAttribute("src", lookupURL);
    scriptElement.setAttribute("type", "text/javascript");

    // make the request to Hathi booksearcsh
    document.documentElement.firstChild.appendChild(scriptElement);

}

function isnHandlerHathi(bookInfo)
{
    var records = "(" + bookInfo.records; + ")";
    if ( records.length != 0 ) {
	dataArrivedHathi="true";
	parseResponse(bookInfo);
    }

    if(dataArrivedHathi=='false')
	{
	    if(document.getElementById('hoclc'))
		{
		    doBookScriptsHathi('hoclc','oclcHandlerHathi');
		}
	    else if(document.getElementById('hlccn'))
		{
		    doBookScriptsHathi('hlccn','lccnHandlerHathi');
		}
	}
}

function oclcHandlerHathi(bookInfo)
{
    var records = "(" + bookInfo.records + ")";
    if ( records.length != 0 ) {
	dataArrivedHathi="true";
	parseResponse(bookInfo);
    }

   if(dataArrivedHathi=='false')
   {
      if(document.getElementById('hlccn'))
      {
         doBookScriptsHathi('hlccn','lccnHandlerHathi');
      }
   }
}

function lccnHandlerHathi(bookInfo)
{
    var records = bookInfo.records;
    if ( records.length != 0 ) {
	dataArrivedHathi="true";
	parseResponse(bookInfo);
    }

}

