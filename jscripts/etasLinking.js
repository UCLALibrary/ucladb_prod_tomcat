function linkETAS() {
  let page_info = getBibIds();
  if (page_info.bib_ids) {
	// Async functions return Promises
	getData(page_info.bib_ids)
	.then(function(data) {
	  items = addHathiInfo(data.items);
	  
	  // Handle results page
	  if (page_info.etas_type === 'results') {
	    displayHathiResults(items);
	  // Handle record page
	  } else if (page_info.etas_type === 'record') {
	    displayHathiRecord(items[0]);
	  }
	})
	.catch(function(error) {
	  console.log('ERROR: ' , error);
	})
  }
}


function getBibIds() {
  // Check see if page has the info we need to proceed.
  let bib_ids;
  let etas_type;
  let page_info = {};
  // First: is this the record page?
  let bib_list = document.getElementById('etas_bibid');
  if (bib_list) {
    bib_ids = bib_list.value; 
	etas_type = 'record';
  } else {
    // If not the record page, is it the search results page?
    bib_list = document.getElementsByName('pageIds');
	// This will be a NodeList and always exists, even if empty
	if (bib_list.length >= 1) {
	  bib_ids = bib_list[0].value.slice(0, -1);
	  etas_type = 'results'; 
	}
  }

  // If bib_ids is not defined here, nothing more to do.
  // Otherwise, call the web service and proceed.
  page_info.bib_ids = bib_ids;
  page_info.etas_type = etas_type;
  return page_info;
}

async function getData(bib_ids) {
  let url = 'https://webservices.library.ucla.edu/hathi/data/forids/' + bib_ids;
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function addHathiInfo(items) {
  // Augments data from web service by adding URL and message to each item
  items.forEach(function(item) {
    if (item.accessLevel) {
      item.hathiURL = 'https://catalog.hathitrust.org/Record/' + item.hathiBibKey;
      item.accessMessage = 'Public Domain Access';
      if (item.accessLevel === 'deny') {
        item.hathiURL += '?signon=swle:urn:mace:incommon:ucla.edu';
	    item.accessMessage = 'UCLA Access';
      }
    }
  })
  return items;
}

function displayHathiResults(items) {
  // Iterate over items, updating HTML for each one
  items.forEach(function(item) {
    let etasDiv = document.getElementById('etas_' + item.bibID);
	if (etasDiv) {
	  etasDiv.innerHTML = getHathiResultsHTML(item.hathiURL, item.accessMessage);
	  etasDiv.style.display = 'flex';
	}
  })
}

function displayHathiRecord(item) {
  // Update HTML for single item on record page
  let etasDiv = document.getElementById('etas_record');
  if (etasDiv) {
    etasDiv.innerHTML = getHathiRecordHTML(item.hathiURL, item.accessMessage);
	etasDiv.style.display = 'block';
  }
}

function getHathiResultsHTML(url, access) {
  let hathiHTML = `
	<img src="ui/ucladb/images/hathi-logo-32px.png" alt="HathiTrust logo" class="hathi-logo" />
	<div class="hathi-item-wrapper">
		<a href="${url}" target="_blank" class="hathi-link">Available online with HathiTrust - ${access}</a>
		<div class="hathi-tooltip-container" id="hathi-tooltip" onClick="toggleTooltip(this);">
			<img src="ui/ucladb/images/icon-help_outline-white.svg" alt="Pop-up icon for more information about HathiTrust" class="hathi-help-icon" aria-label="More information about HathiTrust icon" />
			<span class="hathi-tooltip-content" id="tooltip-popup">
				<img src="ui/ucladb/images/icon-clear-24px.svg" class="hathi-close-icon" id="tooltip-close" alt="Close pop up icon" />
				<span class="hathi-tooltip-text"><strong>UCLA Access</strong>: UCLA login required to read full text</span>
				<span class="hathi-tooltip-text"><strong>Public Domain Access</strong>: Full text available without UCLA login.</span>
				<a href="https://www.hathitrust.org/" target="_blank" class="hathi-tooltip-text hathi-link">Learn more about HathiTrust Access</a>
			</span>
		</div
	</div>
  `
  return hathiHTML;
}

function getHathiRecordHTML(url, access) {
  let hathiHTML = `
    <div class="evenHoldingsRow">
      <ul title="Holdings Record Display">
        <li class="bibTag">
          <span class="fieldLabelSpan">Online Access:</span>
		  <div class="hathi-row-wrapper">
		    <img src="ui/ucladb/images/hathi-logo-32px.png" alt="HathiTrust logo" class="hathi-logo" />
		    <span class="hathi-item-wrapper subfieldData">
    		  <a href="${url}" target="_blank" class="hathi-link">Read online at HathiTrust - ${access}</a>
	    	  <div class="hathi-tooltip-container" id="hathi-tooltip" onClick="toggleTooltip(this);">
		    	  <img src="ui/ucladb/images/icon-help_outline-white.svg" alt="Pop-up icon for more information about HathiTrust" class="hathi-help-icon" aria-label="More information about HathiTrust icon" />
			      <span class="hathi-tooltip-content" id="tooltip-popup">
				      <img src="ui/ucladb/images/icon-clear-24px.svg" class="hathi-close-icon" id="tooltip-close" alt="Close pop up icon" />
				      <span class="hathi-tooltip-text"><strong>UCLA Access</strong>: UCLA login required to read full text</span>
				      <span class="hathi-tooltip-text"><strong>Public Domain Access</strong>: Full text available without UCLA login.</span>
				      <a href="https://www.hathitrust.org/" target="_blank" class="hathi-tooltip-text hathi-link">Learn more about HathiTrust Access</a>
			      </span>
			  </div
			</div>
		  </span>
        </li>
      </ul>
    </div>
  `
  return hathiHTML;
}

function toggleTooltip(element) {
  element.querySelector("#tooltip-popup").classList.toggle("show");
}

