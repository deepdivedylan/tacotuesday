/**
 * attaches the queue processor to the form; this is loaded when the page loads
 **/
function attachQueueProcess() {
	document.getElementById("queueForm").addEventListener("submit", event => {
		let numCashiers = parseInt(document.getElementById("numCashiers").value);
		let clientInputs = [];
		let clientValues = document.getElementsByClassName("client-value");
		Array.from(clientValues).map(input => clientInputs.push(parseInt(input.value)));
		event.preventDefault();

		let xhr = new XMLHttpRequest();
		xhr.open("POST", "/queue.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = reply => {
			let statusHtml = "<div class=\"alert alert-dismissible" + reply.class + "\" role=\"alert\"><button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>" +  reply.message + "</div>";
			document.getElementById("statusArea").innerHTML = statusHtml;
		};
		xhr.send("numCashiers=" + numCashiers + "&queue=" + encodeURIComponent(JSON.stringify(clientInputs)));
	});
}

/**
 * populates input fields with random values
 **/
function populateRandomValues() {
	let clientValues = document.getElementsByClassName("client-value");
	Array.from(clientValues).map(input => input.value = Math.ceil(Math.random() * 32));
}

/**
 * writes input fields based on number of clients in line
 **/
function writeInputs() {
	let numClients = parseInt(document.getElementById("numClients").value);

	// calculate the Bootstrap breakpoint to render the grid system
	let breakpoint = "col-md-";
	let divisor = 0;
	if(numClients % 2 === 0) {
		breakpoint = breakpoint + "6";
		divisor = 2;
	} else {
		breakpoint = breakpoint + "4";
		divisor = 3;
	}

	// assemble the input fields based on an HTML template
	let html = "";
	const template = "<div class=\"form-group\"><label for=\"client-CLIENTNUM\">Client CLIENTNUM</label><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\"><i class=\"far fa-clock\"></i></span></div><input class=\"client-value form-control\" type=\"number\" name=\"client-CLIENTNUM\" min=\"0\" step=\"1\" /></div></div>";
	if(numClients > 1) {
		let numInputs = 0;
		let numRows = Math.ceil(numClients / divisor);
		for(let i = 0; i < numRows; i++) {
			html = html + "<div class=\"row\">";
			for(let j = 0; j < divisor; j++) {
				let clientInput = template.replace(/CLIENTNUM/g, Number(divisor * i + j).toString());
				html = html + "<div class=\"" + breakpoint + "\">" + clientInput + "</div>";
				numInputs++;
				if(numInputs < divisor * i + j) {
					break;
				}
			}
			html = html + "</div>";
		}
	} else {
		// exception: the only odd number less than three is one
		let clientInput = template.replace(/CLIENTNUM/g, Number(0).toString());
		html = "<div class=\"col-xs-12\">" + clientInput + "</div>";
	}
	document.getElementById("inputArea").innerHTML = html;
}