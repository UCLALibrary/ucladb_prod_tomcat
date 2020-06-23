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
  let hathiURL = 'https://catalog.hathitrust.org/Record/' + item.hathiBibKey;
  if (item.accessLevel && etasDiv) {
    let accessMessage = 'Public Domain Access';
    if (item.accessLevel === 'deny') {
	  hathiURL += '?signon=swle:urn:mace:incommon:ucla.edu';
	  accessMessage = 'UCLA Access';
	}
    etasDiv.innerHTML = getHathiHTML(hathiURL, accessMessage); 
	etasDiv.style.display = 'block';
  }
}

function getHathiHTML(url, access) {
  let hathiHTML = `
	<img src="ui/ucladb/images/hathi-logo-32px.png" alt="HathiTrust logo" class="hathi-logo" />
	<div class="hathi-item-wrapper">
		<a href="${url}" target="_blank" class="hathi-link">Available online with HathiTrust - ${access}</a>
		<div class="hathi-tooltip-container" id="hathi-tooltip">
			<img src="ui/ucladb/images/icon-help_outline-white.svg" alt="Pop-up icon for more information about HathiTrust" class="hathi-help-icon" aria-label="More information about HathiTrust icon" />
			<span class="hathi-tooltip-content" id="tooltip-popup">
				<img src="ui/ucladb/images/icon-clear-24px.svg" class="hathi-close-icon" id="tooltip-close" alt="Close pop up icon" />
				<span class="hathi-tooltip-text">HathiTrust Digital Library is a repository of scanned books contributed from academic institutions all over the United States, including UCLA and the University of California, etc etc etc.</span>
				<span class="hathi-tooltip-text"><strong>UCLA Access</strong>: UCLA login required to read full text</span>
				<span class="hathi-tooltip-text"><strong>Public Domain Access</strong>: Full text available without UCLA login.</span>
				<a href="https://www.hathitrust.org/" target="_blank" class="hathi-tooltip-text hathi-link">Learn more about HathiTrust Access</a>
			</span>
		</div>
	</div>
  `
  return hathiHTML;
}

