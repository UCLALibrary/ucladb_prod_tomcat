function normalizeCharacters()
	{
		var search = document.getElementById("searchArg").value;
		search = search.replace("\u2019", "'");
		document.getElementById("searchArg").value = search;
		
		var search1 = document.getElementById("searchArg1").value;
		search1 = search1.replace("\u2019", "'");
		document.getElementById("searchArg1").value = search1;

		var search2 = document.getElementById("searchArg2").value;
		search2 = search2.replace("\u2019", "'");
		document.getElementById("searchArg2").value = search2;

		var search3 = document.getElementById("searchArg3").value;
		search3 = search3.replace("\u2019", "'");
		document.getElementById("searchArg3").value = search3;

	}

