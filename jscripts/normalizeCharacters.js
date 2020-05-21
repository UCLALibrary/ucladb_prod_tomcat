function normalizeCharacters()
{
	var search = document.getElementById("searchArg").value;
	search = search.replace("\u2019", "'");
	document.getElementById("searchArg").value = search;

}

