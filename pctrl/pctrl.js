var json;
async function getContent() {
	let response = await fetch("https://pctrl-3fdd.restdb.io/rest/manage/5ef37e1c498ad76800047c96", {
  headers: {
    "x-apikey": "5ef39838a529a1752c476986"
  }
});

if (response.ok) {
  json = await response.json();
  updateHtml();
}
 else {
  alert("HTTP-Error: " + response.status);
}
}

async function updateSites() {
	document.getElementById('loading').hidden = false;
	var newText = "";
	var newSites = document.getElementById('currentSites').value.split("\n");
	for(i in newSites) if(newSites[i]) newText = newText.concat(newSites[i]+";");
	newText = newText.substring(0, newText.length-1);
	json.codes = newText;
	await postUpdate();
}

async function updateStatus() {
	document.getElementById('loading').hidden = false;
	var newStatus = json.status == 'block' ? 'allow' : 'block';
	json.status=newStatus;
	await postUpdate();
}

async function postUpdate() {
	let response = await fetch("https://pctrl-3fdd.restdb.io/rest/manage/5ef37e1c498ad76800047c96", {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
	"x-apikey": "5ef39838a529a1752c476986"
  },
  body: JSON.stringify(json)
});
json = await response.json();
updateHtml();
}

function updateHtml() {
  document.getElementById('loading').hidden = true;
  document.getElementById('currentStatus').innerHTML = json.status == 'block' ? 'Blocked' : 'Allowed';
  var textAreaText = "";
  var sites = json.codes.split(";");
  for(i in sites) {
	  textAreaText = textAreaText.concat(sites[i] + "\n");
  }
  document.getElementById('currentSites').value = textAreaText;
  
}