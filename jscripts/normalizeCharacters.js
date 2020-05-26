function normalizeCharacters()
	{
		// Find searcArg and replace smart quote with single quote 
		if (document.getElementById("searchArg")){	
			var search = document.getElementById("searchArg").value;
			search = search.replace("\u2019", "'");
			document.getElementById("searchArg").value = search;
		}
		
		//Advanced search box has three searchArgs
		if (document.getElementById("searchArg1")){
			var search1 = document.getElementById("searchArg1").value;
			search1 = search1.replace("\u2019", "'");
			document.getElementById("searchArg1").value = search1;
		}

		if (document.getElementById("searchArg2")){
			var search2 = document.getElementById("searchArg2").value;
			search2 = search2.replace("\u2019", "'");
			document.getElementById("searchArg2").value = search2;
		}

		if (document.getElementById("searchArg3")){
			var search3 = document.getElementById("searchArg3").value;
			search3 = search3.replace("\u2019", "'");
			document.getElementById("searchArg3").value = search3;
		}
	}


