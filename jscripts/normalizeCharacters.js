function normalizeCharacters()
{
	// Find searcArg and replace smart quote with single quote 
	var searchArgs = ["searchArg", "searchArg1", "searchArg2", "searchArg3"];
	searchArgs.forEach(normalize);
	function normalize (searchArg) {
		if (document.getElementById(searchArg)){  
    	   	var search = document.getElementById(searchArg).value;
	   		search = search.replace("\u2019", "'");
      		document.getElementById(searchArg).value = search;
		 }
	 }
}


