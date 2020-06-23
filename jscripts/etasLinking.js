function linkETAS() {
  getBibIds();
}

function getBibIds() {
  let bib_ids = document.getElementsByName('pageIds');
  if (bib_ids.length >= 1) {
	// pageIds can occur twice, in header and footer; just take the first one.
	// Default value has a dangling comma; remove that.
    let ids = bib_ids[0].value.slice(0, -1);
	getData(ids);
  }
}

async function getData(bib_ids) {
  let url = 'https://webservices-test.library.ucla.edu/hathi/data/forids/' + bib_ids;
  let response = await fetch(url);
  let data = await response.json();
//  console.log('getData: ' + JSON.stringify(data));
  console.log(JSON.stringify(data.items));
  data.items.forEach(addHathiInfo);
}

function addHathiInfo(item) {
  // items have: bibId, oclcNumber, itemType, accessLevel, rightsCode, hathiBibKey
  let bibId = item.bibID;
  let etasDiv = document.getElementById('etas_' + bibId);
  let baseURL = 'https://catalog.hathitrust.org/Record/' + item.hathiBibKey;
  if (item.accessLevel && etasDiv) {
    if (item.accessLevel === 'deny') {
	  baseURL += '?signon=swle:urn:mace:incommon:ucla.edu';  
	}
    etasDiv.innerHTML = '<a href="' + baseURL + '">HathiTrust</a>'; 
	etasDiv.style.display = 'block';
  }
}

