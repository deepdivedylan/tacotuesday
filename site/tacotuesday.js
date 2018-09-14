function attachQueueProcess() {
	document.getElementById("queueForm").addEventListener("submit", function(event) {
		let clientInputs = [];
		let clientValues = document.getElementsByClassName("client-value");
		Array.from(clientValues).map(input => clientInputs.push(parseInt(input.value)));
		event.preventDefault();
		return clientInputs;
	});
}

function writeInputs() {
	let numClients = parseInt(document.getElementById("numClients").value);

	let breakpoint = "col-md-";
	let divisor = 0;
	if(numClients % 2 === 0) {
		breakpoint = breakpoint + "6";
		divisor = 2;
	} else {
		breakpoint = breakpoint + "4";
		divisor = 3;
	}

	let html = "";
	const template = "<div class=\"form-group\"><label for=\"client-CLIENTNUM\">Client CLIENTNUM</label><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\"><i class=\"far fa-clock\"></i></span></div><input class=\"client-value form-control\" type=\"number\" name=\"client-CLIENTNUM\" min=\"0\" step=\"1\" /></div></div>";
	if(numClients > 1) {
		let numInputs = 0;
		let numRows = Math.ceil(numClients / divisor);
		for(let i = 0; i < numRows; i++) {
			html = html + "<div class=\"row\">";
			for(let j = 0; j < divisor; j++) {
				// (divisor * i + j)
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
		let clientInput = template.replace(/CLIENTNUM/g, Number(0).toString());
		html = "<div class=\"col-xs-12\">" + clientInput + "</div>";
	}
	document.getElementById("inputArea").innerHTML = html;
}