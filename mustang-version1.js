// Matt Goff

var contactURLArray = [];
var contactArray = [];
var loadContact = 0;

function initApplication() {
    console.log('Mustang Version 1 Starting!'); 
}

// loads the index file that holds json file
function loadIndex() {
	var indexRequest = new XMLHttpRequest();
	indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
	indexRequest.onload = function() {
        console.log("Index:" + indexRequest.responseText);
        document.getElementById("indexID").innerHTML = indexRequest.responseText;
        contactIndex = JSON.parse(indexRequest.responseText);
        for (i = 0; i < contactIndex.length; i++) {
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
    }
	
	indexRequest.onerror = function() {
		console.log("Connection error");
	};
	
    indexRequest.send();
}

// loads the specific json files students provided
function loadContacts() {
    contactArray.length = 0;
    loadContact = 0;

    if (contactURLArray.length > loadContact) {
        loadNextContact(contactURLArray[loadContact]);
    }
	
	statusUpdate();
}

function loadNextContact(data) {
    console.log("URL: " + data);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', data);
    contactRequest.onload = function() {
        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        contactArray.push(contact);
        document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);

        loadContact++;
		
        if (contactURLArray.length > loadContact) {
            loadNextContact(contactURLArray[loadContact]);
        }
    }

    contactRequest.send();
}

// displays when contacts are done loading and displays how many contacts there are
function statusUpdate() {
	document.getElementById("statusUpdate").innerHTML = contactURLArray.length + " contacts loaded.";
}