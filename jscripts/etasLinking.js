function linkETAS() {
  getBibIds();
  //demoService();
}

function getBibIds () {
  var bib_ids = document.getElementsByName('pageIds');
  if (bib_ids.length >= 1) {
	// pageIds can occur twice, in header and footer; just take the first one.
	// Default value has a dangling comma; remove that.
    ids = bib_ids[0].value.slice(0, -1);
	alert(ids);
  }
}

function demoService () {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => alert(json))
}

